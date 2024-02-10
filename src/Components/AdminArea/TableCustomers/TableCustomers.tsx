import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import errorHandler from "../../../Services/ErrorHandler";
import adminService from "../../../Services/AdminService";
import Customer from "../../../Models/Customer";


// function FetchCustomers(){
//     const [customers, setCustomers] = useState<Customer[]>();
//
//     useEffect(() => {
//         adminService.getCustomers()
//             .then(coup => setCustomers(coup))
//             .catch(err => errorHandler.showError(err));
//
//     }, []);
// }

function createData(
    id:number,
    First_name:string,
    Last_name: string,
    email:string,
    password:string,
) {
    return {
         id,
        First_name,
        Last_name,
        email,
        password,
        
        details: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right">{row.First_name}</TableCell>
                <TableCell align="right">{row.Last_name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">First name</TableCell>
                                        <TableCell align="right">Last name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detailsRow) => (
                                        <TableRow key={detailsRow.date}>
                                            <TableCell component="th" scope="row">
                                                {detailsRow.date}
                                            </TableCell>
                                            <TableCell>{detailsRow.customerId}</TableCell>
                                            <TableCell align="right">{detailsRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {detailsRow.amount}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}




export default function CollapsibleTable() {
    const [rows, setRows] = React.useState<ReturnType<typeof createData>[]>([]);

    // Fetch customers and companies on component mount
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const customers = await adminService.getCustomers();

                // Combine customers and companies into a single array of rows
                const mergedRows = [
                    ...customers.map((customer) =>
                        createData( customer.id, customer.firstName, customer.lastName, customer.email, customer.password)
                    ),
                ];

                setRows(mergedRows);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Invoke the fetchData function on component mount
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                {/* Table header */}
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Type</TableCell>
                        {/* Add more header cells as needed */}
                    </TableRow>
                </TableHead>
                {/* Table body */}
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
