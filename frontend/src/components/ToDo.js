import React from "react";


const ToDoItem = ({todo}) => {
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
                {todo.is_active}
            </td>
        </tr>
    )
}


const ToDoList = ({todos}) => {
    return (
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
                </tr>
            </thead>

            <tbody>
                {todos.map((todo) => <ToDoItem todo={todo} />)}
            </tbody>

        </table>
    )
}


export default ToDoList
