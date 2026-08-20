import ExcelJS from "exceljs";

type PdfTextItem = {
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

type PdfRow = {
    y: number;
    items: PdfTextItem[];
};

const Y_TOLERANCE = 4;
const COLUMN_GAP = 12;

function groupItemsIntoRows(
    items: PdfTextItem[],
): PdfRow[] {
    const rows: PdfRow[] = [];

    const sortedItems = [...items].sort(
        (a, b) => {
            if (Math.abs(a.y - b.y) > Y_TOLERANCE) {
                return b.y - a.y;
            }

            return a.x - b.x;
        },
    );

    for (const item of sortedItems) {
        const existingRow = rows.find(
            (row) =>
                Math.abs(row.y - item.y) <=
                Y_TOLERANCE,
        );

        if (existingRow) {
            existingRow.items.push(item);
        } else {
            rows.push({
                y: item.y,
                items: [item],
            });
        }
    }

    rows.sort((a, b) => b.y - a.y);

    for (const row of rows) {
        row.items.sort((a, b) => a.x - b.x);
    }

    return rows;
}

function buildColumns(
    rows: PdfRow[],
): string[][] {
    const output: string[][] = [];

    for (const row of rows) {
        if (row.items.length === 0) {
            continue;
        }

        const cells: string[] = [];

        let currentCell = "";
        let previousRight = -Infinity;

        for (const item of row.items) {
            const itemStart = item.x;
            const itemRight =
                item.x + item.width;

            const gap =
                itemStart - previousRight;

            if (
                currentCell &&
                gap > COLUMN_GAP
            ) {
                cells.push(
                    currentCell.trim(),
                );

                currentCell = "";
            }

            if (currentCell) {
                currentCell += " ";
            }

            currentCell += item.text;

            previousRight = Math.max(
                previousRight,
                itemRight,
            );
        }

        if (currentCell.trim()) {
            cells.push(
                currentCell.trim(),
            );
        }

        if (cells.length > 0) {
            output.push(cells);
        }
    }

    return output;
}

export async function convertPdfToExcel(
    pdfBuffer: Buffer,
): Promise<Buffer> {
    const pdfjsLib =
        await import(
            "pdfjs-dist/legacy/build/pdf.mjs"
        );

    const loadingTask =
        pdfjsLib.getDocument({
            data: new Uint8Array(
                pdfBuffer,
            ),
            useWorkerFetch: false,
            isEvalSupported: true,
        });

    const pdfDocument =
        await loadingTask.promise;

    const workbook =
        new ExcelJS.Workbook();

    workbook.creator =
        "PDF Tools";

    workbook.created =
        new Date();

    let extractedRows = 0;

    for (
        let pageNumber = 1;
        pageNumber <=
        pdfDocument.numPages;
        pageNumber++
    ) {
        const page =
            await pdfDocument.getPage(
                pageNumber,
            );

        const textContent =
            await page.getTextContent();

        const items: PdfTextItem[] = [];

        for (const rawItem of textContent.items) {
            if (
                !("str" in rawItem) ||
                !rawItem.str.trim()
            ) {
                continue;
            }

            const transform =
                rawItem.transform;

            const x = transform[4];

            const y = transform[5];

            const scaleX = Math.sqrt(
                transform[0] *
                    transform[0] +
                    transform[1] *
                        transform[1],
            );

            const scaleY = Math.sqrt(
                transform[2] *
                    transform[2] +
                    transform[3] *
                        transform[3],
            );

            const width =
                rawItem.width ||
                rawItem.str.length *
                    scaleX *
                    0.5;

            const height =
                rawItem.height ||
                scaleY;

            items.push({
                text: rawItem.str.trim(),
                x,
                y,
                width,
                height,
            });
        }

        const rows =
            groupItemsIntoRows(items);

        const pageRows =
            buildColumns(rows);

        if (pageRows.length === 0) {
            continue;
        }

        const worksheet =
            workbook.addWorksheet(
                `Page ${pageNumber}`,
            );

        for (
            let rowIndex = 0;
            rowIndex < pageRows.length;
            rowIndex++
        ) {
            const values =
                pageRows[rowIndex];

            const row =
                worksheet.addRow(
                    values,
                );

            row.eachCell(
                (cell) => {
                    cell.alignment = {
                        vertical: "top",
                        wrapText: true,
                    };
                },
            );
        }

        const columnCount =
            Math.max(
                ...pageRows.map(
                    (row) =>
                        row.length,
                ),
            );

        for (
            let columnIndex = 1;
            columnIndex <= columnCount;
            columnIndex++
        ) {
            let maximumLength = 10;

            for (
                const row of pageRows
            ) {
                const value =
                    row[columnIndex - 1];

                if (value) {
                    maximumLength =
                        Math.max(
                            maximumLength,
                            value.length + 2,
                        );
                }
            }

            worksheet.getColumn(
                columnIndex,
            ).width = Math.min(
                maximumLength,
                50,
            );
        }

        extractedRows +=
            pageRows.length;
    }

    if (extractedRows === 0) {
        throw new Error(
            "No readable text was found in the PDF. This PDF may be scanned or image-based.",
        );
    }

    const output =
        await workbook.xlsx.writeBuffer();

    return Buffer.from(output);
}