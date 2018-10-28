import React, {Component} from 'react';

import lightbulbPNG from './../../Assets/images/lightbulb.png';

import Global from './../globals';

class Settings extends Component {
  constructor(props) {
    super (props);
    
    this.changeTheme = this.changeTheme.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
  }
  
  changeTheme(e) {
    this.props.setSettings({
      light: !this.props.settings.light
    });
  }
  
  changeBackgroundColor(e) {
    let backgroundColor =
      e.target.value.length >= 4
        ? e.target.value
        : (
          this.props.settings.light
            ? Global.theme.light.background
            : Global.theme.dark.background
        );
    this.props.setSettings({
      backgroundColor: backgroundColor
    });
  }
  
  
  render() {
    return (
      <div id="settings" style={{background: (this.props.settings.light ? Global.theme.dark.background : Global.theme.light.background)}}>
        <input type="text" name="background-color" onChange={this.changeBackgroundColor}
               className="form-control float-left" placeholder="#abcd1e"/>
        <button className={'float-left btn btn-outline-' + (this.props.settings.light ? 'dark' : 'light')} onClick={this.changeTheme}>
          <img className="icon" alt="lightbulb" src={lightbulbPNG}/>
        </button>
      </div>
    );
  }
}

export default Settings;