import React from "react";

const Songs = (props) =>{
    
    const {history} = props

    return (
        <div>
            <button onClick={() => history.push('/songs/create')}>Add a Song</button>
        </div>
    )
}

export default Songs;