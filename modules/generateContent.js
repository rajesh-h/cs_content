import { StoreDB } from '../services/fireinit'
const fs = require('fs-extra')
// const { StoreDB } = require('../services/fireinit')
// const { StoreDB } = require('~/services/fireinit')

// const url = 'http://localhost:8000/recipes/'

module.exports = function fetchData() {
  // writeData writes the data to a file given the path
  // Same as in previous solution
  const writeData = (path, data) => {
    return new Promise((resolve, reject) => {
      try {
        fs.ensureFileSync(path)
        fs.writeJson(path, data, resolve(`${path} Write Successful`))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`${path} Write failed. ${e}`)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`${path} Write Failed. ${e}`)
      }
    })
  }

  const getData = async (builder) => {
    // fs.emptyDir('static/data')
    // eslint-disable-next-line no-console
    console.log('STARTING BEFORE BUILD SCRIPT')
    const fetcher = []

    // Fetch list from API
    const dateOffset = 24 * 60 * 60 * 1000 * 2 // 5 days
    const goBackTill = Date.now() - dateOffset
    const basePath = `content`
    const allRecipes = []
    await StoreDB.collection('recipes')
      .where('publish', '==', true)
      .where('updated', '>', goBackTill)
      .orderBy('updated', 'desc')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          // eslint-disable-next-line no-console
          console.log('No New Recipes')
          return
        }
        querySnapshot.forEach((doc) => {
          allRecipes.push({
            ...doc.data()
          })
        })
      })

    // eslint-disable-next-line no-console
    // console.log(allRecipes)

    // Loop through list
    for (const recipe of allRecipes) {
      const path = `${basePath}/${recipe.slug}`
      // if (!fs.pathExistsSync(path)) fs.emptyDir(path)
      const fileName = `${path}.json`
      // eslint-disable-next-line no-console
      console.log(`PROCESSING ${fileName}...`)

      // Write Detail Data to file
      fetcher.push(writeData(fileName, recipe))
    }
    return Promise.all(fetcher)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Pre Build complete!')
      })
      .catch((e) => {
        throw e
      })
  }

  // Run it before the nuxt build stage
  this.nuxt.hook('build:before', getData)
}
