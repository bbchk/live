import { useEffect, useState } from "react";
import s from "./user_info_form.module.scss";
import ps from "../user_info.module.scss";
import { useSession } from "next-auth/react";
import InputField from "comps/input_fields/input_field";

const UserInfoForm = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [isBeingModified, setIsBeingModified] = useState(false);
  const [hasBeenBeingModified, setHasBeenBeingModified] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    secondName: "",
    email: "",
  });

  useEffect(() => {
    setUserInfo({
      firstName: user?.firstName || "",
      secondName: user?.secondName || "",
      email: user?.email || "",
    });
  }, [session, isBeingModified]);

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    setIsBeingModified(false);
  };

  return (
    <form
      className={`${s.user_info_form} ${ps.user_info_form}`}
      onSubmit={handleSubmit}
    >
      <div className={`${s.input_group}`}>
        <InputField
          type="text"
          id="profileFirstNameInput"
          label="Ім'я:"
          value={userInfo.firstName}
          disabled={!isBeingModified}
          onChange={(e) => {
            setHasBeenBeingModified(true);
            setUserInfo({ ...userInfo, firstName: e.target.value });
          }}
        />
        <InputField
          type="text"
          id="profileSecondNameInput"
          label="Прізвище:"
          value={userInfo.secondName}
          disabled={!isBeingModified}
          onChange={(e) => {
            setHasBeenBeingModified(true);
            setUserInfo({ ...userInfo, secondName: e.target.value });
          }}
        />

        <InputField
          type="email"
          id="profileEmailInput"
          label="Пошта:"
          value={userInfo.email}
          disabled={!isBeingModified}
          onChange={(e) => {
            setHasBeenBeingModified(true);
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
      </div>

      <menu className={`${s.button_group}`}>
        {!isBeingModified && (
          <li>
            <button
              type="button"
              className={`button_primary`}
              onClick={() => setIsBeingModified(true)}
            >
              Редагувати
            </button>
          </li>
        )}
        {isBeingModified && (
          <>
            <li>
              <button
                data-toggle="tooltip"
                title={hasBeenBeingModified ? "" : "Дані не були змінені"}
                data-placement="bottom"
                type="submit"
                className={`button_primary`}
                disabled={!hasBeenBeingModified}
                onClick={() => {
                  setHasBeenBeingModified(false);
                }}
              >
                Зберегти
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`button_primary`}
                onClick={() => {
                  setHasBeenBeingModified(false);
                  setIsBeingModified(false);
                }}
              >
                Скасувати
              </button>
            </li>
          </>
        )}
      </menu>
    </form>
  );
};

export default UserInfoForm;
