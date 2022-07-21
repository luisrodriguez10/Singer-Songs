import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Singers extends Component {
  constructor() {
    super();
    this.state = {
      option: "",
    };
  }

  render() {
    const { singers } = this.props;
    const { songs } = this.props;
    const { genres } = this.props;
    const { option } = this.state;
    const { history } = this.props;

    return (
      <div id="Singers">
        <h2>Singers Page</h2>
        <button onClick={() => history.push("/singers/create")}>
          Add a Singer
        </button>
        <select onChange={(ev) => this.setState({ option: ev.target.value })}>
          <option value="null">-- Select an option --</option>
          <option value="1">Show All Singers</option>
          <option value="2">Show Singers by Genre</option>
        </select>
        {option === "1" ? (
          <table>
            <tbody>
              <tr>
                <th>Singer</th>
                <th>Nationality</th>
                <th>Songs</th>
                <th>Genre</th>
              </tr>
              {singers.map((singer) => {
                const singerSongs = songs.filter(
                  (song) => song.singerId === singer.id
                );
                const singerGenre = genres.find(
                  (genre) => genre.id === singer.genreId
                );
                return (
                  <tr key={singer.id}>
                    <td>
                      <Link to={`/singers/${singer.id}`}>{singer.name}</Link>
                    </td>
                    <td>{singer.nationality}</td>
                    <td>
                      {singerSongs.length > 0 ? (
                        <ul>
                          {singerSongs.map((singerSong) => {
                            return (
                              <li key={singerSong.id}>{singerSong.name}</li>
                            );
                          })}
                        </ul>
                      ) : (
                        "Singer has no songs"
                      )}
                    </td>
                    <td>{singerGenre.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : option === "2" ? (
          <table>
            <tbody>
              <tr>
                <th>Genre</th>
                <th>Singers</th>
              </tr>
              {genres.map((genre) => {
                const genreSingers = singers.filter(
                  (singer) => singer.genreId === genre.id
                );
                return (
                  <tr key={genre.id}>
                    <td>{genre.name}</td>
                    <td>
                      {genreSingers.length > 0 ? (
                        <ul>
                          {genreSingers.map((genreSinger) => {
                            return (
                              <li key={genreSinger.id}>
                                <Link to={`/singes/${genreSinger.id}`}>
                                  {genreSinger.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        "No singers for this genre"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ singers, songs, genres }) => {
  return {
    singers,
    songs,
    genres,
  };
};

export default connect(mapStateToProps)(Singers);
