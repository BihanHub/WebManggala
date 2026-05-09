// ==================== script.js ====================

// ----- NAVBAR SCROLL EFFECT -----
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ----- MOBILE MENU TOGGLE -----
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('open');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (navLinks && mobileMenuBtn) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    }
});

// ----- MODAL FUNCTIONS -----
function showModal(type) {
    const modalMap = {
        'login': 'loginModal',
        'signup': 'signupModal',
        'registration': 'registrationModal'
    };
    const modalId = modalMap[type];
    if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking overlay
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal-overlay.active');
        activeModals.forEach(function (modal) {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// ----- TOAST FUNCTION -----
function showToast(message, type) {
    type = type || 'success';
    const toast = document.getElementById('toast');
    if (!toast) return;

    // Clear any existing timeout
    if (toast._timeout) {
        clearTimeout(toast._timeout);
    }

    toast.textContent = message;
    toast.className = 'toast ' + type + ' show';

    toast._timeout = setTimeout(function () {
        toast.classList.remove('show');
    }, 3500);
}

// ----- AUTH FORM HANDLER -----
function handleAuthSubmit(event, type) {
    event.preventDefault();

    if (type === 'login') {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) {
            showToast('Harap isi semua kolom!', 'error');
            return;
        }

        // Simulasi login berhasil
        showToast('Login berhasil! Selamat datang kembali.', 'success');
        closeModal('loginModal');
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    }

    if (type === 'signup') {
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();

        if (!name || !email || !password) {
            showToast('Harap isi semua kolom!', 'error');
            return;
        }

        if (password.length < 6) {
            showToast('Password minimal 6 karakter!', 'error');
            return;
        }

        // Simulasi signup berhasil
        showToast('Akun berhasil dibuat! Silakan login.', 'success');
        closeModal('signupModal');
        document.getElementById('signupName').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';

        // Buka modal login setelah 1.5 detik
        setTimeout(function () {
            showModal('login');
        }, 1500);
    }
}

// ----- REGISTRATION FORM HANDLER (for daftar.html) -----
function handleRegistrationSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const institution = document.getElementById('regInstitution').value.trim();
    const regType = document.getElementById('regType').value;
    const itemName = document.getElementById('regItemName').value;

    if (!name || !email || !phone || !institution) {
        showToast('Harap isi semua kolom pendaftaran!', 'error');
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Format email tidak valid!', 'error');
        return;
    }

    // Simulasi pengiriman data
    var typeLabel = regType === 'lomba' ? 'Lomba' : 'Mata Acara';
    var successMsg = itemName
        ? 'Pendaftaran ' + typeLabel + ' "' + itemName + '" berhasil dikirim!'
        : 'Pendaftaran berhasil dikirim!';

    showToast(successMsg, 'success');

    // Reset form
    document.getElementById('registrationForm').reset();
    document.getElementById('regType').value = '';
    document.getElementById('regItemName').value = '';

    // Update info banner
    var infoDiv = document.getElementById('selectedItemInfo');
    if (infoDiv) {
        infoDiv.style.display = 'none';
    }
    var formHeading = document.getElementById('formHeading');
    if (formHeading) {
        formHeading.innerHTML = '<i class="fa-solid fa-clipboard-list"></i> Form Pendaftaran';
    }
}

// ----- INITIALIZE REGISTRATION PAGE (daftar.html) -----
function initRegistrationPage() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type'); // 'acara' or 'lomba'
    const nama = params.get('nama'); // event/competition name

    const regTypeInput = document.getElementById('regType');
    const regItemNameInput = document.getElementById('regItemName');
    const infoDiv = document.getElementById('selectedItemInfo');
    const infoText = document.getElementById('selectedItemText');
    const formHeading = document.getElementById('formHeading');
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');

    if (type && nama) {
        // Set hidden fields
        if (regTypeInput) regTypeInput.value = type;
        if (regItemNameInput) regItemNameInput.value = decodeURIComponent(nama);

        var typeLabel = type === 'lomba' ? 'Lomba' : 'Mata Acara';
        var decodedNama = decodeURIComponent(nama);

        // Show info banner
        if (infoDiv && infoText) {
            infoDiv.style.display = 'block';
            infoText.textContent = 'Anda mendaftar untuk ' + typeLabel + ': ' + decodedNama;
        }

        // Update form heading
        if (formHeading) {
            formHeading.innerHTML = '<i class="fa-solid fa-clipboard-list"></i> Pendaftaran ' + typeLabel + ': <span>' + decodedNama + '</span>';
        }

        // Update page header
        if (pageTitle) {
            pageTitle.textContent = 'Pendaftaran ' + typeLabel;
        }
        if (pageSubtitle) {
            pageSubtitle.textContent = 'Isi data diri Anda untuk mendaftar pada ' + typeLabel.toLowerCase() + ' "' + decodedNama + '".';
        }
    } else if (type) {
        // Only type is provided, no specific name
        if (regTypeInput) regTypeInput.value = type;
        var typeLabel = type === 'lomba' ? 'Lomba' : 'Mata Acara';
        if (pageTitle) pageTitle.textContent = 'Pendaftaran ' + typeLabel;
        if (pageSubtitle) pageSubtitle.textContent = 'Isi data diri Anda untuk mendaftar pada ' + typeLabel.toLowerCase() + ' pilihan Anda.';
    }
}

// ----- ACTIVE NAV LINK DETECTION -----
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && currentPath.endsWith(href)) {
            link.classList.add('active');
        }
    });

    // Jika tidak ada yang cocok, coba berdasarkan data-page
    if (!document.querySelector('.nav-links a.active')) {
        const pageName = currentPath.split('/').pop().replace('.html', '');
        navLinks.forEach(link => {
            const dataPage = link.getAttribute('data-page');
            if (dataPage === pageName) {
                link.classList.add('active');
            }
        });
    }

    // Jika halaman index.html (beranda), tidak ada link aktif – biarkan kosong
}

// ----- INIT ON PAGE LOAD -----
document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLink();
    initRegistrationPage();
});