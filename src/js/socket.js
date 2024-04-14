class Socket {
    constructor(pathname) {
        this.URL = new URL('wss://blossom.kontroll.dev/')
        if (!pathname.endsWith('/')) pathname += '/'
        this.URL.pathname = pathname

        this.WebSocket = new WebSocket(this.URL)
    }
}

window.ChatSocket = new Socket('/socket/')