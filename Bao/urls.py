from django.conf.urls import patterns, url
from Bao import views

urlpatterns = patterns('',

	url(r'^$', views.index, name = 'index_Bao'),

	url(r'^bao_rules/$', views.bao_rules, name = 'bao_rules'),

	url(r'^about_us/$', views.about_us, name = 'about_us'),

	url(r'^tutorial/$', views.tutorial, name='tutorial'),

	url(r'^one_player/$', views.one_player, name='one_player'),

	url(r'^register/$', views.register, name='register_Bao'),

	url(r'^login/$', views.user_login, name='login_Bao'),

	url(r'^logout/$', views.user_logout, name='logout_Bao'),
	
	url(r'^like_tutorial/$', views.like_tutorial, name="like_tutorial"),

	url(r'^increment_score/$', views.increment_score, name="increment_score"),

	url(r'^two_player/$',views.two_player, name="two_player"),
)

