import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            repo_link: '',
            users: []
        }
    }

    handleChange (event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit (event) {
        console.log(this.state.title)
        console.log(this.state.repo_link)
        console.log(this.state.users)
    }

    render () {
        return (
            <form onSubmit={ (event) => this.handleSubmit(event) }>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={this.state.title}
                        onChange={ (event) => this.handleChange(event)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="repo_link">Repo link</label>
                    <input
                        type="url"
                        className="form-control"
                        name="repo_link"
                        value={this.state.repo_link}
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>

                {/*<div className="form-group">*/}
                {/*    <label htmlFor="users">Users</label>*/}
                {/*    <input*/}
                {/*        type="number"*/}
                {/*        className="form-control"*/}
                {/*        name="users"*/}
                {/*        value={this.state.users}*/}
                {/*        onChange={(event) => this.handleChange(event)}*/}
                {/*    />*/}
                {/*</div>*/}

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }

}

export default ProjectForm
