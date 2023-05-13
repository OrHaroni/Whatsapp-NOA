import { useState } from 'react';
import or_pic from '../pictures/or-haroni-profile.jpg';
import naor_pic from '../pictures/naor-nahman-profile.jpg';
import three_pic from '../pictures/Three-musketeers.jpg';



export const useUserList = () => {
  const [userList, setUserList] = useState([
    {
      id: "1",
      username: "or8641",
      password: "1234",
      name: "Or The King",
      img: or_pic,
      chatList: [
        {
          img: naor_pic,
          name: "Naor Nahman",
          date: "2 Days Ago",
          messageList: [{ sender: "me", messageText: "Message from DB", img: or_pic }],
        },
        {
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
  ]);

  // Function that adds a user to the list
  const addUser = (user) => {
    setUserList(userList =>[...userList, user]);
    // Adding one to get the next id number
  };

  // Returning a user (variable) by the id
  const getUserById = (id) => {
    return userList.find((user) => user.id === id);
  };

  return [userList, addUser, getUserById];
};
