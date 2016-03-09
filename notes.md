# Why Web Performance?

Here are a few reasons:
- Many countries unfortunately have internet speeds of less than 500kbps.
- 8 out of 10 people will not return to a site after a disappointing experience.
- Google – A 400 millisecond delay caused a 0.59% drop in searches/user.
- 57% of online consumers will abandon a site after waiting 3 seconds for a page to load.
- Giving a great user experience to user is mandatory & is part of our jobs as engineers.
- We need to try & make the web a better place for everyone as software engineers!


#### Notes:
- For users the perceived performance is perhaps more important initially than the actual performance.

- When trying to improve the performance of a website - it's critically important to benchmark it before you make optimizations so you can later find out how much you've improved.

- Document.ready - that's the point at which a user is able to meaningfully interact with the page. The standard point at which we know the browser is finished parsing everything & can let the user do pretty much anything he/she wants, even if images are still loading.


Resources for testing your website performance:
- https://browserdiet.com/en/
- https://developers.google.com/speed/pagespeed/insights/
- http://gidnetwork.com/tools/gzip-test.php
- http://weppagetest.org
- http://whichloadsfaster.com



### 14 Rules for Reducing Frontend Latency

1. reduce/have fewer http requests
  - combine scripts
  - combine css
  - combine images(use sprites)
  - simply request less
  - request less during page load time. Example: request google analytics after document ready.

2. Use a CDN (great for static resources)
  - CDN's have more points of presence around the world than you do. Typically, you'll have one web server. CDN's have multiple CDN's around the world. So they have a server in Asia, Australia, US etc.

  - Shared caching: if I reference the jQuery file from Google's CDN's & a 1000 other sites also reference that file, in general that person will have that file more likely in their cache & won't have to re-download that file.

3. Using expires & cache-control headers
  - Expire/cache-control headers give you the ability to control the loading policy around stable content
  - when you have a resource, there is an implicit amount of time that this resource will live & be valid for according to the browser, so you want to minimize the amount of incorrectness between those two. If you only intend a resource to be valid for a day, but send an expire setting that will say it will be valid for a week there's a disparity or if you want a resource to be valid for a while & you put not expire time, every time a user reloads the page, they have to re-download that same file.
  - Send out proper HTTP headers that correspond to the intent for a particular piece of content. There's stable content such as jQuery 1.8, that file is never going to change, but then you have less stable content like a dynamic widget and that thing changes every day.

4. Gzipping (compression)
  - can compress your content anywhere from 50%-70% decreasing loading time.

5. Stylesheets at Top:
  - browser will often block the rendering of content, until it knows about all the stylesheets, so it doesn't paint things correctly & have to redo that work.

6. Scripts at the bottom:
  - generally the solution, however sometimes you can place smaller inline scripts at the top for your specific needs.

7. NEVER CSS expressions (IE6 times).

8. External JS/class (own documents !inline)
 - main reason to follow this is browser caching
 - note: there are some good reasons to inline, especially on mobile & to reduce http requests

9. Fewer DNS look ups
  - TODO: add more info

10. Minify CSS/JS
  - for production code, make sure you are using the minified versions of your assets
  - consider inlining CSS for critical above-the-fold-content.

11. Avoid redirects
  - Example: when I go to CNN.com what happens is I get redirected to www.cnn.com. What happens is a round trip to the server & the server responded with 'CNN.com' is not the canonical location for this website, tell the user to change the address and re-request. Sometimes CNN.com & www.cnn.com could reference the same server, but that's not always true.

12. Duplicate scripts
 - sometimes a CMS loads one script for the site, then another for plugin which uses a different version of jQuery.

13. Etags
 - hexadecimal codes that are generated, which are supposed to uniquely represent a resource.
 - falls under the area of conditional loading

14. Cacheable AJAX
 - if you are requesting a resource (ex: using REST interface) you can add an additional layer of expiration on top of those things, like a list of the newest books - that AJAX can be cached for a period of time ex. 4 hrs... - you don't need to re-request thhose resources from the database every single time. AJAX is cacheable like XML, CSS & javascript files



### MORE NOTES:

