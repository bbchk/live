import { useState } from "react";

import s from "./security.module.scss";

const Security = () => {
  const [password, setPassword] = useState("");
  return (
    <div className={`card card-body ${s.security}`}>
      <a
        className={`icon-link fs-4 ${s.header}`}
        data-bs-toggle="collapse"
        href="#collapseExample1"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample1"
      >
        <i className="bi bi-lock-fill"></i>
        <h3>Безпека</h3>
      </a>
      <div className={`collapse show ${s.body}`} id="collapseExample1">
        <div className="form-floating mb-4">
          <input
            type="password"
            id="oldPassword"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label className={`form-label ${s.label}`} htmlFor="oldPassword">
            Старий пароль
          </label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label className={`form-label ${s.label}`} htmlFor="newPassword">
            Новий пароль
          </label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="password"
            id="confirmNewPassword"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label
            className={`form-label ${s.label}`}
            htmlFor="confirmNewPassword"
          >
            Новий пароль ще раз
          </label>
        </div>
      </div>
    </div>
  );
};

export default Security;
