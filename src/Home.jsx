import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import common from './services/common'
import { Link } from 'react-router-dom';


export default function Home() {
    

    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'flexWrap': 'wrap' }}>
            <h1 style={{ width: '100%' }}>My Supermarket
                <h5 style={{ fontSize: '40%' }}>React course Project</h5>
            </h1>

            {common.Links.map(l =>
                <Card sx={{ maxWidth: 500 }} style={{ 'margin': '20px', 'width': '23%' }}>
                    <Link to={l.url}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="70%"
                            image={'/src/assets/' + l.image}
                            alt={l.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="a">
                                {l.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">

                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Link>
                </Card>
            )}
        </div>
    )
}

