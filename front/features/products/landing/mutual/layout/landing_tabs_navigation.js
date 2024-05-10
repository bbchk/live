import Link from 'next/link';
import { useRouter } from 'next/router';
import s from './landing_tabs_navigation.module.scss';

import { slugify } from '@bbuukk/slugtrans/slugify';
import { transliterate } from '@bbuukk/slugtrans/transliterate';

const TabsNavigation = ({ activeTab }) => {
  const router = useRouter();
  const { productSlug, productId } = router.query;

  const productUrl = (activeTab) =>
    `/product/${productSlug}/${productId}/${activeTab}`;

  const TabLink = ({ tabName, label }) => {
    const handleClick = (e) => {
      e.preventDefault();
      router.push(productUrl(tabName), undefined, { shallow: true });
    };

    return (
      <li className={`nav-item ${s.link_container}`}>
        <Link
          href={''}
          className={`nav-link ${s.link}  ${
            activeTab === tabName ? s.active : ''
          }`}
          aria-current="page"
          onClick={handleClick}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <>
      <ul className={`nav nav-underline ${s.navigation}`}>
        <div className={`${s.decor_line}`} />

        <TabLink tabName={'about'} label={'Усе про товар'} />

        <TabLink tabName={'characteristics'} label={'Характеристики'} />

        <TabLink tabName={'reviews'} label={'Відгуки'} />
      </ul>
    </>
  );
};

export default TabsNavigation;
