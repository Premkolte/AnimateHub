import React from 'react';
import FavoriteButton from './FavoriteButton';

// Higher-order component to add favorite functionality to snippet cards
const withFavoriteButton = (WrappedComponent, snippetType) => {
  return function WithFavoriteButtonComponent(props) {
    const { items, ...otherProps } = props;
    
    // If items are provided, add favorite buttons to each
    if (items) {
      const itemsWithFavorites = items.map((item, index) => ({
        ...item,
        favoriteButton: (
          <FavoriteButton
            snippet={{
              type: snippetType,
              index: index,
              title: item.title || item.label || `${snippetType} ${index + 1}`,
              jsxCode: item.jsxCode,
              cssCode: item.cssCode,
            }}
            size="md"
          />
        )
      }));
      
      return <WrappedComponent {...otherProps} items={itemsWithFavorites} />;
    }
    
    return <WrappedComponent {...props} />;
  };
};

export default withFavoriteButton;
