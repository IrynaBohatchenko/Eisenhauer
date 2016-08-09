import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';
import Task from './Task';
import createFragment from 'react-addons-create-fragment';

const listTarget = {
	drop(props, monitor, component) {
		const item = monitor.getItem();
		//console.log(item.singleTask);
		component.dropTask(item.singleTask);
	}
};

function collect(connect, monitor){
	return{
		connectDropTarget: connect.dropTarget()
	};
};

class ToDoList extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskRows: {}
			};
	};

	updateState(taskArr) {
		this.setState({
			taskRows: taskArr
		});
	}

	recordTask(e) {
		e.preventDefault();
		const task = this.refs.newInput.value;
		//const id = createFragment(this.state.taskRows).slice().length + 1;
		let id = 0;
		while (id in this.state.taskRows){
			id++;
		}
		this.state.taskRows[id] = (<tr><td><Task task={task} id={id} takeTask={this.takeTask} /></td></tr>);
		this.updateState(this.state.taskRows);
		this.refs.newInput.value = '';
	}

	dropTask(task) {
		//const id = createFragment(this.state.taskRows).slice().length + 1;
		let id = 0;
		while (id in this.state.taskRows){
			id++;
		}
		this.state.taskRows[id] = (<tr><td><Task task={task} id={id} takeTask={this.takeTask} /></td></tr>);
		console.log('new id '+id);
		this.updateState(this.state.taskRows);
	}

	takeTask(takenNum) {		
		//console.log(this.props.title);
		delete this.state.taskRows[takenNum];
		//console.log('delete');
		this.updateState(this.state.taskRows);
	}

	renderForm() {
		return(
			<form onSubmit={this.recordTask}>
				<input type="text" placeholder="New To Do" ref="newInput" />
				<input type="submit" value="Add" />
			</form>
			);
	}

	render() {
		this.dropTask = this.dropTask.bind(this);
		this.takeTask = this.takeTask.bind(this);
		this.recordTask = this.recordTask.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.updateState = this.updateState.bind(this);
		const connectDropTarget = this.props.connectDropTarget;
		const title = this.props.title;
		const form = (title == "ToDo" && this.renderForm());
		const taskRows = createFragment(this.state.taskRows).slice();

		return connectDropTarget(
			<div>		
				{form}
				<table>
					<thead>
						<tr>
							<th>{this.props.title}</th>
						</tr>
					</thead>
					<tbody>
						{taskRows}
					</tbody>
				</table>
			</div>
			);
	}
}

ToDoList.propTypes = {
	title: PropTypes.string
}

export default DropTarget(ItemTypes.TASK, listTarget, collect)(ToDoList);