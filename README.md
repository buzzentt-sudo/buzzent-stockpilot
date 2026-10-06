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
- Cliente oficial `@supabase/supabase-js` con sesión persistente, registro, inicio/cierre de sesión y recuperación por email.
- Repositorio remoto para leer productos/movimientos y ejecutar altas, ediciones y movimientos con RLS; el modo local se conserva cuando faltan variables.

## Configurar Supabase

1. Crear un proyecto gratuito en Supabase.
2. En el SQL Editor, ejecutar `supabase/migrations/0001_stockpilot.sql` completo. La migración habilita RLS, crea el trigger de onboarding y la función transaccional de movimientos; puede ejecutarse nuevamente porque las políticas y el trigger se reemplazan de forma segura.
3. Copiar `.env.example` a `.env.local` y completar únicamente `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` desde Project Settings / API.
4. Ejecutar `npm run dev`, registrar una cuenta y confirmar el email si la política de Auth lo requiere.
5. Para Vercel, cargar las mismas dos variables en Project Settings / Environment Variables y redeployar.

Nunca colocar una `service_role` key en el frontend, GitHub, `.env.example` ni Vercel público. La app no afirma estar conectada hasta que esas variables existan y una sesión pueda consultar la organización.

La migración desde datos locales es deliberadamente conservadora: esta etapa no borra `sp-products` ni `sp-moves`. Antes de habilitarla en producción debe agregarse una pantalla de vista previa/confirmación que suba filas validadas y solo limpie el almacenamiento local después de confirmar el resultado.

Android/Capacitor queda pendiente porque la inspección no encontró Android SDK, ADB ni Gradle disponibles. Ver [ANDROID_SETUP.md](ANDROID_SETUP.md) para añadir Capacitor, sincronizar `android/`, usar `com.buzzent.stockpilot`, probar permisos de cámara y ejecutar `gradlew.bat assembleDebug`.

## GitHub y Vercel

El repositorio fue publicado en [GitHub](https://github.com/buzzentt-sudo/buzzent-stockpilot), rama `main`. Vercel está desplegado en [buzzent-stockpilot.vercel.app](https://buzzent-stockpilot.vercel.app/). El proyecto usa `vercel.json`, `npm run build` y salida `dist`. No se configuraron variables secretas; la app funciona en modo local hasta conectar Supabase.

## Limitaciones conocidas

La conexión remota está implementada en código. Se creó el proyecto Supabase `buzzent-stockpilot` (`tmmmlpytwvjeacsiccye`) y las variables existen localmente en `.env.local` (archivo ignorado). Falta ejecutar la migración SQL y verificar registro/RLS contra ese proyecto; la sesión de Supabase requiere completar MFA. OCR, lector de códigos, importación CSV con preview, migración asistida desde localStorage, push y APK requieren la siguiente fase. La landing está publicada; no existe APK verificado.
