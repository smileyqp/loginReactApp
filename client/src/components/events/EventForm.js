import React, { Component } from 'react';
import classnames from 'classnames';
import {createEvent} from '../../actions/eventActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class EventForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            errors:{},
            isloading:false
        }
    }
    

    static propTypes = {
        createEvent:PropTypes.func.isRequired
    }

    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createEvent(this.state);
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>New Event</h1>

                <div className='form-group'>
                    <label className='control-label'>Title</label>
                    <input 
                        value={this.state.title} 
                        type='text' 
                        name='title' 
                        className={classnames('form-control',{'is-invalid':this.state.errors.title})} 
                        onChange={this.onChange}
                    />       
                </div>
                <div className='form-group'>
                    <button disabled={this.state.isLoading} className='btn btn-primary lg'>Create</button>
                </div>
            </form>
        );
    }

}

export default connect(null,{createEvent})(EventForm);

