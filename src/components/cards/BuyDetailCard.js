import React, { useState, useEffect } from "react";
import { Popconfirm, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBuyDetail } from "../../store/actions/buyAction";

import { ROLE_LIST } from "../form/formBuy/FormCreateDetailBuy.js";
import {
  vndFormat,
  handleTime,
  handlePhoneNumber,
} from "../../functions/helper";

const BuyDetailCard = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentCustomer, setCurrentCustomer] = useState(null);
  //get data from parent
  const {
    item,
    setItemBuyDetail,
    setIsShowModalCreate,
    index,
    setIsShowModalBuyDetail,
  } = props;
  const { _id, idCustomer, createdAt, status, price, note } = item;
  //get data from store
  const { listCustomer } = useSelector((state) => state.buy);

  useEffect(() => {
    if (listCustomer.length !== 0 && idCustomer) {
      let current = listCustomer.find(
        (customer) => customer._id === idCustomer
      );
      setCurrentCustomer(current);
    }
  }, [listCustomer, idCustomer]);
  //Update a item buy detail
  const onEdit = () => {
    setItemBuyDetail(item);
    setIsShowModalCreate(true);
  };
  //delete a item buy detail
  const onConfirm = () => {
    dispatch(deleteBuyDetail(id, _id));
  };
  //view box and bags
  const onView = () => {
    setItemBuyDetail(item);
    setIsShowModalBuyDetail(true);
  };

  return (
    <div className="itemCard">
      <div className="buyCard__header">
        <div className="col-12">
          <div className="size-16 pe-2">Tài xế</div>
          <span className="buyCard__header--fullName">
            {currentCustomer?.full_name}
          </span>
          <br />
          <span className="buyCard__header--phoneNumber">
            {handlePhoneNumber(` (+84 ${currentCustomer?.phone_number})`)}
          </span>
        </div>
        <div className="buyCard__header--index">
          <span>{index}</span>
        </div>
      </div>
      <div className=" row buyCard__main">
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
          <div className="buyCard__main--note fw-normal">
            {note ? (
              note
            ) : (
              <span className="buyCard__main--note__title">
                <i className="fas fa-exclamation-triangle"></i>
                <br />
                Không có ghi chú.
              </span>
            )}
          </div>
        </div>
        <div className="col-12 buyCard__main__tool">
          <div className="row mt-3">
            <div className="col-8 buyCard__main__tool--detail">
              <button className="btn btn-onion" onClick={onView}>
                Xem chi tiết
              </button>
            </div>
            <div className="col-4 buyCard__main__tool--btn">
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
  );
};
export default BuyDetailCard;
