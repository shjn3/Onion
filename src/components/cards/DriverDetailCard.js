import React, { useState, useEffect } from "react";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import { ROLE_LIST } from "../form/formBuy/FormCreateDetailBuy.js";
import {
  vndFormat,
  handleTime,
  handlePhoneNumber,
} from "../../functions/helper";

const DriverDetailCard = (props) => {
  const [currentCustomer, setCurrentCustomer] = useState(null);
  //get data from parent
  const { item, setItemBuyDetail, index, setIsShowModalBuyDetail } = props;
  const { idOwner, createdAt, status, price, note } = item;
  //get data from store
  const { listBuy } = useSelector((state) => state.buy);

  useEffect(() => {
    if (listBuy.length !== 0 && idOwner) {
      let current = listBuy.find((buy) => buy._id === idOwner);
      setCurrentCustomer(current);
    }
  }, [listBuy, idOwner]);
  //view box and bags
  const onView = () => {
    setItemBuyDetail(item);
    setIsShowModalBuyDetail(true);
  };

  return (
    <div className="itemCard">
      <div className="driverCard__header">
        <div className="col-12">
          <div className="size-16 pe-2">Chủ vườn</div>
          <span className="driverCard__header--fullName">
            {currentCustomer?.full_name}
          </span>
          <br />
          <span className="driverCard__header--phoneNumber">
            {handlePhoneNumber(` (+84 ${currentCustomer?.phone_number})`)}
          </span>
        </div>
        <div className="driverCard__header--index">
          <span>{index}</span>
        </div>
      </div>
      <div className=" row driverCard__main">
        <div className="col-12 size-16 fw-bold" style={{ color: "maroon" }}>
          {handleTime(createdAt)}
        </div>
        <div className="col-6 size-16 fw-bold">
          Tiền
          <br />
          <Tag color="gold">{vndFormat(price)} </Tag>
        </div>
        <div className="col-6 size-16 fw-bold">
          Hình thức <br />
          <Tag color={ROLE_LIST.find((role) => role.id === status)?.color}>
            {ROLE_LIST.find((role) => role.id === status)?.title}
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
        </div>
        <div className="col-12 driverCard__main__tool">
          <div className="row mt-3">
            <div className="col-12 driverCard__main__tool--detail">
              <button className="btn btn-onion w-100" onClick={onView}>
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DriverDetailCard;
