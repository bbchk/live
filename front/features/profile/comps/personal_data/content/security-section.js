import { useEffect, useState } from "react";
import s from "./security.module.scss";
import { Accordion, Form, Button } from "react-bootstrap";
import InputField from "comps/input_field";

const Security = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

  useEffect(() => {
    // setOldPassword(user.oldPassword);
    // setNewPassword(user.newPassword);
    // setNewPasswordAgain(user.email);
    setNewPassword;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={`accordion-item ${s.accordion_item}`}>
        <h2 className={`accordion-header ${s.accordion_header}`}>
          <button
            className={`accordion-button ${s.accordion_button}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#securityTab`}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <i className="bi bi-lock-fill"></i>
            <h3>Security</h3>
          </button>
        </h2>
        <div id={"securityTab"} className="accordion-collapse collapse show">
          <div className={`accordion-body ${s.accordion_body}`}>
            <form onSubmit={handleSubmit}>
              <InputField
                type="password"
                label="Old password:"
                value={oldPassword}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <InputField
                type="password"
                label="New Password:"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                setNewPassword
              />
              <InputField
                type="password"
                label="New Password Again:"
                value={newPasswordAgain}
                onChange={(e) => {
                  setNewPasswordAgain(e.target.value);
                }}
              />
              <div className=" ms-4 mt-2">
                <button
                  type="submit"
                  className={`btn ${s.btn}`}
                  onClick={() => setIsBeingModified(false)}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
