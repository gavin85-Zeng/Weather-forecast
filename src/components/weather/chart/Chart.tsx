import {HourlyEntity} from '../../../model/WeatherInterface'
import * as echarts from 'echarts'
import { kelvinToCelsius, longToMonthWithDate } from '../../../Util';
import Symbol from '../../../character/Symbol';

/**
 * WARNING: There is a chart instance already initialized on the dom. 
 * re-create chart need to dispose old chart
 */

const Chart = (dataObj:HourlyEntity[]) => {
    const chart:HTMLElement | null = document.querySelector('.chart')
    if (chart === null) return

    const dataArray: string[][] = []
    let isC = false
    
    // get 24hours
    dataObj = dataObj.slice(0, 25)

    for (let n of dataObj) {
        const dt = longToMonthWithDate(n.dt)
        let temp = '0'
        if (typeof (n.temp) === 'number') temp = '' + kelvinToCelsius(n.temp)
        dataArray.push([dt, temp])
    }
    
    const option = {
        legend: {}, // empty array will get series defined
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: [{
            type: 'category', gridIndex: 0,
            splitLine: {
                show: false
            },
            boundaryGap: false,
        }],
        yAxis: [{
            gridIndex: 0, 
            splitLine: {
                show: false
            },
            show: false
        }],
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
        }, {
            start: 0,
            end: 100
        }],
        series: [{
            type: 'line',
            // seriesLayoutBy: 'row',
            areaStyle: {},
            smooth: true,
            // label: {
            //     show: true,
            //     formatter: `{@[1]} ${Symbol.getC}`
            // },
            data: dataArray
            
        }],
        // grid: [
            // {bottom: '55%'},
        // ]
    }


    // const chartTheme = require('../chart/chartTheme.json')
    // echarts.registerTheme('roma', chartTheme);
    const tempChart = echarts.init(chart, 'roma')
    tempChart.setOption(option);
    return tempChart
}

export default Chart;