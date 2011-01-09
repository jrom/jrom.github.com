---
layout: page
date: 10 Jan 2011 01:00
summary: Yet another blog engine for the exact same blog. Blog rewriting is definitely funny.
description: Thoughts about blog engines and the switch from nesta (sinatra blog engine) to Jekyll (the engine behind github pages)
keywords: blog, blogs, sinatra, ruby on rails, ruby, jekyll, static, generator, github
title: I did it again!
---

I [said it once](/i-like-coding-blogs) already, but I'm going to talk
about the same thing today. I enjoy rewriting or reimplementing blog
engines. Most definitely more than writing blog posts.

The last time I did that, I kept the design and went from a [sinatra app
with database backend](https://github.com/jrom/jromrb) to a [git-backed
engine](https://github.com/jrom/jrom.net) (a fork of
[Nesta](http://effectif.com/nesta)).

This time, i kept absolutely everything (design, html, feed, sitemap,
about pages, etc.) but went to the static site generator
[Jekyll](https://github.com/mojombo/jekyll). The goal was to make this
change transparent to the (possible) readers, search engines and feed
subscribers would never notice the change, except for this post. In the
last *migration* I moved all the blog posts to Markdown files, this was
very nice, because I love formatting text using that markup language,
and I still use it with Jekyll. The worst part were the haml and sass
files. There's no support for haml or sass on Github Pages (the
generator I'm using to host this blog now), so I had to go back to plain
CSS and HTML. This made me sad, but I definitely wanted everything in
the same place and without using weird deployment strategies. Just git
push for both posts and layout modifications. Github pages were the
answer, so the move back made sense to me.

Other than that, I just had to replace some haml/erb/builder files with
plain html/xml using [Liquid](http://www.liquidmarkup.org/) and make
sure everything was smooth again.

Thanks to the awesome [**Github pages**](http://pages.github.com/)
service, all I had to do is push to
[github.com/jrom/jrom.github.com](https://github.com/jrom/jrom.github.com)
and wait a couple of minutes.

Enjoy!
