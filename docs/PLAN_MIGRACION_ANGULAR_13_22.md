# Plan de migración: giep-platform Angular 13 → 22

## Decisión acordada

| Tema | Decisión |
|------|----------|
| Meta | **Angular 22** (último patch estable de la rama 22.x) |
| Método | Una major por fase: **13 → 14 → … → 22** (no saltar) |
| Template | **No** reescribir sobre NobleUI 22; conservar lógica de negocio |
| UI / look | Portar estilos del template nuevo **después**, si se desea |
| FullCalendar | Riesgo **P0**; migrar por etapas (v5 → v6 → v7) con smoke dedicado |
| Node | Subir Node **por tramos** según exige cada major (ver tabla) |
| website-pafar | Fuera de alcance (ya migrado) |
| Tests | Sin suite útil → **smoke checklist manual** por fase |
| Commits | Un commit (o PR) por fase cerrada; no mezclar majors |

**Regla de avance:** al cerrar cada fase → `ng build` + smoke OK (usuario) → siguiente major. Si algo rompe, se arregla **en esa fase**.

---

## Estado de partida (baseline, jul 2026)

| Item | Hoy |
|------|-----|
| Angular | **13.3.x** |
| TypeScript | ~4.6 |
| RxJS | ~7.5 |
| Node | sin `.nvmrc` (definir en Fase 0) |
| Builder | `@angular-devkit/build-angular:browser` (Webpack) |
| Template | NobleUI Angular 2.0.1 |
| Tamaño | ~459 `.ts` / ~47k LOC TS · ~150 HTML · 148 components · 60 services · 47 modules |
| FullCalendar | `@fullcalendar/*` **^5.11.0** + `FullCalendarModule.registerPlugins([...])` |

### Módulos de negocio a no romper

`dashboard`, `users`, `roles-permissions`, `evaluation-instruments`, `evaluation-instruments-360`, `capture-instruments`, `results`, `projects`, `accreditation`, `staexped`, `giep-repository`, `authorizations`, `notification`, `apps` (calendar demo), `auth`.

### Pantallas FullCalendar (smoke obligatorio)

| Ruta / módulo | Archivo clave |
|---------------|---------------|
| Apps → Calendar | `views/pages/apps/calendar/calendar.component.ts` |
| Accreditation → Calendar | `views/pages/accreditation/calendar/calendar.component.ts` |
| Projects → store | `views/pages/projects/components/project-store/project-store.component.ts` |
| Staexped (imports) | `staexped.component.ts` / `staexped-store.component.ts` |

Hoy los plugins se registran **3 veces** (`app.module`, `apps.module`, `projects.module`) con la API v5:

```ts
FullCalendarModule.registerPlugins([
  dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin
]);
```

Esa API **desaparece** en FullCalendar 6+.

---

## Requisitos de Node por major Angular

| Angular | Node mínimo recomendado | `.nvmrc` sugerido en esa fase |
|---------|-------------------------|-------------------------------|
| 13–14 | 14 / 16 / 18 | **18** |
| 15–16 | 16 / 18 | **18** |
| 17–18 | 18.19+ | **18** o **20** |
| 19–20 | 18.19+ / 20+ | **20** |
| 21 | 20+ | **20** |
| **22** | **≥ 22.22.3** | **22.22.3** |

En VPS final: Node **≥ 22.22.3** (igual que website-pafar).

---

## Checklist smoke (todas las fases)

1. `nvm use` + `npm i` sin `ERESOLVE` bloqueante (usar `.npmrc` `legacy-peer-deps=true` solo si hace falta).
2. `ng serve` arranca sin error rojo de bootstrap.
3. Login / auth OK.
4. Dashboard carga.
5. **FullCalendar** (en cada fase):
   - Vista mes / semana / lista.
   - Crear o editar evento (si el rol lo permite).
   - Drag & drop / resize (accreditation + apps).
   - Locale ES visible.
   - Sin errores en consola del tipo `registerPlugins` / plugin missing / `Calendar is not a constructor`.
6. Evaluaciones 360: listado + abrir un instrumento.
7. Proyectos: listado + store (calendario embebido si aplica).
8. Usuarios / roles-permisos: listado básico.
9. Toastr visible en una acción de éxito/error.
10. `ng build` y `ng build --configuration=stage` (y production si aplica) OK.

Si FullCalendar falla: **no avanzar de major** hasta dejarlo verde.

---

## Mapa de dependencias (riesgo)

### A — Compatibles con Angular 22 (actualizar peers por major)

