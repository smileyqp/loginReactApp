import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignupPage extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            passwordConfirmation:''
        }
    }

    static propTypes = {
        userSignupRequest:PropTypes.func.isRequired
    }
    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit = (e) =>{
        e.preventDefault();
        // console.log(this.state);
        // axios.POST('/api/users',{users:this.state});
        this.props.userSignupRequest(this.state);//userSignupRequest就是axios请求
    }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
            <h1>Join our community</h1>
            <div className='form-group'>
                <label className='control-label'>Username</label>
                <input value={this.state.username} type='text' name='username'className='form-control' onChange={this.onChange}/>
            </div>
            <div className='form-group'>
                <label className='control-label'>Email</label>
                <input value={this.state.email} type='email' name='email'className='form-control' onChange={this.onChange}/>
            </div>
            <div className='form-group'>
                <label className='control-label'>password</label>
                <input value={this.state.password} type='password' name='password'className='form-control' onChange={this.onChange}/>
                
            </div>
            <div className='form-group'>
                <label className='control-label'>password Confirmation</label>
                <input value={this.state.passwordConfirmation} type='password' name='passwordConfirmation'className='form-control' onChange={this.onChange}/>
            </div>




            <div className='form-group'>
                    <button className='btn btn-primary lg'>Sign Up</button>
            </div>
      </form>
    );
  }
}

export default SignupPage;

