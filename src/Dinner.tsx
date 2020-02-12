import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { ListItemSecondaryAction } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AddIcon from '@material-ui/icons/Add';

type Item = {
  price: number;
  name?: string;
}

interface IProps {
}

interface IState {
  items: Array<Item>;
  people: Array<string>;

  personToAdd: string;
  itemNameToAdd: string;
  itemPriceToAdd: string;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.grey.A400,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
)(TableRow);

class Dinner extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      items: [
        { name: 'Drink', price: 14.99 },
        { name: 'Fish', price: 12.00 },
      ],
      people: ['Jared', 'Liren', 'Harry'],
      personToAdd: '',
      itemNameToAdd: '',
      itemPriceToAdd: '',
    };

    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleItemPriceChange = this.handleItemPriceChange.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.removePerson = this.removePerson.bind(this);
  }

  handlePersonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ personToAdd: event.target.value });
  };

  handleItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemNameToAdd: event.target.value });
  };

  handleItemPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemPriceToAdd: event.target.value });
  };

  addPerson = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.state.personToAdd) {
      const people = this.state.people;
      people.push(this.state.personToAdd.trim());
      this.setState({
        people,
        personToAdd: '',
      });
    }
  };

  removePerson = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    const people = this.state.people;
    people.splice(index, 1);
    this.setState({ people });
  };

  addItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.state.itemPriceToAdd) {
      const items = this.state.items;
      items.push({
        name: this.state.itemNameToAdd.trim(),
        price: parseFloat(this.state.itemPriceToAdd),
      });
      this.setState({
        items,
        itemNameToAdd: '',
        itemPriceToAdd: '',
      });
    }
  };

  removeItem = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    const items = this.state.items;
    items.splice(index, 1);
    this.setState({ items });
  };

  getTotalPrice = (): number => {
    return this.state.items.map(i => i.price).reduce((a, b) => a + b, 0);
  };

  renderPeople() {
    return (
      <Box>
        <List dense={false}>
          {this.state.people.map((person: string, index: number) => (
            <ListItem key={'person-' + index}>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon/>
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={person}/>

              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.removePerson(event, index)}
                >
                  <DeleteIcon/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem key="person-add">
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon/>
              </Avatar>
            </ListItemAvatar>

            <TextField
              label="Person Name"
              value={this.state.personToAdd}
              required={true}
              onChange={this.handlePersonChange}
            />

            <ListItemSecondaryAction>
              <IconButton edge="start" onClick={this.addPerson}>
                <PersonAddIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
    );
  }

  renderItems() {
    return (
      <Box>
        <List dense={false}>
          {this.state.items.map(({ name, price }, index: number) => (
            <ListItem key={'person-' + index}>
              <ListItemAvatar>
                <Avatar>
                  <FastfoodIcon/>
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={'$' + price.toFixed(2) + (name ? ' ' + name : '')}/>

              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.removeItem(event, index)}
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
              value={this.state.itemPriceToAdd}
              required={true}
              onChange={this.handleItemPriceChange}
            />
            &nbsp;&nbsp;&nbsp;
            <TextField
              label="Item Name"
              value={this.state.itemNameToAdd}
              required={false}
              onChange={this.handleItemNameChange}
            />

            <ListItemSecondaryAction>
              <IconButton edge="start" onClick={this.addItem}>
                <AddIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
    );
  }

  renderTable() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell key="item">Item</StyledTableCell>
              <StyledTableCell key="price">Price</StyledTableCell>

              {this.state.people.map((person: string, index: number) =>
                <StyledTableCell key={'person-' + index}>{person}</StyledTableCell>)
              }
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {this.state.items.map(({ name, price }, index: number) =>
              <StyledTableRow key={'item-' + index}>
                <StyledTableCell>{name}</StyledTableCell>
                <StyledTableCell>${price.toFixed(2)}</StyledTableCell>
              </StyledTableRow>,
            )}

            <StyledTableRow key={'item-total'}>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>${this.getTotalPrice().toFixed(2)}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  public render() {
    return (
      <>
        <Divider/>
        <h2>Step 1. Add People</h2>
        {this.renderPeople()}
        <br/>
        <Divider/>
        <br/>
        <h2>Step 2. Add Item and Price</h2>
        {this.renderItems()}
        <br/>
        <Divider/>
        <br/>
        <h2>Step 3. Pick Order</h2>
        {this.renderTable()}
        <br/>
        <br/>
      </>
    );
  }
}

export default Dinner;
