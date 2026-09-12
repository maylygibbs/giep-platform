# Análisis detallado del módulo de Proyecto (front y back)

## 1. Visión general

El módulo de **Proyecto** permite gestionar proyectos tipo Scrum/ágil: CRUD de proyectos, asignación de PMO y recursos, sprints (springs), tablero Kanban con actividades/tareas, calendarios de días no laborables (proyecto y por recurso) y gráfico Burndown.

- **Frontend:** Angular (giep-platform), ruta base `/projects`.
- **Backend:** Symfony/PHP (giep-backend), prefijo API `/api/proyecto`, más recursos y calendarios en rutas propias.

---

## 2. Frontend (giep-platform)

### 2.1 Estructura y rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/projects` | `ProjectsComponent` | Listado de proyectos (paginado, búsqueda), crear/editar/eliminar, ir al dashboard |
| `/projects/dashboard` | `ProjectDashboardComponent` | Contenedor del dashboard del proyecto seleccionado (id en `localStorage.projectidselect`) |
| `/projects/dashboard/board` | `BoardDndComponent` | Tablero Kanban por spring: actividades/tareas, drag & drop, detalle ítem, Burndown |
| `/projects/dashboard/members` | `MembersComponent` | PMO y recursos del proyecto, días libres por recurso |
| `/projects/dashboard/settings` | `SettingsComponent` | Días no laborables del proyecto |

**Resolvers:**  
- Listado: `GetAllCompanyResolver` (empresas para filtro/creación).  
- Members: `GetAllUserResolver` (usuarios para asignar PMO/recursos).

**Menú:**  
- Sidebar: “Proyectos” → “Ver proyectos” → `/projects`.

---

### 2.2 Servicios

#### ProjectService (`core/services/project.service.ts`)

- **Proyectos**
  - `getProjectsPaginated(filter)` → POST `/proyecto/pagined` — listado paginado y búsqueda.
  - `getProjectById(id)` → GET `/proyecto/{id}` — detalle (incl. PMO, recursos, empresa, estatus, progreso).
  - `storeProject(data)` → POST `/proyecto` (nuevo) o PUT `/proyecto/actualizar/{id}` (editar).
  - `deleteProject(id)` → DELETE `/proyecto/{id}` — **nota:** en backend no aparece ruta DELETE para proyecto, solo `deletePmo`.
- **PMO**
  - `getProjectPmoAndResource(id)` → GET `/proyecto/pmorecursos/{id}`.
  - `addPmoToProject(data)` → POST `/proyecto/userpmo`.
  - `deletePmoFromProject(projectId)` → GET `/proyecto/deletePmo/{projectId}`.
- **Recursos**
  - `addResourceToProject(data)` → POST `/recursosproyectoid`.
  - `deleteResourceFromProject(data)` → PUT `/recursosproyecto/deleteRecursos`.
- **Días libres recurso**
  - `getFreeDaysOfResoruce(data)` → POST `/recursosproyecto/calendariorecursos`.
  - `addFreeDaysToResource(data)` → POST `/recursosproyecto/calendariosrecursosproyecto`.
  - `deleteFreeDaysFromResource(id)` → PUT `/recursosproyecto/deletecalendariorecursos`.
- **Días libres proyecto**
  - `getFreeDaysOfProject(id)` → GET `/calendarioproyecto/{id}`.
  - `addFreeDaysToProject(data)` → POST `/calendarioproyecto`.
  - `deleteFreeDaysFromProject(id)` → PUT `/recursosproyecto/deletecalendarioproyecto`.
- **Springs y board**
  - `getSpringsOfProject(id)` → GET `/proyecto/springboardpanel/{id}`.
  - `getConfiguredColumns()` → GET `/proyecto/nivelboard/List` (columnas del tablero).
  - `getItemsTypes()` → GET `/proyecto/typeitemsevent/List` (tipos de ítem: actividad/tarea/etc.).
- **Actividades (catálogo)**  
  - `getStatusActivityTask()` → GET `/actividades/status/List` (no usado directamente en flujo proyecto en lo revisado).

#### SpringService (`core/services/spring.service.ts`)

