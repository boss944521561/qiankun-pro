/**
 * @desc 环境配置
 * @author Mason<mason.meng@wehotelglobal.com>
 */

let env = process.env.PMS_MODE;
const config = {
    dev: {
        domain: '//localhost',
        NODE_ENV: 'dev',
    },
    uat: {
        domain: 'http://172.25.104.59',
        NODE_ENV: 'uat',
    },
    prev: {
        domain: 'http://172.25.104.59',
        NODE_ENV: 'prev',
    },
    prod: {
        domain: 'http://172.25.104.59',
        NODE_ENV: 'prod',
    }
  }
  
export default config[env];

