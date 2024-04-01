const register = require("../model/registerModule");

exports.getUser = async (req, res, next) => {
    console.log('................  admin called ');

    const userRoles = req.userRoles

    try {

        let data = await register.find({ roles: 'author' });
        console.log(data, ".....................................>>>")
        if (userRoles !== 'admin') return res.status(401).json({ error: 'Only admin can access' })
        if (!data) {
            return res.status(404).json({ message: 'record does not exist in Database' });
        }


        return res.status(200).send({ message: 'record get sucessfully', data: data });
    }
    catch (error) {
        console.log("........................" + error)
        res.status(400).json({ message: "Internal Servor Error from get user Api", error: error });
    }
}