- `storeSpring(data)` → POST `/spring` — crear sprint.
- `getItemsBoardBySpring(idSpring, columns)` → GET `/spring/activities/{idSpring}` — actividades/tareas del spring para el board.
- `createItem(data)` → POST `/spring/items` — crear ítem (actividad o tarea).
- `updatePositionItem(data)` → PUT `/spring/items/actualizarposiciontareas` — mover ítem (drag & drop).
- `getItemProjectById(id)` → GET `/spring/detalles/item/{id}` — detalle ítem (comentarios, tipo, nivel, asignado).
- `updateInfoItem(data)` → PUT `/spring/items/actualizardetallesitems` — actualizar ítem.
- `getBurndownGraphicData(id)` → POST `/spring/items/burndown` — datos para gráfico Burndown.

---

### 2.3 Modelos principales

- **Project** (`core/models/project.ts`): id, name, description, condition, startDate, endDate, hoursProject, progress, TypeGbProgressbar, pmo, assignedResources, company (SelectOption), status (SelectOption), freeDays, totalFreeDays, springs. Métodos: `mapForPost`, `map2ForPost` (recursos), `map3ForPost` (días no laborables), `mapFromObject`, `getEndDate(springs)`.
- **SpringProject** (`core/models/spring-project.ts`): id, name, startDate, endDate, isCurrent, projectId.
- **ProyectCalendar** (`core/models/project-calendar.ts`): rangos de fechas no laborables.
- **Board / ItemProject / ItemTypeProject** (`core/models/item-project.ts`): tablero con activities (ItemProject), tipo (ItemTypeProject), horas, asignado, tasks por columna.
- **LevelBoardProject** (`core/models/level-board-project.ts`): columnas del board (id, levelName, attr_key).

---

### 2.4 Componentes y flujos

- **ProjectsComponent**
  - Lista proyectos con paginación y búsqueda por palabra.
  - Crear proyecto: `step` 1 → 2, usa `ProjectStoreComponent` (formulario + empresa).
  - Editar: carga `getProjectById` y mismo formulario.
  - Eliminar: `deleteProject(id)` y recarga página.
  - Ir al dashboard: guarda `projectidselect` en `localStorage` y navega a `/projects/dashboard/board`.

- **ProjectStoreComponent**
  - Formulario: nombre, descripción, fechas, empresa, horas estimadas; envío con `Project.mapForPost`.
  - Solo creación/edición de proyecto; no gestiona PMO/recursos en este paso (eso va en Members).

- **ProjectDashboardComponent**
  - Obtiene proyecto con `getProjectById(projectidselect)` y muestra datos; hijos: board, members, settings.

- **BoardDndComponent**
  - Carga springs del proyecto, columnas (`getConfiguredColumns`), tipos de ítem (`getItemsTypes`), PMO y recursos (`getProjectPmoAndResource`).
  - Selección de spring activo; carga ítems con `getItemsBoardBySpring`.
  - Crear spring: modal `NewspringComponent` (nombre, fechas) → `storeSpring` → recarga springs y board.
  - Añadir actividad/tarea: `preCreateItem` + input nombre → `createItem`.
  - Drag & drop: `drop()` → `updatePositionItem` (orden y columna) → recarga board.
  - Detalle ítem: modal con `getItemProjectById`, edición con `updateInfoItem` (asignado, horas, descripción, comentarios, etc.).
  - Gráfico Burndown: modal con `getBurndownGraphicData(selectedSpring.id)` (ApexCharts).

- **MembersComponent**
  - PMO: selector de usuario → `addPmoToProject` / `deletePmoFromProject`; refresca con `getProjectPmoAndResource`.
  - Recursos: formulario (usuario + horas dedicación) → `addResourceToProject` / `deleteResourceFromProject`.
  - Días libres por recurso: modal con rango de fechas; validación de solapamientos; `getFreeDaysOfResoruce`, `addFreeDaysToResource`, `deleteFreeDaysFromResource`.

- **SettingsComponent**
  - Días no laborables del proyecto: listado por `getFreeDaysOfProject`; alta con `addFreeDaysToProject`, baja con `deleteFreeDaysFromProject`; validación de rangos sin solapamiento.

- **NewspringComponent** (modal)
  - Formulario: nombre del spring, fecha inicio, fecha fin; `storeSpring` con idproyecto; emite evento para recargar lista de springs y board.

---

### 2.5 Estado (Akita-style)

- `state/project/`: `project.store.ts`, `project.query.ts`, `project.service.ts` — en el flujo actual el listado y el dashboard usan sobre todo `ProjectService` y `SpringService` directamente; el store podría usarse para cache/estado global si se refactoriza.

