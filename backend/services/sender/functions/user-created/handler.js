const { Glue } = require("@gluestack/glue-server-sdk-js");

module.exports = async (req, res) => {
  const { body } = req;

  const user = body?.data?.new;

  const emailBody = {
    "mailOptions": {
      "from": process.env.EMAIL_OPTION_FROM,
      "to": user.email,
      "subject": `Welcome ${user.name} `,
      "template": process.env.EMAIL_TEMPLATE_WELCOME,
      "data": {
        "name": user.name
      }
    },
    "transportOptions": {
      "host": process.env.EMAIL_SENDER_HOST,
      "port": process.env.EMAIL_SENDER_PORT,
      "auth": {
        "user": process.env.EMAIL_SENDER_AUTH_USER,
        "pass": process.env.EMAIL_SENDER_AUTH_PASSWORD
      }
    }
  }

  console.log(process.env.EMAIL_SENDER_HOST,
    process.env.EMAIL_SENDER_PORT,
    process.env.EMAIL_SENDER_AUTH_USER,
    process.env.EMAIL_SENDER_AUTH_PASSWORD)

  const glue = new Glue("http://host.docker.internal:9090")

  const result = await glue.queue.add({ value: 'email::send', data: emailBody })

  return res.status(200).json(result);
};
