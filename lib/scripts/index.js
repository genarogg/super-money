import updateTsconfig from "./updateTsconfig.js";
import upVersion from "./upVersion.js";
import eliminarDependencias from "./eliminarDependencias.js";
import moveReadmeToLib, {  moveReadmeBackToRoot } from "./moveReadme.js";


(async () => {
  await moveReadmeToLib();
  updateTsconfig();
  upVersion();
  eliminarDependencias();
  await moveReadmeBackToRoot();
})();
