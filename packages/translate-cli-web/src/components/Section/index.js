import { Component } from 'react';
import { Button, message } from 'antd';
import { FileAddOutlined, FormOutlined, SaveOutlined } from '@ant-design/icons'
import { getConfig, getFiles, saveFiles } from '../../apis';
import ModifyInput from '../ModifyInput';

import ModalAdd from '../ModalAdd';

class Section extends Component {
  state = {
    datasource: [],
    langs: [],
    saving: false,
  }
  componentDidMount () {
    this.fetchFilesData();
  }
  fetchFilesData = () => {
    getConfig();
    getFiles().then(res => {
      const { datasource, info } = res.data.data;
      this.setState({
        datasource,
        langs: Object.keys(info)
      });
    });
  }
  onHandleChange = (name, res) => {
    const { datasource } = this.state;
    const modifyItem = datasource.find(item => item.name === name);
    modifyItem.data[res.key] = res.value;

    this.setState(datasource);
  }
  onHandleAdd = () => {
    this.setState({ showModalAdd: true });
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
    const {
      datasource,
      saving,
      showModalAdd,
      langs,
    } = this.state;

    return <div
      style={{ padding: '20px', textAlign: 'left' }}
    >
      {
        datasource.map(item => {
          return <ModifyInput
            key={item.name}  
            {...item}
            onChange={(res) => this.onHandleChange(item.name, res)}
          />
        })
      }
      <ModalAdd
        visible={showModalAdd}
        langs={langs}
      />
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}>
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={this.onHandleAdd}
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

export default Section;
