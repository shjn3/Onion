import { Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListBuy } from "../actions/buyAction";
import FormCreateBuy from "./form/FormCreateBuy";
import { TableBuy } from "./table/TableBuy";

export const SaleDetailComponent = () => {
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [detailBuy, setDetailBuy] = useState(null);
  const [tableData, setTableData] = useState(null);
  const dispatch = useDispatch();
  const { listBuy, success } = useSelector((state) => state.buy);
  const [formCreate] = Form.useForm();

  useEffect(() => {
    dispatch(getListBuy());
  }, []);

  useEffect(() => {
    if (success) {
      setTableData(listBuy);
    }
  }, [listBuy]);

  const handleCancelCreate = () => {
    setIsModalCreate(false);
    setDetailBuy(null);
  };

  return (
    <div className="card mb-2 pb-2">
      <div className="d-flex justify-content-between mb-2">
        <div>
          <span className="title-card">Chi tiết bán hành</span>
        </div>
        {/* <div className="align-items-center">
                    <button
                        type="button"
                        className="btn btn-danger"
                        style={{minWidth: "110px"}}
                        onClick={()=>setIsModalCreate(true)}
                    >
                        <i className="fas fa-user-plus btn-icon me-2"></i>Thêm
                    </button>
                </div> */}
      </div>
      {/* <TableBuy
                dataSource={tableData}
                setIsModalCreate={setIsModalCreate}
                setDetailBuy={setDetailBuy}
                detailBuy={detailBuy}
            /> */}
      <Modal
        title="Tạo Đơn Mua Hàng"
        onCancel={handleCancelCreate}
        visible={isModalCreate}
        footer={null}
      >
        <FormCreateBuy
          formCreate={formCreate}
          handleCancel={handleCancelCreate}
          detailBuy={detailBuy}
          setDetailBuy={setDetailBuy}
        />
      </Modal>
    </div>
  );
};
