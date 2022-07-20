import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import store, { fetchSingers, fetchGenres, fetchSongs } from './store';
import Nav from './components/Nav';
import Home from './components/Home';
import Singers from './components/Singers';

class _App extends Component{

    componentDidMount(){
        this.props.loadData();
    }

    render() {
        return(
            <div>
                <Route component={ Nav }/>
                <Route exact path='/' component={ Home }/>
                <Route path='/singers' component={ Singers }/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        loadData: () =>{
            dispatch(fetchSingers());
            dispatch(fetchGenres());
            dispatch(fetchSongs());
        }
    }
}

const App = connect(null, mapDispatchToProps)(_App);

const root = createRoot(document.querySelector('#root'));

root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
    
)