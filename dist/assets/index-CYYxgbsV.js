(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();const E="http://localhost:3000/api";class d{static async request(e,s={}){const o=localStorage.getItem("token"),r={...s,headers:{"Content-Type":"application/json",...s.headers,...o&&{Authorization:`Bearer ${o}`}}};try{const t=await fetch(`${E}${e}`,r),c=await t.json();if(!t.ok)throw new Error(c.message||"Error en la petición");return c}catch(t){throw console.error("API Error:",t),t}}static async register(e){return this.request("/auth/register",{method:"POST",body:JSON.stringify(e)})}static async login(e){const s=await this.request("/auth/login",{method:"POST",body:JSON.stringify(e)});return s.success&&s.data.token&&(localStorage.setItem("token",s.data.token),localStorage.setItem("user",JSON.stringify(s.data.usuario))),s}static async getProgramas(e={}){const s=new URLSearchParams(e);return this.request(`/programas?${s}`)}static async getPrograma(e){return this.request(`/programas/${e}`)}static async getPerfil(){return this.request("/usuario/perfil")}static async getKardex(){return this.request("/usuario/kardex")}static async getInscripciones(){return this.request("/usuario/inscripciones")}static async crearInscripcion(e){return this.request("/inscripciones",{method:"POST",body:JSON.stringify({id_programa:e})})}static logout(){localStorage.removeItem("token"),localStorage.removeItem("user")}static isAuthenticated(){return!!localStorage.getItem("token")}static getCurrentUser(){const e=localStorage.getItem("user");return e?JSON.parse(e):null}}class I{constructor(){this.routes={},this.currentPage="home"}register(e,s){this.routes[e]=s}async navigate(e){this.routes[e]&&(this.currentPage=e,await this.routes[e](),this.updateNavigation(),window.scrollTo({top:0,behavior:"smooth"}))}updateNavigation(){document.querySelectorAll(".nav-link").forEach(e=>{e.classList.remove("active"),e.dataset.page===this.currentPage&&e.classList.add("active")})}}const n=new I,i={showLoading(){document.getElementById("loadingOverlay").style.display="flex"},hideLoading(){document.getElementById("loadingOverlay").style.display="none"},showToast(a,e="info"){const s=document.getElementById("toastContainer"),o=document.createElement("div");o.className=`toast toast-${e}`,o.innerHTML=`
            <div class="toast-content">
                <span class="toast-icon">${e==="success"?"✓":e==="error"?"✕":"ℹ"}</span>
                <span class="toast-message">${a}</span>
            </div>
        `,s.appendChild(o),setTimeout(()=>{o.classList.add("show")},100),setTimeout(()=>{o.classList.remove("show"),setTimeout(()=>o.remove(),300)},4e3)},render(a){document.getElementById("mainContent").innerHTML=a,B()}},g={home:()=>{i.render(`
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
        `),C()},nosotros:()=>{i.render(`
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
        `)},programas:async()=>{i.showLoading();try{const e=(await d.getProgramas()).data||[];i.render(`
                <section class="page-header">
                    <div class="container">
                        <h1 class="page-title gradient-text">Nuestros Programas</h1>
                        <p class="page-subtitle">Descubre nuestra oferta académica de excelencia</p>
                    </div>
                </section>

                <section class="programs-section">
                    <div class="container">
                        <div class="programs-grid">
                            ${e.map(s=>`
                                <div class="program-card glass">
                                    <div class="program-header">
                                        <span class="program-badge">${s.modalidad}</span>
                                        <span class="program-price">Bs. ${s.costo.toLocaleString()}</span>
                                    </div>
                                    <h3 class="program-title">${s.nombre}</h3>
                                    <p class="program-description">${s.descripcion||"Programa de alto nivel académico diseñado para profesionales que buscan especializarse y destacar en su campo."}</p>
                                    <ul class="program-features">
                                        <li><span class="icon">📅</span> Duración: ${s.duracion}</li>
                                        <li><span class="icon">🎓</span> Modalidad: ${s.modalidad}</li>
                                        <li><span class="icon">👥</span> Cupos: ${s.cupos_disponibles} disponibles</li>
                                    </ul>
                                    <button class="btn-primary full-width" onclick="inscribirsePrograma(${s.id})">
                                        <span>Inscribirse Ahora</span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                    </button>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </section>
            `)}catch(a){i.showToast("Error al cargar programas: "+a.message,"error"),i.render(`
                <section class="error-section">
                    <div class="container">
                        <h2>Error al cargar programas</h2>
                        <p>Por favor, intenta nuevamente más tarde.</p>
                    </div>
                </section>
            `)}finally{i.hideLoading()}},investigacion:()=>{i.render(`
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
        `)},contacto:()=>{i.render(`
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
        `),document.getElementById("contactForm").addEventListener("submit",a=>{a.preventDefault(),i.showToast("Mensaje enviado exitosamente. Te contactaremos pronto.","success"),a.target.reset()})},login:()=>{i.render(`
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
        `),document.getElementById("loginForm").addEventListener("submit",async a=>{a.preventDefault(),i.showLoading();try{const e=await d.login({correo:document.getElementById("loginEmail").value,contrasena:document.getElementById("loginPassword").value});i.showToast("🎉 ¡Bienvenido! "+e.data.usuario.nombre,"success"),u(),n.navigate("dashboard")}catch(e){i.showToast("❌ Error: "+e.message,"error")}finally{i.hideLoading()}})},register:()=>{i.render(`
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
        `),document.getElementById("registerForm").addEventListener("submit",async a=>{a.preventDefault(),i.showLoading();try{const e=await d.register({nombre:document.getElementById("regNombre").value,apellido:document.getElementById("regApellido").value,correo:document.getElementById("regEmail").value,telefono:document.getElementById("regTelefono").value,contrasena:document.getElementById("regPassword").value});i.showToast("¡Cuenta creada exitosamente!","success"),localStorage.setItem("token",e.data.token),localStorage.setItem("user",JSON.stringify(e.data.usuario)),u(),n.navigate("dashboard")}catch(e){i.showToast("Error: "+e.message,"error")}finally{i.hideLoading()}})},dashboard:async()=>{var a,e,s;if(!d.isAuthenticated()){i.showToast("Debes iniciar sesión primero","warning"),n.navigate("login");return}i.showLoading();try{const[o,r,t]=await Promise.all([d.getPerfil(),d.getKardex(),d.getInscripciones()]),c=o.data,v=r.data,h=t.data;i.render(`
                <section class="dashboard-section">
                    <div class="container">
                        <div class="dashboard-header">
                            <div>
                                <h1>👋 Bienvenido, ${c.nombre} ${c.apellido}</h1>
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
                                    <div class="dash-stat-value">${((a=v.estadisticas)==null?void 0:a.materias_cursadas)||0}</div>
                                    <div class="dash-stat-label">Materias Cursadas</div>
                                </div>
                            </div>
                            <div class="dash-stat-card glass">
                                <div class="dash-stat-icon">📊</div>
                                <div class="dash-stat-info">
                                    <div class="dash-stat-value">${((e=v.estadisticas)==null?void 0:e.promedio)||"0.00"}</div>
                                    <div class="dash-stat-label">Promedio General</div>
                                </div>
                            </div>
                            <div class="dash-stat-card glass">
                                <div class="dash-stat-icon">🎓</div>
                                <div class="dash-stat-info">
                                    <div class="dash-stat-value">${((s=v.estadisticas)==null?void 0:s.creditos_totales)||0}</div>
                                    <div class="dash-stat-label">Créditos Acumulados</div>
                                </div>
                            </div>
                            <div class="dash-stat-card glass">
                                <div class="dash-stat-icon">📝</div>
                                <div class="dash-stat-info">
                                    <div class="dash-stat-value">${(h==null?void 0:h.length)||0}</div>
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
                                        <span class="profile-value">${c.nombre} ${c.apellido}</span>
                                    </div>
                                    <div class="profile-item">
                                        <span class="profile-label">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="2"/>
                                                <polyline points="22,6 12,13 2,6" stroke-width="2"/>
                                            </svg>
                                            Correo:
                                        </span>
                                        <span class="profile-value">${c.correo}</span>
                                    </div>
                                    <div class="profile-item">
                                        <span class="profile-label">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="display: inline; margin-right: 0.5rem;">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-width="2"/>
                                            </svg>
                                            Teléfono:
                                        </span>
                                        <span class="profile-value">${c.telefono||"No especificado"}</span>
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
                                        <span class="profile-value badge">${c.nombre_rol}</span>
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
                                ${h&&h.length>0?`
                                    <div class="inscripciones-list">
                                        ${h.map(l=>`
                                            <div class="inscripcion-item">
                                                <div class="inscripcion-header">
                                                    <h4>🎓 ${l.programa}</h4>
                                                    <span class="badge badge-${l.estado.toLowerCase()}">${l.estado}</span>
                                                </div>
                                                <p class="inscripcion-info">
                                                    <span>📅 ${new Date(l.fecha_inscripcion).toLocaleDateString("es-BO")}</span>
                                                    <span>🎯 ${l.modalidad}</span>
                                                </p>
                                            </div>
                                        `).join("")}
                                    </div>
                                `:`
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
                                ${v.kardex&&v.kardex.length>0?`
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
                                                ${v.kardex.map(l=>`
                                                    <tr>
                                                        <td>📖 ${l.asignatura}</td>
                                                        <td>${l.codigo}</td>
                                                        <td>${l.creditos}</td>
                                                        <td><span class="grade">${l.calificacion}</span></td>
                                                        <td>${l.semestre} - ${l.gestion}</td>
                                                    </tr>
                                                `).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                `:`
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
            `)}catch(o){i.showToast("Error al cargar dashboard: "+o.message,"error"),n.navigate("login")}finally{i.hideLoading()}}};window.router=n;window.inscribirsePrograma=async a=>{if(!d.isAuthenticated()){i.showToast("Debes iniciar sesión para inscribirte","warning"),n.navigate("login");return}if(confirm("¿Estás seguro de que deseas inscribirte en este programa?")){i.showLoading();try{await d.crearInscripcion(a),i.showToast("¡Inscripción creada exitosamente! Procede con el pago para confirmarla.","success"),setTimeout(()=>{n.navigate("dashboard")},2e3)}catch(e){i.showToast("Error: "+e.message,"error")}finally{i.hideLoading()}}};window.logout=()=>{d.logout(),i.showToast("✅ Sesión cerrada exitosamente","success"),u(),n.navigate("home")};function u(){const a=d.isAuthenticated(),e=document.getElementById("loginNavItem"),s=document.getElementById("dashboardNavItem"),o=document.getElementById("ctaBtn");e&&(e.style.display=a?"none":"block"),s&&(s.style.display=a?"block":"none"),o&&(o.style.display=a?"none":"inline-block")}function C(){document.querySelectorAll(".stat-number").forEach(e=>{const s=parseInt(e.dataset.target);let o=0;const r=s/50,t=setInterval(()=>{o+=r,o>=s?(e.textContent=s,clearInterval(t)):e.textContent=Math.floor(o)},30)})}function B(){const a=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&s.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll(".fade-in, .stat-card, .feature-card, .program-card").forEach(e=>{a.observe(e)})}function L(){const a=document.getElementById("bgCanvas");if(!a)return;const e=a.getContext("2d");a.width=window.innerWidth,a.height=window.innerHeight;const s=[],o=100;for(let t=0;t<o;t++)s.push({x:Math.random()*a.width,y:Math.random()*a.height,z:Math.random()*1500,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,vz:Math.random()*2+1});function r(){e.fillStyle="rgba(15, 23, 42, 0.1)",e.fillRect(0,0,a.width,a.height),s.forEach(t=>{t.x+=t.vx,t.y+=t.vy,t.z-=t.vz,t.z<=0&&(t.z=1500,t.x=Math.random()*a.width,t.y=Math.random()*a.height),(t.x<0||t.x>a.width)&&(t.vx*=-1),(t.y<0||t.y>a.height)&&(t.vy*=-1);const c=1e3/(1e3+t.z),v=(t.x-a.width/2)*c+a.width/2,h=(t.y-a.height/2)*c+a.height/2,l=(1-t.z/1500)*3,w=1-t.z/1500;e.fillStyle=`rgba(147, 51, 234, ${w})`,e.beginPath(),e.arc(v,h,l,0,Math.PI*2),e.fill(),s.forEach(p=>{const m=t.x-p.x,y=t.y-p.y,f=Math.sqrt(m*m+y*y);if(f<150){e.strokeStyle=`rgba(147, 51, 234, ${(1-f/150)*.2})`,e.lineWidth=1,e.beginPath(),e.moveTo(v,h);const b=1e3/(1e3+p.z),x=(p.x-a.width/2)*b+a.width/2,k=(p.y-a.height/2)*b+a.height/2;e.lineTo(x,k),e.stroke()}})}),requestAnimationFrame(r)}r(),window.addEventListener("resize",()=>{a.width=window.innerWidth,a.height=window.innerHeight})}document.addEventListener("DOMContentLoaded",()=>{n.register("home",g.home),n.register("nosotros",g.nosotros),n.register("programas",g.programas),n.register("investigacion",g.investigacion),n.register("contacto",g.contacto),n.register("login",g.login),n.register("register",g.register),n.register("dashboard",g.dashboard),document.querySelectorAll(".nav-link").forEach(s=>{s.addEventListener("click",o=>{o.preventDefault(),n.navigate(s.dataset.page)})});const a=document.getElementById("mobileToggle"),e=document.getElementById("navMenu");a&&e&&a.addEventListener("click",()=>{e.classList.toggle("active"),a.classList.toggle("active")}),u(),n.navigate("home"),L(),window.addEventListener("scroll",()=>{const s=document.getElementById("navbar");window.scrollY>50?s.classList.add("scrolled"):s.classList.remove("scrolled")})});
