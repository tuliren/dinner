import React from 'react';
import {
  Checkbox,
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
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { ID_DELIMITER, Item, Person } from './utility';

interface IProps {
  items: Array<Item>;
  people: Array<Person>;
  links: {
    [itemId: string]: string[],
  };
  handleLinkChange: (personId: string, itemId: string) => void;
}

interface IState {
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

class Bill extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      tax: 0,
      tip: 0,
    };

    this.onTaxChange = this.onTaxChange.bind(this);
    this.onTipChange = this.onTipChange.bind(this);
    this.onLinkChange = this.onLinkChange.bind(this);
    this.getLinkStatus = this.getLinkStatus.bind(this);
  }

  onTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tax: parseFloat(event.target.value) || 0 });
  };

  onTipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tip: parseFloat(event.target.value) || 0 });
  };

  onLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [personId, itemId] = event.target.value.split(ID_DELIMITER);
    this.props.handleLinkChange(personId, itemId);
  };

  getLinkStatus = (personId: string, itemId: string): boolean => {
    return this.props.links[itemId] !== undefined && this.props.links[itemId].includes(personId);
  };

  getAllFoodPrice = (): number => {
    return this.props.items.map(i => i.price).reduce((a, b) => a + b, 0);
  };

  getPersonFoodPrice = (personId: string): number => {
    const personItems: Array<{
      itemPrice: number;
      peopleCount: number;
    }> = [];

    for (const [itemId, personIds] of Object.entries(this.props.links)) {
      if (personIds.includes(personId)) {
        const itemPrice = this.props.items.filter(item => item.id === itemId)[0].price;
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

  render() {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell key="item">Item</StyledTableCell>
              <StyledTableCell key="price">Price</StyledTableCell>

              {this.props.people.map(({ name: person }, index: number) =>
                <StyledTableCell key={'person-' + index}>{person}</StyledTableCell>)
              }
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {this.props.items.map(({ id: itemId, name: itemName, price: itemPrice }, itemIndex: number) =>
              <StyledTableRow hover key={'item-' + itemIndex}>
                <StyledTableCell>{itemName}</StyledTableCell>
                <StyledTableCell>${itemPrice.toFixed(2)}</StyledTableCell>
                {this.props.people.map(({ id: personId, name: person }, personIndex: number) => (
                  <StyledTableCell key={'item-person-' + personIndex}>
                    <Checkbox
                      checked={this.getLinkStatus(personId, itemId)}
                      value={personId + ID_DELIMITER + itemId}
                      color="primary"
                      onChange={this.onLinkChange}
                    />
                  </StyledTableCell>
                ))}
              </StyledTableRow>,
            )}

            <StyledTableRow hover key={'dinner-total'}>
              <StyledTableCell>All Food</StyledTableCell>
              <StyledTableCell>${this.getAllFoodPrice().toFixed(2)}</StyledTableCell>
              {this.props.people.map(({ id: personId }, personIndex: number) => (
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
                  onChange={this.onTaxChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </StyledTableCell>
              {this.props.people.map(({ id: personId }, personIndex: number) => (
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
                  onChange={this.onTipChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </StyledTableCell>
              {this.props.people.map(({ id: personId }, personIndex: number) => (
                <StyledTableCell key={'tip-person-' + personIndex}>
                  ${this.getPersonTip(personId).toFixed(2)}
                </StyledTableCell>
              ))}
            </StyledTableRow>

            <StyledTableRow hover key={'dinner-person-tip'}>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>${this.getTotalPrice().toFixed(2)}</StyledTableCell>
              {this.props.people.map(({ id: personId }, personIndex: number) => (
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
}

export default Bill;
