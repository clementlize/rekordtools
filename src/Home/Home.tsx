import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface HomeProps { }

const Home: React.FC<HomeProps> = (props) => {

    const [rekordboxSettingsPath, setRekordboxSettingsPath] = useState<string>();

    window.Main.on("rekordboxSettingsPath-response", (data: string) => {
        setRekordboxSettingsPath(data);
    });

    window.Main.on("readDb-response", (data: string) => {
        console.log(data);
    });

    // Wait 1s and refresh the options path, in case it's been set by the back-end automatically
    useEffect(() => {
        setTimeout(() => {
            window.Main.getRekordboxSettingsPath();
        }, 1000);
    });

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
                    {`path: ${rekordboxSettingsPath}`}
                </Typography>

                <Button
                    onClick={() => {
                        window.Main.getRekordboxSettingsPath();
                    }}
                >
                    Refresh
                </Button>

                <Button
                    onClick={() => {
                        window.Main.openRekordboxSettingsPathDialog();
                    }}
                >
                    Change
                </Button>

                <Button
                    onClick={() => {
                        window.Main.readDb();
                    }}
                >
                    Read DB
                </Button>

            </Box>
        </Box>
    );
}

export default Home;