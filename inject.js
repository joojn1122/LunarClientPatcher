const fs = require('fs');
const os = require('os');
const path = require('path');
const child_process = require('child_process');

function getLunarDirectory() {
    switch (os.type()) {
        case "Windows_NT":
            return process.env.LOCALAPPDATA + "\\Programs\\lunarclient";
        case "Darwin":
            // Not sure about this one    
            return "/Applications/Lunar Client.app/Contents/MacOS";
        case "Linux":
            // Not sure about this one
            return process.env.HOME + "/.lunarclient";
    }
}

const dir = getLunarDirectory();
const agentsDir = path.join(dir, "java-agents");

if(!fs.existsSync(agentsDir)) {
    fs.mkdirSync(agentsDir);
}

// From: https://github.com/Nilsen84/lunar-launcher-inject/blob/master/payload.js
const origSpawn = child_process.spawn;
child_process.spawn = function(command, args, opts) {
    args = args.filter(e => e !== '-XX:+DisableAttachMechanism');

    delete opts.env['_JAVA_OPTIONS'];
    delete opts.env['JAVA_TOOL_OPTIONS'];
    delete opts.env['JDK_JAVA_OPTIONS'];

    const agents = [];

    for(const agent of fs.readdirSync(agentsDir, {withFileTypes: true})) {
        if(agent.name.endsWith(".jar")) {
            agents.push(path.join(agentsDir, agent.name));
        }
    }

    return origSpawn(
        command, [
            ...agents.map(agent => `-javaagent:${agent}`), ...args
        ], opts
    );
}

require('electron').remote.getCurrentWindow().webContents.removeAllListeners('devtools-opened');