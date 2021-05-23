function LocalStorageCacher(md5Hash) {
  const hashStr = md5Hash;

  const generateName = function (name) {
    return hashStr + "." + name;
  };

  const isCacheAvailable = function (func) {
    const localName = generateName(func.name);
    const rawData = localStorage.getItem(localName);
    if (rawData === null) {
      return false;
    }

    return true;
  };

  const cacheData = function (func, data) {
    const localName = generateName(func.name);
    const stringfiedData = JSON.stringify(data);
    localStorage.setItem(localName, stringfiedData);
  };

  const loadFromCache = function (func) {
    const localName = generateName(func.name);
    const rawData = localStorage.getItem(localName);

    if (rawData === null) {
      return null;
    }

    return JSON.parse(rawData);
  };

  return {
    cacheData: cacheData,
    loadFromCache: loadFromCache,
    isCacheAvailable: isCacheAvailable,
  };
}

export default LocalStorageCacher;
