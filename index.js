const os = require('os');
const path = require('path');
const fs = require('fs');
const asar = require('asar');

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

const asarApp = path.join(dir, "resources", "app.asar");
const asarExtracted = path.join(dir, "resources", "app");

console.log("[*] Extracting asar...");
asar.extractAll(asarApp, asarExtracted);

const main = path.join(asarExtracted, "renderer.js");

console.log("[*] Patching...");

// Last line of unpatched main should end with comment
let contents = fs.readFileSync(main).toString();
const lastLine = "//# sourceMappingURL";

if(!contents.split("\n").pop().includes(lastLine)) {
    console.log("[!] Already patched, repatching!");
    
    // Remove old patch
    let lines = contents.split("\n");
    let line;
    while((line = lines.pop()) && !line.includes(lastLine)) {};
    lines.push(line);

    contents = lines.join("\n");
    fs.writeFileSync(main, contents);
}

fs.appendFileSync(main,
    "\n" + fs.readFileSync(path.join(__dirname, "inject.js")));

console.log("[*] Repacking asar...");

asar.createPackage(asarExtracted, asarApp).then(() => {

    fs.rmSync(asarExtracted, { recursive: true, force: true });

    console.log("[*] Done patching Lunar Client!");

});
