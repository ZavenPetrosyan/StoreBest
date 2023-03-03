const { User } = require('./schemas/user.schema');

class UserModel {
    constructor(username, password, email) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    async register() {
        try {
            const user = new User({ username: this.username, password: this.password });
            await user.save();
        } catch (error) {
            throw new Error('Error creating user');
        }
    }

    async login() {
        const user = await User.findOne({ username: this.username });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(this.password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        const token = user.generateAuthToken();
        return token;
    }
}

module.exports = { UserModel };