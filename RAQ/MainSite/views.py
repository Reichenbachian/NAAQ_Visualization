# from manager import Manager
import pdb
import sys

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
	print("TEST:", request.GET['word'])
	return manager.get_graph_json(request.GET['word'])
