import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Popconfirm, Tag, Tooltip } from "antd";
import { deleteSale } from "../../store/actions/saleAction";
import Item from "antd/lib/list/Item";

const SaleCard = (props) => {
  const dispatch = useDispatch();
  const { item, setIsModalCreate, setItemSale } = props;
  const { full_name, phone_number, area, deposit, status, type_buy, note } =
    item;
  const onEdit = () => {
    setIsModalCreate(true);
    setItemSale(item);
  };
  const onConfirm = () => {
    dispatch(deleteSale(item._id));
    setItemSale(null);
  };
  return (
    <Link  to={'/sale/'+ item._id } className="saleCard">
      <div className="d-flex itemCard cursor-p">
        <div className="d-flex flex-column flex-fill">
          <div className="row mt-2">
            <div className="col-12">
              <span className="fs-20"> Chủ vựa:&ensp;{full_name}</span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              SĐT&ensp;<Tag color="#108ee9">{phone_number}</Tag>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <div className="note-buy">
                <Tooltip placement="topLeft" title={note}>
                  Ghi Chú
                  <span>{note ? ": " + note : ""}</span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "20px" }}>
          <div className="row">
            <div className=" d-flex flex-column">
              <i
                className="fas fa-pen me-3 pb-4 iconCancel"
                style={{ cursor: "pointer" }}
                onClick={onEdit}
              />
              <Popconfirm
                title="Bạn muốn xoá ？"
                okText="Chắc chắn"
                cancelText="Huỷ"
                onConfirm={onConfirm}
              >
                <i
                  className="fas fa-trash-alt iconDelete"
                  style={{ cursor: "pointer" }}
                />
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SaleCard;
