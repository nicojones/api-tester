import React, {Component} from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal shown" tabIndex="-1" role="dialog">
        <div className="modal-mask" onClick={ this.props.onClose || void(0) }/>
        <div className={'modal-dialog ' + (this.props.modalLarge ? 'modal-xl' : '')} role="document">
          <div className="modal-content">
            <div className="modal-header">
              {this.props.header}
              {this.props.button}
            </div>
            <div className="modal-body">
              {this.props.body}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;