import { Component } from "react";
import PropTypes from 'prop-types'


export default class DataLoader extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        onDataLoaded: PropTypes.func.isRequired,
        onBeforeFetch: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            // data: null,
            error: false,
            loaded: false,
        }
    }
    componentDidMount() {
        if (this.props.onBeforeFetch) {
            this.props.onBeforeFetch(this.props.url)
        }

        fetch(this.props.url)
            .then(data => data.json())
            .then(data => {
                this.setState({ loaded: true })
                console.log('Data is', this.props.url)
                this.props.onDataLoaded(data)

            }).catch(error => {
                this.setState({ error })
            })
    }
    render() {
        const { error, loaded } = this.state
        const { children } = this.props
        if (error) {
            throw error
        }
        return (loaded ? children ? children : null : null)
    }
}