import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project}) => {
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
        </tr>
    )
}


const ProjectList = ({projects}) => {
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
                </tr>
            </thead>

            <tbody>
                {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>

        </table>
    )
}


export default ProjectList
