import { useEffect, useState } from 'react'
import s from './user_info_form.module.scss'
import ps from '../user_info.module.scss'
import { useSession } from 'next-auth/react'
import InputField from 'comps/input_fields/input_field'
import axios from 'axios'
import Alert from 'comps/warnings/alert'

const UserInfoForm = () => {
  const { data: session, update } = useSession()

  const user = session?.user

  const [isBeingModified, setIsBeingModified] = useState(false)
  const [hasBeenBeingModified, setHasBeenBeingModified] = useState(false)
  const [error, setError] = useState(null)

  const [userInfo, setUserInfo] = useState({
    firstName: session?.user.firstName,
    secondName: '',
    email: '',
  })

  useEffect(() => {
    setUserInfo({
      firstName: user?.firstName || '',
      secondName: user?.secondName || '',
      email: user?.email || '',
    })
  }, [session])

  const handleSubmit = async (e, value) => {
    e.preventDefault()

    const isSame = Object.entries(userInfo).reduce((acc, [key, value]) => {
      return acc && value === user[key]
    }, true)

    if (!isSame) {
      try {
        const response = await axios.patch(
          `/user/personal-info/${session.user.id}`,
          userInfo,
          {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          },
        )

        const requestSuccessful =
          response.status >= 200 && response.status < 300

        if (requestSuccessful) {
          await update({
            ...session,
            user: {
              ...session?.user,
              ...userInfo,
            },
          })
        } else {
          setError('Помилка при збереженні даних')
        }
      } catch (e) {
        setError('Помилка при збереженні даних')
      }
    }
    setIsBeingModified(false)
  }

  return (
    <>
      {error && <Alert text={error} severity={'error'} />}

      <form
        className={`${s.user_info_form} ${ps.user_info_form}`}
        onSubmit={handleSubmit}
      >
        <div className={`${s.input_group}`}>
          <InputField
            type='text'
            id='profileFirstNameInput'
            label="Ім'я:"
            value={userInfo.firstName}
            disabled={!isBeingModified}
            onChange={(e) => {
              setHasBeenBeingModified(true)
              setUserInfo({ ...userInfo, firstName: e.target.value })
            }}
          />
          <InputField
            type='text'
            id='profileSecondNameInput'
            label='Прізвище:'
            value={userInfo.secondName}
            disabled={!isBeingModified}
            onChange={(e) => {
              setHasBeenBeingModified(true)
              setUserInfo({ ...userInfo, secondName: e.target.value })
            }}
          />

          <InputField
            type='email'
            id='profileEmailInput'
            label='Пошта:'
            value={userInfo.email}
            disabled={!isBeingModified}
            onChange={(e) => {
              setHasBeenBeingModified(true)
              setUserInfo({ ...userInfo, email: e.target.value })
            }}
          />
        </div>

        <menu className={`${s.button_group}`}>
          {!isBeingModified && (
            <li>
              <button
                type='button'
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
                  data-toggle='tooltip'
                  title={hasBeenBeingModified ? '' : 'Дані не були змінені'}
                  data-placement='bottom'
                  type='submit'
                  className={`button_primary`}
                  disabled={!hasBeenBeingModified}
                >
                  Зберегти
                </button>
              </li>
              <li>
                <button
                  type='button'
                  className={`button_primary`}
                  onClick={() => {
                    setHasBeenBeingModified(false)
                    setIsBeingModified(false)
                  }}
                >
                  Скасувати
                </button>
              </li>
            </>
          )}
        </menu>
      </form>
    </>
  )
}

export default UserInfoForm
