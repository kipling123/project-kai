import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  Chip,
  MenuItem,
  Select,
  InputAdornment
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  FileDownload,
  Edit,
  Delete,
  Refresh,
  Warehouse,
  Engineering,
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const Machines = () => {
  // Data contoh mesin
  const [machines, setMachines] = useState([
    {
      id: 1,
      name: 'CNC Cutting Pro',
      type: 'Pemotong Rel',
      status: 'active',
      location: 'Workshop Jakarta',
      lastMaintenance: '2023-10-15',
      nextMaintenance: '2023-12-15',
      capacity: '120 unit/hari'
    },
    {
      id: 2,
      name: 'Hydraulic Press X9',
      type: 'Pembentuk Rel',
      status: 'maintenance',
      location: 'Workshop Bandung',
      lastMaintenance: '2023-09-20',
      nextMaintenance: '2023-11-20',
      capacity: '80 unit/hari'
    },
    {
      id: 3,
      name: 'Auto Welder 5000',
      type: 'Penyambung Rel',
      status: 'inactive',
      location: 'Workshop Surabaya',
      lastMaintenance: '2023-08-10',
      nextMaintenance: '2023-10-10',
      capacity: '150 unit/hari'
    }
  ]);

  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  const [density, setDensity] = useState('comfortable');

  // Kolom untuk DataGrid
  const columns = [
    { 
      field: 'name', 
      headerName: 'Nama Mesin', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Engineering sx={{ mr: 1, color: 'primary.main' }} />
          {params.value}
        </Box>
      )
    },
    { field: 'type', headerName: 'Tipe Mesin', width: 150 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value === 'active' ? 'Aktif' : 
                 params.value === 'maintenance' ? 'Maintenance' : 'Nonaktif'}
          color={params.value === 'active' ? 'success' : 
                 params.value === 'maintenance' ? 'warning' : 'error'}
          icon={params.value === 'active' ? <CheckCircle fontSize="small" /> : 
                params.value === 'maintenance' ? <Warning fontSize="small" /> : <Error fontSize="small" />}
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      )
    },
    { 
      field: 'location', 
      headerName: 'Lokasi', 
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Warehouse sx={{ mr: 1, color: 'text.secondary' }} />
          {params.value}
        </Box>
      )
    },
    { field: 'capacity', headerName: 'Kapasitas', width: 150 },
    { field: 'lastMaintenance', headerName: 'Maintenance Terakhir', width: 200 },
    { field: 'nextMaintenance', headerName: 'Maintenance Berikutnya', width: 200 },
    {
      field: 'actions',
      headerName: 'Aksi',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" size="small">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton color="error" size="small">
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Manajemen Mesin Produksi
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ 
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            textTransform: 'none'
          }}
        >
          Tambah Mesin
        </Button>
      </Box>

      {/* Toolbar */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Cari mesin..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 2, width: 300 }}
        />
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ mr: 1 }}
        >
          Filter
        </Button>
        
        <Select
          value={density}
          onChange={(e) => setDensity(e.target.value)}
          size="small"
          sx={{ mr: 1, width: 120 }}
        >
          <MenuItem value="compact">Compact</MenuItem>
          <MenuItem value="standard">Standard</MenuItem>
          <MenuItem value="comfortable">Comfortable</MenuItem>
        </Select>
        
        <Button
          variant="outlined"
          startIcon={<FileDownload />}
          sx={{ mr: 1 }}
        >
          Export
        </Button>
        
        <IconButton>
          <Refresh />
        </IconButton>
      </Paper>

      {/* DataGrid */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={machines}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50, 100]}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          density={density}
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'primary.main',
              color: 'white',
              fontSize: 14,
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Machines;