---
layout: page
date: 30 Apr 2010 18:00
summary: Know and configure the Mutt mail client with Gmail's IMAP and GPG encryption
description: Article about configuring Mutt for Gmail's IMAP and how to use GnuPG to encrypt or sign e-mails in Mutt.
keywords: mutt, gmail, google apps, e-mail, mail, mail client, unix, smtp, imap, tls, gnupg, gpg, encryption, pgp
title: Gmail in Mutt
---

![Screenshot of the Mutt mail client](/files/gmail-in-mutt/mutts.png)
**Mutt** is an open-source ([GPL](http://www.gnu.org/licenses/gpl.html)) text-based mail client for Unix. It may not be the best client if you receive a lot of messages formatted with HTML (most newsletters or *good* spam are), but it's a nice program to know, because some day you may feel more hacker and want to use it.

To use Mutt, you must first install it. But that's too easy: it's on every *<acronym title="FreeBSD's ports, Debian's dpkg, OS X's macports, homebrew, etc.">package management system</acronym>* after that weird name: **mutt**.

Before touching **Mutt**, you must enable Gmail's IMAP for your account, going to **Settings** &rarr; **Forwarding and POP/IMAP** &rarr; **Enable IMAP**. <a href="/files/gmail-in-mutt/gmail-imaps.png">Like this</a>.

After that comes the only tricky part: configuring Mutt to check your Gmail's IMAP Inbox and send emails through Google's SMTP server. And I already did the research on what's needed to this. I'm using [Google Apps](http://www.google.com/apps/) for my personal domain, and it works exactly like a regular <code>@gmail.com</code> account, with the only difference of the username format. (Google Apps is absolutely a *must-have* for your domain unless you have some bigger solution).

You need to populate your <code>~/.muttrc</code> like this:

    # Me
    set from = "you@gmail_or_your_domain.com"
    set realname = "Jordi Romero"

    # My credentials
    set smtp_url = "smtp://you@gmail_or_your_domain.com@smtp.gmail.com:587/"
    set smtp_pass = "password"
    set imap_user = "you@gmail_or_your_domain.com"
    set imap_pass = "password"

    # My mailboxes
    set folder = "imaps://imap.gmail.com:993"
    set spoolfile = "+INBOX"
    set postponed = "+[Gmail]/Drafts"

    # Where to put the stuff
    set header_cache = "~/.mutt/cache/headers"
    set message_cachedir = "~/.mutt/cache/bodies"
    set certificate_file = "~/.mutt/certificates"

    # Etc
    set mail_check = 30
    set move = no
    set imap_keepalive = 900
    set sort = threads
    set editor = "vim"

    # GnuPG bootstrap
    # source ~/.mutt/gpg.rc

Of course you'll want to <code>chmod 700 ~/.muttrc</code> if you put that kind of sensitive data, or just don't specify your passwords and will be prompted every time (for example in a non private environment). And you will also need to <code>mkdir -p ~/.mutt/cache</code> before firing mutt.

### Using Mutt

Now you can start it by typing <code>mutt</code> in a terminal. Read the [Documentation](http://www.mutt.org/doc/manual/manual-2.html) on how to move and use Mutt. The main concepts are similar to vim's navigation shortcuts.

### Encryption with GnuPG

One of the nice things about Mutt is that it has **encryption**/**signing** support out of the box. You just need to setup your keys in your environment and it will do the rest. If you already have your key in the ~/.gnupg/ directory, skip to the next point.

As before, you first need to install **gnupg** with your package management system. After that, you will need to:

    # Generate your key
    # You can use the default answers
    # Choose a strong passphrase
    gpg --gen-key

    # Generate your Public key
    gpg --armor --output pubkey.txt --export 'name'

    # Register your public key in a public server
    gpg --send-keys --keyserver hkp://subkeys.pgp.net

And you are done. You can share your <code>pubkey.txt</code> with everybody and everybody will be able to send you encrypted mails or check your signed messages.

Besides that, to setup correctly the environment for Mutt, you will have to uncomment the last line of the <code>~/.muttrc</code> and copy the [gpg.rc](/files/gmail-in-mutt/gpg.rc) file to <code>~/.mutt/gpg.rc</code>.

Now you can fire **Mutt** again and encrypt or sign a message by pressing the **p** key just before sending (**y**). Decryption or signature verification is done behind the scenes.

### Feedback highly appreciated
I hope some of you will actually use Mutt and give back to me some tips! Until the comments are on, please use the [contact page](/contact).

