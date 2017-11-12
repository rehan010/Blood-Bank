import React, { Component } from 'react';
import {FlatButton,AppBar,Paper,TableHeader,Table,TableRow,TableHeaderColumn,SelectField,MenuItem,TableRowColumn,TableBody} from 'material-ui';
import * as firebase from 'firebase'; 
import {Link} from 'react-router-dom';
import {red500} from 'material-ui/styles/colors';

const style = {
    //height: 600,
  //  width: 800,
    margin: 30,
    
    textAlign: 'center',
    display: 'inline-block',
  };
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

class Welcome extends Component{
        reff = firebase.database().ref("Blood");
    

        constructor(props) {
        super();
            this.state = {
            open: false,
            notes: [],
            bloodGroup:""
                        }
                            }
                            handleRequiredTypeChange = (event, index, value) => {              
                                this.setState({ bloodGroup: value });
                                
                var match = [];
                if (value === "A+") {            
                    match.push("A+")
                    match.push("A-")
                    match.push("O+")
                    match.push("O-")
                    console.log("A+",match)
                }
                else if (value === "O+") {
                    match.push("O+")
                    match.push("O-")
                    console.log("O+",match)
                }
                else if (value === "B+") {
                    match.push("B+")
                    match.push("B-")
                    match.push("O+")
                    match.push("O-")
                    console.log("B+",match)
                    //     match = "B+,B-,O+,O-"
                }
                else if (value === "AB+") {
                    match.push("A+")
                    match.push("O+")
                    match.push("B+")
                    match.push("AB+")
                    match.push("A-")
                    match.push("O-")
                    match.push("B-")
                    match.push("AB-")
                    console.log("AB+",match)
                    //     match = "Everyone"
                }
                else if (value === "A-") {
                    match.push("A-")
                    match.push("O-")
                    console.log("A-",match)
                    //     match = "A-,O-"
                }
                else if (value === "O-") {
                    match.push("O-")
                    console.log("O-",match)
                    //     match = "O-"
                }
                else if (value === "B-") {
                    match.push("B-")
                    match.push("O-")
                    console.log("B-",match)
                    //     match = "B-,O-"
                }
                else if (value === "AB-") {
                    match.push("AB-")
                    match.push("A-")
                    match.push("B-")
                    match.push("O-")
                    console.log("AB-",match)
                    //     match = "AB-,A-,B-,O-"
                }            const previousNotes = [];
                                    for (var i = 0; i < match.length; i++) {
                                        this.reff.orderByChild('bloodgroup')
                                            .equalTo(match[i])
                                            .once('value')
                                            .then(function (snapshot) {
                                              //  var value = snapshot.val();
                                                snapshot.forEach(ChildSnapshot => {
                                                 //   var data = ChildSnapshot.val();
                                                    previousNotes.push({
                                                        id: ChildSnapshot.key,
                                                        FullName: ChildSnapshot.val().fname,
                                                        
                                                          bloodGroup: ChildSnapshot.val().bloodgroup,
                                                          LastName: ChildSnapshot.val().lname,
                                                          Gender: ChildSnapshot.val().gender,
                                                        
                                                    })
                                                })
                            
                                            }).then(
                                            () => {
                                                console.log("dataaaa",previousNotes)
                                                this.setState({  notes: previousNotes })
                                            }
                            
                                            )
                                    }
                                
                            
                            
                                  }
                                  componentWillMount(){
                                    const previousNotes = [];
                                    
                                            // DataSnapshot
                                            this.reff.on('child_added', snap => {
                                                previousNotes.push({
                                                    id: snap.key,
                                                    FullName: snap.val().fname,
                                                  
                                                    bloodGroup: snap.val().bloodgroup,
                                                    LastName: snap.val().lname,
                                                    Gender: snap.val().gender,
                                                    
                                                    
                                                })
                                    
                                                this.setState({
                                                    notes: previousNotes
                                                })
                                            })
                                  }
                               
                                  handleToggle = () => this.setState({open: !this.state.open});                                              
    Logout(){
        firebase.auth().signOut();
        this.props.history.push("/")
    }
    register(){
        this.props.history.push("/Registration")
    }

    handleChange = (event, index, value) => this.setState({value});
    render(){
        return(
            <div className="App">
                <AppBar  style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}

                    iconElementRight={  <div><FlatButton  labelStyle={{ fontSize: 14,color:"white"}}  label="Registration" containerElement={<Link to='/Registration' />}/>
            
  
                        <FlatButton   labelStyle={{ fontSize: 14,color:"white"}} label="logout" onClick={this.Logout.bind(this)} containerElement={<Link to='/' />}/>  
           
            </div>
                                            }
                        />
                <Paper style={style} zDepth={5}>
                <SelectField
                floatingLabelText="Blood Group"
                style={{ width: 360, textAlign: "left" }}
                floatingLabelStyle={style.floatingLabelStyle}
                floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                underlineFocusStyle={style.underlineStyle}
                value={this.state.bloodGroup}
                onChange={this.handleRequiredTypeChange.bind(this)}
            >
                {bloodGroupList}
            </SelectField>
                    <Table>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>First Name</TableHeaderColumn>
                                        <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Last Name</TableHeaderColumn>
                                        <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Gender</TableHeaderColumn>
                                        <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Blood Group</TableHeaderColumn>
                                    
                                    </TableRow>
                            </TableHeader>
                            <TableBody >
                                {this.state.notes.map((data, index) => {
                                    //alert(data.FullName)
                                    return (
                                        <TableRow key={index}>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.FullName}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.LastName}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.Gender}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.bloodGroup}</TableRowColumn>
                                            
                                           
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                    </Table>
             
                </Paper>
                
            </div>
        );
        
    }
}
export default Welcome;