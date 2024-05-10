import { useSession } from 'next-auth/react'
import s from './tab.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const ProfileTab = () => {
  const { data: session } = useSession()
  const user = session?.user
  return (
    <Link
      className={`${s.tab} ${s.profile_tab}`}
      href={'/profiler/personal_data'}
    >
      <div className={`${s.image}`}>
        {user && user.image && (
          <Image
            src={user.image}
            width={50}
            height={50}
            sizes='100vw'
            alt='user'
          />
        )}
      </div>
      <div className={`${s.credentials}`}>
        <p>{`${user?.firstName}  ${user?.secondName}`}</p>
        <p>{user?.email}</p>
      </div>
    </Link>
  )
}

export default ProfileTab
