const age = 17;

// ใช้ if-else statement
if (age >= 18) {
  console.log('You can vote!');
} else {
  console.log('You can not vote');
}

// ใช้ ternary operator
console.log(age >= 18 ? 'You can vote!' : 'You can not vote');

// กำหนดค่าให้ตัวแปรโดยใช้ ternary
const canVote = age >= 18;
const canVote2 = age >= 18 ? 'You can vote!' : 'You can not vote';

console.log(canVote);
console.log(canVote2);

// การใช้ ternary operator กับหลายคำสั่ง
const auth = true;

function dashboardAccess() {
  console.log('Welcome to the dashboard');
  return '/dashboard';
}

function loginAccess() {
  console.log('Access Denied');
  return '/login';
}

const redirect = auth ? dashboardAccess() : loginAccess();
console.log(redirect);

// Ternary ที่ไม่มี else
if (auth) console.log('Welcome to the dashboard');

// ใช้ && แทน ternary ที่ไม่มี else
auth && console.log('Welcome to the dashboard');