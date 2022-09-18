'use strict';

//DATA
const account1 = {
  owner: 'Sochima Precious Eziagwu',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  locale: 'en-MY',
  currency: 'EUR',
};

const account2 = {
  owner: 'Abdul Hameed',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  locale: 'en-US',
  currency: 'EUR',
};

const account3 = {
  owner: 'Ebube Nwoke',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  locale: 'en-AU',
  currency: 'USD',
};

const account4 = {
  owner: 'Comfort Okoro',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  locale: 'en-JY',
  currency: 'USD',
};

const account5 = {
  owner: 'Hope Ibeleme',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,
  locale: 'en-CA',
  currency: 'GBP',
};

const account6 = {
  owner: 'Ifunanya Eziagwu',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 6666,
  locale: 'en-GB',
  currency: 'NGN',
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
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const btnLoan = document.querySelector('.form__btn--loan');
const inputCloseUser = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const labeldate = document.querySelector('.date');

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

    const now = new Date();
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
      hourCycle: 'h12',
      hour: '2-digit',
      minute: '2-digit',
    };

    labeldate.textContent = formatDate(now, currentUser.locale, options);
    displayMovements(currentUser);
    calDisplayBalance(currentUser);
    calDisplaySummary(currentUser);
  }
});

// login
// containerMain.style.display = 'grid';
// displayMovements(account1.movements);
// calDisplayBalance(account1.movements);
// calDisplaySummary(account1.movements);

//display movements on dashboard
function displayMovements(acc, sort) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice(0).sort((a, b) => a - b)
    : acc.movements;

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
    hourCycle: 'h12',
  };
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${formatDate(new Date(), acc.locale)} </div>
    <div class="movements__value">${formatCurrency(
      mov,
      acc.locale,
      acc.currency
    )}</div>
  </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

//calculate and display balance
function calDisplayBalance(acc) {
  const balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${formatCurrency(
    balance,
    acc.locale,
    acc.currency
  )}`;
}

//calculate and display summary
function calDisplaySummary(acc) {
  const deposit = acc.movements
    .filter(movement => {
      return movement > 0;
    })
    .reduce((acc, deposit, i, arr) => {
      return acc + deposit;
    }, 0);
  labelIn.textContent = `${formatCurrency(deposit, acc.locale, acc.currency)}`;

  const withdrawal = acc.movements
    .filter(movement => {
      return movement < 0;
    })
    .reduce((acc, withdrawal, i, arr) => {
      return acc + withdrawal;
    }, 0);
  labelOut.textContent = `${formatCurrency(
    Math.abs(withdrawal),
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter(movement => {
      return movement > 100;
    })
    .map(deposit => 0.07 * deposit)
    .reduce((acc, withdrawal, i, arr) => {
      return acc + withdrawal;
    }, 0);
  labelInterest.textContent = `${formatCurrency(
    interest,
    acc.locale,
    acc.currency
  )}`;
}

//implementing transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  if (!inputTransferTo.value || !inputTransferAmount.value) return;

  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

  if (receiver?.movements && +inputTransferAmount.value > 0) {
    receiver.movements.push(+inputTransferAmount.value);

    currentUser.movements.push(-+inputTransferAmount.value);
    displayMovements(currentUser);
    calDisplayBalance(currentUser);
    calDisplaySummary(currentUser);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

//get loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const acceptedLoanAmount =
    currentUser.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0) * 0.1;

  if (!inputLoanAmount.value) return;

  if (
    +inputLoanAmount.value <= acceptedLoanAmount &&
    +inputLoanAmount.value > 0
  ) {
    currentUser.movements.push(+inputLoanAmount.value);
    displayMovements(currentUser);
    calDisplayBalance(currentUser);
    calDisplaySummary(currentUser);
  }
  inputLoanAmount.value = '';
});

//delete account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentUser.username === inputCloseUser.value &&
    currentUser.pin === +inputClosePin.value
  ) {
    inputClosePin.value = inputCloseUser.value = '';
    const index = accounts.indexOf(currentUser);
    accounts.splice(index, 1);

    labelWelcome.textContent = `Welcome, Log in to get started`;
    containerMain.style.display = 'none';
  }
});

//sort movements
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentUser, !sort);
  sort = true;
});

//number format
function formatCurrency(number, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(number);
}

//format date
function formatDate(date, locale, options) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}
