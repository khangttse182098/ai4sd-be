import fs from "fs";
import path from "path";
import archiver from "archiver";
import { fileURLToPath } from "url";
import { dirname } from "path";
import JSZip from "jszip";
import pkg from "file-saver";
const { saveAs } = pkg;

export const generateZipFile = (content) => {
  // Your raw string (just paste the full string here, including \n)
  //   const rawCode = `import { Star, Play, Users } from 'lucide-react'\n\nexport default function Hello() {\n  return <div>Hello World</div>;\n}`;
  const rawCode = content;
  const treeMatch = rawCode.match(/```*\n([\s\S]*?)```/);
  const structureText = treeMatch?.[1] || "";
  const filePaths = structureText
    .split("\n")
    .map((line) => line.trim().replace(/^[|]?[\s\S]*[├──]\s*/, ""))
    .filter((line) => line.length > 0);

  // get the title
  //   const title = filePaths.shift().replace("/", "");

  //   console.log("title", title);
  //   console.log("folderTree", filePaths);

  const fileRegex = /```[a-z]+ filename="(.+?)"\n([\s\S]*?)```/g;
  const files = [];

  let match;
  while ((match = fileRegex.exec(rawCode)) !== null) {
    files.push({ path: match[1], content: match[2].trim() });
  }

  console.log("file", files);

  return files;
  // Define paths
  //   const __filename = fileURLToPath(import.meta.url);
  //   const __dirname = dirname(__filename);
  //   const rootDir = path.join(__dirname, "project-root");
  //   const appDir = path.join(rootDir, "app");
  //   const filePath = path.join(appDir, "page.tsx");
  //   const zipPath = path.join(__dirname, "linguaflow.zip");

  //   // Ensure directory exists
  //   fs.mkdirSync(appDir, { recursive: true });

  //   // Write code to .tsx file (interprets \n as real line breaks)
  //   fs.writeFileSync(filePath, rawCode, "utf8");

  //   // Create a zip stream
  //   const output = fs.createWriteStream(zipPath);
  //   const archive = archiver("zip", { zlib: { level: 9 } });

  //   output.on("close", () => {
  //     console.log(`✅ Zip created: ${zipPath} (${archive.pointer()} bytes)`);
  //   });

  //   archive.on("error", (err) => {
  //     throw err;
  //   });

  //   archive.pipe(output);

  //   // Add folder with structure
  //   archive.directory(rootDir, false);

  //   // Finalize the zip
  //   archive.finalize();
};
