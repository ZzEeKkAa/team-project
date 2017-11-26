$('#ex1').slider({
    formatter: function(value) {
        return 'Current value: ' + value;
    }
});

$('#table').editableTableWidget();

/*
data = {
	element:'myDiv',
	x_range:[0,1],
	y_range:[0,1]
}
*/
var MyPlot1 = function(config) {
    EventEmitter.call(this);
    this.config = config;
    this.gd = document.getElementById(config.element) ;
    this.points = [] ;
    var self = this ;
    Plotly.newPlot(self.gd, [{
        type: 'tonexty',
    }], {
        //margin: {
        //	l: 0,
        //	r: 0,
        //	b: 0,
        //	t: 0
        //},
        hovermode:'closest',
        xaxis:{
            autorange:true,
            zeroline:true,
        },
        yaxis:{
            autorange:true,
            zeroline:true
        },
        showlegend: false,
        shapes: [
            {
                type: 'rect',
                xref: 'x',
                yref: 'y',
                x0: config.x_range[0],
                y0: config.y_range[0],
                x1: config.x_range[1],
                y1: config.y_range[1],
                line: {
                    color: 'rgb(55, 128, 191)',
                    width: 0
                },
                fillcolor: 'rgba(55, 128, 191, 0.6)'
            }
        ]
    },{	staticPlot: false}).then(gd => {
        gd.on('plotly_click', d => {
        console.log(d)
    console.log(d.event.clientX)
    console.log(d.event.clientY)
    console.log(d&&d.points&&d.points.length&&d.points[0]&&d.points[0].curveNumber)
    if(d&&d.points&&d.points.length&&d.points[0]&&d.points[0].curveNumber){
        console.log('here')
        self.deletePoint(d.points[0].curveNumber) ;
    }
})

    var xaxis = gd._fullLayout.xaxis;
    var yaxis = gd._fullLayout.yaxis;


    gd.addEventListener('click', function(evt) {
        console.log(evt) ;
        var l = gd._fullLayout.margin.l;
        var t = gd._fullLayout.margin.t;
        var element_l = $(gd).offset().left ;
        var element_t = $(gd).offset().top ;
        var xInDataCoord = gd._fullLayout.xaxis.p2c(evt.pageX - gd._fullLayout.margin.l - element_l);
        var yInDataCoord = gd._fullLayout.yaxis.p2c(evt.pageY - gd._fullLayout.margin.t - element_t);

        if(config.x_range[0] <=xInDataCoord && xInDataCoord <= config.x_range[1] && config.y_range[0] <=yInDataCoord && yInDataCoord <= config.y_range[1]){
            console.log('x: ' + xInDataCoord, 'y : ' + yInDataCoord) ;
            self.addPoint(xInDataCoord,yInDataCoord) ;
        }
    })
    gd.addEventListener('mousemove', function(evt) {
        var l = gd._fullLayout.margin.l;
        var t = gd._fullLayout.margin.t;
        var element_l = $(gd).offset().left ;
        var element_t = $(gd).offset().top ;
        var xInDataCoord = xaxis.p2c(evt.pageX - l - element_l);
        var yInDataCoord = yaxis.p2c(evt.pageY - t - element_t	);
        if(true || config.x_range[0] <=xInDataCoord && xInDataCoord <= config.x_range[1] && config.y_range[0] <=yInDataCoord && yInDataCoord <= config.y_range[1]){
            Plotly.relayout(gd, 'title', ['x: ' + xInDataCoord, 'y : ' + yInDataCoord].join('<br>'));
        }
    })
})
}
util.inherits(MyPlot1, EventEmitter);
MyPlot1.prototype.addPoint = function(x,y){
    var self = this ;
    var point = {x:x,y:y} ;
    self.points.push(point) ;
    Plotly.addTraces(self.gd, [{
        x:[point.x],
        y:[point.y],
        type:'scatter',
        marker: {color: '#FF0000',size:8},
        name:''
    }]);
    self.emit('addPoint',point) ;
} ;
MyPlot1.prototype.deletePoint = function(i){
    var self = this ;
    var point = self.points.splice(i,1)[0] ;
    Plotly.deleteTraces(self.gd, i);
    self.emit('removePoint',{ind:i,point:point}) ;
} ;
MyPlot1.prototype.redraw = function(){
    var self = this ;
    Plotly.redraw(self.gd);
} ;
var My3dPlot1 = function(element) {
    EventEmitter.call(this);
    this.gd = document.getElementById(element) ;
    this.points = [] ;
    var self = this ;
    Plotly.newPlot(self.gd, [{
        opacity:0.8,
        color:'rgb(300,100,200)',
        x:[0,1,0,1],
        y:[0,0,1,1],
        z:[0,1,1,2],
        type: 'mesh3d',
    }], {
        //margin: {
        //	l: 0,
        //	r: 0,
        //	b: 0,
        //	t: 0
        //},
        hovermode:'closest',
        xaxis:{
            autorange:true,
            zeroline:true,
        },
        yaxis:{
            autorange:true,
            zeroline:true
        },
        zaxis:{
            autorange:true,
            zeroline:true
        },
        showlegend: false
    },{	staticPlot: false})
}
util.inherits(My3dPlot1, EventEmitter);
My3dPlot1.prototype.draw = function(points){
    var self = this ;
    Plotly.deleteTraces(self.gd,0) ;
    Plotly.addTraces(self.gd,{
        opacity:0.8,
        color:'rgb(300,100,200)',
        x:points.map(function(p){return p.x}),
        y:points.map(function(p){return p.y}),
        z:points.map(function(p){return p.z}),
        type: 'mesh3d',
    });
} ;
var My3dPlot2 = function(config) {
    EventEmitter.call(this);
    this.config = config ;
    this.gd = document.getElementById(config.element) ;
    var points = []	;
    function getRectPoints(a1,b1,N_x,a2,b2,N_y,a3,b3,N_z,type){
        var points = [] ;
        var h_x = (b1-a1)/N_x ;
        var h_y = (b2-a2)/N_y ;
        var h_z = (b3-a3)/N_z ;
        console.log(a1,b1,N_x,a2,b2,N_y,a3,b3,N_z,type) ;
        for(var i=0;i<=N_x;++i){
            var x = a1+h_x*i ;
            for(var j=0;j<=N_y;++j){
                var y = a2+h_y*j ;
                for(var k=0;k<=N_z;++k){
                    var z = a3+h_z*k ;
                    points.push({x:x,y:y,z:z,type:type}) ;
                }
            }
        }
        console.log(points.length) ;
        return points ;
    }
    var a1 = config.x_range[0] ;
    var b1 = config.x_range[1] ;
    var a2 = config.y_range[0] ;
    var b2 = config.y_range[1] ;
    var T = config.T ;
    var N_x = config.N_x ;
    var N_y = config.N_y ;
    var N_t = config.N_t ;
    var h_x = (b1-a1)/N_x ;
    var h_y = (b2-a2)/N_y ;
    var h_z = T/N_t ;
    points = points.concat(getRectPoints(a1,b1,N_x,a2,b2,N_y,h_z,T,N_t-1,'S_0_T')) ;
    points = points.concat(getRectPoints(a1,b1,N_x,a2,b2,N_y,-T,0,N_t,'S__0')) ;
    points = points.concat(getRectPoints(a1-(b1-a1),a1-h_x,N_x-1,
        a2,b2,N_y,
        h_z,T,N_t-1,
        'S__G')) ;
    points = points.concat(getRectPoints(b1+(b1-a1),b1+h_x,N_x-1,
        a2,b2,N_y,
        h_z,T,N_t-1,
        'S__G')) ;
    points = points.concat(getRectPoints(a1,b1,N_x,
        a2-(b2-a2),a2-h_y,N_y-1,
        h_z,T,N_t-1,
        'S__G')) ;
    points = points.concat(getRectPoints(a1,b1,N_x,
        b2+(b2-a2),b2+h_y,N_y-1,
        h_z,T,N_t-1,
        'S__G')) ;
    points = points.concat(getRectPoints(a1-(b1-a1),a1-h_x,N_x-1,
        a2-(b2-a2),a2-h_y,N_y-1,
        h_z,T,N_t-1,
        'S__G')) ;
    points = points.concat(getRectPoints(b1+(b1-a1),b1+h_x,N_x-1,
        a2-(b2-a2),a2-h_y,N_y-1,
        h_z,T,N_t-1,
        'S__G')) ;
    points = points.concat(getRectPoints(a1-(b1-a1),a1-h_x,N_x-1,
        b2+(b2-a2),b2+h_y,N_y-1,
        h_z,T,N_t-1,
        'S__G')) ;
    points = points.concat(getRectPoints(b1+(b1-a1),b1+h_x,N_x-1,
        b2+(b2-a2),b2+h_y,N_y-1,
        h_z,T,N_t-1,
        'S__G')) ;


    this.points = points ;
    var self = this ;

    var trace = {
        x:points.map(function(p){return p.x}), y: points.map(function(p){return p.y}), z: points.map(function(p){return p.z}),
        mode: 'markers',
        opacity:0.8,
        marker: {
            color: points.map(function(p,ind){
                return (p.type==='S__G')?'black':(p.type==='S__0')?'green':'blue' ;
            }),
            size: 4,
            symbol: 'circle',
            line: {width: 0},
            //opacity: 0.8
        },
        type: 'scatter3d'
    };
    var data = [trace] ;
    var layout = {
        //margin: {
        //	l: 0,
        //	r: 0,
        //	b: 0,
        //	t: 0
        //},
        scene: {
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
    Plotly.newPlot(self.gd, data, layout).then(gd => {
        gd.on('plotly_click', d => {
        console.log(d)
})
})
}
util.inherits(My3dPlot2, EventEmitter);
My3dPlot2.prototype.togglePoint = function(points){
    var self = this ;
    Plotly.deleteTraces('myDiv',0) ;
    Plotly.addTraces('myDiv',{
        opacity:0.8,
        color:'rgb(300,100,200)',
        x:points.map(function(p){return p.x}),
        y:points.map(function(p){return p.y}),
        z:points.map(function(p){return p.z}),
        type: 'mesh3d',
    });
} ;

// initial data..
/*z1 = [
    [8.83,8.89,8.81,8.87,8.9,8.87],
    [8.89,8.94,8.85,8.94,8.96,8.92],
    [8.84,8.9,8.82,8.92,8.93,8.91],
    [8.79,8.85,8.79,8.9,8.94,8.92],
    [8.79,8.88,8.81,8.9,8.95,8.92],
    [8.8,8.82,8.78,8.91,8.94,8.92],
    [8.75,8.78,8.77,8.91,8.95,8.92],
    [8.8,8.8,8.77,8.91,8.95,8.94],
    [8.74,8.81,8.76,8.93,8.98,8.99],
    [8.89,8.99,8.92,9.1,9.13,9.11],
    [8.97,8.97,8.91,9.09,9.11,9.11],
    [9.04,9.08,9.05,9.25,9.28,9.27],
    [9,9.01,9,9.2,9.23,9.2],
    [8.99,8.99,8.98,9.18,9.2,9.19],
    [8.93,8.97,8.97,9.18,9.2,9.18]
];
// generating data for other traces..
z2 = [];
for (var i=0;i<z1.length;i++ ) {
    z2_row = [];
    for(var j=0;j<z1[i].length;j++) {
        z2_row.push(z1[i][j]+1);
    }
    z2.push(z2_row);
}

z3 = []
for (var i=0;i<z1.length;i++ ) {
    z3_row = [];
    for(var j=0;j<z1[i].length;j++) {
        z3_row.push(z1[i][j]-1);
    }
    z3.push(z3_row);
}

// creating data objects..
var data_z1 = {z: z1, type: 'surface'};
var data_z2 = {z: z2, showscale: false, opacity:0.9, type: 'surface'};
var data_z3 = {z: z3, showscale: false, opacity:0.9, type: 'surface'};

// Plotting the surfaces..
Plotly.newPlot('myDiv', [data_z1, data_z2, data_z3]);*/

$(function(){
    var d3 = Plotly.d3;
    // var myPlot = document.getElementById('myDiv');
    var table_a0 = $('#table_a0 tbody');
    var myPlot = new MyPlot1({element:'a0div',x_range:[1,2],y_range:[0,1]}) ;
    myPlot.on('addPoint',function(p){
        var html = "<tr data-x='"+p.x+"' data-y='"+p.y+"'><td>"+p.x+"</td><td>"+p.y+"</td><td>f</td><td class=\"epsilon-error\">0</td></tr>";
        table_a0.append(html)
    });
    myPlot.on('removePoint',function(resp){
        console.log(resp)
        var i = resp.ind;
        var p = resp.point;

        var tr = $('#table_a0 tbody tr[data-x="'+p.x+'"]');

        console.log(tr.innerHTML);
    });
    // myPlot.on('deletePoint',function...)


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
    var my3dPlot2 = new My3dPlot2({
        element:'myDiv',
        x_range:[0,1],
        y_range:[0,1],
        T:1,
        N_x:4,
        N_y:4,
        N_t:4
    })

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
