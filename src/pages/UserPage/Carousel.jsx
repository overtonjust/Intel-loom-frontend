import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

const data = [
  { 
    src: 'https://unsplash.com/photos/woman-in-black-tank-top-sitting-on-blue-sofa-chair-69wEv-G2W_s',
    youtubeUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
    key: 1,
    // title: 'Night view',
    // description: '4.21M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
    key: 2,
    title: 'Lake view',
    description: '4.74M views',
  },
  {
    src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
    key: 3,
    title: 'Mountain view',
    description: '3.98M views',
  },
];

export default function CarouselRatio() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        width: 500,
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {data.map((item) => (
        <Card orientation="horizontal" size="sm" key={item.key} variant="outlined">
        <AspectRatio ratio="1" sx={{ minWidth: 300 }}>
          {item.youtubeUrl ? (
            <iframe 
              width="500" 
              height="120"
              src={item.youtubeUrl}
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?h=120&fit=crop&auto=format`}
              alt={item.title}
            />
          )}
        </AspectRatio>
        <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
          <Typography level="title-md">{item.title}</Typography>
          <Typography level="body-sm">{item.description}</Typography>
        </Box>
      </Card>
    ))}
  </Box>
 )
};
