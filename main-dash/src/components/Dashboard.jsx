import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import { DataGrid } from '@mui/x-data-grid';
// import DataTable from './components/dataTable/DataTable';


function Dashboard() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fdf',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (
    <div className='w-full h-screen flex items-center justify-between'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
                <div>Today</div>
            </Item>
          </Grid>
          <Grid item xs={4}>
          <Item>
                <div>Week</div>
            </Item>
          </Grid>
          <Grid item xs={4}>
          <Item>
                <div>Month</div>
            </Item>
          </Grid>
          <Grid item xs={6}>
          <Item>
                <div>Orders</div>
                {/* <DataTable/> */}
          </Item>
          </Grid>
          <Grid item xs={6}>
          <Item>
                <div>Orders</div>
                {/* <DataTable/> */}
          </Item>
          </Grid>
        </Grid>
      </Box>  

    </div>
  )
}

export default Dashboard



