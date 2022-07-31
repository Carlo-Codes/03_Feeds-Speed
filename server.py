#Use to create local host
import http.server
import socketserver

PORT = 1337

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
      ".js": "application/javascript",
      ".html" : "text/html",
      ".css" : "text/css"
});

httpd = socketserver.TCPServer(("", PORT), Handler)
httpd.serve_forever()