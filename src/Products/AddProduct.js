import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";

const { Dragger } = Upload;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    values = {
      ...values,
      image: values.image.file.name,
    };
    console.log("updated", values);
    postToDb(values);
  };

  const postToDb = async (productObj) => {
    let response = await axios.post(
      "http://localhost:3001/products",
      productObj
    );

    console.log("response", response);
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

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        layout={"vertical"}
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
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} />
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
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={() => {}}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
