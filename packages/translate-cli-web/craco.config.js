const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const webpackPlugins = [];

if (process.env.NODE_ENV === 'development') {
  webpackPlugins.push(new SimpleProgressWebpackPlugin());
} else {
  // TEST: 仅测试打包使用
  // webpackPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  webpack: {
    plugins: {
      add: webpackPlugins,
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@primary-color': '#3b424b'
            }
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        baseUrl: "./src"
      }
    }
  ],
  "babel": {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
          useBuiltIns: 'entry', // browserslist环境不支持的所有垫片都导入
          corejs: {
            version: 3, // 使用core-js@3
            proposals: true,
          },
        },
      ],
    ]
  },
  devServer: {
    proxy: {
      "/app/api": {
        target: 'http://127.0.0.1:7000',
        changeOrigin: true
      }
    }
  }
};