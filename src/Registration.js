import React, { Component } from 'react';
import {RaisedButton,FlatButton,AppBar,Paper,TextField,SelectField,MenuItem } from 'material-ui';
import * as firebase from 'firebase'; 
import {Link} from 'react-router-dom';
import styles from './Rejistrationstyle';
import {red500} from 'material-ui/styles/colors';
const style = {
    height: 500,
    width: 500,
    margin: 100,
    textAlign: 'center',
    display: 'inline-block',
  };

  const items = [
    <MenuItem key={1} value={"Male"} primaryText="Male" />,
    <MenuItem key={2} value={"Female"} primaryText="Female" />,
];

const bloodGroupList = [
    <MenuItem key={1} value={"A+"} primaryText="A+" />,
    <MenuItem key={2} value={"O+"} primaryText="O+" />,
    <MenuItem key={3} value={"B+"} primaryText="B+" />,
    <MenuItem key={4} value={"AB+"} primaryText="AB+" />,
    <MenuItem key={5} value={"A-"} primaryText="A-" />,
    <MenuItem key={6} value={"O-"} primaryText="O-" />,
    <MenuItem key={7} value={"B-"} primaryText="B-" />,
    <MenuItem key={8} value={"AB-"} primaryText="AB-" />,
];

class Registration extends Component{
    ref = firebase.database().ref("Blood");
    constructor(props){
        super(props);
        this.state = {
          fname :'',
          lname : '',
          bloodgroup :'',
          gender:''
         
        }
       
    } 

    handleChangefname (ev){
         this.setState({fname: ev.target.value});
         console.log("First Name",this.state.fname)
        }

    handleChangelname (ev){
            this.setState({lname: ev.target.value});
            console.log("Last Name",this.state.lname)
            }
    componentWillMount(){
        console.log('componentwillmount');
      }
      
    checkfields(){
        if( this.state.fname==="" ||this.state.lname==="" || this.state.bloodgroup==="" ||this.state.gender===""){
              alert("Please fill all fields")
        }else
          {
            this.ref.push({fname: this.state.fname,lname:this.state.lname,bloodgroup:this.state.bloodgroup,gender:this.state.gender});
            this.setState({fname: "",lname:"",bloodgroup:"",gender:""})
            alert("Done")
          }
      }

    Logout(){
        firebase.auth().signOut();
        this.props.history.push("/")
    }

    handleChange(event, index, value) {
        
        this.setState({ bloodgroup: value });
        console.log("Blood Group", value)
        
    }

    handleChangeGender(event, index, value) {
        this.setState({ gender: value });
        console.log("Gender", value)
    }
    
    
    
    render(){
        return(
            <div className="App">
                <AppBar  style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}
            
            
            
                iconElementRight={  <div><FlatButton labelStyle={{ fontSize: 14,color:"white"}}  label="Home" containerElement={<Link to='/welcome' />}/>
                
      
            <FlatButton labelStyle={{ fontSize: 14,color:"white"}}  label="logout" onClick={this.Logout.bind(this)} containerElement={<Link to='/' />}/>  
               
               </div>
                }
            />
            <div style={styles.registerDonorContainer}>
            <Paper style={style} zDepth={1}>
            <form>      
                <TextField
                                hintText="FirstName"
                                ref='fname'
                                name='fname'
                                value={this.state.fname}
                                required={true}
                                onChange={this.handleChangefname.bind(this)}
                                floatingLabelText="Type Here"

                            /><br />
                <TextField
                                hintText="LastName"
                                ref='lname'
                                name='name'
                                value={this.state.lname}
                                required={true}
                                onChange={this.handleChangelname.bind(this)}
                                floatingLabelText="Type Here"
                            /><br />  
                <SelectField
                    
                    floatingLabelText="Blood Group"
                    value={this.state.bloodgroup}
                    onChange={this.handleChange.bind(this)}
                            >
                    {bloodGroupList}
                </SelectField> 
                <SelectField
                    
                    floatingLabelText="Gender"
                    value={this.state.gender}
                    

                    onChange={this.handleChangeGender.bind(this)}   
                                >       
                {items}
                </SelectField> <br/>                    
                <RaisedButton label="Register" labelStyle={{ fontSize: 14,color:"white"}} buttonStyle={{backgroundColor:red500}}  id="btnRegister" onClick={this.checkfields.bind(this)} />

        </form>
        <div style={styles.clear} />
        </Paper>

    
                
        </div>
                
       
        </div>
        );
        
    }
}
export default Registration;