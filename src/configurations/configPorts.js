///CHANGE DB NAME !!!!

const config = {
    production: {
        PORT: 1245,
        DB_uri: "mongodb://127.0.0.1:27017/Wild",
        SECRET: 'SOMEPRODUCTIONSECRET'
    },
    development: {
        PORT: 3000,
        DB_uri: "mongodb://127.0.0.1:27017/Wild",
        SECRET: 'SOMEDEVSECRET'
    }
}

module.exports = config[process.env.node_ev || 'development']