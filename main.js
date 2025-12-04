// API Configuration
const API_URL = 'http://localhost:3000/api';

// API Client
class API {
    static async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
                ...(token && { Authorization: `Bearer ${token}` })
            }
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en la petición');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    static async login(credentials) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });

        if (response.success && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.usuario));
        }

        return response;
    }

    static async getProgramas(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.request(`/programas?${params}`);
    }

    static async getPrograma(id) {
        return this.request(`/programas/${id}`);
    }

    static async getPerfil() {
        return this.request('/usuario/perfil');
    }

    static async getKardex() {
        return this.request('/usuario/kardex');
    }

    static async getInscripciones() {
        return this.request('/usuario/inscripciones');
    }

    static async crearInscripcion(idPrograma) {
        return this.request('/inscripciones', {
            method: 'POST',
            body: JSON.stringify({ id_programa: idPrograma })
        });
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    static getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
}

// Router
class Router {
    constructor() {
        this.routes = {};
        this.currentPage = 'home';
    }

    register(name, handler) {
        this.routes[name] = handler;
    }

    async navigate(pageName) {
        if (this.routes[pageName]) {
            this.currentPage = pageName;
            await this.routes[pageName]();
            this.updateNavigation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    updateNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === this.currentPage) {
                link.classList.add('active');
            }
        });
    }
}

const router = new Router();

// UI Utilities
const UI = {
    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    },

    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    },

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    render(html) {
        document.getElementById('mainContent').innerHTML = html;
        // Reinicializar animaciones
        initAnimations();
    }
};

