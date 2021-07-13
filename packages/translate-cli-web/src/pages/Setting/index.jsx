import './index.less';
import { Component } from 'react';
import { Input, Button } from 'antd';
import {
  configWrapper,
  updateBaseUrl,
  saveBaseUrl,
} from '@root/stores';

class Header extends Component {
  onHandleChangeBaseUrl = (e) => {
    updateBaseUrl(e.target.value);
  }
  render() {
    const { configStore } = this.props;
    const { baseUrl } = configStore;

    return <div className="page-setting">
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
  }
}

export default configWrapper(Header);
