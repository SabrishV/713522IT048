require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;

let nums = [];
let prevNums = [];

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTQ5MjgxLCJpYXQiOjE3NDMxNDg5ODEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjlmYjhjZTEzLWUzMDYtNDM3Ni1hZmRiLThhMDc4MzljNzU1ZCIsInN1YiI6InNhYnJpc2h2MTFAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI5ZmI4Y2UxMy1lMzA2LTQzNzYtYWZkYi04YTA3ODM5Yzc1NWQiLCJjbGllbnRTZWNyZXQiOiJjWENNRmRaZlJZdVBvUXlwIiwib3duZXJOYW1lIjoiUmFodWwiLCJvd25lckVtYWlsIjoic2FicmlzaHYxMUBnbWFpbC5jb20iLCJyb2xsTm8iOiI3MTM1MjJJVDA0OCJ9.Xxa0WaafoED9Po7xXM2ilZwYzhibjAnZKcvjg-84elM';

const urls = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  r: 'http://20.244.56.144/test/rand'
};

app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  
  if (!urls[type]) {
    return res.status(400).json({ msg: 'wrong type' });
  }

  try {
    const start = Date.now();
    const resp = await axios.get(urls[type], {
      timeout: 500,
      headers: { 'Authorization': 'Bearer ' + token }
    });

    if (Date.now() - start > 500) {
      throw new Error('too slow');
    }

    const newNums = resp.data.numbers || [];
    prevNums = [...nums];

    for (let n of newNums) {
      if (!nums.includes(n)) {
        if (nums.length >= 10) {
          nums.shift();
        }
        nums.push(n);
      }
    }

    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
      sum += nums[i];
    }
    const avg = nums.length ? (sum / nums.length).toFixed(2) : 0;

    res.json({
      windowPrevState: prevNums,
      windowCurrState: nums,
      " numbers ": newNums,
      avg: parseFloat(avg)
    });

  } catch (err) {
    console.log('error:', err.message);
    if (err.response?.status === 401) {
      return res.status(401).json({ msg: 'bad token' });
    }
    res.status(500).json({ msg: 'server error' });
  }
});

app.listen(port, () => {
  console.log('server on port ' + port);
});