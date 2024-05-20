import { LocationOnRounded } from '@mui/icons-material'

const Contacts = () => {
  return (
    <>
      <h2>
        <LocationOnRounded />
        <span id='store-address'>Адреса</span>
      </h2>
      <address
        className='text-center'
        aria-labelledby='store-address'
        style={{ boxShadow: 'none', padding: '0', margin: '0' }}
      >
        м. Калинівка, вул. Незалежності, 47б
      </address>
    </>
  )
}

export default Contacts
