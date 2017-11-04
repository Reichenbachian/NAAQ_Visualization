import sys
sys.path.append("../../raq/raq/")
from manager import Manager
import pdb
from django.http import JsonResponse
from django.shortcuts import render
import pickle
import os
import json

cached_response = None
if os.path.exists('cache.pickle'):
	cached_response = pickle.loads(open('cache.pickle', 'rb').read())
else:
	cached_response = {}

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
	word = request.GET['word']
	response = ""
	if word not in cached_response.keys():
		response = manager.get_graph_json(word)
		cached_response[word] = response
		pickle.dump(cached_response, open('cache.pickle', 'wb'), protocol=pickle.HIGHEST_PROTOCOL)
	else:
		response = cached_response[word]
	edges = []
	nodes = []
	for node in json.loads(response):
		for to in node['elements']['RelatedTopics']:
			edges.append({'from':node['name'], 'to':to})
			nodes.append(node['name'])
			nodes.append(to)
	return JsonResponse([list(set(nodes)), edges, response], safe=False)

