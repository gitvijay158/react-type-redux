// src/components/MainContent.tsx
import React from 'react';

interface MainContentProps {
  content: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ content }) => {
  return (
    <div className="flex-grow-1 p-3">
      {content}
    </div>
  );
};

export default MainContent;
