var MyPlot1 = function (config) {
    EventEmitter.call(this);
    this.config = config;
    this.gd = document.getElementById(config.element);
    this.points = [];
    var self = this;
    Plotly.newPlot(self.gd, [{
        type: 'tonexty',
    }], {
        //margin: {
        //	l: 0,
        //	r: 0,
        //	b: 0,
        //	t: 0
        //},
        hovermode: 'closest',
        xaxis: {
            title: config.x_title || '',
            autorange: true,
            zeroline: true,
        },
        yaxis: {
            title: config.y_title || '',
            autorange: true,
            zeroline: true
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
    }, {staticPlot: false}).then(function (gd) {
        gd.on('plotly_click', function (d) {
            console.log(d);
            console.log(d.event.clientX);
            console.log(d.event.clientY);
            console.log(d && d.points && d.points.length && d.points[0] && d.points[0].curveNumber);
            if (d && d.points && d.points.length && d.points[0] && d.points[0].curveNumber) {
                console.log('here');
                self.deletePoint(d.points[0].curveNumber);
            }
        });

        var xaxis = gd._fullLayout.xaxis;
        var yaxis = gd._fullLayout.yaxis;

        gd.addEventListener('click', function (evt) {
            console.log(evt);
            var l = gd._fullLayout.margin.l;
            var t = gd._fullLayout.margin.t;
            var element_l = $(gd).offset().left;
            var element_t = $(gd).offset().top;
            var xInDataCoord = gd._fullLayout.xaxis.p2c(evt.pageX - gd._fullLayout.margin.l - element_l);
            var yInDataCoord = gd._fullLayout.yaxis.p2c(evt.pageY - gd._fullLayout.margin.t - element_t);

            if (config.x_range[0] <= xInDataCoord && xInDataCoord <= config.x_range[1] && config.y_range[0] <= yInDataCoord && yInDataCoord <= config.y_range[1]) {
                console.log('x: ' + xInDataCoord, 'y : ' + yInDataCoord);
                self.addPoint(xInDataCoord, yInDataCoord);
            }
        });

        gd.addEventListener('mousemove', function (evt) {
            var l = gd._fullLayout.margin.l;
            var t = gd._fullLayout.margin.t;
            var element_l = $(gd).offset().left;
            var element_t = $(gd).offset().top;
            var xInDataCoord = xaxis.p2c(evt.pageX - l - element_l);
            var yInDataCoord = yaxis.p2c(evt.pageY - t - element_t);
            if (true || config.x_range[0] <= xInDataCoord && xInDataCoord <= config.x_range[1] && config.y_range[0] <= yInDataCoord && yInDataCoord <= config.y_range[1]) {
                Plotly.relayout(gd, 'title', ['x: ' + xInDataCoord, 'y : ' + yInDataCoord].join('<br>'));
            }
        });
    })
};

util.inherits(MyPlot1, EventEmitter);
MyPlot1.prototype.addPoint = function (x, y) {
    var self = this;
    var point = {x: x, y: y};
    self.points.push(point);
    Plotly.addTraces(self.gd, [{
        x: [point.x],
        y: [point.y],
        type: 'scatter',
        marker: {color: '#FF0000', size: 8},
        name: ''
    }]);
    self.emit('addPoint', point);
};
MyPlot1.prototype.deletePoint = function (i) {
    var self = this;
    var point = self.points.splice(i - 1, 1)[0];
    Plotly.deleteTraces(self.gd, i);
    self.emit('removePoint', {ind: i, point: point});
};
MyPlot1.prototype.redraw = function () {
    var self = this;
    Plotly.redraw(self.gd);
};
var My3dPlot1 = function (element, config) {
    EventEmitter.call(this);
    this.gd = document.getElementById(element);
    this.config = config;
    this.points = [];
    var self = this;
    Plotly.newPlot(self.gd, [{
        opacity: 0.8,
        color: 'rgb(300,100,200)',
        x: [0, 1, 0, 1],
        y: [0, 0, 1, 1],
        z: [0, 1, 1, 2],
        type: 'mesh3d',
    }], {
        //margin: {
        //	l: 0,
        //	r: 0,
        //	b: 0,
        //	t: 0
        //},
        hovermode: 'closest',
        xaxis: {
            title: config.x_title || '',
            autorange: true,
            zeroline: true,
        },
        yaxis: {
            title: config.y_title || '',
            autorange: true,
            zeroline: true
        },
        zaxis: {
            title: config.z_title || '',
            autorange: true,
            zeroline: true
        },
        showlegend: false
    }, {staticPlot: false})
};

util.inherits(My3dPlot1, EventEmitter);
My3dPlot1.prototype.draw = function (points) {
    var self = this;
    Plotly.deleteTraces(self.gd, 0);
    Plotly.addTraces(self.gd, {
        opacity: 0.8,
        color: 'rgb(300,100,200)',
        x: points.map(function (p) {
            return p.x
        }),
        y: points.map(function (p) {
            return p.y
        }),
        z: points.map(function (p) {
            return p.z
        }),
        type: 'mesh3d',
    });
};

var My3dPlot2 = function (config) {
    EventEmitter.call(this);
    this.config = config;
    this.gd = document.getElementById(config.element);
    var points = [];
	var self = this ;
    /*function getRectPoints(a1, b1, N_x, a2, b2, N_y, a3, b3, N_z, type) {
        var points = [];
        var h_x = (b1 - a1) / N_x;
        var h_y = (b2 - a2) / N_y;
        var h_z = (b3 - a3) / N_z;
        console.log(a1, b1, N_x, a2, b2, N_y, a3, b3, N_z, type);
        for (var i = 0; i <= N_x; ++i) {
            var x = a1 + h_x * i;
            for (var j = 0; j <= N_y; ++j) {
                var y = a2 + h_y * j;
                for (var k = 0; k <= N_z; ++k) {
                    var z = a3 + h_z * k;
                    points.push({x: x, y: y, z: z, type: type});
                }
            }
        }
        console.log(points.length);
        return points;
    }

    var a1 = config.x_range[0];
    var b1 = config.x_range[1];
    var a2 = config.y_range[0];
    var b2 = config.y_range[1];
    var T = config.T;
    var N_x = config.N_x;
    var N_y = config.N_y;
    var N_t = config.N_t;
    var h_x = (b1 - a1) / N_x;
    var h_y = (b2 - a2) / N_y;
    var h_z = T / N_t;
    points = points.concat(getRectPoints(a1, b1, N_x, a2, b2, N_y, h_z, T, N_t - 1, 'S_0_T'));
    points = points.concat(getRectPoints(a1, b1, N_x, a2, b2, N_y, -T, 0, N_t, 'S__0'));
    points = points.concat(getRectPoints(a1 - (b1 - a1), a1 - h_x, N_x - 1,
        a2, b2, N_y,
        h_z, T, N_t - 1,
        'S__G'));
    points = points.concat(getRectPoints(b1 + (b1 - a1), b1 + h_x, N_x - 1,
        a2, b2, N_y,
        h_z, T, N_t - 1,
        'S__G'));
    points = points.concat(getRectPoints(a1, b1, N_x,
        a2 - (b2 - a2), a2 - h_y, N_y - 1,
        h_z, T, N_t - 1,
        'S__G'));
    points = points.concat(getRectPoints(a1, b1, N_x,
        b2 + (b2 - a2), b2 + h_y, N_y - 1,
        h_z, T, N_t - 1,
        'S__G'));
    points = points.concat(getRectPoints(a1 - (b1 - a1), a1 - h_x, N_x - 1,
        a2 - (b2 - a2), a2 - h_y, N_y - 1,
        h_z, T, N_t - 1,
        'S__G'));
    points = points.concat(getRectPoints(b1 + (b1 - a1), b1 + h_x, N_x - 1,
        a2 - (b2 - a2), a2 - h_y, N_y - 1,
        h_z, T, N_t - 1,
        'S__G'));
    points = points.concat(getRectPoints(a1 - (b1 - a1), a1 - h_x, N_x - 1,
        b2 + (b2 - a2), b2 + h_y, N_y - 1,
        h_z, T, N_t - 1,
        'S__G'));
    points = points.concat(getRectPoints(b1 + (b1 - a1), b1 + h_x, N_x - 1,
        b2 + (b2 - a2), b2 + h_y, N_y - 1,
        h_z, T, N_t - 1,
        'S__G'));


    this.points = points;
    var self = this;

    var trace = {
        x: points.map(function (p) {
            return p.x
        }), y: points.map(function (p) {
            return p.y
        }), z: points.map(function (p) {
            return p.z
        }),
        mode: 'markers',
        opacity: 0.8,
        marker: {
            color: points.map(function (p, ind) {
                return (p.type === 'S__G') ? 'black' : (p.type === 'S__0') ? 'green' : 'blue';
            }),
            size: 4,
            symbol: 'circle',
            line: {width: 0},
            //opacity: 0.8
        },
        type: 'scatter3d'
    };
    var data = [trace];*/
	self.points = [] ;
    var a1 = config.x_range[0];
    var b1 = config.x_range[1];
    var a2 = config.y_range[0];
    var b2 = config.y_range[1];
    var T = config.T;
    var layout = {
        //margin: {
        //	l: 0,
        //	r: 0,
        //	b: 0,
        //	t: 0
        //},
        scene: {
            xaxis: {title: config.x_title || ''},
            yaxis: {title: config.y_title || ''},
            zaxis: {title: config.z_title || ''},
        },
        xaxis: {
            showgrid: true,
            zeroline: false
        },
        yaxis: {
            showgrid: true,
            zeroline: false
        },
        zaxis: {
            showgrid: true,
            zeroline: false
        }
    };
    Plotly.newPlot(self.gd, [{
    type: "mesh3d",
        color: 'rgb(255,100,200)',
    x: [a1, a1, b1, b1, a1, a1, b1, b1],
    y: [a2, b2, b2, a2, a2, b2, b2, a2],
    z: [0,  0,  0,  0,  T,  T,  T,  T],
			opacity: 0.8,
    i: [7, 0, 0, 0, 4, 4, 6, 1, 4, 0, 7, 2],
    j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
    k: [0, 7, 2, 3, 6, 7, 1, 6, 5, 5, 3, 6]
  }], layout).then(function (gd) {
        gd.on('plotly_click', function (d) {
            console.log(d)
        })
    })
};

util.inherits(My3dPlot2, EventEmitter);
/*
point = {x:x,y:y:z:z,color:color,type:type,hash:hash}
*/
My3dPlot2.prototype.addPoints = function (points) {
    var self = this;
	self.points = self.points.concat(points) ;
	console.log('addPoints')
    Plotly.addTraces(self.gd, points.map(function(p){
		return {
			x: [p.x],
			y: [p.y],
			z: [p.z],
			mode: 'markers',
			opacity: 0.8,
			marker: {
				color: p.color || 'rgb(300,100,200)',
				size: 6,
				symbol: 'circle',
				line: {width: 0},
				//opacity: 0.8
			},
			type: 'scatter3d'
		}
	}));
};
My3dPlot2.prototype.deletePoint = function (hash) {
    var self = this;
	var i = 0 ;
	console.log('deletePoint') ;
	console.log(hash) ;
    for(var i=0;i<self.points.length;++i){
		console.log('deletePoint') ;
		if(self.points[i].hash === hash) break ;
	}
	console.log(self.points) ;
	console.log(i) ;
	
	if(i<self.points.length){
		self.points.splice(i,1) ;
		Plotly.deleteTraces(self.gd, i+1);
	}
};
My3dPlot2.prototype.generateRandomPoint = function (type) {
    var self = this;
	var config = self.config ;
    var a1 = config.x_range[0];
    var b1 = config.x_range[1];
    var a2 = config.y_range[0];
    var b2 = config.y_range[1];
    var T = config.T;
	if(type==='S_0_T'){
		return {
			x:a1+Math.random()*(b1-a1),
			y:a2+Math.random()*(b2-a2),
			z:Math.random()*T,
		}
	}else if(type==='S__0'){
		return {
			x:a1+Math.random()*(b1-a1),
			y:a2+Math.random()*(b2-a2),
			z:-T+Math.random()*T,
		}
	}else{
		var cube = Math.floor(Math.random()*8) ;
		if(cube===0){
			return {
				x:a1-Math.random()*(b1-a1),
				y:a2+Math.random()*(b2-a2),
				z:Math.random()*T,
			}
		}else if(cube===1){
			return {
				x:b1+Math.random()*(b1-a1),
				y:a2+Math.random()*(b2-a2),
				z:Math.random()*T,
			}
		}else if(cube===2){
			return {
				x:a1+Math.random()*(b1-a1),
				y:a2-Math.random()*(b2-a2),
				z:Math.random()*T,
			}
		}else if(cube===3){
			return {
				x:a1+Math.random()*(b1-a1),
				y:b2+Math.random()*(b2-a2),
				z:Math.random()*T,
			}
		}else if(cube===4){
			return {
				x:a1-Math.random()*(b1-a1),
				y:a2-Math.random()*(b2-a2),
				z:Math.random()*T,
			}
		}else if(cube===5){
			return {
				x:b1+Math.random()*(b1-a1),
				y:a2-Math.random()*(b2-a2),
				z:Math.random()*T,
			}
		}else if(cube===6){
			return {
				x:a1-Math.random()*(b1-a1),
				y:b2+Math.random()*(b2-a2),
				z:Math.random()*T,
			}
		}else{
			return {
				x:b1+Math.random()*(b1-a1),
				y:b2+Math.random()*(b2-a2),
				z:Math.random()*T,
			}
		}
	}
};