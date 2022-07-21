import React, {Component} from "react";
import { connect } from 'react-redux';
import { createGenre, updateGenre } from '../store';

class GenreForm extends Component{

    constructor(){
        super();
        this.state = {
            name: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount(){
        if(this.props.genre.id){
            this.setState({
                name: this.props.genre.name
            })
        }
    }

    componentDidUpdate(prevProps){
        if(!prevProps.genre.id && this.props.genre.id){
            this.setState({
                name: this.props.genre.name
            })
        }
    }

    onChange(ev){

        this.setState({
            [ev.target.name]: ev.target.value
        })

    }

    async save(ev){
        ev.preventDefault();
        try {
            if(!this.props.genre.id){
                await this.props.createGenre({name: this.state.name});
            }else{
               await this.props.updateGenre({
                   id: this.props.match.params.id,
                   name: this.state.name
               }) 
            }
            
        } catch (error) {
            this.setState({error: error.response.data.err.errors[0].message,});
        }
        
    }

    render(){

        const {name, error} = this.state;
        const { onChange, save } = this;
        const { genre } = this.props;

        return (
            <div>
                <form onSubmit={ save }>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input name="name" value={name}  onChange={onChange}/>
                    </div>
                    <div>
                        <button disabled={!name}>{genre.id ? 'Edit' : 'Create'}</button>
                        <button onClick={() => this.props.history.push('/genres')}>Cancel</button>
                    </div>
                </form>
                <pre>
                    {
                        error ? JSON.stringify(error) : null
                    }
                </pre>
            </div>
        )
    }

}

const mapState = (state, {match}) =>{

    const id = match.params.id*1;
    const genre = state.genres.find(genre => genre.id === id) || {name: ''};
    return {
        genre
    }
}

const mapDispatch = (dispatch, {history}) =>{
    return {
        createGenre: (genre) => dispatch(createGenre(genre, history)),
        updateGenre: (genre) => dispatch(updateGenre(genre, history))
    }
}

export default connect(mapState, mapDispatch)(GenreForm);