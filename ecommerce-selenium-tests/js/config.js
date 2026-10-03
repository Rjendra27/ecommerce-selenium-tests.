module.exports = {
  baseUrl: 'https://www.saucedemo.com/',
  headless: process.env.HEADLESS === 'true',
  users: {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked:   { username: 'locked_out_user', password: 'secret_sauce' },
  },
};
