const mainText = "Hello, I'm Manha.";
const subText = "I'm a computer science enthusiast dedicated to crafting innovative digital solutions.";

function typeText(element, text, cursor, speed) {
  let index = 0;
  const typingInterval = setInterval(() => {
    element.textContent = text.slice(0, index);
    index++;
    if (index > text.length) {
      clearInterval(typingInterval);
      cursor.style.display = "none";
    }
  }, speed);
}

setTimeout(() => {
  typeText(mainElement, mainText, mainCursor, 100);
  setTimeout(() => {
    typeText(subElement, subText, secondCursor, 52);
  }, mainText.length * 100);
}, 2000);
