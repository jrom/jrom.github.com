---
layout: page
date: 27 Apr 2010 23:00
summary: Is coding blog engines funnier than writing in them? (plus dirty stuff about this blog)
description: Is coding blog engines funnier than writing in them? Jordi Romero thinks it is. Let's see why.
keywords: blog, blogs, Wordpress, ruby on rails, Sinatra, ruby, coding, development, web applications
title: I like coding blogs
---

As I [just mentioned](/hi-again), I've been in a passive-aggressive relationship with my blogger alter ego. There are many reasons to that, but one is more interesting to me:

> I enjoy more writing blog engines than writing blog posts.

I've been using *Wordpress* most of the time, for which I developed some themes (most of them lost, but I just keep the [last](http://github.com/jrom/jrom09) [two](http://github.com/jrom/jrom10)). Then, I've coded blog engines in PHP by myself (the source code is lost), using Rails (never finished) and Sinatra (first version using a database and coded from scratch [here](http://github.com/jrom/jromrb)). I'm sure I forgot some weekend projects done some years ago.

And now, this one. What's special about this blog? Well, it's the latest. And the prettiest. And is build as a **Sinatra** application using **Git** to store the posts. I discovered **[Nesta](http://effectif.com/nesta)** a couple of months ago thanks to the [Peepcode blog](http://blog.peepcode.com/tutorials/2010/about-this-blog). I cloned it and built this blog on top of it. I took the look and feel I already designed in my latest Sinatra blog (the one with the database that never got to see the sunlight) and *voilà*.

Besides from loading all the content from static files (pushed via Git), this blog features an awesome *non-existent* admin section, some very nice page caching (using the neat [sinatra-cache](http://github.com/kematzy/sinatra-cache) extension by Kematzy) to prevent loading the Ruby stack, a [feed](/articles.xml) and a [sitemap](/sitemap.xml). Oh, and the content is formatted using [Markdown](http://daringfireball.net/projects/markdown/) (almost everywhere) and [Haml](http://haml-lang.com/) (where the layout may be trickier). For the stylesheet generation, Haml's sister is used: [Sass](http://sass-lang.com/). There's some code highlighting capabilities thanks to [highlight.js](http://softwaremaniacs.org/soft/highlight/en/).

There is one feature I haven't implemented yet, but will do soon: **comments**. This blog now is using no database to work, and everything is page-cached when the first request arrives, so a traditional comments functionality would fuck everything up a little... unless I use some service like Disqus or Itense debate. I don't like these services (if there's a better alternative, please [tell me](/contact)), so I will have to code some mini-disqus-like web-service to feed my own blog's comments. I'll keep you posted.
