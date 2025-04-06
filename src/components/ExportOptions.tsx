import React from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { formatCurrency } from '../utils/formatters';

interface ExportOptionsProps {
  data: any;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ data }) => {
  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(20);
      doc.text('Profit & Loss Statement', 14, 20);

      // Add date
      doc.setFontSize(11);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

      // Format data for the table
      const tableData = data.map((item: any) => [
        item.date,
        item.description,
        item.category,
        formatCurrency(item.amount),
        item.type
      ]);

      // Add the table
      autoTable(doc, {
        head: [['Date', 'Description', 'Category', 'Amount', 'Type']],
        body: tableData,
        startY: 40,
        styles: { fontSize: 9 },
        headStyles: { 
          fillColor: [48, 86, 148],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        margin: { top: 40 },
      });

      // Add totals
      const totalIncome = data
        .filter((item: any) => item.type === 'Income')
        .reduce((sum: number, item: any) => sum + item.amount, 0);

      const totalExpenses = data
        .filter((item: any) => item.type === 'Expense')
        .reduce((sum: number, item: any) => sum + item.amount, 0);

      const netIncome = totalIncome - totalExpenses;

      const finalY = (doc as any).lastAutoTable.finalY || 150;
      
      doc.setFontSize(10);
      doc.text(`Total Income: ${formatCurrency(totalIncome)}`, 14, finalY + 10);
      doc.text(`Total Expenses: ${formatCurrency(totalExpenses)}`, 14, finalY + 20);
      doc.setFont(undefined, 'bold');
      doc.text(`Net Income: ${formatCurrency(netIncome)}`, 14, finalY + 30);

      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      // Save the PDF
      doc.save('profit_and_loss_statement.pdf');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      className="button-premium flex items-center gap-3 px-5 py-2.5 rounded-lg
               text-white font-medium
               hover:shadow-lg
               transition-all duration-200
               bg-gradient-to-r from-[hsl(var(--navy-600))] to-[hsl(var(--navy-700))]"
    >
      <Download className="h-5 w-5" />
      <span>Download PDF</span>
    </button>
  );
}; 