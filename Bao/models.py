from django.db import models

from django.contrib.auth.models import User

class UProfile(models.Model):
	# Link the UProfile to the User model instance.
	user = models.OneToOneField(User)
	#user = models.OneToOneField(Game)
	#username = models.CharField(default='',unique=True, max_length=128, null=False)
	#password = models.CharField(default='',max_length=128, null=False)

	# User already comes with attributes - username and password 
	# Bao allows their users to upload a profile picture if they 
	# want to. As this is optional set blank to be True.
	# Users also have a score.
	picture = models.ImageField(upload_to='profile_images', blank = True)
	score = models.IntegerField(default=0, blank=True)

	# this class returns the user's username
	def __unicode__(self):
		return self.user.username

class Tutorial(models.Model):
	# This is needed to deal with the likes.
	name = models.CharField(max_length=32, unique=True)
	likes = models.IntegerField(default=0, blank=True)

	def __unicode__(self):
		return self.name  + ' ' + str(self.likes)

