//Function that returns list of messages for a specific chat id
const sendMessage = async ({ "id": id, "token": token, "msg": msg }) => {
    try {
        const response = await fetch('http://localhost:5000/api/Chats/' + id + "/Messages", {
            method: 'GET',
            headers: {
                "authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify({"msg": msg})
        });
        //Returning the user: username, displayname and img
        return [await response.json(), response.status];
    } catch (error) {
        console.error(error);
    }
};

//Function that returns list of messages for a specific chat id
const getMessages = async ({ "id": id, "token": token }) => {
    try {
        const response = await fetch('http://localhost:5000/api/Chats/' + id + "/Messages", {
            method: 'GET',
            headers: {
                "authorization": "Bearer " + token,
                'Content-Type': 'application/json',
            },
        });
        //Returning the user: username, displayname and img
        return [await response.json(), response.status];
    } catch (error) {
        console.error(error);
    }
};

module.exports = {sendMessage, getMessages};