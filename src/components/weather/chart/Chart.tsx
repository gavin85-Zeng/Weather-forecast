import {IHourlyEntity} from '../../../model/WeatherInterface'
import * as echarts from 'echarts'
import { kelvinToCelsius, longToMonthWithDate } from '../../../Util';
import Symbol from '../../../character/Symbol';

/**
 * WARNING: There is a chart instance already initialized on the dom. 
 * re-create chart need to dispose old chart
 */
const Chart = (dataObj:IHourlyEntity[], nodeClassName:string) => {
    const chart:HTMLElement | null = document.querySelector(`.${nodeClassName}`)
    if (chart === null) return

    const tempArray: (string|number)[][] = []
    const feelArray: (string|number)[][] = []
    const humArray: (string|number)[][] = []
    let isC = false
    
    // get 24hours
    dataObj = dataObj.slice(0, 25)

    for (let n of dataObj) {
        const dt = longToMonthWithDate(n.dt)
        let temp = 0, feel = 0, hum = 0
        if (typeof (n.temp) === 'number') temp = kelvinToCelsius(n.temp)
        if (typeof (n.feels_like) === 'number') feel = kelvinToCelsius(n.feels_like)
        if (typeof (n.humidity) === 'number')  hum = n.humidity
        tempArray.push([dt, temp])
        feelArray.push([dt, feel])
        humArray.push([dt, hum])
    }
    
    const option = {
        legend: {
            data: ['Temperature', 'Feel like', 'Humidity']
        }, // empty array will get series defined
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
            }
        },
        grid: { 
            left: '5%',
            right: '5%',
            containLabel: true 
        },
        xAxis: [{
            type: 'category',
            gridIndex: 0,
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
            name: 'Temperature',
            type: 'line',
            smooth: true,
            // emphasis: {
            //     focus: 'series'
            // },
            // label: {
            //     show: true,
            //     formatter: `{@[1]} ${Symbol.getC}`
            // },
            data: tempArray
            
        },
        {
            name: 'Feel like',
            type: 'line',
            smooth: true,
            data: feelArray
        },
        {
            name: 'Humidity',
            type: 'line',
            smooth: true,
            data: humArray
        }],
    }


    // const chartTheme = require('../chart/chartTheme.json')
    // echarts.registerTheme('roma', chartTheme);
    const tempChart = echarts.init(chart, 'roma')
    tempChart.setOption(option);
    return tempChart
}

export default Chart;