import React, { Component } from 'react'

// 导入路由组件
import { Route, Link, Redirect, Switch } from 'react-router-dom'

// 导入电影详情
import MovieDetail from '@/components/movie/MovieDetail'

import { Layout, Menu } from 'antd';
const { Sider, Content } = Layout;

// 导入路由对应的组件
import MovieList from '@/components/movie/MovieList'


export default class MovieContainer extends Component {
    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[location.hash.split('/')[2] || 'in_theaters']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="in_theaters"><Link to="/movie/in_theaters/1">正在热映</Link></Menu.Item>
                        <Menu.Item key="coming_soon"><Link to="/movie/coming_soon/1">即将上映</Link></Menu.Item>
                        <Menu.Item key="top250"><Link to="/movie/top250/1">Top250</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ paddingLeft: '1px' }}>
                    <Content
                        style={{
                            background: '#fff', padding: 10, margin: 0, minHeight: 280, overflowY: 'scroll'
                        }}
                    >
                        <Switch>
                            <Route path="/movie" exact render={() => <Redirect to="/movie/in_theaters/1" />} />
                            <Route path="/movie/detail/:id" component={MovieDetail} />
                            <Route path="/movie/:type/:page" component={MovieList} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
