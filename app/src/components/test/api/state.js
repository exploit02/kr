var axios = require('axios');
var ES6Promise = require('es6-promise');
ES6Promise.polyfill()
const ApiService = {
    get( apiurl) {
        return axios.get(apiurl, {withCredentials: true})
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
          return res;
        })
    },

    put( apiurl,bodyFormData) {
        return axios.put(apiurl,bodyFormData)
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    },

    delete( apiurl, stateId ) {
        axios.delete(apiurl, { data: { id: stateId } })
        .then(response => {
            return response
          })
        .catch(err => console.log(err))
    }
}
export default ApiService


export const stateModule = {
    getState(stateId = '') {
        return ApiService.get( 'http://localhost:3001/state/'+stateId)
      },
    
    addState(state){
    return ApiService.post('http://localhost:3001/state/create', state)
    },

    updateState(stateId){
        return ApiService.put( 'http://localhost:3001/state/update',stateId)
      },

    deleteState(stateId){
        return ApiService.delete( 'http://localhost:3001/state/delete',stateId)
      }


}