---

## 3. Backend (giep-backend)

### 3.1 Controladores y rutas

#### ProyectoController (`/api/proyecto`)

| Método | Ruta | Función |
|--------|------|---------|
| POST | `/proyecto/pagined` | Listado paginado (page, rowByPage, word). |
| GET | `/proyecto/List` | Listado simple (sin paginación). |
| POST | `/proyecto` | Crear proyecto. |
| PUT | `/proyecto/actualizar/{id}` | Actualizar proyecto. |
| GET | `/proyecto/{id}` | Proyecto por id (detalle completo). |
| GET | `/proyecto/pmorecursos/{id}` | PMO y recursos del proyecto (con cálculos). |
| GET | `/proyecto/deletePmo/{projectId}` | Desvincular PMO. |
| GET | `/proyecto/spring/{id}` | Springs del proyecto. |
| POST | `/proyecto/spring/{idspring}` | Spring con recursos (findSpringRecursos). |
| GET | `/proyecto/boardpanel/{idproyecto}` | Datos board por proyecto. |
| GET | `/proyecto/springboardpanel/{idproyecto}` | Springs para panel (lista springs del proyecto). |
| GET | `/proyecto/boardpanelactivity/{idproye}/{idactividad}` | Actividad del board. |
| GET | `/proyecto/boardpanelbacklog/{idproye}` | Backlog por proyecto. |
| GET | `/proyecto/boardpanelspringbacklog/{idspring}` | Backlog por spring. |
| POST | `/proyecto/userpmo` | Asignar PMO (projectId, userPmoId). |
| GET | `/proyecto/nivelboard/List` | Niveles/columnas del board. |
| GET | `/proyecto/typeitemsevent/List` | Tipos de ítem (actividad, tarea, etc.). |
| PUT | `/proyecto/actualizarestatus/{id}` | Actualizar estatus del proyecto (idstatuscalendarioproyecto). |

**Nota:** No hay ruta **DELETE** `/api/proyecto/{id}` en el backend; el front sí llama a `deleteProject(id)` (DELETE). Conviene implementar el endpoint o dejar de llamarlo desde el front.

#### RecursosProyectoController (`/api/recursosproyecto`)

| Método | Ruta | Función |
|--------|------|---------|
| POST | `/recursosproyecto` | Crear recursos (array arrayuserresorce). |
| POST | `/recursosproyectoid` | Vincular un recurso (projectId, userId, dedicatedHours). |
| PUT | `/recursosproyecto/deleteRecursos` | Desvincular recurso (projectId, userId). |
| POST | `/recursosproyecto/calendariosrecursosproyecto` | Alta días libres recurso (projectId, userId, startDate, endDate). |
| POST | `/recursosproyecto/calendariorecursos` | Listar/obtener calendario días libres del recurso en el proyecto. |
| PUT | `/recursosproyecto/deletecalendariorecursos` | Borrar rango días libres recurso (calendarioRecursosId). |

#### CalendarioProyectoController (`/api/calendarioproyecto`)

| Método | Ruta | Función |
|--------|------|---------|
| POST | `/calendarioproyecto` | Crear días no laborables del proyecto (projectId, startDate, endDate). |
| GET | `/calendarioproyecto/List` | Listado (con Calculos). |
| PUT | `/calendarioproyecto/actualizar/{id}` | Actualizar registro calendario proyecto. |
| GET | `/calendarioproyecto/{id}` | Calendario (días no laborables) por id proyecto. |
| PUT | `/recursosproyecto/deletecalendarioproyecto` | Eliminar días no laborables del proyecto (idCalendarioProyecto). |

#### Otros

- **StatuscalendarioproyectoController:** CRUD de estatus de calendario de proyecto (List, POST, PUT actualizar).
- **TrazaController:** `/api/proyecto/traza` (POST/PUT) — traza relacionada a proyecto.

---

### 3.2 Entidades principales

