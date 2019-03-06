
import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './index.less';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { getMenuData } from '../common/menu';
import {getRoutes} from '../utils/utils';
import {connect} from 'dva';
import { routerRedux, Switch, Route, Redirect } from 'dva/router';

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
@connect(({global}) => ({
    global,
}))
export default class BaseLayout extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            openKeys: [],
        }
    }
    componentDidMount(){
        if(!localStorage.getItem('role')){
            this.props.dispatch(routerRedux.push('/login'));
        }
        this.setState({
            openKeys: [`/${this.props.global.path.slice(1).split('/')[0]}`]
        })
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    click = (key) => {
        this.props.dispatch(routerRedux.push(key))

    }
    getOpenKeys = (key) => {
        this.setState({
            openKeys: key.slice(-1)
        })
    }

    loginout = () => {
        this.props.dispatch(routerRedux.push('/login'))
        localStorage.removeItem('role');
    }
    render() {
        const menuData = getMenuData();
        const { collapsed, openKeys } = this.state;
        const { routerData, match } = this.props;
        const notFound = routerData['/exception'].component;
        
        const menu = (
            <Menu onClick={() =>this.loginout()}>
                <Menu.Item>
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        )
        return (
            <DocumentTitle title="运维平台管理">
                <div className={styles.wrapper}>
                    <Layout>
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={collapsed}
                            width={256}
                        >
                            <div className={styles.logo}>
                                <i></i>{collapsed?'':'RayData运维平台'}
                            </div>
                            <Menu 
                                mode="inline" 
                                selectedKeys={[`${this.props.global.path}`]} 
                                onClick={({key})=>this.click(key)} 
                                onOpenChange={(key)=>this.getOpenKeys(key)}
                                openKeys={openKeys}
                                multiple={false}
                            >
                                {
                                    menuData.map(item => {
                                        if(!item.children){
                                            return (
                                                <Menu.Item key={item.path}>
                                                    <Icon type={item.type}/>
                                                    <span>{item.name}</span>
                                                </Menu.Item>
                                            )
                                        }
                                        return (
                                            <SubMenu key={item.path} title={<span><Icon type={item.type}/><span>{item.name}</span></span>}>
                                                {
                                                    item.children.map(ele => {
                                                        return <Menu.Item key={ele.path}><span>{ele.name}</span></Menu.Item>
                                                    })
                                                }
                                            </SubMenu>
                                        )
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 , height: 48}}>
                                <Icon
                                    className="trigger"
                                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={() =>this.toggle()}
                                    style={{
                                        fontSize: '24px',
                                        position: 'relative',
                                        left: '15px',
                                        top: '4px',
                                    }}
                                />
                                <div className={styles.userInfo}>
                                    <div className={styles.loginout}><Icon type="question-circle" /><span className={styles.text}>帮助</span></div>
                                    <div>
                                        <Dropdown 
                                            overlay={menu} 
                                            placement='bottomCenter'
                                        >
                                            <span className={styles.loginout}>
                                                <Icon type="user" />
                                                <span className={styles.text}>张三</span>
                                                <Icon type="caret-down" style={{marginLeft: '5px',fontSize: '16px'}}/>
                                            </span>
                                        </Dropdown>
                                    </div>
                                </div>
                            </Header>
                            <Content style={{margin: '10px 10px', padding: '20px 10px', background: '#fff', height: '100%'}}>
                                <Switch>
                                    {getRoutes(match.path, routerData).map(item => (
                                        <Route
                                            key={item.key}
                                            path={item.path}
                                            exact={item.exact}
                                            component={item.component}
                                        />
                                    ))}
                                    <Redirect exact from="/" to='/overview' />
                                    <Route component={notFound}/>
                                </Switch>                             
                            </Content>
                            <Footer style={{height: 30,textAlign: 'center'}}>这是一个模型</Footer>
                        </Layout>
                    </Layout>
                </div>
            </DocumentTitle>
        )
    }
}