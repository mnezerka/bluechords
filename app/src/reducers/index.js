import {combineReducers} from 'redux'
import Song from './Song'
import Songs from './Songs'
import Auth from './Auth'

const rootReducer = combineReducers({
    song: Song,
    songs: Songs,
    auth: Auth
})

export default rootReducer