// Pages
const Pages = {
    home: () => {
        UI.render(`
            <section class="hero">
                <div class="container">
                    <div class="hero-content fade-in">
                        <h1 class="hero-title">
                            Bienvenido al <span class="gradient-text">Posgrado UNSXX</span>
                        </h1>
                        <p class="hero-subtitle">Excelencia Académica e Investigación Científica de Vanguardia</p>
                        <p class="hero-description">
                            Formamos profesionales de alto nivel con programas de maestría, doctorado y diplomados 
                            que transforman el futuro de Bolivia y América Latina. Únete a nuestra comunidad académica 
                            y alcanza tus metas profesionales.
                        </p>
                        <div class="hero-buttons">
                            <button class="btn-primary" onclick="router.navigate('programas')">
                                <span>Explorar Programas</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                            <button class="btn-secondary" onclick="router.navigate('register')">Inscríbete Ahora</button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="stats">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">🎓</div>
                            <div class="stat-number" data-target="15">0</div>
                            <div class="stat-label">Programas de Posgrado</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">👨‍🎓</div>
                            <div class="stat-number" data-target="2500">0</div>
                            <div class="stat-label">Estudiantes Activos</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🔬</div>
                            <div class="stat-number" data-target="50">0</div>
                            <div class="stat-label">Proyectos de Investigación</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🏆</div>
                            <div class="stat-number" data-target="98">0</div>
                            <div class="stat-label">% Satisfacción</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features">
                <div class="container">
                    <h2 class="section-title">¿Por qué elegir UNSXX?</h2>
                    <div class="features-grid">
                        <div class="feature-card glass">
                            <div class="feature-icon">🎯</div>
                            <h3>Excelencia Académica</h3>
                            <p>Programas acreditados internacionalmente con docentes altamente calificados</p>
                        </div>
                        <div class="feature-card glass">
                            <div class="feature-icon">💼</div>
                            <h3>Orientación Profesional</h3>
                            <p>Formación práctica orientada al mercado laboral actual</p>
                        </div>
                        <div class="feature-card glass">
                            <div class="feature-icon">🌍</div>
                            <h3>Visión Global</h3>
                            <p>Convenios internacionales y programas de intercambio</p>
                        </div>
                        <div class="feature-card glass">
                            <div class="feature-icon">🔬</div>
                            <h3>Investigación</h3>
                            <p>Centros de investigación de vanguardia y publicaciones científicas</p>
                        </div>
                    </div>
                </div>
            </section>
        `);
        animateStats();
    },

    nosotros: () => {
        UI.render(`
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title gradient-text">Nosotros</h1>
                    <p class="page-subtitle">Conoce nuestra historia, misión y valores</p>
                </div>
            </section>

            <section class="content-section">
                <div class="container">
                    <div class="about-grid">
                        <div class="about-card glass">
                            <div class="about-icon">🎯</div>
                            <h2>Misión</h2>
                            <p>
                                Formar profesionales de excelencia con sólidos conocimientos científicos, tecnológicos y humanísticos, 
                                capaces de generar conocimiento innovador y contribuir al desarrollo sostenible de la sociedad boliviana 
                                y la región, mediante programas de posgrado de alta calidad académica.
                            </p>
                        </div>
                        <div class="about-card glass">
                            <div class="about-icon">🔭</div>
                            <h2>Visión</h2>
                            <p>
                                Ser reconocidos como la institución líder en formación de posgrado en Bolivia, destacando por la 
                                excelencia académica, la investigación científica de impacto y la formación integral de profesionales 
                                comprometidos con la transformación social y el desarrollo del país.
                            </p>
                        </div>
                    </div>

                    <div class="values-section">
                        <h2 class="section-title">Nuestros Valores</h2>
                        <div class="values-grid">
                            <div class="value-item">
                                <span class="value-icon">✨</span>
                                <h3>Excelencia</h3>
                                <p>Compromiso con la calidad en todos nuestros procesos académicos</p>
                            </div>
                            <div class="value-item">
                                <span class="value-icon">🤝</span>
                                <h3>Integridad</h3>
                                <p>Actuamos con honestidad, transparencia y ética profesional</p>
                            </div>
                            <div class="value-item">
                                <span class="value-icon">🌱</span>
                                <h3>Innovación</h3>
                                <p>Fomentamos la creatividad y el pensamiento crítico</p>
                            </div>
                            <div class="value-item">
                                <span class="value-icon">🌍</span>
                                <h3>Responsabilidad Social</h3>
                                <p>Comprometidos con el desarrollo sostenible de nuestra sociedad</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `);
    },

    programas: async () => {
        UI.showLoading();
        try {
            const response = await API.getProgramas();
            const programas = response.data || [];

            UI.render(`
                <section class="page-header">
                    <div class="container">
                        <h1 class="page-title gradient-text">Nuestros Programas</h1>
                        <p class="page-subtitle">Descubre nuestra oferta académica de excelencia</p>
                    </div>
                </section>

                <section class="programs-section">
                    <div class="container">
                        <div class="programs-grid">
                            ${programas.map(programa => `
                                <div class="program-card glass">
                                    <div class="program-header">
                                        <span class="program-badge">${programa.modalidad}</span>
                                        <span class="program-price">Bs. ${programa.costo.toLocaleString()}</span>
                                    </div>
                                    <h3 class="program-title">${programa.nombre}</h3>
                                    <p class="program-description">${programa.descripcion || 'Programa de alto nivel académico diseñado para profesionales que buscan especializarse y destacar en su campo.'}</p>
                                    <ul class="program-features">
                                        <li><span class="icon">📅</span> Duración: ${programa.duracion}</li>
                                        <li><span class="icon">🎓</span> Modalidad: ${programa.modalidad}</li>
                                        <li><span class="icon">👥</span> Cupos: ${programa.cupos_disponibles} disponibles</li>
                                    </ul>
                                    <button class="btn-primary full-width" onclick="inscribirsePrograma(${programa.id})">
                                        <span>Inscribirse Ahora</span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `);
        } catch (error) {
            UI.showToast('Error al cargar programas: ' + error.message, 'error');
            UI.render(`
                <section class="error-section">
                    <div class="container">
                        <h2>Error al cargar programas</h2>
                        <p>Por favor, intenta nuevamente más tarde.</p>
                    </div>
                </section>
            `);
        } finally {
            UI.hideLoading();
        }
    },

    investigacion: () => {
        UI.render(`
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title gradient-text">Investigación</h1>
                    <p class="page-subtitle">Generando conocimiento para transformar la sociedad</p>
                </div>
            </section>

            <section class="content-section">
                <div class="container">
                    <div class="research-intro glass">
                        <p>
                            En el Posgrado UNSXX, la investigación es el pilar fundamental de nuestra actividad académica. 
                            Contamos con líneas de investigación consolidadas y grupos de trabajo interdisciplinarios que 
                            abordan los desafíos más importantes de nuestra región.
                        </p>
                    </div>

                    <h2 class="section-title">Líneas de Investigación</h2>
                    <div class="research-grid">
                        <div class="research-card glass">
                            <div class="research-icon">💻</div>
                            <h3>Tecnología e Innovación</h3>
                            <p>Desarrollo de soluciones tecnológicas aplicadas a problemas reales del sector productivo y social.</p>
                            <ul>
                                <li>Inteligencia Artificial</li>
                                <li>Internet de las Cosas (IoT)</li>
                                <li>Desarrollo de Software</li>
                            </ul>
                        </div>
                        <div class="research-card glass">
                            <div class="research-icon">🏭</div>
                            <h3>Gestión Empresarial</h3>
                            <p>Investigación en modelos de gestión innovadores para empresas bolivianas.</p>
                            <ul>
                                <li>Emprendimiento</li>
                                <li>Gestión del Talento</li>
                                <li>Responsabilidad Social</li>
                            </ul>
                        </div>
                        <div class="research-card glass">
                            <div class="research-icon">🌱</div>
                            <h3>Desarrollo Sostenible</h3>
                            <p>Estudios orientados al desarrollo económico, social y ambiental sostenible.</p>
                            <ul>
                                <li>Energías Renovables</li>
                                <li>Gestión Ambiental</li>
                                <li>Economía Circular</li>
                            </ul>
                        </div>
                        <div class="research-card glass">
                            <div class="research-icon">⚖️</div>
                            <h3>Ciencias Sociales</h3>
                            <p>Análisis de fenómenos sociales, políticos y culturales de Bolivia y la región.</p>
                            <ul>
                                <li>Políticas Públicas</li>
                                <li>Desarrollo Comunitario</li>
                                <li>Educación</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `);
    },

    contacto: () => {
        UI.render(`
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title gradient-text">Contacto</h1>
                    <p class="page-subtitle">Estamos aquí para ayudarte</p>
                </div>
            </section>

            <section class="contact-section">
                <div class="container">
                    <div class="contact-grid">
                        <div class="contact-info">
                            <h2>Información de Contacto</h2>
                            <div class="contact-item">
                                <div class="contact-icon">📍</div>
                                <div>
                                    <h3>Dirección</h3>
                                    <p>Av. Universitaria s/n<br>Llallagua, Potosí - Bolivia</p>
                                </div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">📞</div>
                                <div>
                                    <h3>Teléfono</h3>
                                    <p>+591 2 642-3456<br>+591 2 642-3457</p>
                                </div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">📧</div>
                                <div>
                                    <h3>Email</h3>
                                    <p>posgrado@unsxx.edu.bo<br>info@postgradounsxx.edu.bo</p>
                                </div>
                            </div>
                            <div class="contact-item">
                                <div class="contact-icon">🕐</div>
                                <div>
                                    <h3>Horario de Atención</h3>
                                    <p>Lunes a Viernes: 8:00 - 18:00<br>Sábados: 9:00 - 13:00</p>
                                </div>
                            </div>
                        </div>

                        <div class="contact-form-container glass">
                            <h2>Envíanos un Mensaje</h2>
                            <form id="contactForm" class="contact-form">
                                <div class="form-group">
                                    <label>Nombre Completo</label>
                                    <input type="text" required placeholder="Tu nombre">
                                </div>
                                <div class="form-group">
                                    <label>Correo Electrónico</label>
                                    <input type="email" required placeholder="tu@correo.com">
                                </div>
                                <div class="form-group">
                                    <label>Teléfono</label>
                                    <input type="tel" placeholder="+591 ...">
                                </div>
                                <div class="form-group">
                                    <label>Mensaje</label>
                                    <textarea rows="5" required placeholder="¿En qué podemos ayudarte?"></textarea>
                                </div>
                                <button type="submit" class="btn-primary full-width">Enviar Mensaje</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `);

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            UI.showToast('Mensaje enviado exitosamente. Te contactaremos pronto.', 'success');
            e.target.reset();
        });
    },

    login: () => {
        UI.render(`
            <section class="auth-section">
                <div class="container">
                    <div class="auth-container">
                        <div class="auth-card glass">
                            <div style="text-align: center; margin-bottom: 2rem;">
                                <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                                    🔐
                                </div>
                                <h2>Iniciar Sesión</h2>
                                <p class="auth-subtitle">Accede a tu panel académico de excelencia</p>
                            </div>
                            <form id="loginForm" class="auth-form">
                                <div class="form-group">
                                    <label>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="2"/>
                                            <polyline points="22,6 12,13 2,6" stroke-width="2"/>
                                        </svg>
                                        Correo Electrónico
                                    </label>
                                    <input type="email" id="loginEmail" required placeholder="tu@correo.com">
                                </div>
                                <div class="form-group">
                                    <label>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2"/>
                                        </svg>
                                        Contraseña
                                    </label>
                                    <input type="password" id="loginPassword" required placeholder="••••••••">
                                </div>
                                <button type="submit" class="btn-primary full-width" style="margin-top: 1rem;">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke-width="2"/>
                                        <polyline points="10 17 15 12 10 7" stroke-width="2"/>
                                        <line x1="15" y1="12" x2="3" y2="12" stroke-width="2"/>
                                    </svg>
                                    <span>Iniciar Sesión</span>
                                </button>
                            </form>
                            <p class="auth-footer">
                                ¿No tienes cuenta? <a href="#" onclick="router.navigate('register')">Regístrate aquí</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `);

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            UI.showLoading();

            try {
                const response = await API.login({
                    correo: document.getElementById('loginEmail').value,
                    contrasena: document.getElementById('loginPassword').value
                });

                UI.showToast('🎉 ¡Bienvenido! ' + response.data.usuario.nombre, 'success');
                updateAuthUI();
                router.navigate('dashboard');
            } catch (error) {
                UI.showToast('❌ Error: ' + error.message, 'error');
            } finally {
                UI.hideLoading();
            }
        });
    },

    register: () => {
        UI.render(`
            <section class="auth-section">
                <div class="container">
                    <div class="auth-container">
                        <div class="auth-card glass">
                            <div style="text-align: center; margin-bottom: 2rem;">
                                <div style="width: 80px; height: 80px; margin: 0 auto 1rem; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                                    👤
                                </div>
                                <h2>Crear Cuenta</h2>
                                <p class="auth-subtitle">Únete a nuestra comunidad académica de excelencia</p>
                            </div>
                            <form id="registerForm" class="auth-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2"/>
                                                <circle cx="12" cy="7" r="4" stroke-width="2"/>
                                            </svg>
                                            Nombre
                                        </label>
                                        <input type="text" id="regNombre" required placeholder="Tu nombre">
                                    </div>
                                    <div class="form-group">
                                        <label>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2"/>
                                                <circle cx="12" cy="7" r="4" stroke-width="2"/>
                                            </svg>
                                            Apellido
                                        </label>
                                        <input type="text" id="regApellido" required placeholder="Tu apellido">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="2"/>
                                            <polyline points="22,6 12,13 2,6" stroke-width="2"/>
                                        </svg>
                                        Correo Electrónico
                                    </label>
                                    <input type="email" id="regEmail" required placeholder="tu@correo.com">
                                </div>
                                <div class="form-group">
                                    <label>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-width="2"/>
                                        </svg>
                                        Teléfono
                                    </label>
                                    <input type="tel" id="regTelefono" placeholder="+591 ...">
                                </div>
                                <div class="form-group">
                                    <label>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2"/>
                                        </svg>
                                        Contraseña
                                    </label>
                                    <input type="password" id="regPassword" required minlength="6" placeholder="Mínimo 6 caracteres">
                                </div>
                                <button type="submit" class="btn-primary full-width" style="margin-top: 1rem;">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="2"/>
                                        <circle cx="8.5" cy="7" r="4" stroke-width="2"/>
                                        <line x1="20" y1="8" x2="20" y2="14" stroke-width="2"/>
                                        <line x1="23" y1="11" x2="17" y2="11" stroke-width="2"/>
                                    </svg>
                                    <span>Crear Mi Cuenta</span>
                                </button>
                            </form>
                            <p class="auth-footer">
                                ¿Ya tienes cuenta? <a href="#" onclick="router.navigate('login')">Inicia sesión aquí</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `);

        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            UI.showLoading();

            try {
                const response = await API.register({
                    nombre: document.getElementById('regNombre').value,
                    apellido: document.getElementById('regApellido').value,
                    correo: document.getElementById('regEmail').value,
                    telefono: document.getElementById('regTelefono').value,
                    contrasena: document.getElementById('regPassword').value
                });

                UI.showToast('¡Cuenta creada exitosamente!', 'success');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.usuario));
                updateAuthUI();
                router.navigate('dashboard');
            } catch (error) {
                UI.showToast('Error: ' + error.message, 'error');
            } finally {
                UI.hideLoading();
            }
        });
    },

    dashboard: async () => {
        if (!API.isAuthenticated()) {
            UI.showToast('Debes iniciar sesión primero', 'warning');
            router.navigate('login');
            return;
        }

        UI.showLoading();
        try {
            const [perfilRes, kardexRes, inscripcionesRes] = await Promise.all([
                API.getPerfil(),
                API.getKardex(),
                API.getInscripciones()
            ]);

            const perfil = perfilRes.data;
            const kardex = kardexRes.data;
            const inscripciones = inscripcionesRes.data;

            UI.render(`
                <section class="dashboard-section">
                    <div class="container">
                        <div class="dashboard-header">
                            <div>
                                <h1>👋 Bienvenido, ${perfil.nombre} ${perfil.apellido}</h1>
                                <p class="dashboard-subtitle">📊 Panel de Control Académico</p>
                            </div>
                            <button class="btn-secondary" onclick="logout()">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke-width="2"/>
                                    <polyline points="16 17 21 12 16 7" stroke-width="2"/>
                                    <line x1="21" y1="12" x2="9" y2="12" stroke-width="2"/>
                                </svg>
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>

                        <div class="dashboard-stats">
                            <div class="dash-stat-card glass">
                                <div class="dash-stat-icon">📚</div>
                                <div class="dash-stat-info">
                                    <div class="dash-stat-value">${kardex.estadisticas?.materias_cursadas || 0}</div>
                                    <div class="dash-stat-label">Materias Cursadas</div>
                                </div>
                            </div>
                            <div class="dash-stat-card glass">
                                <div class="dash-stat-icon">📊</div>
                                <div class="dash-stat-info">
                                    <div class="dash-stat-value">${kardex.estadisticas?.promedio || '0.00'}</div>
                                    <div class="dash-stat-label">Promedio General</div>
                                </div>
                            </div>
                            <div class="dash-stat-card glass">
                                <div class="dash-stat-icon">🎓</div>
                                <div class="dash-stat-info">
                                    <div class="dash-stat-value">${kardex.estadisticas?.creditos_totales || 0}</div>
                                    <div class="dash-stat-label">Créditos Acumulados</div>
                                </div>
                            </div>
                            <div class="dash-stat-card glass">
                                <div class="dash-stat-icon">📝</div>
                                <div class="dash-stat-info">
                                    <div class="dash-stat-value">${inscripciones?.length || 0}</div>
                                    <div class="dash-stat-label">Inscripciones</div>
                                </div>
                            </div>
                        </div>

                        <div class="dashboard-grid">
                            <div class="dashboard-card glass">
                                <h3>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2"/>
                                        <circle cx="12" cy="7" r="4" stroke-width="2"/>
                                    </svg>
                                    Mi Perfil
                                </h3>
                                <div class="profile-info">
                                    <div class="profile-item">
                                        <span class="profile-label">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2"/>
                                                <circle cx="12" cy="7" r="4" stroke-width="2"/>
                                            </svg>
                                            Nombre:
                                        </span>
                                        <span class="profile-value">${perfil.nombre} ${perfil.apellido}</span>
                                    </div>
                                    <div class="profile-item">
                                        <span class="profile-label">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="2"/>
                                                <polyline points="22,6 12,13 2,6" stroke-width="2"/>
                                            </svg>
                                            Correo:
                                        </span>
                                        <span class="profile-value">${perfil.correo}</span>
                                    </div>
                                    <div class="profile-item">
                                        <span class="profile-label">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-width="2"/>
                                            </svg>
                                            Teléfono:
                                        </span>
                                        <span class="profile-value">${perfil.telefono || 'No especificado'}</span>
                                    </div>
                                    <div class="profile-item">
                                        <span class="profile-label">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="2"/>
                                                <circle cx="9" cy="7" r="4" stroke-width="2"/>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke-width="2"/>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke-width="2"/>
                                            </svg>
                                            Rol:
                                        </span>
                                        <span class="profile-value badge">${perfil.nombre_rol}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="dashboard-card glass">
                                <h3>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke-width="2"/>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke-width="2"/>
                                    </svg>
                                    Mis Inscripciones
                                </h3>
                                ${inscripciones && inscripciones.length > 0 ? `
                                    <div class="inscripciones-list">
                                        ${inscripciones.map(insc => `
                                            <div class="inscripcion-item">
                                                <div class="inscripcion-header">
                                                    <h4>🎓 ${insc.programa}</h4>
                                                    <span class="badge badge-${insc.estado.toLowerCase()}">${insc.estado}</span>
                                                </div>
                                                <p class="inscripcion-info">
                                                    <span>📅 ${new Date(insc.fecha_inscripcion).toLocaleDateString('es-BO')}</span>
                                                    <span>🎯 ${insc.modalidad}</span>
                                                </p>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : `
                                    <div class="empty-state">
                                        <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                                        <p>No tienes inscripciones activas</p>
                                        <button class="btn-primary" onclick="router.navigate('programas')">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke-width="2"/>
                                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke-width="2"/>
                                                <line x1="12" y1="22.08" x2="12" y2="12" stroke-width="2"/>
                                            </svg>
                                            <span>Ver Programas</span>
                                        </button>
                                    </div>
                                `}
                            </div>

                            <div class="dashboard-card glass full-width">
                                <h3>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2"/>
                                        <polyline points="14 2 14 8 20 8" stroke-width="2"/>
                                        <line x1="16" y1="13" x2="8" y2="13" stroke-width="2"/>
                                        <line x1="16" y1="17" x2="8" y2="17" stroke-width="2"/>
                                        <polyline points="10 9 9 9 8 9" stroke-width="2"/>
                                    </svg>
                                    Kardex Académico
                                </h3>
                                ${kardex.kardex && kardex.kardex.length > 0 ? `
                                    <div class="kardex-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Asignatura</th>
                                                    <th>Código</th>
                                                    <th>Créditos</th>
                                                    <th>Calificación</th>
                                                    <th>Semestre</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${kardex.kardex.map(item => `
                                                    <tr>
                                                        <td>📖 ${item.asignatura}</td>
                                                        <td>${item.codigo}</td>
                                                        <td>${item.creditos}</td>
                                                        <td><span class="grade">${item.calificacion}</span></td>
                                                        <td>${item.semestre} - ${item.gestion}</td>
                                                    </tr>
                                                `).join('')}
                                            </tbody>
                                        </table>
                                    </div>
                                ` : `
                                    <div class="empty-state">
                                        <div style="font-size: 3rem; margin-bottom: 1rem;">📋</div>
                                        <p>No hay calificaciones registradas aún</p>
                                        <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem;">
                                            Tus calificaciones aparecerán aquí una vez que completes tus primeras materias
                                        </p>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                </section>
            `);
        } catch (error) {
            UI.showToast('Error al cargar dashboard: ' + error.message, 'error');
            router.navigate('login');
        } finally {
            UI.hideLoading();
        }
    }
};

// Global Functions
window.router = router;

window.inscribirsePrograma = async (idPrograma) => {
    if (!API.isAuthenticated()) {
        UI.showToast('Debes iniciar sesión para inscribirte', 'warning');
        router.navigate('login');
        return;
    }

    if (!confirm('¿Estás seguro de que deseas inscribirte en este programa?')) {
        return;
    }

    UI.showLoading();
    try {
        await API.crearInscripcion(idPrograma);
        UI.showToast('¡Inscripción creada exitosamente! Procede con el pago para confirmarla.', 'success');
        setTimeout(() => {
            router.navigate('dashboard');
        }, 2000);
    } catch (error) {
        UI.showToast('Error: ' + error.message, 'error');
    } finally {
        UI.hideLoading();
    }
};

window.logout = () => {
    // Limpiar sesión
    API.logout();
    
    // Mostrar mensaje
    UI.showToast('✅ Sesión cerrada exitosamente', 'success');
    
    // Actualizar UI y navegar
    updateAuthUI();
    router.navigate('home');
};

function updateAuthUI() {
    const isAuth = API.isAuthenticated();
    const loginNav = document.getElementById('loginNavItem');
    const dashboardNav = document.getElementById('dashboardNavItem');
    const ctaBtn = document.getElementById('ctaBtn');
    
    // Actualizar visibilidad de items del menú
    if (loginNav) {
        loginNav.style.display = isAuth ? 'none' : 'block';
    }
    if (dashboardNav) {
        dashboardNav.style.display = isAuth ? 'block' : 'none';
    }
    
    // Ocultar botón CTA cuando está logueado (para evitar duplicado)
    if (ctaBtn) {
        ctaBtn.style.display = isAuth ? 'none' : 'inline-block';
    }
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .stat-card, .feature-card, .program-card').forEach(el => {
        observer.observe(el);
    });
}

