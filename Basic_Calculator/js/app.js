import {
  inputField,
  isOperationPresent,
  simpleCalculation,
  calculationOfSimpleCal,
  absCal,
  powerAndRootCal,
  removeCharFromCal,
  stringPreAdder,
  isTrigonoCal,
  setCharAtInputField,
  randomNumberGenerator,
  floorNumberCal,
  celiNumberCal,
  toExponentialConvert,
  changeTheValue,
  degToDms,
  inputToDeg,
  addTheValueToMemory,
  removeTheValueFromMemory,
  recallTheValueFromMemory,
  buttonVisibilityHandler,
  changeButtonColor,
  secondBtnShow,
  changeInUnitOfAngle,
  dynamicStyleDrawer,
  dynamicStyleDrawerWithDebounce,
  drawerShow,
  drawerClose,
  showStoredNumbers,
  removeNumbers,
  setValueInLocal,
  getValueFromLocal,
} from "./functions.js";

//two flags to toggle the btn
let flagForToggleBtn = false;
let flagForHypBtn = false;

//to store the nums
let storedNumbers = [];

// Updated selectors for new HTML structure
let box = document.querySelector(".calculator");
let rect = box.getBoundingClientRect();
let drawerContent = document.querySelector(".memory-drawer");

//to adjust the drawer position, if resize window
addEventListener("resize", () => {
  rect = box.getBoundingClientRect();
  dynamicStyleDrawerWithDebounce(drawerContent, rect);
});

let mRecallBtn = document.getElementById("m-recall");
let mClearBtn = document.getElementById("m-clear");
//enable or disable the btn
buttonVisibilityHandler(mRecallBtn, mClearBtn);

//factorial method on Number
Number.prototype.factorial = function () {
  return this > 0 ? this * (this - 1).factorial() : 1; //factorial logic
};

//set initial value in the input field empty or existing
getValueFromLocal("calString") === undefined
  ? inputField.value
  : (inputField.value = getValueFromLocal("calString"));

const mainElementForEvents = document.querySelector(".calculator");

//only one main event listener for all the btn (event delegation)
mainElementForEvents.addEventListener("click", btnClickHandler);

