export default function processRequest(current, responseData, history, newIndex) {

  let responseText, responseHeaders;
  try {
    responseText = JSON.stringify(responseData.response.data);
    responseHeaders = responseData.response.headers;
  } catch(e) {
    responseText = responseData.response.error.toString();
    responseHeaders = {"server returned error": JSON.stringify(responseData.response.error)};
  }
  
  
  let currentState = {
    responseText: responseText,
    time: responseData.time,
    requestValue: current.requestValue,
    endPoint: current.endPoint,
    options: {
      method: current.options.method,
      headers: current.options.headers
    },
    index: newIndex,
    headers: responseHeaders,
    notes: current.notes,
    timeStamp: (new Date()).toString(),
    error: responseData.response.error || false
  };
  
  history.push(currentState);
  
  return {
    current: currentState,
    last: currentState,
    history: history,
    index: newIndex,
    axiosRunning: false
  };
  
}