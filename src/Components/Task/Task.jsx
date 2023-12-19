import React, { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.props.onToggleTimer();
    }
  };

  render() {
    const { description, done, onToggleDone, onDeleted, time, pause, onToggleTimer } = this.props;
    let taskTime = formatDistanceToNow(this.props.created);
    
    // Ваш код для изменения отображения времени
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
        <label>
          <span className={className} onClick={onToggleDone}
            role="button"  
            tabIndex="0">{description}</span>
          <span className="description">
            <span
              className={`${pause ? 'icon-play' : 'icon-pause'}`}
              onClick={onToggleTimer}
              onKeyDown={this.handleKeyPress}
              role="button"
              tabIndex={0}
            />
            <span className="time">{`${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`}</span>
            <span className="created">{taskTime}</span>
          </span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    );
  }
}