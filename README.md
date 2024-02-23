This is a custom new Tab Page. You only need to run the backend on a Server (edit config files before) and change the default URL for new Tabs with an Addon like New-Tab-Override (https://addons.mozilla.org/de/firefox/addon/new-tab-override/). Without a backend you cant use the shortcut function.

#Installation:

- download the repository (with git clone or something similar)
- configure your Nginx or apache2 or something similar so that you can access your site with a domain
- install the Python dependencies
- start /backend/main.py with python3
- goto your domain to test if everyting works
- install an addon to set this domain as default value for new tabs (you should make a tick on "Set focus to the web page instead of the address bar")
- use it, modify it, make it better
