const files = require.context('.', true, /\.vue$/)

const components = []

files.keys()
  .forEach((key) => {
    const childModule = files(key).default
    components.push(childModule)
  })

let installed = false

const install = (Vue) => {
  if (installed) {
    return
  }
  installed = true
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

export default {
  install
}
