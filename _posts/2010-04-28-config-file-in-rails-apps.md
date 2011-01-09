---
layout: page
date: 28 Apr 2010 23:00
summary: One-liner to create a useful YAML config files
categories: ruby
keywords: ruby on rails, rails, ruby, yaml, config, config file, initializer, yml
description: Demonstration of a snippet to create and load YAML config files in Ruby on Rails applications
title: Config file in Rails apps
---

How many times do you find yourself hardcoding something that you now you'll have to refactor and extract into a config file? But you don't, because you don't have that config file, and you don't want to loose 10 minutes thinking (or the XXI's century equivalent, googling) a solution.  If you are nodding and feeling guilty, continue reading.

In an existent Rails application, just type

    rake rails:template LOCATION=http://github.com/jrom/rails-app.yml/raw/master/rails-app.yml.rb

or if you are about to create the app, extend the rails command like this:

    rails <app> -m http://github.com/jrom/rails-app.yml/raw/master/rails-app.yml.rb

That wasn't hard, was it? The code that just ran is **so** simple that you can go [check it](http://github.com/jrom/rails-app.yml/blob/master/rails-app.yml.rb). After asking you the name of that config (or assuming the default: *app*) it will create the **YAML** file under the <code>config</code> directory and create an initializer to load its content when the application starts. The config comes with a demo variable, defined in the three typical Rails environments: *production*, *development* and *test*. You can use <code>APP_CONFIG['variable']</code> (if the config name was app) anywhere and it will return the value for the current environment and that variable.

Enjoy it and use the [issues](http://github.com/jrom/rails-app.yml/issues) section in Github for any comment about the code.

**Bonus plus**: it's Rails 3 compatible!
