"use client"
import React from 'react'
import Grid from '@mui/material/Grid';
import { Container, Box, Button } from '@mui/material';

const Appointment = () => {
    return (
        <div>

            <Container sx={{
                marginTop: 2,
                display: 'inline-block',
                maxWidth: 800,
                maxHeight: 500,
                overflow: 'auto',
                border: 1,
            }} >
                <Grid>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum ante malesuada maximus dignissim. Sed arcu ipsum, sollicitudin pellentesque diam id, dignissim ullamcorper turpis. Mauris tristique sed mauris a maximus. Morbi tincidunt porta nisi, nec euismod lorem finibus at. Nulla nec mi quam. Ut porttitor, orci quis congue iaculis, quam purus rutrum sem, at finibus leo nibh a nunc. Vivamus iaculis placerat velit, ac consequat nisi blandit eu.
                    </p>
                    <p>
                        Curabitur pharetra ornare velit, vel sodales nibh auctor quis. Vivamus lectus libero, fringilla nec urna id, auctor tempor dui. Aliquam dapibus erat sed sapien posuere tincidunt. Aliquam felis diam, rhoncus vitae gravida sed, elementum et nunc. Donec ut condimentum eros, nec finibus quam. Suspendisse porta efficitur turpis at efficitur. Nunc libero diam, vehicula eget eros et, scelerisque scelerisque augue. Praesent nulla urna, tempor dictum ex sed, varius facilisis massa. Donec dignissim sed metus quis cursus. Proin ut tincidunt nulla, eget pharetra felis. Vestibulum quis dignissim nisl, non mattis neque. Pellentesque quis ultrices massa. Etiam vitae porttitor ex.
                    </p>
                    <p>
                        Phasellus in velit pharetra, aliquet nunc vel, ornare erat. Morbi nec est mattis, consequat velit a, efficitur lacus. Curabitur sed orci eu ligula sodales hendrerit nec non augue. Aliquam varius semper magna ut pretium. Cras luctus, ligula ac egestas tempor, odio ipsum placerat orci, eu venenatis libero massa blandit sapien. Pellentesque ac ante ante. Mauris nec erat ac nibh euismod euismod eget vitae justo. Vestibulum tempus interdum turpis. Pellentesque et arcu erat. Aliquam erat volutpat.
                    </p>
                </Grid>

            </Container>
            
        </div>
    )
}

export default Appointment