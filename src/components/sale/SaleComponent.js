import React from "react";

export const SaleOnion = () => {
  return <div className="d-flex justify-content-between mb-2">
    <div>
      <span className="title-card"> Quản lí Thu Hành</span>
    </div>
    <div className="align-items-center d-flex">
      <label className="Search">
        <>
          <div className="IconSearch">
            <i className="fas fa-search me-1"></i>
          </div>
          <input
            className="InputSearch"
            type="text"
            //value={valueSearch}
            placeholder="Tìm kiếm theo SĐT"
           // onChange={(e) => setValueSearch(e.target.value)}
          />
        </>
      </label>
      <button
        type="button"
        className="btn btn-danger"
        style={{ minWidth: "110px" }}
       // onClick={() => setIsModalCreate(true)}
      >
        <i className="fas fa-user-plus btn-icon me-2"></i>Thêm
      </button>
    </div>
  </div>
};
