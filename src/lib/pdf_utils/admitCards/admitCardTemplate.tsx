

export type AdmitCardStudent = {
  stu_id?: string;
  stu_name?: string;
  stu_class?: string;
  section?: string;
  roll?: string | number;
  gender?: string;
  father_name?: string;
  mother_name?: string;
  sef_branch?: string;
  [key: string]: any;
};

export const createAdmitCard = (
  student: AdmitCardStudent,
  examName: string,
  title: string,
): string => {
  const currentYear = new Date().getFullYear().toString();
  return `
    <div class="admit-card">

      <!-- SCHOOL -->

    <div class="school-logo">
      <img
        src="file:///android_asset/images/schoolLogo.png"
        alt="School Logo"           
      />
    </div>

      <div>
        <h1 class="branch-name">${student.sef_branch} শাখা </h1>
        <h2 class="title-name">${
          examName=="FSE"? "১ম সাময়িক" + ' পরীক্ষা ' + currentYear + ' খ্রি.' : examName=="SSE"? "২য় সাময়িক" + ' পরীক্ষা ' + currentYear + ' খ্রি.' : "বার্ষিক"  + ' পরীক্ষা ' + currentYear + ' খ্রি.'
        } </h2>
        <h2 class="card-title">${title} </h2>
      </div>
      
      <!-- TITLE -->



      <!-- STUDENT INFO -->

      <div class="student-info">

        <div class="row">
          <span class="label">
            শিক্ষার্থীর নাম
          </span>

          <span class="colon">
            :
          </span>

          <span class="value">
            ${student.stu_name}
          </span>
        </div>

        <div class="row">
          <span class="label">
            শ্রেণি
          </span>

          <span class="colon">
            :
          </span>

          <span class="value">
            ${student.stu_class} ( ${student.section} )
          </span>
        </div>


        <div class="row">
          <span class="label">
            রোল
          </span>

          <span class="colon">
            :
          </span>

          <span class="value">
            ${student.roll}
          </span>
        </div>



      </div>

      <!-- SERIAL -->

      <div class="serial">
        ${String(student.stu_id).padStart(3, '0')}
      </div>

    </div>
  `;
};
