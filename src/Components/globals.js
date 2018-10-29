const messages = {
  requestValue: 'please send a request first'
};

const globals = {
  appName: 'API tester',
  appDesc: 'Test API calls',
  theme: {
    dark: {
      background: '#444444',
      color: '#eee'
    },
    light: {
      background: '#fefefe',
      color: '#111111'
    },
  },
  col: {
    wide: 'col col-10 offset-1',
    narrow: 'col col-10 offset-1 col-md-6 offset-md-3'
  },
  
  emptyHistory: {
    requestValue: messages.requestValue,
    options: {
      method: 'n/a',
      headers: 'n/a',
    },
    headers: null,
    responseText: messages.requestValue,
    time: 'n/a',
    index: -1,
    timeStamp: new Date(0)
  },
  
  defaultState: {
    current: {
      requestValue: '3',
      endPoint: 'https://reqres.in/api/users',
      options: {
        method: 'get',
        headers: ''
      },
      //responseText: null, // this we don't need
      time: 0,
      index: -1,
      notes: "",
      timeStamp: new Date(0)
    },
    history: [],
    index: -1,
    axiosRunning: false,
    settings: {
      light: true
    }
  },
};

export default globals;