| Lib | Uso aprox. | Notas |
|-----|------------|--------|
| `@ng-bootstrap/ng-bootstrap` | 54 archivos | Peer Angular 22 en v21 |
| `ngx-toastr` | 65 | Peer ^21; `legacy-peer-deps` en 22 |
| `@ng-select/ng-select` | 6 | v23 → Angular 22 |
| `@fullcalendar/angular` + plugins | 11+ | Ver sección dedicada |
| `ngx-quill` | 2 | v31 → Angular 22 |
| `ngx-mask` | 1 | v22 |
| `ngx-socket-io` | 2 | v4.11 → Angular 22 |
| `ngx-owl-carousel-o` | 2 | v22 |
| `ngx-extended-pdf-viewer` | 2 | v28 → Angular 19–22 |
| `ng-apexcharts` / `ng2-charts` | pocos | Actualizar en majors altas |
| `@zxing/ngx-scanner` / `angularx-qrcode` | 1 c/u | Tienen build Angular 22 |
| `@sweetalert2/ngx-sweetalert2` | 1 | Peer hasta 22 |
| `@ngx-loading-bar/*` | 1 | Mantener / actualizar |

### B — Sin peer Angular 22 (legacy-peer o reemplazar tarde)

| Lib | Uso | Estrategia |
|-----|-----|------------|
| `@swimlane/ngx-datatable` | 17 | Peer hasta 21; legacy en 22 o migrar a otra tabla **después** de 22 |
| `ngx-pagination` | 1 | Peer antiguo; suele funcionar con legacy |
| `ngx-clipboard` | 1 | Idem |
| `ng-lazyload-image` | 1 | Idem |

### C — Muertas / sin mantenimiento → reemplazar (Fase 0 o al romper)

| Lib | Uso | Reemplazo propuesto |
|-----|-----|---------------------|
| `ngx-dropzone-wrapper` | 10 | Input file nativo + Bootstrap, o `ngx-dropzone` / FilePond |
| `ngx-perfect-scrollbar` | 4 | CSS `overflow` / Perfect Scrollbar vanilla / quitar |
| `ngx-chips` | 2 | `ng-select` multiple o chips Bootstrap |
| `angular-archwizard` | 2 | Stepper Bootstrap / CDK stepper |
| `angular-cropperjs` | 2 | Quedarse solo con `ngx-image-cropper` |
| `ngx-custom-validators` | 2 | Validadores Angular nativos / custom |
| `ngx-sortablejs` | 1 | CDK drag-drop o SortableJS directo |
| `ng2-simplemde` | 1 | Ya tienen `ngx-quill` → unificar en Quill |
| `ngx-online-status` | 1 | `navigator.onLine` + `fromEvent` |
| `angular-datatables` + `datatables.net*` | bajo uso | Preferir `@swimlane/ngx-datatable` o tablas Bootstrap |

### D — Sin uso detectado → borrar en Fase 0

`@ngneat/until-destroy`, `@superset-ui/embedded-sdk`, `@superset-ui/switchboard`, `jquery` (si no hay uso real), `simple-datatables`, imports muertos de `apexcharts` sueltos, etc. (validar con `rg` antes de borrar).

### E — Utilidades a modernizar (no bloquean, pero conviene)

| Lib | Nota |
|-----|------|
| `moment` (29 usos) | Planear `date-fns` o `Temporal` **después** de llegar a 22 |
| `xlsx` / `file-saver` | Mantener; vigilar CommonJS warnings |

---

## FullCalendar — plan dedicado (P0)

### Situación

- Hoy: **FullCalendar 5.11** + API Angular antigua (`registerPlugins`, tipos re-exportados desde `@fullcalendar/angular`).
- **v6** (peer Angular **12–15**): rompe `registerPlugins`; plugins van en `calendarOptions.plugins`.
- **v7** (peer Angular **16–22**): otra alineación de paquetes (`fullcalendar` meta + `temporal-polyfill`); obligatorio al entrar en Angular 16+.

### Regla

| Fase Angular | Versión FullCalendar objetivo |
|--------------|-------------------------------|
| 13 (inicio) | 5.11 (baseline) |
| 14–15 | Subir a **6.x** en cuanto el build lo permita (ideal en **Fase 14 o 15**) |
| 16–22 | Subir a **7.x** **en la misma fase** que Angular 16 (no dejar FC6 en Angular 16+) |

### Checklist técnico al pasar 5 → 6

1. Quitar **todas** las llamadas a `FullCalendarModule.registerPlugins([...])` (`app.module`, `apps.module`, `projects.module`).
2. En cada `calendarOptions`, agregar:

```ts
plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
```

