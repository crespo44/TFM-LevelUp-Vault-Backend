const app = require('./src/app');
require('dotenv').config();
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en ${PORT}`);
        });

    } catch(error) {
        console.log('No se ha podido levantar el servidor', error);
        process.exit(1);
    }
}

startServer();
