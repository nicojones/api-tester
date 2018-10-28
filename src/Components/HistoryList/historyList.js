import React, {Component} from 'react';

import Modal from './../Modal/modal';
import readableDate from './../Logic/readableDate';
import historyPNG from './../../Assets/images/history.png';
import deletePNG from './../../Assets/images/delete.png';
import heartPNG from './../../Assets/images/heart.png';
import heartemptyPNG from './../../Assets/images/heartempty.png';

class HistoryList extends Component {
  
  render() {
    let rendered = [];
    for (let i = 0; i < this.props.history.length; ++i) {
      let historyState = this.props.history[i];
      rendered.push (
        <li key={i} className="d-block w-100 float-left">
          <span className="text-monospace float-left pointer" onClick={() => this.props.setHistory(i)}>
            {historyState.index + 1}. &nbsp; <code>{historyState.options.method}</code> | <samp>{historyState.endPoint}</samp> | {historyState.time}ms | {readableDate(historyState.timeStamp)}
          </span>
          <span className="float-right">
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-primary" title="Remove" onClick={() => this.props.removeHistory(i)}>
              <img src={deletePNG} className="icon" alt="delete png"/>
            </button>
              &nbsp;&nbsp;
            <button className={"btn btn-sm btn-" + (historyState.bookmarked ? "" : "outline-") + "danger"}
                    onClick={() => this.props.bookmarkHistory(i, !historyState.bookmarked)} title="Bookmark">
              <img src={(historyState.bookmarked ? heartPNG : heartemptyPNG)} className="icon" alt="heart png"/>
            </button>
          </span>
        </li>
      );
    }
    
    let button = <button className="btn btn-outline-primary btn-sm" onClick={this.props.showHistory}>&times;</button>;
    
    let header = <h4 style={{width: '100%'}}>history <img className="icon" src={historyPNG} alt="history png"/></h4>;
    
    let body   = <ul className="list-unstyled">{rendered}</ul>;
    
    return (
      <Modal button={button} header={header} body={body} onClose={this.props.showHistory} modalLarge={true}/>
    )
  }
}

export default HistoryList;