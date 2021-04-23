import React from "react";
import s from "./useMobile.module.css";
import qr from "../../assets/images/svg/qr_code.svg";

const UseMobile = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.title}>Use your mobile device</div>
        <div className={s.qr}>
          <img src={qr} alt="QR-Code" />
        </div>
      </div>
    </div>
  );
};

export default UseMobile;
