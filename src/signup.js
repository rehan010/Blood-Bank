import React, { Component } from 'react';
import {TextField , RaisedButton,Paper} from 'material-ui'; 
import './config/firebase.js';
import Navigation from './navigation';
import * as firebase from 'firebase';
import {red500} from 'material-ui/styles/colors';
const style = {
  height: 300,
  width: 500,
  margin: 100,
  textAlign: 'center',
  display: 'inline-block',
                };


class SignUp extends Component {
     
  constructor(props){
    super(props);
    this.state = {
      name :'',
      username : '',
      userpassword :''
                  }
   
                    }

  componentWillMount(){
     console.log('componentwillmount');
                          }



  checkfields(){
  
    console.log( this.state.name , this.state.username , this.state.userpassword);
    const email = this.state.username ;
    const pass = this.state.userpassword ;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email , pass)
    promise.then(  (aaa) => {
        console.log(">>>>>>>>>>>", aaa);
        if(aaa.uid != null){
           alert('successfull');
           
                              } 
                              }  
                  );
         promise.catch(e =>alert(e.message));
                  }
      

  render() {
    return (
      
      <div className="App">
        <Navigation />
        <div>
        <Paper style={style} zDepth={5} >
        <br/><br/><br/><br/>
        <TextField hintText='Enter Name' onChange={(event) => this.setState({
           name : event.target.value
           })} /> <br />
         <TextField hintText='Email' id='usersignname' onChange={(event) => this.setState({
           username : event.target.value
           })}/> <br />

         <TextField
        hintText='Password'
        id='usersetpass'type='password' onChange ={(event) => this.setState({userpassword : event.target.value})}
        /> < br />
        <RaisedButton label="Sign Up" buttonStyle={{backgroundColor:red500}}   labelStyle={{ fontSize: 14,color:"white"}} id="btnSignUp" onClick={this.checkfields.bind(this)} />
        <div >
          
        </div>
        
        </Paper>
      </div>
      
      </div>
    );
  }
}

export default SignUp;

