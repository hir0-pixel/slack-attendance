const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getTimestamp(now) {
  const karachi = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));
  const month = now.toLocaleString('en-US', { timeZone: 'Asia/Karachi', month: 'long' });
  const day = getOrdinal(karachi.getDate());
  const year = karachi.getFullYear();
  const time = now.toLocaleString('en-US', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit', hour12: true });
  return `${month} ${day}, ${year} at ${time}`;
}

app.command('/attend', async ({ command, ack, respond, client }) => {
  await ack();
  setTimeout(async () => {
    const userInfo = await client.users.info({ user: command.user_id });
    const userName = userInfo.user.profile.display_name || userInfo.user.real_name || command.user_name;
    await respond({
      response_type: 'in_channel',
      text: `✅ *${userName}* logged in on ${getTimestamp(new Date())}`
    });
  }, 100);
});

app.command('/logoff', async ({ command, ack, respond, client }) => {
  await ack();
  setTimeout(async () => {
    const userInfo = await client.users.info({ user: command.user_id });
    const userName = userInfo.user.profile.display_name || userInfo.user.real_name || command.user_name;
    await respond({
      response_type: 'in_channel',
      text: `👋 *${userName}* logged off on ${getTimestamp(new Date())}`
    });
  }, 100);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡ Attendance bot is running on port 3000');
})();