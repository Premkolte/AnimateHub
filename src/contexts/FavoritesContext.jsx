import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const [favorites, setFavorites] = useState([]);

  // Generate a unique storage key for the user
  const getStorageKey = () => {
    if (isSignedIn && user?.id) {
      return `favorites_${user.id}`;
    }
    return null;
  };

  // Load favorites from localStorage when user signs in
  useEffect(() => {
    if (isSignedIn && user?.id) {
      const storageKey = getStorageKey();
      if (storageKey) {
        try {
          const userFavorites = localStorage.getItem(storageKey);
          if (userFavorites) {
            const parsedFavorites = JSON.parse(userFavorites);
            setFavorites(parsedFavorites);
            console.log('Loaded favorites:', parsedFavorites); // Debug log
          } else {
            setFavorites([]);
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
          setFavorites([]);
        }
      }
    } else {
      setFavorites([]);
    }
  }, [isSignedIn, user?.id]);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (isSignedIn && user?.id && favorites.length >= 0) {
      const storageKey = getStorageKey();
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(favorites));
          console.log('Saved favorites:', favorites); // Debug log
        } catch (error) {
          console.error('Error saving favorites:', error);
        }
      }
    }
  }, [favorites, isSignedIn, user?.id]);

  const addToFavorites = (snippet) => {
    if (!isSignedIn || !user?.id) {
      console.log('User not signed in, cannot add to favorites');
      return false;
    }
    
    const snippetId = `${snippet.type}_${snippet.index}`;
    const isAlreadyFavorite = favorites.some(fav => fav.id === snippetId);
    
    if (!isAlreadyFavorite) {
      const newFavorite = {
        id: snippetId,
        type: snippet.type,
        index: snippet.index,
        title: snippet.title,
        jsxCode: snippet.jsxCode,
        cssCode: snippet.cssCode,
        dateAdded: new Date().toISOString(),
      };
      
      setFavorites(prev => {
        const updated = [...prev, newFavorite];
        console.log('Adding to favorites:', newFavorite); // Debug log
        console.log('Updated favorites:', updated); // Debug log
        return updated;
      });
      return true;
    }
    return false;
  };

  const removeFromFavorites = (snippetId) => {
    if (!isSignedIn || !user?.id) return;
    
    setFavorites(prev => {
      const updated = prev.filter(fav => fav.id !== snippetId);
      console.log('Removing from favorites:', snippetId); // Debug log
      console.log('Updated favorites:', updated); // Debug log
      return updated;
    });
  };

  const isFavorite = (snippet) => {
    if (!isSignedIn || !user?.id) return false;
    const snippetId = `${snippet.type}_${snippet.index}`;
    return favorites.some(fav => fav.id === snippetId);
  };

  const toggleFavorite = (snippet) => {
    if (!isSignedIn || !user?.id) {
      console.log('User not signed in, cannot toggle favorite');
      return false;
    }
    
    const snippetId = `${snippet.type}_${snippet.index}`;
    const isCurrentlyFavorite = isFavorite(snippet);
    
    console.log('Toggling favorite:', snippetId, 'Currently favorite:', isCurrentlyFavorite); // Debug log
    
    if (isCurrentlyFavorite) {
      removeFromFavorites(snippetId);
      return false;
    } else {
      return addToFavorites(snippet);
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    isSignedIn: isSignedIn && !!user?.id,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
