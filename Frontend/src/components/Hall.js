// import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Hall.css';

// const images = [
//     {
//         title: 'Vankatraman Hall',
//         url: 'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-33.jpg',
//         link: '/vankatraman-hall', // Ensure this route is set up in your router
//     },
//     {
//         title: 'ES Seminar Hall',
//         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJgihtMeh6EpUSjcPq89Rc0UsIvRUHA4J-9Q&s',
//         link: '/es-seminar-hall', // Add appropriate route
//     },
//     {
//         title: 'PG Seminar Hall',
//         url: 'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-25.jpg',
//         link: '/pg-seminar-hall', // Add appropriate route
//     },
//     {
//         title: 'Open Air Theatre',
//         url: 'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-16.jpg',
//         link: '/open-air-theatre', // Add appropriate route
//     },
//     {
//         title: 'CB1',
//         url: 'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-3.jpg',
//         link: '/cb1', // Add appropriate route
//     },
//     {
//         title: 'CB2',
//         url: 'https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-28.jpg',
//         link: '/cb2', // Add appropriate route
//     },
// ];

// const Hall = () => {
//     const navigate = useNavigate();

//     const handleCardClick = (link) => {
//         if (link) {
//             navigate(link);
//         }
//     };

//     return (
//         <Box className="page2-container">
//             <Typography variant="h3" component="h1" align="center" className="page2-heading">
//                 <b>Halls available in SKCT</b> 
//             </Typography>
//             <Grid container spacing={4} justifyContent="center" className="page2-grid">
//                 {images.map((image, index) => (
//                     <Grid item key={index} xs={12} sm={6} md={4} lg={3} className="page2-grid-item">
//                         <Card 
//                             className="page2-card" 
//                             onClick={() => handleCardClick(image.link)}
//                             style={{ cursor: image.link ? 'pointer' : 'default' }}
//                         >
//                             <CardMedia
//                                 component="img"
//                                 height="200"
//                                 image={image.url}
//                                 alt={image.title}
//                                 className="page2-card-media"
//                             />
//                             <CardContent>
//                                 <Typography variant="h6" component="div" className="page2-card-title">
//                                     {image.title}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// };

// export default Hall;
