import React, { PureComponent } from 'react';
import {Breadcrumb} from 'antd';
import {menu, getMenuData} from '../../common/menu';
import styles from './index.less';
import { connect } from 'dva';
@connect(({global}) => ({
    global,
}))
export default class Bread extends PureComponent {
    state = {

    }
   
    render(){
        let father;
        let son;
        let result=[];
        const {path} = this.props.global;
        const arr = (path.slice(1)).split('/');
        father = menu.filter(item => item.path===arr[0])[0].name;
        if(arr.length > 1){
            getMenuData().filter(item => item.children).forEach(ele => {
                result = result.concat(ele.children)
            })
            son = (result.filter(item=>item.path===path)[0].name);
        }
        const getBreadData = () => {
            let breadData;
            if(son){
                breadData = [
                    {
                        'title': father,
                        'href': `/${arr[0]}`
                    },
                    {
                        'title': son,
                        'href': path,
                    }
                ]
            }else{
                breadData = [
                    {
                        'title': father,
                        'href': path,
                    }
                ]
            }
            return breadData;
        }
        return (
            <div className={styles.wrapper}>
                <Breadcrumb>
                    {
                        getBreadData().map(item => {
                            return (
                                <Breadcrumb.Item key={item.title}>{item.title}</Breadcrumb.Item>
                            )
                        })
                    }
                </Breadcrumb>
            </div>
        )
    }
}