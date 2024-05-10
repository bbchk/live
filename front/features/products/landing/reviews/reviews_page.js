import s from './reviews_page.module.scss';
import ReviewItem from './review_item';

const LandingProductReviewsPage = ({ product }) => {
  const { reviews } = product;
  return (
    <div className="container mt-5">
      {reviews.map((review) => {
        return <ReviewItem key={`review-${review.id}`} review={review} />;
      })}
    </div>
  );
};

export default LandingProductReviewsPage;
