import React, { useState } from "react";
import { PageHeader, Button, Descriptions, Modal } from "antd";
import AddProduct from "../Products/AddProduct";

const Header = () => {
  const [isAddProductOpen, setIsProductOpen] = useState(false);

  const handleOk = () => {
    setIsProductOpen(false);
  };

  const handleCancel = () => {
    setIsProductOpen(false);
  };

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={true}
          onBack={() => window.history.back()}
          title="Title"
          style={{
            background: "grey",
            color: "white",
          }}
          extra={[
            <Button
              key="2"
              onClick={() => {
                setIsProductOpen(true);
              }}
            >
              Add Product
            </Button>,
            <Button key="1" type="primary">
              Cart
            </Button>,
          ]}
        ></PageHeader>
      </div>
      <Modal
        title="Basic Modal"
        visible={isAddProductOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        style={{ top: 0 }}
        width={"500px"}
      >
        <AddProduct />
      </Modal>
    </>
  );
};

export default Header;
