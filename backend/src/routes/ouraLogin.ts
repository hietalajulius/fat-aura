import * as Router from "koa-router";
// @ts-ignore
import simpleOauth from "koa-simple-oauth-oura-patch";
import ouraOauthConfig from "./ouraOauthConfig";

const router = new Router();

const { isLoggedIn, requireLogin, refreshToken } = simpleOauth(ouraOauthConfig, router);

router.use(isLoggedIn);
router.use(refreshToken);

router.get("/user", async ctx => {
  ctx.body = {
    user: { id: "user_id", isAdmin: true }
  };
});

// REMOVE
router.get("/refresh", requireLogin, async ctx => {
  await ctx.state.refreshToken();
  ctx.body = "Token refreshed:" + JSON.stringify(ctx.session.token);
});

router.get("/error", async ctx => {
  ctx.body = "Error";
  ctx.res.end();
});

router.get("/success", async ctx => {
  ctx.body = "Success";
  ctx.res.end();
});

router.get("/loginstatus", async ctx => {
  const status = ctx.state.isLoggedIn();
  ctx.body = {
    authenticated: status
  };
});

export default router.routes();
