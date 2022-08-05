import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Todo from './pages/Todo';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/todo' component={Todo} />
    </Switch>
  );
}

export default App;
