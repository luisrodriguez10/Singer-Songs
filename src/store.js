import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const singersReducer = ( state = [], action ) => {
    if(action.type === 'LOAD_SINGERS'){
        return action.singers
    }
    if(action.type === 'CREATE_SINGER'){
        return [...state, action.singer]
    }
    return state
}

const genresReducer = ( state = [], action ) => {
    if(action.type === 'LOAD_GENRES'){
        return action.genres
    }
    return state
}

const songsReducer = ( state = [], action ) => {
    if(action.type === 'LOAD_SONGS'){
        return action.songs
    }
    return state
}

const reducer = combineReducers({
    singers: singersReducer,
    genres: genresReducer,
    songs: songsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

export const fetchSingers = () =>{
    return async(dispatch) =>{
        const singers = (await axios.get('/api/singers')).data;
        dispatch({type: 'LOAD_SINGERS', singers});
    }
}

export const createSinger = (singer, history) =>{
    return async(dispatch) =>{
        console.log(singer)
        singer = (await axios.post('/api/singers', singer)).data;
        dispatch({type: 'CREATE_SINGER', singer});
        history.push('/singers')
    }
}

export const fetchGenres = () =>{
    return async(dispatch) =>{
        const genres = (await axios.get('/api/genres')).data;
        dispatch({type: 'LOAD_GENRES', genres});
    }
}

export const fetchSongs = () =>{
    return async(dispatch) =>{
        const songs = (await axios.get('/api/songs')).data;
        dispatch({type: 'LOAD_SONGS', songs});
    }
}


export default store;