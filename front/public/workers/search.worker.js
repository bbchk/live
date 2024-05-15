import { stringify, process } from './utils/stringify.js'

function calculateTF(term, document) {
  var words = document.split(' ')
  var termCount = words.reduce((acc, word) => {
    return word.toLowerCase() === term.toLowerCase() ? acc + 1 : acc
  }, 0)
  return termCount / words.length
}

// Function to calculate inverse document frequency (IDF)
function calculateIDF(term, documents) {
  var docsWithTerm = documents.filter((document) => {
    return document.toLowerCase().split(' ').includes(term.toLowerCase())
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
  var terms = new Set([...document1.split(' '), ...document2.split(' ')])
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

function similarities(documents, product) {
  let processedDocuments = documents.slice(0, 250).map((doc) => stringify(doc))

  let documentIndexes = documents.map((doc) => doc._id)

  let currDoc = stringify(product)

  let similarityList = processedDocuments.map((doc) =>
    calculateCosineSimilarity(currDoc, doc, processedDocuments),
  )

  let res = getItemObjects(documents, documentIndexes, similarityList)

  return res
}

self.onmessage = async (event) => {
  const { id } = event.data

  try {
    const productQuery = await fetch(
      `http://localhost:4000/products/product/by-id/${id}`,
    )
    const product = await productQuery.json()

    const allProductQuery = await fetch(`http://localhost:4000/products`)
    const products = await allProductQuery.json()

    const similaritiesRes = similarities(products, product)
    console.log('🚀 ~ similaritiesRes:', similaritiesRes)

    self.postMessage(similaritiesRes)
  } catch (error) {
    self.postMessage({ error: error.message })
  }
}
