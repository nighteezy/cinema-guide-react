const path = require('path');

module.exports = {
  mode: 'development', // или 'production' для финальной сборки
  entry: './src/index.tsx', // Точка входа, измените по необходимости
  output: {
    filename: 'bundle.js', // Имя выходного файла
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Поддержка для ts и jsx
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Обработка всех ts и tsx файлов
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader', // Используем ts-loader для обработки TypeScript
        },
      },
      {
        test: /\.css$/, // Обработка CSS файлов
        use: ['style-loader', 'css-loader'], // Стили в JavaScript, а затем в CSS
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
};
