---
layout: page
date: 7 May 2010 18:00
categories: ruby
summary: HTTP Authentication in a few lines of ruby
description: Tutorial for creating protected pages in a Ruby on Rails application
keywords: ruby, ruby on rails, rails, authentication, http authentication, authorization, login
title: Super simple authentication in Rails
---

Here comes another short but (hopefully) useful Rails trick. In my client applications I often need to do some protected section to do backoffice stuff or similar. Sometimes I need a fully featured **authentication system**, then usually use [Authlogic](http://github.com/binarylogic/authlogic) (although I'm willing to try [Devise](http://github.com/plataformatec/devise)). Some other times you just need to hide a page to the public, and one password just works. And like everything in Rails, there's a quick way of doing that.

All you need is some controller code to protect the private pages and some code to check the credentials. The easier way is not even creating any HTML code for that and take advantage of the HTTP Authentication. Here's what I do in <code>app/controllers/application_controller.rb</code>:

    helper_method :logged_in?

    def logged_in?
      session[:login]
    end

    private
    def authenticate
      login = authenticate_or_request_with_http_basic do |username, password|
        username == "username" && password == "password"
      end
      session[:login] = login
    end

    def do_logout
      session[:login] = nil
    end

And now all it takes to force the user to authenticate for viewing some action, you just need to add a <code>before_filter</code> in that controller. It may look like this:

    class NewsController < ApplicationController
      before_filter :authenticate, :except => [:index, :show]
      # ...
    end

Here we are allowing public access to list and show a *New* but we are restricting all other actions (for example, creating, editing or destroying *News*) unless authenticated, but that's getting *offtopic*.

As a small extra, there's a helper method useful to show or hide special menus or something in the views, just put any *private* html inside an <code>if logged_in? ... end</code>.

That solution was really *quick*, but not very elegant. We don't want our credentials hardcoded into a controller, and sure we don't want our password in clear text! One better solution would be to use a [config file](/config-file-in-rails-apps) and hash the password, replacing the comparison line with this one:

    username == APP_CONFIG['username'] && Digest::SHA1.hexdigest(password) == APP_CONFIG['password']

And of course storing this two variables in our config YAML file. To create the hashed version of the password for the config file the easiest way is by using the Rails console or just <code>irb</code>, and use the <code>hexdigest</code> method shown here. This will provide a quick but nice solution to our private sections.
