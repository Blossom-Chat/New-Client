window.Pages = {
    /**
     * Login
     */
    login: {
        page: 'login',
        script: 'login',
        style: 'login'
    },

    /**
     * Register
     * [overrides]: login.js, login.css
     */
    register: {
        page: 'register',
        script: 'login',
        style: 'login'
    },
    
    /**
     * Home
     */
    home: {
        page: 'home',
        script: 'home',
        style: 'home'
    },
    
    /**
     * Server
     * [additions]: text.js
     */
    home: {
        page: 'server',
        script: [ 'home', 'text' ],
        style: 'home'
    }
}
