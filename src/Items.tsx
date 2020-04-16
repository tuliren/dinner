import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Item } from './types';

interface IProps {
  items: Item[];
  addItem: (itemName: string, itemPrice: number) => void;
  removeItem: (index: number) => void;
}

interface IState {
  itemNameToAdd: string;
  itemPriceToAdd: string;
}

class Items extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      itemNameToAdd: '',
      itemPriceToAdd: '',
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }

  onAddItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.state.itemPriceToAdd) {
      const itemName = this.state.itemNameToAdd.trim();
      const itemPrice = parseFloat(this.state.itemPriceToAdd);
      this.props.addItem(itemName, itemPrice);
      this.setState({
        itemNameToAdd: '',
        itemPriceToAdd: '',
      });
    }
  };

  onChangeItemName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemNameToAdd: event.target.value });
  };

  onChangeItemPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemPriceToAdd: event.target.value });
  };

  onRemoveItem = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    this.props.removeItem(index);
  };

  render() {
    return (
      <Box>
        <List dense={false} component="nav">
          {this.props.items.map(({ name, price }, index: number) => (
            <ListItem button key={'person-' + index}>
              <ListItemAvatar>
                <Avatar>
                  <FastfoodIcon/>
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={'$' + price.toFixed(2) + (name ? ' ' + name : '')}/>

              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.onRemoveItem(event, index)}
                >
                  <DeleteIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem key="person-add">
            <ListItemAvatar>
              <Avatar>
                <FastfoodIcon/>
              </Avatar>
            </ListItemAvatar>

            <TextField
              label="Item Price"
              type="number"
              value={this.state.itemPriceToAdd}
              required={true}
              onChange={this.onChangeItemPrice}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            &nbsp;&nbsp;&nbsp;
            <TextField
              label="Item Name"
              value={this.state.itemNameToAdd}
              required={false}
              onChange={this.onChangeItemName}
            />

            <ListItemSecondaryAction>
              <IconButton edge="start" onClick={this.onAddItem}>
                <AddIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
    );
  }
}

export default Items;
