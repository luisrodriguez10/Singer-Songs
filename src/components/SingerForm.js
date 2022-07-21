import React, {Component} from "react";
import { connect } from "react-redux";
import { createSinger } from '../store';

class SingerForm extends Component{

    constructor(){
        super();
        this.state = {
            name: '',
            nationality: '',
            genreId: ''
        }
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
    }

    onChange(ev){
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    async save(ev){
        ev.preventDefault();
        const singer = {
            name: this.state.name,
            nationality: this.state.nationality,
            genreId: this.state.genreId
        }
        try {
            this.props.createSinger(singer);
        } catch (error) {
            console.log(error)
        }
        
    }

   render(){

    const {name, nationality, genreId} = this.state;
    const { onChange, save } = this;
    const { singer } = this.props;
    console.log(singer)

       return (
           <div>
               <form onSubmit={ save }>
                    <label htmlFor="name">Name:</label>
                    <input name="name" value={name} onChange={onChange}/>
                    <label htmlFor="nationality">Nationality:</label>
                    <input name="nationality" value={nationality} onChange={onChange}/>
                    <select value={genreId} name='genreId' onChange={onChange}>
                        <option value=''>-- Select a Genre --</option>
                        {
                            this.props.genres.map(genre => {
                                return (
                                    <option value={genre.id} key={genre.id}>
                                        {genre.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button disabled={!name || !nationality || !genreId}>{ singer.id ? 'Edit' : 'Create'}</button>
               </form>
           </div>
       )
   }
}

const mapState = (state, {match}) =>{
    const singer = state.singers.find(singer => singer.id === match.params.id * 1) || {}
    return {
        genres: state.genres,
        singer
    }
}

const mapDispatch = (dispatch, { history }) =>{
    return {
        createSinger: (singer) => dispatch(createSinger(singer, history)) 
    }
}

export default connect(mapState, mapDispatch)(SingerForm);