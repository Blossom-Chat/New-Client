import fs from 'fs'

var json = JSON.parse(fs.readFileSync('package.json'))

fs.readFile('src-tauri/Cargo.toml', (e, d) => {
    fs.writeFile('src-tauri/Cargo.toml', d.toString().replace(/version = "\d\.\d\.\d"/, `version = "${json.version}"`), e => { })
})

fs.readFile('src-tauri/Cargo.lock', (e, d) => {
    fs.writeFile('src-tauri/Cargo.lock', d.toString().replace(/name = "Blossom"\nversion = "\d\.\d\.\d"/, `name = "Blossom"\nversion = "${json.version}"`), e => { })
})