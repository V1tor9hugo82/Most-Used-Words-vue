const { resolve, reject } = require('core-js/fn/promise')
const fs = require('fs')
const path = require('path')

module.exports = paths => {
  return new Promises((resolve, reject) => {
    try {
      const rows = paths
        .map(path => fs.readFileSync(path).toString('utf-8'))
        .reduce((fullText, fileText) => `${fullText}/n${fileText}`)
        .split('/n')
      resolve(rows)
    } catch (e) {
      reject(e)
    }
  })
}