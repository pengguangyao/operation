import React, { PureComponent } from 'react';

import { Form, Modal, Input, Select } from 'antd';
const { TextArea } = Input;

@Form.create()
export default class Modal_Form extends PureComponent {
    static defaultProps = {
        modalVisible: false,
        layout: 'vertical',
        options: [],
        formItemLayout: {},
        editRecord: {},
        restData: ()=>{},
        handleSubmit: ()=>{},
        handleModalVisible: ()=>{},
        title: '操作',
    }
    state = {

    }

    render() {
        const {
            modalVisible,
            layout,
            options,
            form,
            handleModalVisible,
            handleSubmit,
            editRecord,
            restData,
            formItemLayout,
            title,
        } = this.props;

        const { getFieldDecorator } = form;
        const okHandle = () => {
            form.validateFields((errors, values) => {
                if (errors) return;
                handleSubmit(values);
            })
        }

        const cancelHandle = () => {
            handleModalVisible();
            form.resetFields();
            restData();
        }

        const getElement = (item) => {
            let ele;
            switch (item.type) {
                case 'textArea':
                    ele = <TextArea autosize={{ minRows: 6, maxRows: 10 }} />;
                    break;
                case 'select':
                    ele = <Select>
                        {
                            item.options&&item.options.map(item => {
                                return (
                                    <Select.Option key={item.key} value={item.value}>{item.value}</Select.Option>
                                )
                            })
                        }
                    </Select>;
                    break;
                case 'password': 
                        ele = <Input type='password'/>;
                        break;
                default:
                    ele = <Input/>
                    break;
            }
            return ele;
        }

        const confirmPwd = (rule, value, callback, item) => {
            if(item.rule === 'password'){
                if(/^(\w){6,10}$/.test(value)){
                    callback();
                }
                callback('只能输入6-8个字母,数字,下划线')
            }else if(item.rule === 'rePassword'){
                const pwd = form.getFieldValue('pwd');
                if(form.getFieldValue('rePwd') === pwd){
                    callback()
                }
                callback('两次输入密码不一致')
            }else{
                if(value.trim().length === 0&&value.length!==0){
                    callback(`请输入${item.title}`)
                }
                callback();
            }
        }
        return (
        
                <Modal
                    title={title}
                    visible={modalVisible}
                    okText='确定'
                    cancelText='取消'
                    onOk={okHandle}
                    onCancel={cancelHandle}
                >
                    <Form layout={layout}>
                        {
                            options.map(item => {
                                return (
                                    <Form.Item key={item.key} label={item.title} {...formItemLayout}>
                                        {
                                            getFieldDecorator(`${item.key}`, {
                                                rules: [
                                                    { required: !!item.required, message: `请输入${item.title}` },
                                                    { validator: (rule, value, callback) =>confirmPwd(rule, value, callback, item)},
                                                ],
                                                initialValue: editRecord[item.key] ||'',
                                            })(
                                                getElement(item)
                                            )
                                        }
                                    </Form.Item>
                                )
                            })
                        }
                    </Form>
                </Modal>
        )
    }
}