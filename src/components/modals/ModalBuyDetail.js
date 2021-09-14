import React from "react";

import { BAG_KILO_LIST, BAG_LIST } from "../bag/bag.js";

import { Tag } from "antd";
const ModalBuyDetail = (props) => {
  const { itemBuyDetail, handleCancel } = props;
  const { box_l, box_m, box_s, bags } = itemBuyDetail;

  return (
    <div className="row">
      <div className="col-12 size-16 fw-bold">
        Số Khung
        <div className=" row buyCard__main--note size-14 fw-normal text-center m-0">
          <div className="col-4">
            <Tag color="#f50">Lớn</Tag>
            <br />
            <span className="size-16 fw-bold">{box_l}</span>
          </div>
          <div className="col-4">
            <Tag color="#eb2f96">Trung</Tag>
            <br />
            <span className="size-16 fw-bold">{box_m}</span>
          </div>
          <div className="col-4">
            <Tag color="#2f54eb"> Bi</Tag>
            <br /> <span className="size-16 fw-bold">{box_s}</span>
          </div>
        </div>
      </div>
      <div className="col-12 size-16 fw-bold mt-2">
        Số bao
        <div
          className={
            bags.length > 2
              ? "buyCard__main--note fw-normal buyDetail__main--bag size-14"
              : "buyCard__main--note fw-normal  size-14"
          }
        >
          {bags.map((bag, index) => (
            <BagItem item={bag} key={index} index={index + 1} />
          ))}
        </div>
      </div>
      <div className="col-12 d-flex justify-content-end mt-3">
        <button
          className="btn btn-onion"
          style={{ width: "100px" }}
          onClick={() => handleCancel()}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalBuyDetail;

const BagItem = (props) => {
  const { item, index } = props;
  const { type, kilo, total } = item;
  //list bag

  return (
    <div className="d-flex p-zero pt-1">
      <div className="size-14 fw-bold">{index}.</div>
      <div className="flex-fill txt-center">
        <Tag color="cyan">
          {BAG_LIST.find((size) => size.id === type)?.title}
        </Tag>
      </div>
      <div className="flex-fill txt-center">
        <Tag color="purple">
          {BAG_KILO_LIST.find((tkilo) => tkilo.value === kilo)?.title}
        </Tag>
      </div>
      <div className="flex-fill txt-center">
        Total <Tag color="lime">{total}</Tag>
      </div>
    </div>
  );
};
