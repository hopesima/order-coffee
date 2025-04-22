const button = document.getElementsByClassName('add-button')[0];
const form = document.getElementsByTagName('form')[0];

let deleteButtonsCount = 1;

button.addEventListener('click', () => {
    const firstBeverageField = form.querySelector('.beverage');
    const newBeverage = firstBeverageField.cloneNode(true);
    const beverageCount = newBeverage.querySelector('.beverage-count');
    const currentCount = form.querySelectorAll('.beverage').length + 1; 
    beverageCount.textContent = `Напиток №${currentCount}`;

    const dB = newBeverage.getElementsByClassName('delete-beverage')[0];
    configureButton(dB);
    deleteButtonsCount++;

    form.insertBefore(newBeverage, form.querySelector('.add-button').parentElement);
});


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

const submitButton = document.querySelector('.submit-button');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close');

submitButton.addEventListener('click', (e) => {
  e.preventDefault(); 
  modal.style.display = 'flex'; 
});


closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});