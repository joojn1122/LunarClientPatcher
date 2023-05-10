const child_process = require("child_process");
const os = require('os');
const path = require('path');
const fs = require('fs');

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

const asar = path.join(dir, "resources", "app.asar");
const asarExtracted = path.join(dir, "resources", "app");

console.log("[*] Extracting asar...");
child_process.execSync(`asar extract ${asar} ${asarExtracted}`);

const renderer = path.join(asarExtracted, "renderer.js");

console.log("[*] Patching renderer.js...");

// Last line of unpatched renderer should end with comment
let contents = fs.readFileSync(renderer).toString();
const lastLine = "//# sourceMappingURL";

if(!contents.split("\n").pop().includes(lastLine)) {
    console.log("[!] Renderer already patched, repatching!");
    
    // Remove old patch
    let lines = contents.split("\n");
    let line;
    while((line = lines.pop()) && !line.includes(lastLine)) {};
    lines.push(line);

    contents = lines.join("\n");
    fs.writeFileSync(renderer, contents);
}

fs.appendFileSync(renderer,
    "\n" + fs.readFileSync(path.join(__dirname, "inject.js")));

console.log("[*] Repacking asar...");
child_process.execSync(`asar pack ${asarExtracted} ${asar}`);

fs.rmSync(asarExtracted, { recursive: true, force: true });

console.log("[*] Done patching Lunar Client!");
