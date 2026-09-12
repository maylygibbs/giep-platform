# Análisis: Módulo de Proyectos como híbrido PM + Scrum

## Objetivo del documento

Responder a tres preguntas:

1. **¿Es viable un producto híbrido robusto** que combine bondades de Project Management (nivel gerencial: indicadores, reportes) y de Scrum (nivel ejecución: agilidad)?
2. **¿Qué tiene hoy el módulo** en cada dimensión (PM vs Scrum)?
3. **¿Qué le falta al módulo** para lograr ese híbrido?

**Alcance:** Solo análisis y validación. No se implementa nada.

---

## 1. ¿Se puede obtener un producto híbrido robusto?

**Sí.** Un híbrido PM + Scrum es viable y tiene sentido cuando:

- **Nivel gerencial** necesita: visibilidad de “cómo va el proyecto” (plazos, avance, recursos, estado), reportes para dirección y toma de decisiones.
- **Nivel ejecución** necesita: equipos trabajando en sprints, tablero ágil, entregas iterativas, feedback rápido.

En la práctica esto se conoce como “ágil con gobernanza” o “Scrum dentro de un marco de proyecto”: el proyecto tiene alcance, fechas y presupuesto (visión PM), y la ejecución se hace por sprints con tablero y entregas incrementales (visión Scrum).

**Conclusión:** Sí se puede lograr un producto híbrido robusto si se refuerzan de forma explícita las piezas de PM (indicadores, hitos, reportes) y las de Scrum (backlog, planning, objetivo de sprint, ritmo). Lo que tienen hoy ya es un buen punto de partida.

---

## 2. Qué tiene hoy el módulo (mapeo PM vs Scrum)

### 2.1 Lo que ya aporta al lado **Project Management (gerencial)**

| Elemento | Estado actual | Comentario |
|----------|----------------|------------|
| Proyecto con alcance y fechas | Sí | Nombre, descripción, fecha inicio, fecha fin (o derivada de springs), empresa. |
| Horas estimadas del proyecto | Sí | `horaestimadas` a nivel proyecto. |
| Responsable del proyecto (PMO) | Sí | Un PMO por proyecto. |
| Recursos asignados y dedicación | Sí | Recursos con horas de dedicación; visibles en Miembros. |
| Progreso del proyecto (%) | Sí | Barra de progreso en listado; backend calcula con “peso” trabajado (ítems) vs horas estimadas/total. |
| Estado del proyecto (semáforo) | Sí | Estado/color (verde, amarillo, naranja, rojo) según `idstatuscalendarioproyecto`. |
| Calendario (días no laborables) | Sí | A nivel proyecto y por recurso; útil para planificación y capacidad. |
| Listado de proyectos | Sí | Paginado, búsqueda; permite ver varios proyectos. |

**Resumen:** Hay base para “proyecto como contrato” (alcance, fechas, responsable, recursos, progreso y estado). Falta explotarla con indicadores y reportes gerenciales claros.

---

### 2.2 Lo que ya aporta al lado **Scrum / ejecución ágil**

| Elemento | Estado actual | Comentario |
|----------|----------------|------------|
| Sprints (springs) | Sí | Sprints con nombre, fecha inicio y fin; varios por proyecto. |
| Tablero Kanban | Sí | Columnas configurables, tarjetas (actividades/tareas), drag & drop. |
| Actividades y tareas | Sí | Ítems con jerarquía (padre/hijo); tipos (actividad, tarea, etc.). |
| Peso / esfuerzo por ítem | Sí | “Peso” (horas) por ítem; se usa en progreso y Burndown. |
| Asignación por ítem | Sí | Usuario asignado por actividad/tarea. |
| Movimiento entre columnas | Sí | Drag & drop; actualiza estado y orden. |
| Detalle de ítem (edición) | Sí | Título, descripción, horas, asignado, comentarios. |
| Burndown del sprint | Sí | Gráfico tiempo restante esperado vs real (por sprint). |
| Comentarios en ítems | Sí | En detalle del ítem. |

**Resumen:** La ejecución es ágil: sprints, tablero, ítems, movimiento, Burndown. Falta dar estructura de “ceremonia” (planning, objetivo de sprint, revisión) y opcionalmente backlog de producto y velocidad.

---

## 3. Qué le falta al módulo para el híbrido robusto

Se organiza en: **nivel gerencial (PM)** y **nivel ejecución (Scrum)**. No se pide implementar; solo listar y priorizar gaps.

---

### 3.1 Gaps nivel gerencial (informar con indicadores de proyecto)

Objetivo: que gerencia pueda responder “¿cómo va el proyecto?” y “¿vamos bien en tiempo y avance?”.

