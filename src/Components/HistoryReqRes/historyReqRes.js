import React, {Component} from 'react';
// import Global from './../globals';

class HistoryReqRes extends Component {
  
  constructor(props) {
    super(props);
    
    this.showRequest = this.showRequest.bind(this);
    this.showHeaders = this.showHeaders.bind(this);
    
    this.state = {
      requestShown: false
    }
  }
  
  showRequest() {
    this.setState({requestShown: true});
  }
  showHeaders() {
    this.setState({requestShown: false});
  }
  
  formatHeaders() {
    let headers = [];
    if (this.props.last.headers) {
      for (let header in this.props.last.headers) {
        headers.push(header + ': ' + this.props.last.headers[header]);
      }
      return headers.join("\n")
    } else {
      return 'n/a'
    }
  }
  
  render() {
    let reqresHeaders =
      (this.props.last.options.headers ? "request:\n" + this.props.last.options.headers + "\n\n" : "") +
      ("response:\n" + this.formatHeaders())
    
    return (
      <div>
        <div className="w_100"></div>
        <ul className="list-inline">
          <li onClick={this.showRequest} className={'list-inline-item pointer ' + (this.state.requestShown ? '' : 'faded')}>request</li>
          <li onClick={this.showHeaders} className={'list-inline-item pointer ' + (this.state.requestShown ? 'faded' : '')}>headers</li>
        </ul>
        {
          this.state.requestShown
          ? <textarea value={this.props.last.requestValue} className="form-control" disabled={true} rows={6}/>
          : <textarea value={reqresHeaders} className="form-control" disabled={true} rows={6}/>
        }
      </div>
    )
  }
}

export default HistoryReqRes;