import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

interface HomeProps { }

const Home: React.FC<HomeProps> = (props) => {

    const [rekordboxSettingsPath, setRekordboxSettingsPath] = useState<string>();

    window.Main.on("rekordboxSettingsPath-response", (data: string) => {

        setRekordboxSettingsPath(data);
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


            </Box>
        </Box>
    );
}

export default Home;