# mini-front-end-edmodo
If cloned or downloaded, please run a simple server after moving into the app folder.
I would sugguest using the below commands if not familiar with running a simple server for the delivery of front end assets.
```
$ cd app/
$ python -m SimpleHTTPServer
```

###Project Uses
- AngularJS
- Bootstraps
- MomentJS

###Notes about project
- Assets are not optimized for production. Files are not minified.
- If backend fails, current iteration of project does not have warning to a frontend user.
- Also, code and UI is not tested with Karama, JUnit, Jasmine, or Selenium. A full iteration would include such tests.
- ng-cloak has not been used. My computer ran the templating quickly. I didn't experience any flashes. I am assuming this is because the assets are being pulled locally. Plus, API server delivers content quickly.
- I am current using $watch for a lot of variable watching. This usage has a lot of performance penalties. It runs through the $digest loop. If I come back to project, I will use other strategies to avoid using $watch, such as $scope communication or ngModel $parsers.