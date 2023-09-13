const { fs, os } = window.__TAURI__
let Storage = {}

/**
 * Opens a URL in the default web browser
 * @param {string} url
 */
async function open_link(url) {
    try { window.__TAURI__.invoke('open_link', { url }) } catch (err) { return err }
};

async function get_environment_variable(name) {
    try {
        let r = await window.__TAURI__.invoke('get_environment_variable', { name }).then(r => r)
        return r
    } catch (err) { return err }
};

async function getpath() {
    let type = await os.type()
    let path
    switch (type) {
        case 'Windows_NT':
        default:
            path = await get_environment_variable('APPDATA') + '\\Blossom\\save.dat'
            break
        case 'Linux':
            path = await get_environment_variable('HOME') + '/Blossom/save.dat'
            break
        case 'Darwin':
            path = '/Library/Containers/etc/Blossom/save.dat'
            break
    }
    return path
}

async function save() {
    let path = await getpath()

    await fs.writeFile(path, btoa(JSON.stringify(Storage)))
    return
};

async function load() {
    let path = await getpath()

    if (!(await fs.exists(path))) return {}

    let save = await fs.readTextFile(path)

    console.log(save)

    try { return JSON.parse(atob(save)) } catch { return {} }
};

window.addEventListener('load', async () => {
    Storage = await load()

    window.__TAURI__.window.appWindow.onCloseRequested(async e => {
        await save()
        // window.close()
    })

    setInterval(save, 10000)

    if (Storage.authkey) {
        let res = await fetch('https://blossom.kontroll.dev/user/auth', {
            method: 'POST',
            body: JSON.stringify({ code: Storage.authkey }),
            headers: { 'Content-Type': 'application/json' }
        }).then(a => a.json())

        if (res.success == false) {
            Router.display('login')
           delete Storage.authkey
        }
        else Router.display('home')
    } else Router.display('login')

    // Router.display('home')
})