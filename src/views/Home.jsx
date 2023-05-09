import React, { Component } from 'react'
import Pokemon from '../components/Pokemon'

export default class Home extends Component {
  constructor(){
    super();
    this.state={
        num: 1,
        pokeinfo: [],
        style: {color: 'grey'},
        firstNotDone: true
    }
  }

  incrementCount() {
    this.setState((state)=>{
      return {num: state.num + 1}
    })
  }
  
  handleClick = () => {
    console.log(`this is the num of the pokemon before click ${this.state.num}`)
    //this.setState({num: this.state.num + 1});
    this.incrementCount();
    console.log(`this is the num pokemon we should return ${this.state.num}`)
    this.getPokeInfo();
    console.log(this.state.pokeinfo)
  }

  mapData = (data) => {
    //const dataString = Object.entries(data).map(([k,v]) => `${k}: ${v}`);
    //console.log(dataString);
    let dataList = [];
    dataList.push(`${data.name}`);
    dataList.push(`${data.sprites.other['official-artwork'].front_default}`);
    return dataList;
  }

  getPokeInfo = async () => {
    let url;
    // I learned that setState is an asynchronous method and a state will not update until a render has been made 
    // ... so we cannot update here and then get the new information... this is a workaround 
    // that so the correct pokemon goes with the correct index
    if (this.state.num == 1 && this.state.firstNotDone == true) {
      url = `https://pokeapi.co/api/v2/pokemon/${this.state.num}/`
      this.setState({firstNotDone: false});
    } else {
      url = `https://pokeapi.co/api/v2/pokemon/${this.state.num + 1}/`
    
    }
    const res = await fetch(url);
    const data = await res.json();
    this.setState({pokeinfo: this.mapData(data)});
    this.setState({style: {color: 'grey'}})
  }

  componentDidMount = () => {
    this.getPokeInfo();
  }

  render() {
    return (
      <div className="home-page">
        <h2>Home Page</h2>
        <h3 align="center">
            Pokemon #{this.state.num}
        </h3>
        <button className="plus-button"align="center" onClick={this.handleClick}>Next Pokemon</button>
        <Pokemon pokeinfo={this.state.pokeinfo} style = {this.state.style}/>
      </div>
    )
  }
}
