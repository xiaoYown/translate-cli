import './App.less';
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Layout, Menu } from 'antd';

import PageOverview from './pages/Overview';
import PageConsole from './pages/Console';
import PageSetting from './pages/Setting';
import { initBaseData } from './stores';

const { Sider, Content } = Layout;

const menuList = [
  {
    key: '/',
    path: '/',
    label: '概览',
  },
  {
    key: '/console',
    path: '/console',
    label: '控制台'
  },
  {
    key: '/setting',
    path: '/setting',
    label: '设置'
  }
]

class App extends Component {
  state = {
    selectKey: window.location.pathname
  }
  componentDidMount() {
    initBaseData();
  }
  onSelectKey = ({ key }) => {
    this.setState({ selectKey: key })
  }
  render() {
    const { selectKey } = this.state;

    return (
      <div className="App">
        <Router>
          <Sider
            className="g-layout-sider"
            theme="light"
            trigger={null}
            collapsible
            collapsed={false}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectKey]}
              onSelect={this.onSelectKey}
            >
              {
                menuList.map(item => {
                  return <Menu.Item key={item.key}>
                    <Link to={item.path}>
                      { item.label }
                    </Link>
                  </Menu.Item>
                })
              }
            </Menu>
          </Sider>
          <Content style={{ paddingLeft: '200px' }}>
            <Switch>
              <Route path="/setting">
                <PageSetting />
              </Route>
              <Route path="/console">
                <PageConsole />
              </Route>
              <Route path="/">
                <PageOverview />
              </Route>
            </Switch>
          </Content>
        </Router>
      </div>
    );
  }
}

export default App;
