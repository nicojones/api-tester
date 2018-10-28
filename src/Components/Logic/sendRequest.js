
import axios from 'axios';

export default function sendRequest(request, endPoint, options, callback) {

  let headers = {}, rawHeaders = options.headers.split("\n");
  for (let i = 0; i < rawHeaders.length; ++i) {
    if (rawHeaders[i]) {
      let parts = rawHeaders[i].split(':');
      headers[parts[0]] = parts[1];
    }
  }
  
  let axiosTime = performance.now();
  
  let params;
  try {
    params = JSON.parse(request);
  } catch (e) {
    params = request;
  }
  
  axios[options.method](endPoint, {
    params: params,
    headers: headers
  })
    .then(response => {
      
      callback({
        response: response,
        time: performance.now() - axiosTime,
      });
      
    })
    .catch(function (error) {

      callback({
        response: {
          error: error,
        },
        time: performance.now() - axiosTime,
      });
    })
    .then(function () {
      // always executed
      console.info("Request finished")
    });
}