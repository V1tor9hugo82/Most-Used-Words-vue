
module.exports = rows => {
  return new Promises((resolve, reject) => {
    try {
      const words = rows
        .filter(filterValidRow)
        .map(removePunctuation)
        .map(removeTags)
        .reduce(mergeRows)
        .split(' ')
        .map(word => word.toLowerCase())
        .map(word => word.replace('"', ''))

      resolve(words)
    } catch (e) {
      reject(e)
    }
  })
}

function filterValidRow(row) {
  const notNumber = !parseInt(row.trim())
  const notEmpty = !!row.trim()
  const notInterval = !row.includes('-->')
  return notNumber && notEmpty && notInterval
}

const removePunctuation = row => row.replace(/[,?!.-]/g, '')
const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim()
const mergeRows = (fullText, row) => `${fullText} ${row}`