Concerning etag & expire/cache control
  - you don't need to use etag if you're using expire/cache & vise versa. Your adding more bytes to your response headers
  - reduce cookie size or be mindful of it. Ex: If you're using Google Analytics on your site, check the response headers of your index.html file & you'll see a cookie with GA on it (Google Analytics). To track uniqueness of people they attach it to the main domain your page which means every single resource on your page that loads off of your domain sends ____ bytes for every request every single time.


Cookie free domains:
  - using a separate domain just loading all your images & CSS - and the key thing you need to understand is that there is nothing special about the domain that makes it cookie free, except that you never load any single resource through the cookie-free domain that could set a cookie. There's nothing special about the setup of the domain, the server....you have an additional domain like i.mydomain.com for your images (don't go crazy w/too many domains) & that domain is only for resources that do not set cookies. You need to make sure no cookies are ever sent by your configuration. EXCEPT, there's a problem. Most cookies are set globally so there set on the base domain but also sub domains. Now, to get a cookie free domain you actually need to have a physically different base domain. CDN's help but they set unnecessary headers etc..


Optimizing sprites:
  - if you horizontally orient your sprites <------> that's more efficient for the browser than the vertically oriented sprite. Why? Browser parsing algorithm, extra cpu power used for vertically oriented sprites...
  - misconception: some people think that it's ok to put all their images on a sprite & then you only download one image. Be selective about what you decide to put on a sprite sheet. Too many images can take away a lot of the user's pc/smartphone memory.


Concerning `<script>` tags:
  - moving you scripts at the bottom doesn't solve all of your performance problems. You haven't changed the nature of how the browser treats that download. The only thing that you have done is, by the placement of your markup (browsers parse top-bottom), give a priority indication to the browser of which resources are most important.

  - People commonly conflate scripts at the bottom with a different concept which is called waiting for the document to be ready because they want to modify the DOM or attach event handlers or do some other things. They think that if I put the script at the bottom of the page, then surely the document is done so when my code runs everything should work. In reality, the way the algorithm the document or body may not be done when it hits a script tag at the bottom. Your script may run before the before the document is completely ready.


Middle End Architecture:
- Google pagespeed insights
- Resources (CSS, JS, images)
- Architecture
- Communication

Front-end Architecture
- resource loading
- abstractions
- JS-to-CSS
- UI Thread & GC
- jsPerf





### PART 4: The Middle End: Architecture & Communication

