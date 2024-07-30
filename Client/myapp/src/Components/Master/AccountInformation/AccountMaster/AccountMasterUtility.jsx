import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import Pagination from "../../../../Common/UtilityCommon/Pagination";
import SearchBar from "../../../../Common/UtilityCommon/SearchBar";
import PerPageSelect from "../../../../Common/UtilityCommon/PerPageSelect";
import axios from "axios";

const API_URL = process.env.REACT_APP_API;
const companyCode = sessionStorage.getItem('Company_Code');
const Year_Code = sessionStorage.getItem('Year_Code');

function AccountMasterUtility() {
    const [fetchedData, setFetchedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [perPage, setPerPage] = useState(15);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${API_URL}/getdata-accountmaster?Company_Code=${companyCode}`;
                const response = await axios.get(apiUrl);
                if (response.data && response.data.all_data_account_master) {
                    setFetchedData(response.data.all_data_account_master);
                    setFilteredData(response.data.all_data_account_master); 
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = fetchedData.filter(post => {
            const searchTermLower = searchTerm.toLowerCase();
            return Object.keys(post.account_master_data).some(key =>
                String(post.account_master_data[key]).toLowerCase().includes(searchTermLower)
            );
        });
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, fetchedData]);

    const handlePerPageChange = (event) => {
        setPerPage(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchTermChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
    };

    const pageCount = Math.ceil(filteredData.length / perPage);

    const paginatedPosts = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleClick = () => {
        navigate("/account-master");
    };

    const handleRowClick = (Ac_Code) => {
        const selectedRecord = filteredData.find(record => record.account_master_data.Ac_Code === Ac_Code);
        navigate("/account-master", { state: { selectedRecord } });
    };

    const handleSearchClick = () => {
        // Handle search button click if needed
    };

    const handleBack = () => {
        navigate("/DashBoard");
    };

    return (
        <div className="container" style={{ padding: '20px', overflow: 'hidden' }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>
            Account Master
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleClick}>
                        Add
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleBack}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <PerPageSelect value={perPage} onChange={handlePerPageChange} />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ marginLeft: 2 }}>
                    <SearchBar
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        onSearchClick={handleSearchClick}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <TableContainer style={{ maxHeight: '400px' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>A/c Code</TableCell>
                                        <TableCell>A/c Type</TableCell>
                                        <TableCell>A/c Name</TableCell>
                                        <TableCell>Short Name</TableCell>
                                        <TableCell>Commission</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>City Name</TableCell>
                                        <TableCell>State Code</TableCell>
                                        <TableCell>GST No</TableCell>
                                        <TableCell>PAN</TableCell>
                                        <TableCell>FSSAI</TableCell>
                                        <TableCell>Adhar No	</TableCell>
                                        <TableCell>Mobile No</TableCell>
                                        <TableCell>A/c Id</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedPosts.map((post) => (
                                        <TableRow
                                            key={post.account_master_data.Ac_Code}
                                            className="row-item"
                                            style={{ cursor: "pointer" }}
                                            onDoubleClick={() => handleRowClick(post.account_master_data.Ac_Code)}
                                        >
                                            <TableCell>{post.account_master_data.Ac_Code}</TableCell>
                                            <TableCell>{post.account_master_data.Ac_type}</TableCell>
                                            <TableCell>{post.account_master_data.Ac_Name_E}</TableCell>
                                            <TableCell>{post.account_master_data.Short_Name}</TableCell>
                                            <TableCell>{post.account_master_data.Ac_rate}</TableCell>
                                            <TableCell>{post.account_master_data.Address_E}</TableCell>
                                            <TableCell>{post.account_labels.cityname}</TableCell>
                                            <TableCell>{post.account_master_data.GSTStateCode}</TableCell>
                                            <TableCell>{post.account_master_data.Gst_No}</TableCell>
                                            <TableCell>{post.account_master_data.PanLink}</TableCell>
                                            <TableCell>{post.account_master_data.FSSAI}</TableCell>
                                            <TableCell>{post.account_master_data.adhar_no}</TableCell>
                                            <TableCell>{post.account_master_data.Mobile_No}</TableCell>
                                            <TableCell>{post.account_master_data.accoid}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Pagination
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default AccountMasterUtility;