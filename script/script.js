document.addEventListener("DOMContentLoaded", function () {
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modalBlock = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector("#question");
  const fromAnswers = document.querySelector("#formAnswers");

  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
  });

  const playTest = () => {
    const renderAnswers = (index) => {
      questionTitle.textContent = "Какого цвета бургер вы хотите?";

      const images = ["./image/burger.png", "./image/burgerBlack.png"];
      const titles = ["Стандарт", "Черный"];

      fromAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
            <input type="radio" id="answerItem1" name="answer" class="d-none">
            <label for="answerItem1" class="d-flex flex-column justify-content-between">
              <img class="answerImg" src="${images[0]}" alt="burger">
              <span>${titles[0]}</span>
            </label>
          </div>
          <div class="answers-item d-flex justify-content-center">
            <input type="radio" id="answerItem2" name="answer" class="d-none">
            <label for="answerItem2" class="d-flex flex-column justify-content-between">
              <img class="answerImg" src="${images[1]}" alt="burger">
              <span>${titles[1]}</span>
            </label>
          </div>
            `;
    };

    renderAnswers();
  };
});
