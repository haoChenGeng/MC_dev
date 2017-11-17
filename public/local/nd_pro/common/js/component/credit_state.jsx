var React = require('react');
var assign = require('object-assign');

class CreditState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: this.props.state || 0,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.state != this.state.state) {
      this.setState({state: newProps.state});
    }
  }

	render() {
    
  	return (
			<div style={assign({})}>
        <ul style={styles.ul} className='clearfix'>
          <li style={styles.li}>
            <span style={assign({}, styles.dot, this.props.state >= 1 ? styles.currentBg : {})}></span>
            <span style={assign({}, styles.line, this.props.state >= 2 ? styles.currentBg : {})}></span>
            <span style={assign({}, this.props.state >= 1 ? styles.currentColor : {})}>身份认证</span>
          </li>
          <li style={styles.li}>
            <span style={assign({}, styles.dot, this.props.state >= 2 ? styles.currentBg : {})}></span>
            <span style={assign({}, styles.line, this.props.state >= 3 ? styles.currentBg : {})}></span>
            <span style={assign({}, this.props.state >= 2 ? styles.currentColor : {})}>绑定银行卡</span>
          </li>
          <li style={styles.li}>
            <span style={assign({}, styles.dot, this.props.state >= 3 ? styles.currentBg : {})}></span>
            <span style={assign({}, styles.line, this.props.state >= 4 ? styles.currentBg : {})}></span>
            <span style={assign({}, this.props.state >= 3 ? styles.currentColor : {})}>个人信息录入</span>
          </li>
          <li style={styles.li}>
            <span style={assign({}, styles.dot, this.props.state >= 4 ? styles.currentBg : {})}></span>
            <span style={assign({}, styles.line, this.props.state >= 5 ? styles.currentBg : {})}></span>
            <span style={assign({}, this.props.state >= 4 ? styles.currentColor : {})}>紧急联系人</span>
          </li>
          <li style={styles.li}>
            <span style={assign({}, styles.dot, this.props.state >= 5 ? styles.currentBg : {})}></span>
            <span style={assign({}, this.props.state >= 5 ? styles.currentColor : {})}>人脸识别</span>
          </li>
        </ul>
			</div>
  	)
  }
}

var styles = {
  ul: {
    width: '100%'
  },
  li: {
    position: 'relative',
    float: 'left',
    width: '20%',
    paddingTop: '2rem',
    paddingBottom: '.5rem',
    fontSize: '.7em',
    textAlign: 'center',
    color: '#999999'
  },
  dot: {
    position: 'absolute',
    left: '50%',
    top: '14px',
    display: 'block',
    width: '7px',
    height: '7px',
    marginLeft: '-3px',
    backgroundColor: '#999999',
    borderRadius: '50%',
    zIndex: 9
  },
  line: {
    position: 'absolute',
    left: '50%',
    top: '17px',
    display: 'block',
    width: '100%',
    height: '1px',
    backgroundColor: '#999999'
  },
  currentColor: {
    color: '#4F7BEE'
  },
  currentBg: {
    backgroundColor: '#4F7BEE'
  }

}


module.exports = CreditState;