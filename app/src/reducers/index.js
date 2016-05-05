import {combineReducers} from 'redux'
import Song from './Song'

const rootReducer = combineReducers({
    song: Song,
})

export default rootReducer
