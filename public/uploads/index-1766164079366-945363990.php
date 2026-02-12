<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Dashboard Admin - SIAKAD LPK</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap & Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/siakad/assets/css/custom.css">
</head>
<body class="app-body">

<div class="app-shell d-flex">
    <!-- Overlay untuk mobile -->
<div class="app-sidebar-overlay d-lg-none"></div>

<aside class="app-sidebar bg-white shadow-sm d-flex flex-column">
    <div class="app-sidebar-header d-flex align-items-center justify-content-between flex-shrink-0">
        <div class="d-flex align-items-center gap-2">
            <div class="app-logo-square bg-primary text-white">
                <span>DA</span>
            </div>
            <div class="overflow-hidden">
                <div class="fw-bold small text-uppercase text-truncate">LMS DEPATI</div>
                <div class="extra-small text-muted text-truncate">SIM Akademik</div>
            </div>
        </div>
    </div>

    <!-- Tombol Ganti Modul -->
    <div class="px-3 mb-2 mt-2">
        <a href="/siakad/portal.php" class="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2">
            <i class="bi bi-grid-fill"></i> Ganti Modul
        </a>
    </div>

    <div class="app-sidebar-body flex-grow-1 overflow-y-auto">
        <nav class="nav flex-column">
            
            <!-- Dashboard selalu ada -->
            <a href="/siakad/admin/index.php"
               class="nav-link app-nav-link d-flex align-items-center active app-nav-active">
                <span class="app-nav-icon">
                    <i class="bi bi-speedometer2"></i>
                </span>
                <span>Dashboard</span>
            </a>

            <!-- SUPERADMIN (Tetap Full Access / Master Control) -->
            
            <!-- ADMIN MENU PER MODUL -->
                            
                                    <div class="app-nav-section mt-3">Manajemen Data</div>
                    <a href="/siakad/admin/program.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-journal-text"></i></span> <span>Program & Modul</span>
                    </a>
                    <a href="/siakad/admin/kelas.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-easel"></i></span> <span>Manajemen Kelas</span>
                    </a>
                    <a href="/siakad/admin/peserta.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-people-fill"></i></span> <span>Manajemen Peserta</span>
                    </a>
                    <a href="/siakad/admin/instruktur.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-person-badge"></i></span> <span>Tutor / Instruktur</span>
                    </a>
                    <a href="/siakad/admin/ruangan.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-building"></i></span> <span>Manajemen Ruangan</span>
                    </a>
                    
                    <div class="app-nav-section mt-3">Operasional</div>
                    <a href="/siakad/admin/jadwal.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-calendar-week"></i></span> <span>Jadwal Pelajaran</span>
                    </a>
                    <a href="/siakad/admin/ujian.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-calendar2-event"></i></span> <span>Jadwal Ujian</span>
                    </a>
                    <a href="/siakad/admin/wa-reminder.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-whatsapp"></i></span> <span>Reminder WA</span>
                    </a>

                    <!-- Admin E-Learning & CBT (Digabung ke SIM) -->
                    <div class="app-nav-section mt-3">E-Learning & CBT</div>
                    <a href="/siakad/admin/elearning.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-laptop"></i></span> <span>Monitoring Kelas</span>
                    </a>
                    <a href="/siakad/admin/modul-elearning.php" class="nav-link app-nav-link d-flex align-items-center ">
                         <span class="app-nav-icon"><i class="bi bi-book"></i></span> <span>Modul E-Learning</span>
                    </a>
                    <a href="/siakad/admin/bank-soal.php" class="nav-link app-nav-link d-flex align-items-center ">
                         <span class="app-nav-icon"><i class="bi bi-collection"></i></span> <span>Bank Soal</span>
                    </a>
                    
                    <div class="app-nav-section mt-3">Laporan & Arsip</div>
                    <a href="/siakad/admin/laporan-tutor.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-clipboard-data"></i></span> <span>Laporan Mengajar</span>
                    </a>
                    <a href="/siakad/admin/arsip.php" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-archive"></i></span> <span>Arsip Kelas</span>
                    </a>
                    <a href="/siakad/admin/arsip.php?type=ujian" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-journal-check"></i></span> <span>Arsip Ujian</span>
                    </a>
                    <a href="/siakad/admin/arsip.php?type=raport" class="nav-link app-nav-link d-flex align-items-center ">
                        <span class="app-nav-icon"><i class="bi bi-file-earmark-check"></i></span> <span>Arsip Sertifikat/Rapor</span>
                    </a>
                
                
                <div class="mt-auto"></div>
                <div class="app-nav-section mt-3">Pengaturan</div>
                <a href="/siakad/admin/akun.php" class="nav-link app-nav-link d-flex align-items-center ">
                    <span class="app-nav-icon"><i class="bi bi-person-gear"></i></span> <span>Pengaturan Akun</span>
                </a>

            
            <!-- TUTOR MENU PER MODUL -->
            
            <!-- PESERTA MENU PER MODUL -->
            
            
        </nav>
    </div>
    
    <!-- Footer Sidebar -->
    <div class="app-sidebar-footer p-3 border-top bg-light">
        <a href="/siakad/logout.php" class="d-flex align-items-center text-muted text-decoration-none hover-text-danger transition-all">
            <i class="bi bi-box-arrow-left fs-5 me-2"></i>
            <span class="fw-medium small">Keluar Aplikasi</span>
        </a>
    </div>
