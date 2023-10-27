import { useEffect, useState } from "react";
import { useAuthContext } from "root/hooks/useAuthContext";
import s from "./data.module.scss";

const Data = () => {
  const { user } = useAuthContext();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  // const [birthDate, setBirthDate] = useState("");

  const [modifyPersonalData, setModifyPersonalData] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setSecondName(user.secondName);
      setEmail(user.email);
      //   setBirthDate(user.birthDate);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={`card card-body ${s.data}`}>
        <a
          className={`icon-link fs-4 ${s.header}`}
          data-bs-toggle="collapse"
          href="#collapseExample2"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample2"
        >
          <i className="bi bi-person-lines-fill"></i>
          <h3>Особисті дані</h3>
        </a>

        <div className={`collapse show ${s.header}`} id="collapseExample2">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-2">
              <input
                type="text"
                id="form3Example1"
                className="form-control"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder=""
                disabled={!modifyPersonalData}
              />
              <label className={`form-label ${s.label}`} htmlFor="orm3Example1">
                Ім'я
              </label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="text"
                id="form3Example2"
                className="form-control"
                value={secondName}
                onChange={(e) => {
                  setSecondName(e.target.value);
                }}
                // placeholder={user.secondName}
                disabled={!modifyPersonalData}
              />
              <label
                className={`form-label ${s.label}`}
                htmlFor="form3Example2"
              >
                Прізвище
              </label>
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
                // placeholder={user.email}
                disabled={!modifyPersonalData}
              />
              <label
                className={`form-label ${s.label}`}
                htmlFor="form1Example1"
              >
                Пошта
              </label>
            </div>

            <div className="mb-3">
              {!modifyPersonalData && (
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={() => setModifyPersonalData(true)}
                >
                  <p>Редагувати</p>
                </button>
              )}
              {modifyPersonalData && (
                <div className="">
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    onClick={() => setModifyPersonalData(false)}
                  >
                    <p>Зберегти</p>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    onClick={() => setModifyPersonalData(false)}
                  >
                    <p>Скасувати</p>
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Data;
