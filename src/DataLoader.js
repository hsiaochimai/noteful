import { Component } from "react";
import pt from 'prop-types'


export default class DataLoader extends Component {
    static propTypes = {
        url: pt.string.isRequired,
        onDataLoaded: pt.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            // data: null,
            error: false,
        }
    }
    componentDidMount() {
        fetch(this.props.url)
            .then(data => data.json())
            .then(data => {
                // this.setState({ data })
                this.props.onDataLoaded(data)
            }).catch(error => {
                this.setState({ error })
            })
    }
    render() {
        const { error } = this.state
        if (error) {
            throw error
        }
        return null
    }
}