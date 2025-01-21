import { PORT } from "../constant.js";

export const verificationMail = (displayname, token) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }
    .email-header {
      background: #4caf50;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      text-align: center;
      line-height: 1.6;
    }
    .email-body p {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .verify-btn {
      display: inline-block;
      background: #4caf50;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
    .verify-btn:hover {
      background: #45a049;
    }
    .email-footer {
      background: #f4f4f4;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #888;
      border-top: 1px solid #e0e0e0;
    }
    .email-footer a {
      color: #4caf50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      Confirm Your Email
    </div>
    <div class="email-body">
      <p>Hi ${displayname},</p>
      <p>Thank you for signing up! Please confirm your email address to complete your registration.</p>
      <a href="http://localhost:${PORT}/api/v1/users/verify/${token}" class="verify-btn">Verify Email</a>
      <p>If you didn’t request this email, you can safely ignore it.</p>
    </div>
    <div class="email-footer">
      &copy; 2024 MERN 2308. All rights reserved.  ${new Date().getFullYear()}
      <br>  
      <a href="https://example.com/privacy">Privacy Policy</a> | <a href="https://example.com/support">Support</a>
    </div>
  </div>
</body>
</html>
`;
};

