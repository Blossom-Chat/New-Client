(async function () {
    let info = await fetch('https://blossom.kontroll.dev/user/find?id=' + Storage.id).then(a => a.json())

    window.Socket = new WebSocket('wss://blossom.kontroll.dev/socket/')

    let text = document.querySelector('.text')
    let p = false

    let m = 1 / 15

    function setmult(x) {
        document.querySelector('.main .content .area').setAttribute('style', '--mult: ' + x)
    }

    async function height() {
        if (p) return
        p = true

        ///
        setmult(1)

        if (text.scrollHeight < 256) {
            let mult = (text.scrollHeight - 30) * m
        
            setmult(Math.floor(mult))
        } else setmult(15)
        ///

        p = false
    }

    text.oninput = height
    window.onresize = height

    height()
})()
