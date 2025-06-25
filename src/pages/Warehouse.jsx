import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Save, Print, Delete, Add, Edit, Build, Settings } from '@mui/icons-material';

// Data produksi yang disesuaikan
const initialProductionData = [
  {
    id: 1,
    name: "Produksi Radio Lokomotif",
    progress: 0,
    location: "Gudang SAB",
    materials: [],
    target: 100,
    completed: 0,
    type: "produksi"
  },
  {
    id: 2,
    name: "Produksi Way Station",
    progress: 0,
    location: "Ruang LAA",
    materials: [],
    target: 80,
    completed: 0,
    type: "produksi"
  },
  {
    id: 3,
    name: "Overhaul Point Machine A12",
    progress: 0,
    location: "Stasiun Gambir",
    materials: [],
    target: 1,
    completed: 0,
    type: "overhaul",
    machineType: "Electroswitch",
    lastMaintenance: "2023-05-15",
    nextMaintenance: "2024-05-15"
  },
  {
    id: 4,
    name: "Overhaul Point Machine B05",
    progress: 0,
    location: "Stasiun Bandung",
    materials: [],
    target: 1,
    completed: 0,
    type: "overhaul",
    machineType: "VCC",
    lastMaintenance: "2023-06-20",
    nextMaintenance: "2024-06-20"
  }
];

// Kolom untuk DataGrid
const productionColumns = [
  { 
    field: 'name', 
    headerName: 'Proyek Produksi', 
    width: 250,
    renderCell: (params) => (
      <Box>
        <Typography sx={{ fontWeight: 'medium' }}>{params.row.name}</Typography>
        {params.row.type === "overhaul" && (
          <Chip 
            label="Overhaul" 
            size="small" 
            color="secondary"
            sx={{ ml: 1, fontSize: '0.6rem', height: 20 }}
          />
        )}
      </Box>
    )
  },
  { 
    field: 'location', 
    headerName: 'Lokasi', 
    width: 150 
  },
  { 
    field: 'progress', 
    headerName: 'Progress', 
    width: 200,
    renderCell: (params) => (
      <Box sx={{ width: '100%' }}>
        <LinearProgress 
          variant="determinate" 
          value={params.row.progress} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: params.row.progress > 70 ? '#4caf50' : 
                             params.row.progress > 40 ? '#ff9800' : '#f44336',
              borderRadius: 5
            }
          }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {params.row.progress}% ({params.row.completed}/{params.row.target})
        </Typography>
      </Box>
    )
  },
  { 
    field: 'materials', 
    headerName: 'Material', 
    width: 200, 
    renderCell: (params) => (
      <Box sx={{ fontSize: '0.875rem' }}>
        {params.row.materials.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {params.row.materials.map((mat, idx) => (
              <li key={idx}>{mat}</li>
            ))}
          </ul>
        ) : (
          <Typography color="text.secondary">Belum ada material</Typography>
        )}
      </Box>
    )
  },
  {
    field: 'actions',
    headerName: 'Aksi',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <IconButton 
        onClick={() => handleEditClick(params.row)}
        color="primary"
        size="small"
      >
        <Edit fontSize="small" />
      </IconButton>
    )
  }
];

// Kolom khusus untuk Overhaul
const overhaulColumns = [
  { 
    field: 'name', 
    headerName: 'Nama Mesin', 
    width: 200,
    renderCell: (params) => (
      <Typography sx={{ fontWeight: 'medium' }}>{params.row.name}</Typography>
    )
  },
  { 
    field: 'machineType', 
    headerName: 'Tipe Mesin', 
    width: 150 
  },
  { 
    field: 'location', 
    headerName: 'Lokasi', 
    width: 150 
  },
  { 
    field: 'lastMaintenance', 
    headerName: 'Maintenance Terakhir', 
    width: 150 
  },
  { 
    field: 'nextMaintenance', 
    headerName: 'Maintenance Berikutnya', 
    width: 150 
  },
  { 
    field: 'progress', 
    headerName: 'Progress', 
    width: 200,
    renderCell: (params) => (
      <Box sx={{ width: '100%' }}>
        <LinearProgress 
          variant="determinate" 
          value={params.row.progress} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: params.row.progress > 70 ? '#4caf50' : 
                             params.row.progress > 40 ? '#ff9800' : '#f44336',
              borderRadius: 5
            }
          }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {params.row.progress}% ({params.row.completed}/{params.row.target})
        </Typography>
      </Box>
    )
  },
  {
    field: 'actions',
    headerName: 'Aksi',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <IconButton 
        onClick={() => handleEditClick(params.row)}
        color="primary"
        size="small"
      >
        <Edit fontSize="small" />
      </IconButton>
    )
  }
];

