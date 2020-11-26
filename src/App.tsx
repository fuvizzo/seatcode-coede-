import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import UserList from './components/user/list';

function App() {
  return (
    <div className="App">
      <Container>
        <UserList />
      </Container>
    </div>
  );
}

export default App;
