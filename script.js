'use strict';

//DATA
const account1 = {
  owner: 'Sochima Precious Eziagwu',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Abdul Hameed',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Ebube Nwoke',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Comfort Okoro',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Hope Ibeleme',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,
};

const account6 = {
  owner: 'Ifunanya Eziagwu',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 6666,
};

const accounts = [account1, account2, account3, account4, account5, account6];

//Elements
const containerMain = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance__value');
const labelIn = document.querySelector('.summary__value--in');
const labelOut = document.querySelector('.summary__value--out');
const labelInterest = document.querySelector('.summary__value--interest');

const inputUsername = document.querySelector('.login__input--user');
const inputPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');

const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLogin = document.querySelector('.login__btn');

//create usernames for account
const createUsernane = accounts => {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernane(accounts);

let currentUser;

//implementing login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentUser = accounts.find(user => user.username === inputUsername.value);

  if (Number(inputPin.value) === currentUser?.pin) {
    labelWelcome.textContent = `Welcome, ${currentUser.owner.split(' ')[0]}`;
    containerMain.style.display = 'grid';
    inputPin.value = inputUsername.value = '';
    inputPin.blur();

    displayMovements(currentUser.movements);
    calDisplayBalance(currentUser.movements);
    calDisplaySummary(currentUser.movements);
  }
});

// // login
// containerMain.style.display = 'grid';
// displayMovements(account1.movements);
// calDisplayBalance(account1.movements);
// calDisplaySummary(account1.movements);

//display movements on dashboard
function displayMovements(movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date"> </div>
    <div class="movements__value">${mov.toFixed(2)}€</div>
  </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

//calculate and display balance
function calDisplayBalance(movements) {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${balance.toFixed(2)}€`;
}

//calculate and display summary
function calDisplaySummary(movements) {
  const deposit = movements
    .filter(movement => {
      return movement > 0;
    })
    .reduce((acc, deposit, i, arr) => {
      return acc + deposit;
    }, 0);
  labelIn.textContent = `${deposit.toFixed(2)}€`;

  const withdrawal = movements
    .filter(movement => {
      return movement < 0;
    })
    .reduce((acc, withdrawal, i, arr) => {
      return acc + withdrawal;
    }, 0);
  labelOut.textContent = `${Math.abs(withdrawal).toFixed(2)}€`;

  const interest = movements
    .filter(movement => {
      return movement > 100;
    })
    .map(deposit => 0.07 * deposit)
    .reduce((acc, withdrawal, i, arr) => {
      return acc + withdrawal;
    }, 0);
  labelInterest.textContent = `${interest.toFixed(2)}€`;
}

//implementing transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  if (!inputTransferTo.value || !inputTransferAmount.value) return;

  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

  if (receiver?.movements && +inputTransferAmount.value > 0) {
    receiver.movements.push(+inputTransferAmount.value);

    currentUser.movements.push(-+inputTransferAmount.value);
    displayMovements(currentUser.movements);
    calDisplayBalance(currentUser.movements);
    calDisplaySummary(currentUser.movements);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});
