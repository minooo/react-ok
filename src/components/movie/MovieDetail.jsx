import React, { Component } from 'react'
import { Spin, Button, Icon } from 'antd'
import fetchJsonp from 'fetch-jsonp'

export default class MovieDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieinfo: {},
            isLoading: true
        }
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={() => this.props.history.go(-1)}>
                    <Icon type="left" />后退
                </Button>
                {
                    this.state.isLoading ?
                        <div style={{ textAlign: 'center' }}><Spin size="large" /></div> :
                        <div style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '35px', fontWeight: 'bold' }}>{this.state.movieinfo.title}</h1>
                            <img src={this.state.movieinfo.images.large} alt="" />
                            <p style={{ lineHeight: '30px', textIndent: '2em' }}>{this.state.movieinfo.summary}</p>
                        </div>
                }
            </div>
        )
    }
    componentDidMount() {
        console.log(this.props)
        this.getMovieInfo()
    }

    getMovieInfo = async () => {
        const response = await fetchJsonp(`https://api.douban.com/v2/movie/subject/${this.props.match.params.id}`)
        const data = await response.json()
        this.setState({ movieinfo: data, isLoading: false })
    }
}
