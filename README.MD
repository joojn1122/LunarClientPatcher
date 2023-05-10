This simple patcher will patch Lunar Client launcher to start java agents on startup.

### Requirements
[node](https://nodejs.org/en)

### First of all install asar
```sh
npm install -g asar
```

### Running
Simply run 
```sh
node index.js
```

Now you successfully patched Lunar Client launcher 
until update, then you can patch it again. 

### Java Agents
Java agents path: %LUNARDIR%/java-agents

%LUNARDIR%:
Windows: `%LOCALAPPDATA%\Programs\lunarclient`<br>
MacOS: `/Applications/Lunar Client.app/Contents/MacOS`<br>
Linux: `$HOME/.lunarclient`<br>

You can find variety of java agents 
for example [here](https://github.com/Nilsen84/lunar-client-agents)

### Disclaimer
USE ON YOUR OWN!

This could break your Lunar Client installation,
if this happens, reinstall your Lunar Client
