

//Function that talks with the server.
const registerServer = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response.status);
      return response.status;
    } catch (error) {
      console.error(error);
    }
  };

  module.exports = {
    registerServer
  }