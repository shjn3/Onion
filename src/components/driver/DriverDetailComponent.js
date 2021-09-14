import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Pagination } from "antd";

import { getListBuyDetail, getListBuy } from "../../store/actions/buyAction";
import CreateNotification from "../layout/CreateNotification.js";
import ModalBuyDetail from "../modals/ModalBuyDetail";
import { mappingTotalKilo } from "../../functions/helper";
import DriverDetailCard from "../cards/DriverDetailCard";

const DriverDetailComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const nameDriver = location.state.nameDriver;
  //list Buy detail
  const [isFound, setIsFound] = useState([]);
  const [listBuyDetail, setListBuyDetail] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [dataFilter, setDataFilter] = useState({
    all: true,
    paid: false,
    debt: false,
  });
  //toggle show modal create and edit Buy Detail
  const [isShowModalBuyDetail, setIsShowModalBuyDetail] = useState(false);

  const numberEachPages = 8;
  const [valueShow, setValueShow] = useState({
    pageNumber: 1,
    maxValue: numberEachPages,
    minValue: 0,
  });
  //a buy detail
  const [itemBuyDetail, setItemBuyDetail] = useState(null);

  const [total, setTotal] = useState({
    large: 0,
    middle: 0,
    small: 0,
    sum: 0,
  });
  //get data from store of redux
  const {
    listDetail,
    listBuy,
    successBuy,
    successBuyDetail,
    errorBuy,
    errorBuyDetail,
  } = useSelector((state) => state.buy);
  //action initial get list Detail, list customer
  useEffect(() => {
    dispatch(getListBuy());
    dispatch(getListBuyDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successBuyDetail && successBuy) {
      let listCurrentBuy = listBuy.filter(
        (buy) => buy.phone_number.search(valueSearch) !== -1
      );
      let listCurrentBuyDetail = listDetail.filter((detail) =>
        listCurrentBuy.find((buy) => buy._id === detail.idOwner)
      );

      if (dataFilter.paid)
        listCurrentBuyDetail = listCurrentBuyDetail.filter(
          (detail) => detail.status === 1
        );
      else if (dataFilter.debt)
        listCurrentBuyDetail = listCurrentBuyDetail.filter(
          (detail) => detail.status === 2
        );
      listCurrentBuyDetail.length === 0 ? setIsFound(false) : setIsFound(true);
      setListBuyDetail(listCurrentBuyDetail);
    }
  }, [
    listBuy,
    listDetail,
    valueSearch,
    successBuy,
    successBuyDetail,
    dataFilter,
  ]);
  useEffect(() => {
    if (successBuyDetail) {
      if (listDetail.length !== 0) {
        let currentBuyDetail = mappingTotalKilo(listDetail);
        setTotal(currentBuyDetail);
      }
    }
  }, [listDetail, successBuyDetail]);

  const handleCancelModalBuyDetail = () => {
    setIsShowModalBuyDetail(false);
    setItemBuyDetail(null);
  };
  //return pages previous
  const goBack = () => {
    history.goBack();
  };

  const onChangePagination = (pageNumber) => {
    setValueShow({
      ...valueShow,
      pageNumber: pageNumber,
      maxValue: pageNumber * numberEachPages,
      minValue: (pageNumber - 1) * numberEachPages,
    });
  };

  const onFilterData = (event, toggle) => {
    if (!event.target.classList.contains("btn-dark")) {
      switch (toggle) {
        case 1:
          setDataFilter({ ...dataFilter, all: true, paid: false, debt: false });
          break;
        //da tra
        case 2:
          setDataFilter({ ...dataFilter, all: false, paid: true, debt: false });
          break;
        //con no
        case 3:
          setDataFilter({ ...dataFilter, all: false, paid: false, debt: true });
          break;

        default:
          return;
      }
    }
  };
  let result, body, spin;
  result = (
    <div className="col-12">
      <div className="row">
        <div className="col-3">
          <div className="buyDetail__result buyDetail__result--sum">
            <div>Tổng </div>
            <div>{total.sum}</div>
          </div>
        </div>

        <div className="col-3 ">
          <div className="buyDetail__result buyDetail__result--large">
            <div>Lớn</div>
            <div>{total.large}</div>
          </div>
        </div>

        <div className="col-3">
          <div className="buyDetail__result buyDetail__result--medium">
            <div>Trung</div>
            <div>{total.middle}</div>
          </div>
        </div>

        <div className="col-3">
          <div className="buyDetail__result buyDetail__result--small">
            <div>Bi</div>
            <div>{total.small}</div>
          </div>
        </div>
      </div>
    </div>
  );
  spin = (
    <div className="row position-relative h-100">
      <div className="spin">
        <div className="spin__container">
          <div className="spin__circle"></div>
        </div>
      </div>
    </div>
  );
  body = (
    <div className="container--card d-flex flex-column">
      <div className="d-flex justify-content-between mb-4 header__card--buy">
        <div>
          <Link to="/driver" className="title-card">
            Quản lý tài xế
          </Link>
          <span className="title-card px-2">/</span>
          <span className="title-card">Tài xế {nameDriver}</span>
        </div>
        <div>
          <button
            className="btn btn-outline-onion me-2 btn--goback"
            style={{ minWidth: "110px" }}
            onClick={goBack}
          >
            <i className="fas fa-arrow-left pe-2"></i>
            Trở về
          </button>
        </div>
      </div>
      <div className="row">
        {result}
        <div className=" my-4 align-items-center justify-content-end d-flex header__card--buy__tool">
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
              placeholder="Tìm kiếm theo SĐT"
              onChange={(e) => setValueSearch(e.target.value)}
            />
          </label>
        </div>
      </div>
      {!isFound ||
      (listBuyDetail.length === 0 &&
        listDetail.length === 0 &&
        ((successBuy && successBuyDetail) || (errorBuy && errorBuyDetail))) ? (
        <>
          <CreateNotification title="chuyến hàng" />
        </>
      ) : listDetail.length !== 0 &&
        listBuyDetail.length !== 0 &&
        ((successBuy && successBuyDetail) || (errorBuy && errorBuyDetail)) ? (
        <div className="col-12 pt-2">
          <div className="position-relative d-flex flex-column">
            <div className="row">
              {listBuyDetail
                .slice(valueShow.minValue, valueShow.maxValue)
                .map((item, index) => (
                  <div key={index} className="col-3">
                    <DriverDetailCard
                      item={item}
                      setItemBuyDetail={setItemBuyDetail}
                      setIsShowModalBuyDetail={setIsShowModalBuyDetail}
                      index={index + 1 + valueShow.minValue}
                    />
                  </div>
                ))}
            </div>
            <div className="row  mt-4">
              <Pagination
                style={{ textAlign: "center" }}
                size="large"
                current={valueShow.pageNumber}
                total={listBuyDetail.length}
                defaultPageSize={numberEachPages}
                onChange={onChangePagination}
              />
            </div>
          </div>
        </div>
      ) : (
        <>{spin}</>
      )}

      <Modal
        title="Chi tiết"
        visible={isShowModalBuyDetail}
        footer={null}
        onCancel={handleCancelModalBuyDetail}
      >
        <ModalBuyDetail
          handleCancel={handleCancelModalBuyDetail}
          itemBuyDetail={itemBuyDetail}
        />
      </Modal>
    </div>
  );

  return <>{body}</>;
};

export default DriverDetailComponent;

const filter = [
  {
    id: 1,
    title: "Tất cả",
    value: "all",
  },
  {
    id: 2,
    title: "Đã trả",
    value: "paid",
  },
  {
    id: 3,
    title: "Còn nợ",
    vale: "debt",
  },
];
