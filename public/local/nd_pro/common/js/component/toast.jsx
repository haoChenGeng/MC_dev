var React = require('react');
var assign = require('object-assign');

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible || false,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.visible != this.state.visible) {
      this.setState({visible: newProps.visible});
    }
  }

	render() {
    var _style = this.state.visible == true ? styles.show : styles.hide;
  	return (
			<div style={assign({}, styles.toast, _style)}>
        {this.props.text}
			</div>
  	)
  }

  _close = (e) => {
    this.setState({
      visible: false,
    })
  }
}

var styles = {
  toast: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    transition: 'all .3s ease-in',
    zIndex: '99',
  },
  // 隐藏对话层
  hide: {
    opacity: '0',
    display: 'none',
  },
  // 显示对话层
  show: {
    opacity: '1',
    display: 'block',
  },
}


module.exports = Toast;