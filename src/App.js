import React, { Component } from 'react';
import './App.css';
import RandomJoke from './components/RandomJoke'
import Search from './components/Search'

class App extends Component {

  constructor() {
    super()
    this.state = {
      randomJoke: '',
      jokes: []
    }
    this.randomClick = this.randomClick.bind(this)
    this.searchClick = this.searchClick.bind(this)
  }

  componentDidMount() {
    this.randomAPI()
  }
  
  randomAPI() {
    let api = 'https://icanhazdadjoke.com/'
    fetch(api, 
      { headers: {
        'Accept': 'application/json',
        'User-Agent': ' My Library (https://github.com/tara-fenton/dad-jokes)'
      }       
    }
    ).then(response => response.json())
    .then(json => {
      this.setState({ randomJoke: json.joke})
    }).catch(e => console.log(e))
  }

  searchAPI() {
    let api = 'https://icanhazdadjoke.com/search?term=hipster'
    fetch(api, 
      { headers: {
        'Accept': 'application/json',
        'User-Agent': ' My Library (https://github.com/tara-fenton/dad-jokes)'
      }       
    }
    ).then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({ jokes: json.results })
    }).catch(e => console.log(e))
  }

  randomClick(){
    this.randomAPI()
  }

  searchClick(){
    console.log('search clicked ')
    this.searchAPI()
  }

  render() {
    return (
      <div className="App">
        <RandomJoke 
            randomJoke={this.state.randomJoke}
            handleClick={this.randomClick} />
        <Search 
            jokes={this.state.jokes}
            handleClick={this.searchClick} />
      </div>
    );
  }
}

export default App;