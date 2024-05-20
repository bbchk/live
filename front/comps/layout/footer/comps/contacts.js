import { LocationOnRounded } from '@mui/icons-material'

const Contacts = () => {
  // <address aria-label='Локація магазину на гугл мапі'>
  return (
    <>
      <h2>
        <LocationOnRounded />
        <span id='store-address'>Адреса</span>
      </h2>
      <address className='text-center' aria-labelledby='store-address'>
        м. Калинівка, вул. Незалежності, 47б
      </address>
    </>
  )
}

export default Contacts
