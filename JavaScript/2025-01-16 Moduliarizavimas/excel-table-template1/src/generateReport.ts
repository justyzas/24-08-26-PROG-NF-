import ExcelJS from "exceljs";
import { ExcelWorksheetOptions, HeaderMapOption } from "../types.js";

function createTableHeaders(
	row: number,
	column: number,
	headers: string[],
	sheet: ExcelJS.Worksheet
): void {
	headers.forEach((header, index) => {
		const cell = sheet.getCell(row, column + index);
		cell.value = header;
		cell.font = { bold: true };
		cell.alignment = { horizontal: "center" };
	});
}

function createTableData(
	data: any[],
	keys: string[],
	cell: ExcelJS.Cell,
	worksheet: ExcelJS.Worksheet
): void {
	data.forEach((saleData, rowIndex) => {
		//eina per duomenis (eilutes)
		keys.forEach((key, columnIndex) => {
			// eina per stulpelius
			const dataCell = worksheet.getCell(
				cell.fullAddress.row + rowIndex,
				cell.fullAddress.col + columnIndex
			);
			dataCell.value = saleData[key];
		});
	});
}

function autoFitColumns(sheet: ExcelJS.Worksheet) {
	sheet.columns.forEach((column, index) => {
		let maxWidth = 10;
		column.eachCell((cell, rowNumb) => {
			if (rowNumb !== 1) {
				const cellValue = `${cell.value}`;
				console.log(cellValue);
				if (cellValue.length * 1.12 > maxWidth) {
					maxWidth = cellValue.length * 1.12;
				}
			}
		});
		column.width = maxWidth;
	});
}

export async function generateReport(
	data: any[],
	options: ExcelWorksheetOptions,
	headerMapOptions: HeaderMapOption[]
) {
	const workbook = new ExcelJS.Workbook(); // Excel workbooko sukūrimas
	const sheet = workbook.addWorksheet(options.worksheetName); // Excel darbo lapo sukūrimas

	sheet.mergeCells("A1:F1"); //Celių nuo A1 iki F1 sujungimas

	const a1 = sheet.getCell("A1"); // Celės gavimas pagal pavadinimą
	a1.value =
		options.title === undefined ? options.worksheetName : options.title; // Celės reikšmės pridėjimas

	a1.font =
		options.titleFont === undefined
			? { name: "Calibri", size: 20, bold: true }
			: options.titleFont; // Celės šrifto aprašymas

	a1.alignment = { horizontal: "center", vertical: "middle" }; // celės horizontalios ir vertikalios lygiuotės keitimas

	sheet.getRow(1).height = 55; // Eilutės aukščio numatymas

	createTableHeaders(
		4,
		1,
		headerMapOptions.map((option) => option.header),
		sheet
	); //stulpeliu pavadinimu eilutes kurimas
	const tableStartCell = sheet.getCell("A5");
	createTableData(
		data,
		headerMapOptions.map((option) => option.key),
		tableStartCell,
		sheet
	); //Visos lentelės sukūrimas
	autoFitColumns(sheet);
	await workbook.xlsx.writeFile("report.xlsx"); // Excel woorkbook'o failo sukūrimas
}

// generateReport([],{})
