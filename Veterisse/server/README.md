## Estructura de API REST para Aplicación de Inventario

Esta estructura define los endpoints principales basados en los módulos de la aplicación.

**Convenciones:**

* **Base URL:** `https://tuapi.dominio.com/api/v1` (Ejemplo)
* **Autenticación:** Se asume el uso de tokens (JWT - JSON Web Tokens) enviados en el header `Authorization: Bearer <token>` para las rutas protegidas.
* **Respuestas:** Generalmente en formato JSON.
* **Códigos de Estado HTTP:** Se usarán los códigos estándar (200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error).

---

### 1. Autenticación (`/auth`)

* **`POST /auth/login`**
  * **Descripción:** Autentica a un usuario.
  * **Request Body:** `{ "email": "user@example.com", "password": "password123" }`
  * **Response (Éxito - 200 OK):** `{ "token": "jwt_token_aqui", "user": { "id": 1, "name": "Nombre Usuario", "email": "user@example.com", "role": "admin" } }`
  * **Response (Fallo - 401 Unauthorized):** `{ "message": "Credenciales inválidas" }`
* **`POST /auth/register`**
  * **Descripción:** Registra un nuevo usuario.
  * **Request Body:** `{ "name": "Nuevo Usuario", "email": "new@example.com", "password": "password123", "confirmPassword": "password123" }`
  * **Response (Éxito - 201 Created):** `{ "message": "Usuario registrado exitosamente", "user": { ... } }` (Puede devolver el usuario creado o solo un mensaje)
  * **Response (Fallo - 400 Bad Request):** `{ "message": "El email ya está en uso" / "Las contraseñas no coinciden" / etc. }`
* **`POST /auth/forgot-password`**
  * **Descripción:** Inicia el proceso de recuperación de contraseña.
  * **Request Body:** `{ "email": "user@example.com" }`
  * **Response (Éxito - 200 OK):** `{ "message": "Se ha enviado un enlace de recuperación a tu email" }`
* **`POST /auth/reset-password`**
  * **Descripción:** Restablece la contraseña usando un token de recuperación.
  * **Request Body:** `{ "token": "recovery_token", "newPassword": "newPassword123", "confirmPassword": "newPassword123" }`
  * **Response (Éxito - 200 OK):** `{ "message": "Contraseña restablecida exitosamente" }`
  * **Response (Fallo - 400 Bad Request):** `{ "message": "Token inválido o expirado" / "Las contraseñas no coinciden" }`

---

### 2. Productos (`/products`)

* **`GET /products`**
  * **Descripción:** Obtiene una lista de todos los productos. Permite paginación, búsqueda y filtrado.
  * **Query Params (Opcionales):** `?page=1&limit=20&search=amoxi&category=1&lowStock=true`
  * **Response (Éxito - 200 OK):** `{ "data": [ { "id": 1, "code": "AMX001", "name": "Antibiótico AmoxiVet 500mg", "stock": 47, ... }, ... ], "pagination": { "currentPage": 1, "totalPages": 5, "totalItems": 95 } }`
* **`GET /products/{id}`**
  * **Descripción:** Obtiene los detalles de un producto específico.
  * **Response (Éxito - 200 OK):** `{ "id": 1, "code": "AMX001", "name": "Antibiótico AmoxiVet 500mg", "description": "...", "stock": 47, "price": 15.50, "cost": 10.00, "minStock": 10, "category": { "id": 1, "name": "Antibióticos" }, "supplier": { ... }, "movements": [ ... ] }` (Puede incluir historial de movimientos o no)
  * **Response (Fallo - 404 Not Found):** `{ "message": "Producto no encontrado" }`
* **`POST /products`**
  * **Descripción:** Crea un nuevo producto.
  * **Request Body:** `{ "code": "VAC002", "name": "Vacuna Felina Triple", "description": "...", "categoryId": 2, "unit": "dosis", "initialStock": 80, "price": 25.00, "cost": 18.00, "minStock": 15, "supplierId": 1, "location": "Estante A" }`
  * **Response (Éxito - 201 Created):** `{ "id": 126, "code": "VAC002", ... }` (Devuelve el producto creado)
  * **Response (Fallo - 400 Bad Request):** `{ "message": "Datos inválidos", "errors": { "code": "El código ya existe" } }`
* **`PUT /products/{id}`**
  * **Descripción:** Actualiza un producto existente.
  * **Request Body:** `{ "name": "Vacuna Felina Triple (Nueva Presentación)", "price": 26.00, ... }` (Solo los campos a modificar)
  * **Response (Éxito - 200 OK):** `{ "id": 126, "name": "Vacuna Felina Triple (Nueva Presentación)", ... }` (Devuelve el producto actualizado)
  * **Response (Fallo - 404 Not Found / 400 Bad Request):** `{ "message": "Producto no encontrado" / "Datos inválidos" }`
* **`DELETE /products/{id}`**
  * **Descripción:** Elimina un producto (considerar eliminación lógica o verificar si tiene movimientos).
  * **Response (Éxito - 204 No Content):** (Sin cuerpo de respuesta)
  * **Response (Fallo - 404 Not Found / 400 Bad Request):** `{ "message": "Producto no encontrado" / "No se puede eliminar el producto, tiene movimientos asociados" }`

---

### 3. Movimientos de Inventario (`/inventory/movements`)

