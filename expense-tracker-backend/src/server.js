const app = require('./app');
const env = require('./config/env');
const { testConnection } = require('./config/db.config');

async function startServer() {
    await testConnection(); // fails fast if DB is unreachable

    app.listen(env.PORT, () => {
        console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
}

startServer();
