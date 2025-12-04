# Frontend Web - PosgradoUNSXX

Frontend profesional con efectos 3D conectado al backend API.

## 🚀 Características

- ✅ Efectos 3D con partículas animadas
- ✅ Diseño glassmorphism profesional
- ✅ Conexión con backend API
- ✅ Sistema de autenticación (Login/Registro)
- ✅ Panel de usuario con kardex
- ✅ Visualización de programas
- ✅ Sistema de inscripciones
- ✅ Responsive design

## 📋 Requisitos

- Node.js >= 16.x
- Backend corriendo en `http://localhost:3000`

## ⚙️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🎯 Funcionalidades

### Páginas Disponibles

1. **Inicio** - Landing page con efectos 3D
2. **Programas** - Lista de programas desde el backend
3. **Login** - Iniciar sesión
4. **Registro** - Crear cuenta nueva
5. **Dashboard** - Panel personal del usuario

### Flujo de Uso

1. **Ver programas** - Accede sin login
2. **Registrarse** - Crea una cuenta
3. **Iniciar sesión** - Accede con tus credenciales
4. **Dashboard** - Ve tu perfil, kardex e inscripciones
5. **Inscribirse** - Inscríbete en un programa

## 🔌 Conexión con Backend

El frontend se conecta automáticamente con:

```
http://localhost:3000/api
```

Asegúrate de que el backend esté corriendo antes de usar el frontend.

## 🎨 Características Visuales

- Fondo 3D con partículas animadas
- Glassmorphism en tarjetas y navbar
- Animaciones suaves
- Diseño responsive
- Notificaciones toast
- Loading overlay

## 📝 Estructura

```
frontend-web/
├── index.html          # HTML principal
├── main.js             # Lógica y API client
├── styles.css          # Estilos profesionales
├── vite.config.js      # Configuración Vite
└── public/
    └── assets/         # Imágenes
```

## 🔒 Autenticación

El sistema usa JWT tokens almacenados en localStorage:

- Token se guarda al hacer login/registro
- Se envía automáticamente en cada petición
- Se elimina al hacer logout

## 💡 Uso

1. **Asegúrate de que el backend esté corriendo:**

   ```bash
   cd ../backend
   npm run dev
   ```

2. **Inicia el frontend:**

   ```bash
   npm run dev
   ```

3. **Abre tu navegador en:** `http://localhost:5173`

## 🎓 Credenciales de Prueba

**Administrador:**

- Email: `admin@postgradounsxx.edu.bo`
- Contraseña: `Admin123!`

**O crea tu propia cuenta** usando el formulario de registro.

---

**Desarrollado para UNSXX - 2025**
