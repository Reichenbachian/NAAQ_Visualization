import sys
sys.path.append('../../raq/raq/')
from manager import Manager
import pdb
from django.http import JsonResponse
from django.shortcuts import render

sys.path.append('../../raq/raq/')

sessions = {}

def create_or_get_graph(id_):
	if id_ in sessions.keys():
		return sessions[id_]
	else:
		sessions[id_] = Manager()
		return sessions[id_]

# Create your views here.
def Landing(request):
	return render(request, 'MainSite/index.html')



##### REST API
def get_for_word(request):
	manager = create_or_get_graph(request.session.session_key)
	response = manager.get_graph_json(request.GET['word'])
	edges = []
	for node in response:
		for to in node['connected']:
			edges.append({'from':node['name'], 'to':to})
	return JsonResponse([edges, response], safe=False)
