import http.server
import socketserver
import os
import urllib.parse

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class VKServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent all browser caching so updates are instant
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Telemetry logging
        if path.startswith('/_client_'):
            params = urllib.parse.parse_qs(parsed.query)
            print(f"[CLIENT TELEMETRY] {path}: {params}", flush=True)
            self.send_response(204)
            self.end_headers()
            return

        # Handle RSC stream requests
        if path == '/.rsc' or path.endswith('.rsc') or '_rsc' in parsed.query:
            rsc_path = os.path.join(DIRECTORY, 'assets', 'root.rsc')
            if os.path.exists(rsc_path):
                with open(rsc_path, 'rb') as f:
                    content = f.read()
                self.send_response(200)
                self.send_header('Content-Type', 'text/x-component; charset=utf-8')
                self.send_header('Content-Length', str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return

        # SPA Routing: if path has no extension and is not a real directory/file, serve index.html
        local_path = os.path.join(DIRECTORY, path.lstrip('/'))
        if not os.path.exists(local_path) and '.' not in os.path.basename(path):
            self.path = '/index.html'

        return super().do_GET()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('127.0.0.1', PORT), VKServer) as httpd:
        print(f"VK Football World Server active on http://127.0.0.1:{PORT}", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
