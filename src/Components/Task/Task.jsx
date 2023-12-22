import { Component } from 'react';
import './Task.scss';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  handleKeyPress = (e) => {
    const { onToggleTimer } = this.props;
    if (e.key === 'Enter' || e.key === ' ') {
      onToggleTimer();
    }
  };

  render() {
    const { onToggleDone, onDeleted, onToggleTimer, description, created, done, time, pause } = this.props;
    let taskTime = formatDistanceToNow(created);
    
    if (taskTime === "less than a minute") {
      taskTime = "less than minute ago";
    } else if (taskTime.includes("minute")) {
      taskTime = `created ${taskTime.split(" ")[0]} minutes ago`;
    } else if (taskTime.includes("hour")) {
      taskTime = `created ${taskTime.split(" ")[0]} hours ago`;
    }

    let className = 'title';
    if (done) {
      className += ' completed';
    }

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={onToggleDone}
        />
        <label htmlFor="toggle">
          <button 
            type='button' className={className} onClick={onToggleDone}
            tabIndex="0">{description}</button>
          <span className="description">
            <button 
              type='button'
              className={`${pause ? 'icon-play' : 'icon-pause'}`}
              onClick={onToggleTimer}
              onKeyDown={this.handleKeyPress}
              tabIndex={0}
              aria-label={pause ? 'Play' : 'Pause'}
            />
            <span className="time">{`${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`}</span>
            <span className="created">{taskTime}</span>
          </span>
        </label>
        <button type='button' className="icon icon-edit" aria-label="Edit"/>
        <button type='button' className="icon icon-destroy" onClick={onDeleted} aria-label="Delete"/>
      </div>
    );
  }
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  pause: PropTypes.bool.isRequired,
  onToggleTimer: PropTypes.func.isRequired,
  created: PropTypes.instanceOf(Date).isRequired
};