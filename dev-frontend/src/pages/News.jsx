import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Divider,
} from '@mui/material';

import { news_articles } from '../constant/index';

const NewsArticleCard = ({ article }) => (
  <Card sx={{ width: 345, height: 400, margin: 'auto' }}>
    <CardActionArea href={article.url} target="_blank" rel="noopener noreferrer">
      <CardMedia
        component="img"
        height="200"
        image={article.image}
        alt={article.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.body.length > 100 ? article.body.substring(0, 100) + '...' : article.body}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {article.dateTimePub.substring(0, 10)}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Source: {article.source.title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const NewsScreen = () => (
  <Container sx={{ py: 4, marginTop:10 }}>
    <Typography variant="h4" component="h1" gutterBottom align="center" style={{ paddingBottom: '40px', paddingTop: '10px' }}>
      <strong>Latest News</strong>
    </Typography>
    <Grid container spacing={4}>
      {news_articles.map((article) => (
        <Grid item key={article.id} xs={12} sm={6} md={4}>
          <NewsArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default NewsScreen;
