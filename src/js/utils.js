window.Utils = {
    /**
     * Opens a URL in the default web browser
     * @param {string} url
     */
    async openLink(url) {
        try { __TAURI__.invoke('open_link', { url }) } catch (err) { return err }
    },

    /**
     * Retrieves a global environment variable
     * @param {string} name
     */
    async getEnvironmentVariable(name) {
        try {
            let r = await __TAURI__.invoke('get_environment_variable', { name }).then(r => r)
            return r
        } catch (err) { return err }
    }
}