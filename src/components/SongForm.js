import React, { Component } from "react";
import { connect } from "react-redux";
import { createSong } from '../store';

class SongForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      singerId: "",
      genreId: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async save(ev) {
    ev.preventDefault();
    try {
      await this.props.createSong({
        name: this.state.name,
        singerId: this.state.singerId,
        genreId: this.state.genreId,
      });
    } catch (error) {
        console.log(error)
    //   this.setState({ error: error.response.data.err.errors[0].message });
    }
  }

  render() {
    const { name, singerId, genreId, error } = this.state;
    const { singers, genres } = this.props;
    const { onChange, save } = this;
    return (
      <div>
        <form onSubmit={save}>
          <div>
            <label htmlFor="name">Name:</label>
            <input name="name" value={name} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="singerId">Singer:</label>
            <select value={singerId} name="singerId" onChange={onChange}>
              <option value="">-- Select a Singer --</option>
              {singers.map((singer) => {
                return (
                  <option value={singer.id} key={singer.id}>
                    {singer.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="genreId">Genre:</label>
            <select name="genreId" value={genreId} onChange={onChange}>
              <option value="">-- Select a Genre --</option>
              {genres.map((genre) => {
                return (
                  <option value={genre.id} key={genre.id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button>Create</button>
            <button onClick={() => this.props.history.push("/songs")}>
              Cancel
            </button>
          </div>
        </form>
        <pre>
            {
                error ? JSON.stringify(error) : null
            }
        </pre>
      </div>
    );
  }
}

const mapState = ({ singers, genres }) => {
  return {
    singers,
    genres,
  };
};

const mapDispatch = (dispatch, {history}) =>{
    return {
        createSong: (song) => dispatch(createSong(song, history))
    }
}

export default connect(mapState, mapDispatch)(SongForm);
