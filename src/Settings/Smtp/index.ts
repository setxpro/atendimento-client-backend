const SMTP_CONFIG = {
    host: `${process.env.SMTP_HOST}`,
    port: `${process.env.SMTP_PORT}`,
    user: `${process.env.SMTP_USER}`,
    pass: `${process.env.SMTP_PASS}`,
  };
  
  export { SMTP_CONFIG };
  