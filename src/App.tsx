import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { loadArticles } from './api/api';
import { ArticleInfo } from './components/ArticleInfo/ArticleInfo';
import { ArticleList } from './components/ArticleList/ArticleList';
import './App.scss';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Navigate, Route, Routes } from 'react-router-dom';



function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article>({} as Article);

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

  const getArticleById = (passedId: number) => {
    const foundArticle = articles.find(article => article.id === passedId);

    if (foundArticle) {
      setSelectedArticle(foundArticle);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{pt: "20px"}}>
        <Routes>
          <Route
            path="/"
            element={
              <ArticleList
                articles={articles}
                findArticle={getArticleById}
              />
            }
          />
          <Route
            path="/article-info"
            element={<ArticleInfo selectedArticle={selectedArticle} />}
          />
          <Route 
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
