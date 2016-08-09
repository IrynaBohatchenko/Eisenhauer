import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import ToDoList from './ToDoList';

//DragDropContext(HTML5Backend)
export default class EisenhauerMatrix extends Component{
	renderFields(title) {
		return(
			<div>
				<ToDoList title={title} />
			</div>
		);
	}
	
	render() {
		const fields = [];
		const fNames = {1:'A', 2:'B', 3:'C', 4:'D'};
		const matrixE = {A: 'Important&Urgent', B: 'Important&Not Urgent', C: 'Not Important&Urgent', D: 'Not Important&Not Urgent'}
		let x;
		for (x in fNames) {
			fields.push(this.renderFields(matrixE[fNames[x]]));
		}
		return(
			<div>
				{fields}
			</div>
		);
	}
}

//export default DragDropContext(HTML5Backend)(EisenhauerMatrix);