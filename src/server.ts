import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import qs from 'koa-qs';
import routes from './routes';

const app = new Koa();
qs(app);

app.use(bodyParser());
app.use(routes.allowedMethods());
app.use(routes.routes());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});