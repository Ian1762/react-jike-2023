// 柱状图组件
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
// 1.把功能代码都放到这个组件中
// 2.把可变部分抽象成prop参数

const BarChart = ({ title }) => {
    const chrtRef = useRef(null);
    useEffect(() => {
        // 在这里保证dom节点可用
        // 1.获取dom节点
        const chartDom = chrtRef.current;
        // 2. 初始化echarts实例
        const myChart = echarts.init(chartDom);

        // 3. 配置图表
        const option = {
            title: {
                text: title,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Vue', 'React', 'Angular'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 40, 70]
                }
            ]
        };

        // 4. 渲染图表
        option && myChart.setOption(option);
    }, [title])
    return <div ref={chrtRef} style={{ width: '600px', height: '400px' }}></div>
}

export default BarChart;