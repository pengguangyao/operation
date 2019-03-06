import React, { PureComponent, Fragment } from 'react';

import {Icon, Table} from 'antd';
import styles from './index.less';
import Bread from '../../components/Breadcrumb';
const data = [];
for(let i=0; i<5; i++){
    data.push({
        id: i,
        status: '运行中',
        projectName: `项目${i+1}`,
        type: 'HTTP',
        fps: '5min',
    })
}
export default class Monitor extends PureComponent{
    state = {
        selectedRowKeys: [],
    }

    componentDidMount(){

    }

    onSelectChange = (keys) => {
        this.setState({
            selectedRowKeys: keys,
        })
    }

    render(){

        const {selectedRowKeys} = this.state;
        const colmuns = [
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '监控项目名称',
                dataIndex: 'projectName',
                key: 'projectName',
            },
            {
                title: '监控类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '监控频率',
                dataIndex: 'fps',
                key: 'fps',
            },
            {
                title: '操作',
                key: 'id',
                render: (text, record) => {
                    return (
                        <Fragment>
                            <span>删除</span>
                        </Fragment>
                    )
                }
            }
        ]

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        return (
            <Fragment>
                <Bread/>
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <div className={styles.text}>
                            全部类型
                        </div>
                        <div className={styles.list}>
                            <ul>
                                <li><a>http/https</a></li>
                                <li><a>Process/Port</a></li>
                                <li><a>ping</a></li>
                                <li><a>LogMessage</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.headernav}>
                            <span>
                                <Icon type="table" style={{marginRight: 15}}/>综合
                            </span>
                            <span>
                                <Icon type='minus' style={{marginRight: 15}}/>最后状态
                            </span>
                        </div>
                        <Table
                            columns={colmuns}
                            dataSource={data}
                            rowSelection={rowSelection}
                            rowKey='id'
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

