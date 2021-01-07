import Mail from 'nodemailer/lib/mailer'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import logger from '../utils/logger'

const GOOGLE_CLIENT_ID = '186147661833-dhkeq0274pd9kro8rlin5n9cf1adh36b.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '4oxqOyNsftZMrhW3P3hQg0Dw'
const GOOGLE_REFRESH_TOKEN = '1//049SgESh2gZrkCgYIARAAGAQSNwF-L9Ir1axwePzJo5nQUpOW-ZAsoQt5VgufruXbVXkitHkupR9PgSQY0jiq4s574pDADcYWnuY'

const createEmailTransporter = async (): Promise<Mail> => {
  const OAuth2 = google.auth.OAuth2
  const ouath2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'https://developers.google.com/oauthplayground')
  ouath2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN
  })
  const accessToken = await ouath2Client.getAccessToken()

  return  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'proctor.vue@gmail.com',
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token
    }
  } as SMTPTransport.Options)
}

export const sendVerificationEmail = async (to: string, token: string): Promise<void> => {
  const transporter = await createEmailTransporter()
  const mailOptions: Mail.Options = {
    to,
    from: 'proctor.vue@gmail.com',
    subject: 'Proctor View Account Verification',
    text: `Go to http://proctor-vue.herokuapp.com/verify/${token} to verify your account.`,
    html: `
      <div>
        <img src="cid:logo" alt="logo" width="175" />
        <p>
          You have one more step remaining to activate your Proctor Vue account. Click on the button below to verify your email address:
        </p>
        <button style="background-color: #f00; padding: 5px;">
          <a href="http://proctor-vue.herokuapp.com/verify/${token}">Verify my email</a>
        </button>
        <p>
          Didn’t work? Copy the link below into your web browser:
        </p> 
        <p>http://proctor-vue.herokuapp.com/verify/${token}</p>
      </div>
    `,
    attachments: [{
      filename: 'logo.83d95e82.png',
      path: `${__dirname}/../public/img/logo.83d95e82.png`,
      cid: 'logo'
    }]
  }
  transporter.sendMail(mailOptions, (error, response) => {
    error ? logger.error(error.message) : logger.info(response)
    transporter.close()
  })
}
