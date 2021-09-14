import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Form, Input, Select, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";

import {
  createCustomer,
  editCustomer,
} from "../../../store/actions/buyAction.js";
import { showNotification } from "../../../functions/helper.js";

const FormCreateCustomer = (props) => {
  const dispatch = useDispatch();
  const { handleCancel, itemCustomer, handleFinishCreate } = props;

  const [formCreate] = Form.useForm();
  //set initial Form
  useEffect(() => {
    if (itemCustomer) {
      formCreate.setFieldsValue({
        full_name: itemCustomer.full_name || null,
        phone_number: itemCustomer.phone_number || null,
        note: itemCustomer.note || null,
        type: itemCustomer.type || null,
      });
    } else {
      formCreate.setFieldsValue({
        full_name: null,
        phone_number: null,
        note: null,
        type: 1,
      });
    }
  }, [itemCustomer, formCreate]);

  //event button submit
  const onSubmit = () => {
    formCreate.submit();
  };

  //event create a Customer
  const onCreate = (info) => {
    dispatch(createCustomer(info));
    handleFinishCreate();
  };

  //event edit a Customer

  const onUpdate = (info) => {
    dispatch(editCustomer(itemCustomer._id, info));
    handleCancel();
  };

  //identify edit or create event

  const handleFinishFormCreate = (info) => {
    //if we have itemCustomer then update this itemCustomer
    if (!info.phone_number && !info.full_name) {
      return showNotification({
        title: "Error",
        message: "Điền đầy đủ tên và số điện thoại",
        type: "error",
      });
    }
    if (itemCustomer) {
      onUpdate(info);
    }
    //another =>> create a Customer
    else {
      onCreate(info);
    }
    formCreate.setFieldsValue({
      full_name: null,
      phone_number: null,
      note: null,
      type: 1,
    });
  };

  return (
    <div className="card">
      <Form
        form={formCreate}
        name="formCreate"
        onFinish={handleFinishFormCreate}
      >
        <div className="row">
          <div className="col-12">
            Tên tài xế
            <Form.Item name="full_name">
              <Input size="large" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            SĐT
            <Form.Item name="phone_number">
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                formatter={(value) =>
                  `+84 ${value}`
                    .split("")
                    .reverse()
                    .join("")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    .split("")
                    .reverse()
                    .join("")
                }
                parser={(value) => value.replace(/(\+84\s)|(\s*)/g, "")}
                maxLength={15}
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            Hình thức
            <Form.Item name="type">
              <Select size="large">
                {TYPE_CUSTOMERS.map((customer, index) => (
                  <Select.Option key={index} value={customer.id}>
                    {customer.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            Ghi chú
            <Form.Item name="note">
              <TextArea size="large" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-onion me-2"
              onClick={handleCancel}
            >
              Hủy bỏ
            </button>
            <button type="button" className="btn btn-onion" onClick={onSubmit}>
              Xác nhận
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormCreateCustomer;

export const TYPE_CUSTOMERS = [
  {
    id: 1,
    value: "Tài xế",
    color: "green",
  },
  {
    id: 2,
    value: "Người mua",
    color: "cyan",
  },
];
