const loginServer = async (data) => {
    const res = await fetch('http://localhost:5000/api/Tokens', {
      'method' : 'post',
      "headers" : {
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(data)
    });
    let token = await res.text();
    let statusNum = res.status;
    console.log( token);
    console.log(statusNum);
    //returning the status number and ID!!
    return [statusNum, token];
  }

  module.exports = {
    loginServer
  }