- **Proyecto:** id, nombre, descripcion, fechainicio, fechafin, idempresa (Empresa), IdUserPmo (User), horaestimadas, idstatuscalendarioproyecto (Statuscalendarioproyecto). Relaciones: recursos (Recurso/RecursosProyecto), springs (Spring), proyectoAdjuntos (ProyectoAdjunto), idcalendarioproyecto (CalendarioProyecto).
- **RecursosProyecto / CalendarioRecursosProyecto:** vinculación recurso–proyecto y rangos de días libres por recurso.
- **CalendarioProyecto:** días no laborables del proyecto (id_proyecto, fechas).
- **Statuscalendarioproyecto:** estatus del proyecto (calendario/estado).
- **ProyectoAdjunto:** adjuntos al proyecto.

Los **springs** y **ítems del board** (sprint_item, items, niveles, typeevent) están en otras entidades/repositorios consumidos por ProyectoRepository y por los endpoints de spring/board (no detallados en este documento pero usados por el front vía SpringService).

---

## 4. Resumen de funcionalidades (checklist)

| Funcionalidad | Front | Back | Notas |
|---------------|-------|------|--------|
| Listar proyectos (paginado/búsqueda) | Sí | Sí | POST `/proyecto/pagined` |
| Ver detalle proyecto | Sí | Sí | GET `/proyecto/{id}` |
| Crear proyecto | Sí | Sí | POST `/proyecto` |
| Editar proyecto | Sí | Sí | PUT `/proyecto/actualizar/{id}` |
| Eliminar proyecto | Sí | No | Front llama DELETE `/proyecto/{id}`; no existe en backend |
| Asignar / quitar PMO | Sí | Sí | userpmo, deletePmo |
| Asignar / quitar recursos | Sí | Sí | recursosproyectoid, deleteRecursos |
| Horas dedicación recurso | Sí | Sí | En alta/edición recurso |
| Días libres por recurso | Sí | Sí | calendariosrecursosproyecto, calendariorecursos, deletecalendariorecursos |
| Días no laborables proyecto | Sí | Sí | calendarioproyecto, get by id, deletecalendarioproyecto |
| Listar springs del proyecto | Sí | Sí | springboardpanel |
| Crear spring | Sí | Sí | POST `/spring` (otro controller) |
| Tablero Kanban por spring | Sí | Sí | spring/activities, niveles, typeitemsevent |
| Crear actividad/tarea | Sí | Sí | spring/items |
| Mover ítem (drag & drop) | Sí | Sí | actualizarposiciontareas |
| Ver/editar detalle ítem | Sí | Sí | detalles/item, actualizardetallesitems |
| Comentarios en ítem | Sí | — | Incluidos en detalle ítem |
| Gráfico Burndown | Sí | Sí | spring/items/burndown |
| Niveles/columnas board | Sí | Sí | nivelboard/List |
| Tipos de ítem (actividad/tarea) | Sí | Sí | typeitemsevent/List |
| Actualizar estatus proyecto | Back disponible | Sí | actualizarestatus; no revisado en UI |
| Multi-empresa (filtro/creación) | Sí | Sí | idempresa en proyecto, GetAllCompanyResolver |

---

## 5. Observaciones y recomendaciones

1. **Eliminar proyecto:** El front usa `deleteProject(id)` (DELETE `/proyecto/{id}`) pero el backend no expone esa ruta. Añadir en `ProyectoController` un DELETE `/api/proyecto/{id}` que delegue en `ProyectoRepository` (con reglas de negocio: springs, recursos, calendarios) o eliminar la acción desde el front hasta que exista el endpoint.
2. **Delete PMO por GET:** La desvinculación de PMO usa GET (`/proyecto/deletePmo/{projectId}`). Sería más correcto usar DELETE o PUT con body para operaciones que modifican estado.
3. **Idioma de nombres:** Backend mezcla español (nombre, fechainicio, idempresa) e inglés en algunos DTOs; el front mapea con `mapFromObject` y `mapForPost` correctamente.
4. **localStorage:** El proyecto seleccionado se guarda en `projectidselect`; el dashboard depende de ello. Valorar usar estado (Akita) o parámetro de ruta para poder compartir URL y evitar dependencia de localStorage.
5. **Validación de rangos:** En Members y Settings se valida que los rangos de días libres no se solapen; la lógica está en el front; conviene replicar o reforzar en backend.
6. **Estatus de proyecto:** Existe `actualizarestatus` en backend; comprobar si hay pantalla o flujo en front que lo use (por ejemplo cierre o pausa de proyecto).

---

*Documento generado a partir del análisis del código en giep-platform y giep-backend (marzo 2025).*
