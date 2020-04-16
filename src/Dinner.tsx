import React from 'react';
import { uuid } from './utility';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  Divider,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Item, Person } from './types';
import People from './People';
import Items from './Items';

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
    };

    this.handleLinkChange = this.handleLinkChange.bind(this);

    this.addPerson = this.addPerson.bind(this);
    this.removePerson = this.removePerson.bind(this);

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.getLinkStatus = this.getLinkStatus.bind(this);
  }

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

  addItem = (itemName: string, itemPrice: number) => {
    const items = this.state.items;
    items.push({
      id: uuid(),
      name: itemName,
      price: itemPrice,
    });
  };

  removeItem = (index: number) => {
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
        <Items
          items={this.state.items}
          addItem={this.addItem}
          removeItem={this.removeItem}
        />
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
