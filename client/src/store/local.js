function addListener() {
    window.addEventListener('popstate', module.exports.handlHistoryMove.bind(module.exports), true)
}

class Store {
    constructor() {
      this.state = {
          urlPathname: ['/home']
      }
      this.logErrors = {}
    }

    addItem(pathname) {
        this.state.urlPathname.push(pathname)
    }
    removeItem(path) {
        let index = this.state.urlPathname.indexOf(path)
        this.state.urlPathname.splice(index + 1)
    
    }
    check(pathname) {
        if(this.state.urlPathname.includes(pathname)) {
            return null
        }
        this.addItem(pathname)
        return true
    }
    handlHistoryMove() {
        let path = document.location.pathname
        this.removeItem(path)
    }
}

module.exports = new Store()
addListener()