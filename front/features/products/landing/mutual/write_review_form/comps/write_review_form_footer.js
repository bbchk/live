import s from './write_review_form_footer.module.scss';

import Link from 'next/link';

const WriteReviewFormFooter = () => {
  return (
    <footer className={s.footer}>
      <button type="submit" className="button_submit">
        Залишити відгук
      </button>
      <p>
        Щоб ваш відгук пройшов модерацію і був опублікований, ознайомтеся, будь
        ласка, з{' '}
        <Link className="link_primary" href="/review-write-rules">
          нашими правилами
        </Link>
      </p>
    </footer>
  );
};

export default WriteReviewFormFooter;
