async function findTreasureWithAsyncAwait() {
  try {
    const initialClue = await TreasureMap.getInitialClue();
    displayStep(initialClue);

    const decodedLocation = await TreasureMap.decodeAncientScript(initialClue);
    displayStep(decodedLocation);

    const boxLocation = await TreasureMap.searchTemple(decodedLocation);
    displayStep(boxLocation);

    const treasure = await TreasureMap.openTreasureBox();
    displayStep(treasure);
    showTreasureImage();
  } catch (error) {
    displayError(error);
  }
}

function displayStep(message) {
  const stepsDiv = document.getElementById('steps');
  const stepDiv = document.createElement('div');
  stepDiv.className = 'step';
  stepDiv.textContent = message;
  stepsDiv.appendChild(stepDiv);
}

function displayError(error) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = "任务失败: " + error;
  errorDiv.classList.remove('hidden');
}

function showTreasureImage() {
  const treasureImage = document.getElementById('treasure-image');
  treasureImage.classList.remove('hidden');
}

findTreasureWithAsyncAwait();