</aside>

    <main class="app-main flex-grow-1">
        <!-- TOPBAR -->
        <nav class="app-topbar navbar navbar-expand-lg bg-white shadow-sm">
            <div class="container-fluid">
                <div class="d-flex align-items-center gap-2">
                    <!-- Sidebar toggle (mobile) -->
                    <button class="btn btn-sm btn-outline-secondary d-lg-none" type="button" data-sidebar-toggle>
                        <i class="bi bi-list"></i>
                    </button>
                    <div>
                        <div class="fw-semibold d-flex align-items-center gap-2">
                            <span class="badge rounded-pill app-badge-brand">
                                <i class="bi bi-mortarboard me-1"></i> SIAKAD LPK
                            </span>
                            <span class="small text-muted d-none d-sm-inline">
                                / Admin                            </span>
                        </div>
                        <div class="small text-muted d-none d-md-block">
                            Panel akademik Depati Akademi – versi prototype
                        </div>
                    </div>
                </div>

                <div class="d-flex align-items-center gap-3">
                    <a href="/siakad/portal.php" class="btn btn-primary btn-sm rounded-pill d-none d-md-inline-flex align-items-center gap-2 shadow-sm">
                        <i class="bi bi-grid-fill"></i> Ganti Modul
                    </a>

                    <div class="text-end d-none d-sm-block">
                        <div class="small text-muted">Login sebagai</div>
                        <div class="fw-semibold">Admin LPK</div>
                        <div class="small text-muted">admin@lpk.test</div>
                    </div>
                    <div class="app-avatar d-none d-sm-flex">
                        <span>
                            A                        </span>
                    </div>
                    <a href="/siakad/logout.php" class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-box-arrow-right me-1"></i> Logout
                    </a>
                </div>
            </div>
        </nav>

        <!-- CONTENT -->
        <div class="app-content container-fluid py-4">
            
<style>
    :root {
        --primary-gradient: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
        --card-shadow: 0 5px 15px rgba(0,0,0,0.05);
        --hover-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }

    /* Animations */
    .fade-in-up {
        animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    @keyframes fadeInUp {
        to { opacity: 1; transform: translateY(0); }
    }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }

    /* Components */
    .welcome-banner {
        background: var(--primary-gradient);
        color: white;
        position: relative;
        overflow: hidden;
        border: none;
    }
    .welcome-decor {
        position: absolute;
        right: -50px;
        top: -50px;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
        border-radius: 50%;
    }

    .stat-card {
        border: none;
        box-shadow: var(--card-shadow);
        transition: all 0.3s ease;
    }
    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--hover-shadow) !important;
    }
    .stat-icon-box {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    }

    .avatar-circle {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }

    .chart-bar-container {
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: relative;
    }
    .chart-bar {
        width: 100%;
        border-radius: 6px 6px 0 0;
        transition: all 0.3s ease;
        position: relative;
        animation: growBar 1s ease-out forwards;
        transform-origin: bottom;
    }
    .chart-bar:hover {
        opacity: 0.8;
    }
    @keyframes growBar {
        from { transform: scaleY(0); }
        to { transform: scaleY(1); }
    }
    
    .quick-action-btn {
        transition: all 0.2s;
        border: 1px solid #eef0f7;
    }
    .quick-action-btn:hover {
        transform: translateY(-3px);
        background-color: #fff;
        border-color: #4e73df;
        box-shadow: 0 5px 15px rgba(78, 115, 223, 0.1);
        z-index: 1;
    }

    .pulse-dot {
        width: 8px;
        height: 8px;
        background-color: #dc3545;
        border-radius: 50%;
        display: inline-block;
        position: relative;
    }
    .pulse-dot::after {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border-radius: 50%;
        border: 2px solid #dc3545;
        animation: pulse 1.5s infinite;
        opacity: 0.5;
    }
    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(2); opacity: 0; }
    }
