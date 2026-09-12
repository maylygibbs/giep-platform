# Módulo de Proyectos — Guía para el usuario

Esta guía describe qué puede hacer un usuario final en el módulo **Proyectos** de la plataforma GIEP. Está pensada para uso diario, sin términos técnicos.

---

## Cómo entrar al módulo

En el menú lateral, vaya a **Proyectos** → **Ver proyectos**. Se abrirá la pantalla de listado de proyectos.

---

## 1. Ver y buscar proyectos

**Qué puede hacer**

- Ver la lista de todos los proyectos en los que tiene acceso.
- Cambiar de página si hay muchos proyectos (paginación).
- Buscar proyectos por nombre escribiendo en el cuadro de búsqueda y ejecutando la búsqueda.

**Dónde**

- Pantalla principal de Proyectos (la primera que aparece al entrar a “Ver proyectos”).

En la tabla verá información de cada proyecto (nombre, fechas, empresa, progreso, etc.).

---

## 2. Crear un proyecto

**Qué puede hacer**

- Registrar un proyecto nuevo indicando:
  - Nombre del proyecto
  - Descripción
  - Fecha de inicio
  - Empresa
  - Horas estimadas

**Cómo**

1. En la pantalla de listado, use el botón o acción **Crear** (o similar).
2. Complete el formulario con los datos del proyecto.
3. Guarde. El sistema confirmará que el proyecto fue registrado.

Después de crear el proyecto puede editarlo, asignar responsables (PMO) y equipo (recursos), y configurar sprints y el tablero desde el dashboard del proyecto.

---

## 3. Editar un proyecto

**Qué puede hacer**

- Modificar los datos básicos del proyecto ya creado (nombre, descripción, fechas, empresa, horas estimadas).

**Cómo**

1. En el listado de proyectos, localice el proyecto y use la opción **Editar** (o el ícono de edición).
2. Ajuste los datos que desee en el formulario.
3. Guarde. El sistema confirmará que el proyecto fue actualizado.

---

## 4. Eliminar un proyecto

**Qué puede hacer**

- Solicitar la eliminación de un proyecto desde la pantalla de listado.

**Cómo**

1. En el listado, localice el proyecto y use la opción **Eliminar** (o el ícono de eliminar).
2. Confirme la acción si el sistema lo solicita.

**Nota:** Si esta opción no funciona o muestra error, puede que no esté disponible en su entorno; en ese caso contacte al administrador.

---

## 5. Entrar al dashboard de un proyecto

**Qué puede hacer**

- Abrir el panel de trabajo de un proyecto concreto para gestionar sprints, tablero, miembros y configuración.

**Cómo**

1. En el listado de proyectos, localice el proyecto.
2. Use la acción **Ir al dashboard** (o “Abrir”, “Ver dashboard”, etc.).
3. Se abrirá el dashboard de ese proyecto. Desde ahí podrá acceder a:
   - **Tablero (Board):** sprints, actividades y tareas.
   - **Miembros:** PMO y recursos asignados, días libres por persona.
   - **Configuración (Settings):** días no laborables del proyecto.

La aplicación recordará el proyecto seleccionado mientras navegue por estas secciones.

---

## 6. Tablero del proyecto (Board)

**Qué puede hacer**

- Ver los **sprints** del proyecto y elegir el sprint con el que trabajar.
- Crear un **nuevo sprint** (nombre y rango de fechas).
- Ver el **tablero tipo Kanban** del sprint elegido: columnas (por ejemplo: Por hacer, En curso, Hecho) y tarjetas de actividades/tareas.
- **Crear** actividades o tareas (por ejemplo desde un botón “Nueva actividad” o “Nueva tarea”).
- **Mover** tarjetas entre columnas arrastrando y soltando (drag and drop) para cambiar el estado o el orden.
- **Abrir el detalle** de una actividad o tarea para ver y editar:
  - Título, descripción, horas
  - Persona asignada
  - Estado (columna)
  - Comentarios
- Ver el **gráfico Burndown** del sprint (tiempo restante esperado vs real).

**Dónde**

- Dentro del dashboard del proyecto: opción **Board** o **Tablero**.

**Resumen del flujo**

1. Seleccione un sprint en el desplegable (o cree uno nuevo).
2. En el tablero verá las columnas y las tarjetas.
3. Para crear una actividad o tarea: use el botón correspondiente, escriba el nombre y guarde.
4. Para cambiar estado u orden: arrastre la tarjeta a la columna deseada.
5. Para editar una tarjeta: ábrala (clic), modifique los datos y guarde.
6. Para ver el Burndown: use el botón o enlace que abre el gráfico del sprint.

---

## 7. Miembros del proyecto (PMO y recursos)

**Qué puede hacer**

- Asignar o quitar el **PMO** (responsable del proyecto).
- Asignar **recursos** (personas del equipo) al proyecto e indicar las **horas de dedicación** de cada uno.
- Quitar recursos del proyecto.
- Gestionar los **días libres** de cada recurso (vacaciones, permisos, etc.) para que no se cuenten como días laborables en ese proyecto.

**Dónde**

