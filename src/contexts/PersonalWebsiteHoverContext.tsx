"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PersonalWebsiteHoverContextType {
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

const PersonalWebsiteHoverContext = createContext<PersonalWebsiteHoverContextType | undefined>(undefined);

export const PersonalWebsiteHoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PersonalWebsiteHoverContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </PersonalWebsiteHoverContext.Provider>
  );
};

export const usePersonalWebsiteHover = () => {
  const context = useContext(PersonalWebsiteHoverContext);
  if (context === undefined) {
    throw new Error('usePersonalWebsiteHover must be used within a PersonalWebsiteHoverProvider');
  }
  return context;
};
