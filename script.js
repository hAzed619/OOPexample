
// Car class definition
class Car {
    constructor(name, model, year, price) {
        this.name = name;
        this.model = model;
        this.year = year;
        this.price = price;
    }

    calculatePrice() {
        const currentYear = new Date().getFullYear();
        const age = currentYear - this.year;
        const depreciation = age * 500;
        const depreciatedPrice = Math.max(0, this.price - depreciation);
        return depreciatedPrice;
    }
}

// CarManager class definition
class CarManager {
    constructor() {
        this.cars = [];
    }

    addCar(car) {
        this.cars.push(car);
    }

    displayCars() {
        const carListElement = document.getElementById('car-list');
        carListElement.innerHTML = ''; // Clear previous list
        this.cars.forEach(car => {
            const carItem = document.createElement('div');
            carItem.className = 'car-item';
            carItem.textContent = `${car.name} ${car.model} (${car.year}) - $${car.calculatePrice().toFixed(2)}`;
            carListElement.appendChild(carItem);
        });
    }

    showTotalPrice() {
        const totalPrice = this.cars.reduce((sum, car) => sum + car.calculatePrice(), 0);
        document.getElementById('total-price').textContent = `Total Price After Depreciation: $${totalPrice.toFixed(2)}`;
    }
}

// Method to display the list of cars
const carManager = new CarManager();

document.getElementById('car-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('car-name').value;
    const model = document.getElementById('car-model').value;
    const year = parseInt(document.getElementById('car-year').value);
    const price = parseFloat(document.getElementById('car-price').value);
    
    const newCar = new Car(name, model, year, price);
    carManager.addCar(newCar);
    carManager.displayCars();
    
    this.reset(); // Reset form
});

document.getElementById('total-price-btn').addEventListener('click', function() {
    carManager.showTotalPrice();
});
