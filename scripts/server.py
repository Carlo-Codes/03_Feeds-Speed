from http.server import HTTPServer,BaseHTTPRequestHandler

HOST = "localhost"
PORT = 9999

class FeedSpeedServer(BaseHTTPRequestHandler):

    def do_GET(self):


        if self.path == "/":
            self.path = '/index.html'
        
        try:
            file = open(self.path[1:]).read()
            self.send_response(200)
        except:
            file = "file not found"
            self.send_response(404)

        #self.send_header("content-type", "text/html")
        #self.send_header("content-type", "text/javascript")
        #self.send_header("content-type", "text/css")
        self.end_headers()    
        self.wfile.write(bytes(file, 'utf-8'))

httpd = HTTPServer((HOST, PORT), FeedSpeedServer)
print("server running...")
httpd.serve_forever()
print("server Stopped")

