# AGENTS.md

## Instrucción principal

ntes de modificar este proyecto, revisa el archivo `PROJECT_STRUCTURE.md`.

Ese archivo contiene la estructura principal del sistema, el stack usado y la arquitectura Feature-Driven Architecture aplicada al frontend.


## 1. Contexto del proyecto

Este proyecto corresponde al frontend web del sistema **SIGAP - Sistema Integrado de Gestión de Agua Potable**.

La aplicación está desarrollada con:

- React
- TypeScript
- Vite
- TailwindCSS
- TanStack Table
- Axios para consumo de APIs
- TanStack Query para manejo de peticiones, caché y estados de carga

El frontend se comunica con microservicios backend mediante un API Gateway.

---

## 2. Objetivo del frontend

El objetivo de la aplicación es permitir la gestión de:

- Socios
- Cuentas contrato
- Medidores
- Asignación de medidores a socios
- Lecturas mensuales
- Facturación
- Pagos
- Multas
- Reportes administrativos

La aplicación debe ser clara, ordenada, responsive y fácil de usar para operadores, tesorería y administradores de la junta de agua potable.

---


## 3. Reglas generales de desarrollo

- Usar siempre TypeScript.
- No usar `any`, excepto en casos justificados.
- Crear interfaces o types para requests y responses.
- Separar lógica de negocio, servicios y componentes visuales.
- No consumir APIs directamente desde los componentes.
- No repetir código.
- Usar nombres claros en inglés para variables, funciones, archivos y componentes.
- Mantener los componentes pequeños y reutilizables.
- No colocar lógica pesada dentro del JSX.

---

## 4. Convenciones de nombres

### Componentes

Usar PascalCase:

```tsx
MeterForm.tsx
PartnerTable.tsx
ReadingPage.tsx
```

### Hooks

Usar prefijo `use`:

```ts
useMeters.ts
useCreatePartner.ts
useUpdateReading.ts
```

### Servicios

Usar sufijo `.service.ts`:

```ts
partner.service.ts
meter.service.ts
reading.service.ts
```

### Tipos

Usar sufijo `.types.ts`:

```ts
partner.types.ts
meter.types.ts
reading.types.ts
```

---

## 5. Configuración de variables de entorno

Las URLs del backend no deben estar quemadas en el código.

Usar variables de entorno de Vite:

```env
VITE_API_BASE_URL=http://localhost:4040
```

Crear un archivo central:

```ts
// src/config/env.ts

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};
```

---

## 6. Configuración de Axios

Todas las llamadas HTTP deben usar una instancia centralizada.

```ts
// src/config/axios.ts

import axios from "axios";
import { env } from "./env";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
```

No crear nuevas instancias de Axios dentro de componentes.

---

## 7. Consumo de APIs

Los servicios deben encargarse de llamar al backend.

Ejemplo:

```ts
// features/meters/services/meter.service.ts

import { apiClient } from "@/config/axios";
import type { MeterResponse, CreateMeterRequest } from "../types/meter.types";

const BASE_PATH = "/ms-meters/api/v1/meters";

export const meterService = {
  findAll: async (): Promise<MeterResponse[]> => {
    const response = await apiClient.get(BASE_PATH);
    return response.data.data;
  },

  findById: async (meterId: number): Promise<MeterResponse> => {
    const response = await apiClient.get(`${BASE_PATH}/${meterId}`);
    return response.data.data;
  },

  create: async (request: CreateMeterRequest): Promise<MeterResponse> => {
    const response = await apiClient.post(BASE_PATH, request);
    return response.data.data;
  },

  update: async (
    meterId: number,
    request: CreateMeterRequest
  ): Promise<MeterResponse> => {
    const response = await apiClient.put(`${BASE_PATH}/${meterId}`, request);
    return response.data.data;
  },

  remove: async (meterId: number): Promise<void> => {
    await apiClient.delete(`${BASE_PATH}/${meterId}`);
  },
};
```

---

## 8. Manejo de TanStack Query

Usar TanStack Query para listar, crear, actualizar y eliminar datos.

Ejemplo para listar:

```ts
// features/meters/hooks/useMeters.ts

import { useQuery } from "@tanstack/react-query";
import { meterService } from "../services/meter.service";

export const useMeters = () => {
  return useQuery({
    queryKey: ["meters"],
    queryFn: meterService.findAll,
  });
};
```

Ejemplo para crear:

```ts
// features/meters/hooks/useCreateMeter.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meterService } from "../services/meter.service";

export const useCreateMeter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: meterService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meters"] });
    },
  });
};
```

No llamar servicios directamente desde componentes si ya existe un hook.

---

## 9. Uso de TanStack Table

Las tablas deben estar separadas en componentes propios.

Reglas:

- Definir columnas en un archivo separado cuando la tabla sea grande.
- Usar `ColumnDef<T>` con tipos fuertes.
- Evitar lógica compleja dentro de las columnas.
- Agregar acciones como editar, eliminar o ver detalle en una columna `actions`.
- Usar paginación, filtros y ordenamiento cuando sea necesario.

Ejemplo:

```tsx
import type { ColumnDef } from "@tanstack/react-table";
import type { MeterResponse } from "../types/meter.types";

export const meterColumns: ColumnDef<MeterResponse>[] = [
  {
    accessorKey: "meterNumber",
    header: "Nro. Medidor",
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const meter = row.original;

      return (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:underline">
            Editar
          </button>
          <button className="text-red-600 hover:underline">
            Eliminar
          </button>
        </div>
      );
    },
  },
];
```

