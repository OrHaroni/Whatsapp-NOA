import or_pic from '../pictures/or-haroni-profile.jpg';
import naor_pic from '../pictures/naor-nahman-profile.jpg';
import three_pic from '../pictures/Three-musketeers.jpg';



 export const userList = ([
    {
      id: "1",
      username: "or8641",
      password: "1234",
      name: "Or The King",
      img: or_pic,
      chatList: [
        {
          id : 1,
          img: or_pic,
          name: "Test",
          date: "2 Tests Ago",
          messageList: [{ sender: "me", messageText: "Message from Test", img: or_pic },
          { sender: "Naor Nahman", messageText: "Hello Or. My name is Naor", img: naor_pic }],
        },
        {
          id : 2,
          img: naor_pic,
          name: "Naor Nahman",
          date: "2 Days Ago",
          messageList: [{ sender: "me", messageText: "Message from DB", img: or_pic }],
        },
        { 
          id: 3,
          img: three_pic,
          name: "Noomik",
          date: "12 Days Ago",
          messageList: [
            { sender: "Naor Nahman", messageText: "Hello Noam. My name is Naor", img: naor_pic },
            { sender: "me", messageText: "Hello Naor. My name is Noam", img: or_pic },
          ],
        },
      ],
    },
    {id: "2",
    username: "test",
    password : "1234",
    name : "Test The Boy",
    img: or_pic,
    chatList: []
  }
  ]);

  // Returning a user (variable) by the id
  export const getUserById = (id) => {
    return userList.find((user) => user.id === id);
  };

