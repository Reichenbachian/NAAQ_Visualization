// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
]);

// create a network
var container = document.getElementById('graph_container');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};

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
    this.focus(params.nodes[0], {
	offset: {x:0, y:0},
	animation: {
	    duration: 800,
	    easingFunction: 'easeInOutCubic'
	}
    });	
});
