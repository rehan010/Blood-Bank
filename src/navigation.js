import React from 'react';
import AppBar from 'material-ui/AppBar';
import {red500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';




 class Navigation extends React.Component {
     render(){
         return(
            <AppBar
            
            style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}
            
            iconElementRight={  <div><FlatButton  labelStyle={{ fontSize: 14,color:"white"}} label="Sign Up" containerElement={<Link to='/' />}/>        
            <FlatButton  labelStyle={{ fontSize: 14,color:"white"}}  label='Log In' containerElement={<Link to="/Login" />}/>
            
            </div>
            }
            
          />
        
         );
     }
 }


export default Navigation;