</style>

<!-- Welcome Section -->
<div class="row mb-4 fade-in-up">
    <div class="col-12">
        <div class="card welcome-banner shadow-lg rounded-4 p-4 p-md-5">
            <div class="welcome-decor"></div>
            <div class="position-relative z-1 d-flex flex-column flex-md-row justify-content-between align-items-center">
                <div class="mb-3 mb-md-0">
                    <h2 class="fw-bold mb-2">Selamat Datang, Admin! 👋</h2>
                    <p class="mb-0 opacity-75 fs-5">
                        Siap untuk memantau perkembangan LPK hari ini? <br>
                        <span class="fs-6"><i class="bi bi-calendar-event me-2"></i>Monday, 15 December 2025</span>
                    </p>
                </div>
                <div class="d-flex gap-3">
                    <button class="btn btn-light text-primary shadow-sm rounded-pill px-4 py-2 fw-bold">
                        <i class="bi bi-cloud-download me-2"></i>Unduh Laporan
                    </button>
                    <button class="btn btn-warning text-dark shadow-sm rounded-pill px-4 py-2 fw-bold">
                        <i class="bi bi-plus-lg me-2"></i>Entri Baru
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Stats Row -->
<div class="row g-4 mb-4">
        <div class="col-6 col-lg-3 fade-in-up" style="animation-delay: 100ms">
        <div class="card stat-card h-100 rounded-4 overflow-hidden">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="stat-icon-box bg-primary-subtle text-primary">
                        <i class="bi bi-people-fill"></i>
                    </div>
                                            <span class="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                            <i class="bi bi-graph-up-arrow me-1"></i>+12% bulan ini                        </span>
                                    </div>
                <h3 class="fw-bold text-dark mb-1">1,240</h3>
                <div class="text-muted fw-medium small text-uppercase spacing-1">Total Siswa</div>
            </div>
            <!-- Decorative line at bottom -->
            <div class="bg-primary" style="height: 4px; width: 100%;"></div>
        </div>
    </div>
        <div class="col-6 col-lg-3 fade-in-up" style="animation-delay: 200ms">
        <div class="card stat-card h-100 rounded-4 overflow-hidden">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="stat-icon-box bg-success-subtle text-success">
                        <i class="bi bi-wallet-fill"></i>
                    </div>
                                            <span class="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                            <i class="bi bi-graph-up-arrow me-1"></i>+8% dari target                        </span>
                                    </div>
                <h3 class="fw-bold text-dark mb-1">Rp 45.2M</h3>
                <div class="text-muted fw-medium small text-uppercase spacing-1">Pendapatan</div>
            </div>
            <!-- Decorative line at bottom -->
            <div class="bg-success" style="height: 4px; width: 100%;"></div>
        </div>
    </div>
        <div class="col-6 col-lg-3 fade-in-up" style="animation-delay: 300ms">
        <div class="card stat-card h-100 rounded-4 overflow-hidden">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="stat-icon-box bg-info-subtle text-info">
                        <i class="bi bi-easel-fill"></i>
                    </div>
                                            <span class="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                            <i class="bi bi-graph-up-arrow me-1"></i>Stabil                        </span>
                                    </div>
                <h3 class="fw-bold text-dark mb-1">24</h3>
                <div class="text-muted fw-medium small text-uppercase spacing-1">Kelas Aktif</div>
            </div>
            <!-- Decorative line at bottom -->
            <div class="bg-info" style="height: 4px; width: 100%;"></div>
        </div>
    </div>
        <div class="col-6 col-lg-3 fade-in-up" style="animation-delay: 400ms">
        <div class="card stat-card h-100 rounded-4 overflow-hidden">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="stat-icon-box bg-warning-subtle text-warning">
                        <i class="bi bi-clipboard-data-fill"></i>
                    </div>
                                            <span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">
                            <i class="bi bi-graph-down-arrow me-1"></i>-2 tugas                        </span>
                                    </div>
                <h3 class="fw-bold text-dark mb-1">15</h3>
                <div class="text-muted fw-medium small text-uppercase spacing-1">Pending Review</div>
            </div>
            <!-- Decorative line at bottom -->
            <div class="bg-warning" style="height: 4px; width: 100%;"></div>
        </div>
    </div>
    </div>

