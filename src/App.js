import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About'
import axios from 'axios';

class App extends React.Component {

  state = {
    users: [],
    user: {},
    repos:[],
    loading: false,
    alert: null
  }

  // async componentDidMount(){
  //   this.setState({loading: true, users: []});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({loading: false, users: res.data});
  // }

  searchUsers = async (query) => {
    this.setState({loading: true, users: []});
    const res = await axios.get(`https://api.github.com/search/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&q=${query}`);
    this.setState({loading: false, users: res.data.items});
  }

  getUser = async (login) => {
    this.setState({loading: true, user: {}});
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, user: res.data});
  }

  getUserRepos = async (login) => {
    this.setState({loading: true, user: {}});
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, repos: res.data});
  }

  setAlert = (msg, type) => {
    this.setState({alert: { msg, type}});
    setTimeout(() => this.setState({alert: null}), 5000)
  }

  clearUsers = () => this.setState({users: [], loading: false});

  render() {
    const { users, loading, alert, user, repos} = this.state;
    return (
      <Router>
        <div className="App">
        <Navbar />
        <Alert alert={alert} />
        <Switch>
          <Route 
            exact 
            path='/'
            render= { props => (
              <Fragment>
                <Search showClear={users.length > 1 ? true : false } setAlert={this.setAlert}  searchUsers={this.searchUsers} clearUsers={this.clearUsers} />
                <Users loading={loading} users={users} />
              </Fragment>
            )

            }></Route>
            <Route 
            exact
            path='/about'
            component={About}
            ></Route>
            <Route
            exact
            path='/user/:login'
            render={ props => (
              <User { ...props } 
                getUser={this.getUser} 
                getUserRepos={this.getUserRepos} 
                repos={repos}
                loading={loading} 
                user={user} 

              />
            )

            }></Route>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
