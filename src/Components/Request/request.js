import React, {Component} from 'react';

import headersPNG from './../../Assets/images/headers.png';


class Request extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionsChange  = this.handleOptionsChange.bind(this);
    
    this.toggleHeaders = this.toggleHeaders.bind(this);
    
    this.state = {
      current: this.props.current,
      showHeaders: false
    }
  }
  
  handleChange(e, key) {
    let current = this.state.current;
    current[key] = e.target.value;
    this.props.updateState({current: current});
  };
  handleOptionsChange(e, key) {
    let current = this.state.current;
    current.options[key] = e.target.value;
    this.props.updateState({current: current});
  };
  
  toggleHeaders() {
    this.setState({showHeaders: !this.state.showHeaders});
  }
  
  // componentDidUpdate(prevProps, prevState) {
    // console.log("did update")
    // only update chart if the data has changed
    // console.log(prevProps.current, this.props.current)
  // }
  
  render() {
    return (
      <div className="col App-reqres-container">
        <input  className="form-control col-9 float-left" value={this.props.current.endPoint} onChange={(e) => this.handleChange(e, 'endPoint')}/>
        <select className="form-control col-2 float-left" value={this.props.current.options.method} onChange={(e) => this.handleOptionsChange(e, 'method')}>
          <option value="post">post</option>
          <option value="get">get</option>
        </select>
        <button className="btn btn-sm btn-light col-1" title="Custom Headers" onClick={this.toggleHeaders}>
          <img alt="headers png" src={headersPNG} className="icon"/></button>
        {this.state.showHeaders &&
          <textarea className="form-control" value={this.props.current.options.headers}
                  onChange={(e) => this.handleOptionsChange(e, 'headers')} placeholder="example -> content-type: application-json"
                  title="one per line" rows={2}/>
        }
        <textarea className="form-control tall-60" value={this.props.current.requestValue}  onChange={(e) => this.handleChange(e, 'requestValue')} />
        <br/>
        <textarea className="form-control" value={this.props.current.notes} placeholder="// you can save stuff here"
                  onChange={(e) => this.handleChange(e, 'notes')} rows={6}/>
      </div>
    )
  }
}

export default Request;