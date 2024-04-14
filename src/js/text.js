(async function () {
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

        console.log(text.scrollHeight)

        if (text.scrollHeight < 390) {
            let mult = (text.scrollHeight - 30) * m
        
            setmult(Math.floor(mult))
        } else setmult(25)
        ///

        p = false
    }

    text.oninput = height
    window.onresize = height

    height()
})()