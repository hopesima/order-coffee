const button = document.getElementsByClassName('add-button')[0];
const form = document.getElementsByTagName('form')[0];

let deleteButtonsCount = 1;

button.addEventListener('click', () => {
    const firstBeverageField = form.querySelector('.beverage');
    const newBeverage = firstBeverageField.cloneNode(true);
    const beverageCount = newBeverage.querySelector('.beverage-count');
    const currentCount = form.querySelectorAll('.beverage').length + 1;
    beverageCount.textContent = `Напиток №${currentCount}`;

    updateRadioNames(newBeverage, currentCount);

    const dB = newBeverage.getElementsByClassName('delete-beverage')[0];
    configureButton(dB);
    deleteButtonsCount++;

    form.insertBefore(newBeverage, form.querySelector('.add-button').parentElement);
});

function updateRadioNames(newBeverage, count) {
    const radios = newBeverage.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
        radio.name = `milk-${count}`;  // Присваиваем уникальное имя для группы радиокнопок
    });
}
const configureButton = (b) => {
    const deleteButtonAction = (el) => {
        if (deleteButtonsCount > 1) {
            el.parentElement.parentElement.remove();
            deleteButtonsCount -= 1;
        }
    }
    b.addEventListener('click', (e) => {
        deleteButtonAction(b)
    })
}

const deleteButton = document.getElementsByClassName('delete-beverage')[0];
configureButton(deleteButton);
