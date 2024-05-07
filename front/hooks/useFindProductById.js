export const useFindProductById = () => {
  const findProductById = (productId, products) => {
    const foundProduct = products.find((p) => {
      return p._id == productId;
    });

    return foundProduct;
  };

  return { findProductById };
};
