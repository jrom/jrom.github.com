---
layout: page
date: 28 Apr 2010 01:00
updated: 28 Apr 2010 16:00
summary: Let's see what have to be done to get the maximum performance
description: Step-by-step tutorial on how to use page caching in Sinatra apps, specifically when deploying to a Passenger + nginx setup.
keywords: ruby, ruby on rails, Sinatra, page caching, page cache, caching, sinatra-cache, Sinatra cache, nginx, passenger, mod_rails
categories: ruby
title: Page caching with Sinatra and nginx
---

![Sinatra](/files/page-caching-with-sinatra-and-nginx/sinatra.gif)
I've built some small websites with Sinatra lately (this blog itself). And in exactly all the cases I needed page caching, because the content would change once a month, a week, or a day. Page caching is **easy**, but sometimes you just need some tip. Let's fix that by giving some simple and direct instructions in order to enable page caching and serving it from nginx:

First of all, we need [Sinatra::Cache](http://github.com/kematzy/sinatra-cache "sinatra-cache on Github"), the Sinatra extension that will make our life much nicer. You can either <code>gem install sinatra-cache</code> or add <code>gem "sinatra-cache", "0.3.2"</code> to your Gemfile.

After that, you will have to require and activate the extension in a *configure* block:

    require 'sinatra/cache'

    module Jrom
      class Application < Sinatra::Base
        configure do
          register(Sinatra::Cache)
          set :root, File.dirname(__FILE__)
          set :cache_enabled, true
          set :cache_output_dir, Proc.new { File.join(root, 'public', 'cache') }
        end

        get '/' do
          "Hi there"
        end
      end
    end

As you can see, first we *register* it, and then set a couple of config options. Actually, I wasn't able to get it to work in a *classic style* app (when you just start coding *get*'s and *post*'s to the Ruby file, opposed to creating a subclass of *Sinatra::Base*), and that's why I'm using the *subclass style*.

If this is the first time you see a Sinatra application using the *Sinatra::Base* thing, just remember to have a <code>config.ru</code> like this:

    require 'app'
    run Jrom::Application

Let's continue, now we have our Sinatra app performing caching (by default it only does in production environment, check the *cache_environment* setting to change that if needed). A lot of people would stop here and go have some beers happy with an app that will be creating a cached page in **every request**, doing actually **more work** instead of less... That's lame, but a lot of people does it.

![nginx](/files/page-caching-with-sinatra-and-nginx/nginx.gif)
The next but very important step is telling the web server (aka **nginx**) to serve the cached page if there is some. The following code must be added in the <code>server { ... }</code> block of the nginx config:

    if (-f $request_filename)
    {
      break;
    }

    if (-f $document_root/cache$request_filename)
    {
      rewrite (.*) /cache$1 break;
      break;
    }

    if (-f $document_root/cache$request_uri.html)
    {
      rewrite (.*) /cache$1.html break;
      break;
    }

    if (-f $document_root/cache$request_uri/index.html)
    {
      rewrite (.*) /cache$1/index.html break;
      break;
    }

This code is derived from the one published by Josh Susser on this [blog post](http://blog.hasmanythrough.com/2008/1/30/segregated-page-cache-storage). His code *as is* didn't work for me, if you know why, please tell me.

Now our app is caching and enjoying the cached files nicely. But two small tweaks can still be done:

Add <code>&lt;%= cache_timestamp %&gt;</code> in your layout to print a comment with the timestamp when the page was cached, and add this **Capistrano** tasks to create the cache directory, link it to shared and flush the cached files when deploying:

    after "deploy:setup", "create_page_cache"
    desc "Creates the cache dir"
    task :create_page_cache, :roles => :app do
      run "umask 02 && mkdir -p #{shared_path}/cache"
    end

    after "deploy:update_code","symlink_shared_dirs"
    desc "Links the public/cache with the shared/cache"
    task :symlink_shared_dirs, :roles => :app do
      run "cd #{release_path} && ln -nfs {shared_path}/cache #{release_path}/public/cache"
    end

    set :flush_cache, true

    task :keep_page_cache do
      set :flush_cache, false
    end

    after "deploy:cleanup", "flush_page_cache"
    desc "Empties the page cache"
    task :flush_page_cache, :roles => :app do
      if flush_cache
        run "rm -rf #{shared_path}/cache/*"
      end
    end

I think that's enough to get a healthy Sinatra application performing page caching and flushing when deploying. You can also use the <code>cache_expire('/path')</code> to expire pages on some actions (e.g.. when an article is saved), but that's out of this post's subject, just read the doc of the extension.

I hope that was useful to somebody, and I encourage you to cache every possible page in your web applications. The performance boost will be incredible.
