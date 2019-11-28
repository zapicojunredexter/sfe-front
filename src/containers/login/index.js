import React from 'react';
import { connect } from 'react-redux';
import AuthService from '../../services/auth.service';
import TextField from '../../components/textfield';
import Button from '../../components/buttons';
import "./style.scss"

class Container extends React.PureComponent<> {

    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <>
                <div className="login__container">
                   <input
                        placeholder="username" value={this.state.username} onChange={(event) => {
                            this.setState({username: event.target.value});
                            }   
                        }
                        className = "login__input"
                    /> <br/>
                    <input
                        placeholder="password" type="password" value={this.state.password} onChange={(event) => {
                            this.setState({password: event.target.value});
                            }
                        }
                    /> <br/>

                    <button onClick={()=>{this.props.login(this.state.username, this.state.password)}}>
                        Login
                    </button>

                        
                  { 
                  /*
                   login/index.js
                   <button onClick={this.props.login}>login</button>
                   <p>{this.state.username}</p>
                    <p>{this.state.password}</p>
                    <button onClick={()=>{this.setState({username: 'hello'})}}>change username</button>
                    
                    <div className="components">
                    <TextField value={this.state.username} samplestyle = {{
                            color: 'blue'
                        }} akoangFontColor={"green"}/>
                    </div>
                
                    <Button
                        akoangfunction={()=>{this.props.login(this.state.username, this.state.password)}}
                    />
                 */
                  } 
                </div>

               
            </>
        );
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(AuthService.login(username,password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
