import express from 'express';

const a: number = 3;
console.log(a);

const app = express();
app.listen(4001, () => {
  console.log('Listening...', 4001);
});

export default a;
