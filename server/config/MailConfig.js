var MailConfig = {
        from: 'KRISHI',
        host: 'smtp.gmail.com', // hostname
        secureConnection: false, // true use SSL
        port: 587, // 465 port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
          user: 'krishi.stb@gmail.com',
          pass: 'Krishi@s1s2'
        }
}

module.exports = MailConfig