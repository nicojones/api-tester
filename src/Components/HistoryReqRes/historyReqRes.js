import React, {Component} from 'react';
// import Global from './../globals';

class RequestAndHeaders extends Component {
  
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
    console.log("?");
    if (this.props.headers) {
      for (let header in this.props.headers) {
        headers.push(header + ': ' + this.props.headers[header]);
      }
      return headers.join("\n")
    } else {
      return 'n/a'
    }
  }
  
  render() {
    
    
    return (
      <div className="col">
        <h5>method type: {this.props.options.method}</h5>
        <div className="w_100"></div>
        <ul className="list-inline">
          <li onClick={this.showRequest} className={'list-inline-item pointer ' + (this.state.requestShown ? '' : 'faded')}>request</li>
          <li onClick={this.showHeaders} className={'list-inline-item pointer ' + (this.state.requestShown ? 'faded' : '')}>headers</li>
        </ul>
        {
          this.state.requestShown
          ? <textarea value={this.props.request} className="form-control" disabled={true}/>
          : <textarea value={this.formatHeaders()} className="form-control" disabled={true}/>
        }
      </div>
    )
  }
}

export default RequestAndHeaders;