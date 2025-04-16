import dts from "dts-bundle";
import fs from "fs";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, 'lib');

// Read all files from root directory

function iterateFiles(directoryPath){
  fs.readdirSync(directoryPath).forEach(file => {

    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) iterateFiles(filePath);
    else removeJsExtensionFromTsFile(filePath);
  });
}

// Remove all .js extensions from .ts files

function removeJsExtensionFromTsFile(filePath) {
  const fileExtension = path.extname(filePath);

  if (fileExtension === '.ts') {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    fileContent = fileContent.replace(/\.js(?=\")/g, '');
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Modified file ${filePath}`);
  }
}

iterateFiles(directoryPath);

// Bundle .d.ts files

dts.bundle({
  name: 'kernox', 
  main: 'lib/Kernox.d.ts', 
  out: '../dist/kernox.d.ts',
  removeSource: false, 
  outputAsModuleFolder: true,
});

console.log("Typescript declarations bundled!");