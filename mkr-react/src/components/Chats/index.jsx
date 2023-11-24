import React, { useEffect, useRef, useState } from "react";
import {
  fetchCreateMessage,
  fetchMessagesByCourseId,
  fetchStudentsByGroupId,
  fetchUserById,
} from "../../fetch";
import styles from "./Chats.module.scss";
import Linkify from "react-linkify";

const Chats = ({ course, me }) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState({
    group: true,
    id: course.groups[0]._id,
  });
  const [formData, setFormData] = useState({
    message: "",
  });
  const messagesBlockRef = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchСhatUsersData = async () => {
      if (me && me.role === "teacher") {
        const students = await fetchStudentsByGroupId(course.groups[0]._id);
        setChatUsers(students);
      } else if (me && me.role === "student") {
        const teacher = await fetchUserById(course.teachers[0]._id);
        setChatUsers([teacher]);
      }
    };

    const fetchMessagesData = async () => {
      const messages = await fetchMessagesByCourseId(course._id, {
        groupMessage: currentChat.group,
        group: currentChat.id,
      });
      setMessages(messages);
    };
    fetchСhatUsersData();
    fetchMessagesData();
  }, []);

  useEffect(() => {
    // Прокрутка вниз при кожній зміні messages
    if (messagesBlockRef.current) {
      messagesBlockRef.current.scrollTop =
        messagesBlockRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e, studentId) => {
    e.preventDefault();

    formData.userWhoSent = me._id;
    formData.course = course._id;
    formData.groupMessage = currentChat.group;

    if (currentChat.group) {
      formData.group = currentChat.id;
    } else {
      formData.anotherUser = currentChat.id;
    }

    await fetchCreateMessage(formData);

    const fetchMessagesData = async () => {
      const query = {
        groupMessage: currentChat.group,
      };
      if (currentChat.group) {
        query.group = currentChat.id;
      } else {
        query.firstUser = me._id;
        query.secondUser = currentChat.id;
      }

      const messages = await fetchMessagesByCourseId(course._id, query);
      setMessages(messages);
    };
    fetchMessagesData();

    setFormData({
      message: "",
    });
  };

  const handleCurrentChat = async (e, isGroup, id) => {
    if (isGroup) {
      setCurrentChat({
        group: isGroup,
        id,
      });
    } else {
      setCurrentChat({
        group: isGroup,
        id,
      });
    }

    const fetchMessagesData = async () => {
      const query = {
        groupMessage: isGroup,
      };
      if (isGroup) {
        query.group = id;
      } else {
        query.firstUser = me._id;
        query.secondUser = id;
      }

      const messages = await fetchMessagesByCourseId(course._id, query);
      setMessages(messages);
    };
    fetchMessagesData();
  };

  return (
    <>
      <div className={styles.chatsWrapper}>
        <div className={styles.chatPanel}>
          <div
            className={styles.chatItem}
            onClick={(e) => handleCurrentChat(e, true, course.groups[0]._id)}
          >
            <img src={course && course.teachers[0].avatarUrl} />
            <div>Група: {course && course.groups[0].groupName}</div>
          </div>
          {chatUsers.map((chatUser) => (
            <div
              key={chatUser._id}
              className={styles.chatItem}
              onClick={(e) => handleCurrentChat(e, false, chatUser._id)}
            >
              <img src={chatUser.avatarUrl} />
              <div>
                {chatUser.firstName} {chatUser.lastName}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.chatMainBlock}>
          <div ref={messagesBlockRef} className={styles.chatMessagesBlock}>
            {messages.map((message) => (
              <div
                key={message._id}
                className={`${styles.messageBlock} ${
                  message.userWhoSent._id === me._id
                    ? styles.myMessage
                    : styles.anotherUserMessage
                }`}
              >
                <div className={styles.messageInfo}>
                  <img src={message.userWhoSent.avatarUrl} />
                  <span>
                    {message.userWhoSent.firstName}{" "}
                    {message.userWhoSent.lastName}
                  </span>
                </div>
                <div className={styles.message}>
                  <Linkify>{message.message}</Linkify>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.chatInputBlock}>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Повідомлення..."
            />
            <button onClick={(e) => handleSubmit(e)}>Надіслати</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
