const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

// 创建一个插件的实例对象
const htmlplugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'), // 源文件
    filename: 'index.html', // 生成内存中首页的路径/名称
})
module.exports = {
    mode: 'production', // production  development,
    module: { //要打包的第三方模块
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/, use: [
                'style-loader', 
                'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]',
                'sass-loader'
            ]},
            { test: /\.css$/, use: ['style-loader', 'css-loader']},
            { test: /\.(ttf|woff|woff2|eot|svg)$/, use: "url-loader" },
            { test: /\.(jpg|png|gif|bmp)/, use: "url-loader" }
        ]
    },
    plugins: [
        htmlplugin
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, '/src')
        }
    },
    devServer: {
        // https://www.jianshu.com/p/f489e7764cb8
        proxy: {
          '/api': {
            target: 'https://api.douban.com/v2',
            secure: false,
            // 比如我请求了 /api/movie/in_theaters
            // 实际请求了  https://api.douban.com/v2/movie/in_theaters
            pathRewrite: {'^/api' : ''},
            changeOrigin: true,
          },
        },
      }
}