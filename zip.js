export const generateZipFile = (content) => {
  const rawCode = content;
  // const treeMatch = rawCode.match(/```*\n([\s\S]*?)```/);
  // const structureText = treeMatch?.[1] || "";
  // console.log("folderTree", structureText);

  // const filePaths = structureText
  //   .split("\n")
  //   .map((line) => line.trim().replace(/^[|]?[\s\S]*[├──]\s*/, ""))
  //   .filter((line) => line.length > 0);

  // // get the title
  // const title = filePaths.shift().replace("/", "");

  // // console.log("title", title);
  // console.log("folderTree", filePaths);

  const fileRegex = /```[a-z]+ * file="(.+?)"\n([\s\S]*?)```/g;
  const files = [];

  let match;
  while ((match = fileRegex.exec(rawCode)) !== null) {
    files.push({ path: match[1], content: match[2].trim() });
  }

  console.log(files);

  return files;
};
