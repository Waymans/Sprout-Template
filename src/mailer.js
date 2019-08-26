'use strict';

const nodemailer = require("nodemailer");
const emailTemplate = require('./emailTemplate');

let mailer = (body, string) => {
    const isCreate = string === 'create',
          isForgot = string === 'forgot',
          isContact = string === 'contact';

    const html = emailTemplate(body, {isCreate: isCreate, isForgot: isForgot, isContact: isContact});

    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        let mailConfig;
        if (process.env.NODE_ENV === 'production' ){
            // all emails are delivered to destination
            mailConfig = {
                host: 'smtp.sendgrid.net',
                port: 587,
                auth: {
                    user: 'real.user',
                    pass: 'verysecret'
                }
            };
        } else {
            // all emails are catched by ethereal.email
            mailConfig = {
                host: process.env.E_HOST,
                port: 587,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            };
        }

        let transporter = nodemailer.createTransport(mailConfig);

        // Message object
        let message = {
            from: '"Sprout 🌱" <'+process.env.USER+'>', // sender address
            to: body.email, // list of receiver(s)
            subject: '', // subject line
            text: '', // plain text body
            html: html // html body
        }
        if (isCreate) {
            message.subject = 'Create Account 🌱';
            message.text = 'Thank you for signing up on Sprout!';
        } else if (isForgot) {
            message.subject = 'Forgot Password 🌱';
            message.text = 'Your password is ' + body.password + '.';
        } else if (isContact) {
            message.subject = 'Contact Us 🌱';
            message.text = 'Thanks for reaching out to us. We will be in touch with you shortly.';
        }

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}

module.exports = mailer;