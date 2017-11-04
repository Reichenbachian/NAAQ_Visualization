class Graph{
	constructor(json) {
		this.nodes = []
		for (var i = 0; i < json[0].length; i++) {
			this.nodes.push({id:json[0][i], label:json[0][i]})
		}
		this.edges = []
		for (var i = 0; i < json[1].length; i++) {
			console.log(json[1][i])
			this.edges.push({'from':json[1][i]['from'], 'to':json[1][i]['to']})
		}
	}
}



function visualize(g) {// create an array with nodes
	g = new Graph(g);
	console.log("asdf", g.edges);
	var nodes = new vis.DataSet(g.nodes);

	// create an array with edges
    var edges = new vis.DataSet(g.edges);
    

	var colors = ["#000004", 
	"#140e36", 
	"#3b0f70",
	"#641a80", 
	"#8c2981", 
	"#b73779", 
	"#de4968", 
	"#f7705c", 
	"#fe9f6d", 
	"#fecf92" 
	];

var options = {
    nodes: {
	color: {
	    border: colors[0],
            background: colors[0],
            highlight: {
		background: colors[1],
		border: colors[1]
            },
	    hover: {
		background: colors[1],
		border: colors[1]
	    }
        },
	font: {
	    color: colors[9],
	    size: 14,
	    face: "AscenderSansMnW01-Regul"
	},
	shadow: {
	    enabled: true,
	    color: colors[0],
	    size:5,
	    x:5,
	    y:5
	},
	margin: {
	    top: 30,
	    bottom: 30,
	    left: 30,
	    right: 30
	},
	chosen: true,
	shape: 'box',
	mass: 3,
	
    },
    interaction: {
	dragNodes: true,
	hover: true,
	hoverConnectedEdges: false,
	selectConnectedEdges: false,
    },
    manipulation: {
	enabled: false
    },
};

	// create a network
	var container = document.getElementById('graph_container');


	// provide the data in the vis format
	var data = {
	    nodes: nodes,
	    edges: edges
	};

	var options = {
	    nodes: {
		color: {
		    border: colors[0],
	            background: colors[0],
	            highlight: {
			background: colors[2]
	            },
		    hover: {
			background: colors[1]
		    }
	        },
		font: {
		    color: colors[9],
		    size: 14,
		    face: "appliedsanswlight"
		},
		shadow: {
		    enabled: true,
		    color: colors[0],
		    size:5,
		    x:5,
		    y:5
		},
		margin: {
		    top: 30,
		    bottom: 30,
		    left: 30,
		    right: 30
		},
		label: "Node",
		chosen: true,
		shape: 'box',
		mass: 3,
		
	    },
	    interaction: {
		dragNodes: true,
		hover: true,
		hoverConnectedEdges: false,
		selectConnectedEdges: false,
	    },
	    manipulation: {
		enabled: false
	    },
	};

	// initialize your network!
	var network = new vis.Network(container, data, options);

	network.on("click", function (params) {
	    // console.log("Hi!");
	    // console.log(params.nodes[0]);
	    this.focus(params.nodes[0], {
		offset: {x:0, y:0},
		animation: {
		    duration: 800,
		    easingFunction: 'easeInOutCubic'
		}
	    });
	    // change sentiment index

	    // change topic word cloud
	});
}

$.ajax({
	url: window.location.href+'api?word=obama',
	global: false,
	type: 'GET',
	data: {},
	async: true, //blocks window close
	success: function(x){visualize(x)}
	}
);