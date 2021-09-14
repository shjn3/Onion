import React, { useEffect } from "react";
import { Form, Input, Select, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { createBuy, editBuy } from "../../../store/actions/buyAction.js";
import TextArea from "antd/lib/input/TextArea";
import { showNotification } from "../../../functions/helper.js";
import { handleMoney, handlePhoneNumber } from "../../../functions/helper.js";
const FormCreateBuy = (props) => {
  const { handleCancel, itemBuy, handleFinishCreate } = props;
  const [formCreate] = Form.useForm();
  const dispatch = useDispatch();
  //set initial form value
  useEffect(() => {
    if (itemBuy) {
      formCreate.setFieldsValue({
        full_name: itemBuy.full_name || null,
        phone_number: itemBuy.phone_number || null,
        status: itemBuy.status || null,
        deposit: itemBuy.deposit || null,
        area: itemBuy.area || null,
        type_buy: itemBuy.type_buy || null,
        note: itemBuy.note || null,
      });
    } else {
      formCreate.setFieldsValue({
        full_name: null,
        phone_number: null,
        status: 1,
        deposit: null,
        area: null,
        type_buy: 1,
        note: null,
      });
    }
  }, [itemBuy, formCreate]);

  //submit form
  const onSubmit = () => {
    formCreate.submit();
  };
  //create a buy item
  const createSubmit = (info) => {
    dispatch(createBuy(info));
    handleFinishCreate();
  };
  //update a buy item
  const editSubmit = (info) => {
    dispatch(editBuy(itemBuy._id, info));
    handleCancel();
  };

  const onCancel = () => {
    handleCancel();
    formCreate.setFieldsValue({
      full_name: null,
      phone_number: null,
      status: 1,
      deposit: null,
      area: null,
      type_buy: 1,
      note: null,
    });
  };
  //chose create or update based on itemBuy
  const handleFinishFormCreate = (info) => {
    if (!info.full_name || !info.phone_number) {
      return showNotification({
        type: "error",
        message: "Tên chủ vườn hoặc số điện thoại không được bỏ trống",
        title: "Error",
      });
    }
    if (!parseFloat(info.area) || !parseInt(info.deposit)) {
      return showNotification({
        type: "error",
        message: "Diện tích, số tiền chỉ được phép chứa chữ số",
        title: "Error",
      });
    }
    info.area = parseFloat(info.area);
    info.deposit = parseInt(info.deposit);
    if (itemBuy) {
      editSubmit(info);
    } else {
      createSubmit(info);
    }
    //reset form after submit
    formCreate.setFieldsValue({
      full_name: null,
      phone_number: null,
      status: 1,
      deposit: null,
      area: null,
      type_buy: 1,
      note: null,
    });
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
            <div>Tên Chủ Vườn :</div>
            <Form.Item name="full_name">
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="col-6">
            <div>Số điện thoại:</div>
            <Form.Item name="phone_number">
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                formatter={(value) => handlePhoneNumber(`+84 ${value}`)}
                parser={(value) => value.replace(/(\+84\s)|(\s*)/g, "")}
                maxLength={15}
              />
            </Form.Item>
          </div>

          <div className="col-6">
            <div>Trạng thái :</div>
            <Form.Item name="status">
              <Select size="large">
                {ROLE_LIST.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="col-6">
            <div>Tiền cọc:</div>
            <Form.Item name="deposit">
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                formatter={(value) => handleMoney(value)}
                parser={(value) => value.replace(/(\.*)/g, "")}
                maxLength="13"
              />
            </Form.Item>
          </div>
          <div className="col-6">
            <div>Diện tích :</div>
            <Form.Item name="area">
              <InputNumber size="large" style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="col-12">
            <div>Hình thức :</div>
            <Form.Item name="type_buy">
              <Select size="large">
                {TYPE_BUY.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col-12">
            <div>Ghi chú :</div>
            <Form.Item name="note">
              <TextArea size="large" />
            </Form.Item>
          </div>

          <div className="col-12">
            <div className="d-flex mt-3 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-onion me-2"
                style={{ width: "110px" }}
                onClick={onCancel}
              >
                Huỷ bỏ
              </button>
              <button
                type="button"
                className="btn  btn-onion"
                style={{ width: "110px" }}
                onClick={onSubmit}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default FormCreateBuy;

export const ROLE_LIST = [
  {
    id: 1,
    title: "Đã mua",
    color: "#87d068",
  },
  {
    id: 2,
    title: "Đã trả hết",
    color: "#108ee9",
  },
  {
    id: 3,
    title: "Còn nợ",
    color: "#f50",
  },
];

export const TYPE_BUY = [
  {
    id: 1,
    title: "Mua xào",
    color: "cyan",
  },
  {
    id: 2,
    title: "Mua kí",
    color: "red",
  },
];
