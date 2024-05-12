function process(str) {
  const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
  const html = /<[^>]*>/g
  const whspace = /\s+/

  let words = str
    .replace(html, '')
    .replace(punctuation, '')
    .toLowerCase()
    .split(whspace)

  /* Remove the last letter from each word 
    and filter out words shorter than 2 characters */
  const prsWords = words
    .map((word) => word.slice(0, -1))
    .filter((word) => word.length >= 2)

  return prsWords.join(' ')
}

function stringify(product) {
  const name = product.name
  const descr = product.description.slice(0, 100)
  return process(`${name} ${descr}`)
}

export { process, stringify }
