function _getGraph() {
	$.ajax({
		url: "api/"
		success: function(json) {
			return JSON.parse(json);
		}
	})
}