---

## 10. Reglas para TailwindCSS

- Usar TailwindCSS para estilos.
- Evitar CSS personalizado salvo que sea necesario.
- Mantener diseños responsive.
- Usar clases claras y consistentes.
- Evitar componentes con exceso de clases repetidas.
- Extraer estilos repetidos a componentes reutilizables.

Ejemplo de botón reutilizable:

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export const Button = ({ children, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      {children}
    </button>
  );
};
```

---

## 11. Manejo de formularios

Para formularios se recomienda usar:

- React Hook Form
- Zod para validaciones

Reglas:

- Validar campos obligatorios.
- Mostrar mensajes de error claros.
- No enviar datos vacíos o inválidos al backend.
- Mapear correctamente los nombres esperados por la API.

Ejemplo de nombres correctos para requests:

```ts
export type CreateMeterRequest = {
  meterNumber: string;
  brand: string;
  model: string;
  location: string;
  status: string;
};
```

---

## 12. Manejo de errores

Todos los errores de API deben mostrarse al usuario de forma clara.

Ejemplos de mensajes:

- "No se pudo cargar la información."
- "No se pudo guardar el registro."
- "El registro ya existe."
- "No tiene permisos para realizar esta acción."

No mostrar errores técnicos directamente al usuario final.

---

## 13. Autenticación y rutas protegidas

Las rutas privadas deben validar si existe un token válido.

Ejemplo de rutas:

```txt
/login
/dashboard
/partners
/meters
/readings
/billing
/payments
```

Reglas:

- Si el usuario no está autenticado, redirigir a `/login`.
- Si el usuario no tiene rol permitido, mostrar página de acceso denegado.
- Guardar el token de forma centralizada.
- No repetir lógica de autenticación en cada página.

---

## 14. Integración con backend

Los endpoints deben consumirse mediante el API Gateway.

Ejemplo:

```txt
http://localhost:4040/ms-partner/api/v1/partners
http://localhost:4040/ms-meters/api/v1/meters
http://localhost:4040/ms-readings/api/v1/readings
```

No consumir directamente los microservicios desde el frontend, salvo en pruebas locales puntuales.

---

## 15. Estados de carga

Toda pantalla que consuma APIs debe manejar:

- Loading
- Error
- Empty state
- Success

Ejemplo:

```tsx
if (isLoading) {
  return <p>Cargando información...</p>;
}

if (isError) {
  return <p>No se pudo cargar la información.</p>;
}

if (!data?.length) {
  return <p>No existen registros.</p>;
}
```

---

## 16. Buenas prácticas de UI

- Usar títulos claros en cada pantalla.
- Usar botones consistentes.
- Confirmar antes de eliminar registros.
- Mostrar mensajes de éxito al crear, actualizar o eliminar.
- Usar tablas limpias y fáciles de leer.
- Evitar pantallas saturadas de información.
- Mantener consistencia visual en formularios, modales y tablas.

---

## 17. Seguridad

- No guardar credenciales en el código.
- No subir archivos `.env` con datos sensibles.
- No imprimir tokens en consola.
- No exponer información sensible del backend.
- Validar permisos antes de mostrar acciones críticas.
- Manejar errores 401 y 403 correctamente.

---

## 18. Comandos del proyecto

Instalar dependencias:

```bash
npm install
```

Levantar ambiente local:

```bash
npm run dev
```

Compilar proyecto:

```bash
npm run build
```

Ejecutar lint:

```bash
npm run lint
```

---

## 19. Reglas para agentes de IA

Cuando un agente de IA modifique este proyecto debe cumplir lo siguiente:

1. Revisar la estructura existente antes de crear nuevos archivos.
2. No cambiar nombres de carpetas sin necesidad.
3. No modificar configuración global sin explicar el motivo.
4. No eliminar código existente sin justificarlo.
5. Crear componentes reutilizables cuando haya lógica repetida.
6. Mantener tipado fuerte con TypeScript.
7. Usar servicios para llamadas HTTP.
8. Usar hooks para TanStack Query.
9. Usar TanStack Table para tablas de datos.
10. Usar TailwindCSS para estilos.
11. No quemar URLs del backend.
12. No romper rutas existentes.
13. Mantener compatibilidad con el API Gateway.
14. Respetar los nombres de endpoints definidos por el backend.
15. Explicar cualquier cambio importante realizado.

---

## 20. Criterios antes de finalizar una tarea

Antes de dar una tarea como terminada, validar:

- El proyecto compila correctamente.
- No existen errores de TypeScript.
- No existen imports rotos.
- La pantalla es responsive.
- Las llamadas al backend usan `apiClient`.
- Los datos están tipados correctamente.
- La tabla funciona si aplica.
- Los errores se muestran al usuario.
- No hay código duplicado innecesario.

---

## 21. Estilo de respuesta esperado del agente

Cuando un agente responda sobre cambios realizados debe indicar:

- Qué archivo modificó.
- Qué problema resolvió.
- Qué patrón aplicó.
- Qué comando se recomienda ejecutar para validar.

Ejemplo:

```txt
Se creó el servicio meter.service.ts para centralizar las llamadas HTTP de medidores.
También se agregó el hook useMeters usando TanStack Query.
Para validar, ejecuta npm run dev y revisa la pantalla de medidores.
```
