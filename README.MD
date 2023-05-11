## Lunar Client Patcher

This simple patcher will patch Lunar Client launcher to start with java agents on startup.

### Install and run
```sh
npm install
npm start
```

Now you successfully patched Lunar Client launcher 
until update, then you can patch it again. 

### Java Agents
Java agents path: `%LUNARDIR%/java-agents`

**%LUNARDIR%:**
- Windows: `%LOCALAPPDATA%\Programs\lunarclient`<br>
- MacOS: `/Applications/Lunar Client.app/Contents/MacOS`<br>
- Linux: `$HOME/.lunarclient`<br>

You can find variety of java agents 
for example [here](https://github.com/Nilsen84/lunar-client-agents)

### Disclaimer
USE ON YOUR OWN!

This could break your Lunar Client installation,
if this happens, reinstall your Lunar Client
