'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface ExportDataProps {
  data: any[]
  filename: string
  title?: string
}

export function ExportData({ data, filename, title = 'Supply Chain Data' }: ExportDataProps) {
  const exportToCSV = () => {
    if (!data || data.length === 0) return

    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row =>
      Object.values(row).map(val =>
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    )

    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, `${filename}.csv`)
  }

  const exportToExcel = () => {
    if (!data || data.length === 0) return

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')

    // Auto-size columns
    const maxWidth = data.reduce((w: any, r: any) => {
      return Object.keys(r).map((k, i) =>
        Math.max(w[i] || 10, String(r[k]).length)
      )
    }, [])
    worksheet['!cols'] = maxWidth.map((w: number) => ({ wch: w + 2 }))

    XLSX.writeFile(workbook, `${filename}.xlsx`)
  }

  const exportToPDF = () => {
    if (!data || data.length === 0) return

    const doc = new jsPDF()

    // Add title
    doc.setFontSize(18)
    doc.text(title, 14, 22)

    // Add metadata
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32)
    doc.text(`Total Records: ${data.length}`, 14, 38)

    // Prepare table data
    const headers = Object.keys(data[0])
    const rows = data.map(row => Object.values(row).map(v => String(v)))

    // Add table
    autoTable(doc, {
      head: [headers],
      body: rows as any,
      startY: 45,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { top: 45 }
    })

    doc.save(`${filename}.pdf`)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToCSV}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
        disabled={!data || data.length === 0}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        CSV
      </button>

      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        disabled={!data || data.length === 0}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Excel
      </button>

      <button
        onClick={exportToPDF}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
        disabled={!data || data.length === 0}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        PDF
      </button>
    </div>
  )
}

// Dropdown version for compact spaces
export function ExportDropdown({ data, filename, title = 'Supply Chain Data' }: ExportDataProps) {
  const [isOpen, setIsOpen] = useState(false)

  const exportToCSV = () => {
    if (!data || data.length === 0) return
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(','))
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, `${filename}.csv`)
    setIsOpen(false)
  }

  const exportToExcel = () => {
    if (!data || data.length === 0) return
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
    XLSX.writeFile(workbook, `${filename}.xlsx`)
    setIsOpen(false)
  }

  const exportToPDF = () => {
    if (!data || data.length === 0) return
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(title, 14, 22)
    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32)
    const headers = Object.keys(data[0])
    const rows = data.map(row => Object.values(row).map(v => String(v)))
    autoTable(doc, {
      head: [headers],
      body: rows as any,
      startY: 40,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [37, 99, 235] }
    })
    doc.save(`${filename}.pdf`)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        disabled={!data || data.length === 0}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        Export
        <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700">
          <button
            onClick={exportToCSV}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <span className="text-green-600 font-mono font-bold">CSV</span>
            <span className="text-sm">Comma-separated</span>
          </button>
          <button
            onClick={exportToExcel}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors border-t border-gray-200 dark:border-gray-700"
          >
            <span className="text-blue-600 font-mono font-bold">XLS</span>
            <span className="text-sm">Excel workbook</span>
          </button>
          <button
            onClick={exportToPDF}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-300 transition-colors border-t border-gray-200 dark:border-gray-700 rounded-b-lg"
          >
            <span className="text-red-600 font-mono font-bold">PDF</span>
            <span className="text-sm">Printable report</span>
          </button>
        </div>
      )}
    </div>
  )
}
