import './NewTaskForm.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  onDescriptionChange = (e) => {
    const { value } = e.target;
    this.setState({
      description: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { onItemAdded } = this.props;
    const { description } = this.state;
    
    onItemAdded(description);
    this.setState({ description: '' });
  }

  render() {
    const { description } = this.state;
    
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onDescriptionChange}
            value={description}
          />
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