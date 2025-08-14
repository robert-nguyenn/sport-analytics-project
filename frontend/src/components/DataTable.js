import * as React from 'react';
import { 
  Box, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, TablePagination, Typography, Toolbar,
  InputAdornment, TextField, IconButton, Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TableViewIcon from '@mui/icons-material/TableView';
// import removed: use dynamic data from props or API

const DataTable = ({ rows, columns }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchText, setSearchText] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState([]);
  
  // Check if data is mostly "Unknown" and use sample data instead
  const hasValidData = React.useMemo(() => {
    if (!rows || !rows.length) return false;
    
    // Count how many "Unknown" values we have
    let unknownCount = 0;
    let totalFields = 0;
    
    rows.forEach(row => {
      Object.values(row).forEach(value => {
        totalFields++;
        if (value === "Unknown" || value === undefined || value === null || value === "") {
          unknownCount++;
        }
      });
    });
    
    // If more than 70% of values are "Unknown", consider the data invalid
    return (unknownCount / totalFields) < 0.7;
  }, [rows]);
  
  // Use sample data if real data isn't valid
  const effectiveRows = React.useMemo(() => {
    return hasValidData && rows && rows.length ? rows : sampleMatchData.preview.map((row, i) => ({ id: i, ...row }));
  }, [rows, hasValidData]);
  
  // Use sample columns if real columns aren't valid
  const effectiveColumns = React.useMemo(() => {
    if (hasValidData && columns && columns.length) {
      return columns;
    } else if (sampleMatchData.preview && sampleMatchData.preview.length) {
      return Object.keys(sampleMatchData.preview[0])
        .filter(col => col !== 'id')
        .map(col => ({ 
          field: col, 
          headerName: col.replace(/_/g, ' '), 
          flex: 1, 
          minWidth: 120 
        }));
    }
    return [];
  }, [columns, hasValidData]);

  React.useEffect(() => {
    if (!effectiveRows) {
      setFilteredRows([]);
      return;
    }
    
    if (searchText.trim() === '') {
      setFilteredRows(effectiveRows);
    } else {
      const filtered = effectiveRows.filter(row => {
        return Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredRows(filtered);
      setPage(0);
    }
  }, [searchText, effectiveRows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  // Show sample data notice if using fallback data
  const DataSourceNotice = !hasValidData && (
    <Box sx={{ 
      backgroundColor: 'info.light', 
      color: 'info.contrastText',
      px: 2,
      py: 1,
      borderRadius: 1,
      mb: 2,
      display: 'flex',
      alignItems: 'center'
    }}>
      <Typography variant="body2">
        <strong>Note:</strong> Showing sample data for demonstration purposes. The actual data contains too many unknown values.
      </Typography>
    </Box>
  );

  // Avoid rendering if no data
  if (!effectiveRows || !effectiveRows.length || !effectiveColumns || !effectiveColumns.length) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          mb: 4, 
          p: 3,
          textAlign: 'center',
          borderRadius: 2
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No data available to display
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: '100%', 
        mb: 4, 
        overflow: 'hidden',
        borderRadius: 2
      }}
    >
      <Toolbar sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TableViewIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Data Preview
          </Typography>
          <Chip 
            label={`${effectiveRows.length} rows`} 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ ml: 2 }}
          />
        </Box>
        
        <TextField
          placeholder="Search data..."
          value={searchText}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{ minWidth: 250 }}
        />
      </Toolbar>
      
      {DataSourceNotice}
      
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow>
              {effectiveColumns.map((column) => (
                <TableCell
                  key={column.field}
                  align="left"
                  sx={{ 
                    fontWeight: 'bold',
                    backgroundColor: theme => theme.palette.mode === 'dark' 
                      ? theme.palette.grey[800] 
                      : theme.palette.grey[100]
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(filteredRows && filteredRows.length > 0)
              ? filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow 
                      hover 
                      tabIndex={-1} 
                      key={row.id || index}
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: theme => theme.palette.mode === 'dark' 
                            ? theme.palette.grey[900] 
                            : theme.palette.grey[50]
                        }
                      }}
                    >
                      {effectiveColumns.map((column) => {
                        const value = row[column.field];
                        return (
                          <TableCell key={column.field} align="left" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {value !== undefined ? String(value) : ''}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              : (
                <TableRow>
                  <TableCell colSpan={effectiveColumns.length} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No matching records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={filteredRows ? filteredRows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;