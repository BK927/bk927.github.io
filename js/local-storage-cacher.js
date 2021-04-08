export function createLocalStorageCacher(md5Hash){
  const hashStr = md5Hash;

  const generateName = function(name){
    return hashStr + '.' + name;
  }

  const isCacheAvailable = function(funcName){
    const rawData = localStorage.getItem(generateName(funcName));
    if(rawData === null){
      return false;
    }

    return true;
  }

  const cacheData = function(funcName, data){
    const stringfiedData = JSON.stringify(data);
    localStorage.setItem(generateName(funcName), stringfiedData);
  };

  const tryLoadFromCache = function(funcName){
    const rawData = localStorage.getItem(generateName(funcName));

    if (rawData === null){
      return null;
    }

    return JSON.parse(rawData);
  };

  return {
    cacheData: cacheData,
    tryLoadFromCache: tryLoadFromCache,
    isCacheAvailable: isCacheAvailable,
  }
}