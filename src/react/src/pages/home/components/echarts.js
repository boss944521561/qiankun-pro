import * as echarts from 'echarts';

/**
 * @title 渐变堆叠面积图
 */
export const echarts_duidie = data => {
    const top = ["首页", "列表页", "详情页", "XX页", "XXX页"];
    const topData = {
        "首页": [],
        "列表页": [],
        "详情页": []
    };
    const bottom = [];
    // console.log(12345,data)
    for ( let v in data.weekBase){
        bottom.unshift(data.days[new Date(v).getDay()]);
        if(data.weekBase[v].length){
            data.weekBase[v].map(v2=>{
                if (v2.a.indexOf("http://localhost:8081/bgshchina/index.html#/bgshChinaInland") !== -1) {
                    topData["首页"].push(v2.i)
                }
                if (v2.a.indexOf("http://localhost:8081/hotel/index.html?showWETitle=false#/list") !== -1) {
                    topData["列表页"].push(v2.i)
                }
                if (v2.a.indexOf("http://localhost:8081/hotel/index.html?showWETitle=false#/detail") !== -1) {
                    topData["详情页"].push(v2.i)
                }
            })
        }
    }
    // 基于准备好的dom，初始化echarts实例
    const chart = echarts.init(document.getElementById('echarts_duidie'));
    const option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
            text: '白屏时间'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: top
        },
        toolbox: {
            feature: {
                saveAsImage: {}
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
                boundaryGap: false,
                data: bottom
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '首页',
                type: 'line',
                stack: '总量',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(128, 255, 165)'
                    }, {
                        offset: 1,
                        color: 'rgba(1, 191, 236)'
                    }])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250] // topData["首页"]
            },
            {
                name: '列表页',
                type: 'line',
                stack: '总量',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 221, 255)'
                    }, {
                        offset: 1,
                        color: 'rgba(77, 119, 255)'
                    }])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310] // topData["列表页"]
            },
            {
                name: '详情页',
                type: 'line',
                stack: '总量',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(55, 162, 255)'
                    }, {
                        offset: 1,
                        color: 'rgba(116, 21, 219)'
                    }])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [132, 132, 132, 334, 190, 130, 220] // topData["详情页"]
            },
            {
                name: 'XX页',
                type: 'line',
                stack: '总量',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255, 0, 135)'
                    }, {
                        offset: 1,
                        color: 'rgba(135, 0, 157)'
                    }])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 402, 231, 134, 190, 230, 120] // topData["首页"]
            },
            {
                name: 'XXX页',
                type: 'line',
                stack: '总量',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255, 191, 0)'
                    }, {
                        offset: 1,
                        color: 'rgba(224, 62, 76)'
                    }])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150] // topData["列表页"]
            }
        ]
    };
    
    chart.setOption(option);
    handleResize(chart);
};

// charts resize
const handleResize = chart => {
    const container = document.getElementById("echarts_iframe");
    if(!container) return;
    const echartsResize = () => {
        chart.resize();
    }
    container.contentWindow.addEventListener('resize', echartsResize);
}