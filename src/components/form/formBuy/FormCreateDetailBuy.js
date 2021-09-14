import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, Select, Modal, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import BagComponent from "../../bag/bag";

import FormCreateCustomer from "./FormCreateCustomer.js";

import {
  createBuyDetail,
  editBuyDetail,
} from "../../../store/actions/buyAction";
import { showNotification, handlePhoneNumber } from "../../../functions/helper";

const FormCreateDetailBuy = (props) => {
  const dispatch = useDispatch();
  //get data
  const { listCustomer } = useSelector((state) => state.buy);
  const [formCreate] = Form.useForm();
  const { id } = useParams();
  const { handleCancel, itemBuyDetail, handleFinishCreate } = props;

  const [totalBag, setTotalBag] = useState([]);
  //toggle form create and update
  const [isShowModalCreateCustomer, setIsShowModalCreateCustomer] =
    useState(false);
  //set value for Customer current

  //set form value initial
  useEffect(() => {
    if (itemBuyDetail) {
      formCreate.setFieldsValue({
        price: itemBuyDetail.price || 0,
        status: itemBuyDetail.status || 1,
        idCustomer: itemBuyDetail.idCustomer || listCustomer[0]?._id || null,
        box_l: itemBuyDetail.box_l || 0,
        box_s: itemBuyDetail.box_s || 0,
        box_m: itemBuyDetail.box_m || 0,
        note: itemBuyDetail.note || null,
      });
    } else {
      formCreate.setFieldsValue({
        price: 0,
        idCustomer: listCustomer[0]?._id || null,
        status: 1,
        box_l: 0,
        box_s: 0,
        box_m: 0,
        note: null,
      });
    }
  }, [formCreate, itemBuyDetail, listCustomer]);

  //set Total Buy detail
  useEffect(() => {
    if (itemBuyDetail) {
      setTotalBag(itemBuyDetail.bags);
    }
  }, [itemBuyDetail]);

  //turn of modal create Customer
  const handleCancelModalCreateCustomer = () => {
    setIsShowModalCreateCustomer(false);
  };

  //submit form
  const onSubmit = () => {
    formCreate.submit();
  };
  //create a buy detail
  const onCreate = (info) => {
    dispatch(createBuyDetail(id, info));

    handleFinishCreate();
  };

  //update a buy detail
  const onEdit = (info) => {
    dispatch(editBuyDetail(id, itemBuyDetail._id, info));
    handleCancel();
  };

  // choose create or update a buy detail
  const handleFinishFormCreate = (info) => {
    if (!isShowModalCreateCustomer) {
      if (totalBag.length === 0) {
        return showNotification({
          type: "error",
          message: "Số bao không được để trống",
          title: "Error",
        });
      }
      if (
        parseInt(info.box_l) === null ||
        parseInt(info.box_s) === null ||
        parseInt(info.box_m) === null
      ) {
        return showNotification({
          type: "error",
          message: "Số khung, Số tiền phải chứa chữ số",
          title: "Error",
        });
      }
      info.bags = totalBag;
      info.idOwner = id.split("+")[1];
      if (itemBuyDetail) {
        onEdit(info);
      } else {
        onCreate(info);
      }
      formCreate.setFieldsValue({
        price: null,
        status: 1,
        box_l: 0,
        box_s: 0,
        box_m: 0,
        note: null,
      });
      setTotalBag([]);
    }
  };

  return (
    <div className="card">
      <Form
        form={formCreate}
        name="formCreate"
        onFinish={handleFinishFormCreate}
      >
        <div className="row">
          <div className="col-6">
            Tiền
            <Form.Item name="price">
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/(\.*)/g, "")}
                maxLength="13"
              />
            </Form.Item>
          </div>
          <div className="col-6">
            Trạng thái
            <Form.Item name="status">
              <Select size="large">
                {ROLE_LIST.map((role, index) => (
                  <Select.Option key={index} value={role?.id}>
                    {role?.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            Tài xế
            <Form.Item name="idCustomer">
              <Select size="large">
                {listCustomer?.map((customer, index) => (
                  <Select.Option key={index} value={customer._id}>
                    {customer.full_name} (+84{" "}
                    {handlePhoneNumber(customer.phone_number)})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-12">Số Khung</div>
        </div>
        <div className="row">
          <div className="col-4">
            Lớn
            <Form.Item name="box_l">
              <Input size="large" type="number" />
            </Form.Item>
          </div>
          <div className="col-4">
            Trung
            <Form.Item name="box_m">
              <Input size="large" type="number" />
            </Form.Item>
          </div>
          <div className="col-4">
            Bi
            <Form.Item name="box_s">
              <Input size="large" type="number" />
            </Form.Item>
          </div>
        </div>
        <BagComponent totalBag={totalBag} setTotalBag={setTotalBag} />

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
              onClick={handleCancel}
              style={{ width: "110px" }}
              className="btn btn-outline-onion me-2"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-onion"
              style={{ width: "110px" }}
            >
              Đồng ý
            </button>
          </div>
        </div>
      </Form>
      <Modal
        title="Tạo tài xế"
        onCancel={handleCancelModalCreateCustomer}
        visible={isShowModalCreateCustomer}
        footer={null}
      >
        <FormCreateCustomer
          handleCancel={handleCancelModalCreateCustomer}
          itemCustomer={null}
        />
      </Modal>
    </div>
  );
};

export default FormCreateDetailBuy;

// List Status
export const ROLE_LIST = [
  {
    id: 1,
    title: "Đã trả",
    color: "#108ee9",
  },
  {
    id: 2,
    title: "Chưa trả",
    color: "#f50",
  },
];
//list kilo from bags
export const TYPE_KILO = [
  {
    id: 1,
    value: 10,
    title: "10 kg",
  },
  {
    id: 2,
    value: 20,
    title: "20 kg",
  },
  {
    id: 3,
    value: 30,
    title: "30 kg",
  },
];
//list type from bag
export const TYPE_SIZE = [
  {
    id: 1,
    title: "Bi",
  },
  {
    id: 2,
    title: "Trung",
  },
  {
    id: 3,
    title: "Lớn",
  },
];
