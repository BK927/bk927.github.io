import { LangEnum, createLogAnalyser } from "asset/js/kakao-log-analyser.js";
import * as Chart from "asset/js/draw-chart.js";
import { createCSSLoader } from "asset/js/css-loader.js";
import { createLocalStorageCacher } from "asset/js/local-storage-cacher.js";

export function createDisplayer() {
  const hideHeader = function () {
    const header = document.querySelector("header");
    header.classList.remove("active");
  };

  const displayLoader = function (nodeList) {
    for (let node of nodeList) {
      const loading = createCSSLoader();
      node.appendChild(loading);
    }
  };

  const switchLoadingToActive = function (article) {
    const children = article.children;
    for (let node of children) {
      if (node.classList.contains("loading-wrapper")) {
        node.remove();
      }
    }
    article.classList.toggle("active");
  };

  const tryLoadFromCacheWrapper = function (func) {
    const data = localCacher.tryLoadFromCache(func.name);
    
    if(data === null){
      return func();
    }

    return data;
  }

  const toogleArticleVisibility = function () {
    const articles = document.querySelectorAll(".container > article");
    for (let article of articles) {
      article.classList.toggle("active");
    }
  };

  const displayHash = async function (hash) {
    const node = document.querySelector("#hash-code");
    node.textContent = hash;
    switchLoadingToActive(node);
  };

  const displayChattingStatistics = function (logAnalyser) {
    const beginDate = logAnalyser.getBeginDate();
    const endDate = logAnalyser.getEndDate();
    const numberOfLine = logAnalyser.numberOfLines;

    const gapTime = endDate.getTime() - beginDate.getTime();
    const gapDay = Math.floor(gapTime / (1000 * 60 * 60 * 24));
    const parentNode = document.querySelector("#chatting-statistics");

    {
      const divider = document.createElement("div");
      const title = document.createElement("h4");
      const content = document.createElement("h5");
      title.textContent = "전체 채팅 수";
      content.textContent = String(numberOfLine);
      divider.append(title);
      divider.append(content);
      parentNode.append(divider);
    }

    {
      const divider = document.createElement("div");
      const title = document.createElement("h4");
      const content = document.createElement("h5");
      title.textContent = "하루 평균 채팅 수";
      content.textContent = String(Math.floor(numberOfLine / gapDay));
      divider.append(title);
      divider.append(content);
      parentNode.append(divider);
    }
  };

  const displayMiscellaneous = function (logAnalyser) {
    let numberOfPhoto = tryLoadFromCacheWrapper(logAnalyser.calcPhotoFrequency);
    let numberOfVideo = tryLoadFromCacheWrapper(logAnalyser.calcVideoFrequency);
    let numberOfEmoji = tryLoadFromCacheWrapper(logAnalyser.calcEmojiFrequency);
    let numberOfYoutube = tryLoadFromCacheWrapper(logAnalyser.calcYoutubeFrequency);

    const parentNode = document.querySelector("#number-of-miscellaneous");
    const arr = [
      ["사진 수", numberOfPhoto],
      ["비디오 수", numberOfVideo],
      ["이모티콘 수", numberOfEmoji],
      ["유튜브 링크 수", numberOfYoutube],
    ];

    arr.forEach((element) => {
      const divider = document.createElement("div");
      const title = document.createElement("h4");
      const content = document.createElement("h5");
      title.textContent = element[0];
      content.textContent = element[1];
      divider.append(title);
      divider.append(content);
      parentNode.append(divider);
    });

    localCacher.cacheData(logAnalyser.calcPhotoFrequency.name, numberOfPhoto);
    localCacher.cacheData(logAnalyser.calcVideoFrequency.name, numberOfVideo);
    localCacher.cacheData(logAnalyser.calcEmojiFrequency.name, numberOfEmoji);
    localCacher.cacheData(logAnalyser.calcYoutubeFrequency.name, numberOfYoutube);

    switchLoadingToActive(parentNode);
  };

  const displayPeriod = function (logAnalyser) {
    const beginDate = logAnalyser.getBeginDate();
    const endDate = logAnalyser.getEndDate();

    const node = document.querySelector("#period");
    const convertDate = function (date) {
      const year = String(date.getFullYear()) + "년";
      const month = String(date.getMonth() + 1) + "월";
      const day = String(date.getDate()) + "일";

      return year + " " + month + " " + day;
    };

    node.textContent = convertDate(beginDate) + " ~ " + convertDate(endDate);
  };

  const displayTypingRanking = function (logAnalyser) {
    const typingRanking = tryLoadFromCacheWrapper(logAnalyser.calcTypingRanking);
    const chartNode = document.querySelector("#typing-chart");
    const textNode = document.querySelector("#typing-ranking");
    const top5 = typingRanking.slice(0, 5);
    const chart = drawChart(chartNode, top5);
    showRankText(textNode, typingRanking);
    localCacher.cacheData(logAnalyser.calcTypingRanking.name, typingRanking);
  };

  const displayNameArticle = function (logAnalyser) {
    const nameFrequency = tryLoadFromCacheWrapper(logAnalyser.calcNameFrequency);
    const chartNode = document.querySelector("#name-chart");
    const textNode = document.querySelector("#name-ranking");
    const top5 = nameFrequency.slice(0, 5);
    const chart = drawChart(chartNode, top5);
    showRankText(textNode, nameFrequency);
    localCacher.cacheData(logAnalyser.calcNameFrequency.name, nameFrequency);
  };

  const displayDayArticle = function (logAnalyser) {
    const dayFrequency = tryLoadFromCacheWrapper(logAnalyser.calcDayFrequency);
    const chartNode = document.querySelector("#day-chart");
    const textNode = document.querySelector("#day-ranking");
    const chart = drawChart(chartNode, dayFrequency);
    showRankText(textNode, dayFrequency);
    

    localCacher.cacheData(logAnalyser.calcDayFrequency.name, dayFrequency);
  };

  const displayHourArticle = function (logAnalyser) {
    const hourFrequency = tryLoadFromCacheWrapper(logAnalyser.calcHourFrequency);
    const chartNode = document.querySelector("#time-chart");
    const textNode = document.querySelector("#time-ranking");
    const strAdded = [...hourFrequency];
    localCacher.cacheData(logAnalyser.calcHourFrequency.name, hourFrequency);
    for (let i = 0; i < strAdded.length; i++) {
      strAdded[i][0] += "시";
    }
    const top7 = strAdded.slice(0, 7);
    const chart = drawChart(chartNode, top7);
    showRankText(textNode, strAdded);
  };

  const drawChart = function (domNode, frquencyList) {
    const labels = [];
    const values = [];
    frquencyList.forEach((element) => {
      labels.push(element[0]);
      values.push(element[1]);
    });
    switchLoadingToActive(domNode);
    return Chart.createBarChart(domNode, "횟수", labels, values);
  };

  const showRankText = function (domNode, list, cutline = -1) {
    let listSize = 0;
    const largestNum = list[0][1];
    list.forEach((element) => {
      listSize += element[1];
    });

    let topItems = list;
    if (cutline > 0) {
      topItems = list.slice(0, cutline);
    }

    topItems.forEach((element) => {
      const item = document.createElement("li");
      const percent = Math.round((element[1] / listSize) * 10000) / 100;
      item.textContent = String(element[0]) + " (" + String(percent) + "%)";
      domNode.append(item);

      const width = String((element[1] * 100) / largestNum) + "%";
      item.style.width = width;
    });
    switchLoadingToActive(domNode);
  };

  //Property
  let logAnalyser;
  let localCacher;
  const nonBlockingFunc = [
    displayPeriod,
    displayChattingStatistics,
    displayMiscellaneous,
    displayNameArticle,
    displayTypingRanking,
    displayDayArticle,
    displayHourArticle,
  ];

  return {
    initByEvent: function (event) {
      logAnalyser = createLogAnalyser(event.target.result);
      hideHeader();
      toogleArticleVisibility();
      displayLoader(document.querySelectorAll("article > canvas, article > ol"));
      displayHash(logAnalyser.getMd5Hash());
      localCacher = createLocalStorageCacher(logAnalyser.getMd5Hash());

      nonBlockingFunc.forEach((func) => {
        setTimeout(func(logAnalyser), 0);
      });
    },

    getlogAnalyser: () => {
      return logAnalyser;
    },
  };
}
