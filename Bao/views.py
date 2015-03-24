from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from Bao.models import UProfile, Tutorial
from Bao.forms import UserForm, UserProfileForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from datetime import datetime
from PIL import Image

# index page is the Bao homepage. 
def index(request):
	user = request.user.id
	if user:
		try:
			up = UProfile.objects.get(user=user)
			context_dict =  {'up': up}

		except UProfile.DoesNotExist:
			up = None
			context_dict = {}	

	else:
		context_dict = {}

	return render(request, 'Bao/index.html', context_dict)

def about_us(request):
	user = request.user.id
	if user:
		try:
			up = UProfile.objects.get(user=user)
			context_dict =  {'up': up}
		except UProfile.DoesNotExist:
			up = None
			context_dict = {}	
	else:
		context_dict={}
	return render(request, 'Bao/about_us.html', context_dict)

def tutorial(request):
	# get the tutorial objects
	#t = Tutorial.objects.get(name='Introduction')

	user = request.user.id
	if user:
		try:
			up = UProfile.objects.get(user=user)
			context_dict =  {'up': up}
		except UProfile.DoesNotExist:
			up = None
			context_dict = {'up':up}	
	else: 
		context_dict={}	

	return render(request, 'Bao/tutorial.html', context_dict)

@login_required
def like_tutorial(request):

	user = request.user.id
	try:
		up = UProfile.objects.get(user=user)
		context_dict =  {'up': up}

	except UProfile.DoesNotExist:
		up = None
		context_dict = {}	

#	t_id = "Introduction" 
	t = Tutorial.objects.get(name='Introduction')
	t_id = None
	if request.method == 'GET':
		t_id = request.GET['t.name'] 
	likes = 0
	if t_id:
		t = Tutorial.objects.get(name=t.name)
		if t:
			likes = t.likes +1
			t.likes = likes
			t.save()

	print likes

	return render(request, 'Bao/tutorial.html',context_dict)

# This view will return the page where the game will be displayed.	
@login_required
def one_player(request):
	user = request.user.id
	try:
		up = UProfile.objects.get(user=user)
		context_dict =  {'up': up}

	except UProfile.DoesNotExist:
		up = None
		context_dict = {}	


	# render the response to be returned to the client.	
	return render(request, 'Bao/one_player.html', context_dict)


# this view increments the users score if a game has been won.
# After a game has been won the user is directed to the index 
# page where they will see their games won has incremented.
# This view is referenced in the js in the method checkForWinner.

@login_required
def increment_score(request):

	user = request.user.id
	try:
		up = UProfile.objects.get(user=user)
		context_dict =  {'up': up}

	except UProfile.DoesNotExist:
		up = None
		context_dict = {}	

	up.score = up.score +1
	up.save()

	return render(request, 'Bao/index.html',context_dict)

	#return HttpResponse(up.score)


def register(request):
	# A boolean that tells the template whether the regustration
	# was a success or not.
	successful_registration=False

	# Need to process the form if it is a HTTP Post
	if request.method == 'POST':
		# Need get information from both the UProfile and 
		# the UserForm. 
		user_form = UserForm(data=request.POST)
		profile_form = UserProfileForm(data=request.POST)

		print "REGISTER POST"

		# if and only if both forms are valid the information
		# can be processed.
		if user_form.is_valid() and profile_form.is_valid():
			# save the data in the database
			user = user_form.save()
			
			# set the password that the user has provided using
			# the set_password method.
			user.set_password(user.password)
			user.save()

			# user_form has now been dealt with, now deal with
			# the information obtained via the profile_form.
			profile = profile_form.save(commit=False)
			profile.user = user

			# has the user opted to include a profile picture?
			# If so we GET it from the profile_form
			if 'picture' in request.FILES:
				profile.picture = request.FILES['picture']

			# give each new user a default score of 0.
			# This will be incremented each time the user wins a game.	
			profile.score = 0
							
			# save the profile_form information in the UProfile
			# model instance.
			profile.save()

			# print the profile for the user.
			print profile

			# All elements of the registration have been 
			# carried out. As the user is now registered, we can update the 
			# boolean.

			successful_registration = True

		# however if either or both of the forms - user_form, profile_form
		# have invalid data then print the errors.
		else:
			print user_form.errors, profile_form.errors
	
	# Not a HTTP POST, therefore render our form using two ModelForm
	# instances. These forms are blank to allow users to input details.
	else:
		user_form=UserForm()
		profile_form=UserProfileForm()

	if successful_registration:
		# if the registration is successful then we want to redirect the 
		# authenticated user to the homepage.
		username=request.POST['username']
		password=request.POST['password']

		# we want to authenticate the user once they are registered
		# and log them in. The user will then be directed to the homepage
		# where they will see their profile statistics and picture in the
		# side bar. 
		user=authenticate(username=username, password=password)
		login(request, user)

		return HttpResponseRedirect('/Bao/')

	else: 
		print "Error in registration"	

	return render(request, 'Bao/register.html',
				{'user_form':user_form, 'profile_form':profile_form,'successful_registration':successful_registration})

def user_login(request):
	# The request is a HTTP POST, therefore we will try and get the relevant info.
	if request.method == 'POST':
		# get the username and password provided by the user.
		username=request.POST['username'] 
		password=request.POST['password']

		# user authenticate() to check if username/password combo
		# is valid.
		user=authenticate(username=username, password=password)

		# if we have a user object => details were valid.
		# if not => no user matched the combo.
		if user:
			# need to make sure the account is also active.
			if user.is_active:
				# if active and valid => account can be logged in.
				login(request, user)
				# redirect user back to main page. The page will 
				# now feature content which can only be seen if 
				# registered and logged in.
				return HttpResponseRedirect('/Bao/')

			else:
			# the account was inactive => login denied.
				return HttpResponse("Your Bao account is disabled")
		else:
		# Invalid login details entered.
			print "Invalid login details: {0}, {1}".format(username, password)
			return HttpResponse("Invalid login details supplied.")

	# the request is not a HTTP POST => display blank login form.
	else:	
		return render(request, 'Bao/login.html', {}) 	

@login_required
def user_logout(request):
	# since the user is already logged we can log them out.
	logout(request)
	# send user back to homepage
	return HttpResponseRedirect('/Bao/')			

def two_player(request):
	user = request.user.id
	if user:
		try:
			up = UProfile.objects.get(user=user)
			context_dict =  {'up': up}
		except UProfile.DoesNotExist:
			up = None
			context_dict = {}	
	else:
		context_dict={}

	return render(request, 'Bao/two_player.html', context_dict)
