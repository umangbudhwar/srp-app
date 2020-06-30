let baseUrl = null;
const apiContext = '/api/rest/srp';

if(window.location.href.indexOf('localhost') > 1){
  baseUrl = 'http://localhost:8081';
}

const userUrl = {
  authenticate: baseUrl + apiContext + '/authenticate',
  registerFaculty: baseUrl + apiContext + '/faculty/registerFaculty',
  registerStudent: baseUrl + apiContext + '/student/registerStudent',
  getStreams: baseUrl + apiContext + '/stream/getStreams',
  getSubjects: baseUrl + apiContext + '/subject/getSubjects',
  getStudents: baseUrl + apiContext + '/student/getStudentForReportGeneration',
  /* updateStudent: baseUrl + apiContext + '/student/updateStudents', */
  fetchStudentList: baseUrl + apiContext + '/student/fetchStudentList',
  updateGroupCode: baseUrl + apiContext + '/student/updateGroupCode',
  loadCountOfStudentYearWise: baseUrl + apiContext + '/student/loadCountOfStudentYearWise',
  fetchYearWiseStudentRecords: baseUrl + apiContext + '/student/fetchYearWiseStudentRecords',
  updateBatchGroupCode : baseUrl + apiContext + '/student/updateBatchGroupCode',
  findIfUserNameExist: baseUrl + apiContext + '/student/findIfUserNameExist',
  findIfFacultyUserNameExist: baseUrl + apiContext + '/faculty/findIfFacultyUserNameExist',
  fetchStudentForVerification: baseUrl + apiContext + '/student/fetchStudentForVerification',
  // verifyStudent: baseUrl + apiContext + '/student/verifyStudent',
}

const apiUrl = {
  UserUrl: userUrl 
};

export const environment = {
  production: true,
  baseUrl: baseUrl,
  apiUrl: apiUrl
};