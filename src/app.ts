// Copyright Todd LLC, All rights reserved.
import apiRoutesRouter from './routes/apiRoutes.ts';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(apiRoutesRouter);

app.listen(8080, () => console.log('Online'));

export default app;
