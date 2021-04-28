import { join } from 'path';
let config = {
  viewsDir: join(__dirname, '../../web', 'views'),
  staticDir: join(__dirname, '../../web', 'assets'),
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