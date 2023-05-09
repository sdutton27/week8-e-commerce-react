import React, { Component } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { sliderClasses } from '@mui/material';

export default class Pokemon extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
      pokeinfo: []
    }
  }

  // getPoke = async () => {
  //   let newList = []
  //   console.log(`poek info is ${this.props.pokeinfo[0]}`)
  //   console.log(typeof(this.props.pokeinfo))
  //   for (let i=0; i < this.props.pokeinfo.length; i ++) {
  //     newList.push(this.props.pokeinfo[i].split(": "))
  //     //console.log(`this is splitted: ${splitted[0]}`);
  //   }

  //   console.log(`like color is ${this.state.likeColor}`)
  //   this.setState({likeColor: 'grey'})

  //   console.log(`getPoke gives us: ${newList[0][1]}`)
  //   return newList
  // }

  componentDidMount = () => {
    //this.getPoke();
  }

  changeLikeColor = () => {
    console.log('one more time')
    console.log(this.state.style.color)
    if (this.state.style.color === 'grey') {
      this.setState({style: {color: 'red'}})
    } else {
      this.setState({style: {color: 'grey'}})
    }
    console.log(this.state.style)
  }

  toTitleCase = (name) => {
    try {
      return name[0].toUpperCase() + name.slice(1)
    } catch {
      return name
    }
  }

  render() {
    console.log('rerender')
    return (
      <div>
        <Card sx={{ width: 260, height:380}}>
      <CardMedia
        sx={{ height: 250 }}
        image={this.props.pokeinfo[1]}
        title="pokemon image"
        component='img'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {this.toTitleCase(this.props.pokeinfo[0])}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton id = "icon-button" onClick={this.changeLikeColor} style={this.state.style} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
     </div>
    )
  }
}
