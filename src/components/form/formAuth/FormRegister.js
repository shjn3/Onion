import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../functions/helper";
import { registerAccount } from "../../../store/actions/account.js";

const FormRegister = () => {
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isFocus, setIsFocus] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });
  const onLogin = (e) => {
    e.preventDefault();
    if (!dataForm.username) {
      showNotification({
        title: "error",
        message: "Tên đăng nhập không được để trống!",
        type: "error",
      });
      return;
    }
    if (dataForm.username.length < 4) {
      showNotification({
        title: "error",
        message: "Tên đăng nhập quá ngắn!",
        type: "error",
      });
      return;
    }
    if (dataForm.password !== dataForm.confirmPassword) {
      showNotification({
        title: "error",
        message: "Mật khẩu không trùng khớp!",
        type: "error",
      });
      return;
    }
    if (!dataForm.password) {
      showNotification({
        title: "error",
        message: "Mật khẩu không được để trống!",
        type: "error",
      });
      return;
    }
    if (dataForm.password.length < 4) {
      showNotification({
        title: "error",
        message: "Mật khẩu quá ngắn!",
        type: "error",
      });
      return;
    }
    dispatch(
      registerAccount({
        username: dataForm.username,
        password: dataForm.password,
      })
    );
  };
  return (
    <>
      <div className="form__login">
        <div>
          <h2 className="txt-center">Đăng ký</h2>
          <form
            className="d-flex flex-column"
            onSubmit={(e) => {
              console.log(e.code);
              if (e.code === "Enter") e.preventDefault();
            }}
          >
            <div className={isFocus.username ? "border-inputFocus" : ""}>
              <label
                className={
                  dataForm.username !== "" ? "form--input focus" : "form--input"
                }
              >
                <span>Tài khoản</span>
                <input
                  type="text"
                  value={dataForm.username}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, username: e.target.value })
                  }
                  onBlur={() => setIsFocus({ ...isFocus, username: false })}
                  onFocus={() => setIsFocus({ ...isFocus, username: true })}
                />
              </label>
            </div>
            <div className={isFocus.password ? "border-inputFocus" : ""}>
              <label
                className={
                  dataForm.password !== "" ? "form--input focus" : "form--input"
                }
              >
                <span>Mật khẩu</span>
                <input
                  type="password"
                  value={dataForm.password}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, password: e.target.value })
                  }
                  onBlur={() => setIsFocus({ ...isFocus, password: false })}
                  onFocus={() => setIsFocus({ ...isFocus, password: true })}
                />
              </label>
            </div>
            <div className={isFocus.password ? "border-inputFocus" : ""}>
              <label
                className={
                  dataForm.confirmPassword !== ""
                    ? "form--input focus"
                    : "form--input"
                }
              >
                <span>Xác nhận mật khẩu</span>
                <input
                  type="password"
                  value={dataForm.confirmPassword}
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  onBlur={() =>
                    setIsFocus({ ...isFocus, confirmPassword: false })
                  }
                  onFocus={() =>
                    setIsFocus({ ...isFocus, confirmPassword: true })
                  }
                />
              </label>
            </div>
          </form>
          <div className="form--btn">
            <button className="btn btn-submit" onClick={onLogin}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <div className="log-in">
        <p>
          Đã có tài khoản? <Link to="/login"> Đăng nhập</Link>
        </p>
      </div>
    </>
  );
};

export default FormRegister;
