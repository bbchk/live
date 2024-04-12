const LandingProductReviewsPage = ({ reviews }) => {
  return (
    <>
      {reviews.map((review) => {
        return <ReviewItem key={`review-${review.id}`} review={review} />;
      })}
    </>
  );
};

export default LandingProductReviewsPage;
