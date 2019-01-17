import {
  knownFolders,
  File
} from "tns-core-modules/file-system";

const loadJSON = nome => {
  console.log(`recuperando de [${nome}]`)
  const file = knownFolders.currentApp().getFile(nome);
  let content = null;
  if (File.exists(file.path))
    content = file.readTextSync(console.log);
  if (content)
    return JSON.parse(content);
  return null;
}

const saveJSON = (nome, dado) => {
  console.log(`gravando em [${nome}]`)
  const file = knownFolders.currentApp().getFile(nome);
  if (dado) {
    file.writeTextSync(JSON.stringify(dado), console.log)
  } else
    file.removeSync();
}

export default {
  loadJSON,
  saveJSON
}