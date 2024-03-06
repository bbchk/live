import { useEffect, useState } from "react";
import s from "./data.module.scss";
import { Accordion, Form, Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import InputField from "comps/input_field";

const Data = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    secondName: "",
    email: "",
  });

  const [isBeingModified, setIsBeingModified] = useState(false);

  useEffect(() => {
    if (user) {
      setUserInfo({ ...userInfo, ...user });
    }
  }, [user]);

  const handleSubmit = async (e, value) => {
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
            data-bs-target={`#personalDataTab`}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <i className="bi bi-person-lines-fill"></i>
            <h3>Personal data</h3>
          </button>
        </h2>
        <div
          id={"personalDataTab"}
          className="accordion-collapse collapse show"
        >
          <div className={`accordion-body ${s.accordion_body}`}>
            <form onSubmit={handleSubmit}>
              <InputField
                type="text"
                id="profileFirstNameInput"
                label="First Name:"
                value={userInfo.firstName}
                disabled={isBeingModified}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, firstName: e.target.value });
                }}
              />
              <InputField
                type="text"
                id="profileSecondNameInput"
                label="Second Name:"
                value={userInfo.secondName}
                disabled={isBeingModified}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, secondName: e.target.value });
                }}
              />
              <InputField
                type="email"
                id="profileEmailInput"
                label="Email:"
                value={userInfo.email}
                disabled={isBeingModified}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
              />
              <div className=" ms-4 mt-2">
                {!isBeingModified && (
                  <button
                    className={`btn ${s.btn}`}
                    onClick={() => setIsBeingModified(true)}
                  >
                    Edit
                  </button>
                )}
                {isBeingModified && (
                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className={`btn ${s.btn}`}
                      onClick={() => setIsBeingModified(false)}
                    >
                      Save
                    </button>

                    <button
                      className={`btn ${s.btn}`}
                      onClick={() => setIsBeingModified(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Data;
