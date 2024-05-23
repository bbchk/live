import { fetchData } from './utils/misc.js'

function calculateTF(term, product) {
  const { keywords } = product

  var termCount = keywords.reduce((acc, kw) => {
    return kw.toLowerCase() === term.toLowerCase() ? acc + 1 : acc
  }, 0)
  return termCount / keywords.length
}

// Function to calculate inverse document frequency (IDF)
function calculateIDF(term, documents) {
  var docsWithTerm = documents.filter(({ _, keywords }) => {
    return keywords.includes(term.toLowerCase())
  })
  return Math.log(documents.length / (docsWithTerm.length + 1))
}

// Function to calculate TF-IDF
function calculateTFIDF(term, document, documents) {
  var tf = calculateTF(term, document)
  var idf = calculateIDF(term, documents)
  return tf * idf
}

// Function to calculate cosine similarity between two documents
function calculateCosineSimilarity(document1, document2, documents) {
  const activeKw = document1.keywords
  const pKw = document2.keywords

  var terms = new Set([...activeKw, ...pKw])
  var vector1 = Array.from(terms).map((term) =>
    calculateTFIDF(term, document1, documents),
  )
  var vector2 = Array.from(terms).map((term) =>
    calculateTFIDF(term, document2, documents),
  )

  // Calculate dot product
  var dotProduct = vector1.reduce((acc, value, index) => {
    return acc + value * vector2[index]
  }, 0)

  // Calculate magnitudes
  var magnitude1 = Math.sqrt(
    vector1.reduce((acc, value) => {
      return acc + value * value
    }, 0),
  )
  var magnitude2 = Math.sqrt(
    vector2.reduce((acc, value) => {
      return acc + value * value
    }, 0),
  )

  // Calculate cosine similarity
  return dotProduct / (magnitude1 * magnitude2)
}

function similaritiesOf(allProdKws, activeProdKws) {
  let allProdKwsIndexes = allProdKws.map((p) => p._id)

  let similarityList = allProdKws.map((p) =>
    calculateCosineSimilarity(activeProdKws, p, allProdKws),
  )

  let res = getItemObjects(allProdKws, allProdKwsIndexes, similarityList)

  return res
}

self.onmessage = async (event) => {
  const { id, backEndUrl } = event.data

  try {
    const activeProduct = await fetchData(
      `${backEndUrl}products/product/by-id/${id}`,
    )
    const { category, _id, keywords } = activeProduct
    const activeProdKws = { _id, keywords }

    //todo get parant and current category, prioritize current category
    // // todo send two categories or more
    const allProdKwsInCat = await fetchData(
      `${backEndUrl}products/keywords/by-cat-id/${category[0]._id}`,
    )

    const similaritiesRes = similaritiesOf(allProdKwsInCat, activeProdKws).map(
      (p) => p._id,
    )

    self.postMessage(similaritiesRes)
  } catch (error) {
    console.log(error)
    self.postMessage({ error: error.message })
  }
}

function getItemObjects(objectArr, documentIndexes, allSimiliarities) {
  let combined = []
  for (let i = 0; i < allSimiliarities.length; i++) {
    combined.push([allSimiliarities[i], documentIndexes[i]])
  }
  combined.sort(function (a, b) {
    return b[0] - a[0]
  })

  let top = combined.slice(1, 11)

  let top_ids = top.map((elem) => elem[1])

  let res = top_ids.map((id1) =>
    objectArr.find(function (element) {
      return element._id == id1
    }),
  )

  return res
}
