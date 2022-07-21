import React, { Component } from "react";
import { connect } from "react-redux";
import { createSinger, updateSinger } from "../store";

class SingerForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      countryId: "",
      genreId: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.singer.name,
      countryId: this.props.singer.countryId,
      genreId: this.props.singer.genreId,
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.singer.id && this.props.singer.id) {
      this.setState({
        name: this.props.singer.name,
        countryId: this.props.singer.countryId,
        genreId: this.props.singer.genreId,
      });
    }
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async save(ev) {
    ev.preventDefault();
    let singer = {
      name: this.state.name,
      countryId: this.state.countryId * 1,
      genreId: this.state.genreId * 1,
    };

    try {
      if (!this.props.singer.id) {
        await this.props.createSinger(singer);
      } else {
        singer = { ...singer, id: this.props.match.params.id };
        await this.props.updateSinger(singer);
      }
    } catch (error) {
        this.setState({error: error.response.data.err.errors[0].message,});
    }
  }

  render() {
    const { name, countryId, genreId, error } = this.state;
    const { onChange, save } = this;
    const { singer } = this.props;

    return (
      <div>
        <form onSubmit={save}>
            <h2>{this.props.singer.id ? 'Edit Singer' : 'Create Singer'}</h2>
          <div className="SingerName">
            <label htmlFor="name">Name:</label>
            <input name="name" value={name} onChange={onChange} />
          </div>
          <div className="SingerCountry">
            <label htmlFor="countryId">Nationality:</label>
            <select value={countryId} name="countryId" onChange={onChange}>
              <option value="">-- Select a Country --</option>
              {this.props.countries.map((country) => {
                return (
                  <option value={country.id} key={country.id}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="SingerGenre">
            <label htmlFor="genreId">Genre:</label>
            <select value={genreId} name="genreId" onChange={onChange}>
              <option value="">-- Select a Genre --</option>
              {this.props.genres.map((genre) => {
                return (
                  <option value={genre.id} key={genre.id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="SingerButtons">
            <button disabled={!name || !countryId || !genreId}>
              {singer.id ? "Edit" : "Create"}
            </button>
            <br/>
            <button onClick={() => this.props.history.push("/singers")}>
              Cancel
            </button>
          </div>
        </form>
        <pre>
            {
                error ?  JSON.stringify(error) : null
            }
        </pre>
      </div>
    );
  }
}

const mapState = (state, { match }) => {
  const singer = state.singers.find(
    (singer) => singer.id === match.params.id * 1
  ) || { name: "", countryId: "", genreId: "" };
  return {
    genres: state.genres,
    singer,
    countries: state.countries,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createSinger: (singer) => dispatch(createSinger(singer, history)),
    updateSinger: (singer) => dispatch(updateSinger(singer, history)),
  };
};

export default connect(mapState, mapDispatch)(SingerForm);
