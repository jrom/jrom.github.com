---
layout: page
date: 27 August 2012 10:00
summary: "Segment Google Images traffic from normal search engine traffic in Google Analytics!"
categories: SEO
description: "Segment Google Images traffic from normal search engine traffic in Google Analytics!"
keywords: "seo,google analytics,google images,serps,search engine,results,organic,referral"
title: "Google Images in Google Analytics"
---
<style>
  .article p img { float: none; margin: 0; }
</style>

A friend of mine has a [soccer blog](http://eumd.es/ "blog de fútbol") and I
happen to help him with the nuts and bolts behind it.  I'm not tracking it 24/7
but some times I like to see how it's going, and I open Google Analytics to
check on its performance, see where the traffic's coming from and if some post
went viral.

One day, organic traffic went up noticeably, and after messing around with
**Google Analytics** I saw that referral traffic went down significantly
exactly at the same time! Bummer, I didn't just nail some SEO trick.
Something changed at Google's end and now that's messing with my data.
That was on July 23rd 2011.
After 5 more minutes of investigation, I realized all the traffic coming from
**Google Images** was now being treated as **organic search traffic**, as
before it was always considered **referral traffic**.  I didn't care much back
then, so I left it like that. Mystery solved. I moved on to the websites I was
actually working for.

![Google Analytics change for Google Images traffic](/files/google-images-in-google-analytics/google-images-analytics-change.jpg)

But...

It turns out, one year later, I was again checking on my friend's blog
analytics. And looking at what keywords were bringing the most traffic, I
realized there was no way I could segment **real SEO effects** from this
combination of **Web Search** and **Image Search**. You can't create a profile
with just the real **organic traffic**, ignoring what comes from **Google
Images**.

Or at least I didn't know how to. So I search The Googlez&reg; for half an
hour, discussed the issue with a couple of colleagues, and then tweeted asking
for help. It turned out the last option gave me an answer.

My friend **[Ferran Gavin](https://twitter.com/ferrangavin "Ferran Gavin's
Twitter")** recommended me to use this snippet to track Google Images traffic as
its own source.

    <script type="text/javascript">
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-XXXXXXX-X']);

    var ref = document.referrer;
    if (ref.search(/google\.([^\/]+)\/(ima?g|.*[?&]tbm=isch|.*[?&]site=images)/i) != -1) {
      var regex = /google\.([^\/]+)\/.*/i;
      var match = regex.exec(ref);

      if (ref.search(/[?&]prev=/i) != -1) {
        regex = /[?&]prev=([^&]*)/i;
        var match2 = regex.exec(ref);
        _gaq.push(['_addOrganic','images.googleSerps','q',true]);
        _gaq.push(['_setReferrerOverride', 'http://images.googleSerps.'+match[1]+unescape(match2[1])]);

      } else {
        _gaq.push(['_addOrganic','images.google','q',true]);
        _gaq.push(['_setReferrerOverride', 'http://images.'+match[0]]);
      }
    }

    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript';
      ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www')
             + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(ga, s);
    })();
    </script>

Source: [Google Products / Analytics
Forums](http://productforums.google.com/d/topic/analytics/fnfq6A4FG5Q/discussion)

After reading the code, it's obvious that it doesn't only track Google Image's
traffic as its own organic source, but it also adds a different source for
Google Image SERPS (the little boxes of images embedded in a normal Google
Search Results Page). Useful trick.

I trust that guy's SEO knowledge, so I just added the code to my friend's blog
after making sure the Javascript made sense, and then waited a few days to see
how it worked.

After those changes, nothing actually changed, except that I started seeing
the **Source** field in the **Search / Organic** report as `google`, `images.google`
or `images.googleSerps` depending on where the traffic was coming from.

Finally, I can now create separate profiles for **normal organic search traffic**
and for **Google Images traffic**. This is how I created a filter to show only
traffic from Google Images (both normal and SERPs):

![Google Analytics filter to segment traffic from Google
Images](/files/google-images-in-google-analytics/google-analytics-filter-for-google-images-source.jpg)

You can just use one filter and because the *Filter Pattern* field is a regular
expression, it will match both.

I hope this article is useful for people with the same problem I had.
Surprisingly, this solution is not easy to find on Google. It took just a
minute thanks to Twitter and Ferran.

<!-- **Update**: There's a discussion about this on [Hacker
News](http://news.ycombinator.com/). -->
