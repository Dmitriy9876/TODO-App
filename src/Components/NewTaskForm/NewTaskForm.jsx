import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
    min: '',
    sec: '',
  };
  

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  onChangeMin = (e) => {
    this.setState({ min: e.target.value });
  }

  onChangeSec = (e) => {
    this.setState({ sec: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
  
    const { description, min, sec } = this.state;
    const { onItemAdded } = this.props;
  
    const minutes = min ? parseInt(min, 10) : 0;
    const seconds = sec ? parseInt(sec, 10) : 0;
    const totalSeconds = (minutes * 60 + seconds) || 300;
  
    if (description) {
      onItemAdded(description, totalSeconds);
      this.setState({ description: '', min: '', sec: '' });
    }
  } 

  render() {
    const { description, min, sec } = this.state;
    
    return (
      <header className="header">
        <h1>Todos</h1>
        <form type="submit" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onDescriptionChange}
            value={description}
          />
          <input type="text"
               className="new-todo-form__timer"
               placeholder="Min"
               value={min}
               onChange={this.onChangeMin}
          />
          <input type="text"
               className="new-todo-form__timer"
               placeholder="Sec"
               value={sec}
               onChange={this.onChangeSec}
          />
          <button type="submit" hidden>Add Task</button>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};