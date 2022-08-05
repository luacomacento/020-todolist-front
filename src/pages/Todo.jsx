import { Button, Container, FormControl, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Todo() {
  const [currentTask, setCurrentTask] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
      setData(data);
    };
    fetchData();
  }, []);

  const handleChange = ({target}) => {
    setCurrentTask(target.value);
  }

  const handleSubmitTask = async () => {
    const { data: { task } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, 
      { task: currentTask },
      { headers: {
        'Authorization': localStorage.getItem('token') || ''
      }}
    );
    if (!task) return;
  
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
    setData(data);
  }

  return (
    <Container maxWidth="md" sx={{marginTop: '32px'}}>
      <Typography sx={{textAlign: 'center'}} variant="h4" component="h1">
        To-do List
      </Typography>
      <Typography sx={{margin: '48px 0', textAlign: 'center'}} variant='body1'>Olá, Luá! Aqui estão as suas tarefas:</Typography>
      <FormControl fullWidth sx={{columnGap: '12px', flexDirection: 'row'}}>
        <TextField
          onChange={handleChange}
          value={currentTask}
          sx={{flex: 1}}
          id="outlined-basic"
          label="Nova tarefa"
          variant="outlined" />
        <Button
          variant="contained"
          onClick={handleSubmitTask}
        >
          Adicionar
        </Button>
      </FormControl>

      <List>
          {data.map((task) => {
            return (
              <ListItem key={task.id}>
                <ListItemButton component="a">
                  <ListItemText primary={task.task} />
                </ListItemButton>
              </ListItem>
            )
          })}
      </List>
    </Container>
  )
}

export default Todo