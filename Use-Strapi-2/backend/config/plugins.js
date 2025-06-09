module.exports = ({ env }) => ({
    'users-permissions': {
      config: {
        providers: {
          google: {
            clientId: env('GOOGLE_CLIENT_ID'),
            clientSecret: env('GOOGLE_CLIENT_SECRET'),
            redirectUri: 'http://localhost:3000/connect/google/callback',
          },
          github: {
            clientId: env('GITHUB_CLIENT_ID'),
            clientSecret: env('GITHUB_CLIENT_SECRET'),
            redirectUri: 'http://localhost:3000/connect/github/callback',
          },
        },
      },
    },
      upload: {
        config: {
          providerOptions: {
            localServer: {
              maxage: 300000
            },
          },
          sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
          breakpoints: {
            xlarge: 1920,
            large: 1000,
            medium: 750,
            small: 500,
            xsmall: 64
          },
        },
      },
  });
  