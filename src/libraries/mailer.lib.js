const nodemailer = require('nodemailer');
const { mailerEmail, mailerPassword } = require('../config');

/**
 * Create a node mailer transport to send emails
 */
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailerEmail,
    pass: mailerPassword,
  },
});


/**
 * Send Email to parents when a student adds them in their profile
 * @param {Array} recipientsEmailList a comma seperated array of recipient emails
 * @param {string} content Content to put inside this template
 * @todo Generate a proper template for this email
 */
const sendAddParentEmail = async (recipientsEmailList, content) => {
  await transport.sendMail({
    from: 'Hikma Educational App',
    to: recipientsEmailList,
    subject: 'A student added you as their parent',
    text: content,
  });
};

module.exports = {
  sendAddParentEmail,
};
