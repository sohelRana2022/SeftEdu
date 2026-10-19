export type Student = {
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

export const SeatPlanHtml = (student: Student): string => {
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
        <h2 class="title-name">${'বার্ষিক পরীক্ষা ২০২৬ খ্রি।'} </h2>
      </div>

      </hr>
      <!-- TITLE -->

      <div class="card-title">
        প্রবেশপত্র
      </div>


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


      <!-- SIGNATURE -->

      <div class="signature-area">
        <div class="sign">
          <img
            src="file:///android_asset/images/sign_1.png"
            alt="Sign"           
          />
          <div class="signature">
          পরিচালকের স্বাক্ষর
        </div>
        </div>


      </div>


      <!-- SERIAL -->

      <div class="serial">
        ${String(student.stu_id).padStart(3, '0')}
      </div>

    </div>
  `;
};
