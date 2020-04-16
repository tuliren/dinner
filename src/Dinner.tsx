import React from 'react';
import { uuid } from './utility';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Item, Person } from './types';
import People from './People';

const ID_DELIMITER = '\t';

interface IProps {
}

interface IState {
  items: Array<Item>;
  people: Array<Person>;
  links: {
    [itemId: string]: string[],
  };

  tax: number;
  tip: number;
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
        { id: 'drink', name: 'Drink', price: 12.00 },
        { id: 'fish', name: 'Fish', price: 12.00 },
      ],
      people: [
        { id: 'jared', name: 'Jared' },
        { id: 'liren', name: 'Liren' },
        { id: 'roshan', name: 'Roshan' },
        { id: 'sherif', name: 'Sherif' },
      ],
      links: {},
      tax: 0,
      tip: 0,
      personToAdd: '',
      itemNameToAdd: '',
      itemPriceToAdd: '',
    };

    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleItemPriceChange = this.handleItemPriceChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);

    this.addPerson = this.addPerson.bind(this);
    this.removePerson = this.removePerson.bind(this);

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.getLinkStatus = this.getLinkStatus.bind(this);
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

  handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tax: parseFloat(event.target.value) || 0 });
  };

  handleTipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tip: parseFloat(event.target.value) || 0 });
  };

  handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [personId, itemId] = event.target.value.split(ID_DELIMITER);
    const links = this.state.links;
    if (links[itemId] === undefined) {
      links[itemId] = [personId];
    } else {
      const personIndex = links[itemId].indexOf(personId);
      if (personIndex === -1) {
        links[itemId].push(personId);
      } else {
        links[itemId].splice(personIndex, 1);
      }
    }
    this.setState({ links });
  };

  addPerson = (personName: string) => {
    const people = this.state.people;
    people.push({ id: uuid(), name: personName });
    this.setState({ people, personToAdd: '' });
  };

  removePerson = (index: number) => {
    const links = this.state.links;
    const people = this.state.people;
    const personId = people[index].id;
    for (const itemId of Object.keys(links)) {
      const personIndex = links[itemId].indexOf(personId);
      if (personIndex !== -1) {
        links[itemId].splice(personIndex, 1);
      }
    }
    people.splice(index, 1);
    this.setState({ links, people });
  };

  addItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.state.itemPriceToAdd) {
      const items = this.state.items;
      items.push({
        id: uuid(),
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
    const links = this.state.links;
    const items = this.state.items;
    delete links[items[index].id];
    items.splice(index, 1);
    this.setState({ links, items });
  };

  getLinkStatus = (personId: string, itemId: string): boolean => {
    return this.state.links[itemId] !== undefined && this.state.links[itemId].includes(personId);
  };

  getAllFoodPrice = (): number => {
    return this.state.items.map(i => i.price).reduce((a, b) => a + b, 0);
  };

  getPersonFoodPrice = (personId: string): number => {
    const personItems: Array<{
      itemPrice: number;
      peopleCount: number;
    }> = [];

    for (const [itemId, personIds] of Object.entries(this.state.links)) {
      if (personIds.includes(personId)) {
        const itemPrice = this.state.items.filter(item => item.id === itemId)[0].price;
        const peopleCount = personIds.length;
        personItems.push({ itemPrice, peopleCount });
      }
    }

    return personItems
      .map(({ itemPrice, peopleCount }) => itemPrice / peopleCount)
      .reduce((a, b) => a + b, 0);
  };

  getPersonTax = (personId: string): number => {
    const totalPrice = this.getAllFoodPrice();
    if (totalPrice === 0) {
      return 0;
    }
    const totalTax = this.state.tax;
    const personPrice = this.getPersonFoodPrice(personId);
    return personPrice * totalTax / totalPrice;
  };

  getPersonTip = (personId: string): number => {
    const totalPrice = this.getAllFoodPrice();
    if (totalPrice === 0) {
      return 0;
    }
    const totalTip = this.state.tip;
    const personPrice = this.getPersonFoodPrice(personId);
    return personPrice * totalTip / totalPrice;
  };

  getTotalPrice = (): number => {
    return this.getAllFoodPrice() + this.state.tax + this.state.tip;
  };

  getPersonTotal = (personId: string): number => {
    return this.getPersonFoodPrice(personId)
      + this.getPersonTax(personId)
      + this.getPersonTip(personId);
  };

  renderItems() {
    return (
      <Box>
        <List dense={false} component="nav">
          {this.state.items.map(({ name, price }, index: number) => (
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
              type="number"
              value={this.state.itemPriceToAdd}
              required={true}
              onChange={this.handleItemPriceChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
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

  renderBill() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell key="item">Item</StyledTableCell>
              <StyledTableCell key="price">Price</StyledTableCell>

              {this.state.people.map(({ name: person }, index: number) =>
                <StyledTableCell key={'person-' + index}>{person}</StyledTableCell>)
              }
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {this.state.items.map(({ id: itemId, name: itemName, price: itemPrice }, itemIndex: number) =>
              <StyledTableRow hover key={'item-' + itemIndex}>
                <StyledTableCell>{itemName}</StyledTableCell>
                <StyledTableCell>${itemPrice.toFixed(2)}</StyledTableCell>
                {this.state.people.map(({ id: personId, name: person }, personIndex: number) => (
                  <StyledTableCell key={'item-person-' + personIndex}>
                    <Checkbox
                      checked={this.getLinkStatus(personId, itemId)}
                      value={personId + ID_DELIMITER + itemId}
                      color="primary"
                      onChange={this.handleLinkChange}
                    />
                  </StyledTableCell>
                ))}
              </StyledTableRow>,
            )}

            <StyledTableRow hover key={'dinner-total'}>
              <StyledTableCell>All Food</StyledTableCell>
              <StyledTableCell>${this.getAllFoodPrice().toFixed(2)}</StyledTableCell>
              {this.state.people.map(({ id: personId }, personIndex: number) => (
                <StyledTableCell key={'person-' + personIndex}>
                  ${this.getPersonFoodPrice(personId).toFixed(2)}
                </StyledTableCell>
              ))}
            </StyledTableRow>

            <StyledTableRow hover key={'dinner-tax'}>
              <StyledTableCell>Tax</StyledTableCell>
              <StyledTableCell>
                <TextField
                  type="number"
                  value={this.state.tax || ''}
                  required={false}
                  onChange={this.handleTaxChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </StyledTableCell>
              {this.state.people.map(({ id: personId }, personIndex: number) => (
                <StyledTableCell key={'tax-person-' + personIndex}>
                  ${this.getPersonTax(personId).toFixed(2)}
                </StyledTableCell>
              ))}
            </StyledTableRow>

            <StyledTableRow hover key={'dinner-tip'}>
              <StyledTableCell>Tip</StyledTableCell>
              <StyledTableCell>
                <TextField
                  type="number"
                  value={this.state.tip || ''}
                  required={false}
                  onChange={this.handleTipChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </StyledTableCell>
              {this.state.people.map(({ id: personId }, personIndex: number) => (
                <StyledTableCell key={'tip-person-' + personIndex}>
                  ${this.getPersonTip(personId).toFixed(2)}
                </StyledTableCell>
              ))}
            </StyledTableRow>

            <StyledTableRow hover key={'dinner-person-tip'}>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>${this.getTotalPrice().toFixed(2)}</StyledTableCell>
              {this.state.people.map(({ id: personId }, personIndex: number) => (
                <StyledTableCell key={'tip-person-' + personIndex}>
                  ${this.getPersonTotal(personId).toFixed(2)}
                </StyledTableCell>
              ))}
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
        <h2>People</h2>
        <People
          people={this.state.people}
          addPerson={this.addPerson}
          removePerson={this.removePerson}
        />
        <br/>
        <Divider/>
        <br/>
        <h2>Food</h2>
        {this.renderItems()}
        <br/>
        <Divider/>
        <br/>
        <h2>Bill</h2>
        {this.renderBill()}
        <br/>
        <br/>
      </>
    );
  }
}

export default Dinner;
