import React, { useState } from "react";
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardActions } from '@material-ui/core';


export default function App() {

  //Need state for list of tasks
  const [tasks, setTasks] = useState([]);
  //Need state for the current value of each text input
  const [description, setDescription] = useState("");
  const[title,setTitle] = useState("");
  const[dueDate,setDueDate] = useState("");
  //Need a function to add a task to the task list
  const handleAdd = () => {
      setTasks([
    ...tasks, {title, description, dueDate}
    ])
    setDescription("");
    setTitle("");
    setDueDate("");
  };

  //This is a component that will be reused to represent each individual task.
  //What props does each task need?
  
  const TodoItem = ({title, description, dueDate}) => {
   
    
    

    //Need state to represent whether the task is checked off or not
    const [checkOff, setCheckOff] = useState(null);
    //Need a function to toggle whether the task is checked off or not
    const handleCheckOff = () => {
      setCheckOff(!checkOff)
    };

    //Need a function to delete the task from the todo list
    //Note that because we've placed this component inside of our main app,
    //it has direct access to the state of our main app
    const handleDelete = () => {
      setTasks(tasks.filter((item) => {
      if ((item.title === title) && (item.description === description) && (item.dueDate === dueDate)) {
        return false;
      }
      else {
        return true;
      }
      }))
    };

    return (
        <Card variant= "outlined" style={{textAlign: 'center', marginBottom: '5px', backgroundColor: "gray", fontFamily: "verdana", width: "300px"}}>
          {/* The title, description, and due date should appear here. 
          Remember that what you want to display changes based on whether 
          the task is checked off or not */}
          <CardContent>
            {(!checkOff) && <h2>{title}</h2>}
            {(!checkOff) && <p>{description}</p>}
            {(!checkOff) && <p>Due: {dueDate}</p>}
            {(checkOff) && <h2 style= {{'text-decoration': 'line-through'}} >{title} </h2>}
          </CardContent>
          <CardActions style={{justifyContent: "center"}}>
            <div>
            <Button style={{marginBottom: "10px"}} variant= "contained" color= "default" onClick={handleCheckOff}>Check off</Button>
            <br/>
            <Button style={{marginBottom: "10px"}} variant= "contained" color= "default" onClick={handleDelete}>Delete</Button>
            </div>
            <br/>
          </CardActions>
      </Card>
    );
  };

  return (
    <div
      style={{display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{fontFamily: "verdana"}}>TO DO LIST</h1>
      {/* All of the text fields and their labels should go here */}
      <div>
      <TextField id="outlined-secondary" label="Title" variant= "filled" color= "secondary" style={{marginBottom: "10px"}} value= {title} type= "text" onChange= {(e) => setTitle(e.target.value)} />
      <br/>
      <TextField id="outlined-secondary" label="Description" variant= "filled" color= "secondary" style={{marginBottom: "10px"}} value= {description} type= "text" onChange= {(e) => setDescription(e.target.value)} />
      <br/>
      <TextField id="outlined-secondary" label="Due Date" variant= "filled" color= "secondary" style={{marginBottom: "10px"}} value= {dueDate} type= "text" onChange= {(e) => setDueDate(e.target.value)} />
    </div>
      <Button variant= "contained" color= "default" onClick={handleAdd}>Add Item</Button>
      <br/>
      {/* All of the tasks should render here. How can we transform the 
      list of tasks into a list of components? */}
    {tasks.map((item) => <TodoItem title={item.title} description= {item.description} dueDate= {item.dueDate}/>)}
    </div>
  );
}
