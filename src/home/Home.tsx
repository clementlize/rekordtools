import { Box, Typography } from "@mui/material";
import React from "react";

interface HomeProps { }

const Home: React.FC<HomeProps> = (props) => {

    return (
        <Box>
            <Typography>
                Welcome to RekordTools
            </Typography>
        </Box>
    );
}

export default Home;