import React from "react";
import { connect } from 'react-redux';

const Genres = ({ genres, songs, singers, history}) => {

    return (
        <div>
            <h2>Genres Page</h2>
            <button onClick={() => history.push('/genres/create')}>Add a Genre</button>
            <ul>
                {
                    genres.map(genre => {
                        const singersGenre = singers.filter(singer => singer.genreId === genre.id);
                        return (
                            <li key={genre.id}>
                                {genre.name}
                                {
                                    singersGenre.length > 0 ? <ul>
                                    {
                                        singersGenre.map(singer => {
                                            const singerSongs = songs.filter(song => song.singerId === singer.id)
                                            return (
                                                <li key={singer.id}>
                                                    {singer.name}
                                                    {
                                                        singerSongs.length > 0 ? <ul>
                                                        {
                                                            singerSongs.map(singerSong => {
                                                                return (
                                                                    <li key={singerSong.id}>
                                                                        {singerSong.name}
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul> : <p>No songs for this singer</p>
                                                    }
                                                    
                                                </li>
                                            )
                                        })
                                    }
                                </ul> : <p>No singers for this genre</p>
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )

}

const mapState = ({genres, songs, singers}) =>{
    return {
        genres,
        songs,
        singers
    }
}

export default connect(mapState)(Genres);