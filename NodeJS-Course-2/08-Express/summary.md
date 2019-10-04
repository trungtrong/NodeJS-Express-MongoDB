<pre>
- Node JS is platform built-on the Chrome's Javascript runtime

- Node JS uses Google Chrome's execution engine v8    written in C++ and asynchronous processing to do this
+ V8 compiles JavaScript code into machine code for computer

- Great for building Real Time applications

- Asynchronous (non-blocking) vs Synchronous(blocking)

  <STEP-start>: How to us express
    1 - npm init
    2- Install <express-framework>
        npm install express --save-dev

  Feature: Express:
- easy and flexible routing system
- integrates with many templating engines
- contains a middleware framework
--------------------------------------------------
      <Lesson-1>:Starting using <express->

  1 - <import-express> in my app
      const express = requires('express')

  2 - Using <app-> variable to reference to the different <express-method>
      const app = express();

  3 - Make a GET/ POST request
    + res.send('<data>') : That <data-of-various-type>
    + help respond the request
      HTTP verbs or methods:  GET, POST, PUT, PATCH, DELETE
    + Responding to requests
      - GET : app.get('route', callback)
            This func handles GET requests to the <route-path>

      - POST : app.post('route', callback)
      - DELETE : app.delete('route', callback)

  4 -  We set up NodeJS to listen a particular port for requests
    app.listen(3000)
  => localhost:3000

----------------------------------------------------
      <Lesson-2> <ROUTE-Parameters>

  1 - Static route
    + Root directory :
      app.get('/', function(....))
    +
    app.get('/contact', function(req, res) {
      res.send('this is the contact - lesson 2');
    })

  2 - Dynamic Route means <Route-parameter>

    app.get('/profile/:id', function(req, res) {
      res.send('You requested to see a profile with id = ' + req.params.id);
    })

    2-2- Read the path of route (like Anuglar)
      <using-req.params.id>

----------------------------------------------------
      <Lesson-3> <Templating-routing using template-engine>

  - we want to inject some dynamic content from database into these pages and insert more data to <view-engine>(profile.ejs)

  - Using EJS : view engine or template engine with route parameter

  <s-1> - install EJS
		npm install ejs --save-dev
----------------------------
  <s-2> - CALL:  app.set('view engine', 'ejs'); (on top)
----------------------------
  <s-3>  using { res.render } to render VIEW

      app.get('/profile/:name', function(req, res) {
        var data = {age: 29, job: 'ninja', hobbies: ['eating', 'swimming', 'hiking']};

        res.render('profile', {
		      person: req.params.name,
		      data: data
        });
      })

      <s3-2>:        Explanation:
          1 - { person } variable is bound in template (HTML)

	        2 - res.render(view, locals, [callback])
            + view: <file.-ejs> in <views-folder>

            + locals: an { object } whose properties define { local variable }
              for { that view }
              - must use { Template engine: ejs }

            + callback func:

	        3- data: data
	          + data 1st: la variable in template.html
	          + data 2nd: la { data } Object in app.js

    using data object that contains the JSON object from database
      var data = {age: 29, job: 'ninja'};

----------------------------
  <s-4> Create <file.-ejs> represent to <file.-html>
    in <views-folder>

----------------------------
  <NOTE> as we can see: In index.ejs / contact.ejs /profile.ejs
  => <We-use> the <external-CSS> from <assets-file>
  	<link rel="stylesheet" type="text/css" href="assets/styles.css" />
  But it <does-NOT-work>

  <Solution-for-this> using <Serving-STATIC-Files>
  but if we use the route "assets/images or external styles or JS , ect"
			=> this is the hard-code
			=> and we have to make a lot of route => This doesn't make sense
			=> Solution: using buit-in Middleware func <express.-static>

-----------------------------------------------------------------------
      <Lesson-4> <Serving-Static-files>
	1- Static files: images. stylesheet, Javascript files, etc

  2 - To serve <static-files> such as images, CSS files, and JavaScript files
  => use <the-express.static> is the  built-in <middleware-function> in Express.
                  express.static(root, [options])
    + We call <express.static-middleware-function>

    https://expressjs.com/en/4x/api.html#express.static
    + <It-combines with req.url> with <root-directory>
        2-1-  When a file is Middleware => Instead of sending a 404 response
          + It will calls next() to move on to the next middelware
          + allowing fro stacking and fall-backs

    + root: root directory
    Example: If using     app.use(express.staic('assets'))
                          => root = 'assets'

    +

  3 - To create a <VIRTUAL-Path-prefix> (where the path does not actually exist in the file system)

    // Virtual path prefix
    app.use('/assets', express.static('assets'));

-----------------------------------------------------------------------
      <Lesson-5> <Middleware-function>
  <Middleware-func>:
			+ is the essentially code that runs between the request
				and the response

			+ and see the callback of res.get('/', function(res, req))
				=> this callback is run between the request and the response
	  			and this callback is MIDDLEWARE function

    => when client make a request / load page on root (path='/')
      + If match <GET> method match <app.get-func>
         => app.get executes

                  -----------------------------------------

        <FIRST-> Middleware functions can perform the <following-TASKS>:
  1 - Execute any code
    const requestTime = function(req, res, next) {
      req.requestTime = Date.now();
      next();
    }

    app.use(requestTime);

  2 - Make changes to the request and the response objects
  => add the request

    + const requestTime = function(req, res, next) {
        req.requestTime = Date.now();  <---
        next();
      }

      app.use(requestTime);

    + and IN <app-get>
    app.get('/', function(req, res) {
      var responseText = 'HelloWorld!<br>';

      ****** Using req.requestTime
      responseText += '<small>Requested at: ' + req.requestTime + '</small>';
      res.send(responseText);

      res.send('GET');
    })


  3 - <End-the request-response cycle>
    app.get('/', function(req, res) {
      res.send('GET');
    })
    <request-response cycle> finishes when we give a response to the cliend by calling { res.end }, { res.render }, { res.send }
    , etc


  4 - Call the next middleware in the stack
    using next()
    + Middleware 1
    + Middleware 2

  5 - Logging requests

  6 - Authenticating/ authorizing requests

            <SECOND-----------------> NOTE: all the problems

1 - if we don't use next() method =>
  =>  Response Status <pending>
  =>  app.get() don't response data

2 - Middleware func is called, when we use <app.use-function>
    const myLogger = function(req, res, next) {
      console.log('Logged'); // console on Terminal
      next();
    }

    app.use(myLogger);
    => If we don't use < app.use() > => Middleware func don't execute


3 - Make a lot of Middleware functions
    const requestTime = function(req, res, next) {
      req.requestTime = Date.now();
      next();
    }

    app.use(requestTime);

    const myLogger = function(req, res, next) {
      console.log('Logged');
      next();
    }

    app.use(myLogger);

  4 - Make 2 <response-send> from 2 Middleware

      4-1- In Middleware function 1: <we-make-first-res>
      const myLogger = function(req, res, next) {

        res.send('Logged');  //////////
        next();
      }

      app.use(myLogger);

      4-2- In Middleware func 2: in app.get => <we-make-the-second-response>
        app.get('/', function(req, res) {
          res.send('GET'); ///////////
        })

    => <ERROR>: Cannot set headers after they are sent to the client
    b/c We can't make 2 response to the Client

===========> <Each-Middleware-func> <may-end> the request
    +  <by-sending response to client>
    +  call the next() method
    +






REFERENCE:
  - console.log('Request URL:', req.originalUrl);
    + to see current path

  - console.log('Request Type:', req.method);
    + to see GET
</pre>