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

function getBeverageWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return 'напиток';
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return 'напитка';
    } else {
        return 'напитков';
    }
}

const deleteButton = document.getElementsByClassName('delete-beverage')[0];
configureButton(deleteButton);

const submitButton = document.querySelector('.submit-button');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const beverageCount = deleteButtonsCount;

    modal.style.display = 'flex';
    const body = modal.querySelector('.description');
    body.textContent = `Вы заказали ${beverageCount} ${getBeverageWord(beverageCount)}`;
});


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
