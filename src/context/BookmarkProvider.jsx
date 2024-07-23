import { createContext, useContext, useState, useEffect } from "react";
const BookmarkContext = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from AsyncStorage on component mount
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmarks");
        if (storedBookmarks !== null) {
          setBookmarks(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error("Failed to load bookmarks", error);
      }
    };

    loadBookmarks();
  }, []);

  const addBookmark = async (item, surahName, surahNum) => {
    try {
      const updatedBookmarks = [...bookmarks, { ...item, surahName, surahNum }];
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error("Failed to add bookmark", error);
    }
  };

  const removeBookmark = async (item) => {
    try {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) =>
          bookmark.number !== item.number ||
          bookmark.numberInSurah !== item.numberInSurah
      );
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error("Failed to remove bookmark", error);
    }
  };

  const clearBookmarks = async () => {
    try {
      setBookmarks([]);
      await AsyncStorage.removeItem("bookmarks");
    } catch (error) {
      console.error("Failed to clear bookmarks", error);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark, clearBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export { BookmarkContext, BookmarkProvider };

export const useBookmark = () => {
  return useContext(BookmarkContext);
};
