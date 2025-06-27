import {
  CardRefs,
  compareArray,
  counter,
  player1Move,
  Player1Point,
  Player2Point,
} from "../store/states";

// Array Randomize Function
export const arrayRandomize = (array: any[]) => {
  const index = array.length;
  for (let i = index - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    // swap the index
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// function of card flip back
const CardFlipback = (CardRef1: HTMLDivElement, CardRef2: HTMLDivElement) => {
  setTimeout(() => {
    if (CardRef1 && CardRef1) {
      CardRef1.style.transform = "rotateY(360deg)";
      CardRef2.style.transform = "rotateY(360deg)";
    }
  }, 1500);
};

export const CompareMoves = () => {
  if (CardRefs.value.size === 2) {
    // Convert the Set to an array to access elements by index
    const cardRefsArray = Array.from(CardRefs.value);
    if (compareArray.value[0] === compareArray.value[1]) {
      // Hide the cards if they match
      setTimeout(() => {
        cardRefsArray[0].style.display = "none";
        cardRefsArray[1].style.display = "none";
        player1Move.value
          ? (Player1Point.value += 1)
          : (Player2Point.value += 1);
      }, 1000);
      counter.value+=2;
    } else {
      // flip backs the cards
      CardFlipback(cardRefsArray[0], cardRefsArray[1]);
      setTimeout(()=>{
        player1Move.value = !player1Move.value;
      },1800)
    }
    setTimeout(() => {
      
      // reset the refs array
      CardRefs.value.clear();
      // reset the array
      compareArray.value = [];
    }, 1500);
  }
};
