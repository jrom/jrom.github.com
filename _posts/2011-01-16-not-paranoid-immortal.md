---
layout: page
date: 16 Jan 2011 13:00
summary: How the Immortal gem was born to replace acts_as_paranoid
categories: ruby
description: "Article about how we replaced acts_as_paranoid in order to upgrade to Rails 3, and created a brand new gem: Immortal"
keywords: rails, ruby, acts_as_paranoid, is_paranoid, default_scope, immortal, gem
title: Stop being Paranoid, be Immortal
---

A while ago, [Saimon](https://github.com/saimonmoore) and I started
upgrading [Teambox](http://teambox.com) to Rails 3.  Once we got a
bootable application (more on that in another post) the first big
problem we faced was `acts_as_paranoid`. Its internals are a mess, so
there was no chance we could just *fix* that for Rails 3. We decided we
would just write a brand new gem that shared the API as much as
possible.

The main goals were: implement almost the whole API from
acts_as_paranoid (this way the impact of replacing it in Teambox would
be minimal) and make it as small and lightweight as possible. We are
true BDD believers, so we started writing a
[spec](https://github.com/teambox/immortal/blob/29ffd7/spec/immortal_spec.rb)
for what we needed. After that, writing the
[code](https://github.com/teambox/immortal/blob/29ffd7/lib/immortal.rb)
was quite easy.

In our way, we changed some assumptions from acts_as_paranoid, such as
the need of storing **when** a row was deleted. Because of that, we no
longer needed a `deleted_at` field but a boolean `deleted` field. This
change demands a migration:

    class MigrateParanoidFields < ActiveRecord::Migration
      def self.up
        add_column :users, :deleted, :boolean
        add_index :users, [:deleted]
        User.update_all ["deleted = ?", true], "deleted_at IS NOT NULL"
        remove_column :users, :deleted_at
      end

      def self.down
        add_column :users, :deleted_at, :datetime
        add_index :users, [:deleted_at]
        User.update_all ["deleted_at = ?", Time.now], ["deleted = ?", true]
        remove_column :users, :deleted
      end
    end

While doing all this, at some point I regretted changing the `deleted`
field to a boolean, because it looks like every relational database out
there decides to implement (or not) their own boolean data type. This is
where [Arel](https://github.com/rails/arel) comes handy, because you can
just do something like this:

    default_scope where(arel_table[:deleted].eq(nil).or(arel_table[:deleted].eq(false)))

Although there has been
[discussions](http://blog.semanticart.com/2009/10/13/killing-is-paranoid.html)
about the convenience of using `default_scope` for anything other than
`order`, it just feels right to do it in this use case.


To sum up: the code is available at
[github](https://github.com/teambox/immortal) or just as a [Ruby
Gem](https://rubygems.org/gems/immortal).
Please feel free to contribute,
[Charles](https://github.com/unixcharles) already [did it](https://github.com/teambox/immortal/commit/3bc92da646009425a45e205d0cc60e8eef205ea1)!

