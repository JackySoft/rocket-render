const files = require.context('.', true, /\.js$/)

const modules = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  // modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
  const childModule = files(key).default
  for (const key in childModule) {
    if (modules[key]) {
      throw new Error(`Api的名称[${key}]不得重复（虽然你可以写在不同的模块中，但api的key必须唯一）`)
    }
    modules[key] = childModule[key]
  }
})

export default modules
