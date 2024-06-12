import 'dotenv/config';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

const OAuth2 = google.auth.OAuth2;

const OAuthClient = new OAuth2(
  clientID,
  clientSecret,
  'https://developers.google.com/oauthplayground'
);
OAuthClient.setCredentials({ refresh_token: refreshToken });

export const sendMail = async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json('Lūdzu aizpildiet visus laukus!');
  }

  OAuthClient.getAccessToken((err, accessToken) => {
    if (err) {
      console.error(err);
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          clientId: clientID,
          clientSecret: clientSecret,
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      });

      transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'New message',
        html: `
        <div style="text-align: center;">
          <h1>Jauns ziņojums</h1>
          <p>Vārds: ${name}</p>
          <p>Telefona numurs: ${phone}</p>
          <p>E-pasts: ${email}</p>
          <p>Ziņojums: ${message}</p>
        </div>
      `,
      });

      res.status(200).json('Ziņojums nosūtīts!');
    }
  });
};
