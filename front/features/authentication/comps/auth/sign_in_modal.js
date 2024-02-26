import { useSignIn } from "hooks/useSignIn";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import s from "./sign_in_modal.module.scss";

import Link from "next/link";
import { signIn } from "next-auth/react";

const SignInFormByCredentials = ({ toggleModal, toggleSignUpModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading, error } = useSignIn();

  const [isPasswordPlainText, setIsPasswordPlainText] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn(email, password);
    if (!error) {
      toggleModal();
    }
  };

  return (
    <div className={`${s.by_credentials} ${s.left}`}>
      <form onSubmit={handleSubmit}>
        <div className={`form-floating mb-4 `}>
          <input
            type="email"
            id="form1Example1"
            className={`form-control fs-5 ${error ? "is-invalid" : ""}`}
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="form1Example1">Пошта</label>
        </div>

        <div className={`form-floating mb-2 ${s.password_input_container}`}>
          <input
            type={isPasswordPlainText ? "text" : "password"}
            id="form1Example2"
            className={`form-control fs-5 ${error ? "is-invalid" : ""}`}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="form1Example2">Пароль</label>
          <button
            className={`${s.eye_button} btn`}
            type="button"
            onClick={() => {
              setIsPasswordPlainText(!isPasswordPlainText);
            }}
          >
            <i
              className={`bi bi-eye-${isPasswordPlainText ? "" : "slash-"}fill`}
            />
          </button>
        </div>

        <Link
          className={`text-center d-block ${s.forgot_password_link}`}
          href="#!"
        >
          Забули пароль?
        </Link>

        <button
          type="submit"
          className={`btn btn-outline-success ${s.sign_in_button}`}
          disabled={isLoading}
        >
          <p>Увійти</p>
        </button>
        {error ? <div className={``}>{error}</div> : <></>}
      </form>
      <Link
        className={`text-center d-block ${s.sign_up_link}`}
        href="#"
        onClick={() => {
          toggleModal();
          toggleSignUpModal();
        }}
      >
        Зареєструватись
      </Link>
    </div>
  );
};

const SignInFormByServices = () => {
  const ServiceButton = ({ serviceName }) => {
    return (
      <button
        onClick={() => signIn({ serviceName })}
        className={`btn btn-outline-success ${s.service_button}`}
      >
        <i className={`bi bi-${serviceName}`} />
        {/*capitalize first letter of service*/}

        {serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}
      </button>
    );
  };

  return (
    <div className={`${s.by_services} ${s.right}`}>
      <h6 className={`text-center d-block ${s.subheading}`}>
        Увійти за допомогою
      </h6>

      <div className={`${s.button_group}`}>
        <ServiceButton serviceName={"google"} />
        <ServiceButton serviceName={"facebook"} />
        <ServiceButton serviceName={"apple"} />
      </div>
    </div>
  );
};

const SignInModal = ({ isOpen, toggle, toggleSignUpModal }) => {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(false);
  return (
    <>
      <Modal
        id="SignInModal"
        show={isOpen && showA}
        onHide={toggle}
        centered
        // size="lg"
        className={`${s.modal}`}
      >
        <Modal.Header className={`${s.modal_header}`}>
          <h3 className={`${s.heading}`}>Вхід</h3>
          <button
            className={`${s.close_button} btn btn-outline-success`}
            onClick={() => {
              toggle();
            }}
          >
            <i className={`bi bi-x-lg ${s.close_icon}`}></i>
          </button>
        </Modal.Header>
        <Modal.Body className={`${s.modal_body}`}>
          <SignInFormByCredentials
            toggleModal={toggle}
            toggleSignUpModal={toggleSignUpModal}
          />

          <div className={`${s.vertical_splitter}`}>
            <div className={`${s.line}`}></div>
            <p>або</p>
            <div className={`${s.line}`}></div>
          </div>

          <SignInFormByServices />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
