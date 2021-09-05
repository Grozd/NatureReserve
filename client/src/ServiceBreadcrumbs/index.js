// событие перехода в браузере по стрелкам
function addListener() {
    window.addEventListener('popstate', module.exports.handlHistoryMove.bind(module.exports), true)
}

// перенести в redux
// хранит и обслуживает Breadcrumbs
class ServiceBreadcrumbs {
    constructor() {
      this.state = {
          urlPathname: ['/home']
      }
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
    // удаление из массива pathname - текущей страницы
    handlHistoryMove() {
        let path = document.location.pathname
        this.removeItem(path)
    }
}

module.exports = new ServiceBreadcrumbs()
addListener()