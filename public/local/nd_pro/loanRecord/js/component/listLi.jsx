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
    let cx, url;
    if (this.props.status == 5 || this.props.status == 6 || this.props.status == 7) {
      cx = 'list-li-right list-detail';
      url = `loanDetail.html?orderId=${this.props.id}`;
    }else {
      cx = 'list-li-right';
      url = `javascript:;`;
    }
    
    return (
      <li className="list-li">
        <a href={url}>
          <div className="list-li-left">
            <p><span style={assign({},color)}></span>{this.props.amount}</p>
            <p>{this.props.date}</p>
          </div>
          <div  className={cx}>
            {this.props.statusStr}
          </div>
        
        </a>
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