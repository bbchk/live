import { useEffect, useState } from "react";
import s from "./user_info.module.scss";
import { Accordion, Form, Card, Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import InputField from "comps/input_field";
import Image from "next/image";
import ProfileImage from "./profile_image";

const UserInfoForm = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName || "",
    secondName: user?.secondName || "",
    email: user?.email || "",
  });

  const [isBeingModified, setIsBeingModified] = useState(false);

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    setIsBeingModified(false);
  };

  return (
    <form className={`${s.user_info_form}`} onSubmit={handleSubmit}>
      <div className={`${s.input_group}`}>
        <InputField
          type="text"
          id="profileFirstNameInput"
          label="Ім'я:"
          value={userInfo.firstName}
          disabled={!isBeingModified}
          onChange={(e) => {
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
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
      </div>

      <div className={`${s.button_group}`}>
        {!isBeingModified && (
          <button
            type="button"
            className={`${s.edit_btn}`}
            onClick={() => setIsBeingModified(true)}
          >
            Редагувати
          </button>
        )}
        {isBeingModified && (
          <>
            <button type="submit" className={`${s.save_btn}`}>
              Зберегти
            </button>
            <button
              type="button"
              className={`${s.cancel_btn}`}
              onClick={() => setIsBeingModified(false)}
            >
              Скасувати
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default UserInfoForm;
