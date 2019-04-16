import React, { Component } from 'react'
import fetchJsonp from 'fetch-jsonp'
import { Spin, Card, Rate, Pagination } from 'antd'
const { Meta } = Card;

import style from '@/css/movielist.scss'

export default class MovieList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mtype: props.match.params.type, // 电影类型
            nowPage: props.match.params.page, // 当前的页码值
            isLoading: true, // 默认加载中
            movieList: [],
            pageSize: 10, // 每页显示10条数据
            total: 0, //总数据条数
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoading ?
                        <div style={{ textAlign: 'center' }}><Spin size="large" /></div> :
                        <div>
                            <div className={style.mlist}>
                                {
                                    this.state.movieList.map(item => (
                                        <Card
                                            key={item.id}
                                            hoverable
                                            style={{ width: 210 }}
                                            className={style.mitem}
                                            cover={<img alt="example" src={item.images.small} />}
                                            onClick={() => this.goDetail(item.id)}
                                        >
                                            <Meta
                                                title={item.title}
                                            />
                                            <p>电影类型：{item.genres.join('，')}</p>
                                            <Rate value={(item.rating.average || 0) / 2} disabled />
                                        </Card>
                                    ))
                                }

                            </div>
                            <Pagination 
                                defaultCurrent={parseInt(this.state.nowPage)}
                                defaultPageSize={this.state.pageSize}
                                total={this.state.total}
                                onChange={(page) => this.onPageChange(page)}
                            />
                        </div>
                }
            </div>
        )
    }
    componentDidMount() {
        this.getMovieList()
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            mtype: nextProps.match.params.type,
            nowPage: nextProps.match.params.page,
            isLoading: true
        }, () => {
            this.getMovieList()
        })
    }
    getMovieList = async () => {
        const { mtype, nowPage, pageSize } = this.state
        const start = (nowPage - 1) * pageSize
        const response = await fetchJsonp(`https://api.douban.com/v2/movie/${mtype}?start=${start}&count=${pageSize}`)
        const data = await response.json()

        this.setState({
            movieList: data.subjects,
            isLoading: false,
            total: data.total
        })
    }
    // 页码改变
    onPageChange = page => {
        // 使用编程式导航跳转
        this.props.history.push(`/movie/${this.state.mtype}/${page}`)
    }

    // 点击列表项，查看详情
    goDetail = id => {
        this.props.history.push(`/movie/detail/${id}`)
    }
}
