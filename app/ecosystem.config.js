// ecosystem.config.js
// PM2 process manager configuration for argeem-web

module.exports = {
  apps: [
    {
      name: 'argeem-web',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/sitth/argeem-web/app',
      instances: 1,                             // e2-micro มี 1 vCPU ที่ใช้ได้จริง
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Logging
      out_file: '/home/sitth/logs/argeem-web-out.log',
      error_file: '/home/sitth/logs/argeem-web-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Auto-restart options
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 3000,

      // Memory limit สำหรับ e2-micro (1 GB RAM)
      max_memory_restart: '400M',

      // Wait ready signal (Next.js จะ emit ready เมื่อ listen แล้ว)
      wait_ready: false,
      listen_timeout: 30000,
    },
  ],
};
