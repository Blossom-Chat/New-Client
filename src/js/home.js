(async function () {
    let info = await fetch('https://blossom.kontroll.dev/user/find?id=' + Storage.id).then(a => a.json())

    document.querySelector('h1').innerHTML = `Hello, ${info.username}.`
})()