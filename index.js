const button = document.getElementsByClassName('add-button')[0];
const form = document.getElementsByTagName('form')[0];
button.addEventListener('click', () => {
    const firstBeverageField = form.querySelector('.beverage');
    const newBeverage = firstBeverageField.cloneNode(true);
    const beverageCount = newBeverage.querySelector('.beverage-count');
    const currentCount = form.querySelectorAll('.beverage').length + 1; 
    beverageCount.textContent = `Напиток №${currentCount}`;

    form.insertBefore(newBeverage, form.querySelector('.add-button').parentElement);
});

