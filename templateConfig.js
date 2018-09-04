const moduleName = 'Srm';
const title = 'title';
const API_END_POINT = 'srm';
// ####  update above values

function getConfigs(moduleName, title) {
  var widgetName =
    moduleName[0].toUpperCase() +
    moduleName.substring(1, moduleName.length).toLowerCase();
  var smallcase = moduleName.toLowerCase();
  const config = {
    TEMPMODULENAME: widgetName,
    tEMPMODUL: smallcase,
    MODULETITLE: title,
    FOLDERNAME: smallcase,
    PACKAGENAME: smallcase,
    APIENDPOINT: API_END_POINT,
  };
  return config;
}
module.exports = getConfigs(moduleName, title);
