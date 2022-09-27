'use strict';

//DATA
const account1 = {
  owner: 'Sochima Precious Eziagwu',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  locale: 'en-MY',
  currency: 'EUR',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2012-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-08-08T14:11:59.604Z',
    '2022-08-25T17:01:17.194Z',
    '2022-09-26T23:36:17.929Z',
    '2022-09-27T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Abdul Hameed',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  locale: 'en-US',
  currency: 'EUR',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2012-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-08-08T14:11:59.604Z',
    '2022-08-25T17:01:17.194Z',
    '2022-09-10T23:36:17.929Z',
    '2022-09-13T10:51:36.790Z',
  ],
};

const account3 = {
  owner: 'Ebube Nwoke',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  locale: 'en-AU',
  currency: 'USD',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2012-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-08-08T14:11:59.604Z',
  ],
};

const account4 = {
  owner: 'Comfort Okoro',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  locale: 'en-JY',
  currency: 'USD',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2012-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-08-08T14:11:59.604Z',
  ],
};

const account5 = {
  owner: 'Hope Ibeleme',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,
  locale: 'en-CA',
  currency: 'GBP',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2012-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-08-08T14:11:59.604Z',
  ],
};

const account6 = {
  owner: 'Ifunanya Eziagwu',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 6666,
  locale: 'en-GB',
  currency: 'NGN',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2012-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-08-08T14:11:59.604Z',
  ],
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
const labeldate = document.querySelector('.date');
const labelTimer = document.querySelector('.timer');

const inputUsername = document.querySelector('.login__input--user');
const inputPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUser = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLogin = document.querySelector('.login__btn');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

let currentUser, timer;
let sort = false;

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

//calculate days passed
function formatMovementsDate(date, locale) {
  const calDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const daysPassed = calDaysPassed(date, new Date());

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
}

//timer
function startLogTimer() {
  let time = 60;
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      labelWelcome.textContent = 'Log in to get started';
      containerMain.style.display = 'none';
    }
    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

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
    displayUI(currentUser);
    if (timer) clearInterval(timer);
    timer = startLogTimer();
  }
});

//display movements on dashboard
function displayMovements(acc, sort) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice(0).sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);
    const formatCur = formatCurrency(mov, acc.locale, acc.currency);
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate} </div>
    <div class="movements__value">${formatCur}</div>
  </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

//calculate and display balance
function calDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${formatCurrency(
    acc.balance,
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
      return movement > 0;
    })
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov > 1)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelInterest.textContent = `${formatCurrency(
    interest,
    acc.locale,
    acc.currency
  )}`;
}

//display UI
function displayUI(account) {
  displayMovements(account);
  calDisplayBalance(account);
  calDisplaySummary(account);
}

//implementing transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  if (!inputTransferTo.value || !inputTransferAmount.value) return;

  const amount = +inputTransferAmount.value;
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

  if (
    receiver?.movements &&
    amount > 0 &&
    currentUser.balance > amount &&
    currentUser.username !== receiver.username
  ) {
    receiver.movements.push(amount);
    receiver.movementsDates.push(new Date().toISOString());
    currentUser.movements.push(-amount);
    currentUser.movementsDates.push(new Date().toISOString());

    displayUI(currentUser);
    clearInterval(timer);
    timer = startLogTimer();
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

//get loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;
  const acceptedLoanAmount =
    currentUser.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0) * 0.1;

  if (!inputLoanAmount.value) return;

  if (amount <= acceptedLoanAmount && amount > 0) {
    currentUser.movements.push(+inputLoanAmount.value);
    displayUI(currentUser);
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

    labelWelcome.textContent = `Log in to get started`;
    containerMain.style.display = 'none';
  }
});

//sort movements
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentUser, !sort);
  sort = true;
});
