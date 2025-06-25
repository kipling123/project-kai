import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Search,
  FilterList,
  DensitySmall,
  FileDownload,
  Add,
  Edit,
  Delete,
  MoreVert,
  Inventory,
  Warehouse,
  LocationOn,
  Numbers,
  Checklist
} from '@mui/icons-material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const MaterialManagement = () => {
  // Data state
  const [materials, setMaterials] = useState([
    { 
      id: 1, 
      name: 'Steel Plate', 
      code: 'MAT-001',
      warehouse: 'Main Warehouse', 
      location: 'A1-02', 
      quantity: 150, 
      threshold: 100,
      status: 'in_stock',
      category: 'Raw Material',
      lastUpdated: '2023-10-15'
    },
    { 
      id: 2, 
      name: 'Rubber Seal', 
      code: 'MAT-002',
      warehouse: 'Secondary Storage', 
      location: 'B3-15', 
      quantity: 320, 
      threshold: 200,
      status: 'in_stock',
      category: 'Component',
      lastUpdated: '2023-10-14'
    },
    { 
      id: 3, 
      name: 'Copper Wire', 
      code: 'MAT-003',
      warehouse: 'Main Warehouse', 
      location: 'A2-10', 
      quantity: 85, 
      threshold: 100,
      status: 'low_stock',
      category: 'Raw Material',
      lastUpdated: '2023-10-16'
    }
  ]);

  // UI state
  const [searchText, setSearchText] = useState('');
  const [density, setDensity] = useState('comfortable');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);

  // Filtered materials
  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchText.toLowerCase()) ||
    material.code.toLowerCase().includes(searchText.toLowerCase()) ||
    material.warehouse.toLowerCase().includes(searchText.toLowerCase())
  );

  // Status chip color
  const getStatusChip = (status) => {
    switch(status) {
      case 'in_stock':
        return <Chip label="In Stock" color="success" size="small" icon={<Checklist fontSize="small" />} />;
      case 'low_stock':
        return <Chip label="Low Stock" color="warning" size="small" icon={<Warning fontSize="small" />} />;
      case 'out_of_stock':
        return <Chip label="Out of Stock" color="error" size="small" icon={<Error fontSize="small" />} />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  // Columns for DataGrid
  const columns = [
    { 
      field: 'code', 
      headerName: 'Material Code', 
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Inventory sx={{ mr: 1, color: 'primary.main' }} />
          {params.value}
        </Box>
      )
    },
    { field: 'name', headerName: 'Material Name', width: 200 },
    { 
      field: 'warehouse', 
      headerName: 'Warehouse', 
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Warehouse sx={{ mr: 1, color: 'text.secondary' }} />
          {params.value}
        </Box>
      )
    },
    { 
      field: 'location', 
      headerName: 'Location', 
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
          {params.value}
        </Box>
      )
    },
    { 
      field: 'quantity', 
      headerName: 'Quantity', 
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Numbers sx={{ mr: 1, color: 'text.secondary' }} />
          {params.value}/{params.row.threshold}
        </Box>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => getStatusChip(params.value)
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(e) => {
          setCurrentMaterial(params.row);
          setAnchorEl(e.currentTarget);
        }}>
          <MoreVert />
        </IconButton>
      )
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Material Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setCurrentMaterial(null);
            setOpenDialog(true);
          }}
          sx={{ 
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            textTransform: 'none'
          }}
        >
          Add Material
        </Button>
      </Box>

      {/* Toolbar */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search materials..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 2, width: 300 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ mr: 1 }}
        >
          Filters
        </Button>
        
        <FormControl size="small" sx={{ mr: 1, width: 120 }}>
          <InputLabel>Density</InputLabel>
          <Select
            value={density}
            onChange={(e) => setDensity(e.target.value)}
            label="Density"
          >
            <MenuItem value="compact">Compact</MenuItem>
            <MenuItem value="standard">Standard</MenuItem>
            <MenuItem value="comfortable">Comfortable</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          variant="outlined"
          startIcon={<FileDownload />}
          sx={{ mr: 1 }}
        >
          Export
        </Button>
      </Paper>

      {/* DataGrid */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredMaterials}
          columns={columns}
          density={density}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: false, // We're using our own search
            },
          }}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'primary.main',
              color: 'white',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
            },
          }}
        />
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          setOpenDialog(true);
          setAnchorEl(null);
        }}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          setMaterials(materials.filter(m => m.id !== currentMaterial.id));
          setAnchorEl(null);
        }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentMaterial ? 'Edit Material' : 'Add New Material'}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 500, pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Material Name"
                value={currentMaterial?.name || ''}
                onChange={(e) => setCurrentMaterial({...currentMaterial, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={currentMaterial?.quantity || ''}
                onChange={(e) => setCurrentMaterial({...currentMaterial, quantity: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Threshold"
                type="number"
                value={currentMaterial?.threshold || ''}
                onChange={(e) => setCurrentMaterial({...currentMaterial, threshold: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Warehouse"
                value={currentMaterial?.warehouse || ''}
                onChange={(e) => setCurrentMaterial({...currentMaterial, warehouse: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={currentMaterial?.location || ''}
                onChange={(e) => setCurrentMaterial({...currentMaterial, location: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              if (currentMaterial?.id) {
                // Update existing
                setMaterials(materials.map(m => 
                  m.id === currentMaterial.id ? currentMaterial : m
                ));
              } else {
                // Add new
                setMaterials([...materials, {
                  ...currentMaterial,
                  id: Math.max(...materials.map(m => m.id)) + 1,
                  code: `MAT-${Math.floor(1000 + Math.random() * 9000)}`,
                  status: 'in_stock',
                  lastUpdated: new Date().toISOString().split('T')[0]
                }]);
              }
              setOpenDialog(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaterialManagement;