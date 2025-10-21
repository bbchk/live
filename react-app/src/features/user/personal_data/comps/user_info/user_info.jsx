import ProfileImage from './comps/profile_image'
import UserInfoForm from './comps/user_info_form'

import s from './user_info.module.scss'

import { AccountCircleRounded } from '@mui/icons-material'

import Card from '../card'

const UserInfo = () => {
  const Header = () => (
    <div className={` ${s.header}`}>
      <AccountCircleRounded />
      <span>Персональні дані</span>
    </div>
  )

  const Body = () => (
    <div className={` ${s.body}`}>
      <ProfileImage />
      <UserInfoForm />
    </div>
  )

  return <Card Header={Header} Body={Body} />
}

export default UserInfo
