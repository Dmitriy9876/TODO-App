import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {

  render() {
    const { description, created, onDeleted, onToggleDone, done } = this.props;
    const distanceToNow = formatDistanceToNow(new Date(created), { includeSeconds: true });

    let classNames = 'description';
    if(done) {
      classNames += ' done';
    } else {
      classNames = 'description'
    }

    return (
      <div className="task">
        <div className="view">
          <input 
          className="toggle" 
          type="checkbox" 
          checked={done}
          onChange={ onToggleDone } />
          <label>
            <span className={classNames}
            onClick={ onToggleDone }>
              {description}
              </span>
            <span className="created">created  {distanceToNow} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button 
          className="icon icon-destroy"
          onClick={onDeleted}
          ></button>
        </div>
      </div>
    );
  }
}

Task.defaultProps = {
  done: false,
  onDeleted: () => {},
  onToggleDone: () => {},
};

Task.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
};