<div class="row g-4">
    <!-- Left Column: Main Content -->
    <div class="col-lg-8 fade-in-up delay-300">
        
        <!-- Registration Chart -->
        <div class="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
            <div class="card-header bg-white py-4 px-4 d-flex justify-content-between align-items-center border-bottom-0">
                <div>
                    <h5 class="fw-bold mb-1">Statistik Pendaftaran</h5>
                    <p class="text-muted small mb-0">Tren pendaftaran siswa baru dalam 7 hari terakhir.</p>
                </div>
                <div class="btn-group btn-group-sm bg-light rounded-pill p-1">
                    <button class="btn btn-white rounded-pill shadow-sm px-3 fw-bold small">Mingguan</button>
                    <button class="btn btn-transparent rounded-pill px-3 text-muted small">Bulanan</button>
                </div>
            </div>
            <div class="card-body px-4 pb-4 pt-0">
                <div class="d-flex align-items-end justify-content-between gap-3" style="height: 250px;">
                                        <div class="w-100 d-flex flex-column align-items-center gap-2" style="height: 100%;">
                        <div class="chart-bar-container w-100 bg-light rounded-top-3 overflow-hidden position-relative">
                            <!-- Background Bar (Total Capacity/Target) -->
                            <!-- Actual Bar -->
                            <div class="bg-primary chart-bar" style="height: 30%; position: absolute; bottom: 0; width: 100%; opacity: 0.15;"></div>
                            <div class="bg-primary chart-bar shadow-sm" style="height: 20%;">
                                <!-- Tooltip on Hover could go here -->
                            </div>
                        </div>
                        <span class="extra-small fw-bold text-muted">Sen</span>
                    </div>
                                        <div class="w-100 d-flex flex-column align-items-center gap-2" style="height: 100%;">
                        <div class="chart-bar-container w-100 bg-light rounded-top-3 overflow-hidden position-relative">
                            <!-- Background Bar (Total Capacity/Target) -->
                            <!-- Actual Bar -->
                            <div class="bg-primary chart-bar" style="height: 68%; position: absolute; bottom: 0; width: 100%; opacity: 0.15;"></div>
                            <div class="bg-primary chart-bar shadow-sm" style="height: 31%;">
                                <!-- Tooltip on Hover could go here -->
                            </div>
                        </div>
                        <span class="extra-small fw-bold text-muted">Sel</span>
                    </div>
                                        <div class="w-100 d-flex flex-column align-items-center gap-2" style="height: 100%;">
                        <div class="chart-bar-container w-100 bg-light rounded-top-3 overflow-hidden position-relative">
                            <!-- Background Bar (Total Capacity/Target) -->
                            <!-- Actual Bar -->
                            <div class="bg-primary chart-bar" style="height: 85%; position: absolute; bottom: 0; width: 100%; opacity: 0.15;"></div>
                            <div class="bg-primary chart-bar shadow-sm" style="height: 35%;">
                                <!-- Tooltip on Hover could go here -->
                            </div>
                        </div>
                        <span class="extra-small fw-bold text-muted">Rab</span>
                    </div>
                                        <div class="w-100 d-flex flex-column align-items-center gap-2" style="height: 100%;">
                        <div class="chart-bar-container w-100 bg-light rounded-top-3 overflow-hidden position-relative">
                            <!-- Background Bar (Total Capacity/Target) -->
                            <!-- Actual Bar -->
                            <div class="bg-primary chart-bar" style="height: 32%; position: absolute; bottom: 0; width: 100%; opacity: 0.15;"></div>
                            <div class="bg-primary chart-bar shadow-sm" style="height: 22%;">
                                <!-- Tooltip on Hover could go here -->
                            </div>
                        </div>
                        <span class="extra-small fw-bold text-muted">Kam</span>
                    </div>
                                        <div class="w-100 d-flex flex-column align-items-center gap-2" style="height: 100%;">
                        <div class="chart-bar-container w-100 bg-light rounded-top-3 overflow-hidden position-relative">
                            <!-- Background Bar (Total Capacity/Target) -->
                            <!-- Actual Bar -->
                            <div class="bg-primary chart-bar" style="height: 47%; position: absolute; bottom: 0; width: 100%; opacity: 0.15;"></div>
                            <div class="bg-primary chart-bar shadow-sm" style="height: 37%;">
                                <!-- Tooltip on Hover could go here -->
                            </div>
                        </div>
                        <span class="extra-small fw-bold text-muted">Jum</span>
                    </div>
                                        <div class="w-100 d-flex flex-column align-items-center gap-2" style="height: 100%;">
                        <div class="chart-bar-container w-100 bg-light rounded-top-3 overflow-hidden position-relative">
                            <!-- Background Bar (Total Capacity/Target) -->
                            <!-- Actual Bar -->
                            <div class="bg-primary chart-bar" style="height: 72%; position: absolute; bottom: 0; width: 100%; opacity: 0.15;"></div>
                            <div class="bg-primary chart-bar shadow-sm" style="height: 32%;">
                                <!-- Tooltip on Hover could go here -->
                            </div>
                        </div>
                        <span class="extra-small fw-bold text-muted">Sab</span>
                    </div>
                                        <div class="w-100 d-flex flex-column align-items-center gap-2" style="height: 100%;">
                        <div class="chart-bar-container w-100 bg-light rounded-top-3 overflow-hidden position-relative">
                            <!-- Background Bar (Total Capacity/Target) -->
                            <!-- Actual Bar -->
                            <div class="bg-primary chart-bar" style="height: 40%; position: absolute; bottom: 0; width: 100%; opacity: 0.15;"></div>
                            <div class="bg-primary chart-bar shadow-sm" style="height: 26%;">
                                <!-- Tooltip on Hover could go here -->
                            </div>
                        </div>
                        <span class="extra-small fw-bold text-muted">Min</span>
                    </div>
                                    </div>
            </div>
        </div>

        <!-- Recent Registrations -->
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="card-header bg-white py-4 px-4 d-flex justify-content-between align-items-center border-bottom-0">
                <h5 class="fw-bold mb-0">Pendaftaran Terbaru</h5>
                <a href="#" class="btn btn-light btn-sm rounded-pill px-3 text-primary fw-bold">Lihat Semua</a>
            </div>
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light text-muted small text-uppercase">
                        <tr>
                            <th class="ps-4 py-3 border-0 rounded-start">Siswa</th>
                            <th class="py-3 border-0">Program</th>
                            <th class="py-3 border-0">Status</th>
                            <th class="py-3 border-0">Waktu</th>
                            <th class="pe-4 py-3 text-end border-0 rounded-end">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                                                <tr>
                            <td class="ps-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="avatar-circle bg-light text-primary border">
                                        SA                                    </div>
                                    <div>
                                        <div class="fw-bold text-dark">Sarah Amalia</div>
                                        <div class="extra-small text-muted">ID: #5660</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="fw-medium text-dark">Digital Marketing</span></td>
                            <td>
                                                                    <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">
                                        <i class="bi bi-check-circle-fill me-1"></i>Lunas
                                    </span>
                                                            </td>
                            <td class="text-muted small">Baru saja</td>
                            <td class="text-end pe-4">
                                <button class="btn btn-icon btn-light btn-sm rounded-circle text-muted shadow-sm hover-lift">
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </td>
                        </tr>
                                                <tr>
                            <td class="ps-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="avatar-circle bg-light text-primary border">
                                        BS                                    </div>
                                    <div>
                                        <div class="fw-bold text-dark">Budi Santoso</div>
                                        <div class="extra-small text-muted">ID: #7517</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="fw-medium text-dark">Web Development</span></td>
                            <td>
                                                                    <span class="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-3">
                                        <i class="bi bi-clock-fill me-1"></i>Pending
                                    </span>
                                                            </td>
                            <td class="text-muted small">5 menit lalu</td>
                            <td class="text-end pe-4">
                                <button class="btn btn-icon btn-light btn-sm rounded-circle text-muted shadow-sm hover-lift">
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </td>
                        </tr>
                                                <tr>
                            <td class="ps-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="avatar-circle bg-light text-primary border">
                                        CD                                    </div>
                                    <div>
                                        <div class="fw-bold text-dark">Citra Dewi</div>
                                        <div class="extra-small text-muted">ID: #3131</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="fw-medium text-dark">Data Science</span></td>
                            <td>
                                                                    <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">
                                        <i class="bi bi-check-circle-fill me-1"></i>Lunas
                                    </span>
                                                            </td>
                            <td class="text-muted small">1 jam lalu</td>
                            <td class="text-end pe-4">
                                <button class="btn btn-icon btn-light btn-sm rounded-circle text-muted shadow-sm hover-lift">
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </td>
                        </tr>
                                                <tr>
                            <td class="ps-4">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="avatar-circle bg-light text-primary border">
                                        DA                                    </div>
                                    <div>
                                        <div class="fw-bold text-dark">Dimas Anggara</div>
                                        <div class="extra-small text-muted">ID: #8475</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="fw-medium text-dark">UI/UX Design</span></td>
                            <td>
                                                                    <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">
                                        <i class="bi bi-check-circle-fill me-1"></i>Lunas
                                    </span>
                                                            </td>
                            <td class="text-muted small">2 jam lalu</td>
                            <td class="text-end pe-4">
                                <button class="btn btn-icon btn-light btn-sm rounded-circle text-muted shadow-sm hover-lift">
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </td>
                        </tr>
                                            </tbody>
                </table>
            </div>
        </div>

    </div>

    <!-- Right Column: Sidebar -->
    <div class="col-lg-4 fade-in-up delay-300">
        
        <!-- Quick Actions -->
        <div class="card border-0 shadow-sm mb-4 rounded-4">
            <div class="card-header bg-white py-3 px-4 border-bottom-0">
                <h6 class="fw-bold mb-0">🚀 Aksi Cepat</h6>
            </div>
            <div class="card-body px-4 pb-4 pt-0">
                <div class="row g-3">
                    <div class="col-6">
                        <a href="/siakad/admin/program.php" class="btn btn-light w-100 p-3 quick-action-btn text-start h-100 rounded-3 position-relative overflow-hidden">
                            <div class="position-absolute end-0 top-0 p-2 opacity-10">
                                <i class="bi bi-plus-circle fs-1 text-primary"></i>
                            </div>
                            <div class="mb-2 bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
                                <i class="bi bi-plus-lg"></i>
                            </div>
                            <h6 class="fw-bold text-dark mb-0">Program</h6>
                            <small class="text-muted extra-small">Tambah Baru</small>
                        </a>
                    </div>
                    <div class="col-6">
                        <a href="/siakad/admin/kelas.php" class="btn btn-light w-100 p-3 quick-action-btn text-start h-100 rounded-3 position-relative overflow-hidden">
                            <div class="position-absolute end-0 top-0 p-2 opacity-10">
                                <i class="bi bi-calendar-plus fs-1 text-success"></i>
                            </div>
                            <div class="mb-2 bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
                                <i class="bi bi-calendar4"></i>
                            </div>
                            <h6 class="fw-bold text-dark mb-0">Kelas</h6>
                            <small class="text-muted extra-small">Buka Sesi</small>
                        </a>
                    </div>
                    <div class="col-6">
                        <a href="/siakad/admin/instruktur.php" class="btn btn-light w-100 p-3 quick-action-btn text-start h-100 rounded-3 position-relative overflow-hidden">
                            <div class="position-absolute end-0 top-0 p-2 opacity-10">
                                <i class="bi bi-person-plus fs-1 text-info"></i>
                            </div>
                            <div class="mb-2 bg-info-subtle text-info rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
                                <i class="bi bi-person-plus-fill"></i>
                            </div>
                            <h6 class="fw-bold text-dark mb-0">Tutor</h6>
                            <small class="text-muted extra-small">Rekrutmen</small>
                        </a>
                    </div>
                    <div class="col-6">
                        <a href="/siakad/admin/jadwal.php" class="btn btn-light w-100 p-3 quick-action-btn text-start h-100 rounded-3 position-relative overflow-hidden">
                            <div class="position-absolute end-0 top-0 p-2 opacity-10">
                                <i class="bi bi-broadcast fs-1 text-danger"></i>
                            </div>
                            <div class="mb-2 bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 36px; height: 36px;">
                                <i class="bi bi-megaphone-fill"></i>
                            </div>
                            <h6 class="fw-bold text-dark mb-0">Info</h6>
                            <small class="text-muted extra-small">Pengumuman</small>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Live Classes -->
        <div class="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
            <div class="card-header bg-white py-3 px-4 d-flex justify-content-between align-items-center border-bottom-0">
                <h6 class="fw-bold mb-0">Kelas Sedang Berjalan</h6>
                <div class="d-flex align-items-center">
                    <span class="pulse-dot me-2"></span>
                    <span class="text-danger fw-bold small text-uppercase">Live</span>
                </div>
            </div>
            <div class="list-group list-group-flush">
                                <div class="list-group-item px-4 py-3 border-light-subtle">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill extra-small px-2">DM-01</span>
                        <small class="text-muted fw-medium"><i class="bi bi-geo-alt-fill me-1 text-secondary"></i>Lab A</small>
                    </div>
                    <h6 class="fw-bold mb-2 text-dark">Digital Marketing Batch 1</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-2">
                            <div class="avatar-circle bg-light text-secondary border" style="width: 28px; height: 28px; font-size: 0.8rem;">
                                E                            </div>
                            <small class="text-muted fw-medium">Eko Kurniawan</small>
                        </div>
                        <div class="d-flex align-items-center text-success">
                            <i class="bi bi-people-fill me-1"></i>
                            <small class="fw-bold">18/20</small>
                        </div>
                    </div>
                </div>
                                <div class="list-group-item px-4 py-3 border-light-subtle">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill extra-small px-2">WD-03</span>
                        <small class="text-muted fw-medium"><i class="bi bi-geo-alt-fill me-1 text-secondary"></i>Lab B</small>
                    </div>
                    <h6 class="fw-bold mb-2 text-dark">Web Dev Fullstack</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-2">
                            <div class="avatar-circle bg-light text-secondary border" style="width: 28px; height: 28px; font-size: 0.8rem;">
                                S                            </div>
                            <small class="text-muted fw-medium">Sandhika Galih</small>
                        </div>
                        <div class="d-flex align-items-center text-success">
                            <i class="bi bi-people-fill me-1"></i>
                            <small class="fw-bold">15/15</small>
                        </div>
                    </div>
                </div>
                            </div>
            <div class="card-footer bg-white text-center border-0 py-3">
                <a href="#" class="text-decoration-none small fw-bold text-primary">Lihat Semua Kelas Live <i class="bi bi-arrow-right ms-1"></i></a>
            </div>
        </div>

        <!-- System Health -->
        <div class="card border-0 shadow-sm rounded-4">
            <div class="card-body p-4">
                <h6 class="fw-bold mb-4 d-flex align-items-center">
                    <i class="bi bi-hdd-rack me-2 text-secondary"></i>System Status
                </h6>
                <div class="mb-4">
                    <div class="d-flex justify-content-between small fw-bold mb-2">
                        <span>Server Load</span>
                        <span class="text-success">12%</span>
                    </div>
                    <div class="progress bg-success-subtle" style="height: 6px; border-radius: 10px;">
                        <div class="progress-bar bg-success rounded-pill" style="width: 12%"></div>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="d-flex justify-content-between small fw-bold mb-2">
                        <span>Storage Usage</span>
                        <span class="text-warning">65%</span>
                    </div>
                    <div class="progress bg-warning-subtle" style="height: 6px; border-radius: 10px;">
                        <div class="progress-bar bg-warning rounded-pill" style="width: 65%"></div>
                    </div>
                </div>
                <div>
                    <div class="d-flex justify-content-between small fw-bold mb-2">
                        <span>Database Health</span>
                        <span class="text-primary">100%</span>
                    </div>
                    <div class="progress bg-primary-subtle" style="height: 6px; border-radius: 10px;">
                        <div class="progress-bar bg-primary rounded-pill" style="width: 100%"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

        </div>
    </main>
</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="/siakad/assets/js/main.js"></script>

<script>
    // Toggle sidebar di mobile
    $(function () {
        $('[data-sidebar-toggle]').on('click', function () {
            $('body').toggleClass('sidebar-open');
        });
        // klik di overlay nutup sidebar
        $('.app-sidebar-overlay').on('click', function () {
            $('body').removeClass('sidebar-open');
        });
    });
</script>
</body>
</html>
