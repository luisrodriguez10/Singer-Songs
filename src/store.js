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
    if(action.type === 'UPDATE_SINGER'){
        return state.map(singer => singer.id === action.singer.id ? action.singer : singer)
    }
    return state
}

const genresReducer = ( state = [], action ) => {
    if(action.type === 'LOAD_GENRES'){
        return action.genres
    }
    if(action.type === 'CREATE_GENRE'){
        return [...state, action.genre]
    }
    
    return state
}

const songsReducer = ( state = [], action ) => {
    if(action.type === 'LOAD_SONGS'){
        return action.songs
    }
    if(action.type === 'CREATE_SONG'){
        return [...state, action.song]
    }
    return state
}

const countriesReducer = ( state = [], action ) => {
    if(action.type === 'LOAD_COUNTRIES'){
        return action.countries
    }
    return state
}

const reducer = combineReducers({
    singers: singersReducer,
    genres: genresReducer,
    songs: songsReducer,
    countries: countriesReducer
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
        singer = (await axios.post('/api/singers', singer)).data;
        dispatch({type: 'CREATE_SINGER', singer});
        history.push('/singers')
    }
}

export const updateSinger = (singer, history) =>{
    return async(dispatch) =>{
        singer = (await axios.put(`/api/singers/${singer.id}`, singer)).data;
        dispatch({type: 'UPDATE_SINGER', singer});
        history.push('/singers')
    }
}

export const fetchGenres = () =>{
    return async(dispatch) =>{
        const genres = (await axios.get('/api/genres')).data;
        dispatch({type: 'LOAD_GENRES', genres});
    }
}

export const createGenre = (genre, history) =>{
    return async(dispatch) =>{
        genre = (await axios.post('/api/genres', genre)).data;
        dispatch({type: 'CREATE_GENRE', genre});
        history.push('/genres')
    }
}

export const fetchSongs = () =>{
    return async(dispatch) =>{
        const songs = (await axios.get('/api/songs')).data;
        dispatch({type: 'LOAD_SONGS', songs});
    }
}

export const createSong = (song, history) =>{
    return async(dispatch) =>{
        song = (await axios.post('/api/songs', song)).data
        dispatch({type: 'CREATE_SONG', song})
        history.push('/songs')
    }
}

export const fetchCountries = () =>{
    return async(dispatch) =>{
        const countries = (await axios.get('/api/countries')).data;
        dispatch({type: 'LOAD_COUNTRIES', countries});
    }
}


export default store;