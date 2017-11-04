from django.shortcuts import render
import sys
sys.path.append('../../raq/src/')
import manager
import pdb

# Create your views here.
def Landing(request):
	return render(request, 'MainSite/index.html')



##### REST API
def get_for_word(request):
	pdb.set_trace()
	return manager.get_graph_json(request.GET[0])