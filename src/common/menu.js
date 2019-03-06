import { isUrl } from '../utils/utils';

export const menu=[
    {
        id:'1',
        name:'总览',
        path:'overview',
        type:"pie-chart",
    },
    {
        id:'2',
        name:'CMDB',
        path:'cmdb',
        type:"database",
        children: [
          {
            id: '2-1',
            name: '主机管理',
            path: 'host',
          },
          {
            id: '2-2',
            name: 'SSH秘钥',
            path: 'pwd',
          }
        ]
    },
    {
        id:'3',
        name:'监控视图',
        path:'monitor',
        type: "security-scan",
        children: [
          {
            id: '3-1',
            name: '监控概览',
            path: 'monitorView',
          }
        ]
    },
    // {
    //   id: '4',
    //   name:'工具视图',
    //   path: 'tool',
    //   type: 'appstore',
    // },
    {
      id: '5',
      name: '账户视图',
      path: 'account',
      type: 'user',
      children: [
        {
          id: '5-1',
          name: '个人信息',
          path: 'personal',
        }
      ]
    }
];
function formatter(data, parentPath = '/') {
    return data.map(item => {
      let { path } = item;
      if (!isUrl(path)) {
        path = parentPath + item.path;
      }
      const result = {
        ...item,
        path,
      };
      if (item.children) {
        result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
      }
      return result;
    });
  }
  
export const getMenuData = () => formatter(menu);