| Gap | Descripción | Prioridad sugerida |
|-----|-------------|---------------------|
| **Dashboard gerencial del proyecto** | Una vista (dentro del proyecto o desde listado) que concentre: progreso, estado, próximos hitos, avance por sprint, uso de recursos, alertas. Hoy el progreso está en la tabla y el detalle se reparte en Board/Miembros/Settings. | Alta |
| **Hitos (milestones)** | No existen hitos explícitos. En PM, gerencia suele reportar “entregamos el hito X en fecha Y”. Sería: hitos asociados al proyecto (y opcionalmente a fechas o a sprints), con estado (pendiente/cumplido) y posible fecha real. | Alta |
| **Línea base (baseline)** | No hay baseline de fechas ni de alcance. No se puede comparar “plan vs real” (desviación de fechas, desviación de alcance/horas). Sin baseline, indicadores como “atraso” o “adelanto” son limitados. | Media–Alta |
| **Indicadores de desempeño (tipo EVM)** | Progreso actual es % (horas trabajadas vs estimadas). No hay Índice de Desempeño del Cronograma (SPI), Índice de Desempeño del Coste (CPI), EAC, ETC, valor ganado. Para un híbrido “suave” puede bastar con: avance planificado vs real (por tiempo) y desviación de fechas clave; para uno más robusto, acercarse a EVM. | Media |
| **Reportes / exportación** | No aparece en el análisis: reportes en PDF/Excel para dirección (estado del proyecto, avance por sprint, carga de recursos, hitos). Es clave para nivel gerencial. | Alta |
| **Vista multi‑proyecto** | Listado existe; no hay vista de portafolio (varios proyectos con indicadores resumidos: estado, progreso, fechas, PMO) para gerencia. | Media |
| **Riesgos / bloqueos a nivel proyecto** | No hay registro de riesgos o bloqueos a nivel proyecto (sí comentarios en ítems). Para gerencia ayuda tener “riesgos/bloqueos del proyecto” visibles y con estado. | Media |
| **Claridad fecha fin del proyecto** | La fecha fin puede venir de springs o del proyecto; no está claro si se usa como “fecha de entrega final” y si se compara con baseline para indicar atraso/adelanto. | Baja (mejora de uso de lo existente) |

---

### 3.2 Gaps nivel ejecución (que la ejecución sea ágil)

Objetivo: que el equipo trabaje con ritmo Scrum: backlog, planning, sprint con objetivo, visibilidad de avance.

| Gap | Descripción | Prioridad sugerida |
|-----|-------------|---------------------|
| **Backlog de producto (proyecto)** | Hay backlog por spring y ítems en el tablero; no está explícito un “product backlog” a nivel proyecto (lista priorizada de lo que se quiere hacer), del cual se “sacan” ítems para cada sprint. Puede modelarse como ítems no asignados a ningún sprint o con un sprint “backlog”. | Alta |
| **Objetivo del sprint (Sprint Goal)** | El spring tiene nombre y fechas; no hay campo “objetivo del sprint”. En Scrum, el sprint goal da foco y criterio de éxito del sprint. | Alta |
| **Planning / compromiso del sprint** | No hay flujo explícito de “sprint planning”: qué ítems entran en el sprint, techo de capacidad (horas/puntos). El equipo puede hacerlo fuera del sistema; tenerlo en el sistema da trazabilidad y base para indicadores. | Media |
| **Velocidad / capacidad** | No hay velocidad histórica (por ejemplo, horas/puntos por sprint) ni planificación por capacidad del equipo. Útil para estimar cuánto puede comprometerse en el siguiente sprint. | Media |
| **Definition of Done (DoD)** | No hay DoD configurable (lista de criterios para dar un ítem por “hecho”). Opcional pero ayuda a calidad y consistencia. | Baja |
| **Sprint review / demo** | No hay registro de “sprint review” (qué se demostró, aceptación). Puede quedar como práctica manual; si se quiere trazabilidad, un registro ligero (fecha, notas, ítems demostrados) ayudaría. | Baja |
| **Retrospectiva** | No hay soporte para retrospectiva (qué mejorar). Puede ser fuera del sistema; si se quiere en sistema, sería un artefacto por sprint (notas, acciones). | Baja |
| **Estimación en puntos (opcional)** | Hoy todo es en horas (peso). En Scrum suele usarse story points; un híbrido puede seguir en horas y aun así ser ágil. Si se quisiera, añadir “puntos” además de horas permitiría velocidad en puntos. | Baja |

---

## 4. Resumen visual: qué hay y qué falta

```
                    NIVEL GERENCIAL (PM)                    NIVEL EJECUCIÓN (Scrum)
                    "¿Cómo va el proyecto?"                  "Trabajo ágil por sprints"

YA TIENEN          • Proyecto: alcance, fechas, horas       • Sprints (springs) con fechas
                   • PMO y recursos con dedicación          • Tablero Kanban, drag & drop
                   • Progreso % y estado (semáforo)          • Actividades y tareas (peso, asignado)
                   • Días no laborables (proyecto/recurso)   • Burndown del sprint
                   • Listado de proyectos                    • Comentarios en ítems

FALTA              • Dashboard gerencial del proyecto       • Backlog de producto (proyecto)
                   • Hitos (milestones)                      • Objetivo del sprint (Sprint Goal)
                   • Línea base (baseline)                   • Planning / compromiso visible
                   • Indicadores tipo EVM (SPI, desviación)  • Velocidad / capacidad
                   • Reportes (PDF/Excel)                    • DoD, review, retro (opcional)
                   • Riesgos/bloqueos a nivel proyecto
                   • Vista portafolio (multi‑proyecto)
```

---

## 5. Validación final

- **¿Se puede tener un híbrido robusto?** Sí, con las condiciones anteriores: reforzar indicadores y reportes para gerencia y dar estructura ágil (backlog, sprint goal, planning) en ejecución.
- **¿Qué tiene hoy?** Base sólida: proyecto con fechas y horas, PMO y recursos, progreso y estado, sprints, tablero Kanban, ítems con peso y Burndown. Es ya un híbrido “ligero”.
- **¿Qué le falta?**  
  - **Gerencial:** dashboard del proyecto, hitos, baseline, reportes, y opcionalmente EVM y riesgos.  
  - **Ejecución:** backlog de producto, objetivo del sprint, y opcionalmente planning visible, velocidad y DoD.

No se ha implementado nada; este documento sirve como hoja de ruta para decidir en qué orden abordar cada gap (por ejemplo: primero hitos y dashboard gerencial, luego backlog y sprint goal).

---

*Análisis basado en el código y documentos del módulo de Proyectos (giep-platform y giep-backend). Solo análisis y validación.*
