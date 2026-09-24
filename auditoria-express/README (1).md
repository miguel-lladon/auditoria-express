# Auditoria Express - Balance Express

Aplicación React Next.js para evaluar la salud financiera de negocios en 5 minutos.

## 🚀 Desplegar en Vercel (Gratis)

### Opción 1: Desde GitHub (Recomendado)

1. **Crea un repositorio en GitHub:**
   - Ve a github.com/new
   - Crea un repo llamado "auditoria-express"

2. **Sube los archivos:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/auditoria-express.git
   git push -u origin main
   ```

3. **Conecta a Vercel:**
   - Ve a vercel.com
   - Haz login con tu cuenta GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio "auditoria-express"
   - Vercel detectará automáticamente que es un Next.js
   - Haz clic en "Deploy"
   - ¡Listo! Tu proyecto estará en línea en unos 2 minutos

### Opción 2: Desde Vercel CLI

```bash
npm install -g vercel
vercel
```

## 📦 Instalación Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abre http://localhost:3000 en el navegador
```

## 🎯 Características

✅ Auditoria de 13 preguntas en 5 minutos
✅ Evaluación de 4 mundos financieros
✅ Análisis de impacto económico automático
✅ PDF descargable
✅ Links a Calculadora, Instagram y WhatsApp
✅ Diseño premium con Tailwind CSS
✅ Responsive para mobile/desktop
✅ Totalmente gratuito en Vercel

## 🎨 Customización

- **Colores:** Edita `tailwind.config.js`
- **Preguntas:** Modifica el array `preguntas` en `app/page.tsx`
- **WhatsApp:** Cambia el número en los links (3855159169)
- **Instagram:** Actualiza el handle en los links (miguel.lladon.ok)
- **Google Sheets:** Cambia el ID del spreadsheet en `abrirCalculadora()`

## 📱 URL Final

Tu auditoria estará disponible en:
```
https://auditoria-express.vercel.app
```

(El nombre cambia según cómo llames el proyecto en Vercel)

## ✨ Bonus

- Los resultados se guardan en el navegador mientras contestan
- El PDF se descarga automáticamente con los datos
- Diseño completamente responsive
- Animaciones suaves sin librerías pesadas
- Acceso gratis eternamente en Vercel

---

¡Listo para producción! 🚀
