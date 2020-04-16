import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Person } from './types';

interface IProps {
  people: Person[];
  addPerson: (personName: string) => void;
  removePerson: (index: number) => void;
}

interface IState {
  personName: string;
}

class People extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      personName: '',
    };

    this.onAddPerson = this.onAddPerson.bind(this);
    this.onChangePerson = this.onChangePerson.bind(this);
    this.onRemovePerson = this.onRemovePerson.bind(this);
  }

  onAddPerson = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.state.personName) {
      this.props.addPerson(this.state.personName.trim());
      this.setState({ personName: '' });
    }
  };

  onChangePerson = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ personName: event.target.value });
  };

  onRemovePerson = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    this.props.removePerson(index);
  };

  render() {
    return (
      <Box>
        <List dense={false} component="nav">
          {this.props.people.map(({ name: person }, index: number) => (
            <ListItem button key={'person-' + index}>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon/>
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={person}/>

              <ListItemSecondaryAction>
                <IconButton
                  edge="start"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.onRemovePerson(event, index)}
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
              value={this.state.personName}
              required={true}
              onChange={this.onChangePerson}
            />

            <ListItemSecondaryAction>
              <IconButton edge="start" onClick={this.onAddPerson}>
                <PersonAddIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
    );
  }
}

export default People;
