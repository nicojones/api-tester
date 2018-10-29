import React, { Component } from 'react';

// CSS
import './../Assets/CSS/App.css';
import './../Assets/CSS/bootstrap.css';

// Components
import Request  from './Request/request';
import Response from './Response/response';
import Settings from './Settings/settings';

// Logic
import sendRequest from './Logic/sendRequest';
import processRequest from './Logic/processRequest';

// Globals
import Global from './globals';

class App extends Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this.keyboardShortcuts = this.keyboardShortcuts.bind(this);
    this.setHistory = this.setHistory.bind(this);
    this.removeHistory = this.removeHistory.bind(this);
    this.updateRequest = this.updateRequest.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.bookmarkHistory = this.bookmarkHistory.bind(this);
    
    this.hasLocalStorage = !!window.localStorage;
    if (!this.hasLocalStorage) {
      console.error("LocalStorage not supported in your browser. Calls won't be saved for future use");
    } else {
      // we have local storage, we read from memory
      const savedState = window.localStorage.getItem('requests');
      if (savedState) {
        this.state = JSON.parse(savedState);
      } else {
        this.state = Global.defaultState;
      }
    }
  }
  
  sendRequest(current) {
    if (this.state.axiosRunning) {
      return;
    } else {
      this.setState({axiosRunning: true});
    }
    let that = this;
    sendRequest(current.requestValue, current.endPoint, current.options, responseData => {
      let newState = processRequest(current, responseData, that.state.history, that.state.index + 1);
      that.setState(newState, this.updateLocalStorage);
    });
  }
  
  setHistory(index) {
    this.setState({current: this.state.history[index], index: index}, this.updateLocalStorage);
  }
  
  bookmarkHistory(index, bookmarked) {
    let history = this.state.history;
    history[index].bookmarked = bookmarked;
    this.setState({history: history}, this.updateLocalStorage);
  }
  
  removeHistory(index) {
    let newHistory = JSON.parse(JSON.stringify(this.state.history));
    newHistory.splice(index, 1);
    this.setState({history: newHistory}, this.updateLocalStorage);
  }
  
  keyboardShortcuts(e) {
    if (e.altKey && e.which === 65 /*A*/) {
      console.log(this.state);
    }
    if ((e.ctrlKey || e.metaKey) && e.which === 13 /* Enter key */) {
      this.sendRequest(this.state.current)
    }
  }
  
  setSettings(settings) {
    this.setState({settings: settings});
  }
  
  updateRequest(state) {
    this.setState(state);
  }
  
  updateLocalStorage() {
    if (this.hasLocalStorage) {
      window.localStorage.setItem('requests', JSON.stringify(this.state));
    }
  }
  
  render() {
    let last = this.state.history[this.state.index] || this.state.history[this.state.history.length - 1] || Global.emptyHistory;
    
    return (
      <div className={'App'}>
        <div className={"container-fluid absolute tall-100 " + (this.state.settings.light ? 'App-light' : 'App-dark')}
             style={{background: this.state.settings.backgroundColor}}>
          <div className="row" onKeyDown={this.keyboardShortcuts} id="App-container">
            <div className="col-5 App-reqres-container">
              <Request current={this.state.current}
                       updateState={this.updateRequest}
                       sendRequest={this.sendRequest}/>
            </div>
            
            <Response last={last} history={this.state.history} setHistory={this.setHistory}
                      light={this.state.settings.light}
                      removeHistory={this.removeHistory} bookmarkHistory={this.bookmarkHistory}/>
            <Settings setSettings={this.setSettings} settings={this.state.settings}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
