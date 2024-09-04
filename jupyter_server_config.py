# Configuration file for jupyter-server.
c = get_config()  #noqa

c.ServerApp.allow_origin='https://ai-labs-dev-frontned.azurewebsites.net'

c.ServerApp.tornado_settings = {
    "headers": {
        "Content-Security-Policy": "frame-ancestors 'self' https://ai-labs-dev-frontned.azurewebsites.net"
    }
}

c.NotebookApp.tornado_settings = {
    'headers': {
        'Content-Security-Policy': "frame-ancestors 'self' https://ai-labs-dev-frontned.azurewebsites.net",
    }
}

# To disbale the token authentication
c.ServerApp.token=''

c.ServerApp.disable_check_xsrf=True
c.NotebookApp.disable_check_xsrf = True