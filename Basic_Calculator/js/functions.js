//array to check the operations.
const arrayOfOperations = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
  "+",
  "-",
  "/",
  "*",
  "**",
  "!",
  "**2",
  "**3",
  "%",
  "rt",
  "(",
  ")",
  "e",
  "π",
  "log1",
  "log2",
  "ln",
  "e**",
];

//object to track the unit that changes on click
let unitOfAngle = {
  degree: true,
  radian: false,
  grad: false,
};

export const inputField = document.querySelector(".display-input");

//basic operation is present or not
export function isOperationPresent(clickedItem) {
  return arrayOfOperations.includes(clickedItem) ? clickedItem : "#";
}

//fn that is going to just add the operation in the string
export function simpleCalculation(value) {
  let string = getValueFromLocal("calString");
  if (string == undefined) string = "";
  string += value;
  setCharAtInputField(string);
}

//going to fire on = click
export function calculationOfSimpleCal(stringFromLocalStorage) {
  stringCalHandler(stringFromLocalStorage);
}

//main fn to handle the all cal logics
function stringCalHandler(str) {
  try {
    str = str?.replaceAll("!", '["factorial"]()');
    str = str?.replaceAll("e", "2.7182");
    str = str?.replaceAll("π", "3.14");
    if (str?.includes("rt")) {
      customRootCal(str);
      return;
    } else if (str.includes("log")) {
      logCal(str, "10");
      return;
    } else if (str.includes("ln")) {
      logCal(str, "2.7182");
      return;
    }
    str = eval(str);
    setCharAtInputField(str);
  } catch (err) {
    showErrForSomeTime("Invalid Input!");
  }
}

