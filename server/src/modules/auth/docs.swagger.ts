// src/modules/auth/docs.swagger.ts
import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { RegisterDto } from "@/modules/auth/dto/register.dto";
import { LoginDto } from "@/modules/auth/dto/login.dto";

export function RegisterDocs() {
  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    ApiBody({
      description: "Form data with user details and three uploaded files",
      type: RegisterDto,
      schema: {
        type: "object",
        properties: {
          name: { type: "string", example: "Bohdan" },
          secondName: { type: "string", example: "Bilak" },
          email: { type: "string", example: "user@example.com" },
          password: { type: "string", example: "password123" },
          passwordRepeat: { type: "string", example: "password123" },
          avatar: { type: "string", format: "binary" },
          studentIdFront: { type: "string", format: "binary" },
          studentIdBack: { type: "string", format: "binary" },
        },
        required: ["name", "secondName", "email", "password", "passwordRepeat"],
      },
    }),
    ApiResponse({ status: 200, description: "User successfully registered" }),
    ApiResponse({ status: 409, description: "User already exists" }),
    ApiResponse({ status: 400, description: "Validation failed" }),
  );
}

export function LoginDocs() {
  return applyDecorators(
    ApiConsumes("application/json"),
    ApiOperation({ summary: "Log in with email and password, optional 2FA" }),
    ApiBody({ type: LoginDto }),
    ApiResponse({ status: 200, description: "Logged in / 2FA initiated" }),
    ApiResponse({ status: 404, description: "Invalid email or password" }),
    ApiResponse({
      status: 401,
      description: "Email not verified or 2FA required",
    }),
  );
}

export function LogoutDocs() {
  return applyDecorators(
    ApiOperation({ summary: "Log out and destroy session" }),
    ApiResponse({ status: 200, description: "Session cleared" }),
    ApiResponse({ status: 500, description: "Session destruction failed" }),
  );
}
