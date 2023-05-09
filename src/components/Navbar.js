import React, { Component } from 'react'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import css from '../index.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <img className="logo" src={require('./logo.png')} {...bindTrigger(popupState)} alt="logo" height="30" width="38"></img>
                <Menu {...bindMenu(popupState)}>
                  {this.props.user.username?
                    <div>
                    <MenuItem onClick={popupState.close} component={RouterLink} to="/">Home</MenuItem>
                    <MenuItem onClick={popupState.close} component={RouterLink} to="/to-do">To Do List</MenuItem>
                    <MenuItem onClick={popupState.close} component={RouterLink} to="/products">Shop</MenuItem>
                
                    </div>:
                    <div>
                    <MenuItem onClick={popupState.close} component={RouterLink} to="/">Home</MenuItem>
                    <MenuItem onClick={popupState.close} component={RouterLink} to="/signup">Sign Up</MenuItem>
                    <MenuItem onClick={popupState.close} component={RouterLink} to="/login">Login</MenuItem>
                    </div>
                  }
                </Menu>
                {this.props.user.username? 
                <>
                <IconButton to="/cart" component={RouterLink} aria-label="shopping cart">
                  <ShoppingCartIcon />
                </IconButton>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                    <Avatar sx={{ bgcolor: deepOrange[500] }} {...bindTrigger(popupState)} className="avatar">{this.props.user.username[0]}</Avatar>
                    <Menu {...bindMenu(popupState)}>
                      <div>
                        {/* <MenuItem onClick={popupState.close}>Profile</MenuItem>
                        <MenuItem onClick={popupState.close}>My account</MenuItem> */}
                        <MenuItem onClick={popupState.close} component={RouterLink} to="/cart">Cart</MenuItem>
                        <MenuItem onClick={this.props.logMeOut} to="/login">Logout</MenuItem>
                      </div>
                    </Menu>
                    </React.Fragment>
                    )}
                    </PopupState>
                    </>
                : <div/>
                }
              </React.Fragment>
            )}
          </PopupState>
          </div>
      </div>
    )
  }
}
