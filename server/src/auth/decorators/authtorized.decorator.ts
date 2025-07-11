import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common'
import { User } from '../../../__generated__'

export const Authorized = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user = request.user

        if (!user) {
            throw new UnauthorizedException('User is not authenticated')
        }

        return data ? user[data] : user
    },
)
