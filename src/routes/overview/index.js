import React, { PureComponent } from 'react';


import styles from './index.less';
import Bread from '../../components/Breadcrumb';

import echarts  from 'echarts/lib/echarts';
import "echarts/lib/chart/line";
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import "echarts/lib/chart/pie";
export default class Overview extends PureComponent{
    constructor(){
        super();
        this.state = {
            num: 0,
        }
    }

    
    componentDidMount(){
        let option1 = {
            tooltip: {},
            xAxis: {
                type: 'category',
                data: ['2019-02-11', '2019-02-12', '2019-02-13', '2019-02-14', '2019-02-15'],
                // boundaryGap: false,
                // axisLabel: {
                //     rotate: 30,
                //     interVal: 0,
                // }
            },
            title: {
                text: '近期主机增加数量折线图',
                x: 'center',
                top: '10px',
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '增加数量',
                data: [2, 5, 3, 10, 4],
                type: 'line',
                // symbol:'none',
                symbolSize: 12,
            }]
        };

        let option2 = {
            tooltip: {
                trigger: 'axis',
                showContent: false,
            },
            title: {
                text: '报警数据结构',
                x: 'center',
                top: '10px',
            },
            series: [
                {
                    type: 'pie',
                    radius: '55%',
                    data: [
                        {value: 20, name: '基础报警'},
                        {value: 35, name: '业务报警'},
                        {value: 45, name: '误报警'},
                    ],
                    label: {
                        formatter: '{b} : {c} ({d}%)',
                    }
                }
            ]
        }
        this.myChart1 = this.chartsInit(document.getElementById('chart1'),option1);
        this.myChart2 = this.chartsInit(document.getElementById('chart2'),option2);
        window.addEventListener('resize', this.resize);
    }
    
    chartsInit = (dom,option) => {
        let chart = echarts.init(dom);
        chart.setOption(option);
        return chart;
    }

    resize = () => {
        if(this.timer){
            cancelAnimationFrame(this.timer);
        }
        this.timer = window.requestAnimationFrame(this.chartResiz);
    }

    chartResiz = () => {
        this.myChart1.resize();
        this.myChart2.resize();
    }

    componentWillUnmount(){
        if(this.timer){
            cancelAnimationFrame(this.timer);
        }
    }
    render(){
        return (
            <div className={styles.wrapper}>
                <Bread/>
                <div className={styles.head}>
                    <div className={`${styles.alert} ${styles.content}`}>
                        <p>报警数量</p>
                        <span>100</span>
                    </div>
                    <div className={styles.content}>
                        <p>主机数量</p>
                        <span>500</span>
                    </div>
                </div>
                <div className={styles.chartContent}>
                    <div id='chart1' className={styles.chart1}></div>
                    <div id='chart2' className={styles.chart2}></div>
                </div>
            </div>
        )
    }
}