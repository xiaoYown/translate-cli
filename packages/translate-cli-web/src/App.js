import './App.css';
import { Component } from 'react';
import Section from './components/Section';
import Header from './components/Header';
import { initBaseData } from './stores'

class App extends Component {
  componentDidMount () {
    initBaseData();
  }
  render () {
    return (
      <div className="App">
        <Header />
        <Section />
      </div>
    );
  }
}

export default App;
