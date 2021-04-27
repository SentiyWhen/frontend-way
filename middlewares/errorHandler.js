class ErrorHandler {
  static error(app) {
    app.use( async (ctx,next) => {
      try {
        await next();
      } catch (error) {
        ctx.body = '500 正在积极修复';
      }
    })
    app.use( async (ctx,next) => {
      await next();
      if (ctx.status === 404) {
        ctx.body = '404 正在积极修复';
      }
    })
  }
}

module.exports = ErrorHandler;