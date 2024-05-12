export function getMinMaxPrice(products) {
  const prices = products.map((p) => Number(p.price))
  const minPrice = prices.reduce((a, b) => Math.min(a, b), Infinity)
  const maxPrice = prices.reduce((a, b) => Math.max(a, b), -Infinity)
  return [minPrice, maxPrice]
}
