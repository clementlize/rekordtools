import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

interface HomeProps { }

const Home: React.FC<HomeProps> = (props) => {

    const [dbPath, setDbPath] = useState<string>();

    window.Main.on("dbPath-response", (data: string) => {

        setDbPath(data);
    })

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={1}
            width={1}
        >

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
            >


                <Typography>
                    Welcome to RekordTools
                </Typography>

                <Typography>
                    {`path: ${dbPath}`}
                </Typography>

                <Button
                    onClick={() => {
                        window.Main.getDbPath();
                    }}
                >
                    Refresh
                </Button>

                <Button
                    onClick={() => {
                        window.Main.openDbPathDialog();
                    }}
                >
                    Change
                </Button>


            </Box>
        </Box>
    );
}

export default Home;