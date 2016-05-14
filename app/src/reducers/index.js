import {combineReducers} from 'redux'
import Song from './Song'
import Songs from './Songs'

const rootReducer = combineReducers({
    song: Song,
    songs: Songs,
})

export default rootReducer
