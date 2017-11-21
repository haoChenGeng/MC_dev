import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';

import Briger from '../../common/js/util/briger';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetail: {}
    }
  }

  componentDidMount() {
    this.getListData();
  }

  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  getListData(pageIndex, pageSize) {
    Briger('token', (param) => {
      this._try(param)
    })
    // ajax
    Request
      .post('/credit/loan/record/detail')
      .send({
        orderId: '1'
      })
      .end((err, res) => {
        var res = JSON.parse(res.text);
        if (res.code == '0') {
          this.setState({
            dataDetail: res.data
          })
        } else {
          alert(res.message);
        }
        
      });
  }


  render() {
    return (
      <div>
        <ul className="notice-list">
          <li><span>借款金额</span><span>￥{this.state.dataDetail.loanAmount}</span></li>
          <li><span>收款账户</span><span>{this.state.dataDetail.bankName}({this.state.dataDetail.bankCardNo})</span></li>
          <li><span>日利息</span><span>{this.state.dataDetail.rate}</span></li>
          <li><span>起止时间</span><span>{this.state.dataDetail.loanDate}-{this.state.dataDetail.refundDate}</span></li>
          <li><span>借款人姓名</span><span>{this.state.dataDetail.userName}</span></li>
          <li><span>借款人身份证</span><span>{this.state.dataDetail.idCard}</span></li>
          <li><span>还款银行卡</span><span>{this.state.dataDetail.bankName}({this.state.dataDetail.bankCardNo})</span></li>
          <li><span>借款合同</span><span><a href={this.state.dataDetail.contractUrl} style={{ color: 'orange', display: 'inline-block' }}>查看</a></span></li>
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('loanD'))