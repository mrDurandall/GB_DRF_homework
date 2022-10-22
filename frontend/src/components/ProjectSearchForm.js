import React from 'react'
import {Navigate} from "react-router-dom";


class ProjectSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title_part: ''
        }
    }

    handleChange (event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.searchProject(this.state.title_part)
        console.log(this.state)
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
                        name="title_part"
                        value={this.state.title_part}
                        onChange={ (event) => this.handleChange(event)}
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Search" />
            </form>

        )
    }

}

export default ProjectSearchForm
