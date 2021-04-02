<h1 id="Mitsuha">
  Mitsuha
</h1>
<div>
  Multi-purpose Discord bot, built with <a href="https://typescriptlang.org/">TypeScript</a> and <a href="https://discord.js.org/">Discord.js</a>
  <img height="180px" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/22f499f6-422d-40fe-b8b2-22ddf89636f2/darjnr7-c8c951b8-ac39-4ebb-9984-c0556e8be7a4.jpg/v1/fill/w_774,h_1033,q_70,strp/mitsuha_miyamizu__from_kimi_no_na_wa__by_sprimz_darjnr7-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMzY2IiwicGF0aCI6IlwvZlwvMjJmNDk5ZjYtNDIyZC00MGZlLWI4YjItMjJkZGY4OTYzNmYyXC9kYXJqbnI3LWM4Yzk1MWI4LWFjMzktNGViYi05OTg0LWMwNTU2ZThiZTdhNC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.h0pjgDEXNphW1JIg0us-ssXWQn-cYrxv-vXD_FB0lvM" align="right"/>
</div>
  <br />
<hr />

<h2 id="self-hosting">
  Self-hosting
</h2>
  <h3 id="requirements">Requirements</h3>
  <ul>
    <li><code>Node.js (=&lt;14)</code></li>
  </ul>
  <ol>
    <h3 id="setup">Setup</h3>
    <li>
      <h4>Clone the repo:</h4>
      <code>git clone https://github.com/ayannw/mitsuha.git <br />
      cd mitsuha
      </code>
    </li>
    <li>
      <h4>Install dependencies</h4>
      <code>yarn install #use `npm i` if you don't have yarn installed.</code>
    </li>
    <li>
      <h4>Set credencials</h4>
      Create a bot account on <a href="https://discord.com/developers/">Discord developer portal</a> and copy the token. Now move the file <code>.env.sample</code> to <code>.env</code> and edit it: <br />
      <code>
        DISCORD_TOKEN="&lt;Paste your token here&gt;"
      </code>
    </li>
    <li>
      <h4 id="run">Run the bot</h4>
      <code>
        yarn start #alt: `npm run start`
      </code> <br />
      Your bot is online now!
    </li>
  </ol>
