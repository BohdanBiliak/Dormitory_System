import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { CreateAnnouncementDto } from '../create-announcement.dto';

@ValidatorConstraint({ name: 'hasRecipients', async: false })
export class HasRecipientsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const obj = args.object as CreateAnnouncementDto;
    
    // Check if forEveryone is true
    if (obj.forEveryone === true) {
      return true;
    }
    
    // Check if any of the recipient arrays have elements
    const hasUserIds = obj.userIds && obj.userIds.length > 0;
    const hasRoomIds = obj.roomIds && obj.roomIds.length > 0;
    const hasFloorIds = obj.floorIds && obj.floorIds.length > 0;
    const hasDormitoryIds = obj.dormitoryIds && obj.dormitoryIds.length > 0;
    
    return !!(hasUserIds || hasRoomIds || hasFloorIds || hasDormitoryIds);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Announcement must have at least one recipient. Set forEveryone to true or specify at least one of: userIds, roomIds, floorIds, or dormitoryIds.';
  }
}

export function HasRecipients(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasRecipientsConstraint,
    });
  };
}