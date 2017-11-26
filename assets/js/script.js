$(function () {
    $('#ex1').slider({
        formatter: function (value) {
            return 'Current value: ' + value;
        }
    });

    // TODO: rewrite for updative table
    $('#table_a0').editableTableWidget();

    var d3 = Plotly.d3;
    // var myPlot = document.getElementById('myDiv');

    var x_range = [1, 2];
    var y_range = [0, 1];

    var magic = function (st, x_range, y_range) {
        var table = $('#table_'+st+' tbody');
        var myPlot = new MyPlot1({element: st+'div', x_range: x_range, y_range: y_range});
        myPlot.on('addPoint', function (p) {
            var html = "<tr data-x='" + p.x + "' data-y='" + p.y + "'><td>" + p.x + "</td><td>" + p.y + "</td><td>f</td><td class=\"epsilon-error\">0</td></tr>";

            table.append(html)
        });
        myPlot.on('removePoint', function (resp) {
            var p = resp.point;
            var tr = $('#table_'+st+' tbody tr[data-x="' + p.x + '"][data-y="' + p.y + '"]')[0];

            tr.remove();
        });
    };

    magic("t0",x_range,y_range);
    magic("a0",x_range,y_range);
    magic("a1",x_range,y_range);
    magic("b0",x_range,y_range);
    magic("b1",x_range,y_range);

    var modelingMagic = function (x_range, y_range) {
        var table = $('#table_modeling tbody');
        var addButton = $('#modeling_add');
        var generate1Button = $('#modeling_gen1');
        var generate2Button = $('#modeling_gen2');
        var xInput = $('#add-x').next()[0];
        var yInput = $('#add-y').next()[0];
        var tInput = $('#add-t').next()[0];

        addButton.click(function () {
            x = xInput.value;
            y = yInput.value;
            t = tInput.value;

            if(x=="" || y=="" || t==""){
                return;
            }

            var html = "<tr data-x='" + x + "' data-y='" + y + "' data-t='" + t + "'><td>" + x + "</td><td>" + y + "</td><td>" + t + "</td></tr>";

			var hash = (x+'_'+y+'_'+t) ;
            var node = $($.parseHTML(html));
            node.on("click",function () {
                var tr = $(this);

                var x = tr.attr('data-x');
                // var y = tr.attr('data-y');
                var t = tr.attr('data-t');

                console.log(x,y,t);
				myPlot1.deletePoint(hash) ;

                tr.remove();
            });

            table.append(node);
            xInput.value="";
            yInput.value="";
            tInput.value="";
			
			x = parseFloat(x) ;
			y = parseFloat(y) ;
			t = parseFloat(t) ;
			if(!isNaN(x)&&!isNaN(y)&&!isNaN(t)){
				myPlot1.addPoints([{x:x,z:t,y:y,color:'rgb(100,100,200)',hash:hash}]) ;
			}
        });

        var myPlot1 = new My3dPlot2({element: 'modeling_div', x_range:x_range,y_range:y_range,T:$('#t-input')[0].value,x_title: 'x_title', y_title: 'y_title', z_title:'z_title'});
    };
    modelingMagic(x_range,y_range);

    /*Plotly.newPlot('myDiv', [{
      y: [1, 2, 1],
      line: { shape: 'spline' }
    }])
    .then(gd => {
      gd.on('plotly_click', d => {
        console.log(d.event.clientX)
        console.log(d.event.clientY)
      })
      gd.on('click', d => {
        console.log('hi2') ;
        console.log(d.event.clientX)
        console.log(d.event.clientY)
      })
    })*/

    var trace1 = {
        x: [],
        y: [],
        text: ['Rectangle reference to the plot', 'Rectangle reference to the axes'],
        mode: 'text'
    };
    /*var my3dPlot1 = new My3dPlot1('myDiv')
    my3dPlot1.draw([
    {x:0,y:0,z:1},
    {x:1,y:0,z:1},
    {x:0,y:1,z:1},
    {x:1,y:1,z:5},
    ]) ;*/
    /*var my3dPlot2 = new My3dPlot2({
        element:'myDiv',
        x_range:[0,1],
        y_range:[0,1],
        T:1,
        N_x:4,
        N_y:4,
        N_t:4
    })*/

    /*var layout = {
      title: 'Rectangles Positioned Relative to the Plot and to the Axes',
      xaxis: {
        range: [0, 4],
        showgrid: false
      },
      yaxis: {
        range: [0, 4]
      },
      width: 800,
      height: 600,
      shapes: [

        //Rectangle reference to the axes

        {
          type: 'rect',
          xref: 'x',
          yref: 'y',
          x0: 2.5,
          y0: 0,
          x1: 3.5,
          y1: 2,
          line: {
            color: 'rgb(55, 128, 191)',
            width: 3
          },
          fillcolor: 'rgba(55, 128, 191, 0.6)'
        }
      ]
    };*/

    /*var data = [{
        x: [1,2,3,3,1],
        y: [1,2,3,1,1],
        type: 'tonexty',

    }];*/

    /*Plotly.newPlot('myDiv', data, layout).then(gd => {
          gd.on('plotly_click', d => {
            console.log(d)
            console.log(d.event.clientX)
            console.log(d.event.clientY)
          })


          var xaxis = gd._fullLayout.xaxis;
          var yaxis = gd._fullLayout.yaxis;
          var l = gd._fullLayout.margin.l;
          var t = gd._fullLayout.margin.t;

          gd.addEventListener('click', function(evt) {
            var xInDataCoord = xaxis.p2c(evt.x - l);
            var yInDataCoord = yaxis.p2c(evt.y - t);

            Plotly.relayout(gd, 'title', ['x: ' + xInDataCoord, 'y : ' + yInDataCoord].join('<br>'));
          })
        })*/

    /*var a1 = 0,b1 = 10 ;
    var a2 = 0,b2 = 10 ;
    var T=10 ;
    var N_x1 = 10 ;
    var N_x2 = 10 ;
    var N_t = 10 ;
    var h_x1 = (b1-a1)/N_x1 ;
    var h_x2 = (b2-a2)/N_x2 ;
    var h_t = T/N_t ;
    function getPoints(){
        var points = []	;
        for(var i=0;i<=N_x1;++i){
            var x1 = a1+h_x1*i ;
            for(var j=0;j<=N_x2;++j){
                var x2 = a1+h_x1*j ;
                for(var k=0;k<=N_t;++k){
                    var t = h_t*k ;
                    points.push({x1:x1,x2:x2,t:t}) ;
                }
            }
        }
        return points ;
    }
    var points = getPoints() ;
    var trace = {
    x:points.map(function(p){return p.x1}), y: points.map(function(p){return p.x2}), z: points.map(function(p){return p.t}),
    mode: 'markers',
    marker: {
        color: 'rgb(127, 127, 127)',
        size: 4,
        symbol: 'circle',
        line: {
        color: 'rgb(204, 204, 204)',
        width: 0.1},
        //opacity: 0.8
    },
    type: 'scatter3d'};
    var data = [trace] ;
    var layout = {margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,},scene: {
        xaxis:{title: 'X AXIS TITLE'},
        yaxis:{title: 'Y AXIS TITLE'},
        zaxis:{title: 'Z AXIS TITLE'},
        },
    xaxis: {
    title: 'Year',
    showgrid: true,
    zeroline: false
  },
  yaxis: {
    title: 'Percent',
    showline: false
  }
  };
    Plotly.newPlot('myDiv', data, layout).then(gd => {
      gd.on('plotly_click', d => {
        console.log(d)
      })
    })
    function randomize() {
        console.log('1') ;
        console.log('2') ;
      Plotly.animate('myDiv', {
        data: [
        {x:points.map(function(p){return 2*p.x1}), y: points.map(function(p){return 3*p.x2}), z: points.map(function(p){return 0.3*p.t})}
        ],
        traces: [0],
        layout: {}
      }, {
        transition: {
          duration:1000,
          easing: 'cubic-in-out'
        }
      })
    }
    setTimeout(randomize,5000)*/

    /*var x = [1, 2, 3, 4, 5],
    y = [10, 20, 30, 20, 10],
    data = [{x:x, y:y, type:'scatter',
             mode:'markers', marker:{size:20}
            }];

Plotly.newPlot('myDiv', data);

myPlot.on('plotly_click', function(){
    console.log('1');
    alert('hi') ;
});
myPlot.on('click', function(){
    console.log('2');
});*/
    /*var presets = window.chartColors;
            var utils = Samples.utils;
            var inputs = {
                min: -100,
                max: 100,
                count: 8,
                decimals: 2,
                continuity: 1
            };

            function generateData(config) {
                return utils.numbers(Chart.helpers.merge(inputs, config || {}));
            }

            function generateLabels(config) {
                return utils.months(Chart.helpers.merge({
                    count: inputs.count,
                    section: 3
                }, config || {}));
            }
    var options = {
                maintainAspectRatio: false,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0
                        }
                    }]
                }
            };


            function toggleSmooth(btn) {
                var value = btn.classList.toggle('btn-on');
                Chart.helpers.each(Chart.instances, function(chart) {
                    chart.options.elements.line.tension = value? 0.4 : 0.000001;
                    chart.update();
                });
            }

            function randomize() {
                var seed = utils.rand();
                Chart.helpers.each(Chart.instances, function(chart) {
                    utils.srand(seed);

                    chart.data.datasets.forEach(function(dataset) {
                        dataset.data = generateData();
                    });

                    chart.update();
                });
            }
    new Chart('myDiv', {
                    type: 'line',
                    data: {
                        labels: generateLabels(),
                        datasets: [{
                            backgroundColor: utils.transparentize(presets.red),
                            borderColor: presets.red,
                            data: generateData(),
                            label: 'Dataset',
                            fill: false
                        }]
                    },
                    options:Chart.helpers.merge(options, {
                        title: {
                            text: 'fill',
                            display: true
                        }
                    })
                });*/
});
