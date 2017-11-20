import React from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';

import Briger from '../../common/js/util/briger';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.getListData(1);
  }

  getListData(pageIndex, pageSize) {
    Briger('token', (param) => {
      this._try(param)
    })
    // ajax
    Request
      .post('/credit/loan/record')
      .send({
        "pageIndex": pageIndex || '',
        "pageSize": 10
      })
      .end((err, res) => {
        var res = JSON.parse(res.text);
        if (res.code == '0') {
          this.setState({
            data: res.data
          })
        } else {
          alert(res.message);
        }
        
      });
  }


  render() {
    
    return (
      <div>
        <div className="loanDetail-title">1</div>
        <div className="loanDetail-date">2</div>
        <div className="loanDetail-content">3</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('loanD'))