export default function Warehouse() {
  const [productionData, setProductionData] = useState(initialProductionData);
  const [selectedProject, setSelectedProject] = useState('');
  const [materialInput, setMaterialInput] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openOverhaulDialog, setOpenOverhaulDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    id: 0,
    name: '',
    location: '',
    target: 0,
    type: "produksi"
  });
  const [currentOverhaul, setCurrentOverhaul] = useState({
    id: 0,
    name: '',
    location: '',
    machineType: '',
    lastMaintenance: '',
    nextMaintenance: '',
    target: 1,
    type: "overhaul"
  });
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Fungsi untuk membuka dialog tambah proyek produksi
  const handleClickOpen = () => {
    setOpenDialog(true);
    setEditMode(false);
    setCurrentProject({
      id: 0,
      name: '',
      location: '',
      target: 0,
      type: "produksi"
    });
  };

  // Fungsi untuk membuka dialog tambah overhaul
  const handleClickOpenOverhaul = () => {
    setOpenOverhaulDialog(true);
    setEditMode(false);
    setCurrentOverhaul({
      id: 0,
      name: '',
      location: '',
      machineType: '',
      lastMaintenance: '',
      nextMaintenance: '',
      target: 1,
      type: "overhaul"
    });
  };

  // Fungsi untuk membuka dialog edit proyek
  const handleEditClick = (project) => {
    if (project.type === "overhaul") {
      setOpenOverhaulDialog(true);
      setEditMode(true);
      setCurrentOverhaul({
        id: project.id,
        name: project.name,
        location: project.location,
        machineType: project.machineType,
        lastMaintenance: project.lastMaintenance,
        nextMaintenance: project.nextMaintenance,
        target: project.target,
        type: "overhaul"
      });
    } else {
      setOpenDialog(true);
      setEditMode(true);
      setCurrentProject({
        id: project.id,
        name: project.name,
        location: project.location,
        target: project.target,
        type: "produksi"
      });
    }
  };

  // Fungsi untuk menutup dialog
  const handleClose = () => {
    setOpenDialog(false);
    setOpenOverhaulDialog(false);
  };

  // Fungsi untuk menyimpan proyek produksi baru atau perubahan
  const handleSaveProject = () => {
    if (!currentProject.name || !currentProject.location || currentProject.target <= 0) {
      return;
    }

    if (editMode) {
      // Update proyek yang ada
      const updatedData = productionData.map(item => {
        if (item.id === currentProject.id) {
          const progress = Math.round((item.completed / currentProject.target) * 100);
          return {
            ...item,
            name: currentProject.name,
            location: currentProject.location,
            target: currentProject.target,
            progress: progress
          };
        }
        return item;
      });
      setProductionData(updatedData);
    } else {
      // Tambah proyek baru
      const newId = Math.max(...productionData.map(item => item.id)) + 1;
      const newProject = {
        id: newId,
        name: currentProject.name,
        progress: 0,
        location: currentProject.location,
        materials: [],
        target: currentProject.target,
        completed: 0,
        type: "produksi"
      };
      setProductionData([...productionData, newProject]);
    }

    handleClose();
  };

  // Fungsi untuk menyimpan overhaul baru atau perubahan
  const handleSaveOverhaul = () => {
    if (!currentOverhaul.name || !currentOverhaul.location || !currentOverhaul.machineType || 
        !currentOverhaul.lastMaintenance || !currentOverhaul.nextMaintenance) {
      return;
    }

    if (editMode) {
      // Update overhaul yang ada
      const updatedData = productionData.map(item => {
        if (item.id === currentOverhaul.id) {
          const progress = Math.round((item.completed / currentOverhaul.target) * 100);
          return {
            ...item,
            name: currentOverhaul.name,
            location: currentOverhaul.location,
            machineType: currentOverhaul.machineType,
            lastMaintenance: currentOverhaul.lastMaintenance,
            nextMaintenance: currentOverhaul.nextMaintenance,
            progress: progress
          };
        }
        return item;
      });
      setProductionData(updatedData);
    } else {
      // Tambah overhaul baru
      const newId = Math.max(...productionData.map(item => item.id)) + 1;
      const newOverhaul = {
        id: newId,
        name: currentOverhaul.name,
        progress: 0,
        location: currentOverhaul.location,
        machineType: currentOverhaul.machineType,
        lastMaintenance: currentOverhaul.lastMaintenance,
        nextMaintenance: currentOverhaul.nextMaintenance,
        materials: [],
        target: 1,
        completed: 0,
        type: "overhaul"
      };
      setProductionData([...productionData, newOverhaul]);
    }

    handleClose();
  };

  const handleAddMaterial = () => {
    if (!selectedProject || !materialInput) return;
    
    const updatedData = productionData.map(item => {
      if (item.id === selectedProject) {
        const newMaterials = [...item.materials, `${materialInput} (x${quantity})`];
        const newCompleted = Math.min(item.completed + quantity, item.target);
        const newProgress = Math.round((newCompleted / item.target) * 100);
        
        return {
          ...item,
          materials: newMaterials,
          completed: newCompleted,
          progress: newProgress
        };
      }
      return item;
    });
    
    setProductionData(updatedData);
    setMaterialInput('');
    setQuantity(1);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) return;
    
    const updatedData = productionData.filter(item => !selectedRows.includes(item.id));
    setProductionData(updatedData);
    setSelectedRows([]);
  };

  // Filter data berdasarkan jenis proyek
  const productionProjects = productionData.filter(item => item.type === "produksi");
  const overhaulProjects = productionData.filter(item => item.type === "overhaul");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#333', fontWeight: 'bold' }}>
        Sistem Manajemen Produksi & Overhaul
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Produksi" />
        <Tab label="Overhaul Point Machine" />
      </Tabs>
      
      {tabValue === 0 ? (
        <Grid container spacing={3}>
          {/* Form Input Material */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Input Material Produksi
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Pilih Proyek</InputLabel>
                  <Select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    label="Pilih Proyek"
                    required
                  >
                    <MenuItem value="" disabled>
                      <em>Pilih proyek</em>
                    </MenuItem>
                    {productionProjects.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  label="Nama Material"
                  value={materialInput}
                  onChange={(e) => setMaterialInput(e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
                
                <TextField
                  fullWidth
                  type="number"
                  label="Jumlah"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  sx={{ mb: 2 }}
                  inputProps={{ min: 1 }}
                />
                
                <Button 
                  variant="contained" 
                  startIcon={<Save />}
                  onClick={handleAddMaterial}
                  fullWidth
                  disabled={!selectedProject || !materialInput}
                  sx={{
                    backgroundColor: '#FF8C00',
                    '&:hover': { backgroundColor: '#FF6D00' }
                  }}
                >
                  Tambahkan Material
                </Button>
              </CardContent>
            </Card>
            
            <Card sx={{ mt: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Aksi Batch
                </Typography>
                
                <Button 
                  variant="outlined" 
                  startIcon={<Delete />}
                  onClick={handleDeleteSelected}
                  fullWidth
                  disabled={selectedRows.length === 0}
                  color="error"
                  sx={{ mb: 1 }}
                >
                  Hapus Proyek Terpilih
                </Button>
                
                <Button 
                  variant="outlined" 
                  startIcon={<Print />}
                  fullWidth
                  onClick={() => window.print()}
                  sx={{ mb: 1 }}
                >
                  Cetak Laporan
                </Button>
                
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={handleClickOpen}
                  fullWidth
                  sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': { backgroundColor: '#388E3C' }
                  }}
                >
                  Tambah Proyek Baru
                </Button>
                
                <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center' }}>
                  {selectedRows.length} proyek terpilih
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Daftar Proyek Produksi */}
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Tracking Produksi
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Update terakhir: {new Date().toLocaleString()}
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ height: 500, width: '100%' }}>
                  <DataGrid
                    rows={productionProjects}
                    columns={productionColumns}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
                    rowSelectionModel={selectedRows}
                    disableRowSelectionOnClick
                    sx={{
                      '& .MuiDataGrid-cell': {
                        py: 1.5,
                      },
                      '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold'
                      },
                      '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(255, 140, 0, 0.08)'
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {/* Form Input Overhaul */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Input Material Overhaul
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Pilih Point Machine</InputLabel>
                  <Select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    label="Pilih Point Machine"
                    required
                  >
                    <MenuItem value="" disabled>
                      <em>Pilih mesin</em>
                    </MenuItem>
                    {overhaulProjects.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  label="Nama Material"
                  value={materialInput}
                  onChange={(e) => setMaterialInput(e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
                
                <TextField
                  fullWidth
                  type="number"
                  label="Jumlah"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  sx={{ mb: 2 }}
                  inputProps={{ min: 1 }}
                />
                
                <Button 
                  variant="contained" 
                  startIcon={<Save />}
                  onClick={handleAddMaterial}
                  fullWidth
                  disabled={!selectedProject || !materialInput}
                  sx={{
                    backgroundColor: '#FF8C00',
                    '&:hover': { backgroundColor: '#FF6D00' }
                  }}
                >
                  Tambahkan Material
                </Button>
              </CardContent>
            </Card>
            
            <Card sx={{ mt: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Aksi Batch
                </Typography>
                
                <Button 
                  variant="outlined" 
                  startIcon={<Delete />}
                  onClick={handleDeleteSelected}
                  fullWidth
                  disabled={selectedRows.length === 0}
                  color="error"
                  sx={{ mb: 1 }}
                >
                  Hapus Overhaul Terpilih
                </Button>
                
                <Button 
                  variant="outlined" 
                  startIcon={<Print />}
                  fullWidth
                  onClick={() => window.print()}
                  sx={{ mb: 1 }}
                >
                  Cetak Laporan
                </Button>
                
                <Button 
                  variant="contained" 
                  startIcon={<Settings />}
                  onClick={handleClickOpenOverhaul}
                  fullWidth
                  sx={{
                    backgroundColor: '#2196F3',
                    '&:hover': { backgroundColor: '#1976D2' }
                  }}
                >
                  Tambah Overhaul Baru
                </Button>
                
                <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center' }}>
                  {selectedRows.length} overhaul terpilih
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Daftar Overhaul */}
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Tracking Overhaul Point Machine
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Update terakhir: {new Date().toLocaleString()}
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ height: 500, width: '100%' }}>
                  <DataGrid
                    rows={overhaulProjects}
                    columns={overhaulColumns}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
                    rowSelectionModel={selectedRows}
                    disableRowSelectionOnClick
                    sx={{
                      '& .MuiDataGrid-cell': {
                        py: 1.5,
                      },
                      '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold'
                      },
                      '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.08)'
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Ringkasan */}
      <Card sx={{ mt: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Ringkasan
          </Typography>
          
          <Grid container spacing={2}>
            {productionProjects.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card 
                  variant="outlined"
                  sx={{ 
                    height: '100%',
                    borderLeft: `4px solid ${
                      item.progress > 70 ? '#4caf50' : 
                      item.progress > 40 ? '#ff9800' : '#f44336'
                    }`
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.location}
                    </Typography>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={item.progress} 
                      sx={{ 
                        height: 8, 
                        mb: 1,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: item.progress > 70 ? '#4caf50' : 
                                         item.progress > 40 ? '#ff9800' : '#f44336'
                        }
                      }}
                    />
                    
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Progress:</strong> {item.progress}% ({item.completed}/{item.target})
                    </Typography>
                    
                    <Typography variant="body2">
                      <strong>Material:</strong> {item.materials.length > 0 ? 
                        item.materials.slice(0, 2).join(', ') + 
                        (item.materials.length > 2 ? ` +${item.materials.length - 2} lagi` : '') 
                        : 'Belum ada'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {overhaulProjects.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card 
                  variant="outlined"
                  sx={{ 
                    height: '100%',
                    borderLeft: `4px solid #2196F3`
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Chip 
                        label="Overhaul" 
                        size="small" 
                        color="secondary"
                        sx={{ ml: 1, fontSize: '0.6rem', height: 20 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.location} ({item.machineType})
                    </Typography>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={item.progress} 
                      sx={{ 
                        height: 8, 
                        mb: 1,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#2196F3'
                        }
                      }}
                    />
                    
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Progress:</strong> {item.progress}% ({item.completed}/{item.target})
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Maintenance:</strong><br />
                      Terakhir: {item.lastMaintenance}<br />
                      Berikutnya: {item.nextMaintenance}
                    </Typography>
                    
                    <Typography variant="body2">
                      <strong>Material:</strong> {item.materials.length > 0 ? 
                        item.materials.slice(0, 2).join(', ') + 
                        (item.materials.length > 2 ? ` +${item.materials.length - 2} lagi` : '') 
                        : 'Belum ada'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Dialog Tambah/Edit Proyek Produksi */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          {editMode ? 'Edit Proyek Produksi' : 'Tambah Proyek Produksi'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, minWidth: 400 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nama Proyek"
              fullWidth
              value={currentProject.name}
              onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              margin="dense"
              label="Lokasi"
              fullWidth
              value={currentProject.location}
              onChange={(e) => setCurrentProject({...currentProject, location: e.target.value})}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              margin="dense"
              label="Target Produksi"
              type="number"
              fullWidth
              value={currentProject.target}
              onChange={(e) => setCurrentProject({
                ...currentProject, 
                target: Math.max(1, parseInt(e.target.value) || 1)
              })}
              inputProps={{ min: 1 }}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button 
            onClick={handleSaveProject}
            variant="contained"
            disabled={!currentProject.name || !currentProject.location || currentProject.target <= 0}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Tambah/Edit Overhaul */}
      <Dialog open={openOverhaulDialog} onClose={handleClose}>
        <DialogTitle>
          {editMode ? 'Edit Overhaul Point Machine' : 'Tambah Overhaul Point Machine'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, minWidth: 400 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nama Point Machine"
              fullWidth
              value={currentOverhaul.name}
              onChange={(e) => setCurrentOverhaul({...currentOverhaul, name: e.target.value})}
              sx={{ mb: 2 }}
              required
            />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipe Mesin</InputLabel>
              <Select
                value={currentOverhaul.machineType}
                onChange={(e) => setCurrentOverhaul({...currentOverhaul, machineType: e.target.value})}
                label="Tipe Mesin"
                required
              >
                <MenuItem value="Electroswitch">Electroswitch</MenuItem>
                <MenuItem value="VCC">VCC</MenuItem>
                <MenuItem value="Siemens">Siemens</MenuItem>
                <MenuItem value="Alstom">Alstom</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              margin="dense"
              label="Lokasi"
              fullWidth
              value={currentOverhaul.location}
              onChange={(e) => setCurrentOverhaul({...currentOverhaul, location: e.target.value})}
              sx={{ mb: 2 }}
              required
            />
            
            <TextField
              margin="dense"
              label="Maintenance Terakhir"
              type="date"
              fullWidth
              value={currentOverhaul.lastMaintenance}
              onChange={(e) => setCurrentOverhaul({...currentOverhaul, lastMaintenance: e.target.value})}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              required
            />
            
            <TextField
              margin="dense"
              label="Maintenance Berikutnya"
              type="date"
              fullWidth
              value={currentOverhaul.nextMaintenance}
              onChange={(e) => setCurrentOverhaul({...currentOverhaul, nextMaintenance: e.target.value})}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button 
            onClick={handleSaveOverhaul}
            variant="contained"
            disabled={!currentOverhaul.name || !currentOverhaul.location || 
                     !currentOverhaul.machineType || !currentOverhaul.lastMaintenance || 
                     !currentOverhaul.nextMaintenance}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}