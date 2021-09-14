import React from "react";
import { useDispatch } from "react-redux";
import { logoutAccount } from "../../store/actions/account";

export const Header = () => {
  const dispatch = useDispatch();
  const handleSigOut = () => {
    dispatch(logoutAccount());
  };

  return (
    <div className="header_main d-flex justify-content-end position-relative">
      <button
        className="btn btn-outline-primary me-2 position-relative btn-logout"
        onClick={() => handleSigOut()}
      >
        <i className="fas fa-sign-out-alt"></i> Đăng xuất
      </button>
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
    </div>
  );
};
