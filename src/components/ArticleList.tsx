import { CardContent, InputAdornment, Link, TextField, Typography } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import React, { useState } from 'react';
import './ArticleList.scss';

interface Props {
  articles: Article[] | null,
}

export const ArticleList: React.FC<Props> = ({ articles }) => {
  const [query, setQuery] = useState('');

  const dateConverter = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  const getVisibleSummary = (summary: string) => {
    return summary.slice(0, 101) + '...';
  }

  const handleFilter = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {value} = event.target;
    setQuery(value);
  }

  const getVisibleArticles = (articles: Article[] | null, query: string) => {
    if (articles) {
      return articles
        .filter(article => article.title.toLowerCase().includes(query.toLowerCase())
          || article.summary.toLowerCase().includes(query.toLowerCase()));
    }
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
            sx={{ fontSize: '16px', color: '#575757', border: '1px solid #eaeaea', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)', borderRadius: '5px', mb: '40px'}}
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
      <Typography sx={{mb: '45px', fontSize: '16px', fontWeight: '600', color: '#363636', borderBottom: '1px solid #eaeaea'}}>
        Results: {visibleArticles && visibleArticles.length}
      </Typography>
      <Grid container spacing={3}>
        {visibleArticles && visibleArticles.map(visibleArticle => (
          <Grid item xs={12} md={4} key={visibleArticle.id}>
            <Card sx={{ border: '1px solid #eaeaea', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)', borderRadius: '5px' }}>
              <CardMedia
                component="img"
                height="217px"
                image={`${visibleArticle.imageUrl}`}
                alt="article poster"
                sx={{ mb: "8px" }}
              />
              <CardContent>
                <div className="flc">
                  <div>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        display: 'flex',
                        opacity: 0.6,
                        fontSize: '14px',
                        mb: '24px',
                        color: '#363636',
                      }}>
                      <CalendarTodayRoundedIcon sx={{ pr: 1 }} />
                      {dateConverter(visibleArticle.publishedAt)}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontSize: '24px', mb: '20px', color: '#363636' }}>
                      {visibleArticle.title}
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ fontSize: '16px', mb: '20px', color: '#363636' }}>
                      {getVisibleSummary(visibleArticle.summary)}
                    </Typography>
                  </div>
                  <div>
                    <Typography>
                      <Link href='#' sx={{ fontSize: '16px', fontWeight: 'bold', color: '#363636', textDecoration: 'none', mr: '6px' }}>
                        Read More
                        {' '}
                        <span>
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66829 0.162658C6.45593 0.379657 6.45593 0.730251 6.66975 0.945773L9.09665 3.39845L9.15268 3.448C9.36701 3.61309 9.6729 3.59589 9.86756 3.39698C9.97375 3.28848 10.0268 3.1475 10.0268 3.00653C10.0268 2.86407 9.97375 2.72236 9.86611 2.61386L7.43993 0.161182L7.38388 0.111806C7.16946 -0.0527212 6.86296 -0.0355811 6.66829 0.162658ZM0.477064 4.45064C0.208215 4.48481 0 4.71782 0 4.99989C0 5.30546 0.244364 5.55346 0.545455 5.55346H10.1338L6.66982 9.05423L6.62082 9.11077C6.45747 9.32725 6.4737 9.63843 6.66836 9.83734C6.88073 10.0536 7.22618 10.0543 7.43927 9.83882L11.8393 5.39182L11.8878 5.33613C11.9616 5.23874 12 5.11983 12 4.99989C12 4.92829 11.9862 4.8567 11.9585 4.78879C11.8742 4.58139 11.6756 4.44632 11.4545 4.44632H0.545455L0.477064 4.45064Z" fill="#363636" />
                          </svg>
                        </span>
                      </Link>
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}