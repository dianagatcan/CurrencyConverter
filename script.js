// Am adaugat name, pentru display in select
const data = {
  exchangeRates: [
    {
      code: "USD",
      name: "US Dollar",
      rate: 1,
    },
    {
      code: "EUR",
      name: "Euro",
      rate: 1.19,
    },
    {
      code: "GBP",
      name: "British Pound",
      rate: 1.39,
    },
    {
      code: "MDL",
      name: "Moldovan Leu",
      rate: 0.056,
    },
  ],
};

// Add Options to Selects
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const selectForms = document.querySelectorAll("select");
// Select array from data object
let array = data.exchangeRates;

//Sort codes alphabetically
array.sort((a, b) => (a.code < b.code ? 1 : -1));
//For each select assign as many options as there are codes
selectForms.forEach((selectForm) => {
  array.forEach((obiect) => {
    let option = document.createElement("option");
    option.setAttribute("value", obiect.code);
    selectForm.appendChild(option);
    option.textContent = `${obiect.code} - ${obiect.name}`;
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const alertUser = function (inputValue) {
  if (isNaN(inputValue)) {
    document.querySelector(".left p").textContent = "!Input must be a number";
    document.querySelector(".right input").value = "0.00";
  } else {
    document.querySelector(".left p").textContent = "";
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const convert = function (inputValue, leftSelect, rightSelect) {
  const leftOption = leftSelect.value;
  const leftRate = data.exchangeRates.find((obiect) => {
    return obiect.code === leftOption;
  }).rate;
  //get rate
  const rightOption = rightSelect.value;
  const rightRate = data.exchangeRates.find((obiect) => {
    return obiect.code === rightOption;
  }).rate;

  document.querySelector(".right input").value = (
    (leftRate / rightRate) *
    inputValue
  ).toFixed(2);
};

function handleConvert() {
  convert(
    document.querySelector(".left input").value,
    document.querySelector(".left select"),
    document.querySelector(".right select")
  );
}

// after key is pressed the value is evaluated and the function is called
const leftInput = document.querySelector(".left input");
const leftSelect = document.querySelector(".left select");
const rightSelect = document.querySelector(".right select");

//listen when the key is up
leftInput.addEventListener("keyup", () => {
  handleConvert();
  alertUser(document.querySelector(".left input").value);
});

//listen when the right or left select is changed
[leftSelect, rightSelect].forEach((select) => {
  select.addEventListener("change", () => {
    handleConvert();
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const button = document.querySelector("button");
button.addEventListener("click", () => {
  let leftValue = document.querySelector(".left select").value;
  let rightValue = document.querySelector(".right select").value;

  document.querySelector(".left select").value = rightValue;
  document.querySelector(".right select").value = leftValue;
  handleConvert();
});
