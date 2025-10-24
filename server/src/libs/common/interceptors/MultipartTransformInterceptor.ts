import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class MultipartTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      // Transform floorAssignments from flat structure to nested
      const floorAssignments = this.parseFloorAssignments(request.body);
      if (floorAssignments.length > 0) {
        request.body.floorAssignments = floorAssignments;
      }
    }

    return next.handle();
  }

  private parseFloorAssignments(body: any): any[] {
    const floorMap = new Map();

    // Find all floor assignment keys
    Object.keys(body).forEach((key) => {
      const floorMatch = key.match(/^floorAssignments\[(\d+)\]/);
      if (floorMatch) {
        const floorIndex = parseInt(floorMatch[1]);

        if (!floorMap.has(floorIndex)) {
          floorMap.set(floorIndex, { roomAssignments: [] });
        }

        const floor = floorMap.get(floorIndex);

        // Parse floor number
        if (key.includes("[floorNumber]")) {
          floor.floorNumber = parseInt(body[key]);
        }

        // Parse room assignments
        const roomMatch = key.match(
          /^floorAssignments\[(\d+)\]\[roomAssignments\]\[(\d+)\]\[(\w+)\]$/,
        );
        if (roomMatch) {
          const roomIndex = parseInt(roomMatch[2]);
          const field = roomMatch[3];

          // Ensure room assignment exists
          while (floor.roomAssignments.length <= roomIndex) {
            floor.roomAssignments.push({});
          }

          if (field === "roomNumbers") {
            // Handle roomNumbers specially
            let roomNumbers = body[key];
            if (typeof roomNumbers === "string") {
              if (roomNumbers.startsWith("[") && roomNumbers.endsWith("]")) {
                try {
                  roomNumbers = JSON.parse(roomNumbers);
                } catch {
                  roomNumbers = roomNumbers
                    .slice(1, -1)
                    .split(",")
                    .map((n) => parseInt(n.trim()));
                }
              } else if (roomNumbers.includes(",")) {
                roomNumbers = roomNumbers
                  .split(",")
                  .map((n) => parseInt(n.trim()));
              } else {
                roomNumbers = [parseInt(roomNumbers)];
              }
            }
            floor.roomAssignments[roomIndex][field] = roomNumbers;
          } else {
            floor.roomAssignments[roomIndex][field] = body[key];
          }
        }

        // Clean up the original key
        delete body[key];
      }
    });

    // Convert map to array
    const result: any[] = [];
    for (let i = 0; i < floorMap.size; i++) {
      if (floorMap.has(i)) {
        result[i] = floorMap.get(i);
      }
    }

    return result.filter((floor) => floor); // Remove undefined entries
  }
}
