import { createTransport } from "nodemailer";
import config from '../config.js';

export const transporter = createTransport({
    host: config.host,
    portEthereal: config.portEthereal,
    auth: {
        user: config.emailEthereal,
        pass: config.passEthereal
    }
});

export const updatePassEmail = {
    from: config.emailEthereal,
    to: config.emailEthereal,
    subject: 'Update Password',
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>LOGIN</title>
      </head>
      <body>
        <h1>Click to update pass</h1>
    
        <a href="http://localhost:8080/views/updatePass">
        <button>Update Password</button>
      </a>
    
      </body>
    
    </html>`
};

export const deactivationEmail = {
  from: config.emailEthereal,
  to: config.emailEthereal,
  subject: 'Your account will be deactivated soon',
  html: `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>LOGIN</title>
    </head>
    <body>
      <h4>Click to update pass</h4>
  
      <p>Please notice that due to inactivity in your account it will be deactivated soon.</p>
      <p>Kind regards</p>
    </body>
  
  </html>`
};