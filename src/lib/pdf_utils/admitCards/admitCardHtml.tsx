import {AdmitCardStudent, createAdmitCard} from './admitCardTemplate';

import {admitCardStyle} from './admitCardStye';

export const admitCardHtml = (
  students: AdmitCardStudent[],
  selectedExam: string,
  tokenType: string,
): string => {
  const pages: string[] = [];

  // প্রতি A4 পেজে ৮টি admit card
  // ২ কলাম × ৪ সারি
  const CARDS_PER_PAGE = 8;

  for (let i = 0; i < students.length; i += CARDS_PER_PAGE) {
    const pageStudents = students.slice(i, i + CARDS_PER_PAGE);

    const cards = pageStudents
      .map(student => createAdmitCard(student, selectedExam, tokenType))
      .join('');

    pages.push(`
      <div class="page">
        ${cards}
      </div>
    `);
  }

  return `
    <!DOCTYPE html>

    <html lang="bn">

      <head>

        <meta charset="UTF-8">

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        >

        <style>
          ${admitCardStyle}
        </style>

      </head>

      <body>

        ${pages.join('')}

      </body>

    </html>
  `;
};
