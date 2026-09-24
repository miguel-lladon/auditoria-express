# 🚀 COMO DESPLEGAR TU AUDITORIA EXPRESS EN VERCEL

## PASO A PASO (5 MINUTOS)

### PASO 1: Descarga los archivos
Todos los archivos están en `/outputs/`

Necesitas descargar:
- package.json
- next.config.js
- tsconfig.json
- tailwind.config.js
- postcss.config.js
- .gitignore
- README.md
- app/page.tsx (crear carpeta `app/`)
- app/layout.tsx (en la misma carpeta `app/`)
- app/globals.css (en la misma carpeta `app/`)

**Estructura final:**
```
auditoria-express/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

### PASO 2: Sube a GitHub (Gratis)

1. Ve a **github.com**
2. Haz login (o crea cuenta si no tienes)
3. Haz clic en **"+"** arriba a la derecha → **"New repository"**
4. Nombre: `auditoria-express`
5. Descripción: `Auditoria de salud financiera para negocios`
6. Selecciona **"Public"**
7. Haz clic en **"Create repository"**

8. Abre tu terminal (en la carpeta donde tengas los archivos):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/auditoria-express.git
git push -u origin main
```

(Reemplaza `TU_USUARIO` con tu usuario de GitHub)

### PASO 3: Conecta Vercel (Gratis)

1. Ve a **vercel.com**
2. Haz clic en **"Sign Up"** (o login si tienes cuenta)
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Vercel
5. Verás un botón **"New Project"** → Haz clic
6. Vercel va a mostrar tu repositorio `auditoria-express`
7. Haz clic en **"Select"**
8. Vercel detecta automáticamente que es Next.js ✅
9. Haz clic en **"Deploy"**

**¡LISTO!** En 2 minutos tu proyecto estará en línea.

### PASO 4: Tu URL final será:
```
https://auditoria-express.vercel.app
```

(O el nombre que hayas puesto en Vercel)

---

## 📝 CAMBIOS QUE PUEDES HACER (Opcional)

Si quieres personalizar:

**1. Cambiar número de WhatsApp:**
En `app/page.tsx`, busca:
```
https://wa.me/3855159169
```
Reemplaza `3855159169` por tu número

**2. Cambiar Instagram:**
Busca:
```
https://instagram.com/miguel.lladon.ok
```
Reemplaza `miguel.lladon.ok` por tu usuario

**3. Cambiar Google Sheets:**
Busca:
```
https://docs.google.com/spreadsheets/d/1RCO3AAGgFkUBrqtZfjDwDXxFM5YBJi3eMWaiiuXFmG8/edit
```
Reemplaza con tu enlace del Sheets

Después de cambios:
```bash
git add .
git commit -m "Cambios personalizados"
git push
```

**Vercel redeploy automáticamente** ✅

---

## ✨ VENTAJAS

✅ Totalmente GRATIS (sin límite de usuarios)
✅ Dominio propio (yourdomain.vercel.app)
✅ SSL HTTPS gratis
✅ Redeploy automático al hacer push a GitHub
✅ Performance ultra rápido
✅ Estadísticas de visitas en Vercel
✅ Soporte 24/7

---

## ⚠️ PROBLEMAS COMUNES

**"Git no está instalado"**
→ Descarga desde git-scm.com

**"No tengo Node/npm"**
→ Descarga desde nodejs.org

**"Vercel dice error en deployment"**
→ Verifica que la estructura de carpetas sea correcta
→ Asegúrate que `app/` tenga los 3 archivos (.tsx, .tsx, .css)

**"¿Cómo veo si está funcionando?"**
→ Ve a vercel.com → Tu proyecto → "Deployments"
→ Si dice "Ready" en verde, ¡está live!

---

## 📞 SOPORTE

Si algo falla:
1. Verifica la estructura de carpetas
2. Revisa los logs en Vercel (Deployments → ver error)
3. Asegúrate que GitHub esté sincronizado

¡Ya está! 🚀

Tu Auditoria Express está lista en producción.

