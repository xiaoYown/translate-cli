import './index.less';
import { Component } from 'react';
import { Input, Button } from 'antd';
import {
  configWrapper,
  updateBaseUrl,
  saveBaseUrl,
  switchBatchOptsStatus,
  batchOptsWrapper,
  removeBatchKeys,
} from '../../stores';

class Header extends Component {
  onHandleChangeBaseUrl = (e) => {
    updateBaseUrl(e.target.value);
  }
  render () {
    const { configStore, batchOptsStore } = this.props;
    const { baseUrl } = configStore;

    return <div className="g-layout-header">
      <div className="g-layout-header-fixed">
        <div className="g-content-width">
          <div className="m-header-base-url">
            <div style={{ paddingRight: '8px' }}>文件目录 : </div>
            <div style={{ paddingRight: '8px' }}>
              <Input
                style={{ height: '32px' }}
                onChange={this.onHandleChangeBaseUrl}
                value={baseUrl}
              />
            </div>
            <Button
              onClick={saveBaseUrl}
            >保存</Button>
          </div>
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

export default batchOptsWrapper(configWrapper(Header));
