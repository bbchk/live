import SearchBar from './comps/search-bar';
import ButtonGroup from './comps/button_group/button_group';
import Logo from './comps/logo';
import {
  MainOffcanvas,
  OffcanvasToggler,
} from './comps/offcanvas/main_offcanvas';
import s from './header.module.scss';
import { useSelector } from 'react-redux';
import { balsamiqSans } from 'pages/_app';

const Header = () => {
  const { loading } = useSelector((state) => state.modals);

  return (
    <header className={`${s.header_container}`}>
      <nav className={`${s.header} ${balsamiqSans.className}`}>
        <OffcanvasToggler />
        <Logo />
        <SearchBar />
        <ButtonGroup />
      </nav>
      <div className={`${s.underline}`}>
        {loading && <div className={s.loader_line} />}
      </div>
    </header>
  );
};

export default Header;
