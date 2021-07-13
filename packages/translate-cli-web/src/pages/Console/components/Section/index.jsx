import { Component } from 'react';
import { Button, message } from 'antd';
import { FileAddOutlined, FormOutlined, SaveOutlined } from '@ant-design/icons'
import { saveFiles } from '@root/apis';
import ModifyInput from '../ModifyInput';
import { filesWrapper, batchOptsWrapper, getFilesData } from '@root/stores';

import ModalAdd from '../ModalAdd';

class Section extends Component {
  state = {
    saving: false,
    modalAddVisible: false,
  }
  getFiles = () => {
    this.hideModalAdd();
    getFilesData();
  }
  onHandleChange = (name, res) => {
    const { datasource } = this.state;
    const modifyItem = datasource.find(item => item.name === name);
    modifyItem.data[res.key] = res.value;

    this.setState(datasource);
  }
  showModalAdd = () => {
    this.setState({ modalAddVisible: true });
  }
  hideModalAdd = () => {
    this.setState({ modalAddVisible: false });
  }
  onHandleRename = () => {
  }
  onHandleSave = () => {
    this.setState({ saving: true });
    saveFiles(this.state.datasource).then(res => {
      const { code } = res.data;
      this.setState({ saving: false });
      if (code === 0) {
        message.success('保存成功');
      } else {
        message.error('保存失败');
      }
    }).catch(() => {
      this.setState({ saving: false });
      message.error('保存失败');
    })
  }
  render () {
    const { datasource, langs } = this.props.filesStore;
    const { checkedKeys, open } = this.props.batchOptsStore;
    const {
      saving,
      modalAddVisible,
    } = this.state;

    return <div
      style={{
        padding: '20px',
        textAlign: 'left'
      }}
    >
      <div className="g-content-width">
        {
          datasource.map(item => {
            return <ModifyInput
              key={item.name}  
              {...item}
              batching={open}
              checked={checkedKeys.indexOf(item.name) !== -1}
              onChange={(res) => this.onHandleChange(item.name, res)}
            />
          })
        }
      </div>
      <ModalAdd
        visible={modalAddVisible}
        langs={langs}
        onCancel={this.hideModalAdd}
        onSuccess={this.getFiles}
      />
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}>
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={this.showModalAdd}
        >添加</Button>
        <br />
        <br />
        <Button
          type="primary"
          loading={saving}
          icon={<FormOutlined />}
          onClick={this.onHandleRename}
        >重命名</Button>
        <br />
        <br />
        <Button
          type="primary"
          loading={saving}
          icon={<SaveOutlined />}
          onClick={this.onHandleSave}
        >保存</Button>
      </div>
    </div>
  }
}

export default batchOptsWrapper(filesWrapper(Section));
