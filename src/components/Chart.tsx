import {IDailyEntity, IFeelsLike, IHourlyEntity, ITemp} from '../model/WeatherInterface'
import * as echarts from 'echarts'
import { kelvinToCelsius, longToMonthWithDate } from '../Util';
import React, { CSSProperties, useEffect, useState } from 'react';
import { ECharts } from 'echarts';


export const SevenDayChart = (props: {daily: IDailyEntity[]}) => {
    const { daily } = props;
    const [chart, setChart] = useState<ECharts>();

    function createChart(container: HTMLElement) {
        daily.slice(0, 7);
        const _rawData = [["Time", "Temperature", "Humidity", "POP", "Feellike"]];
        for (let n of daily) {
            const dt = longToMonthWithDate(n.dt);
            const temp = Math.round((n.temp as ITemp).day).toString();
            const hum = (n.humidity as number).toString();
            const pop = (n.pop * 100).toString();
            const feel = Math.round((n.feels_like as IFeelsLike).day).toString();
            _rawData.push([dt, temp, hum, pop, feel]);
        }

        const option = {
            dataset: [
                {
                    id: "dataset_raw",
                    source: _rawData
                }
            ],
            tooltip: {
                trigger: 'axis',
            },
            grid: { 
                left: '5%',
                right: '5%',
                containLabel: true 
            },
            xAxis: [
                {
                    type: "category",
                    nameLocation: "middle"
                }
            ],
            yAxis: {
                name: "Temperature"
            },
            series: [
                {
                    type: "line",
                    datasetId: "dataset_raw",
                    showSymbol: false,
                    encode: {
                        x: "Time",
                        y: "Temperature",
                        itemName: "Time",
                        tooltip: ["Temperature", "Humidity", "POP", "Feellike"]
                    }
                },
            ]
        }
        const tempChart = echarts.init(container, 'roma')
        tempChart.setOption(option);
        setChart(tempChart);
        return tempChart;
    }

    useEffect(() => {
        const container: HTMLElement | null = document.querySelector("#daily-container");
        if (chart !== null && chart !== undefined) {
            chart.dispose();
        }
        if (container !== null) {
            createChart(container);
        }
    }, [daily])
    
    useEffect(() => {
        function setResize() {
            if (chart !== undefined) {
                chart.resize();
            }
        }
        window.addEventListener('resize', setResize);
        return () => window.removeEventListener("resize", setResize);
    }, [chart])

    const style: CSSProperties = {
        padding: "8px", 
        borderRadius: "40px",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        color: "grey.800",
        height: "400px",
        width: "100%"
    }

    return (
        <div id="daily-container" style={style}>
        </div>
    )
}

/**
 * @deprecated
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


    const tempChart = echarts.init(chart, 'roma')
    tempChart.setOption(option);
    return tempChart
}

export default SevenDayChart;