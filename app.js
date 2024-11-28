document.addEventListener("DOMContentLoaded", function () {
  const domiaudio = new Audio("./sound/huh.mp3");
  const dingaudio = new Audio("./sound/Ding Sound Effect.mp3");
  // 获取DOM元素
  const alertSection = document.getElementById("alertSection");
  const Respectbt = document.getElementById("Respect");
  const noRespectbt = document.getElementById("noRespect");
  const alertIcon = document.getElementById("alertIcon");
  const addcolumn = document.getElementById("addcolumn");
  const setfoodPage = document.getElementById("setfoodPage");
  const luckyPage = document.getElementById("luckyPage");
  const spinnerButton = document.getElementById("spinnerBt");
  const highPriceBt = document.getElementById("highPrice");
  const midPriceBt = document.getElementById("midPrice");
  const lowPriceBt = document.getElementById("lowPrice");
  const breakfastBt = document.getElementById("breakfast");
  const nightFoodBt = document.getElementById("nightFood");
  const drinkBt = document.getElementById("drink");
  const showListH3 = document.getElementById("showListH3");
  const ans = document.getElementById("ans");
  const footerH1 = document.getElementById("footerH1");
  const authorPtag = document.getElementById("authorPtag");
  const showMoreButton = document.getElementById("showMoreButton");
  const moreMenu = document.getElementById("moreMenu");
  const deleteAllInputBt = document.getElementById("deleteAllInputBt");
  const googleMapBt = document.getElementById("googleMapBt");

  let finalData = [];
  let highPriceData = [];
  let middlePriceData = [];
  let lowPriceData = [];
  let breakfastData = [];
  let nightFoodData = [];
  let drinkData = [];

  // 初始化应用
  initApp();

  function initApp() {
    addEventListeners();
    fetchData();
  }

  function addEventListeners() {
    Respectbt.addEventListener("click", hideAlertSection);
    noRespectbt.addEventListener("click", noRespect);
    alertIcon.addEventListener("mouseover", addIconAnimation);
    alertIcon.addEventListener("mouseout", removeIconAnimation);
    addcolumn.addEventListener("click", addInputField);
    setfoodPage.addEventListener("click", showFoodSection);
    luckyPage.addEventListener("click", showLuckySection);
    document.getElementById("submit").addEventListener("click", onSubmit);
    spinnerButton.addEventListener("click", onSpinnerClick);
    highPriceBt.addEventListener("click", highPriceBtFunction);
    midPriceBt.addEventListener("click", midPriceBtFunction);
    lowPriceBt.addEventListener("click", lowPriceBtFunction);
    breakfastBt.addEventListener("click", breakfastBtFunction);
    nightFoodBt.addEventListener("click", nightFoodBtFunction);
    drinkBt.addEventListener("click", drinkBtFunction);
    showListH3.addEventListener("mouseover", showListOnHover);
    showListH3.addEventListener("mouseout", showListOffHover);
    window.addEventListener("scroll", hideFooter);
    footerH1.addEventListener("mouseover", footerFcIn);
    footerH1.addEventListener("mouseout", footerFcOut);
    authorPtag.addEventListener("click", authorPtagfn);
    addDeleteButtonListeners();
    deleteAllInputBt.addEventListener("click", deleteAllInputfn);
    googleMapBt.addEventListener("click", googleMapBtfn);
  }

  function fetchData() {
    fetch("restaurant.json")
      .then((response) => response.json())
      .then((data) => {
        highPriceData = data["奢華"];
        middlePriceData = data["假日"];
        lowPriceData = data["便宜"];
        breakfastData = data["早餐"];
        nightFoodData = data["消夜"];
        drinkData = data["飲料幫"];
        // console.log(finalData);
        // console.log(highPriceData);
        // console.log(middlePriceData);
        // console.log(lowPriceData);
        // console.log(drinkData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function addInputField() {
    const newInput = document.createElement("input");
    const newDeleteButton = document.createElement("button");
    const newInputContainer = document.createElement("div");
    const addFoodDiv = document.getElementById("addFoodDiv");

    newInput.type = "text";
    newInput.name = "food";
    newInput.placeholder = "請輸入餐廳";
    newInput.id = "inputContainer";

    newDeleteButton.className = "delete";
    newDeleteButton.type = "button";
    newDeleteButton.innerHTML = "X";

    newInputContainer.className = "InputContainer animate";

    newInputContainer.appendChild(newDeleteButton);
    newInputContainer.appendChild(newInput);
    addFoodDiv.insertBefore(newInputContainer, addFoodDiv.firstChild);

    newDeleteButton.addEventListener("click", function () {
      let container = this.parentElement;
      container.classList.add("reverse");
      setTimeout(() => {
        container.remove();
      }, 100);
    });
  }

  document.addEventListener("click", function (event) {
    if (!showMoreButton.contains(event.target)) {
      moreMenu.classList.remove("visible");
      moreMenu.classList.add("hidden");
    }
  });

  let btStatus = [];
  function highPriceBtFunction() {
    if (highPriceBt.classList.contains("selectBt")) {
      btStatus[0] = 0;
    } else {
      btStatus[0] = 1;
      btStatus[5] = 0;
      // setTimeout(() => {
      //   highPriceBt.blur();
      // }, 1000);
    }
    clearParticularSelect(btStatus);
    insertData();
  }

  function midPriceBtFunction() {
    if (midPriceBt.classList.contains("selectBt")) {
      btStatus[1] = 0;
    } else {
      btStatus[1] = 1;
      btStatus[5] = 0;
    }
    clearParticularSelect(btStatus);
    insertData();
  }

  function lowPriceBtFunction() {
    if (lowPriceBt.classList.contains("selectBt")) {
      btStatus[2] = 0;
    } else {
      btStatus[2] = 1;
      btStatus[5] = 0;
    }
    clearParticularSelect(btStatus);
    insertData();
  }

  function breakfastBtFunction() {
    if (breakfastBt.classList.contains("selectBt")) {
      btStatus[3] = 0;
    } else {
      btStatus[3] = 1;
      btStatus[5] = 0;
    }
    clearParticularSelect(btStatus);
    insertData();
  }

  // function reset_animation() {
  //   var el = document.getElementById("nightFood");
  //   var span = el.querySelector("span");
  //   span.style.animation = "none";
  //   span.style.transition = "none"; // 取消所有過渡效果
  //   span.style.opacity = 0; // 將透明度重置為預設值
  //   span.style.transform = "none"; // 將變形屬性重置為預設值
  //   setTimeout(() => {
  //     span.style.animation = "";
  //     span.style.transition = ""; // 取消所有過渡效果
  //     span.style.opacity = 1; // 將透明度重置為預設值
  //     span.style.transform = ""; // 將變形屬性重置為預設值
  //   }, 100);
  // }

  function nightFoodBtFunction() {
    if (nightFoodBt.classList.contains("selectBt")) {
      btStatus[4] = 0;
      // reset_animation();
    } else {
      btStatus[4] = 1;
      btStatus[5] = 0;
    }
    clearParticularSelect(btStatus);
    insertData();
  }

  // document.addEventListener("click", function (event) {
  //   var targetElement = event.target;
  //   if (!targetElement.closest("#nightFood")) {
  //     reset_animation();
  //   }
  // });

  // // 在手機觸控事件觸發時也重置動畫
  // document.addEventListener("touchend", function (event) {
  //   var targetElement = event.target;
  //   if (!targetElement.closest("#nightFood")) {
  //     reset_animation();
  //   }
  // });

  function drinkBtFunction() {
    if (drinkBt.classList.contains("selectBt")) {
      btStatus[5] = 0;
    } else {
      btStatus[0] = 0;
      btStatus[1] = 0;
      btStatus[2] = 0;
      btStatus[3] = 0;
      btStatus[4] = 0;
      btStatus[5] = 1;
    }
    clearParticularSelect(btStatus);
    insertData();
  }
  function clearParticularSelect(value) {
    // console.log(value);
    if (value[0]) {
      highPriceBt.classList.add("selectBt");
    } else {
      highPriceBt.classList.remove("selectBt");
    }
    if (value[1]) {
      midPriceBt.classList.add("selectBt");
    } else {
      midPriceBt.classList.remove("selectBt");
    }
    if (value[2]) {
      lowPriceBt.classList.add("selectBt");
    } else {
      lowPriceBt.classList.remove("selectBt");
    }
    if (value[3]) {
      breakfastBt.classList.add("selectBt");
    } else {
      breakfastBt.classList.remove("selectBt");
    }
    if (value[4]) {
      nightFoodBt.classList.add("selectBt");
    } else {
      nightFoodBt.classList.remove("selectBt");
    }
    if (value[5]) {
      drinkBt.classList.add("selectBt");
    } else {
      drinkBt.classList.remove("selectBt");
    }
  }

  function insertData() {
    finalData = [];
    if (highPriceBt.classList.contains("selectBt")) {
      finalData.push(...highPriceData.map((item) => item.name));
    }
    if (midPriceBt.classList.contains("selectBt")) {
      finalData.push(...middlePriceData.map((item) => item.name));
    }
    if (lowPriceBt.classList.contains("selectBt")) {
      finalData.push(...lowPriceData.map((item) => item.name));
    }
    if (breakfastBt.classList.contains("selectBt")) {
      finalData.push(...breakfastData.map((item) => item.name));
    }
    if (nightFoodBt.classList.contains("selectBt")) {
      finalData.push(...nightFoodData.map((item) => item.name));
    }
    if (drinkBt.classList.contains("selectBt")) {
      finalData.push(...drinkData.map((item) => item.name));
    }

    var elements = document.getElementsByClassName("InputContainer");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }

    for (let i = 0; i < finalData.length; i++) {
      const newInput = document.createElement("input");
      const newDeleteButton = document.createElement("button");
      const newInputContainer = document.createElement("div");
      const addFoodDiv = document.getElementById("addFoodDiv");

      newInput.type = "text";
      newInput.name = "food";
      newInput.placeholder = "請輸入餐廳";
      newInput.id = "inputContainer";
      newInput.value = finalData[i];

      newDeleteButton.className = "delete";
      newDeleteButton.type = "button";
      newDeleteButton.innerHTML = "X";

      newInputContainer.className = "InputContainer animate";

      newInputContainer.appendChild(newDeleteButton);
      newInputContainer.appendChild(newInput);
      addFoodDiv.appendChild(newInputContainer);

      newDeleteButton.addEventListener("click", function () {
        clearAllSelect();
        let container = this.parentElement;
        container.classList.add("reverse");
        setTimeout(() => {
          container.remove();
        }, 200);
      });
    }
  }

  function clearAllSelect() {
    highPriceBt.classList.remove("selectBt");
    midPriceBt.classList.remove("selectBt");
    lowPriceBt.classList.remove("selectBt");
    breakfastBt.classList.remove("selectBt");
    nightFoodBt.classList.remove("selectBt");
    drinkBt.classList.remove("selectBt");
    for (let i = 0; i < 5; i++) {
      btStatus[i] = 0;
    }
  }

  function addDeleteButtonListeners() {
    const deleteButtons = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function () {
        let container = this.parentElement;
        container.classList.add("reverse");
        setTimeout(() => {
          container.remove();
        }, 200);
      });
    }
  }

  function hideAlertSection() {
    alertSection.style.display = "none";
  }

  function noRespect() {
    window.location.href =
      "https://youtu.be/b5iH7Lwh3v0?si=0w50Rp8RqQvTyQxB&t=59";
  }

  function addIconAnimation() {
    alertIcon.classList.add("fa-beat-fade");
  }

  function removeIconAnimation() {
    alertIcon.classList.remove("fa-beat-fade");
  }

  function showFoodSection() {
    document.getElementById("luckySection").style.display = "none";
    document.getElementById("foodSection").style.display = "flex";
    document.getElementById("foodSectionLeftDiv").style.display = "flex";
    luckyPage.className = "";
    setfoodPage.className = "active";
  }

  function showLuckySection() {
    document.getElementById("luckySection").style.display = "flex";
    document.getElementById("foodSection").style.display = "none";
    document.getElementById("foodSectionLeftDiv").style.display = "none";
    luckyPage.className = "active";
    setfoodPage.className = "";
    showList();

    if (finalData.length == 0) {
      ans.innerHTML = "沒有轉盤清單";
    } else {
      ans.innerHTML = "???";
    }

    //clear animation class tag
    let animateList = document.getElementsByClassName("animate");
    animateList = Array.from(animateList);
    animateList.forEach(function (element) {
      element.classList.remove("animate");
    });
  }

  function showList() {
    let foodListP = document.getElementById("foodListP");
    // 清空列表
    foodListP.innerHTML = "";
    if (finalData.length == 0) {
      foodListP.innerHTML = "沒有轉盤清單";
    } else {
      for (let i = 0; i < finalData.length; i++) {
        let foodItem = document.createElement("p");
        if (i != finalData.length - 1) {
          foodItem.textContent = finalData[i] + "、";
        } else {
          foodItem.textContent = finalData[i];
        }

        foodListP.appendChild(foodItem);
      }
    }
  }

  function showListOnHover() {
    let foodListP = document.getElementById("foodListP");
    foodListP.classList.add("onHover");
  }

  function showListOffHover() {
    let foodListP = document.getElementById("foodListP");
    foodListP.classList.remove("onHover");
  }

  function onSubmit(event) {
    event.preventDefault();
    finalData = [];
    let inputs = document.querySelectorAll(
      ".InputContainer input[name='food']"
    );

    if (
      [...inputs].some((input) => input.value === "") ||
      inputs.length === 0
    ) {
      swal("選項不得為空", "請檢查是否有空選項", "warning");
      return;
    }
    inputs.forEach(function (input) {
      finalData.push(input.value);
    });
    // console.log(finalData);
    swal("酷斃了送出成功", "已經進入轉盤了\n趕快抽吃啥吧", "success");
  }

  let onSpinner = false;
  function onSpinnerClick() {
    let delay = 1; // 初始延迟时间
    let increment = 50; // 增量

    if (onSpinner) return;

    if (finalData.length != 0) {
      onSpinner = true;
      spinSlowly(delay, increment);
      ans.className = ""; // 清除 no spin class
    } else {
      swal("沒有轉盤清單", "請先前往設定你要的餐廳", "error");
      ans.innerHTML = "沒有轉盤清單";
    }
  }
  let luckyChoice = 0;
  let lastChoice;
  function spinSlowly(delay, increment) {
    dingaudio.play();

    luckyChoice = Math.floor(Math.random() * finalData.length);
    lastChoice = luckyChoice;
    // console.log("lastChoice" + lastChoice);
    // console.log("luckyChoice" + luckyChoice);
    while (lastChoice === luckyChoice && finalData.length !== 1) {
      luckyChoice = Math.floor(Math.random() * finalData.length);
    }
    let newContent = finalData[luckyChoice];
    ans.innerHTML = newContent;

    if (delay < 1000) {
      // 如果延迟时间小于1000ms，则递归调用自身
      setTimeout(function () {
        spinSlowly(delay + increment, increment); // 增加延迟时间并重新调用
      }, delay);
    } else {
      domiaudio.play();
      let count = 3;
      const flashingInterval = setInterval(function () {
        ans.style.display = ans.style.display == "none" ? "" : "none";

        if (count < 1) {
          clearInterval(flashingInterval); // 正確地清除 setInterval 計時器
        }
        count--;
      }, 500);
      onSpinner = false;
    }
  }

  function hideFooter() {
    if (this.scrollY > 5) {
      document.getElementById("footer").classList.add("hide");
    } else {
      document.getElementById("footer").classList.remove("hide");
    }
  }

  function footerFcIn() {
    footerH1.innerHTML = "今晚要吃啥?";
    footerH1.classList.add("footerH1Out");
  }

  function footerFcOut() {
    footerH1.innerHTML = "whatEat?";
    footerH1.classList.remove("footerH1Out");
  }

  let clickCoutn = 0; //for EastEgg
  function authorPtagfn() {
    authorPtag.classList.add("click");
    setTimeout(() => {
      authorPtag.classList.remove("click");
    }, 100);

    if (clickCoutn % 100 === 0 && clickCoutn != 0) {
      window.open("./images/monkey.jpg");
    }
    clickCoutn++;
  }

  showMoreButton.addEventListener("click", function (event) {
    if (moreMenu.classList.contains("hidden")) {
      var buttonRect = this.getBoundingClientRect();
      var parentRect = this.parentNode.getBoundingClientRect();
      moreMenu.style.top = buttonRect.bottom + 10 - parentRect.top + "px";
      moreMenu.style.left = buttonRect.left - 50 - parentRect.left + "px";
      moreMenu.classList.remove("hidden");
      moreMenu.classList.add("visible");
    } else {
      moreMenu.classList.remove("visible");
      moreMenu.classList.add("hidden");
    }
  });

  function deleteAllInputfn() {
    swal({
      title: "確定要刪除全部清單?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: {
        cancel: {
          text: "取消",
          visible: true,
          value: 0,
        },
        confirm: {
          text: "刪除",
          visible: true,
          value: 1,
        },
      },
    }).then((value) => {
      if (value === 1) {
        clearAllContainer();
        addInputField();
      }
    });
  }

  function clearAllContainer() {
    const inputContainer = document.querySelectorAll(".InputContainer");
    // console.log(inputContainer);
    inputContainer.forEach((container) => {
      container.classList.add("reverse");
      setTimeout(() => {
        container.remove();
      }, 200);
    });
    clearAllSelect();
    finalData = [];
  }

  function googleMapBtfn() {
    swal("還沒做好", "哈哈");
  }
});
