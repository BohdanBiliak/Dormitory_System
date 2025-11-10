/**
 * Dormitory Admin Role Constants
 * These are used for the DormitoryAdmin.role field in the database
 * Note: These are strings, not enums, as defined in the Prisma schema
 */
export const DormitoryAdminRole = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type DormitoryAdminRoleType =
  (typeof DormitoryAdminRole)[keyof typeof DormitoryAdminRole];
