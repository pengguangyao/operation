import React, { PureComponent } from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { Form, Button, Input, Icon } from 'antd';
import styles from './index.less';
@connect(() => ({

}))
@Form.create()
export default class LoginPage extends PureComponent {
    state = {
        isError: false,
    }
    componentDidMount() {

    }
    handleSubmit = () => {
        const {form} = this.props;
        form.validateFields((errors, values) => {
            if(errors) return;
            if(values.userName === 'admin' && values.password==='admin'){ 
                localStorage.setItem('role', 'admin');
                this.props.dispatch(routerRedux.push('/'))
            }else{
                this.setState({
                    isError: true,
                })
            }
            
        })
    }

    changeInput = () => {
        this.setState({
            isError: false,
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {isError} = this.state;
        const CN = isError?styles.show:styles.hide;
        return (
            <div className={styles.wrapper} id="wrapper">
                <div className={styles.title}>
                    RayData运维平台
                </div>
                <div className={styles.loginArea}>
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" onChange={()=>this.changeInput()}/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" onChange={()=>this.changeInput()}/>
                            )}
                        </Form.Item>
                        <div className={CN}>账号或密码错误</div>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.submit}>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

