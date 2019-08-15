import { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class ClickOutside extends Component {
  handleClickOutside = e => {
    const { onClick } = this.props;
    onClick(e);
  }

  render() {
    return this.props.children;
  }
}

export default onClickOutside(ClickOutside);