3. Mover imports de tipos a `@fullcalendar/core` (`CalendarOptions`, `EventApi`, `EventInput`, etc.).
4. Mantener `@fullcalendar/interaction` para `Draggable` / resize.
5. Verificar locale `es` (`@fullcalendar/core/locales/es`).
6. Smoke de las 3 pantallas de calendario + drag/drop.

### Checklist técnico al pasar 6 → 7 (con Angular 16)

1. Instalar set alineado `@fullcalendar/angular@7` + `@fullcalendar/core@7` + daygrid/timegrid/list/interaction **misma minor**.
2. Añadir `temporal-polyfill` si el peer lo exige.
3. Revisar breaking changes del changelog 6→7 (eventos, APIs de view, CSS).
4. Re-smoke completo de calendarios (accreditation es el más crítico de negocio).

### Si FullCalendar bloquea una fase

- No saltar major.
- Opción temporal: aislar el módulo de calendar detrás de feature flag **solo** si el resto del sistema debe avanzar (evitar si es posible).
- No reemplazar por otra lib de calendar a mitad de migración salvo que FC quede sin peer viable (hoy **sí** llega a Angular 22 con v7).

---

## Fase 0 — Preparación (Angular sigue en 13)

**Objetivo:** terreno limpio, Node fijo, menos superficie de libs.

### Tareas

1. [ ] Crear `.nvmrc` con **18** (válido para 13→16).
2. [ ] Baseline: `npm i` + `ng build` + smoke (login, dashboard, **calendarios**, 360, proyectos).
3. [ ] Rama `feat/migration-angular-13-22` (o similar).
4. [ ] Inventario final de imports: confirmar lista D (sin uso) y borrar del `package.json`.
5. [ ] Consolidar duplicados:
   - Cropper: dejar **solo** `ngx-image-cropper` (migrar los 2 usos de `angular-cropperjs`).
   - Editor: dejar **solo** `ngx-quill` (retirar `ng2-simplemde` si aplica).
6. [ ] Reemplazar **una** lib muerta de alto uso si bloquea el baseline: preferir empezar por `ngx-perfect-scrollbar` (fácil) o documentar `ngx-dropzone-wrapper` para Fase 0b.
7. [ ] Añadir `.npmrc` vacío o comentado; activar `legacy-peer-deps=true` solo cuando `ERESOLVE` aparezca.
8. [ ] Documentar en este plan el resultado del baseline (fecha + Node + OK smoke).
9. [ ] Commit Fase 0.

### Criterio de salida

- Angular **13** + Node 18 + build/smoke OK.
- Menos dependencias muertas; FullCalendar sigue en **5.11** y funcional.

**→ Siguiente: Fase 1 (13 → 14).**

---

## Fase 0b — Reemplazos bloqueantes (solo si hace falta)

Ejecutar **antes** de seguir majors si una lib muerta impide `ng update`:

1. [ ] `ngx-dropzone-wrapper` → solución acordada (10 archivos: accreditation calendar + otros).
2. [ ] `ngx-chips` / `angular-archwizard` / `ngx-custom-validators` / `ngx-sortablejs` / `ngx-online-status`.
3. [ ] Smoke de pantallas tocadas.
4. [ ] Commit.

---

## Fase 1 — Angular 13 → 14

1. [ ] `ng update @angular/core@14 @angular/cli@14`.
2. [ ] TypeScript según schematic (~4.7 / 4.8).
3. [ ] Actualizar peers mínimos (ng-bootstrap, ng-select, toastr, etc. a ramas “14”).
4. [ ] **FullCalendar:** evaluar si conviene ya el salto 5→6 (peer Angular 12–15). Preferible **aquí o en Fase 2**.
5. [ ] `ng build` + smoke (calendarios incluidos).
6. [ ] Commit.

---

## Fase 2 — Angular 14 → 15

1. [ ] `ng update` a **15**.
2. [ ] Peers Angular 15.
3. [ ] **FullCalendar → 6.x** si aún no se hizo (quitar `registerPlugins`, plugins en options, tipos desde `@fullcalendar/core`).
4. [ ] Smoke calendario **estricto**.
5. [ ] Commit.

---

## Fase 3 — Angular 15 → 16

1. [ ] Node: confirmar ≥ 16/18; preferir quedarse en **18**.
2. [ ] `ng update` a **16**.
3. [ ] **FullCalendar → 7.x** (obligatorio por peer 16–22) + smoke estricto.
4. [ ] Revisar esbuild opcional; **no** migrar aún a `application` builder (dejar para el final).
5. [ ] Commit.

---

## Fase 4 — Angular 16 → 17

1. [ ] `ng update` a **17**.
2. [ ] Peers; control-flow opcional (no masivo).
3. [ ] Smoke + calendarios.
4. [ ] Commit.

---

## Fase 5 — Angular 17 → 18

