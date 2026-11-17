import express from 'express';
import bookRoutes from "./routes/book.routes.js";
import authorRoutes from "./routes/author.routes.js";
import publisherRoutes from "./routes/publisher.routes.js";
import config from "./configuration/config.js";
import errorHandler from "./middlewares/error.middleware.js";
import { dbConnection } from "./configuration/database.js";
import { syncModels } from "./models/index.js";

const app = express()

app.use(express.json());

app.use(bookRoutes)
app.use(authorRoutes)
app.use(publisherRoutes)
app.use(errorHandler)

app.use((req, res) => res.status(404).type('text/plain; charset=utf-8').send('Not found')
);

async function startServer() {
    await dbConnection();
    await syncModels();
    app.listen(config.port, () => console.log(`Server running on port ${config.port}. Press Ctrl+C to stop.`));
}

startServer();