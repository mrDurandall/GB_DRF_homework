import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </td>
            <td>
                {project.repo_link}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button type='button' onClick={()=>deleteProject(project.id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Repo Link
                    </th>
                    <th>
                        Users
                    </th>
                    <th>

                    </th>
                </tr>
            </thead>

            <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </tbody>

        </table>
    )
}


export default ProjectList
