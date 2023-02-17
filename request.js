const makeOption = (path) => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `http://localhost:3000/${path}`,
  };
};

const run = async () => {
  // eslint-disable-next-line  @typescript-eslint/no-var-requires
  const axios = require('axios').default;
  try {
    const userProcess = axios.request(makeOption('user'));
    const commentProcess = axios.request(makeOption('comment'));
    Promise.all([commentProcess, userProcess]);
    return 'suceess';
  } catch (e) {
    console.log(e);
  }
};

run();
