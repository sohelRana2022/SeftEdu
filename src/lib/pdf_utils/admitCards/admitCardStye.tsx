export const admitCardStyle = `
 @font-face { 
 font-family: 'SutonnyOMJ'; 
 src: url('file:///android_asset/fonts/SutonnyOMJ.ttf'); 
 font-weight: 900; 
 } 
 
 @font-face { 
 font-family: 'SutonnyOMJ'; 
 src: url('file:///android_asset/fonts/SutonnyOMJ.ttf'); 
 font-weight: 700; 
 } 

 @font-face { 
 font-family: 'NotoBangla'; 
 src: url('file:///android_asset/fonts/NotoSerifBengali_Condensed-Bold.ttf'); 
 font-weight: 900; 
 } 

 @font-face { 
 font-family: 'HindSiliguri'; 
 src: url('file:///android_asset/fonts/HindSiliguri-Light.ttf'); 
 font-weight: 300; 
 } 
 
 @font-face { 
 font-family: 'HindSiliguri'; 
 src: url('file:///android_asset/fonts/HindSiliguri-Regular.ttf'); 
 font-weight: 400; 
 } 

  
 @font-face { 
 font-family: 'HindSiliguri'; 
 src: url('file:///android_asset/fonts/HindSiliguri-SemiBold.ttf'); 
 font-weight: 600; 
 } 
 /* ========================================================= 
 A4 PAGE A4 = 210mm × 297mm 
 ========================================================= */ 
 @page { 
 size: A4 portrait; 
 margin: 0; 
 } 
 html, body { 
 margin: 0; 
 padding: 0; 
 width: 210mm; 
 height: 297mm; 
 } 
 body { 
 font-family: 'HindSiliguri'; 
 font-size: 8px; 
 color: #000; 
 } 
 /* ========================================================= 
 PAGE 2 COLUMN × 4 ROW = 8 CARDS A4: Width = 210mm Height = 297mm Page padding: Left / Right = 10mm Top / Bottom = 10mm Available width: 210 - 20 = 190mm Column gap: 6mm Card width: (190 - 6) / 2 = 92mm Available height: 297 - 20 = 277mm Row gap: 5mm × 3 = 15mm Card height: (277 - 15) / 4 = 65.5mm ========================================================= */ 
 
 .page { 
 width: 210mm; 
 height: 297mm; 
 box-sizing: border-box; 
 padding: 10mm; 
 display: grid; 
 grid-template-columns: repeat(2, 1fr); 
 grid-template-rows: repeat(4, 1fr); 
 column-gap: 6mm; 
 row-gap: 5mm; 
 page-break-after: always; 
 break-after: page; 
 } 
 .page:last-child { 
 page-break-after: auto; 
 break-after: auto; 
 } 
 
 /* ========================================================= 
 ADMIT CARD 
 ========================================================= */ 
 .admit-card { 
 position: relative; 
 box-sizing: border-box; 
 width: 100%; 
 height: 100%; 
 border: 1px dashed #555; 
 padding: 4mm; 
 overflow: visible; 
 page-break-inside: avoid; 
 break-inside: avoid; 
 margin: 0; 
 } 
 /* ========================================================= 
 SCHOOL LOGO 
 ========================================================= */ 
 .school-logo { 
 display: flex; 
 align-items: center; 
 justify-content: center; 
 height: 14mm; 
 margin-bottom: 1mm; 
 } 
 .school-logo img { 
 display: block; 
 max-width: 85%; 
 max-height: 10mm; 
 width: auto !important; 
 height: auto !important; 
 object-fit: contain; 
 } 
 /* ========================================================= 
 SCHOOL NAME 
 ========================================================= */ 
 .branch-name { 
 font-family: 'SutonnyOMJ'; 
 font-weight: 900; 
 text-align: center; 
 font-size: 26px; 
 line-height: 22px; 
 padding-bottom: 1px; 
 margin-top: -16px;
 white-space: nowrap; 
 overflow: hidden; 
 text-overflow: ellipsis; 
 } 
 
 /* ========================================================= 
 TITLE 
 ========================================================= */ 
.title-name {
 font-family: 'SutonnyOMJ'; 
 font-weight: 900; 
 text-align: center; 
 font-size: 22px; 
 line-height: 20px; 
 padding: 2px 0px; 
 margin-top: -17px;
 white-space: nowrap; 
 overflow: hidden; 
 text-overflow: ellipsis; 
}




.card-title { 
text-align: center; 
font-family: 'HindSiliguri'; 
font-weight: 600; 
font-size: 20px; 
line-height: 10px;
} 

/* ========================================================= 
STUDENT INFORMATION 
========================================================= */ 
.student-info { 
margin-top: 5px; 
} 
.row {
  display: flex;
  width: 100%;
  line-height: 18px;
  min-height: 14px;
  margin-top:2px
}

.label {
  width: 30%;
  font-family: 'SutonnyOMJ';
  font-weight: 900;
  font-size: 22px;
  line-height: 20px;
  flex-shrink: 0;
  display: block;
}

.colon {
  width: 5%;
  font-size: 20px;
  line-height: 18px;
  white-space: nowrap;
  flex-shrink: 0;
  text-align: center;
}

.value {
  width: 65%;
  font-family: 'HindSiliguri';
  font-size: 20px;
  line-height: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}
/* ========================================================= 
SIGNATURE 
========================================================= */ 
.signature-area { 
position: absolute; 
bottom: 2mm; 
right: 4mm; 
display: flex; 
font-size: 6px; 
padding-top: 3px; 
} 
.sign img { 
 display: block; 
 max-width: 22mm; 
 max-height: 22mm; 
 width: auto !important; 
 height: auto !important; 
 object-fit: contain;
 padding-left:20px;
 } 
.signature { 
width: 100%; 
border-top: 1px solid #555; 
text-align: center; 
font-size: 16px;
} 
/* ========================================================= 
SERIAL / ID 
========================================================= */ 
.serial { 
position: absolute; 
right: 3mm; 
top: 2.5mm; 
font-size: 14px; 
color: #2e2d2d; 
} `;
