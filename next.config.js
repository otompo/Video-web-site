module.exports = {
  reactStrictMode: true,
  env: {
    DB_URL:
      'mongodb+srv://sasco:9bAqbQwMECDOKJ5C@cluster0.tsneg.mongodb.net/afrotaliandb?retryWrites=true&w=majority',

    DB_LOCAL: 'mongodb://localhost:27017/afrotaliandb',
    CLIENT_URL: 'http://localhost:3000',
    JWT_SECRET: 'sfskftsfdssdsp3405059o53H530smdslf',
    JWT_COOKIE_EXPIRES_IN: '50',
    AWS_BUCKET: 'afrotalianbucket',
    AWS_ACCESS_KEY_ID: 'AKIA5XQRL46ID3X6PQFU',
    AWS_SECRET_ACCESS_KEY: '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',
    AWS_REGION: 'us-east-1',
    AWS_API_VERSION: '2012-10-17',
    EMAIL_FROM: 'afrotalain@gmail.com',
    NEXTAUTH_URL: 'https://afrotalain.com',
    TAWK_PROPERTY_ID: '625886a9b0d10b6f3e6da486',
    TAWK_ID: '1g0kss2bo',
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
