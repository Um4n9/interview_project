import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Modal, Button } from "antd";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const { Dragger } = Upload;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

const EditProduct = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue(props.item);
  }, []);

  const postToDb = async (productObj) => {
    let response = await axios.put(
      `http://localhost:3001/products/${props.item.id}`,
      productObj
    );

    console.log("response", response);
    props.closeModal();
    Swal.fire({
      icon: "success",
      type: "success",
      text: "Product updated successfully",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFileChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onFileDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  const onFinish = (values) => {
    if (values.image.file) {
      values = {
        ...values,
        image: values.image.file.name,
      };
    }
    values.price = +values.price;
    console.log("updated", values);
    postToDb(values);
    // navigate("/myProducts");
  };

  return (
    <Modal
      title={props.title || "Product Details"}
      visible={true}
      onCancel={props.closeModal}
      style={{ top: 20 }}
      width={"450px"}
      footer={[]}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        layout={"vertical"}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Dragger
            name="file"
            multiple={false}
            maxCount={1}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={onFileChange}
            onDrop={onFileDrop}
            className={"product-file-dropper"}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item {...tailLayout} className="form-tail">
          <Button htmlType="button" onClick={props.closeModal}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
