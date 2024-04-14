const LoadQueue = {}

const fullyLoaded = new CustomEvent('fullyLoaded', { queue: LoadQueue })
const itemLoaded = new CustomEvent('itemLoaded', { queue: LoadQueue })

LoadQueue.fonts = false
LoadQueue.userData = false

const tryLoaded = setInterval(() => {
    let isFullyLoaded = true
    Object.keys(LoadQueue).forEach(i => {
        if (LoadQueue[i] == false) isFullyLoaded = false
    })

    if (isFullyLoaded) {
        document.dispatchEvent(fullyLoaded)
        clearInterval(tryLoaded)
    }
}, 500)

document.addEventListener('fullyLoaded', () => {
    console.log('fullyLoaded')
})

document.addEventListener('itemLoaded', () => {
    console.table(LoadQueue)
})

// --------------------
// Fonts
// --------------------

async function loadFonts() {
    await document.fonts.ready
    await new Promise(resolve => document.fonts.onloadingdone = resolve)

    LoadQueue.fonts = true
    document.dispatchEvent(itemLoaded)
}
loadFonts()

// --------------------
// User Data
// --------------------

async function loadUserData() {
    await SaveData.setup()

    __TAURI__.window.appWindow.onCloseRequested(async () => {
        await SaveData.save()
    })

    setInterval(async () => await SaveData.save(), 10000)

    if (SaveData.get('authkey') && SaveData.get('id')) {
        let res = await fetch('https://blossom.kontroll.dev/user/auth', {
            method: 'POST',
            body: JSON.stringify({ code: SaveData.get('authkey') }),
            headers: { 'Content-Type': 'application/json' }
        }).then(a => a.json())

        if (res.success == false) {
            Router.display('login')
           SaveData.remove('authkey')
        }
        else Router.display('home')
    }
    else Router.display('login')

    LoadQueue.userData = true
    document.dispatchEvent(itemLoaded)
}
loadUserData()
