import { createContext, useContext, useState, useEffect } from "react";
const PageBookmarkContext = createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";

const PageBookmarkProvider = ({ children }) => {
  const [pageBookmarks, setPageBookmarks] = useState([]);

  // Load bookmarks from AsyncStorage on component mount
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmarksPage");
        if (storedBookmarks !== null) {
          setPageBookmarks(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error("Failed to load bookmarks", error);
      }
    };

    loadBookmarks();
  }, []);

  const addpageBookmark = async (surah) => {
    try {
      const updatedBookmarks = [...pageBookmarks, surah];
      setPageBookmarks(updatedBookmarks);
      await AsyncStorage.setItem("bookmarksPage", JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error("Failed to add bookmark", error);
    }
  };

  const removepageBookmark = async (surah) => {
    try {
      const updatedBookmarks = pageBookmarks.filter(
        (bookmark) =>
          bookmark.number !== surah.number
      );
      setPageBookmarks(updatedBookmarks);
      await AsyncStorage.setItem("bookmarksPage", JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error("Failed to remove bookmark", error);
    }
  };

  const clearpageBookmarks = async () => {
    try {
      setPageBookmarks([]);
      await AsyncStorage.removeItem("bookmarksPage");
    } catch (error) {
      console.error("Failed to clear bookmarks", error);
    }
  };

  return (
    <PageBookmarkContext.Provider
      value={{ pageBookmarks, addpageBookmark, removepageBookmark, clearpageBookmarks }}
    >
      {children}
    </PageBookmarkContext.Provider>
  );
};

export { PageBookmarkContext, PageBookmarkProvider };

export const usePageBookmark = () => {
  return useContext(PageBookmarkContext);
};
