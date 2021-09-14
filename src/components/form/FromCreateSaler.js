import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import {
  createSale,
  createSaleDetail,
  editSale,
} from "../../store/actions/saleAction";
import { useParams } from "react-router-dom";
const FormCreateSaler = (props) => {
  const { handleCancel, detailSale, formCreate } = props;
  // const dispatch = useDispatch();
  // const { id: owner } = useParams();

  // useEffect(() => {
  //   if (detailSale) {
  //     formCreate.setFieldsValue({
  //       saler: detailSale.saler || null,
  //       phone_number: detailSale.phone_number || null,
  //       note: detailSale.note || null,
  //     });
  //   } else {
  //     formCreate.setFieldsValue({
  //       saler: null,
  //       phone_number: null,
  //       note: null,
  //     });
  //   }
  // }, [detailSale]);

  const onSubmit = () => {
    formCreate.submit();
  };

  // const createSubmit = (info) => {
  //   dispatch(createSale(info));
  // };

  // const editSubmit = (info) => {
  //   dispatch(editSale(detailSale._id, info));
  //   handleCancel();
  // };

  const handleFinishFormCreate = (info) => {
    console.log(info);
    // info.owner = owner;
    // info.bags = totalBag;
    // if (detailSale) {
    //   editSubmit(info);
    // } else {
    //   createSubmit(info);
    // }
    // formCreate.resetFields();
  };
  return (
    <div className="card">
      <Form
        form={formCreate}
        onFinish={handleFinishFormCreate}
        name="formCreate"
      >
        <div className="row">
          <div className="col-12">
            <div>Tên Khách Hàng:</div>
            <Form.Item name="saler">
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="col-12">
            <div>Số điện thoại:</div>
            <Form.Item name="phone_number">
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="col-12">
            <div>Note:</div>
            <Form.Item name="note">
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="col-12">
            <div className="d-flex mt-3 justify-content-center">
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={onSubmit}
              >
                Lưu
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleCancel}
              >
                Huỷ
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormCreateSaler;

