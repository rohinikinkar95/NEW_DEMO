
const nodemailer = require('nodemailer');



const main = async (email, name, address, otp) => {
    console.log("...........................otp", otp)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'rok.globaliasoft@gmail.com',
            pass: 'vtvb ukmq xrbs myzq',
        },
        secure: true,

    });
    const info = await transporter.sendMail({
        from: 'rok.globaliasoft@gmail.com',
        to: email,
        name: name,
        subject: "Hello this is my mail",
        text: address,
        html: "This is urs OTP-" + otp + " " + email,
    });

    console.log("Message sent: %s", info.messageId);

}



module.exports = main;




