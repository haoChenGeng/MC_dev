import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';

import Briger from '../../common/js/util/briger';
import ListLi from './component/listLi.jsx';
import Scroll from '../../common/js/util/scroll';
import LoadMore from '../../common/js/component/loadMore.jsx';
import NoList from '../../common/js/component/noList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      lis: [],
      isLoad: false,
      noMore: false,
      pageIndex: 1
    }
  }

  componentDidMount() {
    this.getListData(1);
    window.onscroll = () => {
      if (Scroll.scrollTop() + Scroll.clientHeight() == Scroll.scrollHeight()) {
        this.setState({
          isLoad: true,
          pageIndex: this.state.pageIndex + 1
        })
        this.getListData(this.state.pageIndex);
      }
    }
  }

  getListData(pageIndex,pageSize) {    
    Briger('token', (param) => {
      this._try(param)
    })
    // ajax
    Request
      .post('/credit/refund/record')
      .send({
        "pageIndex": pageIndex || 1,
        "pageSize": pageSize || 10
      })
      .end((err, res) => {
        var res = JSON.parse(res.text);
        if (res.code == '0') {
          if (!res.data.datas.length && pageIndex == 1) {
            this.setState({
              noList: true
            })
          }else if (!res.data.datas.length) {
            this.setState({
              noMore: true
            })
          }else {
            this.renderList(res.data.datas);
          }
        }else {
          alert(res.message);
        }
        if (this.state.isLoad) {
          this.setState({
            isLoad: false
          })
        }
      });
  }

  _try(param) {
    this.setState({
      text: param
    })
  }

  renderList(data) {
    let list = [];
    data.map((item, i) => {
      list.push(
        <ListLi key={item.orderId} amount={item.refundAmount} date={item.refundDate} status={item.refundStatus} statusStr={item.refundStatusStr} repaymentType={item.refundTypeStr} />
      )
    });
    this.setState({
      lis: this.state.lis.concat(list)
    })
  }

  render() {
    /* const data = this.state.data;
    data.map((item,i) => {
      this.state.lis.push(
        <ListLi key={item.orderId} amount={item.refundAmount} date={item.refundDate} status={item.refundStatus} statusStr={item.refundStatusStr} repaymentType={item.refundTypeStr} />
      )
    }); */
    console.log(this.state.lis);
    return (
      <div>
        <div>
          {
            this.state.noList ? <NoList msg="无还款记录" /> : this.state.lis
          }
        </div>
        <LoadMore isLoad={this.state.isLoad} noMore={this.state.noMore} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('refund'))