- Dentro del dashboard del proyecto: opción **Miembros** (o “Members”).

**Asignar PMO**

1. En Miembros, use la opción para asignar PMO.
2. Elija el usuario que será el PMO del proyecto.
3. Confirme. El sistema indicará que el PMO fue vinculado.

**Quitar PMO**

1. En la sección del PMO asignado, use la opción para desvincular.
2. Confirme. El proyecto quedará sin PMO asignado hasta que asigne otro.

**Añadir recurso (miembro del equipo)**

1. En Miembros, use la opción para añadir recurso.
2. Elija el usuario y las **horas de dedicación** al proyecto.
3. Guarde. El recurso aparecerá en la lista de recursos del proyecto.

**Quitar recurso**

1. Localice el recurso en la lista.
2. Use la opción para desvincular (quitar del proyecto).
3. Confirme.

**Días libres de un recurso**

- Puede definir periodos en los que un recurso no trabaja (por ejemplo, vacaciones).
- Esos días no se consideran laborables para ese recurso en el proyecto.
- No se pueden solapar rangos de días libres del mismo recurso; el sistema lo indicará si hay conflicto.

**Cómo gestionar días libres**

1. En Miembros, localice el recurso.
2. Abra la opción para gestionar “Días libres” o “Calendario” de ese recurso.
3. Indique fecha de inicio y fecha de fin del periodo no laborable.
4. Guarde. El periodo aparecerá en la lista de días libres de ese recurso.
5. Si lo desea, puede eliminar un periodo ya registrado desde la misma pantalla.

---

## 8. Configuración del proyecto (días no laborables)

**Qué puede hacer**

- Definir **días no laborables del proyecto** (por ejemplo, festivos o cierres que afectan a todo el equipo).
- Esos días se aplican al proyecto en conjunto, no a una persona en particular.

**Dónde**

- Dentro del dashboard del proyecto: opción **Configuración** o **Settings**.

**Cómo**

1. En Configuración, busque la sección de “Días no laborables” o “Calendario del proyecto”.
2. Indique la **fecha de inicio** y la **fecha de fin** del periodo no laborable.
3. Guarde. El periodo aparecerá en la lista.
4. Puede añadir varios periodos (por ejemplo, varios festivos).
5. Para quitar un periodo, use la opción de eliminar sobre ese registro.

**Importante:** Los rangos de fechas no deben solaparse; si intenta guardar un periodo que se cruza con otro ya registrado, el sistema le avisará.

---

## 9. Resumen rápido por pantalla

| Pantalla / Sección | Qué hace aquí |
|--------------------|----------------|
| **Listado de proyectos** | Ver todos los proyectos, buscar por nombre, crear, editar, eliminar y abrir el dashboard de un proyecto. |
| **Dashboard → Tablero (Board)** | Ver y crear sprints, ver el Kanban, crear y mover actividades/tareas, ver detalle y comentarios, ver gráfico Burndown. |
| **Dashboard → Miembros** | Asignar o quitar PMO, añadir o quitar recursos con horas de dedicación, gestionar días libres por recurso. |
| **Dashboard → Configuración** | Gestionar los días no laborables del proyecto (festivos, cierres, etc.). |

---

## 10. Mensajes que puede ver

- **“Proyecto registrado con éxito”** / **“Proyecto actualizado con éxito”** — Al crear o editar un proyecto.
- **“El PMO ha sido vinculado al proyecto”** / **“El PMO ha sido desvinculado del proyecto”** — Al asignar o quitar el PMO.
- **“El recurso ha sido vinculado al proyecto”** / **“El recurso ha sido desvinculado del proyecto”** — Al añadir o quitar un recurso.
- **“Los días libres del recurso se han registrado con éxito”** / **“Los días libres del recurso se han eliminado con éxito”** — Al gestionar días libres de un recurso.
- **“Los días libres del proyecto se han registrado con éxito”** / **“Los días libres del proyecto se han eliminado con éxito”** — Al gestionar días no laborables del proyecto.
- **“El spring se ha registrado con éxito”** — Al crear un sprint.
- Mensajes de **error o advertencia** (por ejemplo, “El usuario ya se encuentra como recurso vinculado al proyecto” o “El rango de fechas entra en conflicto con rangos ya registrados”) — Debe corregir el dato o la acción indicada antes de continuar.

---

## 11. Si algo no funciona

- **No puede eliminar un proyecto:** Es posible que esta función no esté habilitada en su instalación; contacte al administrador.
- **No encuentra un usuario** al asignar PMO o recurso: Verifique que el usuario exista y que tenga permisos visibles para su rol.
- **No puede guardar días libres:** Compruebe que la fecha de inicio sea anterior o igual a la fecha de fin y que el rango no se solape con otro ya dado de alta (recurso o proyecto, según corresponda).
- **El tablero no muestra datos:** Asegúrese de haber seleccionado un sprint y de que ese sprint tenga actividades o tareas creadas.

Para otros problemas, contacte al administrador de la plataforma o al soporte técnico.

---

*Documento basado en el análisis del módulo de Proyectos (plataforma GIEP). Versión para usuario final — sin contenido técnico.*
