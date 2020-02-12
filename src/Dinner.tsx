import * as React from 'react';

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

class Dinner extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {};

  constructor(props: IProps) {
    super(props);

    this.state = {
      items: [],
      people: ['Jared', 'Liren', 'Harry'],
      personToAdd: '',
      itemNameToAdd: '',
      itemPriceToAdd: '',
    };

    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleItemPriceChange = this.handleItemPriceChange.bind(this);
    this.addPerson = this.addPerson.bind(this);
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

  getTotalPrice = (): number => {
    return this.state.items.map(i => i.price).reduce((a, b) => a + b, 0);
  };

  public render() {
    return (
      <div>
        <table>
          <thead>
          <tr>
            <th key="item">Item</th>
            <th key="price">Price</th>
            {this.state.people.map((person: string, index: number) =>
              <th key={'person-' + index}>{person}</th>)
            }
            <th key="person-add">
              <form>
                <input
                  type="text"
                  placeholder="add more people"
                  value={this.state.personToAdd}
                  required={true}
                  onChange={this.handlePersonChange}
                />
                <button onClick={this.addPerson}>Add</button>
              </form>
            </th>
          </tr>
          </thead>

          <tbody>
          {this.state.items.map(({ name, price }, index: number) =>
            <tr key={'item-' + index}>
              <td>{name}</td>
              <td>${price.toFixed(2)}</td>
            </tr>,
          )}
          <tr>
            <td>Total</td>
            <td>${this.getTotalPrice().toFixed(2)}</td>
          </tr>
          <tr key="item-add">
            <td colSpan={2}>
              <form>
                <input
                  type="text"
                  placeholder="item name"
                  value={this.state.itemNameToAdd}
                  required={false}
                  onChange={this.handleItemNameChange}
                />
                <input
                  type="text"
                  placeholder="item name"
                  value={this.state.itemPriceToAdd}
                  required={true}
                  onChange={this.handleItemPriceChange}
                />
                <button onClick={this.addItem}>Add</button>
              </form>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dinner;
