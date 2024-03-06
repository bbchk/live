import s from "./user_info.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfileImage = ({ user }) => {
  return (
    <div className={`${s.profile_image}`}>
      {user && user.image && (
        <Image src={user.image} width={0} height={0} sizes="100vw" />
      )}
    </div>
  );
};

export default ProfileImage;
