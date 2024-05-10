import { useRouter } from 'next/router';
import s from './info_header.module.scss';
import StarRating from 'comps/rating/star_rating';
import Link from 'next/link';

const MainInfoHeader = ({
  product: {
    name,
    reviews = ['good', 'bad', 'good', 'bad', 'good', 'bad'],
    starRating = 3.7,
    code = '000000',
  },
}) => {
  const router = useRouter();
  const productPathNoActiveTab = router.asPath
    .split('/')
    .slice(0, -1)
    .join('/');

  const handleNavigation = (e) => {
    e.preventDefault();
    router.push(productPathNoActiveTab + '/reviews', undefined, {
      shallow: true,
    });
  };

  return (
    <header className={`${s.header}`}>
      <h2>{name}</h2>
      <div className={`${s.sub_header}`}>
        <div className={`${s.rating}`}>
          <StarRating rating={starRating} />
          <Link
            className="link_secondary"
            href="#"
            onClick={handleNavigation}
          >{`${reviews.length} відгуків`}</Link>
        </div>
        <p>{`Код: ${code}`}</p>
      </div>
    </header>
  );
};

export default MainInfoHeader;