* **`GET /inventory/movements`**
  * **Descripción:** Obtiene el historial de movimientos. Permite filtros.
  * **Query Params (Opcionales):** `?productId=1&type=salida&startDate=2024-01-01&endDate=2024-03-31&page=1&limit=50`
  * **Response (Éxito - 200 OK):** `{ "data": [ { "id": 3, "type": "salida", "description": "Venta a cliente Sr. Pérez", "date": "...", "quantity": 2, "product": { "id": 1, "name": "Antibiótico AmoxiVet 500mg" }, "user": { "id": 2, "name": "Empleado1" }, "reference": "VENT-2024-001" }, ... ], "pagination": { ... } }`
* **`POST /inventory/movements/entry`**
  * **Descripción:** Registra una entrada de stock (compra, devolución, etc.).
  * **Request Body:** `{ "productId": 1, "quantity": 50, "cost": 10.50, "supplierId": 2, "reference": "COMP-2024-044", "notes": "Lote XYZ" }`
  * **Response (Éxito - 201 Created):** `{ "id": 126, "type": "entrada", ... }` (Devuelve el movimiento creado)
  * **Response (Fallo - 400 Bad Request):** `{ "message": "Datos inválidos" / "Producto no encontrado" }`
* **`POST /inventory/movements/exit`**
  * **Descripción:** Registra una salida de stock (venta, uso, merma, etc.).
  * **Request Body:** `{ "productId": 1, "quantity": 5, "reason": "venta", "price": 16.00, "clientReference": "Sra. Gómez", "notes": "Receta #123" }`
  * **Response (Éxito - 201 Created):** `{ "id": 127, "type": "salida", ... }`
  * **Response (Fallo - 400 Bad Request):** `{ "message": "Datos inválidos" / "Stock insuficiente" }`
* **`POST /inventory/movements/adjustment`**
  * **Descripción:** Registra un ajuste de inventario.
  * **Request Body:** `{ "productId": 5, "countedQuantity": 28, "reason": "Conteo físico anual", "notes": "Diferencia de 2 unidades" }`
  * **Response (Éxito - 201 Created):** `{ "id": 128, "type": "ajuste", ... }`
  * **Response (Fallo - 400 Bad Request):** `{ "message": "Datos inválidos" }`
* **`GET /inventory/movements/{id}`**
  * **Descripción:** Obtiene los detalles de un movimiento específico (menos común, pero puede ser útil).
  * **Response (Éxito - 200 OK):** `{ "id": 3, "type": "salida", ... }`
  * **Response (Fallo - 404 Not Found):** `{ "message": "Movimiento no encontrado" }`

---

### 4. Categorías (`/categories`) - Opcional

* **`GET /categories`** : Lista todas las categorías.
* **`GET /categories/{id}`** : Obtiene una categoría.
* **`POST /categories`** : Crea una categoría.
* **`PUT /categories/{id}`** : Actualiza una categoría.
* **`DELETE /categories/{id}`** : Elimina una categoría (verificar si hay productos asociados).

---

### 5. Proveedores (`/suppliers`) - Opcional

* **`GET /suppliers`** : Lista todos los proveedores.
* **`GET /suppliers/{id}`** : Obtiene un proveedor.
* **`POST /suppliers`** : Crea un proveedor.
* **`PUT /suppliers/{id}`** : Actualiza un proveedor.
* **`DELETE /suppliers/{id}`** : Elimina un proveedor (verificar si hay productos o compras asociadas).

---

### 6. Reportes (`/reports`)

Estos endpoints podrían generar los datos crudos para que el frontend los visualice, o generar directamente archivos (CSV, PDF).

* **`GET /reports/current-stock`**
  * **Descripción:** Devuelve el stock actual de todos los productos o filtrados.
  * **Query Params (Opcionales):** `?category=1&supplier=2`
  * **Response (Éxito - 200 OK):** `{ "data": [ { "productId": 1, "productName": "...", "stock": 47 }, ... ] }`
* **`GET /reports/low-stock`**
  * **Descripción:** Devuelve los productos con stock por debajo del mínimo.
  * **Response (Éxito - 200 OK):** `{ "data": [ { "productId": 8, "productName": "...", "stock": 5, "minStock": 10 }, ... ] }`
* **`GET /reports/inventory-valuation`**
  * **Descripción:** Devuelve el valor total del inventario (basado en costo o precio).
  * **Query Params (Opcionales):** `?basis=cost` (o `price`)
  * **Response (Éxito - 200 OK):** `{ "totalValue": 15430.75, "basis": "cost", "details": [ { "productId": 1, "value": 493.50 }, ... ] }`
* **`GET /reports/movement-history`**
  * **Descripción:** Similar a `GET /inventory/movements`, pero enfocado a la exportación o resumen. Podría generar un archivo directamente.
  * **Query Params:** `?startDate=...&endDate=...&type=...&format=csv`
  * **Response (Éxito - 200 OK):** (Datos JSON o el archivo CSV/PDF)

---

### 7. Usuarios y Configuración (`/users`, `/settings`)

* **`GET /users`** (Solo Admins): Lista de usuarios.
* **`GET /users/me`** : Obtiene los datos del usuario autenticado actualmente.
* **`PUT /users/me`** : Actualiza los datos del usuario autenticado.
* **`POST /users/me/change-password`** : Cambia la contraseña del usuario autenticado.
* **`POST /users`** (Solo Admins): Crea un nuevo usuario.
* **`PUT /users/{id}`** (Solo Admins): Actualiza un usuario.
* **`DELETE /users/{id}`** (Solo Admins): Elimina un usuario.
* **`GET /settings`** : Obtiene la configuración general de la aplicación (moneda, etc.).
* **`PUT /settings`** (Solo Admins): Actualiza la configuración general.
