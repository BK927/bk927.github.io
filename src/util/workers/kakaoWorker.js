/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */

self.onmessage = (event) => {
  const items = event.data.items;

  const doms = items.map((element, index) => {
    const data = element["calcDataFunc"]();
    return element["createNodefunc"](data, index);
  });

  // const domNodeFunc = event.data["createNodefunc"];
  // const dataFunc = event.data["calcDataFunc"];
  // const index = event.data["index"];
  // const domNode = domNodeFunc(dataFunc, index);

  self.postMessage(doms);
};
