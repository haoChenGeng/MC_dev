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
      .post('/msg/notice/read')
      .send({
        noticeId: '1'
      })
      .end((err, res) => {
        var res = JSON.parse(res.text);
        if (res.code == '0') {
          this.setState({
            dataDetail: res.data
          });
        } else {
          alert(res.message);
        }
      });
  }


  render() {    
    return (
      <div className="noticeDetail">
        <h2>{this.state.dataDetail.title}</h2>
        <p className="date">{this.state.dataDetail.createTime}</p>
        <p className="content">{this.state.dataDetail.content}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('notice'))