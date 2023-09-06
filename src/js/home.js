(async function () {
    let info = await fetch('https://blossom.kontroll.dev/user/find?id=' + Storage.id).then(a => a.json())

    let text = document.querySelector('.text')
    let p = false

    let m = 1 / 15

    async function height() {
        if (p) return
        p = true

        ///
        function setmult(x) {
            document.querySelector('.main .content .area').setAttribute('style', '--mult: ' + x)
        }

        setmult(1)

        let mult = (text.scrollHeight - 45) * m + 1
        
        if (mult < 15) {
            setmult(Math.floor(mult))
        } else setmult(15)
        ///

        p = false
    }

    text.oninput = height
    window.onresize = height

    height()
})()
