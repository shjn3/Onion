import { Table } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { vndFormat } from "../../functions/helper";
import { deleteSaleDetail } from "../../store/actions/saleAction";

export const TableSalerDetail = ({ dataSource, setIsModalCreate, setDetailSale }) => {
  const dispatch = useDispatch();
  const { salerId} = useParams()
  const onEdit = (item) => {
    setIsModalCreate(true);
    setDetailSale(item);
  };
  const onDelete = (id) => {
    dispatch(deleteSaleDetail(salerId,id));
  };
  const columns = [
    {
      title: <span className='title-table'> STT</span>,
      width: "3%",
      render: (text, record, index) => index + 1,
    },
    {
        title: <span className='title-table'> Ngày</span>,
        width: "7%",
        render: (text) => <span>{text.date}</span>,
    },  
    {
      title:<span className='title-table'> Bao</span>,
      width: "10%",
      render: (text) => {
        return (
          <span>
            {text.bags.map((item) => (
              <div key = {item.key}>
                <span className={TYPE_BAGS[item.type].color}>{TYPE_BAGS[item.type].title}</span>
                ({item.kilo})kg - {item.total} Bao: {vndFormat(item.price)}
              </div>
            ))}
          </span>
        );
      },
    },
    {
      title:<span className='title-table'> Tổng cộng</span>,
      width: "10%",
      render: (text) => {
        let total = 0
        text.bags.map( item =>{
          total = total + item.kilo*item.price*item.total
        })
        return <span>{vndFormat(total)}</span>}
    },
    {
        title: <span className='title-table'> Ghi chú</span>,
        width: "10%",
        render: (text) => <span>{text.note}</span>,
    },
    {
      title: <span className='title-table'> Tùy chỉnh</span>,
      width: "10%",
      ellipsis: true,
      render: (text) => (
        <div className="d-flex" style={{ alignItems: "center" }}>
          <i
            className="fas fa-pen me-3"
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(text)}
          />
          <i
            className="fas fa-trash-alt"
            style={{ cursor: "pointer" }}
            onClick={() => onDelete(text._id)}
          />
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      bordered
      dataSource={dataSource}
      pagination={false}
      rowKey="_id"
    />
  );
};

const  TYPE_BAGS = {
  1 :  {
    color : 'text-danger',
    title : 'Lớn'
  },
  2 : {
    color : 'text-primary',
    title : 'Trung'
  },
  3 : {
    color : 'text-success',
    title : 'Bi'
  }
}