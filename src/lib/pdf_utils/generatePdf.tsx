import {generatePDF} from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

export interface GeneratePdfOptions {
  fileName?: string;
  html: string;
}

export interface GeneratedPdf {
  filePath: string;
  fileName: string;
}

export const generatePdf = async ({
  html,
  fileName = `SEF_Report_${Date.now()}`,
}: GeneratePdfOptions): Promise<GeneratedPdf> => {
  try {
    const safeFileName = fileName.replace(/\.pdf$/i, '');

    const options = {
      html,
      fileName: safeFileName,
      width: 595,
      height: 842,
      base64: false,

      fonts: [
        '/fonts/HindSiliguri-Regular.ttf',
        '/fonts/HindSiliguri-Bold.ttf',
        '/fonts/SutonnyOMJ.ttf',
        '/fonts/TiroBangla-Regular.ttf',
      ],
    };

    // TypeScript-এর PDFOptions-এ fonts নেই,
    // কিন্তু react-native-html-to-pdf 1.3.0 Android runtime-এ এটি support করে।
    const pdf = await generatePDF(options as any);

    if (!pdf.filePath) {
      throw new Error('PDF file path পাওয়া যায়নি।');
    }

    const exists = await RNFS.exists(pdf.filePath);

    if (!exists) {
      throw new Error('PDF file তৈরি হয়েছে কিন্তু পাওয়া যাচ্ছে না।');
    }

    return {
      filePath: pdf.filePath,
      fileName: `${safeFileName}.pdf`,
    };
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('PDF তৈরি করা সম্ভব হয়নি।');
  }
};
