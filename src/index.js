import { createRoot } from "react-dom/client";
import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import store, { fetchSingers, fetchGenres, fetchSongs } from "./store";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Singers from "./components/Singers";
import SingerForm from "./components/SingerForm";

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
