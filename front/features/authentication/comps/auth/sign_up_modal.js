import { useSignUp } from "root/hooks/useSignUp";
import { useState } from "react";
import { Modal } from "react-bootstrap";

import s from "./sign_up_modal.module.scss";

const SignUpForm = ({ toggleModal }) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp(firstName, secondName, email, password);
    if (!error) {
      toggleModal();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="text-center fs-4 mb-4 bt-2">Реєстрація</h3>
        <div className="row mb-4">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                id="form3Example1"
                className="form-control"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder=""
              />
              <label className={`form-label ${s.label}`} htmlFor="orm3Example1">
                Ім'я
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                id="form3Example2"
                className="form-control"
                value={secondName}
                onChange={(e) => {
                  setSecondName(e.target.value);
                }}
                placeholder=""
              />
              <label
                className={`form-label ${s.label}`}
                htmlFor="form3Example2"
              >
                Прізвище
              </label>
            </div>
          </div>
        </div>
        <div className="form-floating mb-4">
          <input
            type="email"
            id="form1Example1"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder=""
          />
          <label className={`form-label ${s.label}`} htmlFor="form1Example1">
            Пошта
          </label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="password"
            id="form1Example2"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder=""
          />
          <label className={`form-label ${s.label}`} htmlFor="form1Example2">
            Пароль
          </label>
          <div id="passwordHelpBlock" className={`form-text `}>
            Ваш пароль має складатися з 8-20 символів, містити букви та чисел і
            не має містити пробілів, спеціальних символів або емодзі.
          </div>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-outline-success"
          >
            <p>Зареєструватись</p>
          </button>
        </div>
        {error ? <div className={`${s.error}`}>{error}</div> : <></>}
      </form>
    </>
  );
};

const SignUpModal = ({ isOpen, toggle, toggleSingInModal }) => {
  return (
    <>
      <Modal id="SignUpModal" show={isOpen} onHide={toggle} centered>
        <Modal.Body>
          <div className="modal-body mx-3">
            <SignUpForm toggleModal={toggle} />
            <div className="text-center">
              <p>
                Уже зареєстровані?{" "}
                <a
                  href="#"
                  onClick={() => {
                    toggle();
                    toggleSingInModal();
                  }}
                >
                  Увійти
                </a>
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
