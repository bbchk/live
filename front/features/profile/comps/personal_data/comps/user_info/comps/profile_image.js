import s from './profile_image.module.scss'
import ps from '../user_info.module.scss'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const ProfileImage = () => {
  const { data: session } = useSession()

  const user = session?.user

  return (
    <div className={`${s.profile_image} ${ps.profile_image}`}>
      {user && user.image && (
        <Image
          src={user.image}
          width={300}
          height={300}
          sizes='100vw'
          alt='user'
        />
      )}
    </div>
  )
}

export default ProfileImage
