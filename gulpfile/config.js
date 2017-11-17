module.exports = {
  port: 8005, // 端口
  local: './public/local/', // 开发环境
  staging: './public/staging', // 构建环境
  production: './public/production', // 生产环境
  serverRoot: './public/staging/nd_pro', // 服务器目录
  nodeModule: ['react', 'react-dom'],
  commonModule: [
    { require: './path', expose: 'expose name' }
  ], // 通用UI [{'require': './路径', expose: '导出名称'}]
  external: ['react', 'react-dom'], // 公用component

}