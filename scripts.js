Highcharts.getJSON(
    'CR1000_CL_Creeks_Modem_StreamData_Training.json',
    function (data) {

        // make an object of
        // key: lake tributaries (Kelsey, Middle or Scotts)
        // value: [TmStamp, Turb_Mean]
        // TmStamp: in milliseconds
        // Turb_Mean: in floats
        result = data.reduce(function (r, a) {
            r[a.RD_Creek] = r[a.RD_Creek] || [];
            r[a.RD_Creek].push([new Date(a.TmStamp).getTime(), parseFloat(a.Turb_Mean)]);
            return r;
        }, Object.create(null));
        console.log(result);
  
        Highcharts.chart('container', {
            chart: {
            zoomType: 'x'
            },
            title: {
            text: 'Stream Monitoring'
            },
            subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
            type: 'datetime'
            },
            yAxis: {
            title: {
                text: 'Turbity Mean'
            }
            },
            legend: {
            enabled: false
            },
            plotOptions: {
            area: {
                fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
                },
                marker: {
                radius: 2
                },
                lineWidth: 1,
                states: {
                hover: {
                    lineWidth: 1
                }
                },
                threshold: null
            }
            },
    
            series: [
                {
                    type: 'area',
                    name: 'Turb Mean Middle',
                    data: result.Middle,
                }, 
                // {
                //     type: 'area',
                //     name: 'Turb Mean Kelsey',
                //     data: result.Kelsey,
                // },
                // {
                //     type: 'area',
                //     name: 'Turb Mean Scotts',
                //     data: result.Scotts,
                // }
            ]
        });
    }
);






        
          
        