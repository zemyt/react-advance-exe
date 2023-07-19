import { React, createContext, useState, useEffect } from "react";

export const MyContext = createContext({});

MyContext.displayName = "MyContext";

export const MyContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoriesResponse = await fetch(
        `http://localhost:3000/categories`
      );
      const eventsResponse = await fetch(`http://localhost:3000/events`);
      const usersResponse = await fetch(`http://localhost:3000/users`);

      const categoriesData = await categoriesResponse.json();
      const eventsData = await eventsResponse.json();
      const usersData = await usersResponse.json();

      setCategories(categoriesData);
      setEvents(eventsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };

  // Time stuff

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    const hour = `${now.getHours()}`.padStart(2, "0");
    const minute = `${now.getMinutes()}`.padStart(2, "0");
    const currentTime = `${year}-${month}-${day}T${hour}:${minute}`;

    return currentTime;
  };

  return (
    <MyContext.Provider
      value={{
        getCurrentTime,
        scrollToTop,
        users,
        categories,
        events,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
