import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class SignupPage extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            passwordConfirmation:'',
            errors:{},
            isLoading:false//避免重复提交
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
        this.setState({errors:{},isLoading:true});//这个是没有错误传过来时候为空对象
        //console.log(this.state);
        // axios.POST('/api/users',{users:this.state});
        this.props.userSignupRequest(this.state).then(//userSignupRequest就是axios请求;也是一个方法;axios有then方法是请求成功之后才会触发的函数
            () => { //后台返回的200多的状态吗一般会进入到这里面(成功返回这里面)；400多的一般会进入到下面
                //console.log(this.props);下面的是从props中去除历史返回到上一个页面即登录页面；这个props的history属性是福组件signupPage传过来的
                this.props.history.push('/');
            },
            ({response}) => {this.setState({errors:response.data,isLoading:false})}//此处返回的是错误数据errors；当提交表单时候,如果有errors返回那么form的state数据中多了一个errors数据，此时可以用state中的errors数据给到页面对用户进行提示
            //(data) => {console.dir(data)}
        );
    }
//{errors.username && <span className='form-text form-muted'>{errors.username}</span>}解释
//前面的errors.username相当于一个判断；当errors.username存在时候相当于true才会将后面的内容显示出来；其他的也一样   
  render() {
    const {errors} = this.state;//提取错误信息
    return (
      <form onSubmit={this.onSubmit}>
            <h1>Join our community</h1>
            <div className='form-group'>
                <label className='control-label'>Username</label>
                <input value={this.state.username} type='text' name='username'className={classnames('form-control',{'is-invalid':errors.username})} onChange={this.onChange}/>
                {errors.username && <span className='form-text form-muted'>{errors.username}</span>}           
            </div>
            <div className='form-group'>
                <label className='control-label'>Email</label>
                <input value={this.state.email} type='email' name='email'className={classnames('form-control',{'is-invalid':errors.email})} onChange={this.onChange}/>
                {errors.email && <span className='form-text form-muted'>{errors.email}</span>} 
            </div>
            <div className='form-group'>
                <label className='control-label'>password</label>
                <input value={this.state.password} type='password' name='password'className={classnames('form-control',{'is-invalid':errors.password})} onChange={this.onChange}/>
                {errors.password && <span className='form-text form-muted'>{errors.password}</span>} 
            </div>
            <div className='form-group'>
                <label className='control-label'>password Confirmation</label>
                <input value={this.state.passwordConfirmation} type='password' name='passwordConfirmation'className={classnames('form-control',{'is-invalid':errors.passwordConfirmation})} onChange={this.onChange}/>
                {errors.passwordConfirmation && <span className='form-text form-muted'>{errors.passwordConfirmation}</span>} 
            </div>




            <div className='form-group'>
                    <button disabled={this.state.isLoading} className='btn btn-primary lg'>Sign Up</button>
            </div>
      </form>
    );
  }
}

export default SignupPage;

