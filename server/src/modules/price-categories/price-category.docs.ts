import { applyDecorators } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";

export class PriceCategoryDocs {
  static controller() {
    return applyDecorators(
      ApiTags("Price Categories"),
      ApiBearerAuth(),
    );
  }

  static create() {
    return applyDecorators(
      ApiOperation({
        summary: "Create a new price category",
        description: "Creates a new price category that can be assigned to room types or individual rooms. Only accessible by Admin and SuperAdmin roles.",
      }),
      ApiBody({
        description: "Price category creation data",
        examples: {
          "Standard Single Room": {
            summary: "Standard Single Room",
            description: "Example of creating a standard single room price category",
            value: {
              name: "Standard Single Room",
              description: "Standard pricing for single occupancy rooms with basic amenities",
              pricePerMonth: 600,
              pricePerDay: 25,
              isActive: true,
            },
          },
          "Premium Suite": {
            summary: "Premium Suite",
            description: "Example of creating a premium suite price category",
            value: {
              name: "Premium Suite",
              description: "Premium pricing for luxury suites with enhanced amenities",
              pricePerMonth: 1200,
              pricePerDay: 45,
              isActive: true,
            },
          },
        },
      }),
      ApiResponse({
        status: 201,
        description: "Price category created successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", example: "uuid-123" },
            name: { type: "string", example: "Standard Single Room" },
            description: { type: "string", example: "Standard pricing for single occupancy rooms" },
            pricePerMonth: { type: "number", example: 600 },
            pricePerDay: { type: "number", example: 25 },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: "Bad request - validation failed or name already exists",
        schema: {
          type: "object",
          properties: {
            statusCode: { type: "number", example: 400 },
            message: { type: "string", example: "Price category with name \"Standard Single Room\" already exists" },
            error: { type: "string", example: "Bad Request" },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
      ApiResponse({
        status: 403,
        description: "Forbidden - insufficient permissions (requires Admin or SuperAdmin role)",
      }),
    );
  }

  static findAll() {
    return applyDecorators(
      ApiOperation({
        summary: "Get all price categories",
        description: "Retrieves a list of all price categories with optional filtering by active status and search term.",
      }),
      ApiQuery({
        name: "isActive",
        required: false,
        type: Boolean,
        description: "Filter by active status",
        example: true,
      }),
      ApiQuery({
        name: "search",
        required: false,
        type: String,
        description: "Search by name (case-insensitive)",
        example: "standard",
      }),
      ApiResponse({
        status: 200,
        description: "Price categories retrieved successfully",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", example: "uuid-123" },
              name: { type: "string", example: "Standard Single Room" },
              description: { type: "string", example: "Standard pricing for single occupancy rooms" },
              pricePerMonth: { type: "number", example: 600 },
              pricePerDay: { type: "number", example: 25 },
              isActive: { type: "boolean", example: true },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
      ApiResponse({
        status: 403,
        description: "Forbidden - insufficient permissions",
      }),
    );
  }

  static findOne() {
    return applyDecorators(
      ApiOperation({
        summary: "Get a price category by ID",
        description: "Retrieves detailed information about a specific price category including its relationships.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Price category UUID",
        example: "uuid-123",
      }),
      ApiResponse({
        status: 200,
        description: "Price category retrieved successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", example: "uuid-123" },
            name: { type: "string", example: "Standard Single Room" },
            description: { type: "string", example: "Standard pricing for single occupancy rooms" },
            pricePerMonth: { type: "number", example: 600 },
            pricePerDay: { type: "number", example: 25 },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: "Price category not found",
        schema: {
          type: "object",
          properties: {
            statusCode: { type: "number", example: 404 },
            message: { type: "string", example: "Price category with ID uuid-123 not found" },
            error: { type: "string", example: "Not Found" },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
    );
  }

  static update() {
    return applyDecorators(
      ApiOperation({
        summary: "Update a price category",
        description: "Updates an existing price category. When prices are updated, all rooms and room types linked to this category will automatically use the new pricing.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Price category UUID",
        example: "uuid-123",
      }),
      ApiBody({
        description: "Price category update data",
        examples: {
          "Update Prices": {
            summary: "Update Prices",
            description: "Example of updating price amounts",
            value: {
              pricePerMonth: 650,
              pricePerDay: 27,
            },
          },
          "Update Name and Description": {
            summary: "Update Name and Description",
            description: "Example of updating name and description",
            value: {
              name: "Premium Single Room",
              description: "Premium pricing for single occupancy rooms with enhanced amenities",
            },
          },
          "Deactivate Category": {
            summary: "Deactivate Category",
            description: "Example of deactivating a price category",
            value: {
              isActive: false,
            },
          },
        },
      }),
      ApiResponse({
        status: 200,
        description: "Price category updated successfully",
        schema: {
          type: "object",
          properties: {
            id: { type: "string", example: "uuid-123" },
            name: { type: "string", example: "Premium Single Room" },
            description: { type: "string", example: "Premium pricing for single occupancy rooms" },
            pricePerMonth: { type: "number", example: 650 },
            pricePerDay: { type: "number", example: 27 },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: "Bad request - validation failed or name already exists",
      }),
      ApiResponse({
        status: 404,
        description: "Price category not found",
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
      ApiResponse({
        status: 403,
        description: "Forbidden - insufficient permissions",
      }),
    );
  }

  static delete() {
    return applyDecorators(
      ApiOperation({
        summary: "Delete a price category",
        description: "Deletes a price category and unassigns it from all linked rooms and room types. This action cannot be undone.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Price category UUID",
        example: "uuid-123",
      }),
      ApiResponse({
        status: 204,
        description: "Price category deleted successfully",
      }),
      ApiResponse({
        status: 404,
        description: "Price category not found",
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
      ApiResponse({
        status: 403,
        description: "Forbidden - insufficient permissions",
      }),
    );
  }

  static assignRoomTypes() {
    return applyDecorators(
      ApiOperation({
        summary: "Assign room types to a price category",
        description: "Assigns multiple room types to a price category. All existing rooms of these types will automatically inherit the category's pricing.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Price category UUID",
        example: "uuid-123",
      }),
      ApiBody({
        description: "Room types assignment data",
        examples: {
          "Assign Multiple Room Types": {
            summary: "Assign Multiple Room Types",
            description: "Example of assigning multiple room types to a price category",
            value: {
              roomTypeIds: ["room-type-uuid-1", "room-type-uuid-2", "room-type-uuid-3"],
            },
          },
        },
      }),
      ApiResponse({
        status: 200,
        description: "Room types assigned successfully",
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "Room types assigned successfully" },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: "Price category not found",
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
      ApiResponse({
        status: 403,
        description: "Forbidden - insufficient permissions",
      }),
    );
  }

  static assignRooms() {
    return applyDecorators(
      ApiOperation({
        summary: "Assign individual rooms to a price category",
        description: "Assigns specific rooms to a price category, overriding their room type's default pricing.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Price category UUID",
        example: "uuid-123",
      }),
      ApiBody({
        description: "Rooms assignment data",
        examples: {
          "Assign Individual Rooms": {
            summary: "Assign Individual Rooms",
            description: "Example of assigning specific rooms to a price category",
            value: {
              roomIds: ["room-uuid-1", "room-uuid-2", "room-uuid-3"],
            },
          },
        },
      }),
      ApiResponse({
        status: 200,
        description: "Rooms assigned successfully",
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "Rooms assigned successfully" },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: "Price category not found",
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
      ApiResponse({
        status: 403,
        description: "Forbidden - insufficient permissions",
      }),
    );
  }

  static getRoomTypes() {
    return applyDecorators(
      ApiOperation({
        summary: "Get room types assigned to a price category",
        description: "Retrieves all room types that are currently assigned to the specified price category.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Price category UUID",
        example: "uuid-123",
      }),
      ApiResponse({
        status: 200,
        description: "Room types retrieved successfully",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", example: "room-type-uuid-1" },
              name: { type: "string", example: "Standard Single" },
              description: { type: "string", example: "Standard single occupancy room" },
              capacity: { type: "number", example: 1 },
              equipment: { type: "array", items: { type: "string" }, example: ["bed", "desk", "wardrobe"] },
              typeCode: { type: "string", example: "SS01" },
              _count: {
                type: "object",
                properties: {
                  rooms: { type: "number", example: 25 },
                },
              },
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: "Price category not found",
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
    );
  }

  static getRooms() {
    return applyDecorators(
      ApiOperation({
        summary: "Get rooms assigned to a price category",
        description: "Retrieves all individual rooms that are currently assigned to the specified price category.",
      }),
      ApiParam({
        name: "id",
        type: String,
        description: "Price category UUID",
        example: "uuid-123",
      }),
      ApiResponse({
        status: 200,
        description: "Rooms retrieved successfully",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", example: "room-uuid-1" },
              number: { type: "string", example: "101" },
              capacity: { type: "number", example: 1 },
              roomEquipment: { type: "array", items: { type: "string" }, example: ["bed", "desk", "wardrobe"] },
              roomType: {
                type: "object",
                properties: {
                  id: { type: "string", example: "room-type-uuid-1" },
                  name: { type: "string", example: "Standard Single" },
                  typeCode: { type: "string", example: "SS01" },
                },
              },
              dormitory: {
                type: "object",
                properties: {
                  id: { type: "string", example: "dormitory-uuid-1" },
                  name: { type: "string", example: "East Wing Dormitory" },
                },
              },
            },
          },
        },
      }),
      ApiResponse({
        status: 404,
        description: "Price category not found",
      }),
      ApiResponse({
        status: 401,
        description: "Unauthorized - invalid or missing authentication token",
      }),
    );
  }
}