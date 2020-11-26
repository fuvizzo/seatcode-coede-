import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import UserList from './components/user/list';

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Display Active Users Account Details</h1>
        <UserList />
      </Container>
    </div>
  );
}

export default App;
