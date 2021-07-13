import { Modal, Form, Input, Button, message } from 'antd';
import { addTranslate } from '@root/apis';

const formItemLayout = {
  labelCol: {
    span: 4
  }
};

const nameKey = 'ADD_LANG_KEY_NAME';

function ModalRename(props) {
  const { visible, langs, onCancel, onSuccess } = props;
  const [form] = Form.useForm();
  const initialValues = { [nameKey]: '' };
  const datasource = langs.map(item => {
    return {
      name: item,
      value: ''
    }
  })
  datasource.map(item => {
    Object.assign(initialValues, { [item.name]: item.value });
  })
  const onHandleOk = () => {
    let values = Object.assign({}, form.getFieldsValue());
    let params = {
      key: values[nameKey],
      values
    };
    delete values[nameKey];
    addTranslate(params).then(res => {
      const { code } = res.data;
      if (code === 0) {
        onSuccess();
      } else {
        message.error('添加失败');
      }
    }).catch(err => {
      message.error('添加失败');
      throw err;
    })
  }

  return <Modal
    visible={visible}
    title="添加"
    onOk={onHandleOk}
    onCancel={onCancel}
  >
    <Form
      form={form}
      layout="horizontal"
      initialValues={initialValues}
      {...formItemLayout}
    >
      <Form.Item
        label="key"
        name={nameKey}
      >
        <Input />
      </Form.Item>
      {
        datasource.map(item => {
          return <Form.Item
            key={item.name}
            label={item.name}
            name={item.name}
          >
            <Input />
          </Form.Item>
        })
      }
    </Form>
  </Modal>
}

export default ModalRename;
