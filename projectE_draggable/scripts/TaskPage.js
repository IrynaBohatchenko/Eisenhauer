import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ToDoList from './ToDoList';
import EisenhauerMatrix from './EisenhauerMatrix';

//DragDropContext(HTML5Backend)
class TaskPage extends Component{	
	render() {
		return(
			<div>
				<ToDoList title="ToDo" />
				<EisenhauerMatrix />
			</div>
			);
	}
}

const Page = DragDropContext(HTML5Backend)(TaskPage);

ReactDOM.render(<Page />, document.getElementById('content'));