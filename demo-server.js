'use strict';

import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/* --- Middlewares --- */

const __port = 2025;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Public

app.use(express.static(join(__dirname, 'demo')));
app.use(express.static(join(__dirname, 'lib')));

// Routes

app.get('/', (req,res) => { res.status(200).send('index.html') } )

/* --- Server connection --- */

app.listen(__port, () => {
    console.log('The server is listening on port', __port);
});
app.on('error', (err) => {
    console.error(err);
});
