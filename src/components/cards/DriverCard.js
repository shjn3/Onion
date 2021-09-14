import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Popconfirm, Tag } from "antd";

import { handlePhoneNumber } from ".././../functions/helper";
import { deleteCustomer } from "../../store/actions/buyAction";
import { TYPE_CUSTOMERS } from "../form/formBuy/FormCreateCustomer";

const DriverCard = (props) => {
  const dispatch = useDispatch();
  //props
  const { item, setIsModalCreate, setItemCustomer, index } = props;
  const { full_name, phone_number, type, note } = item;
  //Turn on Modal create
  const onEdit = () => {
    setIsModalCreate(true);
    setItemCustomer(item);
  };
  //delete a item
  const onConfirm = () => {
    dispatch(deleteCustomer(item._id));
    setItemCustomer(null);
  };
  return (
    <div className="itemCard">
      <div className="driverCard__header">
        <div className="col-12">
          <span className="driverCard__header--fullName">
            &ensp;{full_name}
          </span>
          <br />
          <span className="driverCard__header--phoneNumber">
            {handlePhoneNumber(` (+84 ${phone_number})`)}
          </span>
        </div>
        <div className="driverCard__header--index">{index}</div>
      </div>
      <div className="row driverCard__main">
        <div className="col-12 fw-bold">
          Vai trò&ensp;
          <Tag
            color={
              TYPE_CUSTOMERS?.find((customer) => customer.id === type).color
            }
          >
            {TYPE_CUSTOMERS?.find((customer) => customer.id === type).value}
          </Tag>
        </div>
        <div className="col-12 fw-bold mt-2">
          Ghi chú
          <div className="driverCard__main--note fw-normal">
            {note ? (
              note
            ) : (
              <span className="driverCard__main--note__title">
                <i className="fas fa-exclamation-triangle"></i>
                <br />
                Không có ghi chú.
              </span>
            )}
          </div>
          <div className="col-12 driverCard__main__tool">
            <div className="row mt-3">
              <div className="col-8 driverCard__main__tool--detail">
                <Link
                  to={{
                    pathname: "/driverDetail/2+" + item._id,
                    state: { nameDriver: item.full_name },
                  }}
                  className="btn btn-onion "
                >
                  Xem chi tiết
                </Link>
              </div>
              <div className="col-4 driverCard__main__tool--btn">
                <div className="row">
                  <div className="col-6">
                    <i
                      className="fas fa-pen iconCancel"
                      style={{ cursor: "pointer", color: "rgb(213,172,29)" }}
                      onClick={onEdit}
                    />
                    <br />
                  </div>
                  <div className="col-6 ">
                    <Popconfirm
                      title="Bạn muốn xoá ？"
                      okText="Chắc chắn"
                      cancelText="Huỷ"
                      onConfirm={onConfirm}
                    >
                      <i
                        className="fas fa-trash-alt iconDelete"
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
