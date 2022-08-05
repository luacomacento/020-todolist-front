import { Button, FormControl, Paper, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const BACK_URL = process.env.REACT_APP_BACKEND_URL;

  const handleChange = ({target}) => {
    if (target.name === 'username') {
      setUsername(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  }

  const handleLogin = async () => {
    const { data: {token} } = await axios.post(`${BACK_URL}/login`, {
      username,
      password,
    });
    console.log(token);
    if (!token) return;
    localStorage.setItem('token', token);
    history.push('/todo');
  }

  return (
    <Container maxWidth="sm" sx={{marginTop: '128px'}}>
      <Paper elevation={4} sx={{display: 'flex', flexDirection:'column', padding: '32px 16px', rowGap: '64px'}}>
      <Typography sx={{textAlign: 'center'}} variant="h4" component="h1">
        Login
      </Typography>
      <FormControl fullWidth sx={{rowGap: '24px'}}>
        <TextField
          onChange={handleChange}
          label="Nome de usuário"
          variant="outlined"
          name="username"
          value={username}
        />
        <TextField
          onChange={handleChange}
          type="password"
          label="Senha"
          variant="outlined"
          name="password"
          value={password}
        />
        <Button onClick={handleLogin} variant="contained" sx={{padding: '12px 8px'}}>Entrar</Button>
      </FormControl>
      </Paper>
    </Container>
  )
}

export default Login