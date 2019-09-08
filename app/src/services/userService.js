import { ApiService } from './rootService'
var axios = require('axios')
var ES6Promise = require('es6-promise')
ES6Promise.polyfill()

export const UserService = {
  getUser(userId='', pageNumber=1, entryInPage=10, Searchfield='') {
    return ApiService.get( 'http://localhost:3001/users/'+userId, pageNumber, entryInPage, Searchfield )
  },

  addUser(user) {
    return ApiService.post( 'http://localhost:3001/users/create',user)
  },

  updateUser(userId){
    return ApiService.put( 'http://localhost:3001/users/update/',userId)
  },

  deleteUser(userId){
    return ApiService.delete( 'http://localhost:3001/users/delete/',userId)
  }
}

