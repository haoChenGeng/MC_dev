import React from 'react';

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p style={{textAlign:'center',marginTop: 10}}>
        {
          this.props.noMore ? '没有更多了' : this.props.isLoad ? '加载中...' : '加载更多'
          /* if(this.props.noMore) {
            '没有更多了'
          }else {
            this.props.isLoad ? 
          } */
        }
      </p>
    )
  }
}

export default LoadMore;