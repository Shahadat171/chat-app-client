import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const Chat = () => {
  const [admin, setAdmin] = useState({});
  console.log(admin);
  const { user, logOut } = useContext(AuthContext);
  const [userQuestion, setUserQuestion] = useState({});
  const [adminChat, setAdminChat] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(admin);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const role = data.find((user) => user.role == "admin");
        setAdmin(role);
      });
  }, []);

  // all users question
  useEffect(() => {
    fetch("http://localhost:5000/admin")
      .then((res) => res.json())
      .then((data) => {
        setAdminChat(data);
        const totalQuestion = data.length;
        const lastQuestionIndex = totalQuestion - 1;
        const lastQuestion = data[lastQuestionIndex];
        setUserQuestion(lastQuestion);
      });
  }, [user.email]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserChat(data);
      });
  }, [user]);

  const hanleChat = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    const conversation = { message: message, email: user.email };
    fetch(`http://localhost:5000/chat/${user.email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(conversation),
    });
  };

  const hanleAdminChat = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    const conversation = { message: message, email: userQuestion.email };
    fetch(`http://localhost:5000/adminAnswer`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(conversation),
    });
  };

  return (
    <>
      {admin.email == user.email ? (
        <div>
          <div className="h-[80vh] flex flex-col mt-16 items-center justify-center">
            <h1 className="my-5 font text-black text-4xl font-semibold">
              Users Question
            </h1>
            <div className="flex shadow-2xl border-2 flex-col flex-grow w-full max-w-xl bg-white  rounded-lg overflow-hidden">
              <div>
                <div className="overflow-x-auto">
                  <table className="table mx-auto min-h-[51vh]">
                    <thead>
                      <tr>
                        <th className="font-bold text-lg">Question</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className=" text-left">
                      {adminChat.map((chat) => (
                        <chat key={chat._id}>
                          <tr>
                            <td>{chat.message}</td>
                            <td>{chat.email}</td>
                          </tr>
                        </chat>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <form
                onSubmit={hanleAdminChat}
                className="bg-gray-300 flex items-center justify-center gap-5 p-4"
              >
                <input
                  className="flex items-center h-10 w-full rounded px-3 text-sm"
                  type="text"
                  name="message"
                  placeholder="Type your message…"
                />
                <input type="submit" value="send" className="btn btn-primary" />
              </form>
            </div>
            <button className="mt-5 btn btn-primary" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="h-[80vh] flex flex-col mt-16 items-center justify-center">
            <h1 className="my-5 font-serif text-black text-4xl font-semibold">
              Ask Your Problem
            </h1>
            <div className="flex shadow-2xl border-2 flex-col flex-grow w-full max-w-xl bg-white  rounded-lg overflow-hidden">
              <div className="min-h-[51vh] pt-5">
                {userChat.map((user) => (
                  <user key={user._id}>
                    <div className="chat chat-start">
                      <div className="chat-bubble">
                        {user.message}
                      </div>
                    </div>
                  </user>
                ))}
              </div>
              <form
                onSubmit={hanleChat}
                className="bg-gray-300 flex items-center justify-center gap-5 p-4"
              >
                <input
                  className="flex items-center h-10 w-full rounded px-3 text-sm"
                  type="text"
                  name="message"
                  placeholder="Type your message…"
                />
                <input type="submit" value="send" className="btn btn-primary" />
              </form>
            </div>
            <button className=" mt-5 btn btn-primary" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
