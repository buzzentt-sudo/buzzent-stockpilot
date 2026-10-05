# Buzzent StockPilot

MVP web responsive de gestión de inventario para pequeños y medianos negocios, desarrollado por Buzzent. La base actual es local-first: permite probar la experiencia y reglas de inventario sin cuentas externas ni servicios de pago.

## Ejecutar

```bash
npm install
npm run dev
```

Build y pruebas:

```bash
npm run build
npm test
```

En este entorno, `npm run build` puede usar el pipeline Vite; si el transform de Vite queda bloqueado en Windows/Node 24, `npm run build:esbuild` genera el bundle de producción verificable con esbuild.

## Arquitectura actual

- React + TypeScript estricto + Vite.
- Estado local persistido en `localStorage` (`sp-products`, `sp-moves`).
- Reglas de stock explicables: mínimos, agotados y sugerencias.
- Exportación CSV funcional desde Informes.
- Selector de cámara/galería HTML con fallback manual; no se envían imágenes a terceros.
- Netlify preparado mediante `netlify.toml` y fallback SPA.
- Vercel preparado mediante `vercel.json` con build `npm run build` y salida `dist`.
- Logo original preservado en `public/buzzentlogo.jpeg`.
- Landing integrada como vista “Presentación”.
- Migración Supabase con organizaciones, miembros, productos, movimientos, preferencias y RLS en `supabase/migrations/0001_stockpilot.sql`.
- Función SQL `record_inventory_movement` para actualizar stock y auditar el movimiento de forma atómica.

## Integración pendiente

Copiar `.env.example` a `.env.local`, configurar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, y ejecutar la migración SQL en Supabase. La app detecta esas variables, pero la autenticación remota aún requiere completar el cliente Supabase y probar políticas contra un proyecto real. Nunca colocar una service role key en el frontend.

Android/Capacitor queda pendiente porque la inspección no encontró Android SDK, ADB ni Gradle disponibles. Ver [ANDROID_SETUP.md](ANDROID_SETUP.md) para añadir Capacitor, sincronizar `android/`, usar `com.buzzent.stockpilot`, probar permisos de cámara y ejecutar `gradlew.bat assembleDebug`.

## GitHub y Vercel

El proyecto incluye `.gitignore` para evitar secretos, dependencias, builds y artefactos Android. En este entorno no están instalados GitHub CLI ni Vercel CLI, y no existe una sesión autenticada ni remoto Git configurado. Por eso no se afirma que el código haya sido publicado. Con una sesión oficial disponible, el repositorio se puede crear como `buzzent-stockpilot` y Vercel puede usar el `vercel.json` existente. No se deben copiar tokens al chat ni al repositorio.

## Limitaciones conocidas

La alta de producto y movimientos funcionan en local; la pantalla de registro no sustituye todavía una autenticación multiempresa. OCR, lector de códigos, importación CSV con preview, RLS, recuperación de contraseña, landing pública y APK requieren la siguiente fase. No hay URL desplegada ni APK verificado en este entorno.
