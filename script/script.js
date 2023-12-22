document.addEventListener("DOMContentLoaded", function () {
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modalBlock = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector("#question");
  const formAnswers = document.querySelector("#formAnswers");
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  const sendButton = document.querySelector("#send");

  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
        {
          title: "Стандарт",
          url: "./image/burger.png",
        },
        {
          title: "Черный",
          url: "./image/burgerBlack.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
        {
          title: "Курица",
          url: "./image/chickenMeat.png",
        },
        {
          title: "Говядина",
          url: "./image/beefMeat.png",
        },
        {
          title: "Свинина",
          url: "./image/porkMeat.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
        {
          title: "Помидор",
          url: "./image/tomato.png",
        },
        {
          title: "Огурец",
          url: "./image/cucumber.png",
        },
        {
          title: "Салат",
          url: "./image/salad.png",
        },
        {
          title: "Лук",
          url: "./image/onion.png",
        },
      ],
      type: "checkbox",
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          title: "Чесночный",
          url: "./image/sauce1.png",
        },
        {
          title: "Томатный",
          url: "./image/sauce2.png",
        },
        {
          title: "Горчичный",
          url: "./image/sauce3.png",
        },
      ],
      type: "radio",
    },
  ];

  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
  });

  const playTest = () => {
    let numberQuestion = 0;
    let finalAnswers = [];

    const updateMarkup = () => {
      switch (numberQuestion) {
        case 0:
          prevButton.classList.add("d-none");
          nextButton.classList.remove("d-none");
          sendButton.classList.add("d-none");
          break;
        case questions.length:
          prevButton.classList.remove("d-none");
          nextButton.classList.add("d-none");
          sendButton.classList.remove("d-none");

          formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Enter your number</label>
            <input type="phone" class="form-control" id="numberPhone">
          </div>
          `;
          break;
        default:
          nextButton.classList.remove("d-none");
          prevButton.classList.remove("d-none");
          sendButton.classList.add("d-none");
          break;
      }
    };

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");

        answerItem.classList.add(
          "answers-item",
          "d-flex",
          "justify-content-center"
        );

        answerItem.innerHTML = `
              <input type="${questions[index].type}" id="answerItem${questions[
          index
        ].answers.indexOf(answer)}" name="answer" class="d-none">
              <label for="answerItem${questions[index].answers.indexOf(
                answer
              )}" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${answer.url}" alt="burger">
                  <span>${answer.title}</span>
              </label>
          `;

        formAnswers.appendChild(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = "";
      updateMarkup();

      console.log(indexQuestion, questions.length - 1);
      if (indexQuestion < questions.length) {
        questionTitle.textContent = questions[indexQuestion].question;
        renderAnswers(indexQuestion);
      } else if (indexQuestion === questions.length + 1) {
        questionTitle.textContent = "Thank you for your answers!";

        setTimeout(() => {
          modalBlock.classList.remove("d-block");
        }, 2000);
      }
    };

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};

      const inputs = [...formAnswers.elements].filter(
        (input) => input.checked || input.id === "numberPhone"
      );

      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] =
            input.nextElementSibling.textContent.trim();
        }

        if (numberQuestion === questions.length) {
          obj["Номер телефона"] = input.value;
        }
      });

      finalAnswers.push(obj);
    };

    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };

    prevButton.onclick = () => {
      checkAnswer();
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    };
  };
});
