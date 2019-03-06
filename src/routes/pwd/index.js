import React , {PureComponent, Fragment} from 'react';
import Bread from '../../components/Breadcrumb';
import { Table, Button, Icon, Divider, Modal, message, Transfer } from 'antd';

import ModalForm from '../../components/Modal';
import styles from './index.less';

const data = [
    {
        id: 1,
        name: 'key1',
        number: 2,
        createTime: '2018.12.02',
    },
    {
        id: 2,
        name: 'key2',
        number: 9,
        createTime: '2019.01.16',
    },
    {
        id: 3,
        name: 'key3',
        number: 12,
        createTime: '2019.02.02',
    }
]
const getData = [
    {
        id: 1,
        title: `实例1`,
        description: '1',
    },
    {
        id: 2,
        title: `实例2`,
        description: '2',
    },
    {
        id: 3,
        title: `实例3`,
        description: '3',
    },
    {
        id: 4,
        title: `实例4`,
        description: '4',
    },
    {
        id: 5,
        title: `实例5`,
        description: '5',
    },
]
export default class Pwd extends PureComponent {
    state = {
        //表头选择的keys
        selectedRowKeys: [],
        modalVisible: false,
        editRecord: {},
        bundVisible: false,
        //穿梭框已选择选择的keys
        transferTargetKeys: [],
    }

    onSelectChange = key => {
        this.setState({
            selectedRowKeys: key,
        })
    }
    add = () => {
        this.options = [
            {
                title: '名称',
                key: 'name',
                required: true,
                type: 'input',
            },
            {
                title: '秘钥',
                key: 'pwd',
                required: true,
                type: 'textArea',
            }
        ]
        this.handleModalVisible(true);
    }

    del = () => {
        const {selectedRowKeys} = this.state;
        if(selectedRowKeys.length === 0){
            message.info('请先选择秘钥');
            return;
        }
        const selectData = data.filter(item=> selectedRowKeys.includes(item.id));
        const content = (
            <div>
                <p>{`您已选${selectedRowKeys.length}个秘钥`}</p>
                <table className={styles.table}>
                    <tbody>
                        {
                            selectData.map((item, index)=>{
                                return (
                                    <tr key={item.id}>
                                        <td className={styles.num}>{index+1}</td>
                                        <td className={styles.name}>{item.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
        Modal.confirm({
            title: '删除秘钥',
            content: content,
            okText: '确定',
            cancelText: '取消',
            width: 500,
            onOk(){

            },
            onCancel(){

            }
        })
    }

    edit = (record) => {
        this.setState({
            editRecord: record,
        })
        this.options = [
            {
                title: '秘钥名称',
                key: 'name',
                required: true,
                type: 'input',
            },
            {
                title: '秘钥描述',
                key: 'description',
                type: 'textArea',
            }
        ]
        this.handleModalVisible(true);
    }

    bund = (record) => {
        this.setState({
            bundVisible: true,
        })
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
    /*****************下面的函数是穿梭框的********************* */
    //选项在两栏之间转移的回调
    handleChange = (keys) => {
        this.setState({
            transferTargetKeys: keys
        })
    }
    _okHandle = () => {
        this.setState({
            bundVisible: false,
        })
    }
    _cancelHandle = () => {
        this.setState({
            bundVisible: false,
        })
    }
    render(){
        const {selectedRowKeys, modalVisible, editRecord, bundVisible, transferTargetKeys} = this.state;
        const colmuns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '绑定实例数',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '操作',
                key: 'id',
                render: (text, record) => {
                    return (
                        <Fragment>
                            <a onClick={()=> this.edit(record)}>修改</a>
                            <Divider type='vertical'/>
                            <a onClick={()=> this.bund(record)}>绑定/解绑实例</a>
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
            <div>
                <Bread/>
                <div className={styles.add}>
                    <Button type='primary' style={{marginRight: 20}} onClick={()=> this.add()}><Icon type='plus'/>上传秘钥</Button>
                    <Button type='primary' onClick={()=>this.del()}><Icon type='minus'/>删除秘钥</Button>
                </div>
                <Table
                    columns={colmuns} 
                    dataSource={data}
                    rowSelection={rowSelection}
                    rowKey='id'
                />
                <ModalForm
                    modalVisible={modalVisible}
                    handleModalVisible={this.handleModalVisible}
                    handleSubmit={this.handleSubmit}
                    layout='horizontal'
                    options={this.options || []}
                    editRecord={editRecord}
                    restData={this.restData}
                />
                <Modal
                    visible={bundVisible}
                    title='绑定解绑实例'
                    okText='确定'
                    cancelText='取消'
                    onOk={this._okHandle}
                    onCancel={this._cancelHandle}
                    style={{minWidth: 600}}
                >
                    <Transfer
                        showSearch={true}
                        dataSource={getData}
                        targetKeys={transferTargetKeys}
                        render={item=>item.title}
                        onChange={this.handleChange}
                        rowKey={record => record.id}
                        listStyle={{
                            minHeight: '400px',
                            minWidth: '250px'
                        }}
                        locale={{
                            itemUnit: '项',
                            itemsUnit: '项',
                            notFoundContent: '列表为空',
                            searchPlaceholder: '请输入搜索内容',
                        }}
                        titles={['选择实例','已选择']}
                    />
                </Modal>
            </div>
        )
    }
}