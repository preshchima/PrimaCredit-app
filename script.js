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
const btnLogin = document.querySelector('.login__btn');
const inputUsername = document.querySelector('.login__input--user');
const inputPin = document.querySelector('.login__input--pin');
const containerMain = document.querySelector('.app');
const labelWelcome = document.querySelector('.welcome');

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

//implementing login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  const currentUser = accounts.find(
    user => user.username === inputUsername.value
  );

  if (Number(inputPin.value) === currentUser?.pin) {
    labelWelcome.textContent = `Welcome, ${currentUser.owner.split(' ')[0]}`;
    containerMain.style.display = 'grid';
    inputPin.value = inputUsername.value = '';
    inputPin.blur();
  }
});
