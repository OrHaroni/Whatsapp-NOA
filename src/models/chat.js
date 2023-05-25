//Function that returns a user Personal data.
const getUserPersonel = async ({ "username": username, "token": token }) => {
    try {
        const response = await fetch('http://localhost:5000/api/Users/' + username, {
            method: 'GET',
            headers: {
                "authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            },
        });
        //Returning the user: username, displayname and img
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

//Function that returns a user's chat list.
const getUserChats = async ({"token": token}) => {
    try {
        const response = await fetch('http://localhost:5000/api/Chats/', {
            method: 'GET',
            headers: {
                "authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            },
        });
        //Returning the user's chat list
        return await response.json();
    } catch (error) {
        console.error(error);
    }

}

//Function that adds a chat to a user's chat
const addChat = async ({"token" : token, "username" : user}) => {
    try {
        const response = await fetch('http://localhost:5000/api/Chats/', {
            method: 'POST',
            headers: {
                "authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify({"username": user})
        });
        //Returning the user's chat list
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

//Function that returns a chat by its id
const getChat = async ({"token" : token, "id" : id}) => {
    try {
        const response = await fetch('http://localhost:5000/api/Chats/' + id + '/Messages', {
            method: 'GET',
            headers: {
                "authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            },
        });
        //Returning the chat with this id
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
module.exports = {
    getUserPersonel, getUserChats,addChat, getChat
}