// Add modern button press animations
function addButtonPressEffect(button) {
  if (button && button.classList.contains('calc-btn')) {
    button.style.transform = 'translateY(1px) scale(0.98)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }
}

// Add ripple effect for modern feel
function addRippleEffect(event) {
  const button = event.currentTarget;
  if (button.classList.contains('calc-btn') || button.classList.contains('memory-btn') || button.classList.contains('dropdown-btn')) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .calc-btn, .memory-btn, .dropdown-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Mobile-specific optimizations
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         (window.innerWidth <= 768 && 'ontouchstart' in window);
}

// Prevent zoom on double tap for mobile
function preventZoom() {
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

// Prevent context menu on long press
function preventContextMenu() {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
}

// Initialize mobile optimizations
if (isMobileDevice()) {
  preventZoom();
  preventContextMenu();
}

function btnClickHandler(e) {
  //currentTarget --> element that the listener was bound to.
  //target --> on we do actually click
  if (e.target === e.currentTarget) return;

  // Add ripple effect
  addRippleEffect(e);
  
  // Add button press effect
  addButtonPressEffect(e.target);

  //if not clicked On currentTarget
  let stringFromLocalStorage = getValueFromLocal("calString");
  let storedNumberOutput = getValueFromLocal("storedNum");
  storedNumberOutput === undefined ? setValueInLocal("storedNum", 0) : 0;
  var clickedItem = e.target.id;
  
  // Add haptic feedback for mobile devices
  if ('vibrate' in navigator && isMobileDevice()) {
    navigator.vibrate(10);
  }
  
  switch (clickedItem) {
    case isOperationPresent(clickedItem):
      if (clickedItem === "log1" || clickedItem === "log2") {
        clickedItem = "log";
      }
      simpleCalculation(clickedItem);
      break;
    case "m-plus":
      addTheValueToMemory();
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-minus":
      removeTheValueFromMemory();
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-clear":
      setValueInLocal("storedNum", 0);
      setValueInLocal("storedNums", "");
      storedNumbers = [];
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-recall":
      recallTheValueFromMemory(drawerContent, rect);
      break;
    case "m-store":
      storedNumbers.push(getValueFromLocal("calString"));
      setValueInLocal("storedNums", storedNumbers);
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-show":
      dynamicStyleDrawer(drawerContent, rect);
      drawerShow(drawerContent);
      showStoredNumbers(drawerContent);
      // Add modern drawer animation
      drawerContent.classList.add('show');
      break;
    case "drawer-close":
      drawerClose(drawerContent);
      // Remove modern drawer animation
      drawerContent.classList.remove('show');
      break;
    case "remove-nums":
      removeNumbers();
      storedNumbers = [];
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "=":
      calculationOfSimpleCal(stringFromLocalStorage);
      break;
    case "remove-char":
      removeCharFromCal(stringFromLocalStorage);
      break;
    case "reset-char":
      stringFromLocalStorage = "";
      setCharAtInputField(stringFromLocalStorage);
      break;
    case "10sq":
      powerAndRootCal(10, 1, stringFromLocalStorage);
      break;
    case "sqrt":
      powerAndRootCal(stringFromLocalStorage, "2");
      break;
    case "cbrt":
      powerAndRootCal(stringFromLocalStorage, "3");
      break;
    case "1/x":
      stringPreAdder(stringFromLocalStorage, "1/");
      break;
    case "2**":
      stringPreAdder(stringFromLocalStorage, "2**");
      break;
    case "abs1":
    case "abs2":
      absCal(stringFromLocalStorage);
      break;
    case "random-num":
      randomNumberGenerator(stringFromLocalStorage);
      break;
    case "floor":
      floorNumberCal(stringFromLocalStorage);
      break;
    case "celi":
      celiNumberCal(stringFromLocalStorage);
      break;
    case "unit-of-angle":
      changeInUnitOfAngle();
      // Add modern mode toggle animation
      const modeBtns = document.querySelectorAll('.mode-btn');
      modeBtns.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      break;
    case "e-sq-x":
      stringPreAdder(stringFromLocalStorage, "e**");
      break;
    case "e**":
      stringPreAdder(stringFromLocalStorage, "e**");
      break;
    case "to-expo":
      toExponentialConvert();
      break;
    case "plus-minus":
      changeTheValue();
      break;
    case "dms":
      degToDms();
      break;
    case "deg":
      inputToDeg();
      break;
    case "second-fn-Trigono":
      if (flagForHypBtn) {
        break;
      }
      const btnsOfTrigono = document.getElementsByClassName("trigono-btn");
      changeButtonColor(e);
      secondBtnShow(btnsOfTrigono);
      flagForToggleBtn === false
        ? (flagForToggleBtn = true)
        : (flagForToggleBtn = false);
      break;
    case "second-fn-Trigono-h":
      if (flagForToggleBtn) {
        const btnOfHTrigonoInverse =
          document.getElementsByClassName("trigono-h-inv");
        changeButtonColor(e);
        secondBtnShow(btnOfHTrigonoInverse);
      } else {
        const btnOfHTrigono = document.getElementsByClassName("trigono-h-btn");
        changeButtonColor(e);
        secondBtnShow(btnOfHTrigono);
      }
      flagForHypBtn === false
        ? (flagForHypBtn = true)
        : (flagForHypBtn = false);
      break;
    case "second-fn":
      const allBtnForToggle = document.getElementsByClassName("2nd-toggle-btn");
      changeButtonColor(e);
      secondBtnShow(allBtnForToggle);
      break;
    default:
      isTrigonoCal(clickedItem);
      break;
  }
}

// Add keyboard support for modern experience
document.addEventListener('keydown', (e) => {
  const key = e.key;
  const button = document.getElementById(key);
  
  if (button) {
    addButtonPressEffect(button);
    button.click();
  } else {
    // Handle special keys
    switch (key) {
      case 'Enter':
        document.getElementById('=').click();
        break;
      case 'Escape':
        document.getElementById('reset-char').click();
        break;
      case 'Backspace':
        document.getElementById('remove-char').click();
        break;
      case '+':
        document.getElementById('+').click();
        break;
      case '-':
        document.getElementById('-').click();
        break;
      case '*':
        document.getElementById('*').click();
        break;
      case '/':
        document.getElementById('/').click();
        break;
    }
  }
});

// Add smooth focus transitions for accessibility
document.addEventListener('DOMContentLoaded', () => {
  const focusableElements = document.querySelectorAll('button, textarea');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.transform = 'scale(1.02)';
    });
    
    element.addEventListener('blur', () => {
      element.style.transform = '';
    });
  });
  
  // Prevent input field from showing mobile keyboard
  const inputField = document.querySelector('.display-input');
  if (inputField) {
    inputField.addEventListener('focus', (e) => {
      e.target.blur();
    });
    
    inputField.addEventListener('touchstart', (e) => {
      e.preventDefault();
    });
  }
});

// Add loading state for better UX
function showLoadingState() {
  const display = document.querySelector('.display-input');
  display.classList.add('loading');
}

function hideLoadingState() {
  const display = document.querySelector('.display-input');
  display.classList.remove('loading');
}

// Enhanced error handling with modern UI
function showError(message) {
  const errorDiv = document.getElementById('error-div');
  errorDiv.textContent = message;
  errorDiv.style.opacity = '1';
  
  setTimeout(() => {
    errorDiv.style.opacity = '0';
  }, 3000);
}

// Handle orientation change
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    // Recalculate positions after orientation change
    rect = box.getBoundingClientRect();
    if (drawerContent.style.display === 'block') {
      dynamicStyleDrawer(drawerContent, rect);
    }
  }, 100);
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
  // Debounce resize events
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    rect = box.getBoundingClientRect();
    if (drawerContent.style.display === 'block') {
      dynamicStyleDrawer(drawerContent, rect);
    }
  }, 250);
});
