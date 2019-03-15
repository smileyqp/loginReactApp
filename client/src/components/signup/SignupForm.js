import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';

class SignupForm extends Component {
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

    //第三种方法：取出历史记录；方便返回上一层；这个是取出上下文
    // static propTypes = {
    //     router:PropTypes.object
    // }
    static propTypes = {
        userSignupRequest:PropTypes.func.isRequired,
        addFlashMessage:PropTypes.func.isRequired,//addFlashMessage是从reducer中传过来的；这里是进行验证
        isUserExists:PropTypes.func.isRequired
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
                this.props.addFlashMessage({//addFlashMessage是从reducer中传递过来的；然后从其父级组件传过来
                    type:'success',
                    text:'You signed up successfully.Welcome!'
                });
                //console.log(this.props);这是第一种方法从父组件获取history;下面的是从props中去除历史返回到上一个页面即登录页面；这个props的history属性是福组件signupPage传过来的
                this.props.history.push('/');//第一而终方法返回上次的history目录这里都是这样写的；这里的逻辑是注册完之后返回上一层页面即登录界面
                //this.context.router.history.push('/');这是第三种方法获取context;context里面有router以及router下面有history
                //console.log(this.context);这是第三种方法获取context;context里面有router以及router下面有history
            },
            ({response}) => {this.setState({errors:response.data,isLoading:false})}//此处返回的是错误数据errors；当提交表单时候,如果有errors返回那么form的state数据中多了一个errors数据，此时可以用state中的errors数据给到页面对用户进行提示
            //(data) => {console.dir(data)}
        );
    }


    //onBlur是失焦时候触发;为了验证username的唯一性;在视角的时候就进行客户端唯一性验证而不是提交之后才验证是否username和email唯一
    checkUserExists = (e) => {
        console.log('onBlur');
        const field = e.target.name;
        const val = e.target.value;
        if(val !== ''){
            this.props.isUserExists(val).then(res =>{
                let errors = this.state.errors;
                if(res.data.user){
                    errors[field] = 'There is user with such '+ field;
                }else{
                    errors[field] = '';
                }
                this.setState({errors});
            })
        }
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
                <input value={this.state.username} type='text' name='username' onBlur = {this.checkUserExists} className={classnames('form-control',{'is-invalid':errors.username})} onChange={this.onChange}/>
                {errors.username && <span className='form-text form-muted'>{errors.username}</span>}           
            </div>
            <div className='form-group'>
                <label className='control-label'>Email</label>
                <input value={this.state.email} type='email' name='email'onBlur = {this.checkUserExists} className={classnames('form-control',{'is-invalid':errors.email})} onChange={this.onChange}/>
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

export default withRouter(SignupForm);

