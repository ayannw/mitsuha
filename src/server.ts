import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'online';
});

export const run = (port: string) => {
  app.listen(port);
};
