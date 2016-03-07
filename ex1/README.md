# Instructions

1. Visit Google's PageSpeed Insights' page: https://developers.google.com/speed/pagespeed/insights/


2. Think of at least 3 web URLs. Try to choose one that's a popular site (Yahoo, Microsoft, etc), and a few that are less well known.


3. Test each site using PageSpeed Insights. Jot down the score (letter and number) that each site gets from YSlow. Make sure to clear your cache in between each test.

----------------------------------------
cliffordfajardo.com (03/07/2016 )
- 81/100(mobile) & 92/100 Desktop:
  - My page has 2 blocking CSS resources. This causes a delay in rendering my page. "None of the above-the-fold content on your page could be rendered without waiting for the following resources to load. Try to defer or asynchronously load blocking resources, or inline the critical portions of those resources directly in the HTML."

- leverage browser caching:
  - "Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previously downloaded resources from local disk rather than over the network." TODO: Find a way to set expiration for content given that I'm using Github as my host.

- Minify CSS
  - Compacting CSS code can save many bytes of data and speed up download and parse times. Ex: my style.css compress could reduce file size by 17%

- 100% user experience
  - read more details on page speed results page.
------------------------------------------------------

cnn.com
-  48/100 (mobile) & 58/100(desktop)
  - page has 7 blocking script resources and 2 blocking CSS resources. This causes a delay in rendering your page.
  - leverage more browser caching
  - enable compression
  - optimize images on CDN
  - prioritize visible above the fold content. Page requires additional network round trips to render above the fold conent.


tytnetwork.com (using Wordpress(CMS))
- 60/100 (mobile) & 67/100(desktop)
- enable compression (gzip)
- look into browser caching & setting expire/cache control
- avoid landing page redirects
- optimize images
- optimize CSS delivery (consider using CDN)
- reduce server response time
  - could be slow application logic, slow DB queries, slow routing, frameworks, libraries ...
  


4. Pick one of the sites, preferably one which has issues (gets a C grade or lower), and examine the feedback that YSlow gives for each of the rules. Pick the 2 or 3 worst problems and jot down some ways the site could address those problems.



5. Be prepared to share your results with the class. :)
