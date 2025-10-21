import s from './tabs.layout.module.scss'

const TabsLayout = ({ Tabs, Content }) => {
  return (
    <div className={`${s.layout}`}>
      <nav className={`${s.tabs}`}>
        <Tabs />
      </nav>
      <div className={`${s.content}`}>
        <Content />
      </div>
    </div>
  )
}

export default TabsLayout
