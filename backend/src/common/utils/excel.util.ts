import * as ExcelJS from 'exceljs'

export class ExcelUtil {
  static async generateWorkbook( sheets: { name: string; data: any[]; columns: { header: string; key: string; width?: number }[] }[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook()
    
    for (const sheet of sheets) {
      const worksheet = workbook.addWorksheet(sheet.name)
      worksheet.columns = sheet.columns
      sheet.data.forEach(row => worksheet.addRow(row))
    }
    
    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  }
}