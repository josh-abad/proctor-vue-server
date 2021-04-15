import Mail from 'nodemailer/lib/mailer'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import logger from '../utils/logger'
import config from '../utils/config'

const createEmailTransporter = async (): Promise<Mail> => {
  const OAuth2 = google.auth.OAuth2
  const ouath2Client = new OAuth2(config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET, 'https://developers.google.com/oauthplayground')
  ouath2Client.setCredentials({
    refresh_token: config.GOOGLE_REFRESH_TOKEN
  })
  const accessToken = await ouath2Client.getAccessToken()

  return  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'proctor.vue@gmail.com',
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      refreshToken: config.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token
    }
  } as SMTPTransport.Options)
}

export const sendVerificationEmail = async (to: string, token: string): Promise<void> => {
  const base64Token = Buffer.from(token, 'binary').toString('base64')
  const transporter = await createEmailTransporter()
  const mailOptions: Mail.Options = {
    to,
    from: 'proctor.vue@gmail.com',
    subject: 'Proctor Vue Account Verification',
    text: `Go to http://proctor-vue.herokuapp.com/verify/${base64Token} to verify your account.`,
    html: `
      <!DOCTYPE html>
        <html lang="en" style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
          <head style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
            <meta charset="UTF-8" style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"
              style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
            <style style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
              * {
                font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;
              }

              .items-center {
                align-items: center;
              }

              .justify-center {
                justify-content: center;
              }

              .p-6 {
                padding: 1.5rem;
              }

              .flex {
                display: flex;
              }

              .flex-col {
                flex-direction: column;
              }

              .rounded-lg {
                border-radius: 0.5rem;
              }

              .text-sm {
                font-size: 0.875rem;
                line-height: 1.25rem;
              }

              .text-gray-500 {
                color: #6B7280;
              }

              .text-gray-900 {
                color: #111827;
              }

              .text-2xl {
                font-size: 1.5rem;
                line-height: 2rem;
              }

              .font-semibold {
                font-weight: 600;
              }

              .mt-2 {
                margin-top: 0.5rem;
              }

              .mt-4 {
                margin-top: 1rem;
              }

              .text-white {
                color: white;
              }

              .cursor-pointer {
                cursor: pointer;
              }

              .px-6 {
                padding-left: 1.5rem;
                padding-right: 1.5rem;
              }

              .py-2 {
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
              }

              .font-medium {
                font-weight: 500;
              }

              button {
                appearance: none;
                background-image: linear-gradient(#10B981, #059669);
                border: transparent;
              }

              button:hover {
                background-image: linear-gradient(#059669, #047857);
              }

              button:active {
                transform: scale(0.95, 0.95);
                border: transparent;
              }

              button:focus {
                outline: 2px solid transparent;
                outline-offset: 2px;
              }

              .ease-in-out {
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              }

              .duration-150 {
                transition-duration: 150ms;
              }

              a {
                text-decoration: none;
              }

              .text-green-500 {
                color: #10B981
              }
            </style>
            <title style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;">Document</title>
          </head>
          <body style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
            <div class="flex flex-col justify-center items-center p-6 text-gray-900"
              style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;align-items: center;justify-content: center;padding: 1.5rem;display: flex;flex-direction: column;color: #111827;">
              <img class="mt-4" src="https://raw.githubusercontent.com/josh-abad/proctor-vue-web/main/src/assets/logo.png"
                alt="logo" width="125" style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;margin-top: 1rem;">
              <div class="mt-4 text-2xl font-semibold"
                style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size: 1.5rem;line-height: 2rem;font-weight: 600;margin-top: 1rem;">
                Verify your email address
              </div>
              <p class="mt-4 text-gray-500"
                style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;color: #6B7280;margin-top: 1rem;">
                Please confirm that you want to use this as your Proctor Vue account email address.
              </p>
              <a href="http://proctor-vue.herokuapp.com/verify/${base64Token}" class="mt-2"
                style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;text-decoration: none;margin-top: 0.5rem;">
                <button class="ease-in-out duration-150 text-sm text-white font-medium px-6 py-2 rounded-lg cursor-pointer"
                  style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;appearance: none;background-image: linear-gradient(#10B981, #059669);border: transparent;border-radius: 0.5rem;font-size: 0.875rem;line-height: 1.25rem;color: white;cursor: pointer;padding-left: 1.5rem;padding-right: 1.5rem;padding-top: 0.5rem;padding-bottom: 0.5rem;font-weight: 500;transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);transition-duration: 150ms;">
                  Verify my email
                </button>
              </a>
              <p class="mt-2 text-gray-500"
                style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;color: #6B7280;margin-top: 0.5rem;">
                Or click this <a href="http://proctor-vue.herokuapp.com/verify/${base64Token}" class="text-green-500"
                  style="font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;text-decoration: none;color: #10B981;">link</a>.
              </p>
            </div>
          </body>
        </html>
    `
  }
  transporter.sendMail(mailOptions, (error, response) => {
    error ? logger.error(error.message) : logger.info(response)
    transporter.close()
  })
}
