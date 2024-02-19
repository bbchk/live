export const useFindProductById = () => {
  const findProductById = (productId, products) => {
    console.log(productId);
    console.log(products);
    const foundProduct = products.find((p) => {
      return p._id == productId;
    });

    return foundProduct;
  };

  return { findProductById };
};
