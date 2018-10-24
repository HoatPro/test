import React from "react";
import { Button, Modal, Form, Input} from "antd";

const FormItem = Form.Item;

const FormData = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSave, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onSave}
        >
          <Form layout="vertical">
            <FormItem label="Title">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of collection!"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Content">
              {getFieldDecorator("content")(<Input type="textarea" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class App extends React.Component {
  state = {
    visible: false,
    values:[]
  };

  // showModal = () => {
  //   this.setState({ visible: true });
  // };

  handleCancel = () => {
    this.setState({ visible: false });
  };

 handleCreate=()=>{
   this.setState({ visible: true });
   const form = this.formRef.props.form;
   form.resetFields();

  };
  handleSave = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // const newData = {
      //   content: values.content,
      //   title: values.title
      // }
      //console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({
        visible: false,
        values: values
      });
    });
  }
  handleEdit = () => {
    this.setState({
      visible:true
    })
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { values } = this.state;
    console.log(values);
    return <div>
      <Button type="primary" onClick={this.handleCreate}>
          Add Chapter
        </Button>&nbsp;
      <Button type="danger" onClick={this.handleEdit}>
        Edit
        </Button>
      <FormData
        wrappedComponentRef={this.saveFormRef}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        onSave={this.handleSave}/>

        <table className="table" border="1px solid #ddd" style={{height:100,margin:20}} >
          <thead >
            <tr>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
            </tr>
          </thead>
          <tbody>
           <tr >
            <td>{JSON.stringify(values.title)}</td>
            <td>{JSON.stringify(values.content)}</td>
              </tr>


          </tbody>
        </table>
      </div>;
  }
}
export default App;