require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/attend', async ({ command, ack, respond, client }) => {
  await ack();

  const userInfo = await client.users.info({ user: command.user_id });
  const userName = userInfo.user.profile.display_name || userInfo.user.real_name || command.user_name;
  const timestamp = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

  console.log(`Attendance marked: ${userName} at ${timestamp}`);

  await respond({
    response_type: 'in_channel',
    text: `✅ Attendance marked for *${userName}* at ${timestamp}`
  });
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡ Attendance bot is running on port 3000');
})();