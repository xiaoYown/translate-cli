import './index.less';
import { Component } from 'react';
import { Input, Button } from 'antd';
import { configWrapper, updateBaseUrl, saveBaseUrl, switchBatchOptsStatus } from '../../stores';


class Header extends Component {
  onHandleChangeBaseUrl = (e) => {
    updateBaseUrl(e.target.value);
  }
  render () {
    const { baseUrl } = this.props.configStore;
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
            <br />
            <Button onClick={switchBatchOptsStatus}>批量操作</Button>
          </div>
        </div>
      </div>
    </div>
  }
}

export default configWrapper(Header);
