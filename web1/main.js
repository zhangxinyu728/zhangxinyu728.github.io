document.addEventListener('DOMContentLoaded'), () => {
  const character = document.getElementById('character');
  const library = document.getElementById('library');
  const map = document.getElementById('map');
  const treasure = document.getElementById('treasure');
  const guard = document.getElementById('guard');
  const messageBox = document.getElementById('message-box');
  
  let hasClue = false;
  let treasureFound = false;
  let treasureLocation = {
    top: '50%',
    left: '70%'
  };
  let guardLocation = {
    top: '30%',
    left: '30%'
  };
  
  // Initially, only the library and character are visible
  map.style.display = 'none';
  treasure.style.display = 'none';
  guard.style.display = 'none';
  
  updateMessage('You are in the library. Find the clue to start your adventure.');

  function updateMessage(message) {
    messageBox.textContent = message;
  }

  function moveCharacter(dx, dy) {
    let top = parseFloat(character.style.top);
    let left = parseFloat(character.style.left);
    character.style.top = `${Math.max(0, Math.min(top + dy, window.innerHeight - 50))}px`;
    character.style.left = `${Math.max(0, Math.min(left + dx, window.innerWidth - 50))}px`;
    
    if (hasClue) {
      checkForTreasure();
      checkForGuard();
    }
    checkForClue();
  }

  function isNear(element1, position) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = {
      top: parseFloat(position.top) * window.innerHeight,
      left: parseFloat(position.left) * window.innerWidth,
      bottom: parseFloat(position.top) * window.innerHeight + 50,
      right: parseFloat(position.left) * window.innerWidth + 50
    };
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  function checkForClue() {
    if (!hasClue && isNear(character, { top: '50%', left: '50%' })) {
      updateMessage('Found a clue! Press SPACE to enter the treasure map.');
      hasClue = true;
    }
  }

  function enterMap() {
    if (hasClue) {
      library.style.display = 'none';
      map.style.display = 'block';
      updateMessage('Search for the treasure. Beware of the guard!');
    }
  }

  function checkForTreasure() {
    if (!treasureFound && isNear(character, treasureLocation)) {
      treasure.style.display = 'block';
      treasure.style.top = treasureLocation.top;
      treasure.style.left = treasureLocation.left;
      updateMessage('Found the treasure! Solve the riddle to claim it.');
      treasureFound = true;
      // Here you would implement the riddle solving logic
    }
  }

  function checkForGuard() {
    if (isNear(character, guardLocation)) {
      guard.style.display = 'block';
      guard.style.top = guardLocation.top;
      guard.style.left = guardLocation.left;
      updateMessage('Watch out! A guard is nearby. Run away!');
      // Here you would handle the guard encounter
    }
  }

  function solveRiddle() {
    const riddleAnswer = prompt('What has keys but can\'t open locks?');
    if (riddleAnswer.toLowerCase() === 'piano') {
      updateMessage('Correct! You\'ve claimed the treasure!');
      // Here you would handle the treasure being claimed
    } else {
      updateMessage('Incorrect! Try again.');
    }
  }

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        moveCharacter(0, -10);
        break;
      case 'ArrowDown':
        moveCharacter(0, 10);
        break;
      case 'ArrowLeft':
        moveCharacter(-10, 0);
        break;
      case 'ArrowRight':
        moveCharacter(10, 0);
        break;
      case ' ':
        if (!hasClue) {
          checkForClue(); // Check for the clue when space is pressed if not already found
        } else if (hasClue && !treasureFound) {
          enterMap(); // Enter the map if the clue is found but the treasure is not
        } else if (treasureFound) {
          solveRiddle(); // Solve the riddle if the treasure is found
        }
        break;
    }
  });
}
  