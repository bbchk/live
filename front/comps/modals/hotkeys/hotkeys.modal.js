import s from './hotkeys.modal.module.scss'
import ms from 'comps/modals/modal.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import {
  toggle,
  GLOBAL_COMPS,
} from 'store/slices/global_comps/global_comps.slice'
const { HOTKEYS_MODAL } = GLOBAL_COMPS

import { balsamiqSans } from 'pages/_app'
import { useId } from 'react'
import CustomAlert from '#root/comps/warnings/alert.js'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const HotkeysModal = () => {
  const dispatch = useDispatch()
  const { hotkeysModalOpen } = useSelector((state) => state.modals)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      open={hotkeysModalOpen}
      onClose={() => dispatch(toggle(HOTKEYS_MODAL))}
      fullWidth
      maxWidth='lg'
      fullScreen={fullScreen}
    >
      <DialogTitle className={`${ms.header} ${balsamiqSans.className}`}>
        Гарячі клавіші
      </DialogTitle>
      <DialogContent className={`${s.body} ${balsamiqSans.className}`}>
        <div className={s.alert}>
          <CustomAlert
            text={
              'Переконайтесь, що використовуєте латиницю, деякі клавіші не підтримуються українською. Вибачте за тимчасові незручності!'
            }
            animated={false}
          />
        </div>
        <menu className={`${s.hotkeys_group} ${s.general}`}>
          <HotkeyItem
            dscrpt={'Відкрити вікно гарячих клавіш'}
            hk={['shift', '?']}
          />
        </menu>
        <menu className={`${s.hotkeys_group} ${s.navigation}`}>
          <HotkeyItem
            dscrpt={'Перейти на домашню сторінку'}
            hk={['ctrl', 'alt', 'h']}
          />
          <HotkeyItem
            dscrpt={'Відкрити кошик покупок'}
            hk={['ctrl', 'alt', 'c']}
          />
          <HotkeyItem
            dscrpt={'Відкрити бокове меню'}
            hk={['ctrl', 'alt', 'd']}
          />
        </menu>
        <menu className={`${s.hotkeys_group} ${s.focus}`}>
          <HotkeyItem dscrpt={'Фокусуватись на пошуку'} hk={['/']} />
          <HotkeyItem
            dscrpt={'Фокусуватись на основному вмісті'}
            hk={['ctrl', 'm']}
          />
        </menu>

        <menu className={`${s.hotkeys_group} ${s.user} ${s.auth}`}>
          <HotkeyItem
            dscrpt={'Перейти до особистого кабінету'}
            hk={['ctrl', 'alt', 'u']}
          />

          <HotkeyItem
            dscrpt={'Перейти до списку бажаного'}
            hk={['ctrl', 'alt', 'w']}
          />
          <HotkeyItem
            dscrpt={'Перейти до моїх замовлень'}
            hk={['ctrl', 'alt', 'o']}
          />
          <HotkeyItem
            dscrpt={'Вийти з облікового запису'}
            hk={['ctrl', 'alt', 'q']}
          />
        </menu>
        <menu className={`${s.hotkeys_group} ${s.user} ${s.not_auth}`}>
          <>
            <HotkeyItem
              dscrpt={'Зареєструвати обліковий запис'}
              hk={['ctrl', 'alt', 'r']}
            />
            <HotkeyItem
              dscrpt={'Увійти в обліковий запис'}
              hk={['ctrl', 'alt', 'l']}
            />
          </>
        </menu>
      </DialogContent>
    </Dialog>
  )
}

export default HotkeysModal

const HotkeyItem = ({ dscrpt, hk }) => {
  const id = useId()
  return (
    <li className={`${s.hotkey_item}`}>
      <p className={`${s.description}`}>{dscrpt}</p>
      <p className={`${s.keys}`}>
        {hk.map((k) => (
          <span key={`${id}-${k}`}>{k}</span>
        ))}
      </p>
    </li>
  )
}
