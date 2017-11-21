import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';

import Briger from '../../common/js/util/briger';
import Message from './component/messageCard.jsx';
import Scroll from '../../common/js/util/scroll';
import LoadMore from '../../common/js/component/loadMore.jsx';
import NoList from '../../common/js/component/noList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      lis: [],
      isLoad: false,
      noMore: false,
      noList: false
    }
    this.lis = [];
  }

  componentDidMount() {
    this.getListData(1);
    window.onscroll = () => {
      if (Scroll.scrollTop() + Scroll.clientHeight() == Scroll.scrollHeight()) {
        this.setState({
          isLoad: true,
          // lis: []
        })
        this.getListData();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    return true;
  }

  getListData(pageIndex,pageSize) {    
    Briger('token', (param) => {
      this._try(param)
    })
    // ajax
    Request
      .post('/msg/notice/list')
      .send({
        "pageIndex": pageIndex || '',
        "pageSize": 10
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
          }else if (pageIndex == 1) {
            this.setState({
              data: res.data.datas
            })
          }
          else {
            this.setState({
              data: res.data.datas.slice(4)
            })
          }
          if (this.state.isLoad) {
            this.setState({
              isLoad: false
            })
          }
        }else {
          alert(res.message);
        }
      });
  }


  render() {
    const data = this.state.data;
console.log(data);
    let liss = [];
    data.map((item,i) => {
      this.state.lis.push(
        <Message key={item.id} title={item.title} message={item.content} time={item.createTime} />
      )
    });
    // this.state.lis = liss;
console.log(this.state.lis);
    return (
        <div>
          <div>
          {
            this.state.noList ? <NoList msg="无公告" /> : this.state.lis
          }
          </div>
          <LoadMore isLoad={this.state.isLoad} noMore={this.state.noMore} />
        </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))