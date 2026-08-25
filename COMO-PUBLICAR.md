# Cómo publicar tu sistema de pago con redirección automática

Esto conecta: tu landing page → botón de pago → Mercado Pago →
(al pagar) → tu página de gracias con el link de Telegram, todo automático.

---

## Paso 1: Crea cuenta en Vercel (gratis)

1. Ve a **vercel.com**
2. Regístrate con tu correo o con GitHub (si no tienes GitHub, crea una
   cuenta gratis en **github.com** primero — lo necesitas para subir tus
   archivos)

## Paso 2: Sube estos archivos a un repositorio de GitHub

1. Ve a **github.com** e inicia sesión
2. Crea un repositorio nuevo (botón verde "New")
3. Nómbralo algo como `sistema-whatsapp-ia`
4. Sube TODOS estos archivos y carpetas manteniendo la misma estructura:
   ```
   index.html
   gracias.html
   package.json
   api/
     create-preference.js
   ```
   (Puedes arrastrar y soltar los archivos directo en la página de GitHub,
   usando el botón "Add file" > "Upload files")

## Paso 3: Conecta el repositorio a Vercel

1. En Vercel, dale clic a **"Add New" > "Project"**
2. Selecciona el repositorio que acabas de crear (`sistema-whatsapp-ia`)
3. Dale clic en **"Deploy"** (no necesitas cambiar ninguna configuración)
4. Espera unos segundos — Vercel te da un dominio gratis, algo como
   `sistema-whatsapp-ia.vercel.app`

## Paso 4: Configura tu Access Token de Mercado Pago (la parte importante)

1. Ve a tu cuenta de Mercado Pago > busca **"Tus integraciones"** o entra
   directo a **mercadopago.com.mx/developers/panel**
2. Crea una aplicación (si no tienes una) y busca tu **"Access Token"**
   de producción (empieza con `APP_USR-...`)
3. **Cópialo** (nunca lo compartas ni lo pegues en el código directamente)
4. En Vercel, entra a tu proyecto > **"Settings" > "Environment Variables"**
5. Agrega una variable nueva:
   - Nombre: `MP_ACCESS_TOKEN`
   - Valor: (pega tu Access Token aquí)
6. Agrega otra variable:
   - Nombre: `SITE_URL`
   - Valor: `https://sistema-whatsapp-ia.vercel.app` (usa el dominio real
     que te dio Vercel en el paso 3, sin barra `/` al final)
7. Dale clic en **"Save"**
8. Ve a la pestaña **"Deployments"** y dale clic en **"Redeploy"** en el
   último deployment, para que tome en cuenta las nuevas variables

## Paso 5: Prueba todo el flujo

1. Abre tu página: `https://sistema-whatsapp-ia.vercel.app`
2. Baja hasta el botón **"Acceder al programa"** y dale clic
3. Debería llevarte directo al checkout de Mercado Pago
4. Haz una compra de prueba (o usa credenciales de prueba de Mercado
   Pago si quieres probar sin gastar dinero real — se configuran igual
   pero con un Access Token de "TEST")
5. Al aprobarse el pago, deberías caer automáticamente en tu página
   `gracias.html` con el botón de Telegram

---

## Notas importantes

- **Nunca compartas tu Access Token** con nadie, ni lo pegues en el
  código de `create-preference.js` — siempre debe vivir como variable
  de entorno en Vercel.
- Si algo falla, revisa en Vercel la pestaña **"Logs"** de tu función
  `api/create-preference` — ahí aparece el error exacto.
- Antes de usar tu Access Token real, puedes probar todo con un Access
  Token de **prueba** (modo TEST) que Mercado Pago te da en el mismo
  panel de desarrolladores, para no arriesgar cobros reales mientras
  pruebas.
- Recuerda actualizar en `gracias.html` el link real de tu grupo de
  Telegram (buscar `REEMPLAZAR-CON-TU-LINK`).
