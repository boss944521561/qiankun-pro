/**
 * @title tiny-cookie
 * @desc 一个用于浏览器的小型cookie插件
 * @doc https://www.npmjs.com/package/tiny-cookie
 * @author Mason<mason.meng@wehotelglobal.com>
 */

const Cookie = require('tiny-cookie')

Number.isInteger = Number.isInteger || function(value) {
  return (
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  )
}

const WgCookie = {
  set: function(name, value, daysOrOptions) {
    var opts = daysOrOptions
    if (Number.isInteger(daysOrOptions)) {
      opts = { expires: daysOrOptions }
    }
    return Cookie.setRaw(name, value, opts)
  },

  get: function(name) {
    return Cookie.getRaw(name)
  },

  delete: function(name, options) {
    var opts = { expires: -1 }
    if (options !== undefined) {
      opts = Object.assign(options, opts)
    }
    this.set(name, '', opts)
  }
}

export default WgCookie
