import { Modal, Form, Input, Button } from 'antd';

function ModalRename (props) {
  const { visible } = props;
  const [form] = Form.useForm();

  return <Modal visible={visible}>
    <Form
      form={form}
      layout="vertical"
      initialValues={{ requiredMarkValue: requiredMark }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="Field A" tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>
    </Form>
  </Modal>
}

export default ModalRename;
