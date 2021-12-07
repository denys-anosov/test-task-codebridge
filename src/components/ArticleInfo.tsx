import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  selectedArticle: Article,
}

export const ArticleInfo: React.FC<Props> = ({ selectedArticle }) => {
  return (
    <div>
      {selectedArticle.title}
      <RouterLink
        to="/"
      >
        Back to homepage
      </RouterLink>
    </div>
  );
}