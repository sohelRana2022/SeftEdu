import { generatePdf } from '../../lib/pdf_utils/generatePdf';
import { savePdfToDownloads } from '../../lib/pdf_utils/downloadPdf';
import { admitCardHtml } from '../../lib/pdf_utils/admitCards/admitCardHtml';
import { Student } from '../../lib/pdf_utils/admitCards/SeatPlanHtml';

const students: Student[] = [
  {
    stu_id: '20260207045',
    stu_name: 'SOhel Rana',
    stu_class: 'Seven',
    section: 'Section-A',
    roll: 12,
    gender: 'Male',
    father_name: 'Shahjahan Ali',
    mother_name: 'Sofia Begum',
    sef_branch: 'Tarakandi',
  },
];

// ==========================================================
// ESCAPE HTML
// ==========================================================

export const escapeHtml = (value: any) => {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// ==========================================================
// CREATE ONE TOKEN HTML
// ==========================================================

const handleCreateAdmitCardPdf = async (
  data: [],
  examName: string,
  title: string,
) => {
  try {
    const html = admitCardHtml(data, examName, title);

    const pdf = await generatePdf({
      html,
      fileName: `${'test'}.pdf`,
    });

    const downloadPath = await savePdfToDownloads(pdf.filePath, pdf.fileName);

    console.log('PDF saved:', downloadPath);
  } catch (error) {
    console.error('PDF download error:', error);
  }
};
