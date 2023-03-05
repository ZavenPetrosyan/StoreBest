const { User } = require('./schemas/user.schema');

class UserModel {
    constructor(userName, password, email, name, isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin || false;
        this.userName = userName || `user_${Math.floor(Date.now() / 1000)}`;
    }

    async register() {
        try {
            const user = new User({
                userName: this.userName,
                password: this.password,
                email: this.email,
                name: this.name,
            });
            return await user.save();
        } catch (error) {
            throw new Error('Error creating user!');
        }
    }

    static async getByUsername(username) {
        const user = await User.findOne({ userName: username });
        if (!user) {
            throw new Error('User not found!');
        }
        return user;
    }
}

module.exports = { UserModel };