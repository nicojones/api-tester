
import axios from 'axios';

export default function sendAndProcessRequest(request, endPoint, options, callback) {

  let headers = {}, rawHeaders = options.headers.split("\n");
  for (let i = 0; i < rawHeaders.length; ++i) {
    if (rawHeaders[i]) {
      let parts = rawHeaders[i].split(':');
      headers[parts[0]] = parts[1];
    }
  }
  
  let axiosTime = performance.now();
  
  axios[options.method](endPoint, {
    params: {
      results: request,
      inc: 'name,picture,cell'
    },
    headers: headers
  })
    .then(response => {
      
      callback({
        response: response,
        time: performance.now() - axiosTime,
      });
      
    })
    .catch(function (error) {
      console.log(error);
  
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