var React = require('react');
var assign = require('object-assign');

class MessageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div ref="card" style={assign({}, styles.card)}>
        <p style={assign({}, styles.cardHead)} > {this.props.title} </p>
        <div style={assign({}, styles.cardCont)} > {this.props.content} </div> 
        <a href="#" style={assign({}, styles.cardLink)} ><span> 查看详情</span><span style={assign({}, styles.cardTime)}>{this.props.createTime}</span > </a>
      </div>
    )
  }
}

var styles = {
  card: {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '2px 2px 6px 0 rgba(217, 217, 217, 0.30)',
    borderRadius: '6px',
    fontFamily: 'PingFangSC-Regular',
  },
  cardHead: {
    paddingBottom: '10px',
    fontSize: '18px',

  },
  cardCont: {
    fontSize: '12px',
    color: '#999',
    lineHeight: '20px'
  },
  cardLink: {
    borderTop: '1px solid #eee',
    marginTop: '20px',
    display: 'block',
    paddingTop: '10px',
    color: '#999'
  },
  cardTime: {
    float: 'right'
  }
}

module.exports = MessageCard;