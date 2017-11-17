var React = require('react');
var assign = require('object-assign');

class Modal extends React.Component {
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
    var _customeStyle = this.props.customeStyle || {};
		var _style = this.state.visible == true ? styles.show : styles.hide;
    var _size = this.props.size || styles.normal;
    //  是否带有title
    if(this.props.title) {
      var _hd = (<div style={assign({}, styles.modalHead)}>
          <h4 style={assign({}, styles.modalTitle)}>{this.props.title}</h4>
        </div>)
    }
    if(this.props.closeBtn) {
      var _closeBtn = (<button style={styles.close} onClick={this.props.onClose}>&times;</button>)
    }
  	return (
			<div ref="modal" style={assign({}, styles.modal, _style)}>
        <div style={styles.mask}></div>
        <div style={assign({}, styles.container, _size, _customeStyle)}>
          {_hd}
          {this.props.children}
          {_closeBtn}
        </div>
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
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    transition: 'all .3s ease-in',
    zIndex: '99',
  },
  mask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
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
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '5px'
  },
  // 尺寸
  small: {
    width: '200px',
  },
  normal: {
    width: '92%'
  },
  big: {
    width: '600px'
  },
  // 关闭按钮
  close: {
    position: 'absolute',
    top: '-15px',
    right: '-15px',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    borderRadius: '15px',
    backgroundColor: '#ccc',
    border: 'none',
    fontSize: '16px',
  },
  // 头部
  modalHead: {
    padding: '12px 15px',
    borderBottom: '1px solid #f1f1f1'
  },
  modalTitle: {
    fontWeight: 'normal',
  }
}


module.exports = Modal;