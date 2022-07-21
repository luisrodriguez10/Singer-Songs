import React, {Component} from "react";
import { connect } from 'react-redux';
import { createGenre } from '../store';

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

    onChange(ev){

        this.setState({
            [ev.target.name]: ev.target.value
        })

    }

    async save(ev){
        ev.preventDefault();
        try {
            await this.props.createGenre({name: this.state.name});
        } catch (error) {
            this.setState({error: error.response.data.err.errors[0].message,});
        }
        
    }

    render(){

        const {name, error} = this.state;
        const { onChange, save } = this;

        return (
            <div>
                <form onSubmit={ save }>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input name="name" value={name}  onChange={onChange}/>
                    </div>
                    <div>
                        <button>Create</button>
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

const mapDispatch = (dispatch, {history}) =>{
    return {
        createGenre: (genre) => dispatch(createGenre(genre, history))
    }
}

export default connect(null, mapDispatch)(GenreForm);