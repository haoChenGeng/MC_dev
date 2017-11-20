import React from 'react';
import assign from 'object-assign';

class ListLi extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(this.props);
    let color;
    switch (this.props.status) {
      case 1:
        color = styles.ongoing;
        break;
      case 2:
        color = styles.success;
        break;
      case 3:
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
          <p>{this.props.statusStr || 3}</p>
          <p>{this.props.repaymentType || 4}</p>
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