//abs cal logic
export function absCal(string) {
  string = Math.abs(string);
  if (isNaN(string)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(string);
}

//diff. square and root combination fn logic
export function powerAndRootCal(string, factor = 1, power = 1) {
  let result = Math.pow(string, power / factor);
  if (isNaN(result)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(result);
}

//log cal fn with diff. bases logic
function logCal(str, base) {
  let result = "";
  if (str.indexOf("g") !== -1 && !str.includes("(")) {
    result =
      Math.log(str.slice(str.indexOf("g") + 1, str.length)) / Math.log(base);
  } else if (str.includes("(") && str.includes(")")) {
    const customBase = str.slice(str.indexOf("(") + 1, str.indexOf(")"));
    const value = str.slice(str.indexOf("g") + 1, str.indexOf("("));
    result = Math.log(value) / Math.log(customBase);
  } else {
    result =
      Math.log(str.slice(str.indexOf("n") + 1, str.length)) / Math.log(base);
  }
  if (isNaN(result)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(result);
}

//custom root fn logic
function customRootCal(str) {
  let firstNumber = str.slice(0, str.indexOf("rt"));
  let secondNumber = str.slice(str.indexOf("rt") + 2, str.length);
  let result = "";
  try {
    result = eval(`${secondNumber ** (1 / firstNumber)}`);
  } catch (error) {
    showErrForSomeTime(error);
  }
  if (isNaN(result)) showErrForSomeTime("Invalid Input!");
  setCharAtInputField(result);
}

//backspace btn logic to remove last char
export function removeCharFromCal(string) {
  string = string?.substring(0, string.length - 1);
  setCharAtInputField(string);
}

//append the string at start
export function stringPreAdder(string, addString) {
  if (string == undefined) {
    string = "";
  }
  string = addString + string;
  setCharAtInputField(string);
}

//all trigonometry operation's array
let trigonoOperations = [
  "sin",
  "sin-h",
  "sin-in",
  "sin-h-in",
  "cos",
  "cos-h",
  "cos-in",
  "cos-h-in",
  "tan",
  "tan-h",
  "tan-in",
  "tan-h-in",
  "sec",
  "sec-h",
  "sec-in",
  "sec-h-in",
  "csc",
  "csc-h",
  "csc-in",
  "csc-h-in",
  "cot",
  "cot-h",
  "cot-in",
  "cot-h-in",
];

//operation is Trigono or not
export function isTrigonoCal(clickedItem) {
  trigonoOperations.includes(clickedItem)
    ? trigonoOperationHandler(clickedItem)
    : "";
}

//to handle all the trigonometry operations
function trigonoOperationHandler(clickedItem) {
  let value = getValueFromLocal("calString");
  if (unitOfAngle.degree === true) {
    //converting degree to radian
    value = value * (Math.PI / 180);
  } else if (unitOfAngle.grad === true) {
    //1 Gradians to Radians = 0.0157
    value = value * 0.0157;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  switch (clickedItem) {
    case "sin":
    case "sin-h":
    case "sin-in":
    case "sin-h-in":
      sinTrigonoOperations(clickedItem, value);
      break;
    case "cos":
    case "cos-h":
    case "cos-in":
    case "cos-h-in":
      cosTrigonoOperations(clickedItem, value);
      break;
    case "tan":
    case "tan-h":
    case "tan-in":
    case "tan-h-in":
      tanTrigonoOperations(clickedItem, value);
      break;
    case "csc":
    case "csc-h":
    case "csc-in":
    case "csc-h-in":
      cscTrigonoOperations(clickedItem, value);
      break;
    case "sec":
    case "sec-h":
    case "sec-in":
    case "sec-h-in":
      secTrigonoOperations(clickedItem, value);
      break;
    case "cot":
    case "cot-h":
    case "cot-in":
    case "cot-h-in":
      cotTrigonoOperations(clickedItem, value);
      break;
  }
}

//to handle all the sin operations
function sinTrigonoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "sin":
      value = Math.sin(value);
      break;
    case "sin-in":
      if (value <= 1 && value >= -1) {
        value = Math.asin(value);
        setCharAtInputField(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
    case "sin-h":
      value = Math.sinh(value);
      break;
    case "sin-h-in":
      value = Math.asinh(value);
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the cos operations
function cosTrigonoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "cos":
      value = Math.cos(value);
      break;
    case "cos-in":
      if (value <= 1 && value >= -1) {
        value = Math.acos(value);
        setCharAtInputField(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
    case "cos-h":
      value = Math.cosh(value);
      break;
    case "cos-h-in":
      value = Math.acosh(value);
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the tan operations
function tanTrigonoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "tan":
      value = Math.tan(value);
      break;
    case "tan-in":
      value = Math.atan(value);
      break;
    case "tan-h":
      value = Math.tanh(value);
      break;
    case "tan-h-in":
      if (value <= 1 && value >= -1) {
        value = Math.atanh(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the cosec operation
function cscTrigonoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "csc":
      value = 1 / Math.sin(value);
      break;
    case "csc-in":
      if (value <= 1 && value >= -1) {
        value = 1 / Math.asin(value);
        setCharAtInputField(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
    case "csc-h":
      value = 1 / Math.sinh(value);
      break;
    case "csc-h-in":
      value = 1 / Math.asinh(value);
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the sec operations
function secTrigonoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "sec":
      value = 1 / Math.cos(value);
      break;
    case "sec-in":
      if (value <= 1 && value >= -1) {
        value = 1 / Math.acos(value);
        setCharAtInputField(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
    case "sec-h":
      value = 1 / Math.cosh(value);
      break;
    case "sec-h-in":
      value = 1 / Math.acosh(value);
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the cot operations
function cotTrigonoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "cot":
      value = 1 / Math.tan(value);
      break;
    case "cot-in":
      value = 1 / Math.atan(value);
      break;
    case "cot-h":
      value = 1 / Math.tanh(value);
      break;
    case "cot-h-in":
      if (value <= 1 && value >= -1) {
        value = 1 / Math.atanh(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

// Updated error display function for modern UI
function showErrForSomeTime(string = "Invalid Input !") {
  const errorDiv = document.getElementById("error-div");
  errorDiv.textContent = string;
  errorDiv.style.opacity = "1";
  errorDiv.style.color = "#dc3545";
  
  // Add modern error animation
  errorDiv.style.transform = "scale(1.05)";
  setTimeout(() => {
    errorDiv.style.transform = "scale(1)";
  }, 200);
  
  setTimeout(() => {
    errorDiv.style.opacity = "0";
  }, 3000);
}

//fn to set the string in the input field
export function setCharAtInputField(string) {
  inputField.value = string;
  setValueInLocal("calString", string);
}

//random number gen with below input value
export function randomNumberGenerator(string) {
  let randomNum = Math.random();
  if (string == undefined) {
    string = "";
  }
  string = string + randomNum;
  setCharAtInputField(string);
}

//cal floorN from input
export function floorNumberCal(string) {
  string = Math.floor(string);
  if (isNaN(string)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(string);
}

//cal celiN from input
export function celiNumberCal(string) {
  string = Math.ceil(string);
  if (isNaN(string)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(string);
}

export function toExponentialConvert() {
  let string = getValueFromLocal("calString");
  if (string == undefined) {
    showErrForSomeTime("No value to convert!");
    return;
  }
  string = Number(string).toExponential();
  setCharAtInputField(string);
}

//change the value plus to minus or minus to plus
export function changeTheValue() {
  let string = getValueFromLocal("calString");
  if (string == undefined) {
    showErrForSomeTime("No value to change!");
    return;
  }
  string = -string;
  setCharAtInputField(string);
}

//degree to dms
export function degToDms() {
  let string = getValueFromLocal("calString");
  if (string == undefined) {
    showErrForSomeTime("No value to convert!");
    return;
  }
  let degree = Math.floor(string);
  let minute = Math.floor((string - degree) * 60);
  let second = Math.floor(((string - degree) * 60 - minute) * 60);
  string = `${degree}°${minute}'${second}"`;
  setCharAtInputField(string);
}

//radian, grade to deg
export function inputToDeg() {
  let string = getValueFromLocal("calString");
  if (string == undefined) {
    showErrForSomeTime("No value to convert!");
    return;
  }
  // Parse DMS format (e.g., "30°15'45"")
  let match = string.match(/(\d+)°(\d+)'(\d+)"/);
  if (match) {
    let degree = parseInt(match[1]);
    let minute = parseInt(match[2]);
    let second = parseInt(match[3]);
    string = degree + minute / 60 + second / 3600;
  } else {
    showErrForSomeTime("Invalid DMS format!");
    return;
  }
  setCharAtInputField(string);
}

//=== stored memory cal fn ===
export function addTheValueToMemory() {
  let string = getValueFromLocal("calString");
  if (string == undefined) {
    showErrForSomeTime("No value to add to memory!");
    return;
  }
  let storedValue = getValueFromLocal("storedNum");
  storedValue = storedValue == undefined ? 0 : storedValue;
  storedValue = Number(storedValue) + Number(string);
  setValueInLocal("storedNum", storedValue);
}

//minus the value from the stored
export function removeTheValueFromMemory() {
  let string = getValueFromLocal("calString");
  if (string == undefined) {
    showErrForSomeTime("No value to subtract from memory!");
    return;
  }
  let storedValue = getValueFromLocal("storedNum");
  storedValue = storedValue == undefined ? 0 : storedValue;
  storedValue = Number(storedValue) - Number(string);
  setValueInLocal("storedNum", storedValue);
}

//show the output of cal (stored num)
export function recallTheValueFromMemory() {
  let storedValue = getValueFromLocal("storedNum");
  if (storedValue == undefined || storedValue == 0) {
    showErrForSomeTime("No value in memory!");
    return;
  }
  setCharAtInputField(storedValue);
}

//visibility of btn based on the memory
export function buttonVisibilityHandler(mRecallBtn, mClearBtn) {
  let storedValue = getValueFromLocal("storedNum");
  if (storedValue == undefined || storedValue == 0) {
    mRecallBtn.disabled = true;
    mClearBtn.disabled = true;
    mRecallBtn.style.opacity = "0.5";
    mClearBtn.style.opacity = "0.5";
  } else {
    mRecallBtn.disabled = false;
    mClearBtn.disabled = false;
    mRecallBtn.style.opacity = "1";
    mClearBtn.style.opacity = "1";
  }
}

//== change in btn UI functions ==//

//fn that changes color
export function changeButtonColor(e) {
  e.target.style.backgroundColor = e.target.style.backgroundColor === "rgb(111, 66, 193)" ? "" : "rgb(111, 66, 193)";
  e.target.style.color = e.target.style.color === "white" ? "" : "white";
}

//fn that show second btn that are hidden on click event
export function secondBtnShow(
  allBtnForToggle,
  classOne = "d-inline",
  classTwo = "d-none"
) {
  for (let i = 0; i < allBtnForToggle.length; i++) {
    if (allBtnForToggle[i].classList.contains(classOne)) {
      allBtnForToggle[i].classList.remove(classOne);
      allBtnForToggle[i].classList.add(classTwo);
    } else {
      allBtnForToggle[i].classList.remove(classTwo);
      allBtnForToggle[i].classList.add(classOne);
    }
  }
}

//unit changing in the cal with clicks logic
export function changeInUnitOfAngle() {
  if (unitOfAngle.degree === true) {
    unitOfAngle.degree = false;
    unitOfAngle.radian = true;
    unitOfAngle.grad = false;
    changeTheUnitInHtml("RAD");
  } else if (unitOfAngle.radian === true) {
    unitOfAngle.degree = false;
    unitOfAngle.radian = false;
    unitOfAngle.grad = true;
    changeTheUnitInHtml("GRAD");
  } else {
    unitOfAngle.degree = true;
    unitOfAngle.radian = false;
    unitOfAngle.grad = false;
    changeTheUnitInHtml("DEG");
  }
}

//based on the string changing html value
function changeTheUnitInHtml(string) {
  const unitBtn = document.getElementById("unit-of-angle");
  unitBtn.textContent = string;
}

// === drawer and related to that fns ===
export function dynamicStyleDrawer(drawerContent, rect) {
  drawerContent.style.left = rect.left + "px";
  drawerContent.style.top = rect.top + rect.height + "px";
  drawerContent.style.width = rect.width + "px";
}

//debounce polyfill
function myDebounce(cb, d) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, d);
  };
}
export const dynamicStyleDrawerWithDebounce = myDebounce(dynamicStyleDrawer, 100);

export function drawerShow(drawerContent) {
  drawerContent.style.display = "block";
}

export function drawerClose(drawerContent) {
  drawerContent.style.display = "none";
}

//show the stored nums with child append
export function showStoredNumbers() {
  const numsDiv = document.querySelector(".memory-items");
  const storedNums = getValueFromLocal("storedNums");
  
  if (storedNums && storedNums.length > 0) {
    numsDiv.innerHTML = "";
    storedNums.forEach((num, index) => {
      const numElement = document.createElement("div");
      numElement.className = "memory-item";
      numElement.style.cssText = `
        padding: 8px 12px;
        margin: 4px 0;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 8px;
        font-size: 14px;
        color: #495057;
        cursor: pointer;
        transition: all 0.2s ease;
      `;
      numElement.textContent = `${index + 1}: ${num}`;
      numElement.addEventListener("click", () => {
        setCharAtInputField(num);
        drawerClose(document.querySelector(".memory-drawer"));
      });
      numElement.addEventListener("mouseenter", () => {
        numElement.style.background = "linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)";
        numElement.style.transform = "translateX(4px)";
      });
      numElement.addEventListener("mouseleave", () => {
        numElement.style.background = "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)";
        numElement.style.transform = "translateX(0)";
      });
      numsDiv.appendChild(numElement);
    });
  } else {
    numsDiv.innerHTML = '<div style="text-align: center; color: #6c757d; padding: 20px;">No stored values</div>';
  }
}

//remove number from the ui and memory
export function removeNumbers() {
  setValueInLocal("storedNums", "");
  const numsDiv = document.querySelector(".memory-items");
  numsDiv.innerHTML = '<div style="text-align: center; color: #6c757d; padding: 20px;">No stored values</div>';
}

//==== local storage related fn ==== //

//set and get the data from the local storage
export function setValueInLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//get the values from the local storage
export function getValueFromLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}
