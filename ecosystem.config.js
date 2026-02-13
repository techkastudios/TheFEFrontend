module.exports = {
  apps: [
    {
      name: "FE",
      cwd: "/home/forge/staging.thefinancialexpress.com.bd/current",
      exec_mode: "fork",
      instances: 1,
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      autorestart: true,
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: "3000",
        NODE_OPTIONS: "--max_old_space_size=2048"
      }
    }
  ]
};
