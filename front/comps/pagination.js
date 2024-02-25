import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import React from "react";
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from "@mui/material";
import {green} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: green,
    },

});
export default function MyPagination(
    {
        pagesCount = 1,
        currentPage = 1
    })
{

    const [page, setPage] = React.useState(currentPage);
    const handleChange = (event, value) => {
        setPage(value);
    };


    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={3}>
                <Pagination
                    count={pagesCount}
                    color={"primary"}
                    shape={"rounded"}
                    variant={"text"}
                    size={"large"}
                    showLastButton
                    siblingCount={2}
                    page={page}
                    onChange={handleChange}

                />
            </Stack>
        </ThemeProvider>
    )
}