import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Pagination } from "antd";

import { getListBuy } from "../../store/actions/buyAction.js";
import FormCreateBuy from "../form/formBuy/FormCreateBuy.js";

import BuyCard from "../cards/BuyCard.js";
import CreateNotification from "../layout/CreateNotification.js";
export const BuyOnion = () => {
  const dispatch = useDispatch();

  const { listBuy, successBuy, errorBuy } = useSelector((state) => state.buy);
  //Tonggle modal create
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isFound, setIsFound] = useState(true);
  //input search
  const [valueSearch, setValueSearch] = useState("");
  const [dataFilter, setDataFilter] = useState({
    all: true,
    typeKilo: false,
    typeKm: false,
    statusBought: false,
    statusDebt: false,
    statusPaid: false,
  });
  //pagination
  const numberEachPages = 8;
  const [valueShow, setValueShow] = useState({
    pageNumber: 1,
    maxValue: numberEachPages,
    minValue: 0,
  });
  //a buy item
  const [itemBuy, setItemBuy] = useState(null);
  //List Buy data
  const [buyData, setBuyData] = useState([]);

  //Get list Buy data
  useEffect(() => {
    dispatch(getListBuy());
  }, [dispatch]);
  //set Buy data when list Buy change

  useEffect(() => {
    if (successBuy) {
      let currentListBuy = listBuy?.filter((buy) => {
        return (
          buy.phone_number?.search(valueSearch) !== -1 ||
          buy.full_name?.search(valueSearch) !== -1
        );
      });
      if (dataFilter.typeKilo)
        currentListBuy = currentListBuy.filter((buy) => buy.type_buy === 2);
      else if (dataFilter.typeKm)
        currentListBuy = currentListBuy.filter((buy) => buy.type_buy === 1);
      else if (dataFilter.statusBought)
        currentListBuy = currentListBuy.filter((buy) => buy.status === 1);
      else if (dataFilter.statusPaid)
        currentListBuy = currentListBuy.filter((buy) => buy.status === 2);
      else if (dataFilter.statusDebt)
        currentListBuy = currentListBuy.filter((buy) => buy.status === 3);
      currentListBuy.length === 0 ? setIsFound(false) : setIsFound(true);
      setBuyData(currentListBuy);
    }
  }, [listBuy, valueSearch, successBuy, dataFilter]);
  //Turn off modal create buy
  const handleCancelCreate = () => {
    setIsModalCreate(false);
    setItemBuy(null);
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
    setItemBuy(null);
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
  //
  const onFilterData = (event, toggle) => {
    if (!event.target.classList.contains("btn-dark")) {
      switch (toggle) {
        //all
        case 1:
          setDataFilter({
            ...dataFilter,
            all: true,
            typeKilo: false,
            typeKm: false,
            statusBought: false,
            statusDebt: false,
            statusPaid: false,
          });
          break;
        //mua xào
        case 2:
          setDataFilter({
            ...dataFilter,
            all: false,
            typeKilo: false,
            typeKm: true,
            statusBought: false,
            statusDebt: false,
            statusPaid: false,
          });
          break;
        // mua kí
        case 3:
          setDataFilter({
            ...dataFilter,
            all: false,
            typeKilo: true,
            typeKm: false,
            statusBought: false,
            statusDebt: false,
            statusPaid: false,
          });
          break;
        //đã trả hết
        case 4:
          setDataFilter({
            ...dataFilter,
            all: false,
            typeKilo: false,
            typeKm: false,
            statusBought: false,
            statusDebt: false,
            statusPaid: true,
          });
          break;
        //còn nợ
        case 5:
          setDataFilter({
            ...dataFilter,
            all: false,
            typeKilo: false,
            typeKm: false,
            statusBought: false,
            statusDebt: true,
            statusPaid: false,
          });
          break;
        //đã mua
        case 6:
          setDataFilter({
            ...dataFilter,
            all: false,
            typeKilo: false,
            typeKm: false,
            statusBought: true,
            statusDebt: false,
            statusPaid: false,
          });
          break;

        default:
          return;
      }
    }
  };
  return (
    <div className="container--card">
      <div className="d-flex justify-content-between header__card--buy">
        <div>
          <span className="title-card"> Quản lí Thu Hành</span>
        </div>
      </div>
      {!isFound ||
      (buyData.length === 0 &&
        listBuy.length === 0 &&
        (successBuy || errorBuy)) ? (
        <>
          <div className="row">
            <div className="align-items-center d-flex header__card--buy__tool my-4 justify-content-end">
              {filter.map((item, index) => (
                <button
                  key={index}
                  className={
                    dataFilter[item.value]
                      ? "btn btn-dark me-2"
                      : "btn btn-outline-dark me-2"
                  }
                  onClick={(e) => onFilterData(e, index + 1)}
                >
                  {item.title}
                </button>
              ))}

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
          </div>
          <CreateNotification title="chủ vườn" />
        </>
      ) : buyData.length !== 0 &&
        listBuy.length !== 0 &&
        (successBuy || errorBuy) ? (
        <>
          <div className="row">
            <div className="align-items-center d-flex header__card--buy__tool my-4 justify-content-end">
              {filter.map((item, index) => (
                <button
                  key={index}
                  className={
                    dataFilter[item.value]
                      ? "btn btn-dark me-2"
                      : "btn btn-outline-dark me-2"
                  }
                  onClick={(e) => onFilterData(e, index + 1)}
                >
                  {item.title}
                </button>
              ))}

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
            {buyData
              .slice(valueShow.minValue, valueShow.maxValue)
              .map((item, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={index}>
                  <BuyCard
                    setIsModalCreate={setIsModalCreate}
                    item={item}
                    index={index + 1 + valueShow.minValue}
                    setItemBuy={setItemBuy}
                  />
                </div>
              ))}

            <div className="row  mt-4">
              <Pagination
                style={{ textAlign: "center" }}
                size="large"
                current={valueShow.pageNumber}
                total={buyData.length}
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
        title="Tạo Đơn Mua Hàng"
        onCancel={handleCancelCreate}
        visible={isModalCreate}
        footer={null}
      >
        <FormCreateBuy
          handleCancel={handleCancelCreate}
          itemBuy={itemBuy}
          setItemBuy={setItemBuy}
          handleFinishCreate={handleFinishCreate}
        />
      </Modal>
    </div>
  );
};

const filter = [
  {
    id: 1,
    title: "Tất cả",
    value: "all",
  },
  {
    id: 2,
    title: "Mua Xào",
    value: "typeKm",
  },
  {
    id: 3,
    title: "Mua Kí",
    value: "typeKilo",
  },
  {
    id: 4,
    title: "Đã trả hết",
    value: "statusPaid",
  },
  {
    id: 5,
    title: "Còn nợ",
    value: "statusDebt",
  },
  {
    id: 6,
    title: "Đã mua",
    value: "statusBought",
  },
];
