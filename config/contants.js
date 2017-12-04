const NODE_ENV = "development";//development | production

const productionDomain = 'https://www.yunxiaoxin.com';
const developmentDomain = 'https://dev.yunxiaoxin.com';

const fileProductionDomain = 'https://mp.yunxiaoxin.com';
const fileDevelopmentDomain = 'https://dev.yunxiaoxin.com';

const fileMapping = {
    'production' : fileProductionDomain,
    'development' : fileDevelopmentDomain
}

const serverMapping = {
    'production' : productionDomain,
    'development' : developmentDomain
}

module.exports = {
    server: serverMapping[NODE_ENV],
    fileServer : fileMapping[NODE_ENV]
}