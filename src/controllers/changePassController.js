import { transporter, emailOptions } from '../services/emailServices.js';
import { validPassword } from '../path.js';
import { createHash } from '../path.js';
import UserDao from '../dao/mongoDB/usersDao.js';

const userDao = new UserDao();

export const sendEmail = async (req, res) => {
    try {
        const response = await transporter.sendMail(emailOptions)
        res.json(response)
    } catch (error) {
        throw new Error(error)
    }
};

export const updatePass = async (req, res) => {
    const email = req.body.email;
    const { currentPass, newPass, confirmNewPass } = req.body;
    if (newPass !== confirmNewPass) {
        return res.send('New and confirmation pass do not match')
    }
    try {
        const user = await userDao.getUserByEmail(email)
        if(!user) {
            return res.status(404).send('User not found')
        }

        if(!validPassword(currentPass, user)) {
            return res.send('Incorrect current password')
        }

        const newPassHash = createHash(newPass);
        await userDao.updatePass(user._id, newPassHash)
        res.send('Password updated successfully')

    } catch (error) {
        throw new Error (error)
    }
};
