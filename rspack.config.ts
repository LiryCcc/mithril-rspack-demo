import { defineConfig } from '@rspack/cli';
import { HtmlRspackPlugin, type SwcLoaderOptions } from '@rspack/core';
import { resolve } from 'node:path';

const __dirname = import.meta.dirname;

const config = defineConfig({
  entry: './src/main.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve(__dirname, 'src'),
      'mithril/jsx-dev-runtime': 'mithril/jsx-runtime'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true
              },
              transform: {
                react: {
                  pragma: 'm',
                  pragmaFrag: 'm.fragment',
                  runtime: 'classic',
                  importSource: '@/jsx-runtime' // 添加这行
                }
              }
            }
          } as SwcLoaderOptions
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlRspackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    port: 58236,
    hot: true,
    open: true
  }
});

export default config;
