import React, { Component } from 'react';


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

    onChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
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
                <input value={this.state.passwordConfirmation} type='text' name='passwordConfirmation'className='form-control' onChange={this.onChange}/>
            </div>




                
                






            <div className='form-group'>
                    <button className='btn btn-primary lg'>Sign Up</button>
            </div>
      </form>
    );
  }
}

export default SignupPage;

