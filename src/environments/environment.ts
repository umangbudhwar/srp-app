let baseUrl = null;
const apiContext = '/api/rest/srp';

if(window.location.href.indexOf('localhost') > 1){
  baseUrl = 'http://localhost:8080';
}

const userUrl = {
  authenticate: baseUrl + apiContext + '/authenticate',
  registerFaculty: baseUrl + apiContext + '/faculty/registerFaculty',
  registerStudent: baseUrl + apiContext + '/student/registerStudent',
  getStreams: baseUrl + apiContext + '/stream/getStreams',
  getSubjects: baseUrl + apiContext + '/subject/getSubjects',
}

const apiUrl = {
  UserUrl: userUrl 
};

export const environment = {
  production: false,
  baseUrl: baseUrl,
  apiUrl: apiUrl
};