import { ApiService } from './rootService'

export const stateModule = {
    getState(stateId = '', pageNumber=1, rowInPage=10) {
        return ApiService.get( 'http://localhost:3001/state/'+stateId, pageNumber, rowInPage )
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