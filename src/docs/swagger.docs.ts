import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "ApiRestaurante",
    version: "1.0",
    contact: { email: "fcejas484@gmail.com", name: "Fekiso", url: "https://github.com/Fekiso" },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      Auth: {
        type: "object",
        properties: {
          user: { type: "string", example: "Fekiso" },
          pass: { type: "string", example: "Fekiso48" },
          rol: { type: "integer", example: 1 },
        },
      },
      Carta: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Verano 2023" },
          descripcion: { type: "string", example: "" },
          fechaInicioValidez: { type: "string", example: "2023-08-01" }, // Formato: "YYYY-MM-DD"
          fechaFinValidez: { type: "string", example: "2023-08-31" }, // Formato: "YYYY-MM-DD"
          habilitado: { type: "boolean", example: true },
        },
      },
      DetalleCarta: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          carta: { type: "integer", example: 2 },
          promocion: { type: "integer", example: null },
          producto: { type: "integer", example: 2 },
          Promocion: { $ref: "#/components/schemas/Promocion" },
          Producto: { $ref: "#/components/schemas/Producto" },
        },
      },
      DetallePedido: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          pedido: { type: "integer", example: 1 },
          producto: { type: "integer", example: 2 },
          promocion: { type: "integer", example: null },
          nombreProducto: {
            type: "string",
            example: "Coca",
          },
          precio: { type: "integer", example: null },
          cantidad: { type: "integer", example: null },
          Producto: { $ref: "#/components/schemas/Producto" },
          Promocion: { $ref: "#/components/schemas/Promocion" },
        },
      },
      DetallePromocion: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          promocion: { type: "integer", example: 1 },
          producto: { type: "integer", example: 2 },
          cantidad: { type: "integer", example: 2 },
          Producto: { $ref: "#/components/schemas/Producto" },
        },
      },
      DetalleTicket: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          ticket: { type: "integer", example: 1 },
          nombreProducto: {
            type: "string",
            example: "Coca",
          },
          precio: { type: "integer", example: null },
          cantidad: { type: "integer", example: null },
          producto: { type: "integer", example: 2 },
          promocion: { type: "integer", example: null },
          Producto: { $ref: "#/components/schemas/Producto" },
          Promocion: { $ref: "#/components/schemas/Promocion" },
        },
      },
      Empleado: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          user: { type: "string", example: "Fekiso" },
          pass: { type: "string", example: "Fekiso48" },
          nombre: { type: "string", example: "Fekiso" },
          apellido: { type: "string", example: "Othila" },
          nroDocumento: { type: "integer", example: 48848123 },
          rol: { type: "integer", example: 1 },
          telefono: { type: "string", example: "3525484848" },
          email: { type: "string", example: null },
          estado: { type: "integer", example: 1 },
          Estado: { $ref: "#/components/schemas/TipoEstadoUsuario" },
          TipoRol: { $ref: "#/components/schemas/TipoRol" },
        },
      },
      ErrorHTTP: {
        type: "object",
        properties: {
          code: { type: "integer", description: "Codigo error http", example: 400 },
          message: { type: "string", description: "Descripcion error http", example: "Fekiso" },
        },
      },
      Mesa: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          ubicacion: { type: "integer", example: 1 },
          habilitado: { type: "boolean", example: true },
        },
      },
      PagosPorTicket: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          ticket: { type: "integer", example: 1 },
          tipoPago: { type: "integer", example: 1 },
          importe: { type: "integer", example: 1.0 },
          Ticket: { $ref: "#/components/schemas/Ticket" },
          TipoPago: { $ref: "#/components/schemas/TipoPago" },
        },
      },
      Pedido: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          valida: { type: "boolean", example: true },
          estado: { type: "string", example: 1 },
          mesa: { type: "integer", example: 1 },
          empleadoAtiende: { type: "integer", example: 1 },
          EmpleadoAtiende: { $ref: "#/components/schemas/Empleado" },
          Mesa: { $ref: "#/components/schemas/Mesa" },
          EstadoPedido: { $ref: "#/components/schemas/EstadoPedido" },
        },
      },
      Producto: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Coca Cola" },
          descripcion: { type: "string", example: "350CC. (Latita)" },
          tipo: { type: "integer", example: 1 },
          precio: { type: "integer", example: 800.0 },
          TipoProducto: { $ref: "#/components/schemas/TipoProducto" },
        },
      },
      Promocion: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Promocion de prueba" },
          descripcion: { type: "string", example: "Descripción de la promocion" },
          precio: { type: "number", example: 10.99 },
          fechaInicio: { type: "string", example: "2023-08-01" }, // Formato: "YYYY-MM-DD"
          fechaFin: { type: "string", example: "2023-08-31" }, // Formato: "YYYY-MM-DD"
          horaInicio: { type: "string", example: "08:00:00" }, // Formato: "HH:MM:SS"
          horaFin: { type: "string", example: "20:00:00" }, // Formato: "HH:MM:SS"
          validoLunes: { type: "boolean", example: true },
          validoMartes: { type: "boolean", example: true },
          validoMiercoles: { type: "boolean", example: false },
          validoJueves: { type: "boolean", example: false },
          validoViernes: { type: "boolean", example: true },
          validoSabado: { type: "boolean", example: false },
          validoDomingo: { type: "boolean", example: false },
          estado: { type: "integer", example: true },
          Estado: { $ref: "#/components/schemas/TipoEstadoPromocion" },
        },
      },
      Ticket: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          valida: { type: "boolean", example: true },
          mesa: { type: "integer", example: 1 },
          empleadoAtiende: { type: "integer", example: 1 },
          empleadoFacturo: { type: "integer", example: 1 },
          Mesa: { $ref: "#/components/schemas/Mesa" },
          EmpleadoAtiende: { $ref: "#/components/schemas/Empleado" },
          EmpleadoFacturo: { $ref: "#/components/schemas/Empleado" },
        },
      },
      TipoEstadoUsuario: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Preparacion" },
          descripcion: { type: "string", example: "Empleado en capacitacion" },
          habilitado: { type: "boolean", example: true },
        },
      },
      TipoEstadoPedido: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Preparacion" },
          descripcion: { type: "string", example: null },
          habilitado: { type: "boolean", example: true },
        },
      },
      TipoEstadoPromocion: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Dado de baja" },
          descripcion: { type: "string", example: null },
          habilitado: { type: "boolean", example: true },
        },
      },
      TipoProducto: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Gaseosa" },
          descripcion: { type: "string", example: null },
          habilitado: { type: "boolean", example: true },
        },
      },
      TipoRol: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Administrador" },
          descripcion: { type: "string", example: null },
          habilitado: { type: "boolean", example: true },
        },
      },
      TipoPago: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Efectivo" },
          descripcion: { type: "string", example: null },
          habilitado: { type: "boolean", example: true },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
