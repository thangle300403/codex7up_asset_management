const db = require("../db");
const bcrypt = require("bcrypt");

const AuthController = {
    async login(req, res) {
        const { email, password } = req.body;

        const [rows] = await db.execute("SELECT * FROM employee WHERE email = ?", [email]);
        const user = rows[0];

        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        delete user.password;
        res.json(user); // Save to localStorage on FE
    },
};

module.exports = AuthController;
