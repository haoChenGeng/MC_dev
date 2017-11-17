import React from 'react';

class NoList extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img className="nolist-img" src="/repaymentRecord/image/nolist.png" />
        <p className="loading">{this.props.msg}</p>        
      </div>
    )
  }
}

export default NoList;