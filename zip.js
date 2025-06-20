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

  console.log("title", title);
  console.log("folderTree", filePaths);

  const fileRegex = /```[a-z]+ filename="(.+?)"\n([\s\S]*?)```/g;
  const files = [];

  let match;
  while ((match = fileRegex.exec(rawCode)) !== null) {
    files.push({ path: match[1], content: match[2].trim() });
  }

  console.log("file", files);

  return files;
};
