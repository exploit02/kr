var axios = require('axios')
var ES6Promise = require('es6-promise')
ES6Promise.polyfill()
const ApiService = {
    get( apiurl) {
      return axios.get(apiurl)
      .then(response => {
          return response.data
        })
        .catch(response => {
            return response.data
        })
    }
}
export default ApiService



export const userModule = {
  getUser() {
    return ApiService.get( 'http://localhost:3001/users' )
  }
}