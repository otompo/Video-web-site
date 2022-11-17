module.exports = {
  reactStrictMode: true,
  env: {
    DB_URL:
      '',

    DB_LOCAL: '',
    CLIENT_URL: '',
    JWT_SECRET: '',
    JWT_COOKIE_EXPIRES_IN: '',
    AWS_BUCKET: '',
    AWS_ACCESS_KEY_ID: '',
    AWS_SECRET_ACCESS_KEY: '',
    AWS_REGION: '',
    AWS_API_VERSION: '',
    EMAIL_FROM: '',
    NEXTAUTH_URL: '',
    TAWK_PROPERTY_ID: '',
    TAWK_ID: '',
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
