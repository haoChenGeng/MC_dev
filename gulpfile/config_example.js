module.exports = {
	port         : 8002,                            // 端口
	local        : './public/local',                // 开发环境
	staging      : './public/staging',              // 构建环境
	production   : './public/production',           // 生产环境
	serverRoot   : './public/staging/fundation',    // 服务器目录
	nodeModule   : ['react', 'react-dom'],
	external     : ['react', 'react-dom', 'header', 'footer'], // 公用component
	commonModule : [
								{require: './path', expose : 'expose name'}
							 ], // 通用UI [{'require': './路径', expose: '导出名称'}]
}