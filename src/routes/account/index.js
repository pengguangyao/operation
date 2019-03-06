import React, {PureComponent, Fragment} from 'react';
import { Table, Divider, Button, Icon, Modal } from 'antd';
import Breadcrumb from '../../components/Breadcrumb';

import ModalForm from '../../components/Modal';
import styles from './index.less';

const data = [
    {
        id: 1,
        name: '李云龙',
        phone: '13565265565',
        email: 'li@163.com',
        role: '管理员',
    },
    {
        id: 2,
        name: '孙悟空',
        phone: '15962326564',
        email: 'wukong@163.com',
        role: '普通用户',
    },
    {
        id: 3,
        name: '翠花',
        phone: '18584545565',
        email: 'haidi@qq.com',
        role: '普通用户',
    }
]
export default class Account extends PureComponent {
    state = {
        modalVisible: false,
        title: '',
        modalKey: '',
        editRecord: {},
    }
    edit = (record) => {
        this.setState({
            title: '编辑',
            modalKey: 'edit',
            editRecord: record,
        })
        this.handleModalVisible(true);
    }

    del = (record) => {
        Modal.confirm({
            title: '删除用户',
            content: `确认要删除名为 ${record.name} 的账户?`,
            okText: '确定',
            cancelText: '取消',
            onOk(){

            },
            onCancel(){

            }
        })
    }
    add = () => {
        this.setState({
            title: '增加',
            modalKey: 'add',
        })
        this.handleModalVisible(true);
    }

    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        })
    }

    handleSubmit = (values) => {
        console.log(values);
    }

    restData = () => {
        this.setState({
            editRecord: {},
        })
    }
    render(){

        const { modalVisible, title, modalKey, editRecord } = this.state;
        const columns = [
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '角色',
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: '操作',
                key: 'id',
                render: (text, record) => {
                    return (
                        <Fragment>
                            <a onClick={() => this.edit(record)}>编辑</a>
                            <Divider type='vertical'/>
                            <a onClick={() => this.del(record)}>删除</a>
                        </Fragment>
                    )
                }
            }
        ]

        const addoptions = [
            {
                title: '用户名',
                key: 'name',
                required: true,
            },
            {
                title: '手机号',
                key: 'phone',
                required: true,
            },
            {
                title: '邮箱',
                key: 'email',
                required: true,
            },
            {
                title: '角色',
                key: 'role',
                type: 'select',
                required: true,
                options: [
                    {
                        key: 0,
                        value: '管理员',
                    },
                    {
                        key: 1,
                        value: '普通用户',
                    }
                ]
            },
            {
                title: '密码',
                key: 'pwd',
                type: 'password',
                required: true,
                rule: 'password',
            },
            {
                title: '确认密码',
                key: 'rePwd',
                type: 'password',
                required: true,
                rule: 'rePassword',
            }
        ]

        const editoptions = [
            {
                title: '用户名',
                key: 'name',
                required: true,
            },
            {
                title: '手机号',
                key: 'phone',
                required: true,
            },
            {
                title: '邮箱',
                key: 'email',
                required: true,
            },
        ]
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 14}
        }
        return (
            <div className={styles.wrapper}>
                <Breadcrumb/>
                <div className={styles.add}>
                    <Button type='primary' onClick={()=> this.add()}><Icon type='plus'/>增加用户</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey='id'
                />
                <ModalForm 
                    title={title}
                    modalVisible={modalVisible}
                    options={modalKey==='add'?addoptions:editoptions}
                    handleModalVisible={this.handleModalVisible}
                    handleSubmit={this.handleSubmit}
                    formItemLayout={formItemLayout}
                    layout='horizontal'
                    editRecord={editRecord}
                    restData={this.restData}
                />
            </div>
        )
    }
}