// const chart = Highcharts.chart('container', {
//     series: [{
//       data: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54]
// }]
// });

// const dropdown = document.querySelector("#dropdown");

// dropdown.addEventListener('change', (event) => {
// let value = event.target.value,
//     oldData = [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
//     data2 = [22, 45, 88, 37, 52, 73, 89, 90, 43, 66, 24, 74];
// if (value === 'Series2') {
//     chart.series[0].update({
//     data: data2
//     })
// } else {
//     chart.series[0].update({
//     data: oldData
//     })
// }
// });



var url = new URL('https://tepfsail50.execute-api.us-west-2.amazonaws.com/v1/report/cl-creeks?id=1&rptdate=20220202&rptend=20220202');

// fetch(url)
//     .then(res => res.json())
//     .then((out) => {
//         console.log('Output: ', out);
//         data = out;
// }).catch(err => console.error(err));

async function apiGetAll (url) {
    try {
      const resp = await fetch(url)
      
        .then(response => response.json())
        .then(data => console.log("WWWWW", data));
      
    
      return resp;
    } catch (err) {
         console.log(err)
      }
 }





var search_params = url.searchParams;

// add "topic" parameter
search_params.set('id', '2');

url.search = search_params.toString();

var new_url = url.toString();

// output : http://demourl.com/path?cl-creeks?id=2&rptdate=20220202&rptend=20220202
console.log("new url: ",new_url);

fetch(new_url)
    .then(res => res.json())
    .then((out) => {
        console.log('Output: ', out);
}).catch(err => console.error(err));



var data = [{"Creek": "Kelsey", "TmStamp": "2022-02-02 23:50:00", "RecNum": "146653", "Turb_BES": "0.12", "Turb_Mean": "0.12", "Turb_Median": "0.12", "Turb_Var": "0.0", "Turb_Min": "0.05", "Turb_Max": "0.15", "Turb_Temp": "6.9"}, 
{"Creek": "Kelsey", "TmStamp": "2022-02-02 23:40:00", "RecNum": "146652", "Turb_BES": "0.09", "Turb_Mean": "0.09", "Turb_Median": "0.1", "Turb_Var": "0.0", "Turb_Min": "0.03", "Turb_Max": "0.12", "Turb_Temp": "6.8"}];
getTurbMean(data, "Kelsey");
getTurbTemp(data, "Kelsey");


// value: [TmStamp, Turb_Mean]
// TmStamp: in milliseconds
// Turb_Mean: in floats
function getTurbMean(data, creek) {
    let m = [];
    data.forEach((element =>
        m.push([new Date(element.TmStamp).getTime(), parseFloat(element.Turb_Mean)]))
    );
    return m;
}

// value: [TmStamp, Turb_Temp]
// TmStamp: in milliseconds
// Turb_Mean: in floats
function getTurbTemp(data, creek) {
    let m = [];
    data.forEach((element =>
        m.push([new Date(element.TmStamp).getTime(), parseFloat(element.Turb_Temp)]))
    );
    return m;
}

console.log(getTurbTemp(data, "Kelsey"));
console.log(getTurbMean(data, "Kelsey"));

const chart = Highcharts.chart('container', {
    chart: {
        zoomType: 'x'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    title: {
        text: 'Kelsey Turb Mean'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Turbity Mean'
        }
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
        }, 
        
    },


    series: [
        {
            type: 'area',
            name: 'Kelsey',
            data: getTurbMean(data, "Kelsey"),
            selected: true
        }
    ],
    updateTime: {
        setTime: 0,
        endTime: 0,
    }
    ,
});





const dropdown = document.querySelector("#dropdown");

dropdown.addEventListener('change', (event) => {
  let value = event.target.value
  if (value === 'turb-mean') {
    chart.series[0].update({
        data: getTurbMean(data, "Kelsey")
    }),
    chart.setTitle({text: "Kelsey Turb Mean"}),
    //chart.yAxis({title: {text: 'Turbity Mean'}})
    chart.update({
        yAxis: [{
          title: {
            text: 'Turbity Mean'
          }
        }]
      });
    
  } else {
    chart.series[0].update({
      data: getTurbTemp(data, "Kelsey")
    }),
    chart.setTitle({text: "Kelsey Turb Temp"}),
    // chart.yAxis({title: {text: 'Turbity Temperature'}})
    chart.update({
        yAxis: [{
          title: {
            text: 'Turbity Tempurature in Celsius'
          }
        }]
      });
  }
});

// // const fromTimePicker = document.querySelector("#from-time");
// // const toTimePicker = document.querySelector("#to-time");
// const timeButton = document.querySelector("#time-button");

// function hello() {
//     //document.getElementById("demo").innerHTML = "Hello World";
//     const fromTimePicker = document.querySelector("#from-time");
//     const toTimePicker = document.querySelector("#to-time");
//     console.log(fromTimePicker);
//     console.log(toTimePicker);
//     console.log("hello");
//   }

// timeButton.addEventListener('change', (event) => {
//     let value = event.target.value
//     const fromTimePicker = document.querySelector("#from-time");
//     const toTimePicker = document.querySelector("#to-time");
//     console.log(fromTimePicker);
//     console.log(toTimePicker);
//     console.log("hello");
//     return value
// })

const form = document.querySelector("#signup");

form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();
    console.log("setTime",chart.updateTime)
	// get inputted time
	var toTime = form.elements["from-time"].value;
    //chart.updateTime.setTime = toTime;
	var fromTime = form.elements["to-time"].value;
    //chart.updateTime.endTime = fromTime
    //console.log("setTime",chart.updateTime.setTime)
    //hello(toTime, fromTime);

});

function hello(to, from) {
    return to, from;
}





  
        // const chart = Highcharts.chart('container', {
        
        //     // plotOptions: {
        //     //     area: {
        //     //         fillColor: {
        //     //         linearGradient: {
        //     //             x1: 0,
        //     //             y1: 0,
        //     //             x2: 0,
        //     //             y2: 1
        //     //         },
        //     //         stops: [
        //     //             [0, Highcharts.getOptions().colors[0]],
        //     //             [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        //     //         ]
        //     //         },
        //     //         marker: {
        //     //         radius: 2
        //     //         },
        //     //         lineWidth: 1,
        //     //         states: {
        //     //         hover: {
        //     //             lineWidth: 1
        //     //         }
        //     //         },
        //     //         threshold: null
        //     //     }, 
                
        //     // },
    
        //     series: [
        //         {
        //             type: 'area',
        //             name: 'Kelsey',
        //             data: turbMean.Kelsey,
        //             selected: false
        //         }, 
        //         // {
        //         //     type: 'area',
        //         //     name: 'Kelsey',
        //         //     data: turbTemp.Kelsey,
        //         //     selected: false
        //         // }, 
        //         // {
        //         //     type: 'area',
        //         //     name: 'Middle',
        //         //     data: turbMean.Middle,
        //         //     selected: false
        //         // }, 
        //         // {
        //         //     type: 'area',
        //         //     name: 'Scotts',
        //         //     data: turbMean.Scotts,
        //         //     selected: false
        //         // }
        //     ]
        // });

        




        
          
        