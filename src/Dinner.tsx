import React from 'react';
import { Item, Person, uuid } from './utility';
import { Divider } from '@material-ui/core';
import People from './People';
import Items from './Items';
import Bill from './Bill';

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
  }

  handleLinkChange = (personId: string, itemId: string) => {
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
        <Bill
          people={this.state.people}
          items={this.state.items}
          links={this.state.links}
          handleLinkChange={this.handleLinkChange}
        />
        <br/>
        <br/>
      </>
    );
  }
}

export default Dinner;
