import nodemailer from 'nodemailer';

const domain = process.env.NEXT_PUBLIC_APP_URL;
export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testingnodejs7@gmail.com',
      pass: 'teezexdecbnopaan',
    },
  });

  // compose email message
  const mailOptions = {
    from: 'faruk13@gmail.com',
    to: email,
    subject: 'Confirm you email for Next Auth V-5',
    html: `
        <p>Click  <a href=${confirmLink}>here</a> to confirm email.</p>
      `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testingnodejs7@gmail.com',
      pass: 'teezexdecbnopaan',
    },
  });

  // compose email message
  const mailOptions = {
    from: 'faruk13@gmail.com',
    to: email,
    subject: 'Reset you email for Next Auth V-5',
    html: `
        <p>Click  <a href=${resetLink}>here</a> to confirm email.</p>
      `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendTwoFactorTokenEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testingnodejs7@gmail.com',
      pass: 'teezexdecbnopaan',
    },
  });

  // compose email message
  const mailOptions = {
    from: 'faruk13@gmail.com',
    to: email,
    subject: '2 Factor Authentication Code',
    html: `
        <p>2 Factor Authentication Code: ${token}.</p>
      `,
  };

  await transporter.sendMail(mailOptions);
};
