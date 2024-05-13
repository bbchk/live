import { LocationOnRounded } from '@mui/icons-material'

const Contacts = () => {
  // <address aria-label='Локація магазину на гугл мапі'>
  return (
    <address>
      <h2>
        <LocationOnRounded />
        <span>Адреса</span>
      </h2>
      <p className='text-center'>м. Калинівка, вул. Незалежності, 47б</p>
    </address>
  )
}

export default Contacts
