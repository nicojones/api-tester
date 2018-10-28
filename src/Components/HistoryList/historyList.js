import React, {Component} from 'react';

class History extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e) {
    let index = e.target.value;
    this.props.setHistory(index);
  }
  
  render() {
    let rendered = [];
    for (let i = 0; i < this.props.history.length; ++i) {
      let historyState = this.props.history[i];
      rendered.push (
        <li key={i} value={historyState.index} onClick={this.handleClick} className="pointer">
          #{historyState.index + 1} | time: {historyState.time}ms
        </li>
      );
    }
    return (
      <div className="col">
        {this.props.history.length
          ? <h4>history</h4>
          : ''
        }
        <ul className="list-unstyled">
          {rendered}
        </ul>
      </div>
    )
  }
}

export default History;