Concerning architecture, well architected single page apps (SPA's) offer performance benefits. Essentially the goal is to download the big web app once & not have to to the server & request parts, parts & parts. With SPA's the goal is to only request small of bits of data you need & not the entire app
structure again

Example: you can decide whether to offload template rendering on the server if the device isn't
that powerful or on the client if the pc is a strong & capable one.




Data-Validation:
- you can do it on the client side & server. For ex: if the user doesn't put in @ sign in email you can let them not it's not valid (fast validation for user) or you can also do it on the server, which checks if the sent information is valid.


JSON, AJAX & Web Sockets
- With JSON, it’s easy to add bloat to your data & get lazy with how it’s structured. Laziness can lead to latency & a slower web apps.
- AJAX vs Websockets
  - AJAX: one of the ways we can communicate between the client & server without doing a page refresh is AJAX, that's a full request response cycle at the HTTP layer. It opens up a new connection on the server & therefore it's taking up extra resources, it's taking up extra HTTP packets over the wire & extra server resources & extra connection resources in your browser & limited mobile devices. So in all places of the stack, AJAX requests is heavier than web sockets.

  - web sockets: create one initial HTTP request-response cycle (there's a full req-res scycle with all the headers is fully safe to go through all of the proxies). As soon as they have established a solid connection between client & server, the client that decides he want's a socket connection sends a request over that open HTTP socket, he sends a request & I'd like to upgrade. We've been talking AJAX for a couple milliseconds now I'd like to talk in the web socket protocol. The server responds ..cool I know the web socket protocol. Now, we have a persistent socket between the client & server, which doesn't require any HTTP over head to communicate. By contrast, there are about ~1684 bytes(overhead bytes) that happen in an HTTP request header, in addition to the data goes over the wire for the HTTP request response handshake. By contrast, a web socket packet has ~8 bytes overhead associated with it. You pay the penalty for the first HTTP connection, but the socket is established we have lightweight client-server communication. In addition, sockets give us two-way communication which AJAX doesn't. In the past people came up with long-polling to simulate there two-way communication.




### Front-End Resource Loading:
Frontend Preloading:
- taking advantage of the browser cache to say I know I'm going to need a resource later, while I've got you on the line, web server, why not just send me that additional resource now.
- Implications of preloading: enhanced user experience, quick page or resource loading. Problem: initial web pipeline is getting stuffed with extra stuff the user might not need. Takeway: am I preloading during a critical part of my application or during when times are idle?  You can also lazily load other resources later.

- future browser features IE11+ (no safari). It's a browser hint. The browser decides when to give you the resource
```js
  <link rel="prefetch" href="hello.jpg">
  //old school way, place @ bottom after DOM ready. Referencing from CSS could affect the critical rendering path
  <script>var img = new Image() img.src = 'something.jpg'</script>
```
- You need to send out proper cacheing & expiration headers or else you end up reloading stuff more then needed.





Frontend - Lazy Loading:
- Preloading is fetching something ahead of time w/o the user requesting it. Lazy loading fetches it when the user needs it. This technique waits until it's absolutely certain that the user needs that resource. Ex: not loading code for a calendar widget unless a user clicks on it.

Example:
```js
function scriptLoaded(){
  //code
}

var scr = document.createElement('script');
src.src = "foobar.js";
document.head.appendChild(src);

//listen if script finished loading or not
// onload means doesn't mean when it's finished loading, it means on finished processing, executed & already done. On done executing!
src.onLoad = scriptLoaded;
src.onreadystatechange = function(){
  if(src.readyState === "loaded" || src.readyState === "complete"){
    scriptLoaded();
  }
}
```

The above example can be used to do something like: load data from widget after user has clicked on it


Frontend - Parallel loading:
  - I don't just have 1 script that I want to load, I have many scripts that I need to load.
  - It's about preserving execution order


Example of how you can load scripts & make sure they preserve order:
```js
function allScriptsLoaded(){
  //code...
}
//modern browsers
function loadScript(source, done){
  var src = document.createElement('script');
  src.src = source;
  src.async = false;  // preserve execution order of dynamically created scripts. Downside if script 2 fails all other don't load
  document.head.appendChild(scr);

  if(done){
    src.onload = done;
    src.onreadystatechange = function(){
      if(src.readyState === "loaded" || src.readyState === "complete"){
        done();
      }
    }
  }
}
loadScript('jquery.js')
loadScript('foobar.js')
loadScript('baz.js', allScriptsLoaded);
```




### Front-End (Resource Loadinf): Why Dynamic script loading?
- document ready happens significantly quicker (remember no doc.write included anywhere).
- https://infinit.io/_/JSMZ5ve





### Front-End: Abstractions & Animation
JS-to-CSS:
  - sometimes offloading animations to CSS is much more efficient and performant
  - complex animations & CSS transitions in JS is fine

```js
function updateElement(){
  $elem.css({
    left: x + 'px',
    top:  y + "px"
  })
}
var x, y;
function doAnimation(){
  //calculate new x & y code...
  updateElement();
  setTimeout(doAnimation, 30);
}
```

Notes:
  - what if your calculation takes more time than then the # of milliseconds on setTimeout or interval? Things start to stack up, you get delayed responses and slower frame rates.
  - RequestAnimation Frame(HTML5): released to address animation issues many people were having with setTimeout etc. If you're using a setInterval method & a user changes tabs, the intervals are still happening, but with requestAnimationFrame that doesn't happen. The browser knows that since requestAnimation is about some visual event happening, it can stop the loop.
  - requestAnimationFrame could still drop frame rates if the calculation it has to make is expensive, however using this over setInterval is much better.

```js
function updateElement(){
  $elem.css({
    left: x + 'px',
    top:  y + "px"
  })
}
var x, y;
function doAnimation(){
  //calculate new x & y
  updateElement();
  RequestAnimationFrame(doAnimation);
  /* basically telling the browser, when you're about ready to repaint the screen,
     I've got some stuff I want you to change on the screen. The browser intelligently
     controls the frame rate in this case, with previous example you had control,
     however, it was not sustainable for multiple function invocation calls in short
     periods of time.
  */
}
RequestAnimationFrame(doAnimation);
```



### Front-End: CSS Transition vs Animation

CSS has several ways of handling movements.
  - CSS transitions: an already calculated animation. You have a starting value & ending value for a property & we'll have the CSS engine figure out the intermediate stuff.



### Front-End: UI Thread & GC
- Single Threaded: In the browser we have a single thread of execution.

  - Async vs Parallel Code
    - Javascript has asynchronous code that happens in the event loop, but doesn't have parallelism. It's not multi-threaded.
    - Parallelism is when we can execute multiple things at the same time. Languages like Java can use multiple threads (using more cores on the CPU).
    - The way Javascript handles asynchronous code is by handling it in the event loop. Javascript has this single thread of execution, but it's go a bunch of operations in different queues that it might choose to do, but it will only ever do one thing at a time. So you'll never have 2 functions running at the same time, that's parallel computing.
    - Concerning the UI thread, the UI thread is single threaded. One of the implications of this is that there are several different systems inside of the browser that all share the same thread. Meaning you can only have some things running one at a time, halting other services until the currently running one is complete. Some of the systems include: the `CSS rendering engine` , `the DOM`, `JS engine`, `garbage collector` and there are many others; these subsystems share a single thread. What this means is: if at any given moment the CSS rendering engine wants to repaint a frame at that exact moment, but at the exact moment javascript is still executing the CSS has to wait. We often get jankiness from having to deal with a single thread. For example, if the garbage collector(or whatever) is running & CSS needs to do something, then it needs to wait.



### Threaded Javascript
- We sort of have a feature in javascript that allows us to execute javascript in parallel called gits, but there is a caveat to this, the code running is in an entirely separate javascript context. They do not share anything except an asynchronous communication channel. It's exactly the same context as your browser & server, which often don't run on your same computer, so your code on the client & code on the server do not run in the same thread. The only way they can talk to each other is asynchronously.

- More about Web Workers: ww are way for you to point at a particular javascript file & say I want for that file to explicitly run in its own thread, separate from my thread & I want it to run as fast as possible, to give it the system resources that it needs, & because it's in its own thread, no matter how long or slow that works, this thread is never going to be affected by the other thread. It's particularly useful to technique that allows you to take long running javascript code, say a calculation that takes a while, without affecting your other thread which maybe doing something like updating the animation on a page for a user. Ex: I want all my nice UI animations with all the fast server communication, so what I could do is put all my socket communication in a web worker.

Example code for web worker:
```js
//API is pretty much about listening & sending data back
var longThread = new Worker('long.js');
//opting into the communication channel.
longThread.onmessage = function(evt){
  var answer = evt.data;
  // do something with the answer
}
longThread.postMessage({question: ''});

```
```js
//long.js
function figureOutAnswer(question){
  //..
  return data;
}

//self is a reference to the web worker
self.onmessage(function(evt){
  var question = evt.data.question;
  var answer = figureOutAnswer(question);
  //really long calculation then send it back
  self.postMessage(answer);
})
```




### Garbage Collection & Dynamic Memory Allocation
- Javascript allows you to create variables, create elements in the DOM & also allows you to not delete those variables, but to simply stop referencing those variables. So let's say you have a really big object with many key-value pairs  & you have 3 different references in your code to that address book & then 2 of those references go away because they go out of scope & now you have one reference left & then that reference goes out of scope. What happens to the object? Answer: the object doesn't immediately go away.


```js
var obj = {
  //lots of data
};

//later
obj = null; //what now?
```

- Where actually not setting the object to null, we're setting the reference(the variable)to null. Now nothing is pointing to the object with lots of data in memory. So what happens to that object? At a later point in time, the garbage collector finds the object which has no references pointing to it & cleans it up. When you cut all references to an object, there's no way you can get access to it.  What's the implication of garbage collection in our context? Well, garbage collection runs on the UI thread, that means, the more often the browser thinks the garbage collector needs to run the more likely it is that your code is affected negatively performance wise. So, we need to write code that creates less garbage collection. How do we write code that requires the garbage collector to be called less?

Note (behind the scenes): when you create a javascript object in the javascript engine (V8 etc..), a C++ object is created behind the scenes that represents our object. There's a bunch of layers of abstractions going on behind the scenes.
