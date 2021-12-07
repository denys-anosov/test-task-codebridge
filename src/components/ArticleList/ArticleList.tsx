import { InputAdornment, TextField, Typography } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Grid from '@mui/material/Grid';

import React, { useState } from 'react';
import { ArticleCard } from '../ArticleCard/ArticleCard';

interface Props {
  articles: Article[],
  findArticle: (passedId: number) => void,
}

type EventType = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export const ArticleList: React.FC<Props> = ({ articles, findArticle }) => {
  const [query, setQuery] = useState('');

  const handleFilter = (event: EventType) => {
    const { value } = event.target;
    setQuery(value);
  }

  const getVisibleArticles = (articles: Article[], query: string) => {
    return articles
      .filter(article => article.title.toLowerCase().includes(query.toLowerCase())
        || article.summary.toLowerCase().includes(query.toLowerCase()));
  }

  const visibleArticles = getVisibleArticles(articles, query);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ fontSize: '16px', fontWeight: '600', mb: '10px', color: '#363636' }}
          >
            Filter by keywords
          </Typography>

          <TextField
            variant="outlined"
            fullWidth
            sx={{
              fontSize: '16px',
              color: '#575757',
              border: '1px solid #eaeaea',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
              borderRadius: '5px', mb: '40px' 
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            value={query}
            onChange={handleFilter}
          />
        </Grid>
      </Grid>

      <Typography
        sx={{
          mb: '45px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#363636',
          borderBottom: '1px solid #eaeaea' 
        }}>
        Results: {visibleArticles.length}
      </Typography>

      <Grid container spacing={3}>
        <ArticleCard
          visibleArticles={visibleArticles}
          findArticle={findArticle}
        />
      </Grid>
    </div>
  );
}