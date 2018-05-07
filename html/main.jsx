//登录页；
class Signin extends React.Component {

    render() {
        return (
        <div>
            <form>
                <h2> 欢迎登录 </h2>

                <label for="inputEmail"> 邮件地址 </label>
                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="邮件地址"/>
                
                <label for="inputPassword"> 密码 </label>
                <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="密码"/>
                
                <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button"> 登录</button>
            </form>
            <div>
                <Link className="btn btn-lg btn-primary btn-block" to="/signup">{'注册'}</Link>
            </div>          
        </div>
        )
    }

// 定义onChange处理方法；
    handleEmailChange(e) {
      this.setState({email:e.target.value})
    }
    handlePasswordChange(e) {
      this.setState({password:e.target.value})
    }
// 定义onClick处理方法；    
    signIn() {
        axios.post('/signin', {
          email: this.state.email,
          password: this.state.password
        })
        .then(function (response) {
            alert(response.data);
            if(response.data == '成功登录！'){
              window.location.assign('/home')
            }
        })
        .catch(function (error) {
          alert(error.data);
        });            
    }    
// 在组件的构造方法中，绑定上面的方法，并初始化state变量；
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.state = {
          email:'',
          password:''
        };
    }

}

// 注册页；
class Signup extends React.Component{
    render() {
        return (
        <div>
        <form>
                <h2> 欢迎注册 </h2>

                <label for="inputName" >名字</label>
                <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="名字" />

                <label for="inputEmail"> 邮件地址 </label>
                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="邮件地址" />
                
                <label for="inputPassword"> 密码 </label>
                <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="密码" />
                
                <button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="button"> 注册</button>
        </form>
        <div>
            <Link className="btn btn-lg btn-primary btn-block" to="/">{'返回'}</Link>
        </div> 
        </div>
        )
    }
}

//登录成功后的主页；
class Home extends React.Component {
    render() {
        return (
        <div>欢迎，这里是首页。</div>
        )
    }
}  


//初始化React路由；
var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

//设置注册页面(index.html)的React路由(id为app的元素在index.html中)；  
ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={Signin} path="/"></Route>
        <Route component={Signup} path="/signup"></Route>
    </Router>,
document.getElementById('app'));
