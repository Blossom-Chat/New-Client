const { fs, os } = __TAURI__

class Data {
    constructor() {
        this.setup()
    }

    async setup() {
        this.path = await this.getPath()
        this.data = await this.load()
    }

    async getPath() {
        let type = await os.type()
        let path
        switch (type) {
            case 'Windows_NT':
            default:
                path = await Utils.getEnvironmentVariable('APPDATA') + '\\Blossom\\save.dat'
                break
            case 'Linux':
            case 'Darwin':
                path = await Utils.getEnvironmentVariable('HOME') + '/.blossom/save.dat'
                break
        }
        return path
    }
    
    async save() {
        await fs.writeFile(this.path, btoa(JSON.stringify(this.data)))
    }
    
    async load() {    
        if (!(await fs.exists(this.path))) return {}
    
        let save = await fs.readTextFile(this.path)
    
        try { return JSON.parse(atob(save)) } catch { return {} }
    }

    async clear() {
        this.data = {}
        await fs.writeFile(this.path, btoa(JSON.stringify(this.data)))
    }

    get(key) {
        this.data[key]
    }

    set(key, value) {
        this.data[key] = value
    }

    remove(key) {
        delete this.data[key]
    }
}

window.SaveData = new Data()
