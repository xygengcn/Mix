// vue.config.js
module.exports = {

    publicPath: "./",
    //去掉map
    productionSourceMap: false,
    // devServer: {
    //   host: '172.20.10.4',
    //   port:8080
    // },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Mix助手'
                return args
            })
    },
    pwa: {
        name: 'Mix助手',
        themeColor: '#20a53a',
        msTileColor: '#20a53a',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'while',
        manifestPath: 'manifest.json',
        iconPaths: {
            favicon32: './img/icons/favicon-32x32.png',
            favicon16: './img/icons/favicon-16x16.png',
            appleTouchIcon: './img/icons/apple-touch-icon-152x152.png',
            maskIcon: './img/icons/android-chrome-maskable-512x512.png',
            msTileImage: './img/icons/android-chrome-maskable-512x512.png'
        },
        workboxOptions: {
            skipWaiting: true
        }
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}