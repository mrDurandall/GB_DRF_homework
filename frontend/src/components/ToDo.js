import React from "react";
import {Link} from "react-router-dom";


const ToDoItem = ({todo, deleteToDo}) => {
    let active = ''
    if (todo.is_active) {
        active = 'active'
    } else {
        active = 'closed'
    }

    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_on}
            </td>
            <td>
                {todo.updated_on}
            </td>
            <td>
                {active}
            </td>
            <td>
                <button type='button' onClick={() => deleteToDo(todo.id)}>
                    Close
                </button>
            </td>
        </tr>
    )
}


const ToDoList = ({todos, deleteToDo}) => {
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>
                        Project
                    </th>
                    <th>
                        Text
                    </th>
                    <th>
                        Created On
                    </th>
                    <th>
                        Updated On
                    </th>
                    <th>
                        Is Active
                    </th>
                    <th>

                    </th>
                </tr>
            </thead>

            <tbody>
                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </tbody>

        </table>
        <Link to="/projects/create">Create new project</Link>
        </div>
    )
}


export default ToDoList
