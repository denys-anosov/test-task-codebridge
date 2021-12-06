import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { loadArticles } from './api/api';
import { ArticleInfo } from './components/ArticleInfo';
import { ArticleList } from './components/ArticleList';
import './App.scss';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';



function App() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat, sans-serif',
    },
  });

  useEffect(() => {
    loadArticles()
      .then(articlesFromServer => {
        console.log(articlesFromServer);
        setArticles(articlesFromServer);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {articles && <ArticleList articles={articles} />}
        <ArticleInfo />
      </Container>
    </ThemeProvider>
  );
}

export default App;
