import React from "react";
import { connect } from "react-redux";

const Singers = ({singers, songs}) =>{

    return (
        <ul>
            {
                singers.map(singer => {
                     const singerSongs = songs.filter(song => song.singerId === singer.id)
                    return (
                        <li key={singer.id}>
                            {singer.name}
                            <ul>
                                {
                                    singerSongs.map(sSong => {
                                        return (
                                            <li key={sSong.id}>
                                                {sSong.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                    )
                })
            }
        </ul>
    )

}

const mapStateToProps = ({singers, songs}) =>{
    return {
        singers,
        songs
    }
}

export default connect(mapStateToProps)(Singers);