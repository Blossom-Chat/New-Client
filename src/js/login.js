if (LoadQueue.userData) login()
else{
    document.addEventListener('itemLoaded', () => {
        if (LoadQueue.userData) login()
    })
}

async function login() {
    await SaveData.clear()

    let test = true
    let box = document.querySelector('.opaque > div')
    let boxheight = document.querySelector('.opaque > div').getBoundingClientRect().height
    let container = document.querySelector('.opaque')
    let transparent = document.querySelector('.transparent')
    let extrasignup = document.querySelector('.opaque h4')

    function handle() {
        if (!test) return

        let cboun = container.getBoundingClientRect()

        if (cboun.height < boxheight) {
            box.style.top = 'revert'
            box.style.transform = 'revert'
        } else {
            box.style.top = ''
            box.style.transform = ''
        }

        if (innerWidth < 750) {
            container.style.borderLeft = 'none'
            transparent.style.display = 'none'
            extrasignup.style.display = 'block'
        } else {
            container.style.borderLeft = ''
            transparent.style.display = ''
            extrasignup.style.display = ''
        }

        test = false
        setTimeout(() => test = true, 500)
    }

    handle()
    window.onresize = handle

    let credit = [
        {
            name: 'Sora Sagano',
            link: 'https://unsplash.com/@sorasagano',
            photo: 'Canal between cherry blossom trees',
            file: 'sora-sagano-8sOZJ8JF0S8-unsplash.jpg'
        },
        {
            name: 'Yu Kato',
            link: 'https://unsplash.com/@yukato',
            photo: 'Boats on body of water',
            file: 'yu-kato-824OwkP7sgk-unsplash.jpg'
        },
        {
            name: 'Agathe',
            link: 'https://unsplash.com/@agathe_26',
            photo: 'Person riding bike on street',
            file: 'agathe-2cdvYh6ULCs-unsplash.jpg'
        },
        {
            name: 'Yusheng Deng',
            link: 'https://unsplash.com/@akiradeng',
            photo: 'Leafless trees near lake and mountains during daytime',
            file: 'yusheng-deng-gNZ6MHqtsLY-unsplash.jpg'
        },
        {
            name: 'Maud Bocquillod',
            link: 'https://unsplash.com/@maud_boc',
            photo: 'Pathway between cherry blossoms',
            file: 'maud-bocquillod-rzBvZs6mQWk-unsplash.jpg'
        },
        {
            name: 'Crystal Kay',
            link: 'https://unsplash.com/@xtalkay',
            photo: 'Pathway between cherry blossom trees',
            file: 'crystal-kay-7viWpO0fNss-unsplash.jpg'
        },
        {
            name: 'Qihao Wang',
            link: 'https://unsplash.com/@tommyskywalker',
            photo: 'Pink cherry blossom tree under blue sky',
            file: 'qihao-wang-dzYR22Eros0-unsplash.jpg'
        },
        {
            name: 'Edan Cohen',
            link: 'https://unsplash.com/@edanco',
            photo: 'Red leaf trees near body of water during daytime',
            file: 'edan-cohen-mkVYygLHh80-unsplash.jpg'
        }
    ]

    let bg = window.LOGIN_BG ?? Math.round(Math.random() * (credit.length - 1))

    console.log(bg, credit[bg])

    document.querySelector('.login').style.backgroundImage = `url("/src/backgrounds/${credit[bg].file}")`
    document.querySelector('.author').innerHTML = `<p>${credit[bg].photo} <span>by <a href="javascript:void(0)" onclick="Utils.openLink('${credit[bg].link}')">${credit[bg].name}</a> on <i>Unsplash</i></span></p>`

    window.LOGIN_BG = bg
    window.LOGIN_CACHEPLEASE = new Image()

    window.LOGIN_CACHEPLEASE.onload = () => {
        let main = document.querySelector('.main')
        main.style.opacity = '1'
        main.style.top = '50%'
        main.style.pointerEvents = 'auto'
    }

    window.LOGIN_CACHEPLEASE.src = `/src/backgrounds/${credit[bg].file}`

    document.querySelector('.password').onclick = async () => {
        if (document.querySelector('.password span').innerHTML == 'visibility') {
            document.querySelector('.input').type = 'text'
            document.querySelector('.password span').innerHTML = 'visibility_off'
        }
        else {
            document.querySelector('.input').type = 'password'
            document.querySelector('.password span').innerHTML = 'visibility'
        }
    }

    let processing = false

    async function submit() {
        if (processing) return
        processing = true
        let allfilled = true
        document.querySelectorAll('input').forEach(i => {
            if (i.value == '') allfilled = false
        })

        if (!allfilled) return

        document.querySelector('[data-submit]').innerHTML = '<span loading style="width: 12px"></span>'

        let auth = await new Promise(async resolve => {
            if (Router.currentPage == 'login') {
                document.querySelectorAll('.opaque h3')[0].innerHTML = 'Username or Email'
                document.querySelectorAll('.opaque h3')[1].innerHTML = 'Password'

                let res = await fetch('https://blossom.kontroll.dev/user/login', {
                    method: 'POST',
                    body: JSON.stringify({ login: document.querySelectorAll('input')[0].value, password: document.querySelectorAll('input')[1].value }),
                    headers: { 'Content-Type': 'application/json' }
                }).then(a => a.json())

                if (res.success == false) {
                    switch (res.problem) {
                        case 'login':
                            document.querySelectorAll('.opaque h3')[0].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            break
                        case 'register':
                            document.querySelectorAll('.opaque h3')[1].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            break
                        case 'all':
                            document.querySelectorAll('.opaque h3')[0].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            document.querySelectorAll('.opaque h3')[1].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            break
                    }
                    document.querySelector('[data-submit]').innerHTML = 'Log In'
                    processing = false
                } else resolve(res)
            } else {
                document.querySelectorAll('.opaque h3')[0].innerHTML = 'Username'
                document.querySelectorAll('.opaque h3')[1].innerHTML = 'Email'
                document.querySelectorAll('.opaque h3')[2].innerHTML = 'Password'

                let res = await fetch('https://blossom.kontroll.dev/user/register', {
                    method: 'POST',
                    body: JSON.stringify({ username: document.querySelectorAll('input')[0].value, email: document.querySelectorAll('input')[1].value, password: document.querySelectorAll('input')[2].value }),
                    headers: { 'Content-Type': 'application/json' }
                }).then(a => a.json())
                
                if (res.success == false) {
                    switch (res.problem) {
                        case 'username':
                            document.querySelectorAll('.opaque h3')[0].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            break
                        case 'email':
                            document.querySelectorAll('.opaque h3')[1].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            break
                        case 'password':
                            document.querySelectorAll('.opaque h3')[2].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            break
                        case 'all':
                            document.querySelectorAll('.opaque h3')[0].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            document.querySelectorAll('.opaque h3')[1].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            document.querySelectorAll('.opaque h3')[2].innerHTML += `<span class="error">&nbsp;&nbsp;${res.reason}</span>`
                            break
                    }
                    document.querySelector('[data-submit]').innerHTML = 'Sign Up'
                    processing = false
                } else {
                    document.querySelector('.email').style.opacity = '1'
                    document.querySelector('.email').style.top = '50%'

                    await new Promise(resolve => {
                        async function chk() {
                            let isActive = await fetch('https://blossom.kontroll.dev/user/active?id=' + res.id).then(a => a.json())
                            if (isActive.active) return resolve()
                            setTimeout(chk, 2000)
                        }
                        
                        chk()
                    })

                    document.querySelector('.email').style.opacity = '0'
                    document.querySelector('.email').style.top = '40%'

                    resolve(res)
                }
            }
        })

        SaveData.set('authkey', auth.authkey)
        SaveData.set('id', auth.id)

        await new Promise(r => setTimeout(r, 1000))

        Router.display('home')
    }

    document.querySelector('[data-submit]').onclick = submit
    document.onkeydown  = e => {
        if (!e.repeat && e.key == 'Enter') submit()
    }

}