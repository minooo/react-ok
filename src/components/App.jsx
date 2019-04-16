import React, { Component } from 'react'

// 导入antd相关的组件
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

// 导入路由相关的组件
import { HashRouter, Route, Link, Redirect } from 'react-router-dom'

// 引入路由组件
import HomeContainer from '@/components/home/HomeContainer'
import MovieContainer from '@/components/movie/MovieContainer'
import AboutContainer from '@/components/about/AboutContainer'

// 导入根组件需要的样式
import style from '@/css/app.scss'

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Layout className="layout" style={{ height: '100vh' }}>
                    <Header>
                        <div className={style.logo} />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[location.hash.split('/')[1] || 'home']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
                            <Menu.Item key="movie"><Link to="/movie">电影</Link></Menu.Item>
                            <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0', backgroundColor: '#fff' }}>
                        <Route path="/" exact render={() => <Redirect to="/home" />} />
                        <Route path="/home" component={HomeContainer} />
                        <Route path="/movie" component={MovieContainer} />
                        <Route path="/about" component={AboutContainer} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        传智播客 ©{new Date().getFullYear()} 黑马程序员
                </Footer>
                </Layout>
            </HashRouter>
        )
    }
}
