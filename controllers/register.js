const register = require("../model/registerModule");
const otpdb = require("../model/loginModule");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const main = require('../middleware/emailAuth');

//This is the signUp Api
exports.registerAll = async (req, res, next) => {

    console.log("API called...................");
    const { name, email, address, mobileNo, password, confirmPassword, roles } = req.body;
    try {
        if (!name && !email && !address && !mobileNo && !password && !confirmPassword && !roles) {
            return res.status(401).json({ error: "Please enter all fields." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let genOtp = getRandomSixDigit();
        console.log(genOtp + "................genOtp");

        genOtpString = genOtp.toString();
        const saltOtp = await bcrypt.genSalt(10);
        const hashOtp = await bcrypt.hash(genOtpString, saltOtp);
        console.log("...........................................................", hashOtp, "", saltOtp)
        await main(email, name, address, genOtp)
        // process.exit()
        const data = await register.create({
            name, email, address, mobileNo,
            password: hashedPassword, confirmPassword, roles, otp: hashOtp
        });
        let datasave = data
        console.log("................................datasave", datasave);
        datasave = await otpdb.create({
            email: email,
            otp: hashOtp
        });

        console.log('....................................dataSave', datasave)
        return res.status(200).json({ message: "User registered successfully", data });

    } catch (error) {
        console.log("Error:", error);
        res.status(400).json({ msg: "Registration failed" });
    }
};
exports.verfiyOtp = async (req, res, next) => {

    try {
        let isVerified

        const { email, otp } = req.body;
        console.log("........................" + email, otp)
        data = await otpdb.findOne({ email });
        console.log('data', data.email)

        const otpMatch = await bcrypt.compare(otp, data.otp);
        console.log("......opt match" + otpMatch);

     console.log("......................................otpmatch", otpMatch)

        if (!email || !otp) {
            return res.status(401).json({ error: "Enter details properly" });
        }

        if (data.email !== req.body.email) {
            return res.status(401).json({ error: "Email does not match" });
        }

        if (otpMatch) {
            return res.status(200).json({ smg: "Verification Sucessfull.", isVerified: true });
        }
        if (!otpMatch) {
            return res.status(401).json({ error: 'Invalid otp', isVerified: false });
        }

        console.log('....................................', datasave)
        return res.status(200).json({ smg: "Verification Sucessfull.", data: data });
    } catch (error) {
        console.log("Error:", error);
        res.status(400).json({ msg: "Internal Server error", error });
    }
}


//This is the Login Api if token match with only admin then record Fetech
exports.login = async (req, res, next) => {
    console.log("login called........................");
    try {
        const { email, password } = req.body;




        console.log("/...................................../", data.roles)
        const passwordMatch = await bcrypt.compare(password, data.password);
        if (!data) {
            return res.status(401).json({ error: 'email does not match' });
        }
        if (passwordMatch) {
            const token = jwt.sign({ userId: data._id, userRoles: data.roles }, 'your-secret-key', {
                expiresIn: '1h',
            });
            if (data.roles == 'admin') {
                return res.status(200).json({ smg: 'Authentication sucessfull', data: data, token, isAdminRole: true });
            }
            else {
                return res.status(400).json({ smg: 'Authentication failed', data: data, token, isAdminRole: false });
            }
        }
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        if (!data) {
            return res.status(401).json({ error: 'email does not match' });
        }
        const token = jwt.sign({ userId: user._id, userRoles: user.roles }, 'your-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token });

    }
    catch (error) {
        console.log("Error:..........................................................>>>>", error);
        res.status(500).json({ message: "Inter server Error from login api ", error: error });
    }
}

function getRandomSixDigit() {

    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

}

