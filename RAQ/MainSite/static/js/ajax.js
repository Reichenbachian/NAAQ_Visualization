function _getGraph(query) {
	$.ajax({
		url: "api/",
		data: {"word": query},
		success: function(json) {
			return JSON.parse(json);
		},
	})
}