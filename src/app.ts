// Copyright Todd LLC, All rights reserved.
import router from './routes/test.ts';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(router);

app.listen(8080, () => console.log('hereiam'));

export default app;
