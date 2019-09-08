var axios = require('axios')
axios.defaults.withCredentials = true
var ES6Promise = require('es6-promise')
ES6Promise.polyfill()

const ApiService = {

    post(apiurl) {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...'
        }
        return axios.post(apiurl)
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



export const logoutModule = {
    logout() {
        return ApiService.post('http://localhost:3001/signout')
    }
}

