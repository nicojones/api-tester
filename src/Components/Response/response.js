import React, {Component} from 'react';

import HistoryList from './../HistoryList/historyList';
import HistoryReqRes from './../HistoryReqRes/historyReqRes';

import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import json from 'react-syntax-highlighter/languages/hljs/json';
import xml from 'react-syntax-highlighter/languages/hljs/xml';
import docco from 'react-syntax-highlighter/styles/hljs/docco';
import dark from 'react-syntax-highlighter/styles/hljs/dark';

import historyPNG from './../../Assets/images/history.png';

// import Global from './../globals';
registerLanguage('json', json);

class Response extends Component {
  constructor(props) {
    super(props);
    
    // this.showHistory = this.showHistory.bind(this);
    this.showHistory = this.showHistory.bind(this);
    
    this.state = {
      isHistoryShown: false
    }
  }
  
  showHistory() {
    this.setState({isHistoryShown: !this.state.isHistoryShown});
  }
  
  render () {
    return (
      <div className={'col-7 App-reqres-container ' + (this.props.last.error ? 'api-error' : '')}>
        <div className={'col tall-60'}>
          <h5>
            <code>{this.props.last.options.method}</code>
            &nbsp;&nbsp;&nbsp;
            <samp>{this.props.last.endPoint}</samp>
            <kbd className="bg-neutral float-right pointer"
                 onClick={this.showHistory}>#{this.props.last.index + 1} | {this.props.last.time} ms&nbsp;&nbsp;
              <img alt="history png" src={historyPNG} className="icon"/></kbd>
          </h5>
          {/*<textarea className="form-control tall-100" value={this.props.last.responseText} readOnly={true}/>*/}
          <SyntaxHighlighter language='json' class="form-control tall-100" codeTagProps={{'className': 'wordwrap text-left'}}
                             style={this.props.light ? docco : dark}>{this.props.last.responseText}</SyntaxHighlighter>
          
          <HistoryReqRes last={this.props.last}/>
        </div>
        {this.state.isHistoryShown &&
          <HistoryList history={this.props.history} showHistory={this.showHistory}
                       bookmarkHistory={this.props.bookmarkHistory}
                       setHistory={this.props.setHistory} removeHistory={this.props.removeHistory}/>
        }
      </div>
    )
  }
}

export default Response;