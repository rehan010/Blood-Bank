import React , {Component} from 'react'
import {TextField, RaisedButton,Paper } from 'material-ui'; 
import * as firebase from 'firebase';
import Navigation from './navigation';
import {red500} from 'material-ui/styles/colors';
const style = {
    height: 300,
    width: 500,
    margin: 100,
    textAlign: 'center',
    display: 'inline-block',
  };
  
    export default class Login extends Component{
        
    constructor(){
        super();
        
        this.state = {
            userLogin : '',
            userPass :''
        }
        
    }

    firstvalue(event){
        this.setState({
            userLogin : event.target.value,
           
        })
    }

    secondval(pass){
        this.setState({
            userPass : pass.target.value
        })
    }
    
    checkLogin(event){
        console.log(this.state.userLogin , this.state.userPass);
      
        const email = this.state.userLogin;
        const pass = this.state.userPass;
        const auth = firebase.auth();
      
        // Sign In
        const promise = auth.signInWithEmailAndPassword(email,pass)
        promise.then(e =>  {
          console.log(e);
          if(e.uid != null){
            alert('successfull')
           this.props.history.push('/welcome')
          }
        })
        promise.catch(e => {
          alert(e.message)
        });
        firebase.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser){
         
              console.log(firebaseUser)
         
            }
          
          })
         
           
       }
        render(){
        return(
            <div className="App">
                <Navigation />
                <Paper style={style} zDepth={5} >
          <br/><br/><br/><br/>
         <TextField hintText='Email' id="userLogIn" onChange={this.firstvalue.bind(this)} /> <br />

         <TextField
      hintText="Password" id='userP' type='password'
            onChange={this.secondval.bind(this) }
    /> <br />
    <RaisedButton label="Log In" buttonStyle={{backgroundColor:red500}} labelStyle={{ fontSize: 14,color:"white"}}  onClick={this.checkLogin.bind(this)} />
            
            </Paper>
            </div>
        );
    }
}