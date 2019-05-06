import React from 'react';
import { TodoApp } from '../containers/TodoApp';
import './App.css';
import { AppFooter } from './AppFooter';

const App: React.FC = () => (
  <div className="App">
    <TodoApp />
    <AppFooter />
  </div>
);

export default App;