// 3D Background Animation
function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * 1500,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            vz: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.z -= p.vz;

            if (p.z <= 0) {
                p.z = 1500;
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            const scale = 1000 / (1000 + p.z);
            const x2d = (p.x - canvas.width / 2) * scale + canvas.width / 2;
            const y2d = (p.y - canvas.height / 2) * scale + canvas.height / 2;
            const size = (1 - p.z / 1500) * 3;
            const opacity = 1 - p.z / 1500;

            ctx.fillStyle = `rgba(147, 51, 234, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
            ctx.fill();

            // Connect nearby particles
            particles.forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(147, 51, 234, ${(1 - distance / 150) * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(x2d, y2d);
                    const scale2 = 1000 / (1000 + p2.z);
                    const x2d2 = (p2.x - canvas.width / 2) * scale2 + canvas.width / 2;
                    const y2d2 = (p2.y - canvas.height / 2) * scale2 + canvas.height / 2;
                    ctx.lineTo(x2d2, y2d2);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Register routes
    router.register('home', Pages.home);
    router.register('nosotros', Pages.nosotros);
    router.register('programas', Pages.programas);
    router.register('investigacion', Pages.investigacion);
    router.register('contacto', Pages.contacto);
    router.register('login', Pages.login);
    router.register('register', Pages.register);
    router.register('dashboard', Pages.dashboard);

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            router.navigate(link.dataset.page);
        });
    });

    // Mobile menu
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Update auth UI
    updateAuthUI();

    // Load home page
    router.navigate('home');

    // 3D Background
    initBackground();

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
