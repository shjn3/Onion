import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Popconfirm, Tag } from "antd";

import { ROLE_LIST, TYPE_BUY } from "../form/formBuy/FormCreateBuy";

import { vndFormat, handlePhoneNumber } from ".././../functions/helper";
import { deleteBuy } from "../../store/actions/buyAction";

const BuyCard = (props) => {
  const dispatch = useDispatch();
  //props
  const { item, setIsModalCreate, setItemBuy, index } = props;
  const { full_name, phone_number, area, deposit, status, type_buy, note } =
    item;
  //Turn on Modal create
  const onEdit = () => {
    setIsModalCreate(true);
    setItemBuy(item);
  };
  //delete a item
  const onConfirm = () => {
    dispatch(deleteBuy(item._id));
    setItemBuy(null);
  };
  return (
    <div className="itemCard">
      <div className="buyCard__header">
        <div className="col-12">
          <span className="buyCard__header--fullName">&ensp;{full_name}</span>
          <br />
          <span className="buyCard__header--phoneNumber">
            {handlePhoneNumber(` (+84 ${phone_number})`)}
          </span>
        </div>
        <div className="buyCard__header--index">{index}</div>
      </div>
      <div className="row buyCard__main">
        <div className="col-6 size-16 fw-bold">
          Diện tích <br />
          <Tag color="purple">{area} Xào</Tag>
        </div>
        <div className="col-6 size-16 fw-bold">
          Hình thức <br />
          <Tag
            className="fw-normal"
            color={TYPE_BUY?.find((type) => type.id === type_buy).color}
          >
            {TYPE_BUY?.find((type) => type.id === type_buy).title}
          </Tag>
          <span className="size-14 fw-normal"></span>
        </div>
        <div className="col-6 size-16 fw-bold">
          Tiền cọc <br />
          <Tag color="red" className="fw-normal">
            {vndFormat(deposit)}
          </Tag>
        </div>
        <div className="col-6 size-16 fw-bold">
          Trạng thái
          <br />
          <Tag
            className="fw-normal"
            color={ROLE_LIST?.find((role) => role.id === status).color}
          >
            {ROLE_LIST?.find((role) => role.id === status).title}
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
          <div className="col-12 buyCard__main__tool">
            <div className="row mt-3">
              <div className="col-8 buyCard__main__tool--detail">
                <Link
                  to={{
                    pathname: "/buyDetail/1+" + item._id,
                    state: { nameOwner: item.full_name },
                  }}
                  className="btn btn-onion "
                >
                  Xem chi tiết
                </Link>
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
    </div>
  );
};

export default BuyCard;
