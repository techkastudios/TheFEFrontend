module.exports = {
  apps: [
    {
      name: 'FE',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
      env: {
        PORT: 3000
      }
    },
    {
      name: 'FEDev',
      exec_mode: 'fork',
      instances: 1, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      autorestart: true,
      env: {
        PORT: 4000
      }
    },
  ],
};
