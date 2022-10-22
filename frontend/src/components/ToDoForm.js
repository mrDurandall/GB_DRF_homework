import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            project: ''
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
        this.props.createToDo(this.state.text, this.state.project)
        event.preventDefault()
        console.log(this.state.text)
        console.log(this.state.project)
    }

    render () {
        return (
            <form onSubmit={ (event) => this.handleSubmit(event) }>

                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <input
                        type="text"
                        className="form-control"
                        name="text"
                        value={this.state.text}
                        onChange={ (event) => this.handleChange(event)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="project">Project</label>
                    <select
                        className="form-control"
                        name="project"
                        onChange={(event) => this.handleChange(event)}
                        required={true}
                    >
                        <option disabled selected>Select project</option>
                        {this.props.projects.map((item) => <option value={item.id}>{item.title}</option>)}

                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }

}

export default ToDoForm
