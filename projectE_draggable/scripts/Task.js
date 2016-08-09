import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';

const taskSource = {
  beginDrag(props, monitor, component) {
  	console.log('begin');
  	const singleTask = component.props.task
  	//component.props.takeTask(component.props.id);
    return {singleTask, id: component.props.id};
  },

 endDrag(props, monitor, component) {
	console.log(component.props.id);
  	component.props.takeTask(component.props.id);
  	return {};  	
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    //isDragging: monitor.isDragging()
  };
}

class Task extends Component{
	render() {
		const connectDragSource = this.props.connectDragSource;
		//const isDragging = this.props.isDragging;
    	const singleTask = this.props.task;

		return connectDragSource(			
			<span>{singleTask}</span>
		);
	}
}

Task.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	//isDragging: PropTypes.bool.isRequired,
	task: PropTypes.string
	//taskid: PropTypes.integer
};

export default DragSource(ItemTypes.TASK, taskSource, collect)(Task);