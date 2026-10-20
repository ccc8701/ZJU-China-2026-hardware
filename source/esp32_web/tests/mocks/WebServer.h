#pragma once
#include "Arduino.h"
#include "control_runtime.h"
#include <map>
#include <functional>

enum HTTPMethod { HTTP_GET, HTTP_POST };
class WebServer {
public:
    struct Request {
        std::string path = "/api/state", body;
        HTTPMethod method = HTTP_GET;
        std::map<std::string, std::string> headers;
        std::string host = "192.168.4.1";
    } request;
    int code = 0;
    std::string response;
    std::map<std::string, std::string> responseHeaders;
    bool queued = false;
    std::function<void()> beforeRequest, duringResponse;
    explicit WebServer(int) {}
    void collectHeaders(const char *[], size_t) {}
    void on(const char *path, HTTPMethod method, std::function<void()> handler) { routes[std::make_pair(std::string(path), method)] = handler; }
    void onNotFound(std::function<void()> handler) { missing = handler; }
    void begin() {}
    void handleClient() {
        if (!queued) return;
        queued = false;
        if (beforeRequest) beforeRequest();
        code = 0; response.clear(); responseHeaders.clear();
        auto found = routes.find(std::make_pair(request.path, request.method));
        if (found != routes.end()) found->second(); else if (missing) missing();
    }
    String header(const char *name) const {
        auto found = request.headers.find(name);
        return found == request.headers.end() ? String() : String(found->second);
    }
    String hostHeader() const { return String(request.host); }
    String arg(const char *) const { return String(request.body); }
    String uri() const { return String(request.path); }
    HTTPMethod method() const { return request.method; }
    void sendHeader(const char *name, const char *value) { responseHeaders[name] = value; }
    void send(int value, const char * = nullptr, const char *body = nullptr) {
        assert(!tankweb::controlLocked());
        code = value; response = body ? body : "";
        if (duringResponse) duringResponse();
    }
    void send_P(int value, const char *, const char *body, size_t size) {
        assert(!tankweb::controlLocked());
        code = value; response.assign(body, size);
        if (duringResponse) duringResponse();
    }
private:
    std::map<std::pair<std::string, HTTPMethod>, std::function<void()>> routes;
    std::function<void()> missing;
};
