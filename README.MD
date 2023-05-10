### First of all install asar
```sh
npm install -g asar
```

### Running
Simply run 
```sh
node index.js
```

This will patch the Lunar Client launcher for loading java agents
JavaAgents path: %LUNARDIR%\java-agents

%LUNARDIR%:
Windows: `%LOCALAPPDATA%\Programs\lunarclient`
MacOS: `/Applications/Lunar Client.app/Contents/MacOS`
Linux: `$HOME/.lunarclient`

You can find variety of java agents
 for example [here](https://github.com/Nilsen84/lunar-client-agents)

### Disclaimer
USE ON YOUR OWN!

This could break your Lunar Client installation,
if this happens, you can reinstall Lunar Client