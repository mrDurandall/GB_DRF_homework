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

    handleUsersChange (event) {
        let options = event.target.options;
        let users = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                users.push(parseInt(options[i].value));
                }
            }
        this.setState({users: users})
    }

    handleSubmit (event) {
        this.props.createProject(this.state.title, this.state.repo_link, this.state.users)
        event.preventDefault()
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

                <div className="form-group">
                    <label htmlFor="users">Users</label>
                    <select
                        className="form-control"
                        name="users"
                        multiple={true}
                        onChange={(event) => this.handleUsersChange(event)}
                    >
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}

                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }

}

export default ProjectForm
