class ErrorHandler {
  static error(app, logger) {
    app.use( async (ctx,next) => {
      try {
        await next();
      } catch (e) {
        logger.error(e.message);
        ctx.body = '500 正在积极修复';
      }
    })
    app.use( async (ctx,next) => {
      await next();
      if (ctx.status === 404) {
        ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
        // ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="http://yoursite.com/yourPage.html" homePageName="回到我的主页"></script>`;
      }
    })
  }
}
export default ErrorHandler;