import Mail from 'nodemailer/lib/mailer'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import logger from '@/utils/logger'
import config from '@/utils/config'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

const createEmailTransporter = async (): Promise<Mail> => {
  const OAuth2 = google.auth.OAuth2
  const ouath2Client = new OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  )
  ouath2Client.setCredentials({
    refresh_token: config.GOOGLE_REFRESH_TOKEN
  })
  const accessToken = await ouath2Client.getAccessToken()

  return nodemailer.createTransport({
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

export const sendResetPasswordEmail = async (
  to: string,
  token: string
): Promise<void> => {
  const filePath = path.join(
    __dirname,
    '../../emails/password-reset.handlebars'
  )
  const source = fs.readFileSync(filePath, 'utf-8').toString()
  const template = handlebars.compile(source)
  const html = template({ token })

  const transporter = await createEmailTransporter()
  const mailOptions: Mail.Options = {
    to,
    html,
    from: 'Proctor Vue proctor.vue@gmail.com',
    subject: 'Proctor Vue Password Reset',
    text: `Go to https://www.proctorvue.live/reset-password/${token} to reset your password.`
  }
  transporter.sendMail(mailOptions, (error, response) => {
    error ? logger.error(error.message) : logger.info(response)
    transporter.close()
  })
}

export const sendVerificationEmail = async (
  to: string,
  token: string
): Promise<void> => {
  const filePath = path.join(__dirname, '../../emails/verification.handlebars')
  const source = fs.readFileSync(filePath, 'utf-8').toString()
  const template = handlebars.compile(source)
  const html = template({ token })

  const transporter = await createEmailTransporter()
  const mailOptions: Mail.Options = {
    to,
    html,
    from: 'Proctor Vue proctor.vue@gmail.com',
    subject: 'Proctor Vue Account Verification',
    text: `Go to https://proctorvue.live/verify/${token} to verify your account.`
  }
  transporter.sendMail(mailOptions, (error, response) => {
    error ? logger.error(error.message) : logger.info(response)
    transporter.close()
  })
}
