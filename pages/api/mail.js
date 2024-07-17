const nodemailer = require("nodemailer");

export default (req, res) => {


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'Shahanees1998@gmail.com',
      pass: "gbfcbgdknpielmwu",
    },
  });

  const mailOption = {
    from: `Shahanees1998@gmail.com`,
    to: `${req.body.email}`,
    subject: `Interview call from Vqode`,
    html: `<p>Congrats your are selected for the interview in vqode solution</p><br>
    <p><strong>Interview Schedulling URL: </strong><a href="https://calendly.com/shahanees1998/30min">Open this email in a Web browser</a></p><br>
    <p><strong>Message: </strong>Kinldy schedule meeting with us and be on time for the intervew</p><br>
  `
  };

  transporter.sendMail(mailOption, (err, data) => {
    if (err) {
      res.send("error" + JSON.stringify(err));
    } else {
      res.send("success");
    }
});

  res.send("success");
};