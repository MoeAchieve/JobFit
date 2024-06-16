//create email service
import nodemailer from 'nodemailer';

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      secure: false,
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendAcceptEmail(email: string, name: string, companyName: string, text: string) {
    const mailOptions = {
      from: `${companyName} <${process.env.EMAIL}>`,
      to: email,
      subject: 'Application Accepted',
      text,
    };

    this.transporter.sendMail(mailOptions);
  }


  async sendRejectEmail(email: string, name: string, companyName: string, text: string) {
    const mailOptions = {
      from: `${companyName} <${process.env.EMAIL}>`,
      to: email,
      subject: 'Application Rejected',
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendJobApplicationEmail(email: string, name: string, companyName: string) {
    const mailOptions = {
      from: `${companyName} <${process.env.EMAIL}>`,
      to: email,
      subject: 'Job Application',
      text: `Hello ${name}, your application to ${companyName} has been received!`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
