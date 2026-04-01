const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/attend', async ({ command, ack, respond, client }) => {
  await ack();
  
  setTimeout(async () => {
    const userInfo = await client.users.info({ user: command.user_id });
    const userName = userInfo.user.profile.display_name || userInfo.user.real_name || command.user_name;
    const now = new Date();
    const timestamp = now.toLocaleString('en-PK', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: true });
    await respond({
      response_type: 'in_channel',
      text: `✅ *${userName}* logged in at ${timestamp}`
    });
  }, 100);
});

app.command('/logoff', async ({ command, ack, respond, client }) => {
  await ack();

  setTimeout(async () => {
    const userInfo = await client.users.info({ user: command.user_id });
    const userName = userInfo.user.profile.display_name || userInfo.user.real_name || command.user_name;
    const now = new Date();
    const timestamp = now.toLocaleString('en-PK', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: true });
    await respond({
      response_type: 'in_channel',
      text: `👋 *${userName}* logged off at ${timestamp}`
    });
  }, 100);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡ Attendance bot is running on port 3000');
})();