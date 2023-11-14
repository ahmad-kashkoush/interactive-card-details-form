
// todo select all elements
const form = document.querySelector('form');
const ownerName = document.querySelector('input[name="name"]');
const cardNumber = document.querySelector('input[name="card-number"]');
const monthField = document.querySelector('input#month');
const yearField = document.querySelector('input[name="year"]');
const cvcField = document.querySelector('input#cvc');
const thankYou = document.querySelector('.completed');
const inputsArr = [ownerName, cardNumber, monthField, yearField, cvcField];

const resetField = function (inputField) {
    inputField.classList.remove("input-error");
    inputField.closest('.input-field').querySelector(".error-message").classList.add("hidden");

}
const addError = function (inputField, message = "Can't be Blank") {
    inputField.classList.add("input-error");
    inputField.closest('.input-field').querySelector(".error-message").classList.remove("hidden");
    inputField.nextElementSibling.textContent = message;
}
// todo validate each input field
const notValidName = name => [...name].some(ele => (Number.isFinite(+ele) && ele !== " "));
// Validate inputfield Numbers only

const notValidCardNumber = num => ([...num].some(ele => !Number.isFinite(+ele)));
const notValidCVCNumber = num => ([...num].some(ele => !Number.isFinite(+ele) || ele === " "));

const validateNameInput = function (inputField) {
    if (!inputField.value) {
        addError(inputField);
        return false;
    }
    if (notValidName(inputField.value)) {
        console.log(notValidName(inputField.value));
        addError(inputField, "not Valid Name")
        return false;
    }
    return true;
}
const validateMonth = function (inputField) {
    if (!inputField.value) {
        addError(inputField);
        return false;
    }
    if (+inputField.value > 12 || +inputField.value < 1) {
        addError(inputField, "Not Valid Month");
        return false;
    }
    return true;
}
const validateYear = function (inputField) {
    if (!inputField.value) {
        addError(inputField);
        return false;
    }
    if (+inputField.value < (new Date()).getFullYear()) {
        addError(inputField, "Year can't be in the Past");
        return false;
    }
    return true;
}
const validateNumber = function (inputField, id) {
    if (!inputField.value) {
        addError(inputField);
        return false;
    }
    let notValidNumber = notValidCardNumber;
    if (id === "cvc") notValidNumber = notValidCVCNumber;
    if (notValidNumber(inputField.value)) {
        addError(inputField, "Wrong Format");
        return false;
    }

    return true;

}
let validateIsOn = false;
// ownerName.value = "Ahmed Kashkoush";
const validate = function () {
    if (!validateIsOn) return;
    inputsArr.forEach(ele => resetField(ele));
    let x = true;
    x = validateNameInput(ownerName) && x;
    x = validateNumber(cardNumber, "card-number") && x;
    x = validateMonth(monthField) && x;
    x = validateYear(yearField) && x;
    x = validateNumber(cvcField, "cvc") && x;

    return x;

}

// todo addEvent

form.addEventListener('submit', function (e) {
    e.preventDefault();
    validateIsOn = true;
    const validated = validate();
    // validateIsOn = false;
    if (!validated) return;
    inputsArr.forEach(ele => ele.value = "");
    thankYou.classList.remove("hidden");
    form.classList.add("hidden");

});
document.addEventListener('keydown', function (e) {
    // e.preventDefault();
    if (e.key === "Escape") {
        if (!thankYou.classList.contains("hidden"))
            thankYou.classList.add("hidden");
        if (form.classList.contains('hidden'))
            form.classList.remove("hidden");
    }
})


