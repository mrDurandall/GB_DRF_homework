import React from "react";
import {useParams} from "react-router-dom";


const ToDo = ({todo}) => {
    return (
        <li>
            {todo.text}
        </li>
    )
}


const ProjectDetailed = ({projects, todos}) => {
    let {projectId} = useParams()
    let current_project = projects.filter( project => project.id == projectId)[0]
    let current_project_todos = todos.filter( todo => todo.project == projectId)
    return (
        <div>
            <h1>{current_project.title}</h1>
            <h2>{current_project.repo_link}</h2>
            <ul>
                {current_project_todos.map((todo) => <ToDo todo={todo} />)}
            </ul>
        </div>
    )
}


export default ProjectDetailed
