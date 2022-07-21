import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import store, { fetchSingers, fetchGenres, fetchSongs, fetchCountries } from "./store";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Singers from "./components/Singers";
import SingerForm from "./components/SingerForm";
import Genres from "./components/Genres";
import GenreForm from "./components/GenreForm";
import Songs from "./components/Songs";
import SongForm from "./components/SongForm";

class _App extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <div>
        <Route component={Nav} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/singers" component={Singers} />
          <Route path="/singers/create" component={SingerForm} />
          <Route path="/singers/:id" component={SingerForm} />
          <Route exact path="/genres" component={Genres} />
          <Route path='/genres/create' component={GenreForm}/>
          <Route exact path="/songs" component={Songs} />
          <Route path='/songs/create' component={SongForm}/>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(fetchSingers());
      dispatch(fetchGenres());
      dispatch(fetchSongs());
      dispatch(fetchCountries());
      dispatch(fetchCountries());
    },
  };
};

const App = connect(null, mapDispatchToProps)(_App);

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
