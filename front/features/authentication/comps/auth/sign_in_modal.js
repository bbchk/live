import { useSignIn } from "root/hooks/useSignIn";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const SignInForm = ({ toggleModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading, error } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn(email, password);
    if (!error) {
      toggleModal();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="text-center fs-4 mb-4 bt-2">Вхід</h3>
        <div>
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

          <div className={`form-floating mb-2 `}>
            <input
              type="password"
              id="form1Example2"
              className={`form-control fs-5 ${error ? "is-invalid" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="form1Example2">Пароль</label>
          </div>
        </div>

        <div className="text-center mb-4">
          <a href="#!">Забули пароль?</a>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <button
            type="submit"
            className="btn btn-outline-success"
            disabled={isLoading}
          >
            <p>Увійти</p>
          </button>
        </div>
        {error ? <div className={``}>{error}</div> : <></>}
      </form>
    </>
  );
};

const SignInModal = ({ isOpen, toggle, toggleSignUpModal }) => {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(false);
  return (
    <>
      <Modal id="SignInModal" show={isOpen && showA} onHide={toggle} centered>
        <Modal.Body>
          <div className="modal-body mx-3">
            <SignInForm toggleModal={toggle} />
            <div className="text-center">
              <p>
                Не зареєстровані?{" "}
                <a
                  href="#"
                  onClick={() => {
                    toggle();
                    toggleSignUpModal();
                  }}
                >
                  Зареєструватись
                </a>
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
