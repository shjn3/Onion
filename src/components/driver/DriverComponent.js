import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Pagination } from "antd";

import { getListCustomer } from "../../store/actions/buyAction.js";
import FormCreateCustomer from "../form/formBuy/FormCreateCustomer.js";

import DriverCard from "../cards/DriverCard.js";
import CreateNotification from "../layout/CreateNotification.js";
const DriverComponent = () => {
  const dispatch = useDispatch();

  const { listCustomer, successCustomer, errorCustomer } = useSelector(
    (state) => state.buy
  );
  //Tonggle modal create
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isFound, setIsFound] = useState(true);
  //input search
  const [valueSearch, setValueSearch] = useState("");

  //pagination
  const numberEachPages = 8;
  const [valueShow, setValueShow] = useState({
    pageNumber: 1,
    maxValue: numberEachPages,
    minValue: 0,
  });
  //a customer item
  const [itemCustomer, setItemCustomer] = useState(null);
  //List customer data
  const [listDataCustomer, setListDataCustomer] = useState([]);

  //Get list customer data
  useEffect(() => {
    dispatch(getListCustomer());
  }, [dispatch]);
  //set Customer data when list customer change

  useEffect(() => {
    if (successCustomer) {
      let currentListCustomer = listCustomer?.filter((customer) => {
        return customer.phone_number?.search(valueSearch) !== -1;
      });
      currentListCustomer.length === 0 ? setIsFound(false) : setIsFound(true);

      setListDataCustomer(currentListCustomer);
    }
  }, [listCustomer, valueSearch, successCustomer]);

  //Turn off modal create customer
  const handleCancelCreate = () => {
    setIsModalCreate(false);
    setItemCustomer(null);
  };
  //Event after create item
  const handleFinishCreate = () => {
    setValueShow({
      ...valueShow,
      pageNumber: 1,
      maxValue: numberEachPages,
      minValue: 0,
    });
    setIsModalCreate(false);
    setItemCustomer(null);
  };
  //event change page number
  const onChangePagination = (value) => {
    setValueShow({
      ...valueShow,
      pageNumber: value,
      maxValue: value * numberEachPages,
      minValue: (value - 1) * numberEachPages,
    });
  };

  return (
    <div className="container--card">
      <div className="d-flex justify-content-between header__card--driver">
        <div>
          <span className="title-card"> Quản lí Tài xế</span>
        </div>
      </div>
      {!isFound ||
      (listDataCustomer.length === 0 &&
        listCustomer.length === 0 &&
        (successCustomer || errorCustomer)) ? (
        <>
          <div className="row">
            <div className="align-items-center d-flex header__card--driver__tool my-4 justify-content-end">
              <label className="Search">
                <div className="IconSearch">
                  <i className="fas fa-search me-1"></i>
                </div>
                <input
                  className="InputSearch"
                  type="text"
                  value={valueSearch}
                  placeholder="Tìm kiếm theo SĐT"
                  onChange={(e) => setValueSearch(e.target.value)}
                />
              </label>
              <button
                type="button"
                className="btn btn-onion"
                style={{ minWidth: "110px" }}
                onClick={() => setIsModalCreate(true)}
              >
                <i className="fas fa-user-plus btn-icon me-2"></i>Thêm
              </button>
            </div>
          </div>
          <CreateNotification title="tài xế" />
        </>
      ) : listDataCustomer.length !== 0 &&
        listCustomer.length !== 0 &&
        (successCustomer || errorCustomer) ? (
        <>
          <div className="row">
            <div className="align-items-center d-flex header__card--driver__tool my-4 justify-content-end">
              <label className="Search">
                <div className="IconSearch">
                  <i className="fas fa-search me-1"></i>
                </div>
                <input
                  className="InputSearch"
                  type="text"
                  value={valueSearch}
                  placeholder="Tìm kiếm"
                  onChange={(e) => setValueSearch(e.target.value)}
                />
              </label>
              <button
                type="button"
                className="btn btn-onion"
                style={{ minWidth: "110px" }}
                onClick={() => setIsModalCreate(true)}
              >
                <i className="fas fa-user-plus btn-icon me-2"></i>Thêm
              </button>
            </div>
            {listDataCustomer
              .slice(valueShow.minValue, valueShow.maxValue)
              .map((item, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={index}>
                  <DriverCard
                    setIsModalCreate={setIsModalCreate}
                    item={item}
                    index={index + 1 + valueShow.minValue}
                    setItemCustomer={setItemCustomer}
                  />
                </div>
              ))}
            <div className="row  mt-4">
              <Pagination
                style={{ textAlign: "center" }}
                size="large"
                current={valueShow.pageNumber}
                total={listDataCustomer.length}
                defaultPageSize={numberEachPages}
                onChange={onChangePagination}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="row position-relative h-100">
          <div className="spin">
            <div className="spin__container">
              <div className="spin__circle"></div>
            </div>
          </div>
        </div>
      )}

      <Modal
        title={itemCustomer ? "Cập nhật tài xế" : "Tạo tài xế"}
        onCancel={handleCancelCreate}
        visible={isModalCreate}
        footer={null}
      >
        <FormCreateCustomer
          handleCancel={handleCancelCreate}
          itemCustomer={itemCustomer}
          handleFinishCreate={handleFinishCreate}
          setItemCustomer={setItemCustomer}
        />
      </Modal>
    </div>
  );
};
export default DriverComponent;
