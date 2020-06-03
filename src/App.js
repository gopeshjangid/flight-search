import React, { Component } from 'react';
import { createStore} from 'redux';
import { Provider} from 'react-redux';
import './App.css';
import Header from './components/headerView/Header';
import Search from './components/searchView/Search';
import FlightResult from './components/resultView/FlightsResult';
import reducer from './components/redux/reducer.js';
const store = createStore(reducer);

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      data:""
    }
  }

  formChildSearch(params) {
  this.setState({
    data : params
  })
}
  render() {
    return (<Provider store={store} >
      <div className="app">
        <Header/>
        <section className="app__content">
        <Search callback={this.formChildSearch.bind(this)}/>
        <FlightResult data={this.state.data}/>
        </section>
      </div> </Provider>
    );
  }
}

export default App;
