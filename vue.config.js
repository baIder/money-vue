const path = require('path')
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/rich-account-vue2-local-edition/'
    : '/',
  transpileDependencies: true,
  lintOnSave: false,
})
