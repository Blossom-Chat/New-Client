if (LoadQueue.userData) home()
else{
    document.addEventListener('itemLoaded', () => {
        if (LoadQueue.userData) home()
    })
}

async function home() {
    let info = await fetch('https://blossom.kontroll.dev/user/find?id=' + SaveData.get('id')).then(a => a.json())

    console.log(info)

    document.querySelector('.user .inner .image').src = info.avatarurl + '?size=38'
    document.querySelector('.user .popup .banner .image').src = info.avatarurl + '?size=80'

    document.querySelector('.user .inner .stack .name').innerHTML = info.username
    document.querySelector('.user .popup .details .name .username').innerText = info.username

    document.querySelector('.user .popup .details .name .discriminator').innerText = '#' + info.discriminator

    document.querySelector('.user .popup .banner').style.background = `rgb(${info.bannerColour.join(',')})`

    servers()
}

async function servers() {
    let joined = await fetch(`https://blossom.kontroll.dev/user/servers?id=${SaveData.get('id')}&authkey=${SaveData.get('authkey')}`).then(a => a.json())
    console.log(joined)
}