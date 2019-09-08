var axios = require('axios')
axios.defaults.withCredentials = true
var ES6Promise = require('es6-promise')
ES6Promise.polyfill()
const ApiService = {

    get(apiurl) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...'
        }
        return axios.get(apiurl)
            .then(response => {
                return response
            })
            .catch(err => {
                const res = {
                    message: err.response.data.message,
                    status: err.response.status
                }
                return res;
            })




    }
}
export default ApiService



export const authModule = {
    validate() {
        return ApiService.get('http://localhost:3001/auth')
    }
}

