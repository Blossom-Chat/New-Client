window.Router = {
    /**
     * The current page
     */
    currentpage: null,

    /**
     * Displays a page from the /pages/ folder.
     * @param {string} page The HTML file to load. 
     * @param {string|boolean} [script] The JS file to load.
     * @param {string|boolean} [style] The CSS file to load.
     * @returns A boolean depicting if the function succeeded.
     */
    async display(page, script = null, style = null) {
        document.body.innerHTML = ''
        document.querySelector('[data-link]').innerHTML = ''

        if (style != false) {
            let css = await fetch(`/css/${style ?? page}.css`).then(a => { if (a.status == 404) return null; return a.text() })
            if (css == null) return false

            await new Promise(r => {
                function chk() {
                    if (!document.styleSheets[1]) return setTimeout(chk, 100)
                    if (!document.styleSheets[1].cssRules && (!document.styleSheets[1].rules || !document.styleSheets[1].rules.length)) return setTimeout(chk, 100)
                    r()
                }

                document.querySelector('[data-link]').innerHTML = css

                chk()
            })
        }

        let content = await fetch(`/pages/${page}.html`).then(a => { if (a.status == 404) return null; return a.text() })
        if (content == null) return false
        document.body.innerHTML = content

        if (script != false) {
            let js = await fetch(`/js/${script ?? page}.js`).then(a => { if (a.status == 404) return null; return a.text() })
            if (js == null) return false
            eval(js)
        }

        this.currentpage = page

        return true
    }
}
