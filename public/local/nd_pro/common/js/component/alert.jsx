var React = require('react');
var assign = require('object-assign');

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

	render() {
    
  	return (
			<div style={styles.alert}>
        <p><span className="icon i-alert" style={styles.icon}>!</span>{this.props.text}</p>
			</div>
  	)
  }
}

var styles = {
  alert: {
    padding: '.4em 1em',
    color: '#FF8300',
    backgroundColor: '#F4F4F4'
  },
  icon: {
    marginRight: '5px',

  }
}


module.exports = Alert;