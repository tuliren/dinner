import React from 'react';
import { uuid } from './utility';
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
import Checkbox from '@material-ui/core/Checkbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AddIcon from '@material-ui/icons/Add';

const ID_DELIMITER = '\t';

type Item = {
  id: string;
  price: number;
  name?: string;
}

type Person = {
  id: string;
  name: string;
}

interface IProps {
}

interface IState {
  items: Array<Item>;
  people: Array<Person>;
  links: {
    [itemId: string]: string[],
  };

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
        { id: 'drink', name: 'Drink', price: 14.99 },
        { id: 'fish', name: 'Fish', price: 12.00 },
      ],
      people: [
        { id: 'jared', name: 'Jared' },
        { id: 'liren', name: 'Liren' },
        { id: 'roshan', name: 'Roshan' },
        { id: 'sherif', name: 'Sherif' },
      ],
      links: {},
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

  addPerson = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.state.personToAdd) {
      const people = this.state.people;
      people.push({
        id: uuid(),
        name: this.state.personToAdd.trim(),
      });
      this.setState({
        people,
        personToAdd: '',
      });
    }
  };

  removePerson = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
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

  getTotalPrice = (): number => {
    return this.state.items.map(i => i.price).reduce((a, b) => a + b, 0);
  };

  getPersonPrice = (personId: string): number => {
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
      .map(({ itemPrice, peopleCount }) => itemPrice / peopleCount )
      .reduce((a, b) => a + b, 0);
  };

  renderPeople() {
    return (
      <Box>
        <List dense={false}>
          {this.state.people.map(({ name: person }, index: number) => (
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
              <StyledTableRow key={'item-' + itemIndex}>
                <StyledTableCell>{itemName}</StyledTableCell>
                <StyledTableCell>${itemPrice.toFixed(2)}</StyledTableCell>
                {this.state.people.map(({ id: personId, name: person }, personIndex: number) => (
                  <StyledTableCell key={'person-' + personIndex}>
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

            <StyledTableRow key={'item-total'}>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>${this.getTotalPrice().toFixed(2)}</StyledTableCell>
              {this.state.people.map(({ id: personId }, personIndex: number) => (
                <StyledTableCell key={'person-' + personIndex}>
                  ${this.getPersonPrice(personId).toFixed(2)}
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
        {this.renderPeople()}
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
