import './index.less';
import { Component } from 'react';
import { Input, Button } from 'antd';
import {
  updateBaseUrl,
  switchBatchOptsStatus,
  batchOptsWrapper,
  removeBatchKeys,
} from '@root/stores';

class Header extends Component {
  onHandleChangeBaseUrl = (e) => {
    updateBaseUrl(e.target.value);
  }
  render () {
    const { batchOptsStore } = this.props;

    return <div className="g-layout-header">
      <div className="g-layout-header-fixed">
        <div className="g-content-width">
          <br />
          <Button onClick={switchBatchOptsStatus}>批量操作</Button>
          <br />
          {
            batchOptsStore.open ? <div>
              <Button onClick={removeBatchKeys}>批量删除</Button>
            </div> : null
          }
        </div>
      </div>
    </div>
  }
}

export default batchOptsWrapper(Header);
