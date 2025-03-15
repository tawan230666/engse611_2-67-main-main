const socials = ['Twitter', 'LinkedIn', 'Facebook', 'Instagram'];

// ดู prototype chain ของ array
console.log(Object.getPrototypeOf(socials));

// ใช้ forEach() แบบต่าง ๆ
socials.forEach((item) => console.log(item)); // Short form
socials.forEach((item, index, arr) => console.log(`${index} - ${item}`, arr)); // พร้อม index และ array ต้นฉบับ

// ใช้ named function กับ forEach()
function logSocials(social) {
  console.log(social);
}
socials.forEach(logSocials);

// Array ของ object
const socialObjs = [
  { name: 'Twitter', url: 'https://twitter.com' },
  { name: 'Facebook', url: 'https://facebook.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
];

socialObjs.forEach((item) => console.log(item.url));