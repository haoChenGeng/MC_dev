import React from 'react';
import assign from 'object-assign';

class ListLi extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    let color;
    switch (this.props.status) {
      case 6:
        color = styles.success;
        break;
      case 1 || 3 || 5:
        color = styles.ongoing;
        break;
      case 2 || 4 || 7:
        color = styles.fail;
        break;
      default:
        break;
    }
    return (
      <li className="list-li">
        <div className="list-li-left">
          <p><span style={assign({},color)}></span>{this.props.amount || 1}</p>
          <p>{this.props.date || 2}</p>
        </div>
        <div className="list-li-right">
          {this.props.statusStr}
        </div>
      </li>
    )
  }
}

var styles = {
  success: {
    backgroundColor: '#506FEE'
  },
  fail: {
    backgroundColor: '#ff0000'
  },
  ongoing: {
    backgroundColor: '#FF8300'
  }
}

export default ListLi;