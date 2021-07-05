import { Component } from 'react';
import { getConfig, getFiles } from '../../apis';
import ModifyInput from '../ModifyInput';

class Section extends Component {
  state = {
    datasource: []
  }
  componentDidMount () {
    getConfig();
    getFiles().then(res => {
      console.log(res.data.data)
      const { datasource } = res.data.data;
      this.setState({ datasource });
    });
  }
  onHandleChange = (res) => {
    console.log(res)
  }
  render () {
    const { datasource } = this.state;

    return <div style={{ paddingTop: '20px', textAlign: 'left' }}>
      {
        datasource.map(item => {
          return <ModifyInput
          key={item.name}  
          {...item}
          onChange={this.onHandleChange}
        />
        })
      }
    </div>
  }
}

export default Section;