1. [ ] `ng update` a **18**.
2. [ ] Peers (ng-bootstrap, toastr, datatable, etc.).
3. [ ] Smoke.
4. [ ] Commit.

**Nota:** 18 es LTS histórica / ya EOL en jul 2026; es hito intermedio, no meta final.

---

## Fase 6 — Angular 18 → 19

1. [ ] Node: subir `.nvmrc` a **20** si hace falta.
2. [ ] `ng update` a **19**.
3. [ ] Limpieza tooling legado si aparece (tslint/protractor ya no deberían estar).
4. [ ] Smoke + calendarios.
5. [ ] Commit.

---

## Fase 7 — Angular 19 → 20

1. [ ] `ng update` a **20**.
2. [ ] Peers; `DOCUMENT` / schematics que apliquen.
3. [ ] Smoke.
4. [ ] Commit.

---

## Fase 8 — Angular 20 → 21

1. [ ] `ng update` a **21**.
2. [ ] Peers (toastr 20, datatable 21, etc.).
3. [ ] Smoke.
4. [ ] Commit.

---

## Fase 9 — Angular 21 → 22

1. [ ] `.nvmrc` → **22.22.3** (requisito Angular 22).
2. [ ] `ng update` a **22**.
3. [ ] Peers: `@ng-select@23`, `@ng-bootstrap@21`, FC **7.x** alineado, etc.
4. [ ] `.npmrc` `legacy-peer-deps=true` si toastr/datatable no tienen peer 22.
5. [ ] Schematics (Eager CD, HttpClient, etc.) — aplicar con cuidado; no reescribir arquitectura a standalone aún.
6. [ ] `ng build` / stage / production OK.
7. [ ] Smoke completo de negocio + **calendarios**.
8. [ ] Commit opción “llegamos a 22”.

---

## Fase 10 — Post-22 (opcional, no bloquea prod)

Orden sugerido **después** de estable en 22:

1. [ ] Migrar builder `browser` → `@angular/build:application` (como website-pafar).
2. [ ] Silenciar / arreglar warnings Sass (Bootstrap CSS precompilado si aplica).
3. [ ] Quitar `@angular/platform-browser-dynamic` → `platformBrowser` si aún está.
4. [ ] Evaluar retiro de `@angular/animations` si toastr/owl lo permiten.
5. [ ] Reemplazar `@swimlane/ngx-datatable` si molesta en peers.
6. [ ] Portar **solo layout** NobleUI 22 (sidebar/navbar/scss) sin reescribir módulos.
7. [ ] Plan `moment` → alternativa moderna.

---

## Orden de ejecución (resumen)

```
Fase 0   Node 18 + limpiezaza libs + baseline Angular 13
   ↓
Fase 0b  Reemplazos bloqueantes (si hace falta)
   ↓
Fase 1   Angular 14  (+ decidir FC 5→6)
   ↓
Fase 2   Angular 15  (+ FC 6 si faltaba)
   ↓
Fase 3   Angular 16  (+ FC 7 obligatorio)   ← punto crítico calendar
   ↓
Fase 4   Angular 17
   ↓
Fase 5   Angular 18
   ↓
Fase 6   Angular 19  (Node 20)
   ↓
Fase 7   Angular 20
   ↓
Fase 8   Angular 21
   ↓
Fase 9   Angular 22  (Node 22.22.3)         ← meta
   ↓
Fase 10  application builder + polishza + UI (opcional)
```

---

## Qué no hacemos en este plan

- Reescribir giep-platform sobre NobleUI Angular 22 desde cero.
- Migrar a Next.js / Nest / React.
- Standalone masivo / zoneless / SSR.
- Cambiar contratos de API del backend (`giep-backend`).
- Migrar `moment` o rediseño UX completo (solo post-22, opcional).
- `npm audit fix --force`.

---

## Estimación orientativa

| Bloque | Esfuerzo relativo |
|--------|-------------------|
| Fase 0–0b | 2–5 días |
| Fases 1–2 + FC6 | 3–5 días |
| Fase 3 + FC7 | 2–4 días (buffer calendar) |
| Fases 4–8 | 1–2 días c/u si peers cooperan |
| Fase 9 | 2–3 días |
| **Total** | **~3–6 semanas** persona dedicada + smokes de negocio |

Reescribir sería meses y mayor riesgo de regresiones de reglas de negocio.

---

## Próximo paso

**Ejecutar Fase 0:** `.nvmrc` 18, baseline smoke (con calendarios), borrado de deps sin uso, consolidar cropper/editor, rama de migración, commit.

Cuando Fase 0 esté OK, continuar con **Fase 1 (13 → 14)**.
