'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Stack,
  Button,
  Divider,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  VolunteerActivism as VolunteerActivismIcon,
  Campaign as CampaignIcon,
  VerifiedUser as VerifiedUserIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  History as HistoryIcon,
  Favorite as FavoriteIcon,
  EmojiEvents as TrophyIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
  ContentCopy as ContentCopyIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Link from 'next/link';

// Mock Data
const donationHistory = [
  { id: 1, title: 'Bantu Korban Banjir Demak', date: '20 Jan 2024', amount: 'Rp 50.000', status: 'Success' },
  { id: 2, title: 'Sedekah Jumat Berkah', date: '12 Jan 2024', amount: 'Rp 20.000', status: 'Success' },
  { id: 3, title: 'Wakaf Al-Quran Pelosok', date: '05 Jan 2024', amount: 'Rp 100.000', status: 'Success' },
  { id: 4, title: 'Bantuan Gempa Sumedang', date: '01 Jan 2024', amount: 'Rp 75.000', status: 'Success' },
  { id: 5, title: 'Pembangunan Masjid Desa', date: '25 Dec 2023', amount: 'Rp 200.000', status: 'Success' },
];

const campaignHistory = [
  { id: 1, title: 'Bantu Korban Banjir Demak', date: '20 Jan 2024', role: 'Donor', status: 'Completed' },
  { id: 2, title: 'Gerakan Bersih Pantai', date: '15 Jan 2024', role: 'Volunteer', status: 'Active' },
  { id: 3, title: 'Wakaf Al-Quran Pelosok', date: '05 Jan 2024', role: 'Donor', status: 'Completed' },
];

interface AdminUserDetailClientProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    role: string;
    createdAt: Date;
    image?: string | null;
    emailVerified: Date | null;
  };
}

function CustomTabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AdminUserDetailClient({ user }: AdminUserDetailClientProps) {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
        setShareUrl(window.location.href);
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleShareOpen = () => setOpenShareDialog(true);
  const handleShareClose = () => {
    setOpenShareDialog(false);
    setCopySuccess(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShareTo = (platform: string) => {
      let url = '';
      const text = `Check out this user profile: ${user.name}`;
      switch(platform) {
          case 'facebook':
              url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
              break;
          case 'twitter':
              url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
              break;
          case 'whatsapp':
              url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
              break;
          case 'instagram':
               url = 'https://www.instagram.com/';
               break;
      }
      if (url) window.open(url, '_blank');
  };

  const joinedDate = new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const fullJoinedDate = new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  // Calculate Mock Stats
  const totalDonation = donationHistory.reduce((acc, curr) => acc + parseInt(curr.amount.replace(/[^0-9]/g, '')), 0);
  const totalCampaigns = campaignHistory.length;
  const impactScore = 85; // Mock score

  return (
    <Box sx={{ pb: 10, width: '100%' }}>
      {/* Header Navigation */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/admin/users" passHref style={{ textDecoration: 'none' }}>
            <Button 
                startIcon={<ArrowBackIcon />} 
                sx={{ 
                    color: 'text.secondary', 
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }
                }}
            >
                Back to Users
            </Button>
        </Link>
        <Stack direction="row" spacing={2}>
            <Button 
                variant="outlined" 
                startIcon={<ShareIcon />}
                onClick={handleShareOpen}
                sx={{ borderRadius: 2, textTransform: 'none' }}
            >
                Share Profile
            </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column: User Profile Card */}
        <Grid item xs={12} md={4}>
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 0, 
                    borderRadius: 4, 
                    border: '1px solid', 
                    borderColor: 'divider',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ 
                    height: 120, 
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    position: 'relative'
                }} />
                
                <Box sx={{ px: 4, pb: 4, mt: -6, textAlign: 'center' }}>
                    <Avatar 
                        src={user.image || ''} 
                        alt={user.name || 'User'}
                        sx={{ 
                            width: 100, 
                            height: 100, 
                            border: '4px solid white', 
                            boxShadow: theme.shadows[3],
                            mx: 'auto',
                            bgcolor: theme.palette.primary.main,
                            fontSize: 40
                        }}
                    >
                        {user.name?.charAt(0).toUpperCase() || <VerifiedUserIcon />}
                    </Avatar>
                    
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>
                        {user.name || 'Anonymous User'}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1, mb: 3 }}>
                        <Chip 
                            label={user.role} 
                            size="small" 
                            color={user.role === 'ADMIN' ? 'error' : 'primary'}
                            sx={{ fontWeight: 600, borderRadius: 1 }}
                        />
                        {user.emailVerified ? (
                             <Chip 
                                icon={<CheckCircleIcon sx={{ fontSize: '14px !important' }} />}
                                label="Verified" 
                                size="small" 
                                color="success"
                                variant="outlined"
                                sx={{ fontWeight: 600, borderRadius: 1 }}
                            />
                        ) : (
                            <Chip 
                                icon={<CancelIcon sx={{ fontSize: '14px !important' }} />}
                                label="Unverified" 
                                size="small" 
                                color="default"
                                variant="outlined"
                                sx={{ fontWeight: 600, borderRadius: 1 }}
                            />
                        )}
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={2} alignItems="flex-start">
                        <Stack direction="row" spacing={2} alignItems="center" width="100%">
                            <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                                <EmailIcon fontSize="small" />
                            </Box>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="caption" color="text.secondary" display="block">Email Address</Typography>
                                <Typography variant="body2" fontWeight={500}>{user.email}</Typography>
                            </Box>
                        </Stack>
                        
                        <Stack direction="row" spacing={2} alignItems="center" width="100%">
                            <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}>
                                <PhoneIcon fontSize="small" />
                            </Box>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="caption" color="text.secondary" display="block">Phone Number</Typography>
                                <Typography variant="body2" fontWeight={500}>{user.phone || 'Not provided'}</Typography>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center" width="100%">
                            <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main' }}>
                                <CalendarIcon fontSize="small" />
                            </Box>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="caption" color="text.secondary" display="block">Joined Date</Typography>
                                <Typography variant="body2" fontWeight={500}>{fullJoinedDate}</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>

            {/* Impact Score Card */}
            <Paper 
                elevation={0} 
                sx={{ 
                    mt: 3,
                    p: 3, 
                    borderRadius: 4, 
                    border: '1px solid', 
                    borderColor: 'divider',
                    bgcolor: alpha(theme.palette.secondary.main, 0.05)
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" fontWeight={700}>Impact Score</Typography>
                    <TrophyIcon color="secondary" />
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, mb: 1 }}>
                    <Typography variant="h3" fontWeight={800} color="secondary.main">{impactScore}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>/ 100</Typography>
                </Box>
                <LinearProgress 
                    variant="determinate" 
                    value={impactScore} 
                    color="secondary"
                    sx={{ height: 8, borderRadius: 4 }} 
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Top 15% of active donors this month
                </Typography>
            </Paper>
        </Grid>

        {/* Right Column: Detailed Stats & Tabs */}
        <Grid item xs={12} md={8}>
            {/* Stats Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.lighter', color: 'primary.main' }}>
                                        <VolunteerActivismIcon />
                                    </Box>
                                    <Chip label="+12%" size="small" color="success" sx={{ height: 20, fontSize: '0.7rem' }} />
                                </Box>
                                <Typography variant="h5" fontWeight={700}>
                                    Rp {(totalDonation / 1000).toFixed(0)}k
                                </Typography>
                                <Typography variant="body2" color="text.secondary">Total Donations</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'secondary.lighter', color: 'secondary.main' }}>
                                        <CampaignIcon />
                                    </Box>
                                    <Chip label="Active" size="small" color="primary" sx={{ height: 20, fontSize: '0.7rem' }} />
                                </Box>
                                <Typography variant="h5" fontWeight={700}>{totalCampaigns}</Typography>
                                <Typography variant="body2" color="text.secondary">Campaigns Joined</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'success.lighter', color: 'success.main' }}>
                                        <HistoryIcon />
                                    </Box>
                                </Box>
                                <Typography variant="h5" fontWeight={700}>{joinedDate}</Typography>
                                <Typography variant="body2" color="text.secondary">Member Since</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs Section */}
            <Paper sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }} elevation={0}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="user details tabs">
                        <Tab label="Donation History" sx={{ textTransform: 'none', fontWeight: 600 }} />
                        <Tab label="Campaign Activity" sx={{ textTransform: 'none', fontWeight: 600 }} />
                        <Tab label="Documents" sx={{ textTransform: 'none', fontWeight: 600 }} />
                    </Tabs>
                </Box>

                <CustomTabPanel value={tabValue} index={0}>
                    <List disablePadding>
                        {donationHistory.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <ListItem alignItems="flex-start" sx={{ px: 3, py: 2 }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                                            <VolunteerActivismIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    {item.amount}
                                                </Typography>
                                                {" — " + item.date}
                                            </React.Fragment>
                                        }
                                    />
                                    <Chip label={item.status} color="success" size="small" variant="outlined" />
                                </ListItem>
                                {index < donationHistory.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </CustomTabPanel>

                <CustomTabPanel value={tabValue} index={1}>
                    <List disablePadding>
                         {campaignHistory.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <ListItem alignItems="flex-start" sx={{ px: 3, py: 2 }}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main' }}>
                                            <CampaignIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    {item.role}
                                                </Typography>
                                                {" — " + item.date}
                                            </React.Fragment>
                                        }
                                    />
                                    <Chip label={item.status} color={item.status === 'Active' ? 'primary' : 'default'} size="small" />
                                </ListItem>
                                {index < campaignHistory.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </CustomTabPanel>

                <CustomTabPanel value={tabValue} index={2}>
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                         <Avatar sx={{ width: 60, height: 60, bgcolor: 'action.hover', color: 'text.secondary', mx: 'auto', mb: 2 }}>
                            <VerifiedUserIcon fontSize="large" />
                         </Avatar>
                         <Typography variant="h6" gutterBottom>No Documents Uploaded</Typography>
                         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                             This user has not uploaded any identity verification documents yet.
                         </Typography>
                         <Button variant="outlined" startIcon={<ShareIcon />}>
                             Request Verification
                         </Button>
                    </Box>
                </CustomTabPanel>
            </Paper>
        </Grid>
      </Grid>

      {/* Share Dialog */}
      <Dialog
        open={openShareDialog}
        onClose={handleShareClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" component="div" fontWeight={700}>Share Profile</Typography>
            <IconButton onClick={handleShareClose} size="small">
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Share this profile on your favorite social media platforms or copy the link.
            </Typography>
            
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                <IconButton onClick={() => handleShareTo('facebook')} sx={{ color: '#1877F2', bgcolor: alpha('#1877F2', 0.1), '&:hover': { bgcolor: alpha('#1877F2', 0.2) } }}>
                    <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={() => handleShareTo('twitter')} sx={{ color: '#1DA1F2', bgcolor: alpha('#1DA1F2', 0.1), '&:hover': { bgcolor: alpha('#1DA1F2', 0.2) } }}>
                    <TwitterIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={() => handleShareTo('whatsapp')} sx={{ color: '#25D366', bgcolor: alpha('#25D366', 0.1), '&:hover': { bgcolor: alpha('#25D366', 0.2) } }}>
                    <WhatsAppIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={() => handleShareTo('instagram')} sx={{ color: '#E4405F', bgcolor: alpha('#E4405F', 0.1), '&:hover': { bgcolor: alpha('#E4405F', 0.2) } }}>
                    <InstagramIcon fontSize="large" />
                </IconButton>
            </Stack>

            <Box sx={{ position: 'relative' }}>
                <TextField
                    fullWidth
                    value={shareUrl}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleCopyLink} edge="end">
                                    <ContentCopyIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 2, pr: 1 }
                    }}
                />
                <Tooltip
                    open={copySuccess}
                    title="Copied!"
                    placement="top"
                    arrow
                >
                   <Box sx={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40 }} />
                </Tooltip>
            </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}