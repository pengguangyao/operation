import React, { PureComponent, Fragment } from 'react';
import styles from './index.less';
import { Table, Divider, Button, Icon, Modal, Form, Input, Select, message } from 'antd';
import Bread from '../../components/Breadcrumb';

const data = [
    {
        id: 1,
        computerName: '实例01',
        ip: '135111132',
        status: '运行中',
        area: '北京',
        loginWay: 'key',
        addTime: '2019.02.01',
    },
    {
        id: 2,
        computerName: '实例02',
        ip: '135111132',
        status: '运行中',
        area: '北京',
        loginWay: 'key',
        addTime: '2019.02.01',
    },
    {
        id: 3,
        computerName: '实例03',
        ip: '135111132',
        status: '运行中',
        area: '北京',
        loginWay: 'key',
        addTime: '2019.02.01',
    },
    {
        id: 4,
        computerName: '实例04',
        ip: '135111132',
        status: '已停止',
        area: '北京',
        loginWay: 'key',
        addTime: '2019.02.01',
    }
]
const CreateForm = Form.create()(props => {
    const {modalVisible, form, handleModalVisible, handleSubmit, editRecord, restData} = props;
    const {getFieldDecorator} = form;
    const okHandle = () => {
        form.validateFields((errors, values) => {
            if(errors) return;
            handleSubmit(values);
        })
    }
    const cancelHandle = () => {
        handleModalVisible(false);
        form.resetFields();
        restData();
    }

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14}
    }
    return (
        <Modal
            title='添加'
            visible={modalVisible}
            onOk={okHandle}
            onCancel={cancelHandle}
            okText='确定'
            cancelText='取消'
            confirmLoading={false}
        >
            <Form layout='horizontal'>
                <Form.Item label='实例名称' {...formItemLayout}>
                    {
                        getFieldDecorator('computerName', {
                            rules: [{required: true, message: '请输入实例名称'}],
                            initialValue: editRecord.computerName || '',
                        })(
                            <Input/>
                        )
                    }
                </Form.Item>
                <Form.Item label='IP' {...formItemLayout}>
                    {
                        getFieldDecorator('ip', {
                            rules: [{required: true, message: '请输入IP地址'}],
                            initialValue: editRecord.ip || '',
                        })(
                            <Input/>
                        )
                    }
                </Form.Item>
                <Form.Item label='状态' {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                            rules: [{required: true, message: '请选择状态'}],
                            initialValue: editRecord.status || '',
                        })(
                            <Select>
                                <Select.Option value={1}>运行中</Select.Option>
                                <Select.Option value={0}>已停止</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label='地区' {...formItemLayout}>
                    {
                        getFieldDecorator('area', {
                            rules: [{required: true, message: '请输入地区'}],
                            initialValue: editRecord.area || '',
                        })(
                            <Input/>
                        )
                    }
                </Form.Item>
                <Form.Item label='登录方式' {...formItemLayout}>
                    {
                        getFieldDecorator('loginWay', {
                            rules: [{required: true, message: '请选择登录方式'}],
                            initialValue: editRecord.loginWay || '',
                        })(
                            <Select></Select>
                        )
                    }
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default class One extends PureComponent{
    constructor(){
        super();
        this.state = {
            selectedRowKeys: [],
            modalVisible: false,
            editRecord: {},
        }
    }

    componentDidMount(){
        
    }

    checkDetail = () => {

    }

    edit = (record) => {
        this.handleModalVisible(true);
        this.setState({
            editRecord: {...record},
        })
    }

    add = () => {
        this.handleModalVisible(true);
    }

    del = () => {
        const { selectedRowKeys } = this.state;
        if(selectedRowKeys.length === 0){
            message.info('请先选择主机', 1);
            return;
        }
        const selectData = data.filter(item => selectedRowKeys.includes(item.id))
        const content = (
            <div>
                <p>{`您已选${selectedRowKeys.length}台主机, 确定要删除吗?`}</p>
                <table className={styles.table}>
                    <tbody>
                        {
                            selectData.map((item,index) => {
                                return (
                                    <tr key={item.id}>
                                        <td className={styles.num}>{index+1}</td>
                                        <td className={styles.name}>{item.computerName}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
        Modal.confirm({
            title: '删除主机',
            content: content,
            okText: '确定',
            cancelText: '取消',
            width: 500,
            onOk(){

            },
            onCancel(){

            },
        })
    }
    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: flag,
        })
    }
    //获得所有选中的id值
    onSelectChange = (key) => {
        this.setState({
            selectedRowKeys: key,
        })
    }

    handleSubmit = (values) => {
        console.log(values)
    }

    restData = () => {
        this.setState({
            modalVisible: false,
            editRecord: {},
        })
    }

    onOff = () => {
        
    }
    render(){
        const {selectedRowKeys, modalVisible, editRecord} = this.state;
        
        const colmuns = [
            {
                title: '实例名',
                dataIndex: 'computerName',
                key: 'computerName',
            },
            {
                title: 'IP',
                dataIndex: 'ip',
                key: 'ip',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                    return (
                        <span>
                            <Icon type="poweroff" style={{marginRight:5, color: text==='已停止'?'red':'rgba(37, 155, 36, 1)'}} onClick={()=>this.onOff(record)}/>{text}
                        </span>
                    )
                }
            },
            {
                title: '地区',
                dataIndex: 'area',
                key: 'area',
            },
            {
                title: '登录方式',
                dataIndex: 'loginWay',
                key: 'loginWay',
            },
            {
                title: '添加时间',
                dataIndex: 'addTime',
                key: 'addTime',
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render: (text, record) => {
                    return (
                        <Fragment>
                            <a onClick={() => this.checkDetail(record)}>详情</a>
                            <Divider type='vertical'/>
                            <a onClick={() => this.edit(record)}>编辑</a>
                        </Fragment>
                    )
                }
            }
        ]
        
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }
        return (
            <div className={styles.wrapper}>
                <Bread/>
                <div className={styles.add}>
                    <Button type='primary' style={{marginRight: 20}} onClick={()=> this.add()}><Icon type='plus'/>增加主机</Button>
                    <Button type='primary' onClick={()=>this.del()}><Icon type='minus'/>删除主机</Button>
                </div>
                <Table
                    columns={colmuns}
                    dataSource={data}
                    {...this.state}
                    rowKey='id'
                    rowSelection={rowSelection}
                />
                <CreateForm
                    modalVisible={modalVisible}
                    handleModalVisible={this.handleModalVisible}
                    handleSubmit={this.handleSubmit}
                    editRecord={editRecord}
                    restData={this.restData}
                />
            </div>
        )
    }
}