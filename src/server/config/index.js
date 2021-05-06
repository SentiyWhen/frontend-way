import { join } from 'path';
let config = {
  viewsDir: join(__dirname, '../', 'views'),
  staticDir: join(__dirname, '../', 'assets'),
} 
if (0) {
  console.log('asdff');
}
if (process.env.NODE_ENV === 'development') {
  const devConfig = {
    port: 3000,
    cache: false,
  }
  config = {...config, ...devConfig}
}

if (process.env.NODE_ENV === 'production') {
  const prodConfig = {
    port: 80,
    cache: 'memory',
  }
  config = {...config, ...prodConfig}
}

export default config;