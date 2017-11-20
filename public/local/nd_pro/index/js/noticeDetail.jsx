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
      .post('/msg/notice/list')
      .send({
        "pageIndex": pageIndex || '',
        "pageSize": 10
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
        <ul>
          <li>{}</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))