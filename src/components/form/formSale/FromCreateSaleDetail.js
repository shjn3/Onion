import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { createSale, createSaleDetail, editSale, editSaleDetail } from "../../../store/actions/saleAction.js";

import { useParams } from "react-router-dom";
import BagSaleComponent from "../../bag/bagSale";
import moment from "moment";
const FormCreateSaleDetail = (props) => {
  const { handleCancel, detailSale } = props;
  const [totalBag, setTotalBag] = useState([]);
  const dispatch = useDispatch();
  const { salerId } = useParams();
  const [formCreate] = Form.useForm();
  const dateFormat = "DD-MM-YYYY"

  useEffect(() => {
    if (detailSale) {
      formCreate.setFieldsValue({
        note: detailSale.note || null,
      });
      setTotalBag(detailSale.bags)
    } else {
      formCreate.setFieldsValue({
        note: null,
      });
      setTotalBag([])
    }
  }, [detailSale, formCreate]);

  const onSubmit = () => {
    formCreate.submit();
  };

  const createSubmit = (info) => {
    dispatch(createSaleDetail(info));
  };

  const editSubmit = (info) => {
    dispatch(editSaleDetail(detailSale._id, info));
    handleCancel();
  };

  const handleFinishFormCreate = (fieldsValue) => {
    console.log(fieldsValue);
    const values = {
      ...fieldsValue,
      'saler' : salerId,
      'note' : fieldsValue.note,
      'bags' : totalBag,
      'date': fieldsValue['date'].format(dateFormat),
    }
    if (detailSale) {
      editSubmit(values);
    } else {
      createSubmit(values);
    }
    formCreate.resetFields();
  };
  return (
    <div className="card">
      <Form
        form={formCreate}
        onFinish={handleFinishFormCreate}
        name="formCreate" 
        initialValues={{
          date : moment()
        }}
      >
        <div className="row">
          <div className="col-12">
            <div>Ngày:</div>
            <Form.Item name="date">
              <DatePicker 
                //onChange={onChange} 
                format={dateFormat}
                style={{width : '100%'}}
                size='large'
                />
            </Form.Item>
          </div>
          <div className="col-12">Bao :</div>
          <BagSaleComponent totalBag={totalBag} setTotalBag={setTotalBag} />
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

export default FormCreateSaleDetail;

export const ROLE_LIST = [
  {
    id: 1,
    title: "Đã mua",
  },
  {
    id: 2,
    title: "Đã trả hết",
  },
  {
    id: 3,
    title: "Đã còn nợ",
  },
];
export const TYPE_SALE = [
  {
    id: 1,
    title: "Lớn",
  },
  {
    id: 2,
    title: "Bé",
  },
];
