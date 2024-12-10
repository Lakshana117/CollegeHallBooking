import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import './Events.css';

const events = [
  {
    name: 'Tech Symposium',
    description: 'A symposium on the latest in technology and innovation.',
    date: 'September 10, 2024',
    time: '10:00 AM - 4:00 PM',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3DNasCvfOLMIxJyQtbNq7EfLkWnMazHE9xw&s'
  },
  {
    name: 'Art Exhibition',
    description: 'An exhibition showcasing the works of local artists.',
    date: 'September 15, 2024',
    time: '11:00 AM - 6:00 PM',
    image: 'https://mrwallpaper.com/images/high/your-name-anime-digital-art-179tb5mna7wol4k6.jpg'
  },
  {
    name: 'Music Fest',
    description: 'A music festival featuring various genres and artists.',
    date: 'September 20, 2024',
    time: '2:00 PM - 10:00 PM',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT22a49PwIQVYnzw1glhYnmscE-bafrTRgwnQ&s'
  },
  {
    name: 'Science Fair',
    description: 'Showcasing innovative projects and experiments.',
    date: 'October 5, 2024',
    time: '9:00 AM - 5:00 PM',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyEe5autNkbQAtHDYQcqbbKpcQ1ncRKAkG3w&s'
  },
  {
    name: 'Literature Workshop',
    description: 'A workshop for aspiring writers and literature enthusiasts.',
    date: 'October 10, 2024',
    time: '10:00 AM - 3:00 PM',
    image: 'https://img.freepik.com/premium-photo/workshop-event-meeting-business-event-training-developrer-seminars-management_327072-19899.jpg'
  },
  {
    name: 'Health Seminar',
    description: 'A seminar on the latest trends in health and wellness.',
    date: 'October 15, 2024',
    time: '1:00 PM - 4:00 PM',
    image: 'https://img.freepik.com/free-photo/corporate-businessman-giving-presentation-large-audience_53876-101865.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1723075200&semt=ais_hybrid'
  },
  {
    name: 'Career Fair',
    description: 'An opportunity to meet with top companies and explore career options.',
    date: 'November 1, 2024',
    time: '10:00 AM - 4:00 PM',
    image: 'https://png.pngtree.com/thumb_back/fh260/background/20220917/pngtree-different-career-paths-spanner-fair-hair-cheerful-photo-image_9358508.jpg'
  },
  {
    name: 'Sports Day',
    description: 'A day filled with sports activities and competitions.',
    date: 'December 1, 2024',
    time: '9:00 AM - 6:00 PM',
    image: 'https://www.thegaudium.com/wp-content/uploads/2020/01/The_Gaudium_international_School_Hyderabad_Annual_Sports_Day_Senior_2020-29.jpg'
  }
];

const Events = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" className="event-heading" gutterBottom>Upcoming Events</Typography>
      <div className="full-width-line"></div> {/* Full-width line */}
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="event-card" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                alt={event.name}
                height="200"
                image={event.image}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent className="card-content" sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{event.name}</Typography>
                <Typography variant="body2" color="text.secondary">{event.description}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {event.date} - {event.time}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


export default Events;
