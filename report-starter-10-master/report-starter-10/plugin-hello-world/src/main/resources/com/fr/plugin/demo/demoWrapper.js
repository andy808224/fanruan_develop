demoWrapper = ExtendedChart.extend({

    _init: function (dom, option) {
        var chart = echarts.init(dom);
        //绑定点击触发超链函数
        chart.on('click', this.getLinkFun());
        chart.setOption(option);
        return chart;
    },

    _refresh: function (chart, option) {
        chart.setOption(option);
    },

    _resize: function (chart) {
        chart.resize();
    },

    _exportInit:function (dom, option) {
        option.animation = false;
        return this._init(dom, option);
    },

    _exportImage: function (chart) {
        return chart.getConnectedDataURL({type: 'png'})
    }

});