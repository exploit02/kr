var axios = require('axios')
var ES6Promise = require('es6-promise')
axios.defaults.withCredentials = true
ES6Promise.polyfill()
export const ApiService = {
    get( apiurl, pageNumber=1, entryInPage=5, searchField='') {
      console.log(pageNumber, entryInPage, searchField)
      return axios.get(apiurl, { params: {pageNumber: pageNumber, entryInPage:entryInPage, searchField:searchField} })
      .then(response => {
          return response.data
        })
        .catch(response => {
            return response.data
        })
    },

    post( apiurl,bodyFormData) {
        return axios.post(apiurl,bodyFormData)
        .then(response => {
            return response
          })
        .catch(err => {
          const res = {
              message : err.response.data.message,
              status : err.response.status
          }
          return err;
        })
    },

    put( apiurl,bodyFormData) {
        return axios.put(apiurl,bodyFormData)
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    },

    delete( apiurl, Id ) {
        axios.delete(apiurl, { data: { id: Id } })
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    }
}