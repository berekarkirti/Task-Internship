module.exports = (plugin) => 
{
    plugin.controllers.auth.connect = async (ctx) =>
    {
      const { query } = ctx;
      const provider = query.provider;
  
      const userData = await strapi
        .plugin('users-permissions')
        .service('providers-registry')
        .get(provider)
        .callback(ctx);
  
      if (!userData) 
      {
        return ctx.badRequest(null, [{ messages: [{ id: 'Auth.form.error.invalid' }] }]);
      }
  
      const { user, jwt } = userData;
  
      const redirectUrl = query.redirect_uri || '/';
      const encodedUser = encodeURIComponent(JSON.stringify(user));
  
   
      ctx.redirect(`${redirectUrl}?user=${encodedUser}&jwt=${jwt}`);
    };
  
    return plugin;
  };