/**
 * Sets background color from red to green based on the semantic index (between 0.0 to 1.0)
 */
function setSentimentIndex(index) {
	var color = getColorForPercentage(index);
    $('#person_sentiment_index').css('background', color);

    var canvas = document.getElementById('sentiment_slider');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 4;

	ctx.beginPath();
	ctx.moveTo(50, 80);
	ctx.lineTo(250, 80);
	ctx.strokeStyle = "#ffffff";
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(lerp(60, 240, index), 60);
	ctx.lineTo(lerp(60, 240, index), 100);
	ctx.strokeStyle = "#ffffff";
	ctx.stroke();
}

var getColorForPercentage = function(pct) {
	var percentColors = [
	    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
	    { pct: 0.5, color: { r: 0x54, g: 0x6e, b: 0x7a } },
	    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgba(' + [color.r, color.g, color.b].join(',') + ', 0.5)';
    // or output as hex if preferred
}

function lerp(a, b, f) {
    return a + f * (b - a);
}

function everything() {
    var query = document.getElementById("msg_input").innerHTML
    var graph_json = _getGraph(query);
    var g = Graph(graph_json);
    visualize(g);
}

// demo
setSentimentIndex(1);

// addNewHeadline(
//     "Breaking news!!! Privacy advocate got sued for not being private enough!",
//     "https://rmrm.io/",
//     "https://rmrm.io/documents/avatar.png"
// );
