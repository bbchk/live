import ProfileImage from './comps/profile_image'
import UserInfoForm from './comps/user_info_form'
import Card from 'react-bootstrap/Card'
import s from './user_info.module.scss'
import card_s from './../card.module.scss'
import { AccountCircleRounded } from '@mui/icons-material'

const UserInfo = () => {
  return (
    <>
      <Card className={`${card_s.card}`}>
        <Card.Header className={`${card_s.header}`}>
          <AccountCircleRounded />
          <h4>Персональні дані</h4>
        </Card.Header>
        <Card.Body className={`${card_s.body} ${s.body}`}>
          <ProfileImage />
          <UserInfoForm />
        </Card.Body>
      </Card>
    </>
  )
}

export default UserInfo
