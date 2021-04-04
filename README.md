<img
    height="180px"
    src="media/image.png"
    align="right"
/>

<h1 id="Mitsuha">Mitsuha</h1>

<div>
    Multi-purpose Discord bot, built with
    <a href="https://typescriptlang.org/">TypeScript</a> and
    <a href="https://discord.js.org/">Discord.js</a>
</div>
<br />
<hr />

<h2 id="self-hosting">Self-hosting</h2>
<h3 id="requirements">Requirements</h3>
<ul>
    <li><code>Node.js (=&lt;14)</code></li>
</ul>
<ol>
    <h3 id="setup">Setup</h3>
    <li>
        <b>Clone the repo:</b> <br/>
        <code
            >git clone https://github.com/ayannw/mitsuha.git <br />
            cd mitsuha
        </code>
    </li>
    <li>
        <b>Install dependencies</b> <br/>
        <code>yarn install #use `npm i` if you don't have yarn installed.</code>
    </li>
    <li>
        <b>Set credencials</b>
        Create a bot account on
        <a href="https://discord.com/developers/">Discord developer portal</a>
        and copy the token. Now move the file <code>.env.sample</code> to
        <code>.env</code> and edit it: <br />
        <code> DISCORD_TOKEN="&lt;Paste your token here&gt;" </code>
    </li>
    <li>
        <b>Run the bot</b> <br/>
        <code> yarn start #alt: `npm run start` </code> <br />
        Your bot is online now!
    </li>
</ol>
