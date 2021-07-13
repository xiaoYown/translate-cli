import {  Component } from 'react';
import Header from './components/Header';
import Section from './components/Section';

class Console extends Component {
  render () {
    return <div className="page-Overview g-page">
      <Header />
      <Section />
    </div>
  }
}

export default Console;
