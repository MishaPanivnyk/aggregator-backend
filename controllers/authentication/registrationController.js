export default function registrationController() {
    app.post('/register', async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                username: req.body.username,
                password: hashedPassword
            });
            await user.save();
            res.status(201).send("Користувач зареєстрований успішно");
        } catch {
            res.status(500).send("Виникла помилка при реєстрації користувача");
        }
    }); 
}