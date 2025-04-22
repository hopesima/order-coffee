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
        radio.name = `milk-${count}`;
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

const closeBtn = document.querySelector('.close');
const submitButton = document.querySelector('.submit-button');
const modal = document.getElementById('myModal');
const modalText = document.getElementById('modal-text');
const beveragesTable = document.getElementById('beverages-table').getElementsByTagName('tbody')[0];


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const beverageCount = deleteButtonsCount;

    const beverageWord = getBeverageWord(beverageCount);

    modalText.textContent = `Вы заказали ${beverageCount} ${beverageWord}`;

    beveragesTable.innerHTML = '';

    const beverages = document.querySelectorAll('.beverage');
    beverages.forEach((beverage) => {
        const name = beverage.querySelector('select').value;
        const milk = getSelectedMilk(beverage);
        const options = getSelectedOptions(beverage);

        const row = beveragesTable.insertRow();
        row.insertCell(0).textContent = name.charAt(0).toUpperCase() + name.slice(1);
        row.insertCell(1).textContent = milk;
        row.insertCell(2).textContent = options;
    });

    modal.style.display = 'flex';
});

function getSelectedMilk(beverage) {
    const milkRadios = beverage.querySelectorAll('input[type="radio"]');
    for (const radio of milkRadios) {
        if (radio.checked) {
            return radio.nextElementSibling.textContent.trim();
        }
    }
    return 'Не выбрано';
}

function getSelectedOptions(beverage) {
    const optionsCheckboxes = beverage.querySelectorAll('input[type="checkbox"]');
    const selectedOptions = [];
    optionsCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.nextElementSibling.textContent.trim());
        }
    });
    return selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Не выбрано';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
