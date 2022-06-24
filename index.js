const express = require('express');
const { MailtrapClient } = require("mailtrap");
const app = express();

const port = process.env.PORT || 9000;

app.post("/sendemail", (req, res, next) => {
    const TOKEN = "your-api-token";
    const SENDER_EMAIL = "sender@yourdomain.com";

    const client = new MailtrapClient({ token: TOKEN });

    const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };

    client
        .send({
            from: sender,
            to: [{ email: req?.body?.recipientEmail }],
            subject: req.body.subject,
            text: req.body.text,
        })
        .then(console.log, console.error);

    res.status(200).send({ ok: true})
});

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        success: false,
        message: err.message || 'An error occured.',
        errors: err.error || [],
    });
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Resource not found.' });
});

app.listen(port);
console.log(`Server started on port ${port}`);