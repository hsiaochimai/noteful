import { Component } from "react";
import PropTypes from 'prop-types';
import config from './config';

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
        }
    }
    componentDidMount() {
        if (this.props.onBeforeFetch) {
            this.props.onBeforeFetch(this.props.url)
        }
        fetch(this.props.url, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              'Authorization': `Bearer ${config.API_KEY}`
            }
        })
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