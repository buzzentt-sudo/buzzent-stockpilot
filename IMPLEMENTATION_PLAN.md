# Buzzent StockPilot — plan y estado real

## Estado de la inspección
- [x] Repositorio inspeccionado: no había código previo, package manager ni proyecto Android.
- [x] Herramientas comprobadas: Node v24.19.0, npm v11.17.0, Java 17.0.10; no se encontró Gradle/ADB/proyecto Android funcional.
- [x] Logo oficial localizado en `C:\Users\Usuario\Downloads\buzzentlogo.jpeg`.

## Fases
- [x] A. Inspección y arquitectura base: Vite + React + TypeScript estricto, local-first y preparada para backend.
- [x] B. Identidad visual y estructura: sistema responsive, navegación, componentes, logo oficial y estados básicos.
- [x] C. Inventario: productos, búsqueda, estados de stock, alta, edición rápida y persistencia local.
- [x] D. Movimientos: entradas, salidas, ajustes/pérdidas, actualización de stock y trazabilidad local.
- [x] E. Alertas e IA local: reglas explicables para mínimos, agotados y sugerencias de reposición.
- [x] F. Importación/exportación: exportación CSV funcional; importación avanzada pendiente.
- [x] G. Fotografía: selector de archivo/cámara, fallback manual y privacidad explícita; OCR/barcode pendiente de dependencia mantenida.
- [x] H. Landing pública: presentación integrada con CTA al panel, beneficios y explicación de foto/confirmación humana.
- [x] I. Supabase/RLS: migración multiempresa con RLS, función transaccional de movimientos y configuración preparada; falta probarla contra un proyecto real.
- [x] I.1. Android: guía reproducible de Capacitor e identificador definido; SDK/Gradle ausentes, sin APK declarado.
- [ ] J. Capacitor/Android: bloqueado por ausencia de Android SDK/Gradle; guía reproducible en `ANDROID_SETUP.md`.
- [x] K. QA inicial: pruebas de reglas y bundle web verificable con esbuild; el pipeline Vite queda documentado como bloqueo del runtime Windows/Node 24.
- [x] L. Publicación preparada: `.gitignore`, `vercel.json` y documentación de GitHub/Vercel; publicación externa bloqueada por ausencia de CLI/sesión.

## Criterios actuales
- La web debe compilar con `npm run build`.
- Las reglas locales no deben permitir stock negativo.
- Los datos demo son claramente datos de ejemplo y viven en localStorage.
- No se afirma que OCR, backend remoto o APK estén disponibles sin herramientas y ejecución verificable.

## Pendientes explícitos
1. Configurar Supabase y ejecutar `supabase/migrations/0001_stockpilot.sql` en un proyecto real.
2. Implementar auth real, recuperación de contraseña y servidor para operaciones transaccionales.
3. Añadir OCR/barcode local validado y persistencia segura de imágenes.
4. Completar privacidad/términos, importador CSV con preview y tests de integración.
5. Instalar/configurar Android SDK + Gradle y generar APK/AAB real.
6. Autenticar GitHub/Vercel mediante sus flujos oficiales y publicar verificando las URLs reales.
