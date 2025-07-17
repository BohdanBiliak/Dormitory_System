
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model DormitoryAdmin
 * 
 */
export type DormitoryAdmin = $Result.DefaultSelection<Prisma.$DormitoryAdminPayload>
/**
 * Model Confirmation
 * 
 */
export type Confirmation = $Result.DefaultSelection<Prisma.$ConfirmationPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model Dormitory
 * 
 */
export type Dormitory = $Result.DefaultSelection<Prisma.$DormitoryPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model RoomStatus
 * 
 */
export type RoomStatus = $Result.DefaultSelection<Prisma.$RoomStatusPayload>
/**
 * Model Price
 * 
 */
export type Price = $Result.DefaultSelection<Prisma.$PricePayload>
/**
 * Model Announcement
 * 
 */
export type Announcement = $Result.DefaultSelection<Prisma.$AnnouncementPayload>
/**
 * Model Attachment
 * 
 */
export type Attachment = $Result.DefaultSelection<Prisma.$AttachmentPayload>
/**
 * Model AnnouncementRecipient
 * 
 */
export type AnnouncementRecipient = $Result.DefaultSelection<Prisma.$AnnouncementRecipientPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  Regular: 'Regular',
  Admin: 'Admin',
  SignedInUser: 'SignedInUser',
  SuperAdmin: 'SuperAdmin'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AuthMethod: {
  CREDENTIALS: 'CREDENTIALS',
  GOOGLE: 'GOOGLE'
};

export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod]


export const TokenType: {
  VERIFICATION: 'VERIFICATION',
  TWO_FACTOR: 'TWO_FACTOR',
  PASSWORD_RESET: 'PASSWORD_RESET'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]


export const ConfirmationType: {
  IDENTITY_VERIFICATION: 'IDENTITY_VERIFICATION',
  ACCOMMODATION: 'ACCOMMODATION',
  ROOM_CHANGE: 'ROOM_CHANGE',
  ROOM_VACATION: 'ROOM_VACATION'
};

export type ConfirmationType = (typeof ConfirmationType)[keyof typeof ConfirmationType]


export const ConfirmationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ConfirmationStatus = (typeof ConfirmationStatus)[keyof typeof ConfirmationStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AuthMethod = $Enums.AuthMethod

export const AuthMethod: typeof $Enums.AuthMethod

export type TokenType = $Enums.TokenType

export const TokenType: typeof $Enums.TokenType

export type ConfirmationType = $Enums.ConfirmationType

export const ConfirmationType: typeof $Enums.ConfirmationType

export type ConfirmationStatus = $Enums.ConfirmationStatus

export const ConfirmationStatus: typeof $Enums.ConfirmationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dormitoryAdmin`: Exposes CRUD operations for the **DormitoryAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DormitoryAdmins
    * const dormitoryAdmins = await prisma.dormitoryAdmin.findMany()
    * ```
    */
  get dormitoryAdmin(): Prisma.DormitoryAdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.confirmation`: Exposes CRUD operations for the **Confirmation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Confirmations
    * const confirmations = await prisma.confirmation.findMany()
    * ```
    */
  get confirmation(): Prisma.ConfirmationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dormitory`: Exposes CRUD operations for the **Dormitory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dormitories
    * const dormitories = await prisma.dormitory.findMany()
    * ```
    */
  get dormitory(): Prisma.DormitoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomStatus`: Exposes CRUD operations for the **RoomStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomStatuses
    * const roomStatuses = await prisma.roomStatus.findMany()
    * ```
    */
  get roomStatus(): Prisma.RoomStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.price`: Exposes CRUD operations for the **Price** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prices
    * const prices = await prisma.price.findMany()
    * ```
    */
  get price(): Prisma.PriceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcement`: Exposes CRUD operations for the **Announcement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Announcements
    * const announcements = await prisma.announcement.findMany()
    * ```
    */
  get announcement(): Prisma.AnnouncementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachments
    * const attachments = await prisma.attachment.findMany()
    * ```
    */
  get attachment(): Prisma.AttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcementRecipient`: Exposes CRUD operations for the **AnnouncementRecipient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnnouncementRecipients
    * const announcementRecipients = await prisma.announcementRecipient.findMany()
    * ```
    */
  get announcementRecipient(): Prisma.AnnouncementRecipientDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    DormitoryAdmin: 'DormitoryAdmin',
    Confirmation: 'Confirmation',
    Token: 'Token',
    Dormitory: 'Dormitory',
    Room: 'Room',
    RoomStatus: 'RoomStatus',
    Price: 'Price',
    Announcement: 'Announcement',
    Attachment: 'Attachment',
    AnnouncementRecipient: 'AnnouncementRecipient'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "dormitoryAdmin" | "confirmation" | "token" | "dormitory" | "room" | "roomStatus" | "price" | "announcement" | "attachment" | "announcementRecipient"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      DormitoryAdmin: {
        payload: Prisma.$DormitoryAdminPayload<ExtArgs>
        fields: Prisma.DormitoryAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DormitoryAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DormitoryAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>
          }
          findFirst: {
            args: Prisma.DormitoryAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DormitoryAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>
          }
          findMany: {
            args: Prisma.DormitoryAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>[]
          }
          create: {
            args: Prisma.DormitoryAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>
          }
          createMany: {
            args: Prisma.DormitoryAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DormitoryAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>[]
          }
          delete: {
            args: Prisma.DormitoryAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>
          }
          update: {
            args: Prisma.DormitoryAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>
          }
          deleteMany: {
            args: Prisma.DormitoryAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DormitoryAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DormitoryAdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>[]
          }
          upsert: {
            args: Prisma.DormitoryAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryAdminPayload>
          }
          aggregate: {
            args: Prisma.DormitoryAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDormitoryAdmin>
          }
          groupBy: {
            args: Prisma.DormitoryAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<DormitoryAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.DormitoryAdminCountArgs<ExtArgs>
            result: $Utils.Optional<DormitoryAdminCountAggregateOutputType> | number
          }
        }
      }
      Confirmation: {
        payload: Prisma.$ConfirmationPayload<ExtArgs>
        fields: Prisma.ConfirmationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfirmationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfirmationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>
          }
          findFirst: {
            args: Prisma.ConfirmationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfirmationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>
          }
          findMany: {
            args: Prisma.ConfirmationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>[]
          }
          create: {
            args: Prisma.ConfirmationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>
          }
          createMany: {
            args: Prisma.ConfirmationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfirmationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>[]
          }
          delete: {
            args: Prisma.ConfirmationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>
          }
          update: {
            args: Prisma.ConfirmationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>
          }
          deleteMany: {
            args: Prisma.ConfirmationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfirmationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConfirmationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>[]
          }
          upsert: {
            args: Prisma.ConfirmationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfirmationPayload>
          }
          aggregate: {
            args: Prisma.ConfirmationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfirmation>
          }
          groupBy: {
            args: Prisma.ConfirmationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfirmationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfirmationCountArgs<ExtArgs>
            result: $Utils.Optional<ConfirmationCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      Dormitory: {
        payload: Prisma.$DormitoryPayload<ExtArgs>
        fields: Prisma.DormitoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DormitoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DormitoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>
          }
          findFirst: {
            args: Prisma.DormitoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DormitoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>
          }
          findMany: {
            args: Prisma.DormitoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>[]
          }
          create: {
            args: Prisma.DormitoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>
          }
          createMany: {
            args: Prisma.DormitoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DormitoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>[]
          }
          delete: {
            args: Prisma.DormitoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>
          }
          update: {
            args: Prisma.DormitoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>
          }
          deleteMany: {
            args: Prisma.DormitoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DormitoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DormitoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>[]
          }
          upsert: {
            args: Prisma.DormitoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DormitoryPayload>
          }
          aggregate: {
            args: Prisma.DormitoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDormitory>
          }
          groupBy: {
            args: Prisma.DormitoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DormitoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DormitoryCountArgs<ExtArgs>
            result: $Utils.Optional<DormitoryCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      RoomStatus: {
        payload: Prisma.$RoomStatusPayload<ExtArgs>
        fields: Prisma.RoomStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          findFirst: {
            args: Prisma.RoomStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          findMany: {
            args: Prisma.RoomStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>[]
          }
          create: {
            args: Prisma.RoomStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          createMany: {
            args: Prisma.RoomStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>[]
          }
          delete: {
            args: Prisma.RoomStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          update: {
            args: Prisma.RoomStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          deleteMany: {
            args: Prisma.RoomStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>[]
          }
          upsert: {
            args: Prisma.RoomStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStatusPayload>
          }
          aggregate: {
            args: Prisma.RoomStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomStatus>
          }
          groupBy: {
            args: Prisma.RoomStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomStatusCountArgs<ExtArgs>
            result: $Utils.Optional<RoomStatusCountAggregateOutputType> | number
          }
        }
      }
      Price: {
        payload: Prisma.$PricePayload<ExtArgs>
        fields: Prisma.PriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          findFirst: {
            args: Prisma.PriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          findMany: {
            args: Prisma.PriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          create: {
            args: Prisma.PriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          createMany: {
            args: Prisma.PriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          delete: {
            args: Prisma.PriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          update: {
            args: Prisma.PriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          deleteMany: {
            args: Prisma.PriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>[]
          }
          upsert: {
            args: Prisma.PriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricePayload>
          }
          aggregate: {
            args: Prisma.PriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrice>
          }
          groupBy: {
            args: Prisma.PriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceCountArgs<ExtArgs>
            result: $Utils.Optional<PriceCountAggregateOutputType> | number
          }
        }
      }
      Announcement: {
        payload: Prisma.$AnnouncementPayload<ExtArgs>
        fields: Prisma.AnnouncementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findFirst: {
            args: Prisma.AnnouncementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findMany: {
            args: Prisma.AnnouncementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          create: {
            args: Prisma.AnnouncementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          createMany: {
            args: Prisma.AnnouncementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnnouncementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          delete: {
            args: Prisma.AnnouncementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          update: {
            args: Prisma.AnnouncementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnnouncementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          upsert: {
            args: Prisma.AnnouncementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          aggregate: {
            args: Prisma.AnnouncementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncement>
          }
          groupBy: {
            args: Prisma.AnnouncementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementCountAggregateOutputType> | number
          }
        }
      }
      Attachment: {
        payload: Prisma.$AttachmentPayload<ExtArgs>
        fields: Prisma.AttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findFirst: {
            args: Prisma.AttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findMany: {
            args: Prisma.AttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          create: {
            args: Prisma.AttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          createMany: {
            args: Prisma.AttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          delete: {
            args: Prisma.AttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          update: {
            args: Prisma.AttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          deleteMany: {
            args: Prisma.AttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          upsert: {
            args: Prisma.AttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachment>
          }
          groupBy: {
            args: Prisma.AttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<AttachmentCountAggregateOutputType> | number
          }
        }
      }
      AnnouncementRecipient: {
        payload: Prisma.$AnnouncementRecipientPayload<ExtArgs>
        fields: Prisma.AnnouncementRecipientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementRecipientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementRecipientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>
          }
          findFirst: {
            args: Prisma.AnnouncementRecipientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementRecipientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>
          }
          findMany: {
            args: Prisma.AnnouncementRecipientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>[]
          }
          create: {
            args: Prisma.AnnouncementRecipientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>
          }
          createMany: {
            args: Prisma.AnnouncementRecipientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnnouncementRecipientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>[]
          }
          delete: {
            args: Prisma.AnnouncementRecipientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>
          }
          update: {
            args: Prisma.AnnouncementRecipientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementRecipientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementRecipientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnnouncementRecipientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>[]
          }
          upsert: {
            args: Prisma.AnnouncementRecipientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementRecipientPayload>
          }
          aggregate: {
            args: Prisma.AnnouncementRecipientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncementRecipient>
          }
          groupBy: {
            args: Prisma.AnnouncementRecipientGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementRecipientGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementRecipientCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementRecipientCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    dormitoryAdmin?: DormitoryAdminOmit
    confirmation?: ConfirmationOmit
    token?: TokenOmit
    dormitory?: DormitoryOmit
    room?: RoomOmit
    roomStatus?: RoomStatusOmit
    price?: PriceOmit
    announcement?: AnnouncementOmit
    attachment?: AttachmentOmit
    announcementRecipient?: AnnouncementRecipientOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    confirmations: number
    dormitoryAdminAssignments: number
    managedDormitories: number
    announcements: number
    announcementRecipients: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    confirmations?: boolean | UserCountOutputTypeCountConfirmationsArgs
    dormitoryAdminAssignments?: boolean | UserCountOutputTypeCountDormitoryAdminAssignmentsArgs
    managedDormitories?: boolean | UserCountOutputTypeCountManagedDormitoriesArgs
    announcements?: boolean | UserCountOutputTypeCountAnnouncementsArgs
    announcementRecipients?: boolean | UserCountOutputTypeCountAnnouncementRecipientsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConfirmationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfirmationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDormitoryAdminAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DormitoryAdminWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountManagedDormitoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DormitoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnnouncementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnnouncementRecipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementRecipientWhereInput
  }


  /**
   * Count Type DormitoryCountOutputType
   */

  export type DormitoryCountOutputType = {
    admins: number
    residents: number
    rooms: number
  }

  export type DormitoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admins?: boolean | DormitoryCountOutputTypeCountAdminsArgs
    residents?: boolean | DormitoryCountOutputTypeCountResidentsArgs
    rooms?: boolean | DormitoryCountOutputTypeCountRoomsArgs
  }

  // Custom InputTypes
  /**
   * DormitoryCountOutputType without action
   */
  export type DormitoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryCountOutputType
     */
    select?: DormitoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DormitoryCountOutputType without action
   */
  export type DormitoryCountOutputTypeCountAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DormitoryAdminWhereInput
  }

  /**
   * DormitoryCountOutputType without action
   */
  export type DormitoryCountOutputTypeCountResidentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * DormitoryCountOutputType without action
   */
  export type DormitoryCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    statuses: number
    residents: number
    announcementRecipients: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statuses?: boolean | RoomCountOutputTypeCountStatusesArgs
    residents?: boolean | RoomCountOutputTypeCountResidentsArgs
    announcementRecipients?: boolean | RoomCountOutputTypeCountAnnouncementRecipientsArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStatusWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountResidentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountAnnouncementRecipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementRecipientWhereInput
  }


  /**
   * Count Type AnnouncementCountOutputType
   */

  export type AnnouncementCountOutputType = {
    attachments: number
    recipients: number
  }

  export type AnnouncementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | AnnouncementCountOutputTypeCountAttachmentsArgs
    recipients?: boolean | AnnouncementCountOutputTypeCountRecipientsArgs
  }

  // Custom InputTypes
  /**
   * AnnouncementCountOutputType without action
   */
  export type AnnouncementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementCountOutputType
     */
    select?: AnnouncementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnnouncementCountOutputType without action
   */
  export type AnnouncementCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }

  /**
   * AnnouncementCountOutputType without action
   */
  export type AnnouncementCountOutputTypeCountRecipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementRecipientWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    displayName: string | null
    picture: string | null
    isVerified: boolean | null
    isTwoFactorEnabled: boolean | null
    method: $Enums.AuthMethod | null
    role: $Enums.UserRole | null
    secondName: string | null
    studentIdFront: string | null
    studentIdBack: string | null
    dormitoryId: string | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    displayName: string | null
    picture: string | null
    isVerified: boolean | null
    isTwoFactorEnabled: boolean | null
    method: $Enums.AuthMethod | null
    role: $Enums.UserRole | null
    secondName: string | null
    studentIdFront: string | null
    studentIdBack: string | null
    dormitoryId: string | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    displayName: number
    picture: number
    isVerified: number
    isTwoFactorEnabled: number
    method: number
    role: number
    secondName: number
    studentIdFront: number
    studentIdBack: number
    dormitoryId: number
    roomId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    picture?: true
    isVerified?: true
    isTwoFactorEnabled?: true
    method?: true
    role?: true
    secondName?: true
    studentIdFront?: true
    studentIdBack?: true
    dormitoryId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    picture?: true
    isVerified?: true
    isTwoFactorEnabled?: true
    method?: true
    role?: true
    secondName?: true
    studentIdFront?: true
    studentIdBack?: true
    dormitoryId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    picture?: true
    isVerified?: true
    isTwoFactorEnabled?: true
    method?: true
    role?: true
    secondName?: true
    studentIdFront?: true
    studentIdBack?: true
    dormitoryId?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified: boolean
    isTwoFactorEnabled: boolean
    method: $Enums.AuthMethod
    role: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack: string | null
    dormitoryId: string | null
    roomId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    picture?: boolean
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method?: boolean
    role?: boolean
    secondName?: boolean
    studentIdFront?: boolean
    studentIdBack?: boolean
    dormitoryId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    confirmations?: boolean | User$confirmationsArgs<ExtArgs>
    dormitoryAdminAssignments?: boolean | User$dormitoryAdminAssignmentsArgs<ExtArgs>
    dormitory?: boolean | User$dormitoryArgs<ExtArgs>
    managedDormitories?: boolean | User$managedDormitoriesArgs<ExtArgs>
    room?: boolean | User$roomArgs<ExtArgs>
    announcements?: boolean | User$announcementsArgs<ExtArgs>
    announcementRecipients?: boolean | User$announcementRecipientsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    picture?: boolean
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method?: boolean
    role?: boolean
    secondName?: boolean
    studentIdFront?: boolean
    studentIdBack?: boolean
    dormitoryId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dormitory?: boolean | User$dormitoryArgs<ExtArgs>
    room?: boolean | User$roomArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    picture?: boolean
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method?: boolean
    role?: boolean
    secondName?: boolean
    studentIdFront?: boolean
    studentIdBack?: boolean
    dormitoryId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dormitory?: boolean | User$dormitoryArgs<ExtArgs>
    room?: boolean | User$roomArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    picture?: boolean
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method?: boolean
    role?: boolean
    secondName?: boolean
    studentIdFront?: boolean
    studentIdBack?: boolean
    dormitoryId?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "displayName" | "picture" | "isVerified" | "isTwoFactorEnabled" | "method" | "role" | "secondName" | "studentIdFront" | "studentIdBack" | "dormitoryId" | "roomId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    confirmations?: boolean | User$confirmationsArgs<ExtArgs>
    dormitoryAdminAssignments?: boolean | User$dormitoryAdminAssignmentsArgs<ExtArgs>
    dormitory?: boolean | User$dormitoryArgs<ExtArgs>
    managedDormitories?: boolean | User$managedDormitoriesArgs<ExtArgs>
    room?: boolean | User$roomArgs<ExtArgs>
    announcements?: boolean | User$announcementsArgs<ExtArgs>
    announcementRecipients?: boolean | User$announcementRecipientsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dormitory?: boolean | User$dormitoryArgs<ExtArgs>
    room?: boolean | User$roomArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dormitory?: boolean | User$dormitoryArgs<ExtArgs>
    room?: boolean | User$roomArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      confirmations: Prisma.$ConfirmationPayload<ExtArgs>[]
      dormitoryAdminAssignments: Prisma.$DormitoryAdminPayload<ExtArgs>[]
      dormitory: Prisma.$DormitoryPayload<ExtArgs> | null
      managedDormitories: Prisma.$DormitoryPayload<ExtArgs>[]
      room: Prisma.$RoomPayload<ExtArgs> | null
      announcements: Prisma.$AnnouncementPayload<ExtArgs>[]
      announcementRecipients: Prisma.$AnnouncementRecipientPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      displayName: string
      picture: string
      isVerified: boolean
      isTwoFactorEnabled: boolean
      method: $Enums.AuthMethod
      role: $Enums.UserRole
      secondName: string
      studentIdFront: string
      studentIdBack: string | null
      dormitoryId: string | null
      roomId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    confirmations<T extends User$confirmationsArgs<ExtArgs> = {}>(args?: Subset<T, User$confirmationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dormitoryAdminAssignments<T extends User$dormitoryAdminAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$dormitoryAdminAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dormitory<T extends User$dormitoryArgs<ExtArgs> = {}>(args?: Subset<T, User$dormitoryArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    managedDormitories<T extends User$managedDormitoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$managedDormitoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    room<T extends User$roomArgs<ExtArgs> = {}>(args?: Subset<T, User$roomArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    announcements<T extends User$announcementsArgs<ExtArgs> = {}>(args?: Subset<T, User$announcementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    announcementRecipients<T extends User$announcementRecipientsArgs<ExtArgs> = {}>(args?: Subset<T, User$announcementRecipientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly picture: FieldRef<"User", 'String'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly isTwoFactorEnabled: FieldRef<"User", 'Boolean'>
    readonly method: FieldRef<"User", 'AuthMethod'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly secondName: FieldRef<"User", 'String'>
    readonly studentIdFront: FieldRef<"User", 'String'>
    readonly studentIdBack: FieldRef<"User", 'String'>
    readonly dormitoryId: FieldRef<"User", 'String'>
    readonly roomId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.confirmations
   */
  export type User$confirmationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    where?: ConfirmationWhereInput
    orderBy?: ConfirmationOrderByWithRelationInput | ConfirmationOrderByWithRelationInput[]
    cursor?: ConfirmationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConfirmationScalarFieldEnum | ConfirmationScalarFieldEnum[]
  }

  /**
   * User.dormitoryAdminAssignments
   */
  export type User$dormitoryAdminAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    where?: DormitoryAdminWhereInput
    orderBy?: DormitoryAdminOrderByWithRelationInput | DormitoryAdminOrderByWithRelationInput[]
    cursor?: DormitoryAdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DormitoryAdminScalarFieldEnum | DormitoryAdminScalarFieldEnum[]
  }

  /**
   * User.dormitory
   */
  export type User$dormitoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    where?: DormitoryWhereInput
  }

  /**
   * User.managedDormitories
   */
  export type User$managedDormitoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    where?: DormitoryWhereInput
    orderBy?: DormitoryOrderByWithRelationInput | DormitoryOrderByWithRelationInput[]
    cursor?: DormitoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DormitoryScalarFieldEnum | DormitoryScalarFieldEnum[]
  }

  /**
   * User.room
   */
  export type User$roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
  }

  /**
   * User.announcements
   */
  export type User$announcementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    cursor?: AnnouncementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * User.announcementRecipients
   */
  export type User$announcementRecipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    where?: AnnouncementRecipientWhereInput
    orderBy?: AnnouncementRecipientOrderByWithRelationInput | AnnouncementRecipientOrderByWithRelationInput[]
    cursor?: AnnouncementRecipientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementRecipientScalarFieldEnum | AnnouncementRecipientScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model DormitoryAdmin
   */

  export type AggregateDormitoryAdmin = {
    _count: DormitoryAdminCountAggregateOutputType | null
    _min: DormitoryAdminMinAggregateOutputType | null
    _max: DormitoryAdminMaxAggregateOutputType | null
  }

  export type DormitoryAdminMinAggregateOutputType = {
    id: string | null
    userId: string | null
    dormitoryId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type DormitoryAdminMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    dormitoryId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type DormitoryAdminCountAggregateOutputType = {
    id: number
    userId: number
    dormitoryId: number
    role: number
    createdAt: number
    _all: number
  }


  export type DormitoryAdminMinAggregateInputType = {
    id?: true
    userId?: true
    dormitoryId?: true
    role?: true
    createdAt?: true
  }

  export type DormitoryAdminMaxAggregateInputType = {
    id?: true
    userId?: true
    dormitoryId?: true
    role?: true
    createdAt?: true
  }

  export type DormitoryAdminCountAggregateInputType = {
    id?: true
    userId?: true
    dormitoryId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type DormitoryAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DormitoryAdmin to aggregate.
     */
    where?: DormitoryAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DormitoryAdmins to fetch.
     */
    orderBy?: DormitoryAdminOrderByWithRelationInput | DormitoryAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DormitoryAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DormitoryAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DormitoryAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DormitoryAdmins
    **/
    _count?: true | DormitoryAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DormitoryAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DormitoryAdminMaxAggregateInputType
  }

  export type GetDormitoryAdminAggregateType<T extends DormitoryAdminAggregateArgs> = {
        [P in keyof T & keyof AggregateDormitoryAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDormitoryAdmin[P]>
      : GetScalarType<T[P], AggregateDormitoryAdmin[P]>
  }




  export type DormitoryAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DormitoryAdminWhereInput
    orderBy?: DormitoryAdminOrderByWithAggregationInput | DormitoryAdminOrderByWithAggregationInput[]
    by: DormitoryAdminScalarFieldEnum[] | DormitoryAdminScalarFieldEnum
    having?: DormitoryAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DormitoryAdminCountAggregateInputType | true
    _min?: DormitoryAdminMinAggregateInputType
    _max?: DormitoryAdminMaxAggregateInputType
  }

  export type DormitoryAdminGroupByOutputType = {
    id: string
    userId: string
    dormitoryId: string
    role: string
    createdAt: Date
    _count: DormitoryAdminCountAggregateOutputType | null
    _min: DormitoryAdminMinAggregateOutputType | null
    _max: DormitoryAdminMaxAggregateOutputType | null
  }

  type GetDormitoryAdminGroupByPayload<T extends DormitoryAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DormitoryAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DormitoryAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DormitoryAdminGroupByOutputType[P]>
            : GetScalarType<T[P], DormitoryAdminGroupByOutputType[P]>
        }
      >
    >


  export type DormitoryAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dormitoryId?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dormitory?: boolean | DormitoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dormitoryAdmin"]>

  export type DormitoryAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dormitoryId?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dormitory?: boolean | DormitoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dormitoryAdmin"]>

  export type DormitoryAdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dormitoryId?: boolean
    role?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dormitory?: boolean | DormitoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dormitoryAdmin"]>

  export type DormitoryAdminSelectScalar = {
    id?: boolean
    userId?: boolean
    dormitoryId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type DormitoryAdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "dormitoryId" | "role" | "createdAt", ExtArgs["result"]["dormitoryAdmin"]>
  export type DormitoryAdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dormitory?: boolean | DormitoryDefaultArgs<ExtArgs>
  }
  export type DormitoryAdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dormitory?: boolean | DormitoryDefaultArgs<ExtArgs>
  }
  export type DormitoryAdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dormitory?: boolean | DormitoryDefaultArgs<ExtArgs>
  }

  export type $DormitoryAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DormitoryAdmin"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      dormitory: Prisma.$DormitoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      dormitoryId: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["dormitoryAdmin"]>
    composites: {}
  }

  type DormitoryAdminGetPayload<S extends boolean | null | undefined | DormitoryAdminDefaultArgs> = $Result.GetResult<Prisma.$DormitoryAdminPayload, S>

  type DormitoryAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DormitoryAdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DormitoryAdminCountAggregateInputType | true
    }

  export interface DormitoryAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DormitoryAdmin'], meta: { name: 'DormitoryAdmin' } }
    /**
     * Find zero or one DormitoryAdmin that matches the filter.
     * @param {DormitoryAdminFindUniqueArgs} args - Arguments to find a DormitoryAdmin
     * @example
     * // Get one DormitoryAdmin
     * const dormitoryAdmin = await prisma.dormitoryAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DormitoryAdminFindUniqueArgs>(args: SelectSubset<T, DormitoryAdminFindUniqueArgs<ExtArgs>>): Prisma__DormitoryAdminClient<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DormitoryAdmin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DormitoryAdminFindUniqueOrThrowArgs} args - Arguments to find a DormitoryAdmin
     * @example
     * // Get one DormitoryAdmin
     * const dormitoryAdmin = await prisma.dormitoryAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DormitoryAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, DormitoryAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DormitoryAdminClient<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DormitoryAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryAdminFindFirstArgs} args - Arguments to find a DormitoryAdmin
     * @example
     * // Get one DormitoryAdmin
     * const dormitoryAdmin = await prisma.dormitoryAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DormitoryAdminFindFirstArgs>(args?: SelectSubset<T, DormitoryAdminFindFirstArgs<ExtArgs>>): Prisma__DormitoryAdminClient<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DormitoryAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryAdminFindFirstOrThrowArgs} args - Arguments to find a DormitoryAdmin
     * @example
     * // Get one DormitoryAdmin
     * const dormitoryAdmin = await prisma.dormitoryAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DormitoryAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, DormitoryAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__DormitoryAdminClient<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DormitoryAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DormitoryAdmins
     * const dormitoryAdmins = await prisma.dormitoryAdmin.findMany()
     * 
     * // Get first 10 DormitoryAdmins
     * const dormitoryAdmins = await prisma.dormitoryAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dormitoryAdminWithIdOnly = await prisma.dormitoryAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DormitoryAdminFindManyArgs>(args?: SelectSubset<T, DormitoryAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DormitoryAdmin.
     * @param {DormitoryAdminCreateArgs} args - Arguments to create a DormitoryAdmin.
     * @example
     * // Create one DormitoryAdmin
     * const DormitoryAdmin = await prisma.dormitoryAdmin.create({
     *   data: {
     *     // ... data to create a DormitoryAdmin
     *   }
     * })
     * 
     */
    create<T extends DormitoryAdminCreateArgs>(args: SelectSubset<T, DormitoryAdminCreateArgs<ExtArgs>>): Prisma__DormitoryAdminClient<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DormitoryAdmins.
     * @param {DormitoryAdminCreateManyArgs} args - Arguments to create many DormitoryAdmins.
     * @example
     * // Create many DormitoryAdmins
     * const dormitoryAdmin = await prisma.dormitoryAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DormitoryAdminCreateManyArgs>(args?: SelectSubset<T, DormitoryAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DormitoryAdmins and returns the data saved in the database.
     * @param {DormitoryAdminCreateManyAndReturnArgs} args - Arguments to create many DormitoryAdmins.
     * @example
     * // Create many DormitoryAdmins
     * const dormitoryAdmin = await prisma.dormitoryAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DormitoryAdmins and only return the `id`
     * const dormitoryAdminWithIdOnly = await prisma.dormitoryAdmin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DormitoryAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, DormitoryAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DormitoryAdmin.
     * @param {DormitoryAdminDeleteArgs} args - Arguments to delete one DormitoryAdmin.
     * @example
     * // Delete one DormitoryAdmin
     * const DormitoryAdmin = await prisma.dormitoryAdmin.delete({
     *   where: {
     *     // ... filter to delete one DormitoryAdmin
     *   }
     * })
     * 
     */
    delete<T extends DormitoryAdminDeleteArgs>(args: SelectSubset<T, DormitoryAdminDeleteArgs<ExtArgs>>): Prisma__DormitoryAdminClient<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DormitoryAdmin.
     * @param {DormitoryAdminUpdateArgs} args - Arguments to update one DormitoryAdmin.
     * @example
     * // Update one DormitoryAdmin
     * const dormitoryAdmin = await prisma.dormitoryAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DormitoryAdminUpdateArgs>(args: SelectSubset<T, DormitoryAdminUpdateArgs<ExtArgs>>): Prisma__DormitoryAdminClient<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DormitoryAdmins.
     * @param {DormitoryAdminDeleteManyArgs} args - Arguments to filter DormitoryAdmins to delete.
     * @example
     * // Delete a few DormitoryAdmins
     * const { count } = await prisma.dormitoryAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DormitoryAdminDeleteManyArgs>(args?: SelectSubset<T, DormitoryAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DormitoryAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DormitoryAdmins
     * const dormitoryAdmin = await prisma.dormitoryAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DormitoryAdminUpdateManyArgs>(args: SelectSubset<T, DormitoryAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DormitoryAdmins and returns the data updated in the database.
     * @param {DormitoryAdminUpdateManyAndReturnArgs} args - Arguments to update many DormitoryAdmins.
     * @example
     * // Update many DormitoryAdmins
     * const dormitoryAdmin = await prisma.dormitoryAdmin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DormitoryAdmins and only return the `id`
     * const dormitoryAdminWithIdOnly = await prisma.dormitoryAdmin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DormitoryAdminUpdateManyAndReturnArgs>(args: SelectSubset<T, DormitoryAdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DormitoryAdmin.
     * @param {DormitoryAdminUpsertArgs} args - Arguments to update or create a DormitoryAdmin.
     * @example
     * // Update or create a DormitoryAdmin
     * const dormitoryAdmin = await prisma.dormitoryAdmin.upsert({
     *   create: {
     *     // ... data to create a DormitoryAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DormitoryAdmin we want to update
     *   }
     * })
     */
    upsert<T extends DormitoryAdminUpsertArgs>(args: SelectSubset<T, DormitoryAdminUpsertArgs<ExtArgs>>): Prisma__DormitoryAdminClient<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DormitoryAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryAdminCountArgs} args - Arguments to filter DormitoryAdmins to count.
     * @example
     * // Count the number of DormitoryAdmins
     * const count = await prisma.dormitoryAdmin.count({
     *   where: {
     *     // ... the filter for the DormitoryAdmins we want to count
     *   }
     * })
    **/
    count<T extends DormitoryAdminCountArgs>(
      args?: Subset<T, DormitoryAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DormitoryAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DormitoryAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DormitoryAdminAggregateArgs>(args: Subset<T, DormitoryAdminAggregateArgs>): Prisma.PrismaPromise<GetDormitoryAdminAggregateType<T>>

    /**
     * Group by DormitoryAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryAdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DormitoryAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DormitoryAdminGroupByArgs['orderBy'] }
        : { orderBy?: DormitoryAdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DormitoryAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDormitoryAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DormitoryAdmin model
   */
  readonly fields: DormitoryAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DormitoryAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DormitoryAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dormitory<T extends DormitoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DormitoryDefaultArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DormitoryAdmin model
   */
  interface DormitoryAdminFieldRefs {
    readonly id: FieldRef<"DormitoryAdmin", 'String'>
    readonly userId: FieldRef<"DormitoryAdmin", 'String'>
    readonly dormitoryId: FieldRef<"DormitoryAdmin", 'String'>
    readonly role: FieldRef<"DormitoryAdmin", 'String'>
    readonly createdAt: FieldRef<"DormitoryAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DormitoryAdmin findUnique
   */
  export type DormitoryAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * Filter, which DormitoryAdmin to fetch.
     */
    where: DormitoryAdminWhereUniqueInput
  }

  /**
   * DormitoryAdmin findUniqueOrThrow
   */
  export type DormitoryAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * Filter, which DormitoryAdmin to fetch.
     */
    where: DormitoryAdminWhereUniqueInput
  }

  /**
   * DormitoryAdmin findFirst
   */
  export type DormitoryAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * Filter, which DormitoryAdmin to fetch.
     */
    where?: DormitoryAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DormitoryAdmins to fetch.
     */
    orderBy?: DormitoryAdminOrderByWithRelationInput | DormitoryAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DormitoryAdmins.
     */
    cursor?: DormitoryAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DormitoryAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DormitoryAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DormitoryAdmins.
     */
    distinct?: DormitoryAdminScalarFieldEnum | DormitoryAdminScalarFieldEnum[]
  }

  /**
   * DormitoryAdmin findFirstOrThrow
   */
  export type DormitoryAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * Filter, which DormitoryAdmin to fetch.
     */
    where?: DormitoryAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DormitoryAdmins to fetch.
     */
    orderBy?: DormitoryAdminOrderByWithRelationInput | DormitoryAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DormitoryAdmins.
     */
    cursor?: DormitoryAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DormitoryAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DormitoryAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DormitoryAdmins.
     */
    distinct?: DormitoryAdminScalarFieldEnum | DormitoryAdminScalarFieldEnum[]
  }

  /**
   * DormitoryAdmin findMany
   */
  export type DormitoryAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * Filter, which DormitoryAdmins to fetch.
     */
    where?: DormitoryAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DormitoryAdmins to fetch.
     */
    orderBy?: DormitoryAdminOrderByWithRelationInput | DormitoryAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DormitoryAdmins.
     */
    cursor?: DormitoryAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DormitoryAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DormitoryAdmins.
     */
    skip?: number
    distinct?: DormitoryAdminScalarFieldEnum | DormitoryAdminScalarFieldEnum[]
  }

  /**
   * DormitoryAdmin create
   */
  export type DormitoryAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * The data needed to create a DormitoryAdmin.
     */
    data: XOR<DormitoryAdminCreateInput, DormitoryAdminUncheckedCreateInput>
  }

  /**
   * DormitoryAdmin createMany
   */
  export type DormitoryAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DormitoryAdmins.
     */
    data: DormitoryAdminCreateManyInput | DormitoryAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DormitoryAdmin createManyAndReturn
   */
  export type DormitoryAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * The data used to create many DormitoryAdmins.
     */
    data: DormitoryAdminCreateManyInput | DormitoryAdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DormitoryAdmin update
   */
  export type DormitoryAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * The data needed to update a DormitoryAdmin.
     */
    data: XOR<DormitoryAdminUpdateInput, DormitoryAdminUncheckedUpdateInput>
    /**
     * Choose, which DormitoryAdmin to update.
     */
    where: DormitoryAdminWhereUniqueInput
  }

  /**
   * DormitoryAdmin updateMany
   */
  export type DormitoryAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DormitoryAdmins.
     */
    data: XOR<DormitoryAdminUpdateManyMutationInput, DormitoryAdminUncheckedUpdateManyInput>
    /**
     * Filter which DormitoryAdmins to update
     */
    where?: DormitoryAdminWhereInput
    /**
     * Limit how many DormitoryAdmins to update.
     */
    limit?: number
  }

  /**
   * DormitoryAdmin updateManyAndReturn
   */
  export type DormitoryAdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * The data used to update DormitoryAdmins.
     */
    data: XOR<DormitoryAdminUpdateManyMutationInput, DormitoryAdminUncheckedUpdateManyInput>
    /**
     * Filter which DormitoryAdmins to update
     */
    where?: DormitoryAdminWhereInput
    /**
     * Limit how many DormitoryAdmins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DormitoryAdmin upsert
   */
  export type DormitoryAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * The filter to search for the DormitoryAdmin to update in case it exists.
     */
    where: DormitoryAdminWhereUniqueInput
    /**
     * In case the DormitoryAdmin found by the `where` argument doesn't exist, create a new DormitoryAdmin with this data.
     */
    create: XOR<DormitoryAdminCreateInput, DormitoryAdminUncheckedCreateInput>
    /**
     * In case the DormitoryAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DormitoryAdminUpdateInput, DormitoryAdminUncheckedUpdateInput>
  }

  /**
   * DormitoryAdmin delete
   */
  export type DormitoryAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    /**
     * Filter which DormitoryAdmin to delete.
     */
    where: DormitoryAdminWhereUniqueInput
  }

  /**
   * DormitoryAdmin deleteMany
   */
  export type DormitoryAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DormitoryAdmins to delete
     */
    where?: DormitoryAdminWhereInput
    /**
     * Limit how many DormitoryAdmins to delete.
     */
    limit?: number
  }

  /**
   * DormitoryAdmin without action
   */
  export type DormitoryAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
  }


  /**
   * Model Confirmation
   */

  export type AggregateConfirmation = {
    _count: ConfirmationCountAggregateOutputType | null
    _min: ConfirmationMinAggregateOutputType | null
    _max: ConfirmationMaxAggregateOutputType | null
  }

  export type ConfirmationMinAggregateOutputType = {
    id: string | null
    type: $Enums.ConfirmationType | null
    status: $Enums.ConfirmationStatus | null
    createdAt: Date | null
    resolvedAt: Date | null
    userId: string | null
    photo: string | null
    frontIdUrl: string | null
    backIdUrl: string | null
  }

  export type ConfirmationMaxAggregateOutputType = {
    id: string | null
    type: $Enums.ConfirmationType | null
    status: $Enums.ConfirmationStatus | null
    createdAt: Date | null
    resolvedAt: Date | null
    userId: string | null
    photo: string | null
    frontIdUrl: string | null
    backIdUrl: string | null
  }

  export type ConfirmationCountAggregateOutputType = {
    id: number
    type: number
    status: number
    createdAt: number
    resolvedAt: number
    userId: number
    photo: number
    frontIdUrl: number
    backIdUrl: number
    _all: number
  }


  export type ConfirmationMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    createdAt?: true
    resolvedAt?: true
    userId?: true
    photo?: true
    frontIdUrl?: true
    backIdUrl?: true
  }

  export type ConfirmationMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    createdAt?: true
    resolvedAt?: true
    userId?: true
    photo?: true
    frontIdUrl?: true
    backIdUrl?: true
  }

  export type ConfirmationCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    createdAt?: true
    resolvedAt?: true
    userId?: true
    photo?: true
    frontIdUrl?: true
    backIdUrl?: true
    _all?: true
  }

  export type ConfirmationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Confirmation to aggregate.
     */
    where?: ConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Confirmations to fetch.
     */
    orderBy?: ConfirmationOrderByWithRelationInput | ConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Confirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Confirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Confirmations
    **/
    _count?: true | ConfirmationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfirmationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfirmationMaxAggregateInputType
  }

  export type GetConfirmationAggregateType<T extends ConfirmationAggregateArgs> = {
        [P in keyof T & keyof AggregateConfirmation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfirmation[P]>
      : GetScalarType<T[P], AggregateConfirmation[P]>
  }




  export type ConfirmationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfirmationWhereInput
    orderBy?: ConfirmationOrderByWithAggregationInput | ConfirmationOrderByWithAggregationInput[]
    by: ConfirmationScalarFieldEnum[] | ConfirmationScalarFieldEnum
    having?: ConfirmationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfirmationCountAggregateInputType | true
    _min?: ConfirmationMinAggregateInputType
    _max?: ConfirmationMaxAggregateInputType
  }

  export type ConfirmationGroupByOutputType = {
    id: string
    type: $Enums.ConfirmationType
    status: $Enums.ConfirmationStatus
    createdAt: Date
    resolvedAt: Date | null
    userId: string
    photo: string | null
    frontIdUrl: string | null
    backIdUrl: string | null
    _count: ConfirmationCountAggregateOutputType | null
    _min: ConfirmationMinAggregateOutputType | null
    _max: ConfirmationMaxAggregateOutputType | null
  }

  type GetConfirmationGroupByPayload<T extends ConfirmationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfirmationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfirmationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfirmationGroupByOutputType[P]>
            : GetScalarType<T[P], ConfirmationGroupByOutputType[P]>
        }
      >
    >


  export type ConfirmationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    userId?: boolean
    photo?: boolean
    frontIdUrl?: boolean
    backIdUrl?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["confirmation"]>

  export type ConfirmationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    userId?: boolean
    photo?: boolean
    frontIdUrl?: boolean
    backIdUrl?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["confirmation"]>

  export type ConfirmationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    userId?: boolean
    photo?: boolean
    frontIdUrl?: boolean
    backIdUrl?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["confirmation"]>

  export type ConfirmationSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    userId?: boolean
    photo?: boolean
    frontIdUrl?: boolean
    backIdUrl?: boolean
  }

  export type ConfirmationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "status" | "createdAt" | "resolvedAt" | "userId" | "photo" | "frontIdUrl" | "backIdUrl", ExtArgs["result"]["confirmation"]>
  export type ConfirmationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConfirmationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConfirmationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConfirmationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Confirmation"
    objects: {
      requester: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.ConfirmationType
      status: $Enums.ConfirmationStatus
      createdAt: Date
      resolvedAt: Date | null
      userId: string
      photo: string | null
      frontIdUrl: string | null
      backIdUrl: string | null
    }, ExtArgs["result"]["confirmation"]>
    composites: {}
  }

  type ConfirmationGetPayload<S extends boolean | null | undefined | ConfirmationDefaultArgs> = $Result.GetResult<Prisma.$ConfirmationPayload, S>

  type ConfirmationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConfirmationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConfirmationCountAggregateInputType | true
    }

  export interface ConfirmationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Confirmation'], meta: { name: 'Confirmation' } }
    /**
     * Find zero or one Confirmation that matches the filter.
     * @param {ConfirmationFindUniqueArgs} args - Arguments to find a Confirmation
     * @example
     * // Get one Confirmation
     * const confirmation = await prisma.confirmation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfirmationFindUniqueArgs>(args: SelectSubset<T, ConfirmationFindUniqueArgs<ExtArgs>>): Prisma__ConfirmationClient<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Confirmation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfirmationFindUniqueOrThrowArgs} args - Arguments to find a Confirmation
     * @example
     * // Get one Confirmation
     * const confirmation = await prisma.confirmation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfirmationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfirmationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfirmationClient<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Confirmation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmationFindFirstArgs} args - Arguments to find a Confirmation
     * @example
     * // Get one Confirmation
     * const confirmation = await prisma.confirmation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfirmationFindFirstArgs>(args?: SelectSubset<T, ConfirmationFindFirstArgs<ExtArgs>>): Prisma__ConfirmationClient<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Confirmation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmationFindFirstOrThrowArgs} args - Arguments to find a Confirmation
     * @example
     * // Get one Confirmation
     * const confirmation = await prisma.confirmation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfirmationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfirmationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfirmationClient<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Confirmations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Confirmations
     * const confirmations = await prisma.confirmation.findMany()
     * 
     * // Get first 10 Confirmations
     * const confirmations = await prisma.confirmation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const confirmationWithIdOnly = await prisma.confirmation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConfirmationFindManyArgs>(args?: SelectSubset<T, ConfirmationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Confirmation.
     * @param {ConfirmationCreateArgs} args - Arguments to create a Confirmation.
     * @example
     * // Create one Confirmation
     * const Confirmation = await prisma.confirmation.create({
     *   data: {
     *     // ... data to create a Confirmation
     *   }
     * })
     * 
     */
    create<T extends ConfirmationCreateArgs>(args: SelectSubset<T, ConfirmationCreateArgs<ExtArgs>>): Prisma__ConfirmationClient<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Confirmations.
     * @param {ConfirmationCreateManyArgs} args - Arguments to create many Confirmations.
     * @example
     * // Create many Confirmations
     * const confirmation = await prisma.confirmation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfirmationCreateManyArgs>(args?: SelectSubset<T, ConfirmationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Confirmations and returns the data saved in the database.
     * @param {ConfirmationCreateManyAndReturnArgs} args - Arguments to create many Confirmations.
     * @example
     * // Create many Confirmations
     * const confirmation = await prisma.confirmation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Confirmations and only return the `id`
     * const confirmationWithIdOnly = await prisma.confirmation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfirmationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfirmationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Confirmation.
     * @param {ConfirmationDeleteArgs} args - Arguments to delete one Confirmation.
     * @example
     * // Delete one Confirmation
     * const Confirmation = await prisma.confirmation.delete({
     *   where: {
     *     // ... filter to delete one Confirmation
     *   }
     * })
     * 
     */
    delete<T extends ConfirmationDeleteArgs>(args: SelectSubset<T, ConfirmationDeleteArgs<ExtArgs>>): Prisma__ConfirmationClient<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Confirmation.
     * @param {ConfirmationUpdateArgs} args - Arguments to update one Confirmation.
     * @example
     * // Update one Confirmation
     * const confirmation = await prisma.confirmation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfirmationUpdateArgs>(args: SelectSubset<T, ConfirmationUpdateArgs<ExtArgs>>): Prisma__ConfirmationClient<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Confirmations.
     * @param {ConfirmationDeleteManyArgs} args - Arguments to filter Confirmations to delete.
     * @example
     * // Delete a few Confirmations
     * const { count } = await prisma.confirmation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfirmationDeleteManyArgs>(args?: SelectSubset<T, ConfirmationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Confirmations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Confirmations
     * const confirmation = await prisma.confirmation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfirmationUpdateManyArgs>(args: SelectSubset<T, ConfirmationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Confirmations and returns the data updated in the database.
     * @param {ConfirmationUpdateManyAndReturnArgs} args - Arguments to update many Confirmations.
     * @example
     * // Update many Confirmations
     * const confirmation = await prisma.confirmation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Confirmations and only return the `id`
     * const confirmationWithIdOnly = await prisma.confirmation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConfirmationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfirmationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Confirmation.
     * @param {ConfirmationUpsertArgs} args - Arguments to update or create a Confirmation.
     * @example
     * // Update or create a Confirmation
     * const confirmation = await prisma.confirmation.upsert({
     *   create: {
     *     // ... data to create a Confirmation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Confirmation we want to update
     *   }
     * })
     */
    upsert<T extends ConfirmationUpsertArgs>(args: SelectSubset<T, ConfirmationUpsertArgs<ExtArgs>>): Prisma__ConfirmationClient<$Result.GetResult<Prisma.$ConfirmationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Confirmations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmationCountArgs} args - Arguments to filter Confirmations to count.
     * @example
     * // Count the number of Confirmations
     * const count = await prisma.confirmation.count({
     *   where: {
     *     // ... the filter for the Confirmations we want to count
     *   }
     * })
    **/
    count<T extends ConfirmationCountArgs>(
      args?: Subset<T, ConfirmationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfirmationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Confirmation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfirmationAggregateArgs>(args: Subset<T, ConfirmationAggregateArgs>): Prisma.PrismaPromise<GetConfirmationAggregateType<T>>

    /**
     * Group by Confirmation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfirmationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfirmationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfirmationGroupByArgs['orderBy'] }
        : { orderBy?: ConfirmationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfirmationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfirmationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Confirmation model
   */
  readonly fields: ConfirmationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Confirmation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfirmationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requester<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Confirmation model
   */
  interface ConfirmationFieldRefs {
    readonly id: FieldRef<"Confirmation", 'String'>
    readonly type: FieldRef<"Confirmation", 'ConfirmationType'>
    readonly status: FieldRef<"Confirmation", 'ConfirmationStatus'>
    readonly createdAt: FieldRef<"Confirmation", 'DateTime'>
    readonly resolvedAt: FieldRef<"Confirmation", 'DateTime'>
    readonly userId: FieldRef<"Confirmation", 'String'>
    readonly photo: FieldRef<"Confirmation", 'String'>
    readonly frontIdUrl: FieldRef<"Confirmation", 'String'>
    readonly backIdUrl: FieldRef<"Confirmation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Confirmation findUnique
   */
  export type ConfirmationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which Confirmation to fetch.
     */
    where: ConfirmationWhereUniqueInput
  }

  /**
   * Confirmation findUniqueOrThrow
   */
  export type ConfirmationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which Confirmation to fetch.
     */
    where: ConfirmationWhereUniqueInput
  }

  /**
   * Confirmation findFirst
   */
  export type ConfirmationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which Confirmation to fetch.
     */
    where?: ConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Confirmations to fetch.
     */
    orderBy?: ConfirmationOrderByWithRelationInput | ConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Confirmations.
     */
    cursor?: ConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Confirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Confirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Confirmations.
     */
    distinct?: ConfirmationScalarFieldEnum | ConfirmationScalarFieldEnum[]
  }

  /**
   * Confirmation findFirstOrThrow
   */
  export type ConfirmationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which Confirmation to fetch.
     */
    where?: ConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Confirmations to fetch.
     */
    orderBy?: ConfirmationOrderByWithRelationInput | ConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Confirmations.
     */
    cursor?: ConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Confirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Confirmations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Confirmations.
     */
    distinct?: ConfirmationScalarFieldEnum | ConfirmationScalarFieldEnum[]
  }

  /**
   * Confirmation findMany
   */
  export type ConfirmationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * Filter, which Confirmations to fetch.
     */
    where?: ConfirmationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Confirmations to fetch.
     */
    orderBy?: ConfirmationOrderByWithRelationInput | ConfirmationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Confirmations.
     */
    cursor?: ConfirmationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Confirmations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Confirmations.
     */
    skip?: number
    distinct?: ConfirmationScalarFieldEnum | ConfirmationScalarFieldEnum[]
  }

  /**
   * Confirmation create
   */
  export type ConfirmationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * The data needed to create a Confirmation.
     */
    data: XOR<ConfirmationCreateInput, ConfirmationUncheckedCreateInput>
  }

  /**
   * Confirmation createMany
   */
  export type ConfirmationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Confirmations.
     */
    data: ConfirmationCreateManyInput | ConfirmationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Confirmation createManyAndReturn
   */
  export type ConfirmationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * The data used to create many Confirmations.
     */
    data: ConfirmationCreateManyInput | ConfirmationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Confirmation update
   */
  export type ConfirmationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * The data needed to update a Confirmation.
     */
    data: XOR<ConfirmationUpdateInput, ConfirmationUncheckedUpdateInput>
    /**
     * Choose, which Confirmation to update.
     */
    where: ConfirmationWhereUniqueInput
  }

  /**
   * Confirmation updateMany
   */
  export type ConfirmationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Confirmations.
     */
    data: XOR<ConfirmationUpdateManyMutationInput, ConfirmationUncheckedUpdateManyInput>
    /**
     * Filter which Confirmations to update
     */
    where?: ConfirmationWhereInput
    /**
     * Limit how many Confirmations to update.
     */
    limit?: number
  }

  /**
   * Confirmation updateManyAndReturn
   */
  export type ConfirmationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * The data used to update Confirmations.
     */
    data: XOR<ConfirmationUpdateManyMutationInput, ConfirmationUncheckedUpdateManyInput>
    /**
     * Filter which Confirmations to update
     */
    where?: ConfirmationWhereInput
    /**
     * Limit how many Confirmations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Confirmation upsert
   */
  export type ConfirmationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * The filter to search for the Confirmation to update in case it exists.
     */
    where: ConfirmationWhereUniqueInput
    /**
     * In case the Confirmation found by the `where` argument doesn't exist, create a new Confirmation with this data.
     */
    create: XOR<ConfirmationCreateInput, ConfirmationUncheckedCreateInput>
    /**
     * In case the Confirmation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfirmationUpdateInput, ConfirmationUncheckedUpdateInput>
  }

  /**
   * Confirmation delete
   */
  export type ConfirmationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
    /**
     * Filter which Confirmation to delete.
     */
    where: ConfirmationWhereUniqueInput
  }

  /**
   * Confirmation deleteMany
   */
  export type ConfirmationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Confirmations to delete
     */
    where?: ConfirmationWhereInput
    /**
     * Limit how many Confirmations to delete.
     */
    limit?: number
  }

  /**
   * Confirmation without action
   */
  export type ConfirmationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Confirmation
     */
    select?: ConfirmationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Confirmation
     */
    omit?: ConfirmationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConfirmationInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    type: $Enums.TokenType | null
    expiresIn: Date | null
  }

  export type TokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    type: $Enums.TokenType | null
    expiresIn: Date | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    type: number
    expiresIn: number
    _all: number
  }


  export type TokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    type?: true
    expiresIn?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    type?: true
    expiresIn?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    type?: true
    expiresIn?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: string
    email: string
    token: string
    type: $Enums.TokenType
    expiresIn: Date
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    type?: boolean
    expiresIn?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    type?: boolean
    expiresIn?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    type?: boolean
    expiresIn?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    type?: boolean
    expiresIn?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "type" | "expiresIn", ExtArgs["result"]["token"]>

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      type: $Enums.TokenType
      expiresIn: Date
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'String'>
    readonly email: FieldRef<"Token", 'String'>
    readonly token: FieldRef<"Token", 'String'>
    readonly type: FieldRef<"Token", 'TokenType'>
    readonly expiresIn: FieldRef<"Token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
  }


  /**
   * Model Dormitory
   */

  export type AggregateDormitory = {
    _count: DormitoryCountAggregateOutputType | null
    _min: DormitoryMinAggregateOutputType | null
    _max: DormitoryMaxAggregateOutputType | null
  }

  export type DormitoryMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    name: string | null
    address: string | null
    groundFloorPhoneNumber: string | null
    status: string | null
    managerId: string | null
  }

  export type DormitoryMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    name: string | null
    address: string | null
    groundFloorPhoneNumber: string | null
    status: string | null
    managerId: string | null
  }

  export type DormitoryCountAggregateOutputType = {
    id: number
    createdAt: number
    name: number
    address: number
    groundFloorPhoneNumber: number
    status: number
    photos: number
    managerId: number
    _all: number
  }


  export type DormitoryMinAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    address?: true
    groundFloorPhoneNumber?: true
    status?: true
    managerId?: true
  }

  export type DormitoryMaxAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    address?: true
    groundFloorPhoneNumber?: true
    status?: true
    managerId?: true
  }

  export type DormitoryCountAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    address?: true
    groundFloorPhoneNumber?: true
    status?: true
    photos?: true
    managerId?: true
    _all?: true
  }

  export type DormitoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dormitory to aggregate.
     */
    where?: DormitoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dormitories to fetch.
     */
    orderBy?: DormitoryOrderByWithRelationInput | DormitoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DormitoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dormitories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dormitories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dormitories
    **/
    _count?: true | DormitoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DormitoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DormitoryMaxAggregateInputType
  }

  export type GetDormitoryAggregateType<T extends DormitoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDormitory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDormitory[P]>
      : GetScalarType<T[P], AggregateDormitory[P]>
  }




  export type DormitoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DormitoryWhereInput
    orderBy?: DormitoryOrderByWithAggregationInput | DormitoryOrderByWithAggregationInput[]
    by: DormitoryScalarFieldEnum[] | DormitoryScalarFieldEnum
    having?: DormitoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DormitoryCountAggregateInputType | true
    _min?: DormitoryMinAggregateInputType
    _max?: DormitoryMaxAggregateInputType
  }

  export type DormitoryGroupByOutputType = {
    id: string
    createdAt: Date
    name: string
    address: string
    groundFloorPhoneNumber: string
    status: string
    photos: string[]
    managerId: string | null
    _count: DormitoryCountAggregateOutputType | null
    _min: DormitoryMinAggregateOutputType | null
    _max: DormitoryMaxAggregateOutputType | null
  }

  type GetDormitoryGroupByPayload<T extends DormitoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DormitoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DormitoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DormitoryGroupByOutputType[P]>
            : GetScalarType<T[P], DormitoryGroupByOutputType[P]>
        }
      >
    >


  export type DormitorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    address?: boolean
    groundFloorPhoneNumber?: boolean
    status?: boolean
    photos?: boolean
    managerId?: boolean
    manager?: boolean | Dormitory$managerArgs<ExtArgs>
    admins?: boolean | Dormitory$adminsArgs<ExtArgs>
    residents?: boolean | Dormitory$residentsArgs<ExtArgs>
    rooms?: boolean | Dormitory$roomsArgs<ExtArgs>
    _count?: boolean | DormitoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dormitory"]>

  export type DormitorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    address?: boolean
    groundFloorPhoneNumber?: boolean
    status?: boolean
    photos?: boolean
    managerId?: boolean
    manager?: boolean | Dormitory$managerArgs<ExtArgs>
  }, ExtArgs["result"]["dormitory"]>

  export type DormitorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    address?: boolean
    groundFloorPhoneNumber?: boolean
    status?: boolean
    photos?: boolean
    managerId?: boolean
    manager?: boolean | Dormitory$managerArgs<ExtArgs>
  }, ExtArgs["result"]["dormitory"]>

  export type DormitorySelectScalar = {
    id?: boolean
    createdAt?: boolean
    name?: boolean
    address?: boolean
    groundFloorPhoneNumber?: boolean
    status?: boolean
    photos?: boolean
    managerId?: boolean
  }

  export type DormitoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "name" | "address" | "groundFloorPhoneNumber" | "status" | "photos" | "managerId", ExtArgs["result"]["dormitory"]>
  export type DormitoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | Dormitory$managerArgs<ExtArgs>
    admins?: boolean | Dormitory$adminsArgs<ExtArgs>
    residents?: boolean | Dormitory$residentsArgs<ExtArgs>
    rooms?: boolean | Dormitory$roomsArgs<ExtArgs>
    _count?: boolean | DormitoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DormitoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | Dormitory$managerArgs<ExtArgs>
  }
  export type DormitoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | Dormitory$managerArgs<ExtArgs>
  }

  export type $DormitoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dormitory"
    objects: {
      manager: Prisma.$UserPayload<ExtArgs> | null
      admins: Prisma.$DormitoryAdminPayload<ExtArgs>[]
      residents: Prisma.$UserPayload<ExtArgs>[]
      rooms: Prisma.$RoomPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      name: string
      address: string
      groundFloorPhoneNumber: string
      status: string
      photos: string[]
      managerId: string | null
    }, ExtArgs["result"]["dormitory"]>
    composites: {}
  }

  type DormitoryGetPayload<S extends boolean | null | undefined | DormitoryDefaultArgs> = $Result.GetResult<Prisma.$DormitoryPayload, S>

  type DormitoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DormitoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DormitoryCountAggregateInputType | true
    }

  export interface DormitoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dormitory'], meta: { name: 'Dormitory' } }
    /**
     * Find zero or one Dormitory that matches the filter.
     * @param {DormitoryFindUniqueArgs} args - Arguments to find a Dormitory
     * @example
     * // Get one Dormitory
     * const dormitory = await prisma.dormitory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DormitoryFindUniqueArgs>(args: SelectSubset<T, DormitoryFindUniqueArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dormitory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DormitoryFindUniqueOrThrowArgs} args - Arguments to find a Dormitory
     * @example
     * // Get one Dormitory
     * const dormitory = await prisma.dormitory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DormitoryFindUniqueOrThrowArgs>(args: SelectSubset<T, DormitoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dormitory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryFindFirstArgs} args - Arguments to find a Dormitory
     * @example
     * // Get one Dormitory
     * const dormitory = await prisma.dormitory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DormitoryFindFirstArgs>(args?: SelectSubset<T, DormitoryFindFirstArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dormitory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryFindFirstOrThrowArgs} args - Arguments to find a Dormitory
     * @example
     * // Get one Dormitory
     * const dormitory = await prisma.dormitory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DormitoryFindFirstOrThrowArgs>(args?: SelectSubset<T, DormitoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dormitories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dormitories
     * const dormitories = await prisma.dormitory.findMany()
     * 
     * // Get first 10 Dormitories
     * const dormitories = await prisma.dormitory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dormitoryWithIdOnly = await prisma.dormitory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DormitoryFindManyArgs>(args?: SelectSubset<T, DormitoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dormitory.
     * @param {DormitoryCreateArgs} args - Arguments to create a Dormitory.
     * @example
     * // Create one Dormitory
     * const Dormitory = await prisma.dormitory.create({
     *   data: {
     *     // ... data to create a Dormitory
     *   }
     * })
     * 
     */
    create<T extends DormitoryCreateArgs>(args: SelectSubset<T, DormitoryCreateArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dormitories.
     * @param {DormitoryCreateManyArgs} args - Arguments to create many Dormitories.
     * @example
     * // Create many Dormitories
     * const dormitory = await prisma.dormitory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DormitoryCreateManyArgs>(args?: SelectSubset<T, DormitoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dormitories and returns the data saved in the database.
     * @param {DormitoryCreateManyAndReturnArgs} args - Arguments to create many Dormitories.
     * @example
     * // Create many Dormitories
     * const dormitory = await prisma.dormitory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dormitories and only return the `id`
     * const dormitoryWithIdOnly = await prisma.dormitory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DormitoryCreateManyAndReturnArgs>(args?: SelectSubset<T, DormitoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dormitory.
     * @param {DormitoryDeleteArgs} args - Arguments to delete one Dormitory.
     * @example
     * // Delete one Dormitory
     * const Dormitory = await prisma.dormitory.delete({
     *   where: {
     *     // ... filter to delete one Dormitory
     *   }
     * })
     * 
     */
    delete<T extends DormitoryDeleteArgs>(args: SelectSubset<T, DormitoryDeleteArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dormitory.
     * @param {DormitoryUpdateArgs} args - Arguments to update one Dormitory.
     * @example
     * // Update one Dormitory
     * const dormitory = await prisma.dormitory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DormitoryUpdateArgs>(args: SelectSubset<T, DormitoryUpdateArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dormitories.
     * @param {DormitoryDeleteManyArgs} args - Arguments to filter Dormitories to delete.
     * @example
     * // Delete a few Dormitories
     * const { count } = await prisma.dormitory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DormitoryDeleteManyArgs>(args?: SelectSubset<T, DormitoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dormitories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dormitories
     * const dormitory = await prisma.dormitory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DormitoryUpdateManyArgs>(args: SelectSubset<T, DormitoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dormitories and returns the data updated in the database.
     * @param {DormitoryUpdateManyAndReturnArgs} args - Arguments to update many Dormitories.
     * @example
     * // Update many Dormitories
     * const dormitory = await prisma.dormitory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dormitories and only return the `id`
     * const dormitoryWithIdOnly = await prisma.dormitory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DormitoryUpdateManyAndReturnArgs>(args: SelectSubset<T, DormitoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dormitory.
     * @param {DormitoryUpsertArgs} args - Arguments to update or create a Dormitory.
     * @example
     * // Update or create a Dormitory
     * const dormitory = await prisma.dormitory.upsert({
     *   create: {
     *     // ... data to create a Dormitory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dormitory we want to update
     *   }
     * })
     */
    upsert<T extends DormitoryUpsertArgs>(args: SelectSubset<T, DormitoryUpsertArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dormitories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryCountArgs} args - Arguments to filter Dormitories to count.
     * @example
     * // Count the number of Dormitories
     * const count = await prisma.dormitory.count({
     *   where: {
     *     // ... the filter for the Dormitories we want to count
     *   }
     * })
    **/
    count<T extends DormitoryCountArgs>(
      args?: Subset<T, DormitoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DormitoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dormitory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DormitoryAggregateArgs>(args: Subset<T, DormitoryAggregateArgs>): Prisma.PrismaPromise<GetDormitoryAggregateType<T>>

    /**
     * Group by Dormitory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DormitoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DormitoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DormitoryGroupByArgs['orderBy'] }
        : { orderBy?: DormitoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DormitoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDormitoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dormitory model
   */
  readonly fields: DormitoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dormitory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DormitoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    manager<T extends Dormitory$managerArgs<ExtArgs> = {}>(args?: Subset<T, Dormitory$managerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    admins<T extends Dormitory$adminsArgs<ExtArgs> = {}>(args?: Subset<T, Dormitory$adminsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DormitoryAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    residents<T extends Dormitory$residentsArgs<ExtArgs> = {}>(args?: Subset<T, Dormitory$residentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rooms<T extends Dormitory$roomsArgs<ExtArgs> = {}>(args?: Subset<T, Dormitory$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dormitory model
   */
  interface DormitoryFieldRefs {
    readonly id: FieldRef<"Dormitory", 'String'>
    readonly createdAt: FieldRef<"Dormitory", 'DateTime'>
    readonly name: FieldRef<"Dormitory", 'String'>
    readonly address: FieldRef<"Dormitory", 'String'>
    readonly groundFloorPhoneNumber: FieldRef<"Dormitory", 'String'>
    readonly status: FieldRef<"Dormitory", 'String'>
    readonly photos: FieldRef<"Dormitory", 'String[]'>
    readonly managerId: FieldRef<"Dormitory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Dormitory findUnique
   */
  export type DormitoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * Filter, which Dormitory to fetch.
     */
    where: DormitoryWhereUniqueInput
  }

  /**
   * Dormitory findUniqueOrThrow
   */
  export type DormitoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * Filter, which Dormitory to fetch.
     */
    where: DormitoryWhereUniqueInput
  }

  /**
   * Dormitory findFirst
   */
  export type DormitoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * Filter, which Dormitory to fetch.
     */
    where?: DormitoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dormitories to fetch.
     */
    orderBy?: DormitoryOrderByWithRelationInput | DormitoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dormitories.
     */
    cursor?: DormitoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dormitories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dormitories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dormitories.
     */
    distinct?: DormitoryScalarFieldEnum | DormitoryScalarFieldEnum[]
  }

  /**
   * Dormitory findFirstOrThrow
   */
  export type DormitoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * Filter, which Dormitory to fetch.
     */
    where?: DormitoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dormitories to fetch.
     */
    orderBy?: DormitoryOrderByWithRelationInput | DormitoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dormitories.
     */
    cursor?: DormitoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dormitories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dormitories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dormitories.
     */
    distinct?: DormitoryScalarFieldEnum | DormitoryScalarFieldEnum[]
  }

  /**
   * Dormitory findMany
   */
  export type DormitoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * Filter, which Dormitories to fetch.
     */
    where?: DormitoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dormitories to fetch.
     */
    orderBy?: DormitoryOrderByWithRelationInput | DormitoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dormitories.
     */
    cursor?: DormitoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dormitories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dormitories.
     */
    skip?: number
    distinct?: DormitoryScalarFieldEnum | DormitoryScalarFieldEnum[]
  }

  /**
   * Dormitory create
   */
  export type DormitoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Dormitory.
     */
    data: XOR<DormitoryCreateInput, DormitoryUncheckedCreateInput>
  }

  /**
   * Dormitory createMany
   */
  export type DormitoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dormitories.
     */
    data: DormitoryCreateManyInput | DormitoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dormitory createManyAndReturn
   */
  export type DormitoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * The data used to create many Dormitories.
     */
    data: DormitoryCreateManyInput | DormitoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dormitory update
   */
  export type DormitoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Dormitory.
     */
    data: XOR<DormitoryUpdateInput, DormitoryUncheckedUpdateInput>
    /**
     * Choose, which Dormitory to update.
     */
    where: DormitoryWhereUniqueInput
  }

  /**
   * Dormitory updateMany
   */
  export type DormitoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dormitories.
     */
    data: XOR<DormitoryUpdateManyMutationInput, DormitoryUncheckedUpdateManyInput>
    /**
     * Filter which Dormitories to update
     */
    where?: DormitoryWhereInput
    /**
     * Limit how many Dormitories to update.
     */
    limit?: number
  }

  /**
   * Dormitory updateManyAndReturn
   */
  export type DormitoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * The data used to update Dormitories.
     */
    data: XOR<DormitoryUpdateManyMutationInput, DormitoryUncheckedUpdateManyInput>
    /**
     * Filter which Dormitories to update
     */
    where?: DormitoryWhereInput
    /**
     * Limit how many Dormitories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dormitory upsert
   */
  export type DormitoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Dormitory to update in case it exists.
     */
    where: DormitoryWhereUniqueInput
    /**
     * In case the Dormitory found by the `where` argument doesn't exist, create a new Dormitory with this data.
     */
    create: XOR<DormitoryCreateInput, DormitoryUncheckedCreateInput>
    /**
     * In case the Dormitory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DormitoryUpdateInput, DormitoryUncheckedUpdateInput>
  }

  /**
   * Dormitory delete
   */
  export type DormitoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
    /**
     * Filter which Dormitory to delete.
     */
    where: DormitoryWhereUniqueInput
  }

  /**
   * Dormitory deleteMany
   */
  export type DormitoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dormitories to delete
     */
    where?: DormitoryWhereInput
    /**
     * Limit how many Dormitories to delete.
     */
    limit?: number
  }

  /**
   * Dormitory.manager
   */
  export type Dormitory$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Dormitory.admins
   */
  export type Dormitory$adminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DormitoryAdmin
     */
    select?: DormitoryAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DormitoryAdmin
     */
    omit?: DormitoryAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryAdminInclude<ExtArgs> | null
    where?: DormitoryAdminWhereInput
    orderBy?: DormitoryAdminOrderByWithRelationInput | DormitoryAdminOrderByWithRelationInput[]
    cursor?: DormitoryAdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DormitoryAdminScalarFieldEnum | DormitoryAdminScalarFieldEnum[]
  }

  /**
   * Dormitory.residents
   */
  export type Dormitory$residentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Dormitory.rooms
   */
  export type Dormitory$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Dormitory without action
   */
  export type DormitoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dormitory
     */
    select?: DormitorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dormitory
     */
    omit?: DormitoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DormitoryInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    floor: number | null
    capacity: number | null
  }

  export type RoomSumAggregateOutputType = {
    floor: number | null
    capacity: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    number: string | null
    floor: number | null
    createdAt: Date | null
    capacity: number | null
    dormitoryId: string | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    number: string | null
    floor: number | null
    createdAt: Date | null
    capacity: number | null
    dormitoryId: string | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    number: number
    floor: number
    createdAt: number
    capacity: number
    roomEquipment: number
    photos: number
    dormitoryId: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    floor?: true
    capacity?: true
  }

  export type RoomSumAggregateInputType = {
    floor?: true
    capacity?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    number?: true
    floor?: true
    createdAt?: true
    capacity?: true
    dormitoryId?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    number?: true
    floor?: true
    createdAt?: true
    capacity?: true
    dormitoryId?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    number?: true
    floor?: true
    createdAt?: true
    capacity?: true
    roomEquipment?: true
    photos?: true
    dormitoryId?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    number: string
    floor: number
    createdAt: Date
    capacity: number
    roomEquipment: string[]
    photos: string[]
    dormitoryId: string
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    floor?: boolean
    createdAt?: boolean
    capacity?: boolean
    roomEquipment?: boolean
    photos?: boolean
    dormitoryId?: boolean
    statuses?: boolean | Room$statusesArgs<ExtArgs>
    residents?: boolean | Room$residentsArgs<ExtArgs>
    announcementRecipients?: boolean | Room$announcementRecipientsArgs<ExtArgs>
    dormitroy?: boolean | DormitoryDefaultArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    floor?: boolean
    createdAt?: boolean
    capacity?: boolean
    roomEquipment?: boolean
    photos?: boolean
    dormitoryId?: boolean
    dormitroy?: boolean | DormitoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    floor?: boolean
    createdAt?: boolean
    capacity?: boolean
    roomEquipment?: boolean
    photos?: boolean
    dormitoryId?: boolean
    dormitroy?: boolean | DormitoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    number?: boolean
    floor?: boolean
    createdAt?: boolean
    capacity?: boolean
    roomEquipment?: boolean
    photos?: boolean
    dormitoryId?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "number" | "floor" | "createdAt" | "capacity" | "roomEquipment" | "photos" | "dormitoryId", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statuses?: boolean | Room$statusesArgs<ExtArgs>
    residents?: boolean | Room$residentsArgs<ExtArgs>
    announcementRecipients?: boolean | Room$announcementRecipientsArgs<ExtArgs>
    dormitroy?: boolean | DormitoryDefaultArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dormitroy?: boolean | DormitoryDefaultArgs<ExtArgs>
  }
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dormitroy?: boolean | DormitoryDefaultArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      statuses: Prisma.$RoomStatusPayload<ExtArgs>[]
      residents: Prisma.$UserPayload<ExtArgs>[]
      announcementRecipients: Prisma.$AnnouncementRecipientPayload<ExtArgs>[]
      dormitroy: Prisma.$DormitoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: string
      floor: number
      createdAt: Date
      capacity: number
      roomEquipment: string[]
      photos: string[]
      dormitoryId: string
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    statuses<T extends Room$statusesArgs<ExtArgs> = {}>(args?: Subset<T, Room$statusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    residents<T extends Room$residentsArgs<ExtArgs> = {}>(args?: Subset<T, Room$residentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    announcementRecipients<T extends Room$announcementRecipientsArgs<ExtArgs> = {}>(args?: Subset<T, Room$announcementRecipientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dormitroy<T extends DormitoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DormitoryDefaultArgs<ExtArgs>>): Prisma__DormitoryClient<$Result.GetResult<Prisma.$DormitoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly number: FieldRef<"Room", 'String'>
    readonly floor: FieldRef<"Room", 'Int'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly capacity: FieldRef<"Room", 'Int'>
    readonly roomEquipment: FieldRef<"Room", 'String[]'>
    readonly photos: FieldRef<"Room", 'String[]'>
    readonly dormitoryId: FieldRef<"Room", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.statuses
   */
  export type Room$statusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    where?: RoomStatusWhereInput
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    cursor?: RoomStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStatusScalarFieldEnum | RoomStatusScalarFieldEnum[]
  }

  /**
   * Room.residents
   */
  export type Room$residentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Room.announcementRecipients
   */
  export type Room$announcementRecipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    where?: AnnouncementRecipientWhereInput
    orderBy?: AnnouncementRecipientOrderByWithRelationInput | AnnouncementRecipientOrderByWithRelationInput[]
    cursor?: AnnouncementRecipientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementRecipientScalarFieldEnum | AnnouncementRecipientScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model RoomStatus
   */

  export type AggregateRoomStatus = {
    _count: RoomStatusCountAggregateOutputType | null
    _min: RoomStatusMinAggregateOutputType | null
    _max: RoomStatusMaxAggregateOutputType | null
  }

  export type RoomStatusMinAggregateOutputType = {
    id: string | null
    dateOfStart: Date | null
    dateOfEnd: Date | null
    description: string | null
    roomId: string | null
  }

  export type RoomStatusMaxAggregateOutputType = {
    id: string | null
    dateOfStart: Date | null
    dateOfEnd: Date | null
    description: string | null
    roomId: string | null
  }

  export type RoomStatusCountAggregateOutputType = {
    id: number
    dateOfStart: number
    dateOfEnd: number
    description: number
    roomId: number
    _all: number
  }


  export type RoomStatusMinAggregateInputType = {
    id?: true
    dateOfStart?: true
    dateOfEnd?: true
    description?: true
    roomId?: true
  }

  export type RoomStatusMaxAggregateInputType = {
    id?: true
    dateOfStart?: true
    dateOfEnd?: true
    description?: true
    roomId?: true
  }

  export type RoomStatusCountAggregateInputType = {
    id?: true
    dateOfStart?: true
    dateOfEnd?: true
    description?: true
    roomId?: true
    _all?: true
  }

  export type RoomStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStatus to aggregate.
     */
    where?: RoomStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatuses to fetch.
     */
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomStatuses
    **/
    _count?: true | RoomStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomStatusMaxAggregateInputType
  }

  export type GetRoomStatusAggregateType<T extends RoomStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomStatus[P]>
      : GetScalarType<T[P], AggregateRoomStatus[P]>
  }




  export type RoomStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStatusWhereInput
    orderBy?: RoomStatusOrderByWithAggregationInput | RoomStatusOrderByWithAggregationInput[]
    by: RoomStatusScalarFieldEnum[] | RoomStatusScalarFieldEnum
    having?: RoomStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomStatusCountAggregateInputType | true
    _min?: RoomStatusMinAggregateInputType
    _max?: RoomStatusMaxAggregateInputType
  }

  export type RoomStatusGroupByOutputType = {
    id: string
    dateOfStart: Date
    dateOfEnd: Date | null
    description: string
    roomId: string
    _count: RoomStatusCountAggregateOutputType | null
    _min: RoomStatusMinAggregateOutputType | null
    _max: RoomStatusMaxAggregateOutputType | null
  }

  type GetRoomStatusGroupByPayload<T extends RoomStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomStatusGroupByOutputType[P]>
            : GetScalarType<T[P], RoomStatusGroupByOutputType[P]>
        }
      >
    >


  export type RoomStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateOfStart?: boolean
    dateOfEnd?: boolean
    description?: boolean
    roomId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStatus"]>

  export type RoomStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateOfStart?: boolean
    dateOfEnd?: boolean
    description?: boolean
    roomId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStatus"]>

  export type RoomStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dateOfStart?: boolean
    dateOfEnd?: boolean
    description?: boolean
    roomId?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStatus"]>

  export type RoomStatusSelectScalar = {
    id?: boolean
    dateOfStart?: boolean
    dateOfEnd?: boolean
    description?: boolean
    roomId?: boolean
  }

  export type RoomStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dateOfStart" | "dateOfEnd" | "description" | "roomId", ExtArgs["result"]["roomStatus"]>
  export type RoomStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type RoomStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type RoomStatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }

  export type $RoomStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomStatus"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dateOfStart: Date
      dateOfEnd: Date | null
      description: string
      roomId: string
    }, ExtArgs["result"]["roomStatus"]>
    composites: {}
  }

  type RoomStatusGetPayload<S extends boolean | null | undefined | RoomStatusDefaultArgs> = $Result.GetResult<Prisma.$RoomStatusPayload, S>

  type RoomStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomStatusCountAggregateInputType | true
    }

  export interface RoomStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomStatus'], meta: { name: 'RoomStatus' } }
    /**
     * Find zero or one RoomStatus that matches the filter.
     * @param {RoomStatusFindUniqueArgs} args - Arguments to find a RoomStatus
     * @example
     * // Get one RoomStatus
     * const roomStatus = await prisma.roomStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomStatusFindUniqueArgs>(args: SelectSubset<T, RoomStatusFindUniqueArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomStatusFindUniqueOrThrowArgs} args - Arguments to find a RoomStatus
     * @example
     * // Get one RoomStatus
     * const roomStatus = await prisma.roomStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusFindFirstArgs} args - Arguments to find a RoomStatus
     * @example
     * // Get one RoomStatus
     * const roomStatus = await prisma.roomStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomStatusFindFirstArgs>(args?: SelectSubset<T, RoomStatusFindFirstArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusFindFirstOrThrowArgs} args - Arguments to find a RoomStatus
     * @example
     * // Get one RoomStatus
     * const roomStatus = await prisma.roomStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomStatuses
     * const roomStatuses = await prisma.roomStatus.findMany()
     * 
     * // Get first 10 RoomStatuses
     * const roomStatuses = await prisma.roomStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomStatusWithIdOnly = await prisma.roomStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomStatusFindManyArgs>(args?: SelectSubset<T, RoomStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomStatus.
     * @param {RoomStatusCreateArgs} args - Arguments to create a RoomStatus.
     * @example
     * // Create one RoomStatus
     * const RoomStatus = await prisma.roomStatus.create({
     *   data: {
     *     // ... data to create a RoomStatus
     *   }
     * })
     * 
     */
    create<T extends RoomStatusCreateArgs>(args: SelectSubset<T, RoomStatusCreateArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomStatuses.
     * @param {RoomStatusCreateManyArgs} args - Arguments to create many RoomStatuses.
     * @example
     * // Create many RoomStatuses
     * const roomStatus = await prisma.roomStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomStatusCreateManyArgs>(args?: SelectSubset<T, RoomStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomStatuses and returns the data saved in the database.
     * @param {RoomStatusCreateManyAndReturnArgs} args - Arguments to create many RoomStatuses.
     * @example
     * // Create many RoomStatuses
     * const roomStatus = await prisma.roomStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomStatuses and only return the `id`
     * const roomStatusWithIdOnly = await prisma.roomStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomStatus.
     * @param {RoomStatusDeleteArgs} args - Arguments to delete one RoomStatus.
     * @example
     * // Delete one RoomStatus
     * const RoomStatus = await prisma.roomStatus.delete({
     *   where: {
     *     // ... filter to delete one RoomStatus
     *   }
     * })
     * 
     */
    delete<T extends RoomStatusDeleteArgs>(args: SelectSubset<T, RoomStatusDeleteArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomStatus.
     * @param {RoomStatusUpdateArgs} args - Arguments to update one RoomStatus.
     * @example
     * // Update one RoomStatus
     * const roomStatus = await prisma.roomStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomStatusUpdateArgs>(args: SelectSubset<T, RoomStatusUpdateArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomStatuses.
     * @param {RoomStatusDeleteManyArgs} args - Arguments to filter RoomStatuses to delete.
     * @example
     * // Delete a few RoomStatuses
     * const { count } = await prisma.roomStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomStatusDeleteManyArgs>(args?: SelectSubset<T, RoomStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomStatuses
     * const roomStatus = await prisma.roomStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomStatusUpdateManyArgs>(args: SelectSubset<T, RoomStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStatuses and returns the data updated in the database.
     * @param {RoomStatusUpdateManyAndReturnArgs} args - Arguments to update many RoomStatuses.
     * @example
     * // Update many RoomStatuses
     * const roomStatus = await prisma.roomStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomStatuses and only return the `id`
     * const roomStatusWithIdOnly = await prisma.roomStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomStatus.
     * @param {RoomStatusUpsertArgs} args - Arguments to update or create a RoomStatus.
     * @example
     * // Update or create a RoomStatus
     * const roomStatus = await prisma.roomStatus.upsert({
     *   create: {
     *     // ... data to create a RoomStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomStatus we want to update
     *   }
     * })
     */
    upsert<T extends RoomStatusUpsertArgs>(args: SelectSubset<T, RoomStatusUpsertArgs<ExtArgs>>): Prisma__RoomStatusClient<$Result.GetResult<Prisma.$RoomStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusCountArgs} args - Arguments to filter RoomStatuses to count.
     * @example
     * // Count the number of RoomStatuses
     * const count = await prisma.roomStatus.count({
     *   where: {
     *     // ... the filter for the RoomStatuses we want to count
     *   }
     * })
    **/
    count<T extends RoomStatusCountArgs>(
      args?: Subset<T, RoomStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomStatusAggregateArgs>(args: Subset<T, RoomStatusAggregateArgs>): Prisma.PrismaPromise<GetRoomStatusAggregateType<T>>

    /**
     * Group by RoomStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomStatusGroupByArgs['orderBy'] }
        : { orderBy?: RoomStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomStatus model
   */
  readonly fields: RoomStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomStatus model
   */
  interface RoomStatusFieldRefs {
    readonly id: FieldRef<"RoomStatus", 'String'>
    readonly dateOfStart: FieldRef<"RoomStatus", 'DateTime'>
    readonly dateOfEnd: FieldRef<"RoomStatus", 'DateTime'>
    readonly description: FieldRef<"RoomStatus", 'String'>
    readonly roomId: FieldRef<"RoomStatus", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RoomStatus findUnique
   */
  export type RoomStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatus to fetch.
     */
    where: RoomStatusWhereUniqueInput
  }

  /**
   * RoomStatus findUniqueOrThrow
   */
  export type RoomStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatus to fetch.
     */
    where: RoomStatusWhereUniqueInput
  }

  /**
   * RoomStatus findFirst
   */
  export type RoomStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatus to fetch.
     */
    where?: RoomStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatuses to fetch.
     */
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStatuses.
     */
    cursor?: RoomStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStatuses.
     */
    distinct?: RoomStatusScalarFieldEnum | RoomStatusScalarFieldEnum[]
  }

  /**
   * RoomStatus findFirstOrThrow
   */
  export type RoomStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatus to fetch.
     */
    where?: RoomStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatuses to fetch.
     */
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStatuses.
     */
    cursor?: RoomStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStatuses.
     */
    distinct?: RoomStatusScalarFieldEnum | RoomStatusScalarFieldEnum[]
  }

  /**
   * RoomStatus findMany
   */
  export type RoomStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter, which RoomStatuses to fetch.
     */
    where?: RoomStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStatuses to fetch.
     */
    orderBy?: RoomStatusOrderByWithRelationInput | RoomStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomStatuses.
     */
    cursor?: RoomStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStatuses.
     */
    skip?: number
    distinct?: RoomStatusScalarFieldEnum | RoomStatusScalarFieldEnum[]
  }

  /**
   * RoomStatus create
   */
  export type RoomStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomStatus.
     */
    data: XOR<RoomStatusCreateInput, RoomStatusUncheckedCreateInput>
  }

  /**
   * RoomStatus createMany
   */
  export type RoomStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomStatuses.
     */
    data: RoomStatusCreateManyInput | RoomStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomStatus createManyAndReturn
   */
  export type RoomStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * The data used to create many RoomStatuses.
     */
    data: RoomStatusCreateManyInput | RoomStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStatus update
   */
  export type RoomStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomStatus.
     */
    data: XOR<RoomStatusUpdateInput, RoomStatusUncheckedUpdateInput>
    /**
     * Choose, which RoomStatus to update.
     */
    where: RoomStatusWhereUniqueInput
  }

  /**
   * RoomStatus updateMany
   */
  export type RoomStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomStatuses.
     */
    data: XOR<RoomStatusUpdateManyMutationInput, RoomStatusUncheckedUpdateManyInput>
    /**
     * Filter which RoomStatuses to update
     */
    where?: RoomStatusWhereInput
    /**
     * Limit how many RoomStatuses to update.
     */
    limit?: number
  }

  /**
   * RoomStatus updateManyAndReturn
   */
  export type RoomStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * The data used to update RoomStatuses.
     */
    data: XOR<RoomStatusUpdateManyMutationInput, RoomStatusUncheckedUpdateManyInput>
    /**
     * Filter which RoomStatuses to update
     */
    where?: RoomStatusWhereInput
    /**
     * Limit how many RoomStatuses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStatus upsert
   */
  export type RoomStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomStatus to update in case it exists.
     */
    where: RoomStatusWhereUniqueInput
    /**
     * In case the RoomStatus found by the `where` argument doesn't exist, create a new RoomStatus with this data.
     */
    create: XOR<RoomStatusCreateInput, RoomStatusUncheckedCreateInput>
    /**
     * In case the RoomStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomStatusUpdateInput, RoomStatusUncheckedUpdateInput>
  }

  /**
   * RoomStatus delete
   */
  export type RoomStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
    /**
     * Filter which RoomStatus to delete.
     */
    where: RoomStatusWhereUniqueInput
  }

  /**
   * RoomStatus deleteMany
   */
  export type RoomStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStatuses to delete
     */
    where?: RoomStatusWhereInput
    /**
     * Limit how many RoomStatuses to delete.
     */
    limit?: number
  }

  /**
   * RoomStatus without action
   */
  export type RoomStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStatus
     */
    select?: RoomStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStatus
     */
    omit?: RoomStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStatusInclude<ExtArgs> | null
  }


  /**
   * Model Price
   */

  export type AggregatePrice = {
    _count: PriceCountAggregateOutputType | null
    _avg: PriceAvgAggregateOutputType | null
    _sum: PriceSumAggregateOutputType | null
    _min: PriceMinAggregateOutputType | null
    _max: PriceMaxAggregateOutputType | null
  }

  export type PriceAvgAggregateOutputType = {
    roomCapacity: number | null
    pricePerMonth: number | null
    pricePerDay: number | null
  }

  export type PriceSumAggregateOutputType = {
    roomCapacity: number | null
    pricePerMonth: number | null
    pricePerDay: number | null
  }

  export type PriceMinAggregateOutputType = {
    id: string | null
    roomCapacity: number | null
    pricePerMonth: number | null
    pricePerDay: number | null
    dateFrom: Date | null
    dateTo: Date | null
  }

  export type PriceMaxAggregateOutputType = {
    id: string | null
    roomCapacity: number | null
    pricePerMonth: number | null
    pricePerDay: number | null
    dateFrom: Date | null
    dateTo: Date | null
  }

  export type PriceCountAggregateOutputType = {
    id: number
    roomCapacity: number
    pricePerMonth: number
    pricePerDay: number
    dateFrom: number
    dateTo: number
    _all: number
  }


  export type PriceAvgAggregateInputType = {
    roomCapacity?: true
    pricePerMonth?: true
    pricePerDay?: true
  }

  export type PriceSumAggregateInputType = {
    roomCapacity?: true
    pricePerMonth?: true
    pricePerDay?: true
  }

  export type PriceMinAggregateInputType = {
    id?: true
    roomCapacity?: true
    pricePerMonth?: true
    pricePerDay?: true
    dateFrom?: true
    dateTo?: true
  }

  export type PriceMaxAggregateInputType = {
    id?: true
    roomCapacity?: true
    pricePerMonth?: true
    pricePerDay?: true
    dateFrom?: true
    dateTo?: true
  }

  export type PriceCountAggregateInputType = {
    id?: true
    roomCapacity?: true
    pricePerMonth?: true
    pricePerDay?: true
    dateFrom?: true
    dateTo?: true
    _all?: true
  }

  export type PriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Price to aggregate.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prices
    **/
    _count?: true | PriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceMaxAggregateInputType
  }

  export type GetPriceAggregateType<T extends PriceAggregateArgs> = {
        [P in keyof T & keyof AggregatePrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrice[P]>
      : GetScalarType<T[P], AggregatePrice[P]>
  }




  export type PriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceWhereInput
    orderBy?: PriceOrderByWithAggregationInput | PriceOrderByWithAggregationInput[]
    by: PriceScalarFieldEnum[] | PriceScalarFieldEnum
    having?: PriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceCountAggregateInputType | true
    _avg?: PriceAvgAggregateInputType
    _sum?: PriceSumAggregateInputType
    _min?: PriceMinAggregateInputType
    _max?: PriceMaxAggregateInputType
  }

  export type PriceGroupByOutputType = {
    id: string
    roomCapacity: number
    pricePerMonth: number
    pricePerDay: number
    dateFrom: Date
    dateTo: Date | null
    _count: PriceCountAggregateOutputType | null
    _avg: PriceAvgAggregateOutputType | null
    _sum: PriceSumAggregateOutputType | null
    _min: PriceMinAggregateOutputType | null
    _max: PriceMaxAggregateOutputType | null
  }

  type GetPriceGroupByPayload<T extends PriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceGroupByOutputType[P]>
            : GetScalarType<T[P], PriceGroupByOutputType[P]>
        }
      >
    >


  export type PriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCapacity?: boolean
    pricePerMonth?: boolean
    pricePerDay?: boolean
    dateFrom?: boolean
    dateTo?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCapacity?: boolean
    pricePerMonth?: boolean
    pricePerDay?: boolean
    dateFrom?: boolean
    dateTo?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomCapacity?: boolean
    pricePerMonth?: boolean
    pricePerDay?: boolean
    dateFrom?: boolean
    dateTo?: boolean
  }, ExtArgs["result"]["price"]>

  export type PriceSelectScalar = {
    id?: boolean
    roomCapacity?: boolean
    pricePerMonth?: boolean
    pricePerDay?: boolean
    dateFrom?: boolean
    dateTo?: boolean
  }

  export type PriceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomCapacity" | "pricePerMonth" | "pricePerDay" | "dateFrom" | "dateTo", ExtArgs["result"]["price"]>

  export type $PricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Price"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomCapacity: number
      pricePerMonth: number
      pricePerDay: number
      dateFrom: Date
      dateTo: Date | null
    }, ExtArgs["result"]["price"]>
    composites: {}
  }

  type PriceGetPayload<S extends boolean | null | undefined | PriceDefaultArgs> = $Result.GetResult<Prisma.$PricePayload, S>

  type PriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceCountAggregateInputType | true
    }

  export interface PriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Price'], meta: { name: 'Price' } }
    /**
     * Find zero or one Price that matches the filter.
     * @param {PriceFindUniqueArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceFindUniqueArgs>(args: SelectSubset<T, PriceFindUniqueArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Price that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceFindUniqueOrThrowArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Price that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindFirstArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceFindFirstArgs>(args?: SelectSubset<T, PriceFindFirstArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Price that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindFirstOrThrowArgs} args - Arguments to find a Price
     * @example
     * // Get one Price
     * const price = await prisma.price.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prices
     * const prices = await prisma.price.findMany()
     * 
     * // Get first 10 Prices
     * const prices = await prisma.price.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceWithIdOnly = await prisma.price.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceFindManyArgs>(args?: SelectSubset<T, PriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Price.
     * @param {PriceCreateArgs} args - Arguments to create a Price.
     * @example
     * // Create one Price
     * const Price = await prisma.price.create({
     *   data: {
     *     // ... data to create a Price
     *   }
     * })
     * 
     */
    create<T extends PriceCreateArgs>(args: SelectSubset<T, PriceCreateArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prices.
     * @param {PriceCreateManyArgs} args - Arguments to create many Prices.
     * @example
     * // Create many Prices
     * const price = await prisma.price.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceCreateManyArgs>(args?: SelectSubset<T, PriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prices and returns the data saved in the database.
     * @param {PriceCreateManyAndReturnArgs} args - Arguments to create many Prices.
     * @example
     * // Create many Prices
     * const price = await prisma.price.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prices and only return the `id`
     * const priceWithIdOnly = await prisma.price.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Price.
     * @param {PriceDeleteArgs} args - Arguments to delete one Price.
     * @example
     * // Delete one Price
     * const Price = await prisma.price.delete({
     *   where: {
     *     // ... filter to delete one Price
     *   }
     * })
     * 
     */
    delete<T extends PriceDeleteArgs>(args: SelectSubset<T, PriceDeleteArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Price.
     * @param {PriceUpdateArgs} args - Arguments to update one Price.
     * @example
     * // Update one Price
     * const price = await prisma.price.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceUpdateArgs>(args: SelectSubset<T, PriceUpdateArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prices.
     * @param {PriceDeleteManyArgs} args - Arguments to filter Prices to delete.
     * @example
     * // Delete a few Prices
     * const { count } = await prisma.price.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceDeleteManyArgs>(args?: SelectSubset<T, PriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prices
     * const price = await prisma.price.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceUpdateManyArgs>(args: SelectSubset<T, PriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prices and returns the data updated in the database.
     * @param {PriceUpdateManyAndReturnArgs} args - Arguments to update many Prices.
     * @example
     * // Update many Prices
     * const price = await prisma.price.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prices and only return the `id`
     * const priceWithIdOnly = await prisma.price.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Price.
     * @param {PriceUpsertArgs} args - Arguments to update or create a Price.
     * @example
     * // Update or create a Price
     * const price = await prisma.price.upsert({
     *   create: {
     *     // ... data to create a Price
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Price we want to update
     *   }
     * })
     */
    upsert<T extends PriceUpsertArgs>(args: SelectSubset<T, PriceUpsertArgs<ExtArgs>>): Prisma__PriceClient<$Result.GetResult<Prisma.$PricePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceCountArgs} args - Arguments to filter Prices to count.
     * @example
     * // Count the number of Prices
     * const count = await prisma.price.count({
     *   where: {
     *     // ... the filter for the Prices we want to count
     *   }
     * })
    **/
    count<T extends PriceCountArgs>(
      args?: Subset<T, PriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Price.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceAggregateArgs>(args: Subset<T, PriceAggregateArgs>): Prisma.PrismaPromise<GetPriceAggregateType<T>>

    /**
     * Group by Price.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceGroupByArgs['orderBy'] }
        : { orderBy?: PriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Price model
   */
  readonly fields: PriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Price.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Price model
   */
  interface PriceFieldRefs {
    readonly id: FieldRef<"Price", 'String'>
    readonly roomCapacity: FieldRef<"Price", 'Int'>
    readonly pricePerMonth: FieldRef<"Price", 'Float'>
    readonly pricePerDay: FieldRef<"Price", 'Float'>
    readonly dateFrom: FieldRef<"Price", 'DateTime'>
    readonly dateTo: FieldRef<"Price", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Price findUnique
   */
  export type PriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price findUniqueOrThrow
   */
  export type PriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price findFirst
   */
  export type PriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prices.
     */
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price findFirstOrThrow
   */
  export type PriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Price to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prices.
     */
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price findMany
   */
  export type PriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter, which Prices to fetch.
     */
    where?: PriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prices to fetch.
     */
    orderBy?: PriceOrderByWithRelationInput | PriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prices.
     */
    cursor?: PriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prices.
     */
    skip?: number
    distinct?: PriceScalarFieldEnum | PriceScalarFieldEnum[]
  }

  /**
   * Price create
   */
  export type PriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data needed to create a Price.
     */
    data: XOR<PriceCreateInput, PriceUncheckedCreateInput>
  }

  /**
   * Price createMany
   */
  export type PriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prices.
     */
    data: PriceCreateManyInput | PriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Price createManyAndReturn
   */
  export type PriceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data used to create many Prices.
     */
    data: PriceCreateManyInput | PriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Price update
   */
  export type PriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data needed to update a Price.
     */
    data: XOR<PriceUpdateInput, PriceUncheckedUpdateInput>
    /**
     * Choose, which Price to update.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price updateMany
   */
  export type PriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prices.
     */
    data: XOR<PriceUpdateManyMutationInput, PriceUncheckedUpdateManyInput>
    /**
     * Filter which Prices to update
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to update.
     */
    limit?: number
  }

  /**
   * Price updateManyAndReturn
   */
  export type PriceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The data used to update Prices.
     */
    data: XOR<PriceUpdateManyMutationInput, PriceUncheckedUpdateManyInput>
    /**
     * Filter which Prices to update
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to update.
     */
    limit?: number
  }

  /**
   * Price upsert
   */
  export type PriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * The filter to search for the Price to update in case it exists.
     */
    where: PriceWhereUniqueInput
    /**
     * In case the Price found by the `where` argument doesn't exist, create a new Price with this data.
     */
    create: XOR<PriceCreateInput, PriceUncheckedCreateInput>
    /**
     * In case the Price was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceUpdateInput, PriceUncheckedUpdateInput>
  }

  /**
   * Price delete
   */
  export type PriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
    /**
     * Filter which Price to delete.
     */
    where: PriceWhereUniqueInput
  }

  /**
   * Price deleteMany
   */
  export type PriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prices to delete
     */
    where?: PriceWhereInput
    /**
     * Limit how many Prices to delete.
     */
    limit?: number
  }

  /**
   * Price without action
   */
  export type PriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Price
     */
    omit?: PriceOmit<ExtArgs> | null
  }


  /**
   * Model Announcement
   */

  export type AggregateAnnouncement = {
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  export type AnnouncementMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    postedAt: Date | null
    expiresAt: Date | null
    isHidden: boolean | null
    authorId: string | null
  }

  export type AnnouncementMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    postedAt: Date | null
    expiresAt: Date | null
    isHidden: boolean | null
    authorId: string | null
  }

  export type AnnouncementCountAggregateOutputType = {
    id: number
    title: number
    content: number
    postedAt: number
    expiresAt: number
    isHidden: number
    authorId: number
    _all: number
  }


  export type AnnouncementMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    postedAt?: true
    expiresAt?: true
    isHidden?: true
    authorId?: true
  }

  export type AnnouncementMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    postedAt?: true
    expiresAt?: true
    isHidden?: true
    authorId?: true
  }

  export type AnnouncementCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    postedAt?: true
    expiresAt?: true
    isHidden?: true
    authorId?: true
    _all?: true
  }

  export type AnnouncementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcement to aggregate.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Announcements
    **/
    _count?: true | AnnouncementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementMaxAggregateInputType
  }

  export type GetAnnouncementAggregateType<T extends AnnouncementAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncement[P]>
      : GetScalarType<T[P], AggregateAnnouncement[P]>
  }




  export type AnnouncementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithAggregationInput | AnnouncementOrderByWithAggregationInput[]
    by: AnnouncementScalarFieldEnum[] | AnnouncementScalarFieldEnum
    having?: AnnouncementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementCountAggregateInputType | true
    _min?: AnnouncementMinAggregateInputType
    _max?: AnnouncementMaxAggregateInputType
  }

  export type AnnouncementGroupByOutputType = {
    id: string
    title: string
    content: string
    postedAt: Date
    expiresAt: Date
    isHidden: boolean
    authorId: string
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  type GetAnnouncementGroupByPayload<T extends AnnouncementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    postedAt?: boolean
    expiresAt?: boolean
    isHidden?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    attachments?: boolean | Announcement$attachmentsArgs<ExtArgs>
    recipients?: boolean | Announcement$recipientsArgs<ExtArgs>
    _count?: boolean | AnnouncementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    postedAt?: boolean
    expiresAt?: boolean
    isHidden?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    postedAt?: boolean
    expiresAt?: boolean
    isHidden?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["announcement"]>

  export type AnnouncementSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    postedAt?: boolean
    expiresAt?: boolean
    isHidden?: boolean
    authorId?: boolean
  }

  export type AnnouncementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "postedAt" | "expiresAt" | "isHidden" | "authorId", ExtArgs["result"]["announcement"]>
  export type AnnouncementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    attachments?: boolean | Announcement$attachmentsArgs<ExtArgs>
    recipients?: boolean | Announcement$recipientsArgs<ExtArgs>
    _count?: boolean | AnnouncementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnnouncementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnnouncementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AnnouncementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Announcement"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      attachments: Prisma.$AttachmentPayload<ExtArgs>[]
      recipients: Prisma.$AnnouncementRecipientPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      postedAt: Date
      expiresAt: Date
      isHidden: boolean
      authorId: string
    }, ExtArgs["result"]["announcement"]>
    composites: {}
  }

  type AnnouncementGetPayload<S extends boolean | null | undefined | AnnouncementDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementPayload, S>

  type AnnouncementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementCountAggregateInputType | true
    }

  export interface AnnouncementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Announcement'], meta: { name: 'Announcement' } }
    /**
     * Find zero or one Announcement that matches the filter.
     * @param {AnnouncementFindUniqueArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementFindUniqueArgs>(args: SelectSubset<T, AnnouncementFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Announcement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementFindUniqueOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementFindFirstArgs>(args?: SelectSubset<T, AnnouncementFindFirstArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Announcements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Announcements
     * const announcements = await prisma.announcement.findMany()
     * 
     * // Get first 10 Announcements
     * const announcements = await prisma.announcement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const announcementWithIdOnly = await prisma.announcement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnouncementFindManyArgs>(args?: SelectSubset<T, AnnouncementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Announcement.
     * @param {AnnouncementCreateArgs} args - Arguments to create a Announcement.
     * @example
     * // Create one Announcement
     * const Announcement = await prisma.announcement.create({
     *   data: {
     *     // ... data to create a Announcement
     *   }
     * })
     * 
     */
    create<T extends AnnouncementCreateArgs>(args: SelectSubset<T, AnnouncementCreateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Announcements.
     * @param {AnnouncementCreateManyArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementCreateManyArgs>(args?: SelectSubset<T, AnnouncementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Announcements and returns the data saved in the database.
     * @param {AnnouncementCreateManyAndReturnArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnnouncementCreateManyAndReturnArgs>(args?: SelectSubset<T, AnnouncementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Announcement.
     * @param {AnnouncementDeleteArgs} args - Arguments to delete one Announcement.
     * @example
     * // Delete one Announcement
     * const Announcement = await prisma.announcement.delete({
     *   where: {
     *     // ... filter to delete one Announcement
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementDeleteArgs>(args: SelectSubset<T, AnnouncementDeleteArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Announcement.
     * @param {AnnouncementUpdateArgs} args - Arguments to update one Announcement.
     * @example
     * // Update one Announcement
     * const announcement = await prisma.announcement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementUpdateArgs>(args: SelectSubset<T, AnnouncementUpdateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Announcements.
     * @param {AnnouncementDeleteManyArgs} args - Arguments to filter Announcements to delete.
     * @example
     * // Delete a few Announcements
     * const { count } = await prisma.announcement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementDeleteManyArgs>(args?: SelectSubset<T, AnnouncementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementUpdateManyArgs>(args: SelectSubset<T, AnnouncementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements and returns the data updated in the database.
     * @param {AnnouncementUpdateManyAndReturnArgs} args - Arguments to update many Announcements.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Announcements and only return the `id`
     * const announcementWithIdOnly = await prisma.announcement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnnouncementUpdateManyAndReturnArgs>(args: SelectSubset<T, AnnouncementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Announcement.
     * @param {AnnouncementUpsertArgs} args - Arguments to update or create a Announcement.
     * @example
     * // Update or create a Announcement
     * const announcement = await prisma.announcement.upsert({
     *   create: {
     *     // ... data to create a Announcement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Announcement we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementUpsertArgs>(args: SelectSubset<T, AnnouncementUpsertArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementCountArgs} args - Arguments to filter Announcements to count.
     * @example
     * // Count the number of Announcements
     * const count = await prisma.announcement.count({
     *   where: {
     *     // ... the filter for the Announcements we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementCountArgs>(
      args?: Subset<T, AnnouncementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnnouncementAggregateArgs>(args: Subset<T, AnnouncementAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementAggregateType<T>>

    /**
     * Group by Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnnouncementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnnouncementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Announcement model
   */
  readonly fields: AnnouncementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Announcement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attachments<T extends Announcement$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Announcement$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recipients<T extends Announcement$recipientsArgs<ExtArgs> = {}>(args?: Subset<T, Announcement$recipientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Announcement model
   */
  interface AnnouncementFieldRefs {
    readonly id: FieldRef<"Announcement", 'String'>
    readonly title: FieldRef<"Announcement", 'String'>
    readonly content: FieldRef<"Announcement", 'String'>
    readonly postedAt: FieldRef<"Announcement", 'DateTime'>
    readonly expiresAt: FieldRef<"Announcement", 'DateTime'>
    readonly isHidden: FieldRef<"Announcement", 'Boolean'>
    readonly authorId: FieldRef<"Announcement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Announcement findUnique
   */
  export type AnnouncementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findUniqueOrThrow
   */
  export type AnnouncementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findFirst
   */
  export type AnnouncementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findFirstOrThrow
   */
  export type AnnouncementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findMany
   */
  export type AnnouncementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter, which Announcements to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement create
   */
  export type AnnouncementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to create a Announcement.
     */
    data: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
  }

  /**
   * Announcement createMany
   */
  export type AnnouncementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Announcement createManyAndReturn
   */
  export type AnnouncementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Announcement update
   */
  export type AnnouncementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The data needed to update a Announcement.
     */
    data: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
    /**
     * Choose, which Announcement to update.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement updateMany
   */
  export type AnnouncementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
  }

  /**
   * Announcement updateManyAndReturn
   */
  export type AnnouncementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Announcement upsert
   */
  export type AnnouncementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * The filter to search for the Announcement to update in case it exists.
     */
    where: AnnouncementWhereUniqueInput
    /**
     * In case the Announcement found by the `where` argument doesn't exist, create a new Announcement with this data.
     */
    create: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
    /**
     * In case the Announcement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
  }

  /**
   * Announcement delete
   */
  export type AnnouncementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
    /**
     * Filter which Announcement to delete.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement deleteMany
   */
  export type AnnouncementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcements to delete
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to delete.
     */
    limit?: number
  }

  /**
   * Announcement.attachments
   */
  export type Announcement$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Announcement.recipients
   */
  export type Announcement$recipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    where?: AnnouncementRecipientWhereInput
    orderBy?: AnnouncementRecipientOrderByWithRelationInput | AnnouncementRecipientOrderByWithRelationInput[]
    cursor?: AnnouncementRecipientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnnouncementRecipientScalarFieldEnum | AnnouncementRecipientScalarFieldEnum[]
  }

  /**
   * Announcement without action
   */
  export type AnnouncementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementInclude<ExtArgs> | null
  }


  /**
   * Model Attachment
   */

  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  export type AttachmentMinAggregateOutputType = {
    id: string | null
    url: string | null
    filename: string | null
    announcementId: string | null
  }

  export type AttachmentMaxAggregateOutputType = {
    id: string | null
    url: string | null
    filename: string | null
    announcementId: string | null
  }

  export type AttachmentCountAggregateOutputType = {
    id: number
    url: number
    filename: number
    announcementId: number
    _all: number
  }


  export type AttachmentMinAggregateInputType = {
    id?: true
    url?: true
    filename?: true
    announcementId?: true
  }

  export type AttachmentMaxAggregateInputType = {
    id?: true
    url?: true
    filename?: true
    announcementId?: true
  }

  export type AttachmentCountAggregateInputType = {
    id?: true
    url?: true
    filename?: true
    announcementId?: true
    _all?: true
  }

  export type AttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachment to aggregate.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attachments
    **/
    _count?: true | AttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentMaxAggregateInputType
  }

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>
  }




  export type AttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithAggregationInput | AttachmentOrderByWithAggregationInput[]
    by: AttachmentScalarFieldEnum[] | AttachmentScalarFieldEnum
    having?: AttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentCountAggregateInputType | true
    _min?: AttachmentMinAggregateInputType
    _max?: AttachmentMaxAggregateInputType
  }

  export type AttachmentGroupByOutputType = {
    id: string
    url: string
    filename: string
    announcementId: string
    _count: AttachmentCountAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  type GetAttachmentGroupByPayload<T extends AttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
        }
      >
    >


  export type AttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    filename?: boolean
    announcementId?: boolean
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    filename?: boolean
    announcementId?: boolean
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    filename?: boolean
    announcementId?: boolean
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>

  export type AttachmentSelectScalar = {
    id?: boolean
    url?: boolean
    filename?: boolean
    announcementId?: boolean
  }

  export type AttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "filename" | "announcementId", ExtArgs["result"]["attachment"]>
  export type AttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
  }
  export type AttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
  }
  export type AttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
  }

  export type $AttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attachment"
    objects: {
      announcement: Prisma.$AnnouncementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      filename: string
      announcementId: string
    }, ExtArgs["result"]["attachment"]>
    composites: {}
  }

  type AttachmentGetPayload<S extends boolean | null | undefined | AttachmentDefaultArgs> = $Result.GetResult<Prisma.$AttachmentPayload, S>

  type AttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttachmentCountAggregateInputType | true
    }

  export interface AttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attachment'], meta: { name: 'Attachment' } }
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {AttachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttachmentFindUniqueArgs>(args: SelectSubset<T, AttachmentFindUniqueArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttachmentFindFirstArgs>(args?: SelectSubset<T, AttachmentFindFirstArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     * 
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttachmentFindManyArgs>(args?: SelectSubset<T, AttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attachment.
     * @param {AttachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     * 
     */
    create<T extends AttachmentCreateArgs>(args: SelectSubset<T, AttachmentCreateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attachments.
     * @param {AttachmentCreateManyArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttachmentCreateManyArgs>(args?: SelectSubset<T, AttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attachments and returns the data saved in the database.
     * @param {AttachmentCreateManyAndReturnArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attachment.
     * @param {AttachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     * 
     */
    delete<T extends AttachmentDeleteArgs>(args: SelectSubset<T, AttachmentDeleteArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attachment.
     * @param {AttachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttachmentUpdateArgs>(args: SelectSubset<T, AttachmentUpdateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attachments.
     * @param {AttachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttachmentDeleteManyArgs>(args?: SelectSubset<T, AttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttachmentUpdateManyArgs>(args: SelectSubset<T, AttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments and returns the data updated in the database.
     * @param {AttachmentUpdateManyAndReturnArgs} args - Arguments to update many Attachments.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attachments and only return the `id`
     * const attachmentWithIdOnly = await prisma.attachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attachment.
     * @param {AttachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
     */
    upsert<T extends AttachmentUpsertArgs>(args: SelectSubset<T, AttachmentUpsertArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
    **/
    count<T extends AttachmentCountArgs>(
      args?: Subset<T, AttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttachmentAggregateArgs>(args: Subset<T, AttachmentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attachment model
   */
  readonly fields: AttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    announcement<T extends AnnouncementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnnouncementDefaultArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attachment model
   */
  interface AttachmentFieldRefs {
    readonly id: FieldRef<"Attachment", 'String'>
    readonly url: FieldRef<"Attachment", 'String'>
    readonly filename: FieldRef<"Attachment", 'String'>
    readonly announcementId: FieldRef<"Attachment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Attachment findUnique
   */
  export type AttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findUniqueOrThrow
   */
  export type AttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findFirst
   */
  export type AttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findFirstOrThrow
   */
  export type AttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findMany
   */
  export type AttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachments to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment create
   */
  export type AttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Attachment.
     */
    data: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
  }

  /**
   * Attachment createMany
   */
  export type AttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attachment createManyAndReturn
   */
  export type AttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment update
   */
  export type AttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Attachment.
     */
    data: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
    /**
     * Choose, which Attachment to update.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment updateMany
   */
  export type AttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
  }

  /**
   * Attachment updateManyAndReturn
   */
  export type AttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attachment upsert
   */
  export type AttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Attachment to update in case it exists.
     */
    where: AttachmentWhereUniqueInput
    /**
     * In case the Attachment found by the `where` argument doesn't exist, create a new Attachment with this data.
     */
    create: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
    /**
     * In case the Attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
  }

  /**
   * Attachment delete
   */
  export type AttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter which Attachment to delete.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment deleteMany
   */
  export type AttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachments to delete
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to delete.
     */
    limit?: number
  }

  /**
   * Attachment without action
   */
  export type AttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
  }


  /**
   * Model AnnouncementRecipient
   */

  export type AggregateAnnouncementRecipient = {
    _count: AnnouncementRecipientCountAggregateOutputType | null
    _avg: AnnouncementRecipientAvgAggregateOutputType | null
    _sum: AnnouncementRecipientSumAggregateOutputType | null
    _min: AnnouncementRecipientMinAggregateOutputType | null
    _max: AnnouncementRecipientMaxAggregateOutputType | null
  }

  export type AnnouncementRecipientAvgAggregateOutputType = {
    floor: number | null
  }

  export type AnnouncementRecipientSumAggregateOutputType = {
    floor: number | null
  }

  export type AnnouncementRecipientMinAggregateOutputType = {
    id: string | null
    announcementId: string | null
    userId: string | null
    roomId: string | null
    floor: number | null
    forEveryone: boolean | null
  }

  export type AnnouncementRecipientMaxAggregateOutputType = {
    id: string | null
    announcementId: string | null
    userId: string | null
    roomId: string | null
    floor: number | null
    forEveryone: boolean | null
  }

  export type AnnouncementRecipientCountAggregateOutputType = {
    id: number
    announcementId: number
    userId: number
    roomId: number
    floor: number
    forEveryone: number
    _all: number
  }


  export type AnnouncementRecipientAvgAggregateInputType = {
    floor?: true
  }

  export type AnnouncementRecipientSumAggregateInputType = {
    floor?: true
  }

  export type AnnouncementRecipientMinAggregateInputType = {
    id?: true
    announcementId?: true
    userId?: true
    roomId?: true
    floor?: true
    forEveryone?: true
  }

  export type AnnouncementRecipientMaxAggregateInputType = {
    id?: true
    announcementId?: true
    userId?: true
    roomId?: true
    floor?: true
    forEveryone?: true
  }

  export type AnnouncementRecipientCountAggregateInputType = {
    id?: true
    announcementId?: true
    userId?: true
    roomId?: true
    floor?: true
    forEveryone?: true
    _all?: true
  }

  export type AnnouncementRecipientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnnouncementRecipient to aggregate.
     */
    where?: AnnouncementRecipientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnnouncementRecipients to fetch.
     */
    orderBy?: AnnouncementRecipientOrderByWithRelationInput | AnnouncementRecipientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementRecipientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnnouncementRecipients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnnouncementRecipients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnnouncementRecipients
    **/
    _count?: true | AnnouncementRecipientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnnouncementRecipientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnnouncementRecipientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementRecipientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementRecipientMaxAggregateInputType
  }

  export type GetAnnouncementRecipientAggregateType<T extends AnnouncementRecipientAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncementRecipient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncementRecipient[P]>
      : GetScalarType<T[P], AggregateAnnouncementRecipient[P]>
  }




  export type AnnouncementRecipientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementRecipientWhereInput
    orderBy?: AnnouncementRecipientOrderByWithAggregationInput | AnnouncementRecipientOrderByWithAggregationInput[]
    by: AnnouncementRecipientScalarFieldEnum[] | AnnouncementRecipientScalarFieldEnum
    having?: AnnouncementRecipientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementRecipientCountAggregateInputType | true
    _avg?: AnnouncementRecipientAvgAggregateInputType
    _sum?: AnnouncementRecipientSumAggregateInputType
    _min?: AnnouncementRecipientMinAggregateInputType
    _max?: AnnouncementRecipientMaxAggregateInputType
  }

  export type AnnouncementRecipientGroupByOutputType = {
    id: string
    announcementId: string
    userId: string | null
    roomId: string | null
    floor: number | null
    forEveryone: boolean
    _count: AnnouncementRecipientCountAggregateOutputType | null
    _avg: AnnouncementRecipientAvgAggregateOutputType | null
    _sum: AnnouncementRecipientSumAggregateOutputType | null
    _min: AnnouncementRecipientMinAggregateOutputType | null
    _max: AnnouncementRecipientMaxAggregateOutputType | null
  }

  type GetAnnouncementRecipientGroupByPayload<T extends AnnouncementRecipientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementRecipientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementRecipientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementRecipientGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementRecipientGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementRecipientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    announcementId?: boolean
    userId?: boolean
    roomId?: boolean
    floor?: boolean
    forEveryone?: boolean
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
    user?: boolean | AnnouncementRecipient$userArgs<ExtArgs>
    room?: boolean | AnnouncementRecipient$roomArgs<ExtArgs>
  }, ExtArgs["result"]["announcementRecipient"]>

  export type AnnouncementRecipientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    announcementId?: boolean
    userId?: boolean
    roomId?: boolean
    floor?: boolean
    forEveryone?: boolean
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
    user?: boolean | AnnouncementRecipient$userArgs<ExtArgs>
    room?: boolean | AnnouncementRecipient$roomArgs<ExtArgs>
  }, ExtArgs["result"]["announcementRecipient"]>

  export type AnnouncementRecipientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    announcementId?: boolean
    userId?: boolean
    roomId?: boolean
    floor?: boolean
    forEveryone?: boolean
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
    user?: boolean | AnnouncementRecipient$userArgs<ExtArgs>
    room?: boolean | AnnouncementRecipient$roomArgs<ExtArgs>
  }, ExtArgs["result"]["announcementRecipient"]>

  export type AnnouncementRecipientSelectScalar = {
    id?: boolean
    announcementId?: boolean
    userId?: boolean
    roomId?: boolean
    floor?: boolean
    forEveryone?: boolean
  }

  export type AnnouncementRecipientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "announcementId" | "userId" | "roomId" | "floor" | "forEveryone", ExtArgs["result"]["announcementRecipient"]>
  export type AnnouncementRecipientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
    user?: boolean | AnnouncementRecipient$userArgs<ExtArgs>
    room?: boolean | AnnouncementRecipient$roomArgs<ExtArgs>
  }
  export type AnnouncementRecipientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
    user?: boolean | AnnouncementRecipient$userArgs<ExtArgs>
    room?: boolean | AnnouncementRecipient$roomArgs<ExtArgs>
  }
  export type AnnouncementRecipientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    announcement?: boolean | AnnouncementDefaultArgs<ExtArgs>
    user?: boolean | AnnouncementRecipient$userArgs<ExtArgs>
    room?: boolean | AnnouncementRecipient$roomArgs<ExtArgs>
  }

  export type $AnnouncementRecipientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnnouncementRecipient"
    objects: {
      announcement: Prisma.$AnnouncementPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      room: Prisma.$RoomPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      announcementId: string
      userId: string | null
      roomId: string | null
      floor: number | null
      forEveryone: boolean
    }, ExtArgs["result"]["announcementRecipient"]>
    composites: {}
  }

  type AnnouncementRecipientGetPayload<S extends boolean | null | undefined | AnnouncementRecipientDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementRecipientPayload, S>

  type AnnouncementRecipientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementRecipientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementRecipientCountAggregateInputType | true
    }

  export interface AnnouncementRecipientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnnouncementRecipient'], meta: { name: 'AnnouncementRecipient' } }
    /**
     * Find zero or one AnnouncementRecipient that matches the filter.
     * @param {AnnouncementRecipientFindUniqueArgs} args - Arguments to find a AnnouncementRecipient
     * @example
     * // Get one AnnouncementRecipient
     * const announcementRecipient = await prisma.announcementRecipient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementRecipientFindUniqueArgs>(args: SelectSubset<T, AnnouncementRecipientFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementRecipientClient<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnnouncementRecipient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementRecipientFindUniqueOrThrowArgs} args - Arguments to find a AnnouncementRecipient
     * @example
     * // Get one AnnouncementRecipient
     * const announcementRecipient = await prisma.announcementRecipient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementRecipientFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementRecipientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementRecipientClient<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnnouncementRecipient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementRecipientFindFirstArgs} args - Arguments to find a AnnouncementRecipient
     * @example
     * // Get one AnnouncementRecipient
     * const announcementRecipient = await prisma.announcementRecipient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementRecipientFindFirstArgs>(args?: SelectSubset<T, AnnouncementRecipientFindFirstArgs<ExtArgs>>): Prisma__AnnouncementRecipientClient<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnnouncementRecipient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementRecipientFindFirstOrThrowArgs} args - Arguments to find a AnnouncementRecipient
     * @example
     * // Get one AnnouncementRecipient
     * const announcementRecipient = await prisma.announcementRecipient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementRecipientFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementRecipientFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementRecipientClient<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnnouncementRecipients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementRecipientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnnouncementRecipients
     * const announcementRecipients = await prisma.announcementRecipient.findMany()
     * 
     * // Get first 10 AnnouncementRecipients
     * const announcementRecipients = await prisma.announcementRecipient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const announcementRecipientWithIdOnly = await prisma.announcementRecipient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnouncementRecipientFindManyArgs>(args?: SelectSubset<T, AnnouncementRecipientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnnouncementRecipient.
     * @param {AnnouncementRecipientCreateArgs} args - Arguments to create a AnnouncementRecipient.
     * @example
     * // Create one AnnouncementRecipient
     * const AnnouncementRecipient = await prisma.announcementRecipient.create({
     *   data: {
     *     // ... data to create a AnnouncementRecipient
     *   }
     * })
     * 
     */
    create<T extends AnnouncementRecipientCreateArgs>(args: SelectSubset<T, AnnouncementRecipientCreateArgs<ExtArgs>>): Prisma__AnnouncementRecipientClient<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnnouncementRecipients.
     * @param {AnnouncementRecipientCreateManyArgs} args - Arguments to create many AnnouncementRecipients.
     * @example
     * // Create many AnnouncementRecipients
     * const announcementRecipient = await prisma.announcementRecipient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementRecipientCreateManyArgs>(args?: SelectSubset<T, AnnouncementRecipientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnnouncementRecipients and returns the data saved in the database.
     * @param {AnnouncementRecipientCreateManyAndReturnArgs} args - Arguments to create many AnnouncementRecipients.
     * @example
     * // Create many AnnouncementRecipients
     * const announcementRecipient = await prisma.announcementRecipient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnnouncementRecipients and only return the `id`
     * const announcementRecipientWithIdOnly = await prisma.announcementRecipient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnnouncementRecipientCreateManyAndReturnArgs>(args?: SelectSubset<T, AnnouncementRecipientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnnouncementRecipient.
     * @param {AnnouncementRecipientDeleteArgs} args - Arguments to delete one AnnouncementRecipient.
     * @example
     * // Delete one AnnouncementRecipient
     * const AnnouncementRecipient = await prisma.announcementRecipient.delete({
     *   where: {
     *     // ... filter to delete one AnnouncementRecipient
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementRecipientDeleteArgs>(args: SelectSubset<T, AnnouncementRecipientDeleteArgs<ExtArgs>>): Prisma__AnnouncementRecipientClient<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnnouncementRecipient.
     * @param {AnnouncementRecipientUpdateArgs} args - Arguments to update one AnnouncementRecipient.
     * @example
     * // Update one AnnouncementRecipient
     * const announcementRecipient = await prisma.announcementRecipient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementRecipientUpdateArgs>(args: SelectSubset<T, AnnouncementRecipientUpdateArgs<ExtArgs>>): Prisma__AnnouncementRecipientClient<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnnouncementRecipients.
     * @param {AnnouncementRecipientDeleteManyArgs} args - Arguments to filter AnnouncementRecipients to delete.
     * @example
     * // Delete a few AnnouncementRecipients
     * const { count } = await prisma.announcementRecipient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementRecipientDeleteManyArgs>(args?: SelectSubset<T, AnnouncementRecipientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnnouncementRecipients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementRecipientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnnouncementRecipients
     * const announcementRecipient = await prisma.announcementRecipient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementRecipientUpdateManyArgs>(args: SelectSubset<T, AnnouncementRecipientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnnouncementRecipients and returns the data updated in the database.
     * @param {AnnouncementRecipientUpdateManyAndReturnArgs} args - Arguments to update many AnnouncementRecipients.
     * @example
     * // Update many AnnouncementRecipients
     * const announcementRecipient = await prisma.announcementRecipient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnnouncementRecipients and only return the `id`
     * const announcementRecipientWithIdOnly = await prisma.announcementRecipient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnnouncementRecipientUpdateManyAndReturnArgs>(args: SelectSubset<T, AnnouncementRecipientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnnouncementRecipient.
     * @param {AnnouncementRecipientUpsertArgs} args - Arguments to update or create a AnnouncementRecipient.
     * @example
     * // Update or create a AnnouncementRecipient
     * const announcementRecipient = await prisma.announcementRecipient.upsert({
     *   create: {
     *     // ... data to create a AnnouncementRecipient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnnouncementRecipient we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementRecipientUpsertArgs>(args: SelectSubset<T, AnnouncementRecipientUpsertArgs<ExtArgs>>): Prisma__AnnouncementRecipientClient<$Result.GetResult<Prisma.$AnnouncementRecipientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnnouncementRecipients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementRecipientCountArgs} args - Arguments to filter AnnouncementRecipients to count.
     * @example
     * // Count the number of AnnouncementRecipients
     * const count = await prisma.announcementRecipient.count({
     *   where: {
     *     // ... the filter for the AnnouncementRecipients we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementRecipientCountArgs>(
      args?: Subset<T, AnnouncementRecipientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementRecipientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnnouncementRecipient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementRecipientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnnouncementRecipientAggregateArgs>(args: Subset<T, AnnouncementRecipientAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementRecipientAggregateType<T>>

    /**
     * Group by AnnouncementRecipient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementRecipientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnnouncementRecipientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementRecipientGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementRecipientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnnouncementRecipientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementRecipientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnnouncementRecipient model
   */
  readonly fields: AnnouncementRecipientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnnouncementRecipient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementRecipientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    announcement<T extends AnnouncementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnnouncementDefaultArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends AnnouncementRecipient$userArgs<ExtArgs> = {}>(args?: Subset<T, AnnouncementRecipient$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    room<T extends AnnouncementRecipient$roomArgs<ExtArgs> = {}>(args?: Subset<T, AnnouncementRecipient$roomArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnnouncementRecipient model
   */
  interface AnnouncementRecipientFieldRefs {
    readonly id: FieldRef<"AnnouncementRecipient", 'String'>
    readonly announcementId: FieldRef<"AnnouncementRecipient", 'String'>
    readonly userId: FieldRef<"AnnouncementRecipient", 'String'>
    readonly roomId: FieldRef<"AnnouncementRecipient", 'String'>
    readonly floor: FieldRef<"AnnouncementRecipient", 'Int'>
    readonly forEveryone: FieldRef<"AnnouncementRecipient", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * AnnouncementRecipient findUnique
   */
  export type AnnouncementRecipientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementRecipient to fetch.
     */
    where: AnnouncementRecipientWhereUniqueInput
  }

  /**
   * AnnouncementRecipient findUniqueOrThrow
   */
  export type AnnouncementRecipientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementRecipient to fetch.
     */
    where: AnnouncementRecipientWhereUniqueInput
  }

  /**
   * AnnouncementRecipient findFirst
   */
  export type AnnouncementRecipientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementRecipient to fetch.
     */
    where?: AnnouncementRecipientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnnouncementRecipients to fetch.
     */
    orderBy?: AnnouncementRecipientOrderByWithRelationInput | AnnouncementRecipientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnnouncementRecipients.
     */
    cursor?: AnnouncementRecipientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnnouncementRecipients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnnouncementRecipients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnnouncementRecipients.
     */
    distinct?: AnnouncementRecipientScalarFieldEnum | AnnouncementRecipientScalarFieldEnum[]
  }

  /**
   * AnnouncementRecipient findFirstOrThrow
   */
  export type AnnouncementRecipientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementRecipient to fetch.
     */
    where?: AnnouncementRecipientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnnouncementRecipients to fetch.
     */
    orderBy?: AnnouncementRecipientOrderByWithRelationInput | AnnouncementRecipientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnnouncementRecipients.
     */
    cursor?: AnnouncementRecipientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnnouncementRecipients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnnouncementRecipients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnnouncementRecipients.
     */
    distinct?: AnnouncementRecipientScalarFieldEnum | AnnouncementRecipientScalarFieldEnum[]
  }

  /**
   * AnnouncementRecipient findMany
   */
  export type AnnouncementRecipientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * Filter, which AnnouncementRecipients to fetch.
     */
    where?: AnnouncementRecipientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnnouncementRecipients to fetch.
     */
    orderBy?: AnnouncementRecipientOrderByWithRelationInput | AnnouncementRecipientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnnouncementRecipients.
     */
    cursor?: AnnouncementRecipientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnnouncementRecipients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnnouncementRecipients.
     */
    skip?: number
    distinct?: AnnouncementRecipientScalarFieldEnum | AnnouncementRecipientScalarFieldEnum[]
  }

  /**
   * AnnouncementRecipient create
   */
  export type AnnouncementRecipientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * The data needed to create a AnnouncementRecipient.
     */
    data: XOR<AnnouncementRecipientCreateInput, AnnouncementRecipientUncheckedCreateInput>
  }

  /**
   * AnnouncementRecipient createMany
   */
  export type AnnouncementRecipientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnnouncementRecipients.
     */
    data: AnnouncementRecipientCreateManyInput | AnnouncementRecipientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnnouncementRecipient createManyAndReturn
   */
  export type AnnouncementRecipientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * The data used to create many AnnouncementRecipients.
     */
    data: AnnouncementRecipientCreateManyInput | AnnouncementRecipientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnnouncementRecipient update
   */
  export type AnnouncementRecipientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * The data needed to update a AnnouncementRecipient.
     */
    data: XOR<AnnouncementRecipientUpdateInput, AnnouncementRecipientUncheckedUpdateInput>
    /**
     * Choose, which AnnouncementRecipient to update.
     */
    where: AnnouncementRecipientWhereUniqueInput
  }

  /**
   * AnnouncementRecipient updateMany
   */
  export type AnnouncementRecipientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnnouncementRecipients.
     */
    data: XOR<AnnouncementRecipientUpdateManyMutationInput, AnnouncementRecipientUncheckedUpdateManyInput>
    /**
     * Filter which AnnouncementRecipients to update
     */
    where?: AnnouncementRecipientWhereInput
    /**
     * Limit how many AnnouncementRecipients to update.
     */
    limit?: number
  }

  /**
   * AnnouncementRecipient updateManyAndReturn
   */
  export type AnnouncementRecipientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * The data used to update AnnouncementRecipients.
     */
    data: XOR<AnnouncementRecipientUpdateManyMutationInput, AnnouncementRecipientUncheckedUpdateManyInput>
    /**
     * Filter which AnnouncementRecipients to update
     */
    where?: AnnouncementRecipientWhereInput
    /**
     * Limit how many AnnouncementRecipients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnnouncementRecipient upsert
   */
  export type AnnouncementRecipientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * The filter to search for the AnnouncementRecipient to update in case it exists.
     */
    where: AnnouncementRecipientWhereUniqueInput
    /**
     * In case the AnnouncementRecipient found by the `where` argument doesn't exist, create a new AnnouncementRecipient with this data.
     */
    create: XOR<AnnouncementRecipientCreateInput, AnnouncementRecipientUncheckedCreateInput>
    /**
     * In case the AnnouncementRecipient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementRecipientUpdateInput, AnnouncementRecipientUncheckedUpdateInput>
  }

  /**
   * AnnouncementRecipient delete
   */
  export type AnnouncementRecipientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
    /**
     * Filter which AnnouncementRecipient to delete.
     */
    where: AnnouncementRecipientWhereUniqueInput
  }

  /**
   * AnnouncementRecipient deleteMany
   */
  export type AnnouncementRecipientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnnouncementRecipients to delete
     */
    where?: AnnouncementRecipientWhereInput
    /**
     * Limit how many AnnouncementRecipients to delete.
     */
    limit?: number
  }

  /**
   * AnnouncementRecipient.user
   */
  export type AnnouncementRecipient$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AnnouncementRecipient.room
   */
  export type AnnouncementRecipient$roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
  }

  /**
   * AnnouncementRecipient without action
   */
  export type AnnouncementRecipientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnnouncementRecipient
     */
    select?: AnnouncementRecipientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnnouncementRecipient
     */
    omit?: AnnouncementRecipientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnnouncementRecipientInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    displayName: 'displayName',
    picture: 'picture',
    isVerified: 'isVerified',
    isTwoFactorEnabled: 'isTwoFactorEnabled',
    method: 'method',
    role: 'role',
    secondName: 'secondName',
    studentIdFront: 'studentIdFront',
    studentIdBack: 'studentIdBack',
    dormitoryId: 'dormitoryId',
    roomId: 'roomId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DormitoryAdminScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dormitoryId: 'dormitoryId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type DormitoryAdminScalarFieldEnum = (typeof DormitoryAdminScalarFieldEnum)[keyof typeof DormitoryAdminScalarFieldEnum]


  export const ConfirmationScalarFieldEnum: {
    id: 'id',
    type: 'type',
    status: 'status',
    createdAt: 'createdAt',
    resolvedAt: 'resolvedAt',
    userId: 'userId',
    photo: 'photo',
    frontIdUrl: 'frontIdUrl',
    backIdUrl: 'backIdUrl'
  };

  export type ConfirmationScalarFieldEnum = (typeof ConfirmationScalarFieldEnum)[keyof typeof ConfirmationScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    type: 'type',
    expiresIn: 'expiresIn'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const DormitoryScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    name: 'name',
    address: 'address',
    groundFloorPhoneNumber: 'groundFloorPhoneNumber',
    status: 'status',
    photos: 'photos',
    managerId: 'managerId'
  };

  export type DormitoryScalarFieldEnum = (typeof DormitoryScalarFieldEnum)[keyof typeof DormitoryScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    number: 'number',
    floor: 'floor',
    createdAt: 'createdAt',
    capacity: 'capacity',
    roomEquipment: 'roomEquipment',
    photos: 'photos',
    dormitoryId: 'dormitoryId'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const RoomStatusScalarFieldEnum: {
    id: 'id',
    dateOfStart: 'dateOfStart',
    dateOfEnd: 'dateOfEnd',
    description: 'description',
    roomId: 'roomId'
  };

  export type RoomStatusScalarFieldEnum = (typeof RoomStatusScalarFieldEnum)[keyof typeof RoomStatusScalarFieldEnum]


  export const PriceScalarFieldEnum: {
    id: 'id',
    roomCapacity: 'roomCapacity',
    pricePerMonth: 'pricePerMonth',
    pricePerDay: 'pricePerDay',
    dateFrom: 'dateFrom',
    dateTo: 'dateTo'
  };

  export type PriceScalarFieldEnum = (typeof PriceScalarFieldEnum)[keyof typeof PriceScalarFieldEnum]


  export const AnnouncementScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    postedAt: 'postedAt',
    expiresAt: 'expiresAt',
    isHidden: 'isHidden',
    authorId: 'authorId'
  };

  export type AnnouncementScalarFieldEnum = (typeof AnnouncementScalarFieldEnum)[keyof typeof AnnouncementScalarFieldEnum]


  export const AttachmentScalarFieldEnum: {
    id: 'id',
    url: 'url',
    filename: 'filename',
    announcementId: 'announcementId'
  };

  export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum]


  export const AnnouncementRecipientScalarFieldEnum: {
    id: 'id',
    announcementId: 'announcementId',
    userId: 'userId',
    roomId: 'roomId',
    floor: 'floor',
    forEveryone: 'forEveryone'
  };

  export type AnnouncementRecipientScalarFieldEnum = (typeof AnnouncementRecipientScalarFieldEnum)[keyof typeof AnnouncementRecipientScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'AuthMethod'
   */
  export type EnumAuthMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthMethod'>
    


  /**
   * Reference to a field of type 'AuthMethod[]'
   */
  export type ListEnumAuthMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthMethod[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ConfirmationType'
   */
  export type EnumConfirmationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfirmationType'>
    


  /**
   * Reference to a field of type 'ConfirmationType[]'
   */
  export type ListEnumConfirmationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfirmationType[]'>
    


  /**
   * Reference to a field of type 'ConfirmationStatus'
   */
  export type EnumConfirmationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfirmationStatus'>
    


  /**
   * Reference to a field of type 'ConfirmationStatus[]'
   */
  export type ListEnumConfirmationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfirmationStatus[]'>
    


  /**
   * Reference to a field of type 'TokenType'
   */
  export type EnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType'>
    


  /**
   * Reference to a field of type 'TokenType[]'
   */
  export type ListEnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    displayName?: StringFilter<"User"> | string
    picture?: StringFilter<"User"> | string
    isVerified?: BoolFilter<"User"> | boolean
    isTwoFactorEnabled?: BoolFilter<"User"> | boolean
    method?: EnumAuthMethodFilter<"User"> | $Enums.AuthMethod
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    secondName?: StringFilter<"User"> | string
    studentIdFront?: StringFilter<"User"> | string
    studentIdBack?: StringNullableFilter<"User"> | string | null
    dormitoryId?: StringNullableFilter<"User"> | string | null
    roomId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    confirmations?: ConfirmationListRelationFilter
    dormitoryAdminAssignments?: DormitoryAdminListRelationFilter
    dormitory?: XOR<DormitoryNullableScalarRelationFilter, DormitoryWhereInput> | null
    managedDormitories?: DormitoryListRelationFilter
    room?: XOR<RoomNullableScalarRelationFilter, RoomWhereInput> | null
    announcements?: AnnouncementListRelationFilter
    announcementRecipients?: AnnouncementRecipientListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    picture?: SortOrder
    isVerified?: SortOrder
    isTwoFactorEnabled?: SortOrder
    method?: SortOrder
    role?: SortOrder
    secondName?: SortOrder
    studentIdFront?: SortOrder
    studentIdBack?: SortOrderInput | SortOrder
    dormitoryId?: SortOrderInput | SortOrder
    roomId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    confirmations?: ConfirmationOrderByRelationAggregateInput
    dormitoryAdminAssignments?: DormitoryAdminOrderByRelationAggregateInput
    dormitory?: DormitoryOrderByWithRelationInput
    managedDormitories?: DormitoryOrderByRelationAggregateInput
    room?: RoomOrderByWithRelationInput
    announcements?: AnnouncementOrderByRelationAggregateInput
    announcementRecipients?: AnnouncementRecipientOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    displayName?: StringFilter<"User"> | string
    picture?: StringFilter<"User"> | string
    isVerified?: BoolFilter<"User"> | boolean
    isTwoFactorEnabled?: BoolFilter<"User"> | boolean
    method?: EnumAuthMethodFilter<"User"> | $Enums.AuthMethod
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    secondName?: StringFilter<"User"> | string
    studentIdFront?: StringFilter<"User"> | string
    studentIdBack?: StringNullableFilter<"User"> | string | null
    dormitoryId?: StringNullableFilter<"User"> | string | null
    roomId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    confirmations?: ConfirmationListRelationFilter
    dormitoryAdminAssignments?: DormitoryAdminListRelationFilter
    dormitory?: XOR<DormitoryNullableScalarRelationFilter, DormitoryWhereInput> | null
    managedDormitories?: DormitoryListRelationFilter
    room?: XOR<RoomNullableScalarRelationFilter, RoomWhereInput> | null
    announcements?: AnnouncementListRelationFilter
    announcementRecipients?: AnnouncementRecipientListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    picture?: SortOrder
    isVerified?: SortOrder
    isTwoFactorEnabled?: SortOrder
    method?: SortOrder
    role?: SortOrder
    secondName?: SortOrder
    studentIdFront?: SortOrder
    studentIdBack?: SortOrderInput | SortOrder
    dormitoryId?: SortOrderInput | SortOrder
    roomId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    displayName?: StringWithAggregatesFilter<"User"> | string
    picture?: StringWithAggregatesFilter<"User"> | string
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isTwoFactorEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    method?: EnumAuthMethodWithAggregatesFilter<"User"> | $Enums.AuthMethod
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    secondName?: StringWithAggregatesFilter<"User"> | string
    studentIdFront?: StringWithAggregatesFilter<"User"> | string
    studentIdBack?: StringNullableWithAggregatesFilter<"User"> | string | null
    dormitoryId?: StringNullableWithAggregatesFilter<"User"> | string | null
    roomId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DormitoryAdminWhereInput = {
    AND?: DormitoryAdminWhereInput | DormitoryAdminWhereInput[]
    OR?: DormitoryAdminWhereInput[]
    NOT?: DormitoryAdminWhereInput | DormitoryAdminWhereInput[]
    id?: StringFilter<"DormitoryAdmin"> | string
    userId?: StringFilter<"DormitoryAdmin"> | string
    dormitoryId?: StringFilter<"DormitoryAdmin"> | string
    role?: StringFilter<"DormitoryAdmin"> | string
    createdAt?: DateTimeFilter<"DormitoryAdmin"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dormitory?: XOR<DormitoryScalarRelationFilter, DormitoryWhereInput>
  }

  export type DormitoryAdminOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dormitoryId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    dormitory?: DormitoryOrderByWithRelationInput
  }

  export type DormitoryAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_dormitoryId?: DormitoryAdminUserIdDormitoryIdCompoundUniqueInput
    AND?: DormitoryAdminWhereInput | DormitoryAdminWhereInput[]
    OR?: DormitoryAdminWhereInput[]
    NOT?: DormitoryAdminWhereInput | DormitoryAdminWhereInput[]
    userId?: StringFilter<"DormitoryAdmin"> | string
    dormitoryId?: StringFilter<"DormitoryAdmin"> | string
    role?: StringFilter<"DormitoryAdmin"> | string
    createdAt?: DateTimeFilter<"DormitoryAdmin"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dormitory?: XOR<DormitoryScalarRelationFilter, DormitoryWhereInput>
  }, "id" | "userId_dormitoryId">

  export type DormitoryAdminOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dormitoryId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: DormitoryAdminCountOrderByAggregateInput
    _max?: DormitoryAdminMaxOrderByAggregateInput
    _min?: DormitoryAdminMinOrderByAggregateInput
  }

  export type DormitoryAdminScalarWhereWithAggregatesInput = {
    AND?: DormitoryAdminScalarWhereWithAggregatesInput | DormitoryAdminScalarWhereWithAggregatesInput[]
    OR?: DormitoryAdminScalarWhereWithAggregatesInput[]
    NOT?: DormitoryAdminScalarWhereWithAggregatesInput | DormitoryAdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DormitoryAdmin"> | string
    userId?: StringWithAggregatesFilter<"DormitoryAdmin"> | string
    dormitoryId?: StringWithAggregatesFilter<"DormitoryAdmin"> | string
    role?: StringWithAggregatesFilter<"DormitoryAdmin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DormitoryAdmin"> | Date | string
  }

  export type ConfirmationWhereInput = {
    AND?: ConfirmationWhereInput | ConfirmationWhereInput[]
    OR?: ConfirmationWhereInput[]
    NOT?: ConfirmationWhereInput | ConfirmationWhereInput[]
    id?: StringFilter<"Confirmation"> | string
    type?: EnumConfirmationTypeFilter<"Confirmation"> | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFilter<"Confirmation"> | $Enums.ConfirmationStatus
    createdAt?: DateTimeFilter<"Confirmation"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Confirmation"> | Date | string | null
    userId?: StringFilter<"Confirmation"> | string
    photo?: StringNullableFilter<"Confirmation"> | string | null
    frontIdUrl?: StringNullableFilter<"Confirmation"> | string | null
    backIdUrl?: StringNullableFilter<"Confirmation"> | string | null
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ConfirmationOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    photo?: SortOrderInput | SortOrder
    frontIdUrl?: SortOrderInput | SortOrder
    backIdUrl?: SortOrderInput | SortOrder
    requester?: UserOrderByWithRelationInput
  }

  export type ConfirmationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConfirmationWhereInput | ConfirmationWhereInput[]
    OR?: ConfirmationWhereInput[]
    NOT?: ConfirmationWhereInput | ConfirmationWhereInput[]
    type?: EnumConfirmationTypeFilter<"Confirmation"> | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFilter<"Confirmation"> | $Enums.ConfirmationStatus
    createdAt?: DateTimeFilter<"Confirmation"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Confirmation"> | Date | string | null
    userId?: StringFilter<"Confirmation"> | string
    photo?: StringNullableFilter<"Confirmation"> | string | null
    frontIdUrl?: StringNullableFilter<"Confirmation"> | string | null
    backIdUrl?: StringNullableFilter<"Confirmation"> | string | null
    requester?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ConfirmationOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    photo?: SortOrderInput | SortOrder
    frontIdUrl?: SortOrderInput | SortOrder
    backIdUrl?: SortOrderInput | SortOrder
    _count?: ConfirmationCountOrderByAggregateInput
    _max?: ConfirmationMaxOrderByAggregateInput
    _min?: ConfirmationMinOrderByAggregateInput
  }

  export type ConfirmationScalarWhereWithAggregatesInput = {
    AND?: ConfirmationScalarWhereWithAggregatesInput | ConfirmationScalarWhereWithAggregatesInput[]
    OR?: ConfirmationScalarWhereWithAggregatesInput[]
    NOT?: ConfirmationScalarWhereWithAggregatesInput | ConfirmationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Confirmation"> | string
    type?: EnumConfirmationTypeWithAggregatesFilter<"Confirmation"> | $Enums.ConfirmationType
    status?: EnumConfirmationStatusWithAggregatesFilter<"Confirmation"> | $Enums.ConfirmationStatus
    createdAt?: DateTimeWithAggregatesFilter<"Confirmation"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Confirmation"> | Date | string | null
    userId?: StringWithAggregatesFilter<"Confirmation"> | string
    photo?: StringNullableWithAggregatesFilter<"Confirmation"> | string | null
    frontIdUrl?: StringNullableWithAggregatesFilter<"Confirmation"> | string | null
    backIdUrl?: StringNullableWithAggregatesFilter<"Confirmation"> | string | null
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: StringFilter<"Token"> | string
    email?: StringFilter<"Token"> | string
    token?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expiresIn?: DateTimeFilter<"Token"> | Date | string
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    email?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expiresIn?: DateTimeFilter<"Token"> | Date | string
  }, "id" | "token">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Token"> | string
    email?: StringWithAggregatesFilter<"Token"> | string
    token?: StringWithAggregatesFilter<"Token"> | string
    type?: EnumTokenTypeWithAggregatesFilter<"Token"> | $Enums.TokenType
    expiresIn?: DateTimeWithAggregatesFilter<"Token"> | Date | string
  }

  export type DormitoryWhereInput = {
    AND?: DormitoryWhereInput | DormitoryWhereInput[]
    OR?: DormitoryWhereInput[]
    NOT?: DormitoryWhereInput | DormitoryWhereInput[]
    id?: StringFilter<"Dormitory"> | string
    createdAt?: DateTimeFilter<"Dormitory"> | Date | string
    name?: StringFilter<"Dormitory"> | string
    address?: StringFilter<"Dormitory"> | string
    groundFloorPhoneNumber?: StringFilter<"Dormitory"> | string
    status?: StringFilter<"Dormitory"> | string
    photos?: StringNullableListFilter<"Dormitory">
    managerId?: StringNullableFilter<"Dormitory"> | string | null
    manager?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    admins?: DormitoryAdminListRelationFilter
    residents?: UserListRelationFilter
    rooms?: RoomListRelationFilter
  }

  export type DormitoryOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    groundFloorPhoneNumber?: SortOrder
    status?: SortOrder
    photos?: SortOrder
    managerId?: SortOrderInput | SortOrder
    manager?: UserOrderByWithRelationInput
    admins?: DormitoryAdminOrderByRelationAggregateInput
    residents?: UserOrderByRelationAggregateInput
    rooms?: RoomOrderByRelationAggregateInput
  }

  export type DormitoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DormitoryWhereInput | DormitoryWhereInput[]
    OR?: DormitoryWhereInput[]
    NOT?: DormitoryWhereInput | DormitoryWhereInput[]
    createdAt?: DateTimeFilter<"Dormitory"> | Date | string
    name?: StringFilter<"Dormitory"> | string
    address?: StringFilter<"Dormitory"> | string
    groundFloorPhoneNumber?: StringFilter<"Dormitory"> | string
    status?: StringFilter<"Dormitory"> | string
    photos?: StringNullableListFilter<"Dormitory">
    managerId?: StringNullableFilter<"Dormitory"> | string | null
    manager?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    admins?: DormitoryAdminListRelationFilter
    residents?: UserListRelationFilter
    rooms?: RoomListRelationFilter
  }, "id">

  export type DormitoryOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    groundFloorPhoneNumber?: SortOrder
    status?: SortOrder
    photos?: SortOrder
    managerId?: SortOrderInput | SortOrder
    _count?: DormitoryCountOrderByAggregateInput
    _max?: DormitoryMaxOrderByAggregateInput
    _min?: DormitoryMinOrderByAggregateInput
  }

  export type DormitoryScalarWhereWithAggregatesInput = {
    AND?: DormitoryScalarWhereWithAggregatesInput | DormitoryScalarWhereWithAggregatesInput[]
    OR?: DormitoryScalarWhereWithAggregatesInput[]
    NOT?: DormitoryScalarWhereWithAggregatesInput | DormitoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dormitory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Dormitory"> | Date | string
    name?: StringWithAggregatesFilter<"Dormitory"> | string
    address?: StringWithAggregatesFilter<"Dormitory"> | string
    groundFloorPhoneNumber?: StringWithAggregatesFilter<"Dormitory"> | string
    status?: StringWithAggregatesFilter<"Dormitory"> | string
    photos?: StringNullableListFilter<"Dormitory">
    managerId?: StringNullableWithAggregatesFilter<"Dormitory"> | string | null
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    number?: StringFilter<"Room"> | string
    floor?: IntFilter<"Room"> | number
    createdAt?: DateTimeFilter<"Room"> | Date | string
    capacity?: IntFilter<"Room"> | number
    roomEquipment?: StringNullableListFilter<"Room">
    photos?: StringNullableListFilter<"Room">
    dormitoryId?: StringFilter<"Room"> | string
    statuses?: RoomStatusListRelationFilter
    residents?: UserListRelationFilter
    announcementRecipients?: AnnouncementRecipientListRelationFilter
    dormitroy?: XOR<DormitoryScalarRelationFilter, DormitoryWhereInput>
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    floor?: SortOrder
    createdAt?: SortOrder
    capacity?: SortOrder
    roomEquipment?: SortOrder
    photos?: SortOrder
    dormitoryId?: SortOrder
    statuses?: RoomStatusOrderByRelationAggregateInput
    residents?: UserOrderByRelationAggregateInput
    announcementRecipients?: AnnouncementRecipientOrderByRelationAggregateInput
    dormitroy?: DormitoryOrderByWithRelationInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    number?: StringFilter<"Room"> | string
    floor?: IntFilter<"Room"> | number
    createdAt?: DateTimeFilter<"Room"> | Date | string
    capacity?: IntFilter<"Room"> | number
    roomEquipment?: StringNullableListFilter<"Room">
    photos?: StringNullableListFilter<"Room">
    dormitoryId?: StringFilter<"Room"> | string
    statuses?: RoomStatusListRelationFilter
    residents?: UserListRelationFilter
    announcementRecipients?: AnnouncementRecipientListRelationFilter
    dormitroy?: XOR<DormitoryScalarRelationFilter, DormitoryWhereInput>
  }, "id">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    floor?: SortOrder
    createdAt?: SortOrder
    capacity?: SortOrder
    roomEquipment?: SortOrder
    photos?: SortOrder
    dormitoryId?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    number?: StringWithAggregatesFilter<"Room"> | string
    floor?: IntWithAggregatesFilter<"Room"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    capacity?: IntWithAggregatesFilter<"Room"> | number
    roomEquipment?: StringNullableListFilter<"Room">
    photos?: StringNullableListFilter<"Room">
    dormitoryId?: StringWithAggregatesFilter<"Room"> | string
  }

  export type RoomStatusWhereInput = {
    AND?: RoomStatusWhereInput | RoomStatusWhereInput[]
    OR?: RoomStatusWhereInput[]
    NOT?: RoomStatusWhereInput | RoomStatusWhereInput[]
    id?: StringFilter<"RoomStatus"> | string
    dateOfStart?: DateTimeFilter<"RoomStatus"> | Date | string
    dateOfEnd?: DateTimeNullableFilter<"RoomStatus"> | Date | string | null
    description?: StringFilter<"RoomStatus"> | string
    roomId?: StringFilter<"RoomStatus"> | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }

  export type RoomStatusOrderByWithRelationInput = {
    id?: SortOrder
    dateOfStart?: SortOrder
    dateOfEnd?: SortOrderInput | SortOrder
    description?: SortOrder
    roomId?: SortOrder
    room?: RoomOrderByWithRelationInput
  }

  export type RoomStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomStatusWhereInput | RoomStatusWhereInput[]
    OR?: RoomStatusWhereInput[]
    NOT?: RoomStatusWhereInput | RoomStatusWhereInput[]
    dateOfStart?: DateTimeFilter<"RoomStatus"> | Date | string
    dateOfEnd?: DateTimeNullableFilter<"RoomStatus"> | Date | string | null
    description?: StringFilter<"RoomStatus"> | string
    roomId?: StringFilter<"RoomStatus"> | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }, "id">

  export type RoomStatusOrderByWithAggregationInput = {
    id?: SortOrder
    dateOfStart?: SortOrder
    dateOfEnd?: SortOrderInput | SortOrder
    description?: SortOrder
    roomId?: SortOrder
    _count?: RoomStatusCountOrderByAggregateInput
    _max?: RoomStatusMaxOrderByAggregateInput
    _min?: RoomStatusMinOrderByAggregateInput
  }

  export type RoomStatusScalarWhereWithAggregatesInput = {
    AND?: RoomStatusScalarWhereWithAggregatesInput | RoomStatusScalarWhereWithAggregatesInput[]
    OR?: RoomStatusScalarWhereWithAggregatesInput[]
    NOT?: RoomStatusScalarWhereWithAggregatesInput | RoomStatusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomStatus"> | string
    dateOfStart?: DateTimeWithAggregatesFilter<"RoomStatus"> | Date | string
    dateOfEnd?: DateTimeNullableWithAggregatesFilter<"RoomStatus"> | Date | string | null
    description?: StringWithAggregatesFilter<"RoomStatus"> | string
    roomId?: StringWithAggregatesFilter<"RoomStatus"> | string
  }

  export type PriceWhereInput = {
    AND?: PriceWhereInput | PriceWhereInput[]
    OR?: PriceWhereInput[]
    NOT?: PriceWhereInput | PriceWhereInput[]
    id?: StringFilter<"Price"> | string
    roomCapacity?: IntFilter<"Price"> | number
    pricePerMonth?: FloatFilter<"Price"> | number
    pricePerDay?: FloatFilter<"Price"> | number
    dateFrom?: DateTimeFilter<"Price"> | Date | string
    dateTo?: DateTimeNullableFilter<"Price"> | Date | string | null
  }

  export type PriceOrderByWithRelationInput = {
    id?: SortOrder
    roomCapacity?: SortOrder
    pricePerMonth?: SortOrder
    pricePerDay?: SortOrder
    dateFrom?: SortOrder
    dateTo?: SortOrderInput | SortOrder
  }

  export type PriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PriceWhereInput | PriceWhereInput[]
    OR?: PriceWhereInput[]
    NOT?: PriceWhereInput | PriceWhereInput[]
    roomCapacity?: IntFilter<"Price"> | number
    pricePerMonth?: FloatFilter<"Price"> | number
    pricePerDay?: FloatFilter<"Price"> | number
    dateFrom?: DateTimeFilter<"Price"> | Date | string
    dateTo?: DateTimeNullableFilter<"Price"> | Date | string | null
  }, "id">

  export type PriceOrderByWithAggregationInput = {
    id?: SortOrder
    roomCapacity?: SortOrder
    pricePerMonth?: SortOrder
    pricePerDay?: SortOrder
    dateFrom?: SortOrder
    dateTo?: SortOrderInput | SortOrder
    _count?: PriceCountOrderByAggregateInput
    _avg?: PriceAvgOrderByAggregateInput
    _max?: PriceMaxOrderByAggregateInput
    _min?: PriceMinOrderByAggregateInput
    _sum?: PriceSumOrderByAggregateInput
  }

  export type PriceScalarWhereWithAggregatesInput = {
    AND?: PriceScalarWhereWithAggregatesInput | PriceScalarWhereWithAggregatesInput[]
    OR?: PriceScalarWhereWithAggregatesInput[]
    NOT?: PriceScalarWhereWithAggregatesInput | PriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Price"> | string
    roomCapacity?: IntWithAggregatesFilter<"Price"> | number
    pricePerMonth?: FloatWithAggregatesFilter<"Price"> | number
    pricePerDay?: FloatWithAggregatesFilter<"Price"> | number
    dateFrom?: DateTimeWithAggregatesFilter<"Price"> | Date | string
    dateTo?: DateTimeNullableWithAggregatesFilter<"Price"> | Date | string | null
  }

  export type AnnouncementWhereInput = {
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    id?: StringFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    postedAt?: DateTimeFilter<"Announcement"> | Date | string
    expiresAt?: DateTimeFilter<"Announcement"> | Date | string
    isHidden?: BoolFilter<"Announcement"> | boolean
    authorId?: StringFilter<"Announcement"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    attachments?: AttachmentListRelationFilter
    recipients?: AnnouncementRecipientListRelationFilter
  }

  export type AnnouncementOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    postedAt?: SortOrder
    expiresAt?: SortOrder
    isHidden?: SortOrder
    authorId?: SortOrder
    author?: UserOrderByWithRelationInput
    attachments?: AttachmentOrderByRelationAggregateInput
    recipients?: AnnouncementRecipientOrderByRelationAggregateInput
  }

  export type AnnouncementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    postedAt?: DateTimeFilter<"Announcement"> | Date | string
    expiresAt?: DateTimeFilter<"Announcement"> | Date | string
    isHidden?: BoolFilter<"Announcement"> | boolean
    authorId?: StringFilter<"Announcement"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    attachments?: AttachmentListRelationFilter
    recipients?: AnnouncementRecipientListRelationFilter
  }, "id">

  export type AnnouncementOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    postedAt?: SortOrder
    expiresAt?: SortOrder
    isHidden?: SortOrder
    authorId?: SortOrder
    _count?: AnnouncementCountOrderByAggregateInput
    _max?: AnnouncementMaxOrderByAggregateInput
    _min?: AnnouncementMinOrderByAggregateInput
  }

  export type AnnouncementScalarWhereWithAggregatesInput = {
    AND?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    OR?: AnnouncementScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Announcement"> | string
    title?: StringWithAggregatesFilter<"Announcement"> | string
    content?: StringWithAggregatesFilter<"Announcement"> | string
    postedAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
    isHidden?: BoolWithAggregatesFilter<"Announcement"> | boolean
    authorId?: StringWithAggregatesFilter<"Announcement"> | string
  }

  export type AttachmentWhereInput = {
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    id?: StringFilter<"Attachment"> | string
    url?: StringFilter<"Attachment"> | string
    filename?: StringFilter<"Attachment"> | string
    announcementId?: StringFilter<"Attachment"> | string
    announcement?: XOR<AnnouncementScalarRelationFilter, AnnouncementWhereInput>
  }

  export type AttachmentOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    announcementId?: SortOrder
    announcement?: AnnouncementOrderByWithRelationInput
  }

  export type AttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    url?: StringFilter<"Attachment"> | string
    filename?: StringFilter<"Attachment"> | string
    announcementId?: StringFilter<"Attachment"> | string
    announcement?: XOR<AnnouncementScalarRelationFilter, AnnouncementWhereInput>
  }, "id">

  export type AttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    announcementId?: SortOrder
    _count?: AttachmentCountOrderByAggregateInput
    _max?: AttachmentMaxOrderByAggregateInput
    _min?: AttachmentMinOrderByAggregateInput
  }

  export type AttachmentScalarWhereWithAggregatesInput = {
    AND?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    OR?: AttachmentScalarWhereWithAggregatesInput[]
    NOT?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attachment"> | string
    url?: StringWithAggregatesFilter<"Attachment"> | string
    filename?: StringWithAggregatesFilter<"Attachment"> | string
    announcementId?: StringWithAggregatesFilter<"Attachment"> | string
  }

  export type AnnouncementRecipientWhereInput = {
    AND?: AnnouncementRecipientWhereInput | AnnouncementRecipientWhereInput[]
    OR?: AnnouncementRecipientWhereInput[]
    NOT?: AnnouncementRecipientWhereInput | AnnouncementRecipientWhereInput[]
    id?: StringFilter<"AnnouncementRecipient"> | string
    announcementId?: StringFilter<"AnnouncementRecipient"> | string
    userId?: StringNullableFilter<"AnnouncementRecipient"> | string | null
    roomId?: StringNullableFilter<"AnnouncementRecipient"> | string | null
    floor?: IntNullableFilter<"AnnouncementRecipient"> | number | null
    forEveryone?: BoolFilter<"AnnouncementRecipient"> | boolean
    announcement?: XOR<AnnouncementScalarRelationFilter, AnnouncementWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    room?: XOR<RoomNullableScalarRelationFilter, RoomWhereInput> | null
  }

  export type AnnouncementRecipientOrderByWithRelationInput = {
    id?: SortOrder
    announcementId?: SortOrder
    userId?: SortOrderInput | SortOrder
    roomId?: SortOrderInput | SortOrder
    floor?: SortOrderInput | SortOrder
    forEveryone?: SortOrder
    announcement?: AnnouncementOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    room?: RoomOrderByWithRelationInput
  }

  export type AnnouncementRecipientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnnouncementRecipientWhereInput | AnnouncementRecipientWhereInput[]
    OR?: AnnouncementRecipientWhereInput[]
    NOT?: AnnouncementRecipientWhereInput | AnnouncementRecipientWhereInput[]
    announcementId?: StringFilter<"AnnouncementRecipient"> | string
    userId?: StringNullableFilter<"AnnouncementRecipient"> | string | null
    roomId?: StringNullableFilter<"AnnouncementRecipient"> | string | null
    floor?: IntNullableFilter<"AnnouncementRecipient"> | number | null
    forEveryone?: BoolFilter<"AnnouncementRecipient"> | boolean
    announcement?: XOR<AnnouncementScalarRelationFilter, AnnouncementWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    room?: XOR<RoomNullableScalarRelationFilter, RoomWhereInput> | null
  }, "id">

  export type AnnouncementRecipientOrderByWithAggregationInput = {
    id?: SortOrder
    announcementId?: SortOrder
    userId?: SortOrderInput | SortOrder
    roomId?: SortOrderInput | SortOrder
    floor?: SortOrderInput | SortOrder
    forEveryone?: SortOrder
    _count?: AnnouncementRecipientCountOrderByAggregateInput
    _avg?: AnnouncementRecipientAvgOrderByAggregateInput
    _max?: AnnouncementRecipientMaxOrderByAggregateInput
    _min?: AnnouncementRecipientMinOrderByAggregateInput
    _sum?: AnnouncementRecipientSumOrderByAggregateInput
  }

  export type AnnouncementRecipientScalarWhereWithAggregatesInput = {
    AND?: AnnouncementRecipientScalarWhereWithAggregatesInput | AnnouncementRecipientScalarWhereWithAggregatesInput[]
    OR?: AnnouncementRecipientScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementRecipientScalarWhereWithAggregatesInput | AnnouncementRecipientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnnouncementRecipient"> | string
    announcementId?: StringWithAggregatesFilter<"AnnouncementRecipient"> | string
    userId?: StringNullableWithAggregatesFilter<"AnnouncementRecipient"> | string | null
    roomId?: StringNullableWithAggregatesFilter<"AnnouncementRecipient"> | string | null
    floor?: IntNullableWithAggregatesFilter<"AnnouncementRecipient"> | number | null
    forEveryone?: BoolWithAggregatesFilter<"AnnouncementRecipient"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminCreateNestedManyWithoutUserInput
    dormitory?: DormitoryCreateNestedOneWithoutResidentsInput
    managedDormitories?: DormitoryCreateNestedManyWithoutManagerInput
    room?: RoomCreateNestedOneWithoutResidentsInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationUncheckedCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedCreateNestedManyWithoutUserInput
    managedDormitories?: DormitoryUncheckedCreateNestedManyWithoutManagerInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUpdateManyWithoutUserNestedInput
    dormitory?: DormitoryUpdateOneWithoutResidentsNestedInput
    managedDormitories?: DormitoryUpdateManyWithoutManagerNestedInput
    room?: RoomUpdateOneWithoutResidentsNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUncheckedUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedUpdateManyWithoutUserNestedInput
    managedDormitories?: DormitoryUncheckedUpdateManyWithoutManagerNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DormitoryAdminCreateInput = {
    id?: string
    role: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutDormitoryAdminAssignmentsInput
    dormitory: DormitoryCreateNestedOneWithoutAdminsInput
  }

  export type DormitoryAdminUncheckedCreateInput = {
    id?: string
    userId: string
    dormitoryId: string
    role: string
    createdAt?: Date | string
  }

  export type DormitoryAdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDormitoryAdminAssignmentsNestedInput
    dormitory?: DormitoryUpdateOneRequiredWithoutAdminsNestedInput
  }

  export type DormitoryAdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dormitoryId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DormitoryAdminCreateManyInput = {
    id?: string
    userId: string
    dormitoryId: string
    role: string
    createdAt?: Date | string
  }

  export type DormitoryAdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DormitoryAdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dormitoryId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfirmationCreateInput = {
    id?: string
    type: $Enums.ConfirmationType
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    photo?: string | null
    frontIdUrl?: string | null
    backIdUrl?: string | null
    requester: UserCreateNestedOneWithoutConfirmationsInput
  }

  export type ConfirmationUncheckedCreateInput = {
    id?: string
    type: $Enums.ConfirmationType
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    userId: string
    photo?: string | null
    frontIdUrl?: string | null
    backIdUrl?: string | null
  }

  export type ConfirmationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConfirmationTypeFieldUpdateOperationsInput | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    frontIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
    backIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
    requester?: UserUpdateOneRequiredWithoutConfirmationsNestedInput
  }

  export type ConfirmationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConfirmationTypeFieldUpdateOperationsInput | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    frontIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
    backIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConfirmationCreateManyInput = {
    id?: string
    type: $Enums.ConfirmationType
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    userId: string
    photo?: string | null
    frontIdUrl?: string | null
    backIdUrl?: string | null
  }

  export type ConfirmationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConfirmationTypeFieldUpdateOperationsInput | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    frontIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
    backIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConfirmationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConfirmationTypeFieldUpdateOperationsInput | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    frontIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
    backIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenCreateInput = {
    id?: string
    email: string
    token: string
    type: $Enums.TokenType
    expiresIn: Date | string
  }

  export type TokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    type: $Enums.TokenType
    expiresIn: Date | string
  }

  export type TokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiresIn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiresIn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateManyInput = {
    id?: string
    email: string
    token: string
    type: $Enums.TokenType
    expiresIn: Date | string
  }

  export type TokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiresIn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiresIn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DormitoryCreateInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    manager?: UserCreateNestedOneWithoutManagedDormitoriesInput
    admins?: DormitoryAdminCreateNestedManyWithoutDormitoryInput
    residents?: UserCreateNestedManyWithoutDormitoryInput
    rooms?: RoomCreateNestedManyWithoutDormitroyInput
  }

  export type DormitoryUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    managerId?: string | null
    admins?: DormitoryAdminUncheckedCreateNestedManyWithoutDormitoryInput
    residents?: UserUncheckedCreateNestedManyWithoutDormitoryInput
    rooms?: RoomUncheckedCreateNestedManyWithoutDormitroyInput
  }

  export type DormitoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    manager?: UserUpdateOneWithoutManagedDormitoriesNestedInput
    admins?: DormitoryAdminUpdateManyWithoutDormitoryNestedInput
    residents?: UserUpdateManyWithoutDormitoryNestedInput
    rooms?: RoomUpdateManyWithoutDormitroyNestedInput
  }

  export type DormitoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: DormitoryAdminUncheckedUpdateManyWithoutDormitoryNestedInput
    residents?: UserUncheckedUpdateManyWithoutDormitoryNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutDormitroyNestedInput
  }

  export type DormitoryCreateManyInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    managerId?: string | null
  }

  export type DormitoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
  }

  export type DormitoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoomCreateInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    statuses?: RoomStatusCreateNestedManyWithoutRoomInput
    residents?: UserCreateNestedManyWithoutRoomInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutRoomInput
    dormitroy: DormitoryCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    dormitoryId: string
    statuses?: RoomStatusUncheckedCreateNestedManyWithoutRoomInput
    residents?: UserUncheckedCreateNestedManyWithoutRoomInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    statuses?: RoomStatusUpdateManyWithoutRoomNestedInput
    residents?: UserUpdateManyWithoutRoomNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutRoomNestedInput
    dormitroy?: DormitoryUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    dormitoryId?: StringFieldUpdateOperationsInput | string
    statuses?: RoomStatusUncheckedUpdateManyWithoutRoomNestedInput
    residents?: UserUncheckedUpdateManyWithoutRoomNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    dormitoryId: string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    dormitoryId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomStatusCreateInput = {
    id?: string
    dateOfStart: Date | string
    dateOfEnd?: Date | string | null
    description: string
    room: RoomCreateNestedOneWithoutStatusesInput
  }

  export type RoomStatusUncheckedCreateInput = {
    id?: string
    dateOfStart: Date | string
    dateOfEnd?: Date | string | null
    description: string
    roomId: string
  }

  export type RoomStatusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: StringFieldUpdateOperationsInput | string
    room?: RoomUpdateOneRequiredWithoutStatusesNestedInput
  }

  export type RoomStatusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
  }

  export type RoomStatusCreateManyInput = {
    id?: string
    dateOfStart: Date | string
    dateOfEnd?: Date | string | null
    description: string
    roomId: string
  }

  export type RoomStatusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: StringFieldUpdateOperationsInput | string
  }

  export type RoomStatusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
  }

  export type PriceCreateInput = {
    id?: string
    roomCapacity: number
    pricePerMonth: number
    pricePerDay: number
    dateFrom: Date | string
    dateTo?: Date | string | null
  }

  export type PriceUncheckedCreateInput = {
    id?: string
    roomCapacity: number
    pricePerMonth: number
    pricePerDay: number
    dateFrom: Date | string
    dateTo?: Date | string | null
  }

  export type PriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCapacity?: IntFieldUpdateOperationsInput | number
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    dateFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    dateTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCapacity?: IntFieldUpdateOperationsInput | number
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    dateFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    dateTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PriceCreateManyInput = {
    id?: string
    roomCapacity: number
    pricePerMonth: number
    pricePerDay: number
    dateFrom: Date | string
    dateTo?: Date | string | null
  }

  export type PriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCapacity?: IntFieldUpdateOperationsInput | number
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    dateFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    dateTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomCapacity?: IntFieldUpdateOperationsInput | number
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    pricePerDay?: FloatFieldUpdateOperationsInput | number
    dateFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    dateTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnnouncementCreateInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    author: UserCreateNestedOneWithoutAnnouncementsInput
    attachments?: AttachmentCreateNestedManyWithoutAnnouncementInput
    recipients?: AnnouncementRecipientCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    authorId: string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutAnnouncementInput
    recipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutAnnouncementsNestedInput
    attachments?: AttachmentUpdateManyWithoutAnnouncementNestedInput
    recipients?: AnnouncementRecipientUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    attachments?: AttachmentUncheckedUpdateManyWithoutAnnouncementNestedInput
    recipients?: AnnouncementRecipientUncheckedUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementCreateManyInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    authorId: string
  }

  export type AnnouncementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentCreateInput = {
    id?: string
    url: string
    filename: string
    announcement: AnnouncementCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateInput = {
    id?: string
    url: string
    filename: string
    announcementId: string
  }

  export type AttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    announcement?: AnnouncementUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    announcementId?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentCreateManyInput = {
    id?: string
    url: string
    filename: string
    announcementId: string
  }

  export type AttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    announcementId?: StringFieldUpdateOperationsInput | string
  }

  export type AnnouncementRecipientCreateInput = {
    id?: string
    floor?: number | null
    forEveryone?: boolean
    announcement: AnnouncementCreateNestedOneWithoutRecipientsInput
    user?: UserCreateNestedOneWithoutAnnouncementRecipientsInput
    room?: RoomCreateNestedOneWithoutAnnouncementRecipientsInput
  }

  export type AnnouncementRecipientUncheckedCreateInput = {
    id?: string
    announcementId: string
    userId?: string | null
    roomId?: string | null
    floor?: number | null
    forEveryone?: boolean
  }

  export type AnnouncementRecipientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
    announcement?: AnnouncementUpdateOneRequiredWithoutRecipientsNestedInput
    user?: UserUpdateOneWithoutAnnouncementRecipientsNestedInput
    room?: RoomUpdateOneWithoutAnnouncementRecipientsNestedInput
  }

  export type AnnouncementRecipientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementRecipientCreateManyInput = {
    id?: string
    announcementId: string
    userId?: string | null
    roomId?: string | null
    floor?: number | null
    forEveryone?: boolean
  }

  export type AnnouncementRecipientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementRecipientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumAuthMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthMethod | EnumAuthMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthMethodFilter<$PrismaModel> | $Enums.AuthMethod
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ConfirmationListRelationFilter = {
    every?: ConfirmationWhereInput
    some?: ConfirmationWhereInput
    none?: ConfirmationWhereInput
  }

  export type DormitoryAdminListRelationFilter = {
    every?: DormitoryAdminWhereInput
    some?: DormitoryAdminWhereInput
    none?: DormitoryAdminWhereInput
  }

  export type DormitoryNullableScalarRelationFilter = {
    is?: DormitoryWhereInput | null
    isNot?: DormitoryWhereInput | null
  }

  export type DormitoryListRelationFilter = {
    every?: DormitoryWhereInput
    some?: DormitoryWhereInput
    none?: DormitoryWhereInput
  }

  export type RoomNullableScalarRelationFilter = {
    is?: RoomWhereInput | null
    isNot?: RoomWhereInput | null
  }

  export type AnnouncementListRelationFilter = {
    every?: AnnouncementWhereInput
    some?: AnnouncementWhereInput
    none?: AnnouncementWhereInput
  }

  export type AnnouncementRecipientListRelationFilter = {
    every?: AnnouncementRecipientWhereInput
    some?: AnnouncementRecipientWhereInput
    none?: AnnouncementRecipientWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConfirmationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DormitoryAdminOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DormitoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnnouncementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnnouncementRecipientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    picture?: SortOrder
    isVerified?: SortOrder
    isTwoFactorEnabled?: SortOrder
    method?: SortOrder
    role?: SortOrder
    secondName?: SortOrder
    studentIdFront?: SortOrder
    studentIdBack?: SortOrder
    dormitoryId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    picture?: SortOrder
    isVerified?: SortOrder
    isTwoFactorEnabled?: SortOrder
    method?: SortOrder
    role?: SortOrder
    secondName?: SortOrder
    studentIdFront?: SortOrder
    studentIdBack?: SortOrder
    dormitoryId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    picture?: SortOrder
    isVerified?: SortOrder
    isTwoFactorEnabled?: SortOrder
    method?: SortOrder
    role?: SortOrder
    secondName?: SortOrder
    studentIdFront?: SortOrder
    studentIdBack?: SortOrder
    dormitoryId?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumAuthMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthMethod | EnumAuthMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthMethodWithAggregatesFilter<$PrismaModel> | $Enums.AuthMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthMethodFilter<$PrismaModel>
    _max?: NestedEnumAuthMethodFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DormitoryScalarRelationFilter = {
    is?: DormitoryWhereInput
    isNot?: DormitoryWhereInput
  }

  export type DormitoryAdminUserIdDormitoryIdCompoundUniqueInput = {
    userId: string
    dormitoryId: string
  }

  export type DormitoryAdminCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dormitoryId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type DormitoryAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dormitoryId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type DormitoryAdminMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dormitoryId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumConfirmationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationType | EnumConfirmationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationType[] | ListEnumConfirmationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationType[] | ListEnumConfirmationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationTypeFilter<$PrismaModel> | $Enums.ConfirmationType
  }

  export type EnumConfirmationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationStatus | EnumConfirmationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationStatusFilter<$PrismaModel> | $Enums.ConfirmationStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ConfirmationCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
    userId?: SortOrder
    photo?: SortOrder
    frontIdUrl?: SortOrder
    backIdUrl?: SortOrder
  }

  export type ConfirmationMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
    userId?: SortOrder
    photo?: SortOrder
    frontIdUrl?: SortOrder
    backIdUrl?: SortOrder
  }

  export type ConfirmationMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
    userId?: SortOrder
    photo?: SortOrder
    frontIdUrl?: SortOrder
    backIdUrl?: SortOrder
  }

  export type EnumConfirmationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationType | EnumConfirmationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationType[] | ListEnumConfirmationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationType[] | ListEnumConfirmationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConfirmationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfirmationTypeFilter<$PrismaModel>
    _max?: NestedEnumConfirmationTypeFilter<$PrismaModel>
  }

  export type EnumConfirmationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationStatus | EnumConfirmationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConfirmationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfirmationStatusFilter<$PrismaModel>
    _max?: NestedEnumConfirmationStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
  }

  export type EnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DormitoryCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    groundFloorPhoneNumber?: SortOrder
    status?: SortOrder
    photos?: SortOrder
    managerId?: SortOrder
  }

  export type DormitoryMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    groundFloorPhoneNumber?: SortOrder
    status?: SortOrder
    managerId?: SortOrder
  }

  export type DormitoryMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    address?: SortOrder
    groundFloorPhoneNumber?: SortOrder
    status?: SortOrder
    managerId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RoomStatusListRelationFilter = {
    every?: RoomStatusWhereInput
    some?: RoomStatusWhereInput
    none?: RoomStatusWhereInput
  }

  export type RoomStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    floor?: SortOrder
    createdAt?: SortOrder
    capacity?: SortOrder
    roomEquipment?: SortOrder
    photos?: SortOrder
    dormitoryId?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    floor?: SortOrder
    capacity?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    floor?: SortOrder
    createdAt?: SortOrder
    capacity?: SortOrder
    dormitoryId?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    floor?: SortOrder
    createdAt?: SortOrder
    capacity?: SortOrder
    dormitoryId?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    floor?: SortOrder
    capacity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type RoomStatusCountOrderByAggregateInput = {
    id?: SortOrder
    dateOfStart?: SortOrder
    dateOfEnd?: SortOrder
    description?: SortOrder
    roomId?: SortOrder
  }

  export type RoomStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    dateOfStart?: SortOrder
    dateOfEnd?: SortOrder
    description?: SortOrder
    roomId?: SortOrder
  }

  export type RoomStatusMinOrderByAggregateInput = {
    id?: SortOrder
    dateOfStart?: SortOrder
    dateOfEnd?: SortOrder
    description?: SortOrder
    roomId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PriceCountOrderByAggregateInput = {
    id?: SortOrder
    roomCapacity?: SortOrder
    pricePerMonth?: SortOrder
    pricePerDay?: SortOrder
    dateFrom?: SortOrder
    dateTo?: SortOrder
  }

  export type PriceAvgOrderByAggregateInput = {
    roomCapacity?: SortOrder
    pricePerMonth?: SortOrder
    pricePerDay?: SortOrder
  }

  export type PriceMaxOrderByAggregateInput = {
    id?: SortOrder
    roomCapacity?: SortOrder
    pricePerMonth?: SortOrder
    pricePerDay?: SortOrder
    dateFrom?: SortOrder
    dateTo?: SortOrder
  }

  export type PriceMinOrderByAggregateInput = {
    id?: SortOrder
    roomCapacity?: SortOrder
    pricePerMonth?: SortOrder
    pricePerDay?: SortOrder
    dateFrom?: SortOrder
    dateTo?: SortOrder
  }

  export type PriceSumOrderByAggregateInput = {
    roomCapacity?: SortOrder
    pricePerMonth?: SortOrder
    pricePerDay?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AttachmentListRelationFilter = {
    every?: AttachmentWhereInput
    some?: AttachmentWhereInput
    none?: AttachmentWhereInput
  }

  export type AttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnnouncementCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    postedAt?: SortOrder
    expiresAt?: SortOrder
    isHidden?: SortOrder
    authorId?: SortOrder
  }

  export type AnnouncementMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    postedAt?: SortOrder
    expiresAt?: SortOrder
    isHidden?: SortOrder
    authorId?: SortOrder
  }

  export type AnnouncementMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    postedAt?: SortOrder
    expiresAt?: SortOrder
    isHidden?: SortOrder
    authorId?: SortOrder
  }

  export type AnnouncementScalarRelationFilter = {
    is?: AnnouncementWhereInput
    isNot?: AnnouncementWhereInput
  }

  export type AttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    announcementId?: SortOrder
  }

  export type AttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    announcementId?: SortOrder
  }

  export type AttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    filename?: SortOrder
    announcementId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AnnouncementRecipientCountOrderByAggregateInput = {
    id?: SortOrder
    announcementId?: SortOrder
    userId?: SortOrder
    roomId?: SortOrder
    floor?: SortOrder
    forEveryone?: SortOrder
  }

  export type AnnouncementRecipientAvgOrderByAggregateInput = {
    floor?: SortOrder
  }

  export type AnnouncementRecipientMaxOrderByAggregateInput = {
    id?: SortOrder
    announcementId?: SortOrder
    userId?: SortOrder
    roomId?: SortOrder
    floor?: SortOrder
    forEveryone?: SortOrder
  }

  export type AnnouncementRecipientMinOrderByAggregateInput = {
    id?: SortOrder
    announcementId?: SortOrder
    userId?: SortOrder
    roomId?: SortOrder
    floor?: SortOrder
    forEveryone?: SortOrder
  }

  export type AnnouncementRecipientSumOrderByAggregateInput = {
    floor?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ConfirmationCreateNestedManyWithoutRequesterInput = {
    create?: XOR<ConfirmationCreateWithoutRequesterInput, ConfirmationUncheckedCreateWithoutRequesterInput> | ConfirmationCreateWithoutRequesterInput[] | ConfirmationUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: ConfirmationCreateOrConnectWithoutRequesterInput | ConfirmationCreateOrConnectWithoutRequesterInput[]
    createMany?: ConfirmationCreateManyRequesterInputEnvelope
    connect?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
  }

  export type DormitoryAdminCreateNestedManyWithoutUserInput = {
    create?: XOR<DormitoryAdminCreateWithoutUserInput, DormitoryAdminUncheckedCreateWithoutUserInput> | DormitoryAdminCreateWithoutUserInput[] | DormitoryAdminUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DormitoryAdminCreateOrConnectWithoutUserInput | DormitoryAdminCreateOrConnectWithoutUserInput[]
    createMany?: DormitoryAdminCreateManyUserInputEnvelope
    connect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
  }

  export type DormitoryCreateNestedOneWithoutResidentsInput = {
    create?: XOR<DormitoryCreateWithoutResidentsInput, DormitoryUncheckedCreateWithoutResidentsInput>
    connectOrCreate?: DormitoryCreateOrConnectWithoutResidentsInput
    connect?: DormitoryWhereUniqueInput
  }

  export type DormitoryCreateNestedManyWithoutManagerInput = {
    create?: XOR<DormitoryCreateWithoutManagerInput, DormitoryUncheckedCreateWithoutManagerInput> | DormitoryCreateWithoutManagerInput[] | DormitoryUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: DormitoryCreateOrConnectWithoutManagerInput | DormitoryCreateOrConnectWithoutManagerInput[]
    createMany?: DormitoryCreateManyManagerInputEnvelope
    connect?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
  }

  export type RoomCreateNestedOneWithoutResidentsInput = {
    create?: XOR<RoomCreateWithoutResidentsInput, RoomUncheckedCreateWithoutResidentsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutResidentsInput
    connect?: RoomWhereUniqueInput
  }

  export type AnnouncementCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type AnnouncementRecipientCreateNestedManyWithoutUserInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutUserInput, AnnouncementRecipientUncheckedCreateWithoutUserInput> | AnnouncementRecipientCreateWithoutUserInput[] | AnnouncementRecipientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutUserInput | AnnouncementRecipientCreateOrConnectWithoutUserInput[]
    createMany?: AnnouncementRecipientCreateManyUserInputEnvelope
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
  }

  export type ConfirmationUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: XOR<ConfirmationCreateWithoutRequesterInput, ConfirmationUncheckedCreateWithoutRequesterInput> | ConfirmationCreateWithoutRequesterInput[] | ConfirmationUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: ConfirmationCreateOrConnectWithoutRequesterInput | ConfirmationCreateOrConnectWithoutRequesterInput[]
    createMany?: ConfirmationCreateManyRequesterInputEnvelope
    connect?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
  }

  export type DormitoryAdminUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DormitoryAdminCreateWithoutUserInput, DormitoryAdminUncheckedCreateWithoutUserInput> | DormitoryAdminCreateWithoutUserInput[] | DormitoryAdminUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DormitoryAdminCreateOrConnectWithoutUserInput | DormitoryAdminCreateOrConnectWithoutUserInput[]
    createMany?: DormitoryAdminCreateManyUserInputEnvelope
    connect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
  }

  export type DormitoryUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<DormitoryCreateWithoutManagerInput, DormitoryUncheckedCreateWithoutManagerInput> | DormitoryCreateWithoutManagerInput[] | DormitoryUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: DormitoryCreateOrConnectWithoutManagerInput | DormitoryCreateOrConnectWithoutManagerInput[]
    createMany?: DormitoryCreateManyManagerInputEnvelope
    connect?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
  }

  export type AnnouncementUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
  }

  export type AnnouncementRecipientUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutUserInput, AnnouncementRecipientUncheckedCreateWithoutUserInput> | AnnouncementRecipientCreateWithoutUserInput[] | AnnouncementRecipientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutUserInput | AnnouncementRecipientCreateOrConnectWithoutUserInput[]
    createMany?: AnnouncementRecipientCreateManyUserInputEnvelope
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumAuthMethodFieldUpdateOperationsInput = {
    set?: $Enums.AuthMethod
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConfirmationUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<ConfirmationCreateWithoutRequesterInput, ConfirmationUncheckedCreateWithoutRequesterInput> | ConfirmationCreateWithoutRequesterInput[] | ConfirmationUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: ConfirmationCreateOrConnectWithoutRequesterInput | ConfirmationCreateOrConnectWithoutRequesterInput[]
    upsert?: ConfirmationUpsertWithWhereUniqueWithoutRequesterInput | ConfirmationUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: ConfirmationCreateManyRequesterInputEnvelope
    set?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
    disconnect?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
    delete?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
    connect?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
    update?: ConfirmationUpdateWithWhereUniqueWithoutRequesterInput | ConfirmationUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: ConfirmationUpdateManyWithWhereWithoutRequesterInput | ConfirmationUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: ConfirmationScalarWhereInput | ConfirmationScalarWhereInput[]
  }

  export type DormitoryAdminUpdateManyWithoutUserNestedInput = {
    create?: XOR<DormitoryAdminCreateWithoutUserInput, DormitoryAdminUncheckedCreateWithoutUserInput> | DormitoryAdminCreateWithoutUserInput[] | DormitoryAdminUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DormitoryAdminCreateOrConnectWithoutUserInput | DormitoryAdminCreateOrConnectWithoutUserInput[]
    upsert?: DormitoryAdminUpsertWithWhereUniqueWithoutUserInput | DormitoryAdminUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DormitoryAdminCreateManyUserInputEnvelope
    set?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    disconnect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    delete?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    connect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    update?: DormitoryAdminUpdateWithWhereUniqueWithoutUserInput | DormitoryAdminUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DormitoryAdminUpdateManyWithWhereWithoutUserInput | DormitoryAdminUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DormitoryAdminScalarWhereInput | DormitoryAdminScalarWhereInput[]
  }

  export type DormitoryUpdateOneWithoutResidentsNestedInput = {
    create?: XOR<DormitoryCreateWithoutResidentsInput, DormitoryUncheckedCreateWithoutResidentsInput>
    connectOrCreate?: DormitoryCreateOrConnectWithoutResidentsInput
    upsert?: DormitoryUpsertWithoutResidentsInput
    disconnect?: DormitoryWhereInput | boolean
    delete?: DormitoryWhereInput | boolean
    connect?: DormitoryWhereUniqueInput
    update?: XOR<XOR<DormitoryUpdateToOneWithWhereWithoutResidentsInput, DormitoryUpdateWithoutResidentsInput>, DormitoryUncheckedUpdateWithoutResidentsInput>
  }

  export type DormitoryUpdateManyWithoutManagerNestedInput = {
    create?: XOR<DormitoryCreateWithoutManagerInput, DormitoryUncheckedCreateWithoutManagerInput> | DormitoryCreateWithoutManagerInput[] | DormitoryUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: DormitoryCreateOrConnectWithoutManagerInput | DormitoryCreateOrConnectWithoutManagerInput[]
    upsert?: DormitoryUpsertWithWhereUniqueWithoutManagerInput | DormitoryUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: DormitoryCreateManyManagerInputEnvelope
    set?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
    disconnect?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
    delete?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
    connect?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
    update?: DormitoryUpdateWithWhereUniqueWithoutManagerInput | DormitoryUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: DormitoryUpdateManyWithWhereWithoutManagerInput | DormitoryUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: DormitoryScalarWhereInput | DormitoryScalarWhereInput[]
  }

  export type RoomUpdateOneWithoutResidentsNestedInput = {
    create?: XOR<RoomCreateWithoutResidentsInput, RoomUncheckedCreateWithoutResidentsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutResidentsInput
    upsert?: RoomUpsertWithoutResidentsInput
    disconnect?: RoomWhereInput | boolean
    delete?: RoomWhereInput | boolean
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutResidentsInput, RoomUpdateWithoutResidentsInput>, RoomUncheckedUpdateWithoutResidentsInput>
  }

  export type AnnouncementUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAuthorInput | AnnouncementUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAuthorInput | AnnouncementUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAuthorInput | AnnouncementUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type AnnouncementRecipientUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutUserInput, AnnouncementRecipientUncheckedCreateWithoutUserInput> | AnnouncementRecipientCreateWithoutUserInput[] | AnnouncementRecipientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutUserInput | AnnouncementRecipientCreateOrConnectWithoutUserInput[]
    upsert?: AnnouncementRecipientUpsertWithWhereUniqueWithoutUserInput | AnnouncementRecipientUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnnouncementRecipientCreateManyUserInputEnvelope
    set?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    disconnect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    delete?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    update?: AnnouncementRecipientUpdateWithWhereUniqueWithoutUserInput | AnnouncementRecipientUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnnouncementRecipientUpdateManyWithWhereWithoutUserInput | AnnouncementRecipientUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnnouncementRecipientScalarWhereInput | AnnouncementRecipientScalarWhereInput[]
  }

  export type ConfirmationUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<ConfirmationCreateWithoutRequesterInput, ConfirmationUncheckedCreateWithoutRequesterInput> | ConfirmationCreateWithoutRequesterInput[] | ConfirmationUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: ConfirmationCreateOrConnectWithoutRequesterInput | ConfirmationCreateOrConnectWithoutRequesterInput[]
    upsert?: ConfirmationUpsertWithWhereUniqueWithoutRequesterInput | ConfirmationUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: ConfirmationCreateManyRequesterInputEnvelope
    set?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
    disconnect?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
    delete?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
    connect?: ConfirmationWhereUniqueInput | ConfirmationWhereUniqueInput[]
    update?: ConfirmationUpdateWithWhereUniqueWithoutRequesterInput | ConfirmationUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: ConfirmationUpdateManyWithWhereWithoutRequesterInput | ConfirmationUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: ConfirmationScalarWhereInput | ConfirmationScalarWhereInput[]
  }

  export type DormitoryAdminUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DormitoryAdminCreateWithoutUserInput, DormitoryAdminUncheckedCreateWithoutUserInput> | DormitoryAdminCreateWithoutUserInput[] | DormitoryAdminUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DormitoryAdminCreateOrConnectWithoutUserInput | DormitoryAdminCreateOrConnectWithoutUserInput[]
    upsert?: DormitoryAdminUpsertWithWhereUniqueWithoutUserInput | DormitoryAdminUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DormitoryAdminCreateManyUserInputEnvelope
    set?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    disconnect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    delete?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    connect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    update?: DormitoryAdminUpdateWithWhereUniqueWithoutUserInput | DormitoryAdminUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DormitoryAdminUpdateManyWithWhereWithoutUserInput | DormitoryAdminUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DormitoryAdminScalarWhereInput | DormitoryAdminScalarWhereInput[]
  }

  export type DormitoryUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<DormitoryCreateWithoutManagerInput, DormitoryUncheckedCreateWithoutManagerInput> | DormitoryCreateWithoutManagerInput[] | DormitoryUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: DormitoryCreateOrConnectWithoutManagerInput | DormitoryCreateOrConnectWithoutManagerInput[]
    upsert?: DormitoryUpsertWithWhereUniqueWithoutManagerInput | DormitoryUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: DormitoryCreateManyManagerInputEnvelope
    set?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
    disconnect?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
    delete?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
    connect?: DormitoryWhereUniqueInput | DormitoryWhereUniqueInput[]
    update?: DormitoryUpdateWithWhereUniqueWithoutManagerInput | DormitoryUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: DormitoryUpdateManyWithWhereWithoutManagerInput | DormitoryUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: DormitoryScalarWhereInput | DormitoryScalarWhereInput[]
  }

  export type AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput> | AnnouncementCreateWithoutAuthorInput[] | AnnouncementUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAuthorInput | AnnouncementCreateOrConnectWithoutAuthorInput[]
    upsert?: AnnouncementUpsertWithWhereUniqueWithoutAuthorInput | AnnouncementUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: AnnouncementCreateManyAuthorInputEnvelope
    set?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    disconnect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    delete?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    connect?: AnnouncementWhereUniqueInput | AnnouncementWhereUniqueInput[]
    update?: AnnouncementUpdateWithWhereUniqueWithoutAuthorInput | AnnouncementUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: AnnouncementUpdateManyWithWhereWithoutAuthorInput | AnnouncementUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
  }

  export type AnnouncementRecipientUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutUserInput, AnnouncementRecipientUncheckedCreateWithoutUserInput> | AnnouncementRecipientCreateWithoutUserInput[] | AnnouncementRecipientUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutUserInput | AnnouncementRecipientCreateOrConnectWithoutUserInput[]
    upsert?: AnnouncementRecipientUpsertWithWhereUniqueWithoutUserInput | AnnouncementRecipientUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnnouncementRecipientCreateManyUserInputEnvelope
    set?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    disconnect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    delete?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    update?: AnnouncementRecipientUpdateWithWhereUniqueWithoutUserInput | AnnouncementRecipientUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnnouncementRecipientUpdateManyWithWhereWithoutUserInput | AnnouncementRecipientUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnnouncementRecipientScalarWhereInput | AnnouncementRecipientScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDormitoryAdminAssignmentsInput = {
    create?: XOR<UserCreateWithoutDormitoryAdminAssignmentsInput, UserUncheckedCreateWithoutDormitoryAdminAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDormitoryAdminAssignmentsInput
    connect?: UserWhereUniqueInput
  }

  export type DormitoryCreateNestedOneWithoutAdminsInput = {
    create?: XOR<DormitoryCreateWithoutAdminsInput, DormitoryUncheckedCreateWithoutAdminsInput>
    connectOrCreate?: DormitoryCreateOrConnectWithoutAdminsInput
    connect?: DormitoryWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDormitoryAdminAssignmentsNestedInput = {
    create?: XOR<UserCreateWithoutDormitoryAdminAssignmentsInput, UserUncheckedCreateWithoutDormitoryAdminAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDormitoryAdminAssignmentsInput
    upsert?: UserUpsertWithoutDormitoryAdminAssignmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDormitoryAdminAssignmentsInput, UserUpdateWithoutDormitoryAdminAssignmentsInput>, UserUncheckedUpdateWithoutDormitoryAdminAssignmentsInput>
  }

  export type DormitoryUpdateOneRequiredWithoutAdminsNestedInput = {
    create?: XOR<DormitoryCreateWithoutAdminsInput, DormitoryUncheckedCreateWithoutAdminsInput>
    connectOrCreate?: DormitoryCreateOrConnectWithoutAdminsInput
    upsert?: DormitoryUpsertWithoutAdminsInput
    connect?: DormitoryWhereUniqueInput
    update?: XOR<XOR<DormitoryUpdateToOneWithWhereWithoutAdminsInput, DormitoryUpdateWithoutAdminsInput>, DormitoryUncheckedUpdateWithoutAdminsInput>
  }

  export type UserCreateNestedOneWithoutConfirmationsInput = {
    create?: XOR<UserCreateWithoutConfirmationsInput, UserUncheckedCreateWithoutConfirmationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConfirmationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumConfirmationTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConfirmationType
  }

  export type EnumConfirmationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConfirmationStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutConfirmationsNestedInput = {
    create?: XOR<UserCreateWithoutConfirmationsInput, UserUncheckedCreateWithoutConfirmationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConfirmationsInput
    upsert?: UserUpsertWithoutConfirmationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConfirmationsInput, UserUpdateWithoutConfirmationsInput>, UserUncheckedUpdateWithoutConfirmationsInput>
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.TokenType
  }

  export type DormitoryCreatephotosInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutManagedDormitoriesInput = {
    create?: XOR<UserCreateWithoutManagedDormitoriesInput, UserUncheckedCreateWithoutManagedDormitoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutManagedDormitoriesInput
    connect?: UserWhereUniqueInput
  }

  export type DormitoryAdminCreateNestedManyWithoutDormitoryInput = {
    create?: XOR<DormitoryAdminCreateWithoutDormitoryInput, DormitoryAdminUncheckedCreateWithoutDormitoryInput> | DormitoryAdminCreateWithoutDormitoryInput[] | DormitoryAdminUncheckedCreateWithoutDormitoryInput[]
    connectOrCreate?: DormitoryAdminCreateOrConnectWithoutDormitoryInput | DormitoryAdminCreateOrConnectWithoutDormitoryInput[]
    createMany?: DormitoryAdminCreateManyDormitoryInputEnvelope
    connect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutDormitoryInput = {
    create?: XOR<UserCreateWithoutDormitoryInput, UserUncheckedCreateWithoutDormitoryInput> | UserCreateWithoutDormitoryInput[] | UserUncheckedCreateWithoutDormitoryInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDormitoryInput | UserCreateOrConnectWithoutDormitoryInput[]
    createMany?: UserCreateManyDormitoryInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RoomCreateNestedManyWithoutDormitroyInput = {
    create?: XOR<RoomCreateWithoutDormitroyInput, RoomUncheckedCreateWithoutDormitroyInput> | RoomCreateWithoutDormitroyInput[] | RoomUncheckedCreateWithoutDormitroyInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutDormitroyInput | RoomCreateOrConnectWithoutDormitroyInput[]
    createMany?: RoomCreateManyDormitroyInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type DormitoryAdminUncheckedCreateNestedManyWithoutDormitoryInput = {
    create?: XOR<DormitoryAdminCreateWithoutDormitoryInput, DormitoryAdminUncheckedCreateWithoutDormitoryInput> | DormitoryAdminCreateWithoutDormitoryInput[] | DormitoryAdminUncheckedCreateWithoutDormitoryInput[]
    connectOrCreate?: DormitoryAdminCreateOrConnectWithoutDormitoryInput | DormitoryAdminCreateOrConnectWithoutDormitoryInput[]
    createMany?: DormitoryAdminCreateManyDormitoryInputEnvelope
    connect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutDormitoryInput = {
    create?: XOR<UserCreateWithoutDormitoryInput, UserUncheckedCreateWithoutDormitoryInput> | UserCreateWithoutDormitoryInput[] | UserUncheckedCreateWithoutDormitoryInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDormitoryInput | UserCreateOrConnectWithoutDormitoryInput[]
    createMany?: UserCreateManyDormitoryInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutDormitroyInput = {
    create?: XOR<RoomCreateWithoutDormitroyInput, RoomUncheckedCreateWithoutDormitroyInput> | RoomCreateWithoutDormitroyInput[] | RoomUncheckedCreateWithoutDormitroyInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutDormitroyInput | RoomCreateOrConnectWithoutDormitroyInput[]
    createMany?: RoomCreateManyDormitroyInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type DormitoryUpdatephotosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneWithoutManagedDormitoriesNestedInput = {
    create?: XOR<UserCreateWithoutManagedDormitoriesInput, UserUncheckedCreateWithoutManagedDormitoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutManagedDormitoriesInput
    upsert?: UserUpsertWithoutManagedDormitoriesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutManagedDormitoriesInput, UserUpdateWithoutManagedDormitoriesInput>, UserUncheckedUpdateWithoutManagedDormitoriesInput>
  }

  export type DormitoryAdminUpdateManyWithoutDormitoryNestedInput = {
    create?: XOR<DormitoryAdminCreateWithoutDormitoryInput, DormitoryAdminUncheckedCreateWithoutDormitoryInput> | DormitoryAdminCreateWithoutDormitoryInput[] | DormitoryAdminUncheckedCreateWithoutDormitoryInput[]
    connectOrCreate?: DormitoryAdminCreateOrConnectWithoutDormitoryInput | DormitoryAdminCreateOrConnectWithoutDormitoryInput[]
    upsert?: DormitoryAdminUpsertWithWhereUniqueWithoutDormitoryInput | DormitoryAdminUpsertWithWhereUniqueWithoutDormitoryInput[]
    createMany?: DormitoryAdminCreateManyDormitoryInputEnvelope
    set?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    disconnect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    delete?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    connect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    update?: DormitoryAdminUpdateWithWhereUniqueWithoutDormitoryInput | DormitoryAdminUpdateWithWhereUniqueWithoutDormitoryInput[]
    updateMany?: DormitoryAdminUpdateManyWithWhereWithoutDormitoryInput | DormitoryAdminUpdateManyWithWhereWithoutDormitoryInput[]
    deleteMany?: DormitoryAdminScalarWhereInput | DormitoryAdminScalarWhereInput[]
  }

  export type UserUpdateManyWithoutDormitoryNestedInput = {
    create?: XOR<UserCreateWithoutDormitoryInput, UserUncheckedCreateWithoutDormitoryInput> | UserCreateWithoutDormitoryInput[] | UserUncheckedCreateWithoutDormitoryInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDormitoryInput | UserCreateOrConnectWithoutDormitoryInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutDormitoryInput | UserUpsertWithWhereUniqueWithoutDormitoryInput[]
    createMany?: UserCreateManyDormitoryInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutDormitoryInput | UserUpdateWithWhereUniqueWithoutDormitoryInput[]
    updateMany?: UserUpdateManyWithWhereWithoutDormitoryInput | UserUpdateManyWithWhereWithoutDormitoryInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RoomUpdateManyWithoutDormitroyNestedInput = {
    create?: XOR<RoomCreateWithoutDormitroyInput, RoomUncheckedCreateWithoutDormitroyInput> | RoomCreateWithoutDormitroyInput[] | RoomUncheckedCreateWithoutDormitroyInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutDormitroyInput | RoomCreateOrConnectWithoutDormitroyInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutDormitroyInput | RoomUpsertWithWhereUniqueWithoutDormitroyInput[]
    createMany?: RoomCreateManyDormitroyInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutDormitroyInput | RoomUpdateWithWhereUniqueWithoutDormitroyInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutDormitroyInput | RoomUpdateManyWithWhereWithoutDormitroyInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type DormitoryAdminUncheckedUpdateManyWithoutDormitoryNestedInput = {
    create?: XOR<DormitoryAdminCreateWithoutDormitoryInput, DormitoryAdminUncheckedCreateWithoutDormitoryInput> | DormitoryAdminCreateWithoutDormitoryInput[] | DormitoryAdminUncheckedCreateWithoutDormitoryInput[]
    connectOrCreate?: DormitoryAdminCreateOrConnectWithoutDormitoryInput | DormitoryAdminCreateOrConnectWithoutDormitoryInput[]
    upsert?: DormitoryAdminUpsertWithWhereUniqueWithoutDormitoryInput | DormitoryAdminUpsertWithWhereUniqueWithoutDormitoryInput[]
    createMany?: DormitoryAdminCreateManyDormitoryInputEnvelope
    set?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    disconnect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    delete?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    connect?: DormitoryAdminWhereUniqueInput | DormitoryAdminWhereUniqueInput[]
    update?: DormitoryAdminUpdateWithWhereUniqueWithoutDormitoryInput | DormitoryAdminUpdateWithWhereUniqueWithoutDormitoryInput[]
    updateMany?: DormitoryAdminUpdateManyWithWhereWithoutDormitoryInput | DormitoryAdminUpdateManyWithWhereWithoutDormitoryInput[]
    deleteMany?: DormitoryAdminScalarWhereInput | DormitoryAdminScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutDormitoryNestedInput = {
    create?: XOR<UserCreateWithoutDormitoryInput, UserUncheckedCreateWithoutDormitoryInput> | UserCreateWithoutDormitoryInput[] | UserUncheckedCreateWithoutDormitoryInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDormitoryInput | UserCreateOrConnectWithoutDormitoryInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutDormitoryInput | UserUpsertWithWhereUniqueWithoutDormitoryInput[]
    createMany?: UserCreateManyDormitoryInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutDormitoryInput | UserUpdateWithWhereUniqueWithoutDormitoryInput[]
    updateMany?: UserUpdateManyWithWhereWithoutDormitoryInput | UserUpdateManyWithWhereWithoutDormitoryInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutDormitroyNestedInput = {
    create?: XOR<RoomCreateWithoutDormitroyInput, RoomUncheckedCreateWithoutDormitroyInput> | RoomCreateWithoutDormitroyInput[] | RoomUncheckedCreateWithoutDormitroyInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutDormitroyInput | RoomCreateOrConnectWithoutDormitroyInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutDormitroyInput | RoomUpsertWithWhereUniqueWithoutDormitroyInput[]
    createMany?: RoomCreateManyDormitroyInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutDormitroyInput | RoomUpdateWithWhereUniqueWithoutDormitroyInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutDormitroyInput | RoomUpdateManyWithWhereWithoutDormitroyInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomCreateroomEquipmentInput = {
    set: string[]
  }

  export type RoomCreatephotosInput = {
    set: string[]
  }

  export type RoomStatusCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStatusCreateWithoutRoomInput, RoomStatusUncheckedCreateWithoutRoomInput> | RoomStatusCreateWithoutRoomInput[] | RoomStatusUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStatusCreateOrConnectWithoutRoomInput | RoomStatusCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStatusCreateManyRoomInputEnvelope
    connect?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutRoomInput = {
    create?: XOR<UserCreateWithoutRoomInput, UserUncheckedCreateWithoutRoomInput> | UserCreateWithoutRoomInput[] | UserUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoomInput | UserCreateOrConnectWithoutRoomInput[]
    createMany?: UserCreateManyRoomInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AnnouncementRecipientCreateNestedManyWithoutRoomInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutRoomInput, AnnouncementRecipientUncheckedCreateWithoutRoomInput> | AnnouncementRecipientCreateWithoutRoomInput[] | AnnouncementRecipientUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutRoomInput | AnnouncementRecipientCreateOrConnectWithoutRoomInput[]
    createMany?: AnnouncementRecipientCreateManyRoomInputEnvelope
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
  }

  export type DormitoryCreateNestedOneWithoutRoomsInput = {
    create?: XOR<DormitoryCreateWithoutRoomsInput, DormitoryUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: DormitoryCreateOrConnectWithoutRoomsInput
    connect?: DormitoryWhereUniqueInput
  }

  export type RoomStatusUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStatusCreateWithoutRoomInput, RoomStatusUncheckedCreateWithoutRoomInput> | RoomStatusCreateWithoutRoomInput[] | RoomStatusUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStatusCreateOrConnectWithoutRoomInput | RoomStatusCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStatusCreateManyRoomInputEnvelope
    connect?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<UserCreateWithoutRoomInput, UserUncheckedCreateWithoutRoomInput> | UserCreateWithoutRoomInput[] | UserUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoomInput | UserCreateOrConnectWithoutRoomInput[]
    createMany?: UserCreateManyRoomInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AnnouncementRecipientUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutRoomInput, AnnouncementRecipientUncheckedCreateWithoutRoomInput> | AnnouncementRecipientCreateWithoutRoomInput[] | AnnouncementRecipientUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutRoomInput | AnnouncementRecipientCreateOrConnectWithoutRoomInput[]
    createMany?: AnnouncementRecipientCreateManyRoomInputEnvelope
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RoomUpdateroomEquipmentInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RoomUpdatephotosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RoomStatusUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStatusCreateWithoutRoomInput, RoomStatusUncheckedCreateWithoutRoomInput> | RoomStatusCreateWithoutRoomInput[] | RoomStatusUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStatusCreateOrConnectWithoutRoomInput | RoomStatusCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStatusUpsertWithWhereUniqueWithoutRoomInput | RoomStatusUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStatusCreateManyRoomInputEnvelope
    set?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
    disconnect?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
    delete?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
    connect?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
    update?: RoomStatusUpdateWithWhereUniqueWithoutRoomInput | RoomStatusUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStatusUpdateManyWithWhereWithoutRoomInput | RoomStatusUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStatusScalarWhereInput | RoomStatusScalarWhereInput[]
  }

  export type UserUpdateManyWithoutRoomNestedInput = {
    create?: XOR<UserCreateWithoutRoomInput, UserUncheckedCreateWithoutRoomInput> | UserCreateWithoutRoomInput[] | UserUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoomInput | UserCreateOrConnectWithoutRoomInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoomInput | UserUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: UserCreateManyRoomInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoomInput | UserUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoomInput | UserUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AnnouncementRecipientUpdateManyWithoutRoomNestedInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutRoomInput, AnnouncementRecipientUncheckedCreateWithoutRoomInput> | AnnouncementRecipientCreateWithoutRoomInput[] | AnnouncementRecipientUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutRoomInput | AnnouncementRecipientCreateOrConnectWithoutRoomInput[]
    upsert?: AnnouncementRecipientUpsertWithWhereUniqueWithoutRoomInput | AnnouncementRecipientUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: AnnouncementRecipientCreateManyRoomInputEnvelope
    set?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    disconnect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    delete?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    update?: AnnouncementRecipientUpdateWithWhereUniqueWithoutRoomInput | AnnouncementRecipientUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: AnnouncementRecipientUpdateManyWithWhereWithoutRoomInput | AnnouncementRecipientUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: AnnouncementRecipientScalarWhereInput | AnnouncementRecipientScalarWhereInput[]
  }

  export type DormitoryUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<DormitoryCreateWithoutRoomsInput, DormitoryUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: DormitoryCreateOrConnectWithoutRoomsInput
    upsert?: DormitoryUpsertWithoutRoomsInput
    connect?: DormitoryWhereUniqueInput
    update?: XOR<XOR<DormitoryUpdateToOneWithWhereWithoutRoomsInput, DormitoryUpdateWithoutRoomsInput>, DormitoryUncheckedUpdateWithoutRoomsInput>
  }

  export type RoomStatusUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStatusCreateWithoutRoomInput, RoomStatusUncheckedCreateWithoutRoomInput> | RoomStatusCreateWithoutRoomInput[] | RoomStatusUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStatusCreateOrConnectWithoutRoomInput | RoomStatusCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStatusUpsertWithWhereUniqueWithoutRoomInput | RoomStatusUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStatusCreateManyRoomInputEnvelope
    set?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
    disconnect?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
    delete?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
    connect?: RoomStatusWhereUniqueInput | RoomStatusWhereUniqueInput[]
    update?: RoomStatusUpdateWithWhereUniqueWithoutRoomInput | RoomStatusUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStatusUpdateManyWithWhereWithoutRoomInput | RoomStatusUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStatusScalarWhereInput | RoomStatusScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<UserCreateWithoutRoomInput, UserUncheckedCreateWithoutRoomInput> | UserCreateWithoutRoomInput[] | UserUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoomInput | UserCreateOrConnectWithoutRoomInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoomInput | UserUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: UserCreateManyRoomInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoomInput | UserUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoomInput | UserUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AnnouncementRecipientUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutRoomInput, AnnouncementRecipientUncheckedCreateWithoutRoomInput> | AnnouncementRecipientCreateWithoutRoomInput[] | AnnouncementRecipientUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutRoomInput | AnnouncementRecipientCreateOrConnectWithoutRoomInput[]
    upsert?: AnnouncementRecipientUpsertWithWhereUniqueWithoutRoomInput | AnnouncementRecipientUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: AnnouncementRecipientCreateManyRoomInputEnvelope
    set?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    disconnect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    delete?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    update?: AnnouncementRecipientUpdateWithWhereUniqueWithoutRoomInput | AnnouncementRecipientUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: AnnouncementRecipientUpdateManyWithWhereWithoutRoomInput | AnnouncementRecipientUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: AnnouncementRecipientScalarWhereInput | AnnouncementRecipientScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutStatusesInput = {
    create?: XOR<RoomCreateWithoutStatusesInput, RoomUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutStatusesInput
    connect?: RoomWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutStatusesNestedInput = {
    create?: XOR<RoomCreateWithoutStatusesInput, RoomUncheckedCreateWithoutStatusesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutStatusesInput
    upsert?: RoomUpsertWithoutStatusesInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutStatusesInput, RoomUpdateWithoutStatusesInput>, RoomUncheckedUpdateWithoutStatusesInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutAnnouncementsInput = {
    create?: XOR<UserCreateWithoutAnnouncementsInput, UserUncheckedCreateWithoutAnnouncementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnnouncementsInput
    connect?: UserWhereUniqueInput
  }

  export type AttachmentCreateNestedManyWithoutAnnouncementInput = {
    create?: XOR<AttachmentCreateWithoutAnnouncementInput, AttachmentUncheckedCreateWithoutAnnouncementInput> | AttachmentCreateWithoutAnnouncementInput[] | AttachmentUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutAnnouncementInput | AttachmentCreateOrConnectWithoutAnnouncementInput[]
    createMany?: AttachmentCreateManyAnnouncementInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type AnnouncementRecipientCreateNestedManyWithoutAnnouncementInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutAnnouncementInput, AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput> | AnnouncementRecipientCreateWithoutAnnouncementInput[] | AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput | AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput[]
    createMany?: AnnouncementRecipientCreateManyAnnouncementInputEnvelope
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
  }

  export type AttachmentUncheckedCreateNestedManyWithoutAnnouncementInput = {
    create?: XOR<AttachmentCreateWithoutAnnouncementInput, AttachmentUncheckedCreateWithoutAnnouncementInput> | AttachmentCreateWithoutAnnouncementInput[] | AttachmentUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutAnnouncementInput | AttachmentCreateOrConnectWithoutAnnouncementInput[]
    createMany?: AttachmentCreateManyAnnouncementInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type AnnouncementRecipientUncheckedCreateNestedManyWithoutAnnouncementInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutAnnouncementInput, AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput> | AnnouncementRecipientCreateWithoutAnnouncementInput[] | AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput | AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput[]
    createMany?: AnnouncementRecipientCreateManyAnnouncementInputEnvelope
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAnnouncementsNestedInput = {
    create?: XOR<UserCreateWithoutAnnouncementsInput, UserUncheckedCreateWithoutAnnouncementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnnouncementsInput
    upsert?: UserUpsertWithoutAnnouncementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnnouncementsInput, UserUpdateWithoutAnnouncementsInput>, UserUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type AttachmentUpdateManyWithoutAnnouncementNestedInput = {
    create?: XOR<AttachmentCreateWithoutAnnouncementInput, AttachmentUncheckedCreateWithoutAnnouncementInput> | AttachmentCreateWithoutAnnouncementInput[] | AttachmentUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutAnnouncementInput | AttachmentCreateOrConnectWithoutAnnouncementInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutAnnouncementInput | AttachmentUpsertWithWhereUniqueWithoutAnnouncementInput[]
    createMany?: AttachmentCreateManyAnnouncementInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutAnnouncementInput | AttachmentUpdateWithWhereUniqueWithoutAnnouncementInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutAnnouncementInput | AttachmentUpdateManyWithWhereWithoutAnnouncementInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type AnnouncementRecipientUpdateManyWithoutAnnouncementNestedInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutAnnouncementInput, AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput> | AnnouncementRecipientCreateWithoutAnnouncementInput[] | AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput | AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput[]
    upsert?: AnnouncementRecipientUpsertWithWhereUniqueWithoutAnnouncementInput | AnnouncementRecipientUpsertWithWhereUniqueWithoutAnnouncementInput[]
    createMany?: AnnouncementRecipientCreateManyAnnouncementInputEnvelope
    set?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    disconnect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    delete?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    update?: AnnouncementRecipientUpdateWithWhereUniqueWithoutAnnouncementInput | AnnouncementRecipientUpdateWithWhereUniqueWithoutAnnouncementInput[]
    updateMany?: AnnouncementRecipientUpdateManyWithWhereWithoutAnnouncementInput | AnnouncementRecipientUpdateManyWithWhereWithoutAnnouncementInput[]
    deleteMany?: AnnouncementRecipientScalarWhereInput | AnnouncementRecipientScalarWhereInput[]
  }

  export type AttachmentUncheckedUpdateManyWithoutAnnouncementNestedInput = {
    create?: XOR<AttachmentCreateWithoutAnnouncementInput, AttachmentUncheckedCreateWithoutAnnouncementInput> | AttachmentCreateWithoutAnnouncementInput[] | AttachmentUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutAnnouncementInput | AttachmentCreateOrConnectWithoutAnnouncementInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutAnnouncementInput | AttachmentUpsertWithWhereUniqueWithoutAnnouncementInput[]
    createMany?: AttachmentCreateManyAnnouncementInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutAnnouncementInput | AttachmentUpdateWithWhereUniqueWithoutAnnouncementInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutAnnouncementInput | AttachmentUpdateManyWithWhereWithoutAnnouncementInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type AnnouncementRecipientUncheckedUpdateManyWithoutAnnouncementNestedInput = {
    create?: XOR<AnnouncementRecipientCreateWithoutAnnouncementInput, AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput> | AnnouncementRecipientCreateWithoutAnnouncementInput[] | AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput[]
    connectOrCreate?: AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput | AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput[]
    upsert?: AnnouncementRecipientUpsertWithWhereUniqueWithoutAnnouncementInput | AnnouncementRecipientUpsertWithWhereUniqueWithoutAnnouncementInput[]
    createMany?: AnnouncementRecipientCreateManyAnnouncementInputEnvelope
    set?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    disconnect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    delete?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    connect?: AnnouncementRecipientWhereUniqueInput | AnnouncementRecipientWhereUniqueInput[]
    update?: AnnouncementRecipientUpdateWithWhereUniqueWithoutAnnouncementInput | AnnouncementRecipientUpdateWithWhereUniqueWithoutAnnouncementInput[]
    updateMany?: AnnouncementRecipientUpdateManyWithWhereWithoutAnnouncementInput | AnnouncementRecipientUpdateManyWithWhereWithoutAnnouncementInput[]
    deleteMany?: AnnouncementRecipientScalarWhereInput | AnnouncementRecipientScalarWhereInput[]
  }

  export type AnnouncementCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<AnnouncementCreateWithoutAttachmentsInput, AnnouncementUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAttachmentsInput
    connect?: AnnouncementWhereUniqueInput
  }

  export type AnnouncementUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<AnnouncementCreateWithoutAttachmentsInput, AnnouncementUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: AnnouncementCreateOrConnectWithoutAttachmentsInput
    upsert?: AnnouncementUpsertWithoutAttachmentsInput
    connect?: AnnouncementWhereUniqueInput
    update?: XOR<XOR<AnnouncementUpdateToOneWithWhereWithoutAttachmentsInput, AnnouncementUpdateWithoutAttachmentsInput>, AnnouncementUncheckedUpdateWithoutAttachmentsInput>
  }

  export type AnnouncementCreateNestedOneWithoutRecipientsInput = {
    create?: XOR<AnnouncementCreateWithoutRecipientsInput, AnnouncementUncheckedCreateWithoutRecipientsInput>
    connectOrCreate?: AnnouncementCreateOrConnectWithoutRecipientsInput
    connect?: AnnouncementWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAnnouncementRecipientsInput = {
    create?: XOR<UserCreateWithoutAnnouncementRecipientsInput, UserUncheckedCreateWithoutAnnouncementRecipientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnnouncementRecipientsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomCreateNestedOneWithoutAnnouncementRecipientsInput = {
    create?: XOR<RoomCreateWithoutAnnouncementRecipientsInput, RoomUncheckedCreateWithoutAnnouncementRecipientsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutAnnouncementRecipientsInput
    connect?: RoomWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AnnouncementUpdateOneRequiredWithoutRecipientsNestedInput = {
    create?: XOR<AnnouncementCreateWithoutRecipientsInput, AnnouncementUncheckedCreateWithoutRecipientsInput>
    connectOrCreate?: AnnouncementCreateOrConnectWithoutRecipientsInput
    upsert?: AnnouncementUpsertWithoutRecipientsInput
    connect?: AnnouncementWhereUniqueInput
    update?: XOR<XOR<AnnouncementUpdateToOneWithWhereWithoutRecipientsInput, AnnouncementUpdateWithoutRecipientsInput>, AnnouncementUncheckedUpdateWithoutRecipientsInput>
  }

  export type UserUpdateOneWithoutAnnouncementRecipientsNestedInput = {
    create?: XOR<UserCreateWithoutAnnouncementRecipientsInput, UserUncheckedCreateWithoutAnnouncementRecipientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnnouncementRecipientsInput
    upsert?: UserUpsertWithoutAnnouncementRecipientsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnnouncementRecipientsInput, UserUpdateWithoutAnnouncementRecipientsInput>, UserUncheckedUpdateWithoutAnnouncementRecipientsInput>
  }

  export type RoomUpdateOneWithoutAnnouncementRecipientsNestedInput = {
    create?: XOR<RoomCreateWithoutAnnouncementRecipientsInput, RoomUncheckedCreateWithoutAnnouncementRecipientsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutAnnouncementRecipientsInput
    upsert?: RoomUpsertWithoutAnnouncementRecipientsInput
    disconnect?: RoomWhereInput | boolean
    delete?: RoomWhereInput | boolean
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutAnnouncementRecipientsInput, RoomUpdateWithoutAnnouncementRecipientsInput>, RoomUncheckedUpdateWithoutAnnouncementRecipientsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumAuthMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthMethod | EnumAuthMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthMethodFilter<$PrismaModel> | $Enums.AuthMethod
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumAuthMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthMethod | EnumAuthMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthMethodWithAggregatesFilter<$PrismaModel> | $Enums.AuthMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthMethodFilter<$PrismaModel>
    _max?: NestedEnumAuthMethodFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumConfirmationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationType | EnumConfirmationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationType[] | ListEnumConfirmationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationType[] | ListEnumConfirmationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationTypeFilter<$PrismaModel> | $Enums.ConfirmationType
  }

  export type NestedEnumConfirmationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationStatus | EnumConfirmationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationStatusFilter<$PrismaModel> | $Enums.ConfirmationStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumConfirmationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationType | EnumConfirmationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationType[] | ListEnumConfirmationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationType[] | ListEnumConfirmationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConfirmationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfirmationTypeFilter<$PrismaModel>
    _max?: NestedEnumConfirmationTypeFilter<$PrismaModel>
  }

  export type NestedEnumConfirmationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationStatus | EnumConfirmationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationStatus[] | ListEnumConfirmationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConfirmationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfirmationStatusFilter<$PrismaModel>
    _max?: NestedEnumConfirmationStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ConfirmationCreateWithoutRequesterInput = {
    id?: string
    type: $Enums.ConfirmationType
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    photo?: string | null
    frontIdUrl?: string | null
    backIdUrl?: string | null
  }

  export type ConfirmationUncheckedCreateWithoutRequesterInput = {
    id?: string
    type: $Enums.ConfirmationType
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    photo?: string | null
    frontIdUrl?: string | null
    backIdUrl?: string | null
  }

  export type ConfirmationCreateOrConnectWithoutRequesterInput = {
    where: ConfirmationWhereUniqueInput
    create: XOR<ConfirmationCreateWithoutRequesterInput, ConfirmationUncheckedCreateWithoutRequesterInput>
  }

  export type ConfirmationCreateManyRequesterInputEnvelope = {
    data: ConfirmationCreateManyRequesterInput | ConfirmationCreateManyRequesterInput[]
    skipDuplicates?: boolean
  }

  export type DormitoryAdminCreateWithoutUserInput = {
    id?: string
    role: string
    createdAt?: Date | string
    dormitory: DormitoryCreateNestedOneWithoutAdminsInput
  }

  export type DormitoryAdminUncheckedCreateWithoutUserInput = {
    id?: string
    dormitoryId: string
    role: string
    createdAt?: Date | string
  }

  export type DormitoryAdminCreateOrConnectWithoutUserInput = {
    where: DormitoryAdminWhereUniqueInput
    create: XOR<DormitoryAdminCreateWithoutUserInput, DormitoryAdminUncheckedCreateWithoutUserInput>
  }

  export type DormitoryAdminCreateManyUserInputEnvelope = {
    data: DormitoryAdminCreateManyUserInput | DormitoryAdminCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DormitoryCreateWithoutResidentsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    manager?: UserCreateNestedOneWithoutManagedDormitoriesInput
    admins?: DormitoryAdminCreateNestedManyWithoutDormitoryInput
    rooms?: RoomCreateNestedManyWithoutDormitroyInput
  }

  export type DormitoryUncheckedCreateWithoutResidentsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    managerId?: string | null
    admins?: DormitoryAdminUncheckedCreateNestedManyWithoutDormitoryInput
    rooms?: RoomUncheckedCreateNestedManyWithoutDormitroyInput
  }

  export type DormitoryCreateOrConnectWithoutResidentsInput = {
    where: DormitoryWhereUniqueInput
    create: XOR<DormitoryCreateWithoutResidentsInput, DormitoryUncheckedCreateWithoutResidentsInput>
  }

  export type DormitoryCreateWithoutManagerInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    admins?: DormitoryAdminCreateNestedManyWithoutDormitoryInput
    residents?: UserCreateNestedManyWithoutDormitoryInput
    rooms?: RoomCreateNestedManyWithoutDormitroyInput
  }

  export type DormitoryUncheckedCreateWithoutManagerInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    admins?: DormitoryAdminUncheckedCreateNestedManyWithoutDormitoryInput
    residents?: UserUncheckedCreateNestedManyWithoutDormitoryInput
    rooms?: RoomUncheckedCreateNestedManyWithoutDormitroyInput
  }

  export type DormitoryCreateOrConnectWithoutManagerInput = {
    where: DormitoryWhereUniqueInput
    create: XOR<DormitoryCreateWithoutManagerInput, DormitoryUncheckedCreateWithoutManagerInput>
  }

  export type DormitoryCreateManyManagerInputEnvelope = {
    data: DormitoryCreateManyManagerInput | DormitoryCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type RoomCreateWithoutResidentsInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    statuses?: RoomStatusCreateNestedManyWithoutRoomInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutRoomInput
    dormitroy: DormitoryCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateWithoutResidentsInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    dormitoryId: string
    statuses?: RoomStatusUncheckedCreateNestedManyWithoutRoomInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutResidentsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutResidentsInput, RoomUncheckedCreateWithoutResidentsInput>
  }

  export type AnnouncementCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    attachments?: AttachmentCreateNestedManyWithoutAnnouncementInput
    recipients?: AnnouncementRecipientCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    attachments?: AttachmentUncheckedCreateNestedManyWithoutAnnouncementInput
    recipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementCreateOrConnectWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput>
  }

  export type AnnouncementCreateManyAuthorInputEnvelope = {
    data: AnnouncementCreateManyAuthorInput | AnnouncementCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type AnnouncementRecipientCreateWithoutUserInput = {
    id?: string
    floor?: number | null
    forEveryone?: boolean
    announcement: AnnouncementCreateNestedOneWithoutRecipientsInput
    room?: RoomCreateNestedOneWithoutAnnouncementRecipientsInput
  }

  export type AnnouncementRecipientUncheckedCreateWithoutUserInput = {
    id?: string
    announcementId: string
    roomId?: string | null
    floor?: number | null
    forEveryone?: boolean
  }

  export type AnnouncementRecipientCreateOrConnectWithoutUserInput = {
    where: AnnouncementRecipientWhereUniqueInput
    create: XOR<AnnouncementRecipientCreateWithoutUserInput, AnnouncementRecipientUncheckedCreateWithoutUserInput>
  }

  export type AnnouncementRecipientCreateManyUserInputEnvelope = {
    data: AnnouncementRecipientCreateManyUserInput | AnnouncementRecipientCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConfirmationUpsertWithWhereUniqueWithoutRequesterInput = {
    where: ConfirmationWhereUniqueInput
    update: XOR<ConfirmationUpdateWithoutRequesterInput, ConfirmationUncheckedUpdateWithoutRequesterInput>
    create: XOR<ConfirmationCreateWithoutRequesterInput, ConfirmationUncheckedCreateWithoutRequesterInput>
  }

  export type ConfirmationUpdateWithWhereUniqueWithoutRequesterInput = {
    where: ConfirmationWhereUniqueInput
    data: XOR<ConfirmationUpdateWithoutRequesterInput, ConfirmationUncheckedUpdateWithoutRequesterInput>
  }

  export type ConfirmationUpdateManyWithWhereWithoutRequesterInput = {
    where: ConfirmationScalarWhereInput
    data: XOR<ConfirmationUpdateManyMutationInput, ConfirmationUncheckedUpdateManyWithoutRequesterInput>
  }

  export type ConfirmationScalarWhereInput = {
    AND?: ConfirmationScalarWhereInput | ConfirmationScalarWhereInput[]
    OR?: ConfirmationScalarWhereInput[]
    NOT?: ConfirmationScalarWhereInput | ConfirmationScalarWhereInput[]
    id?: StringFilter<"Confirmation"> | string
    type?: EnumConfirmationTypeFilter<"Confirmation"> | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFilter<"Confirmation"> | $Enums.ConfirmationStatus
    createdAt?: DateTimeFilter<"Confirmation"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Confirmation"> | Date | string | null
    userId?: StringFilter<"Confirmation"> | string
    photo?: StringNullableFilter<"Confirmation"> | string | null
    frontIdUrl?: StringNullableFilter<"Confirmation"> | string | null
    backIdUrl?: StringNullableFilter<"Confirmation"> | string | null
  }

  export type DormitoryAdminUpsertWithWhereUniqueWithoutUserInput = {
    where: DormitoryAdminWhereUniqueInput
    update: XOR<DormitoryAdminUpdateWithoutUserInput, DormitoryAdminUncheckedUpdateWithoutUserInput>
    create: XOR<DormitoryAdminCreateWithoutUserInput, DormitoryAdminUncheckedCreateWithoutUserInput>
  }

  export type DormitoryAdminUpdateWithWhereUniqueWithoutUserInput = {
    where: DormitoryAdminWhereUniqueInput
    data: XOR<DormitoryAdminUpdateWithoutUserInput, DormitoryAdminUncheckedUpdateWithoutUserInput>
  }

  export type DormitoryAdminUpdateManyWithWhereWithoutUserInput = {
    where: DormitoryAdminScalarWhereInput
    data: XOR<DormitoryAdminUpdateManyMutationInput, DormitoryAdminUncheckedUpdateManyWithoutUserInput>
  }

  export type DormitoryAdminScalarWhereInput = {
    AND?: DormitoryAdminScalarWhereInput | DormitoryAdminScalarWhereInput[]
    OR?: DormitoryAdminScalarWhereInput[]
    NOT?: DormitoryAdminScalarWhereInput | DormitoryAdminScalarWhereInput[]
    id?: StringFilter<"DormitoryAdmin"> | string
    userId?: StringFilter<"DormitoryAdmin"> | string
    dormitoryId?: StringFilter<"DormitoryAdmin"> | string
    role?: StringFilter<"DormitoryAdmin"> | string
    createdAt?: DateTimeFilter<"DormitoryAdmin"> | Date | string
  }

  export type DormitoryUpsertWithoutResidentsInput = {
    update: XOR<DormitoryUpdateWithoutResidentsInput, DormitoryUncheckedUpdateWithoutResidentsInput>
    create: XOR<DormitoryCreateWithoutResidentsInput, DormitoryUncheckedCreateWithoutResidentsInput>
    where?: DormitoryWhereInput
  }

  export type DormitoryUpdateToOneWithWhereWithoutResidentsInput = {
    where?: DormitoryWhereInput
    data: XOR<DormitoryUpdateWithoutResidentsInput, DormitoryUncheckedUpdateWithoutResidentsInput>
  }

  export type DormitoryUpdateWithoutResidentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    manager?: UserUpdateOneWithoutManagedDormitoriesNestedInput
    admins?: DormitoryAdminUpdateManyWithoutDormitoryNestedInput
    rooms?: RoomUpdateManyWithoutDormitroyNestedInput
  }

  export type DormitoryUncheckedUpdateWithoutResidentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: DormitoryAdminUncheckedUpdateManyWithoutDormitoryNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutDormitroyNestedInput
  }

  export type DormitoryUpsertWithWhereUniqueWithoutManagerInput = {
    where: DormitoryWhereUniqueInput
    update: XOR<DormitoryUpdateWithoutManagerInput, DormitoryUncheckedUpdateWithoutManagerInput>
    create: XOR<DormitoryCreateWithoutManagerInput, DormitoryUncheckedCreateWithoutManagerInput>
  }

  export type DormitoryUpdateWithWhereUniqueWithoutManagerInput = {
    where: DormitoryWhereUniqueInput
    data: XOR<DormitoryUpdateWithoutManagerInput, DormitoryUncheckedUpdateWithoutManagerInput>
  }

  export type DormitoryUpdateManyWithWhereWithoutManagerInput = {
    where: DormitoryScalarWhereInput
    data: XOR<DormitoryUpdateManyMutationInput, DormitoryUncheckedUpdateManyWithoutManagerInput>
  }

  export type DormitoryScalarWhereInput = {
    AND?: DormitoryScalarWhereInput | DormitoryScalarWhereInput[]
    OR?: DormitoryScalarWhereInput[]
    NOT?: DormitoryScalarWhereInput | DormitoryScalarWhereInput[]
    id?: StringFilter<"Dormitory"> | string
    createdAt?: DateTimeFilter<"Dormitory"> | Date | string
    name?: StringFilter<"Dormitory"> | string
    address?: StringFilter<"Dormitory"> | string
    groundFloorPhoneNumber?: StringFilter<"Dormitory"> | string
    status?: StringFilter<"Dormitory"> | string
    photos?: StringNullableListFilter<"Dormitory">
    managerId?: StringNullableFilter<"Dormitory"> | string | null
  }

  export type RoomUpsertWithoutResidentsInput = {
    update: XOR<RoomUpdateWithoutResidentsInput, RoomUncheckedUpdateWithoutResidentsInput>
    create: XOR<RoomCreateWithoutResidentsInput, RoomUncheckedCreateWithoutResidentsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutResidentsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutResidentsInput, RoomUncheckedUpdateWithoutResidentsInput>
  }

  export type RoomUpdateWithoutResidentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    statuses?: RoomStatusUpdateManyWithoutRoomNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutRoomNestedInput
    dormitroy?: DormitoryUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateWithoutResidentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    dormitoryId?: StringFieldUpdateOperationsInput | string
    statuses?: RoomStatusUncheckedUpdateManyWithoutRoomNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type AnnouncementUpsertWithWhereUniqueWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    update: XOR<AnnouncementUpdateWithoutAuthorInput, AnnouncementUncheckedUpdateWithoutAuthorInput>
    create: XOR<AnnouncementCreateWithoutAuthorInput, AnnouncementUncheckedCreateWithoutAuthorInput>
  }

  export type AnnouncementUpdateWithWhereUniqueWithoutAuthorInput = {
    where: AnnouncementWhereUniqueInput
    data: XOR<AnnouncementUpdateWithoutAuthorInput, AnnouncementUncheckedUpdateWithoutAuthorInput>
  }

  export type AnnouncementUpdateManyWithWhereWithoutAuthorInput = {
    where: AnnouncementScalarWhereInput
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyWithoutAuthorInput>
  }

  export type AnnouncementScalarWhereInput = {
    AND?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    OR?: AnnouncementScalarWhereInput[]
    NOT?: AnnouncementScalarWhereInput | AnnouncementScalarWhereInput[]
    id?: StringFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    postedAt?: DateTimeFilter<"Announcement"> | Date | string
    expiresAt?: DateTimeFilter<"Announcement"> | Date | string
    isHidden?: BoolFilter<"Announcement"> | boolean
    authorId?: StringFilter<"Announcement"> | string
  }

  export type AnnouncementRecipientUpsertWithWhereUniqueWithoutUserInput = {
    where: AnnouncementRecipientWhereUniqueInput
    update: XOR<AnnouncementRecipientUpdateWithoutUserInput, AnnouncementRecipientUncheckedUpdateWithoutUserInput>
    create: XOR<AnnouncementRecipientCreateWithoutUserInput, AnnouncementRecipientUncheckedCreateWithoutUserInput>
  }

  export type AnnouncementRecipientUpdateWithWhereUniqueWithoutUserInput = {
    where: AnnouncementRecipientWhereUniqueInput
    data: XOR<AnnouncementRecipientUpdateWithoutUserInput, AnnouncementRecipientUncheckedUpdateWithoutUserInput>
  }

  export type AnnouncementRecipientUpdateManyWithWhereWithoutUserInput = {
    where: AnnouncementRecipientScalarWhereInput
    data: XOR<AnnouncementRecipientUpdateManyMutationInput, AnnouncementRecipientUncheckedUpdateManyWithoutUserInput>
  }

  export type AnnouncementRecipientScalarWhereInput = {
    AND?: AnnouncementRecipientScalarWhereInput | AnnouncementRecipientScalarWhereInput[]
    OR?: AnnouncementRecipientScalarWhereInput[]
    NOT?: AnnouncementRecipientScalarWhereInput | AnnouncementRecipientScalarWhereInput[]
    id?: StringFilter<"AnnouncementRecipient"> | string
    announcementId?: StringFilter<"AnnouncementRecipient"> | string
    userId?: StringNullableFilter<"AnnouncementRecipient"> | string | null
    roomId?: StringNullableFilter<"AnnouncementRecipient"> | string | null
    floor?: IntNullableFilter<"AnnouncementRecipient"> | number | null
    forEveryone?: BoolFilter<"AnnouncementRecipient"> | boolean
  }

  export type UserCreateWithoutDormitoryAdminAssignmentsInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationCreateNestedManyWithoutRequesterInput
    dormitory?: DormitoryCreateNestedOneWithoutResidentsInput
    managedDormitories?: DormitoryCreateNestedManyWithoutManagerInput
    room?: RoomCreateNestedOneWithoutResidentsInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDormitoryAdminAssignmentsInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationUncheckedCreateNestedManyWithoutRequesterInput
    managedDormitories?: DormitoryUncheckedCreateNestedManyWithoutManagerInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDormitoryAdminAssignmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDormitoryAdminAssignmentsInput, UserUncheckedCreateWithoutDormitoryAdminAssignmentsInput>
  }

  export type DormitoryCreateWithoutAdminsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    manager?: UserCreateNestedOneWithoutManagedDormitoriesInput
    residents?: UserCreateNestedManyWithoutDormitoryInput
    rooms?: RoomCreateNestedManyWithoutDormitroyInput
  }

  export type DormitoryUncheckedCreateWithoutAdminsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    managerId?: string | null
    residents?: UserUncheckedCreateNestedManyWithoutDormitoryInput
    rooms?: RoomUncheckedCreateNestedManyWithoutDormitroyInput
  }

  export type DormitoryCreateOrConnectWithoutAdminsInput = {
    where: DormitoryWhereUniqueInput
    create: XOR<DormitoryCreateWithoutAdminsInput, DormitoryUncheckedCreateWithoutAdminsInput>
  }

  export type UserUpsertWithoutDormitoryAdminAssignmentsInput = {
    update: XOR<UserUpdateWithoutDormitoryAdminAssignmentsInput, UserUncheckedUpdateWithoutDormitoryAdminAssignmentsInput>
    create: XOR<UserCreateWithoutDormitoryAdminAssignmentsInput, UserUncheckedCreateWithoutDormitoryAdminAssignmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDormitoryAdminAssignmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDormitoryAdminAssignmentsInput, UserUncheckedUpdateWithoutDormitoryAdminAssignmentsInput>
  }

  export type UserUpdateWithoutDormitoryAdminAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUpdateManyWithoutRequesterNestedInput
    dormitory?: DormitoryUpdateOneWithoutResidentsNestedInput
    managedDormitories?: DormitoryUpdateManyWithoutManagerNestedInput
    room?: RoomUpdateOneWithoutResidentsNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDormitoryAdminAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUncheckedUpdateManyWithoutRequesterNestedInput
    managedDormitories?: DormitoryUncheckedUpdateManyWithoutManagerNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DormitoryUpsertWithoutAdminsInput = {
    update: XOR<DormitoryUpdateWithoutAdminsInput, DormitoryUncheckedUpdateWithoutAdminsInput>
    create: XOR<DormitoryCreateWithoutAdminsInput, DormitoryUncheckedCreateWithoutAdminsInput>
    where?: DormitoryWhereInput
  }

  export type DormitoryUpdateToOneWithWhereWithoutAdminsInput = {
    where?: DormitoryWhereInput
    data: XOR<DormitoryUpdateWithoutAdminsInput, DormitoryUncheckedUpdateWithoutAdminsInput>
  }

  export type DormitoryUpdateWithoutAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    manager?: UserUpdateOneWithoutManagedDormitoriesNestedInput
    residents?: UserUpdateManyWithoutDormitoryNestedInput
    rooms?: RoomUpdateManyWithoutDormitroyNestedInput
  }

  export type DormitoryUncheckedUpdateWithoutAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    residents?: UserUncheckedUpdateManyWithoutDormitoryNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutDormitroyNestedInput
  }

  export type UserCreateWithoutConfirmationsInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dormitoryAdminAssignments?: DormitoryAdminCreateNestedManyWithoutUserInput
    dormitory?: DormitoryCreateNestedOneWithoutResidentsInput
    managedDormitories?: DormitoryCreateNestedManyWithoutManagerInput
    room?: RoomCreateNestedOneWithoutResidentsInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConfirmationsInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dormitoryAdminAssignments?: DormitoryAdminUncheckedCreateNestedManyWithoutUserInput
    managedDormitories?: DormitoryUncheckedCreateNestedManyWithoutManagerInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConfirmationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConfirmationsInput, UserUncheckedCreateWithoutConfirmationsInput>
  }

  export type UserUpsertWithoutConfirmationsInput = {
    update: XOR<UserUpdateWithoutConfirmationsInput, UserUncheckedUpdateWithoutConfirmationsInput>
    create: XOR<UserCreateWithoutConfirmationsInput, UserUncheckedCreateWithoutConfirmationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConfirmationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConfirmationsInput, UserUncheckedUpdateWithoutConfirmationsInput>
  }

  export type UserUpdateWithoutConfirmationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dormitoryAdminAssignments?: DormitoryAdminUpdateManyWithoutUserNestedInput
    dormitory?: DormitoryUpdateOneWithoutResidentsNestedInput
    managedDormitories?: DormitoryUpdateManyWithoutManagerNestedInput
    room?: RoomUpdateOneWithoutResidentsNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConfirmationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dormitoryAdminAssignments?: DormitoryAdminUncheckedUpdateManyWithoutUserNestedInput
    managedDormitories?: DormitoryUncheckedUpdateManyWithoutManagerNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutManagedDormitoriesInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminCreateNestedManyWithoutUserInput
    dormitory?: DormitoryCreateNestedOneWithoutResidentsInput
    room?: RoomCreateNestedOneWithoutResidentsInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutManagedDormitoriesInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationUncheckedCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedCreateNestedManyWithoutUserInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutManagedDormitoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutManagedDormitoriesInput, UserUncheckedCreateWithoutManagedDormitoriesInput>
  }

  export type DormitoryAdminCreateWithoutDormitoryInput = {
    id?: string
    role: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutDormitoryAdminAssignmentsInput
  }

  export type DormitoryAdminUncheckedCreateWithoutDormitoryInput = {
    id?: string
    userId: string
    role: string
    createdAt?: Date | string
  }

  export type DormitoryAdminCreateOrConnectWithoutDormitoryInput = {
    where: DormitoryAdminWhereUniqueInput
    create: XOR<DormitoryAdminCreateWithoutDormitoryInput, DormitoryAdminUncheckedCreateWithoutDormitoryInput>
  }

  export type DormitoryAdminCreateManyDormitoryInputEnvelope = {
    data: DormitoryAdminCreateManyDormitoryInput | DormitoryAdminCreateManyDormitoryInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutDormitoryInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminCreateNestedManyWithoutUserInput
    managedDormitories?: DormitoryCreateNestedManyWithoutManagerInput
    room?: RoomCreateNestedOneWithoutResidentsInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDormitoryInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationUncheckedCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedCreateNestedManyWithoutUserInput
    managedDormitories?: DormitoryUncheckedCreateNestedManyWithoutManagerInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDormitoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDormitoryInput, UserUncheckedCreateWithoutDormitoryInput>
  }

  export type UserCreateManyDormitoryInputEnvelope = {
    data: UserCreateManyDormitoryInput | UserCreateManyDormitoryInput[]
    skipDuplicates?: boolean
  }

  export type RoomCreateWithoutDormitroyInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    statuses?: RoomStatusCreateNestedManyWithoutRoomInput
    residents?: UserCreateNestedManyWithoutRoomInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutDormitroyInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    statuses?: RoomStatusUncheckedCreateNestedManyWithoutRoomInput
    residents?: UserUncheckedCreateNestedManyWithoutRoomInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutDormitroyInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutDormitroyInput, RoomUncheckedCreateWithoutDormitroyInput>
  }

  export type RoomCreateManyDormitroyInputEnvelope = {
    data: RoomCreateManyDormitroyInput | RoomCreateManyDormitroyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutManagedDormitoriesInput = {
    update: XOR<UserUpdateWithoutManagedDormitoriesInput, UserUncheckedUpdateWithoutManagedDormitoriesInput>
    create: XOR<UserCreateWithoutManagedDormitoriesInput, UserUncheckedCreateWithoutManagedDormitoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutManagedDormitoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutManagedDormitoriesInput, UserUncheckedUpdateWithoutManagedDormitoriesInput>
  }

  export type UserUpdateWithoutManagedDormitoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUpdateManyWithoutUserNestedInput
    dormitory?: DormitoryUpdateOneWithoutResidentsNestedInput
    room?: RoomUpdateOneWithoutResidentsNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutManagedDormitoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUncheckedUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedUpdateManyWithoutUserNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DormitoryAdminUpsertWithWhereUniqueWithoutDormitoryInput = {
    where: DormitoryAdminWhereUniqueInput
    update: XOR<DormitoryAdminUpdateWithoutDormitoryInput, DormitoryAdminUncheckedUpdateWithoutDormitoryInput>
    create: XOR<DormitoryAdminCreateWithoutDormitoryInput, DormitoryAdminUncheckedCreateWithoutDormitoryInput>
  }

  export type DormitoryAdminUpdateWithWhereUniqueWithoutDormitoryInput = {
    where: DormitoryAdminWhereUniqueInput
    data: XOR<DormitoryAdminUpdateWithoutDormitoryInput, DormitoryAdminUncheckedUpdateWithoutDormitoryInput>
  }

  export type DormitoryAdminUpdateManyWithWhereWithoutDormitoryInput = {
    where: DormitoryAdminScalarWhereInput
    data: XOR<DormitoryAdminUpdateManyMutationInput, DormitoryAdminUncheckedUpdateManyWithoutDormitoryInput>
  }

  export type UserUpsertWithWhereUniqueWithoutDormitoryInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutDormitoryInput, UserUncheckedUpdateWithoutDormitoryInput>
    create: XOR<UserCreateWithoutDormitoryInput, UserUncheckedCreateWithoutDormitoryInput>
  }

  export type UserUpdateWithWhereUniqueWithoutDormitoryInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutDormitoryInput, UserUncheckedUpdateWithoutDormitoryInput>
  }

  export type UserUpdateManyWithWhereWithoutDormitoryInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutDormitoryInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    displayName?: StringFilter<"User"> | string
    picture?: StringFilter<"User"> | string
    isVerified?: BoolFilter<"User"> | boolean
    isTwoFactorEnabled?: BoolFilter<"User"> | boolean
    method?: EnumAuthMethodFilter<"User"> | $Enums.AuthMethod
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    secondName?: StringFilter<"User"> | string
    studentIdFront?: StringFilter<"User"> | string
    studentIdBack?: StringNullableFilter<"User"> | string | null
    dormitoryId?: StringNullableFilter<"User"> | string | null
    roomId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type RoomUpsertWithWhereUniqueWithoutDormitroyInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutDormitroyInput, RoomUncheckedUpdateWithoutDormitroyInput>
    create: XOR<RoomCreateWithoutDormitroyInput, RoomUncheckedCreateWithoutDormitroyInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutDormitroyInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutDormitroyInput, RoomUncheckedUpdateWithoutDormitroyInput>
  }

  export type RoomUpdateManyWithWhereWithoutDormitroyInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutDormitroyInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: StringFilter<"Room"> | string
    number?: StringFilter<"Room"> | string
    floor?: IntFilter<"Room"> | number
    createdAt?: DateTimeFilter<"Room"> | Date | string
    capacity?: IntFilter<"Room"> | number
    roomEquipment?: StringNullableListFilter<"Room">
    photos?: StringNullableListFilter<"Room">
    dormitoryId?: StringFilter<"Room"> | string
  }

  export type RoomStatusCreateWithoutRoomInput = {
    id?: string
    dateOfStart: Date | string
    dateOfEnd?: Date | string | null
    description: string
  }

  export type RoomStatusUncheckedCreateWithoutRoomInput = {
    id?: string
    dateOfStart: Date | string
    dateOfEnd?: Date | string | null
    description: string
  }

  export type RoomStatusCreateOrConnectWithoutRoomInput = {
    where: RoomStatusWhereUniqueInput
    create: XOR<RoomStatusCreateWithoutRoomInput, RoomStatusUncheckedCreateWithoutRoomInput>
  }

  export type RoomStatusCreateManyRoomInputEnvelope = {
    data: RoomStatusCreateManyRoomInput | RoomStatusCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutRoomInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminCreateNestedManyWithoutUserInput
    dormitory?: DormitoryCreateNestedOneWithoutResidentsInput
    managedDormitories?: DormitoryCreateNestedManyWithoutManagerInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoomInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationUncheckedCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedCreateNestedManyWithoutUserInput
    managedDormitories?: DormitoryUncheckedCreateNestedManyWithoutManagerInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoomInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomInput, UserUncheckedCreateWithoutRoomInput>
  }

  export type UserCreateManyRoomInputEnvelope = {
    data: UserCreateManyRoomInput | UserCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type AnnouncementRecipientCreateWithoutRoomInput = {
    id?: string
    floor?: number | null
    forEveryone?: boolean
    announcement: AnnouncementCreateNestedOneWithoutRecipientsInput
    user?: UserCreateNestedOneWithoutAnnouncementRecipientsInput
  }

  export type AnnouncementRecipientUncheckedCreateWithoutRoomInput = {
    id?: string
    announcementId: string
    userId?: string | null
    floor?: number | null
    forEveryone?: boolean
  }

  export type AnnouncementRecipientCreateOrConnectWithoutRoomInput = {
    where: AnnouncementRecipientWhereUniqueInput
    create: XOR<AnnouncementRecipientCreateWithoutRoomInput, AnnouncementRecipientUncheckedCreateWithoutRoomInput>
  }

  export type AnnouncementRecipientCreateManyRoomInputEnvelope = {
    data: AnnouncementRecipientCreateManyRoomInput | AnnouncementRecipientCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type DormitoryCreateWithoutRoomsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    manager?: UserCreateNestedOneWithoutManagedDormitoriesInput
    admins?: DormitoryAdminCreateNestedManyWithoutDormitoryInput
    residents?: UserCreateNestedManyWithoutDormitoryInput
  }

  export type DormitoryUncheckedCreateWithoutRoomsInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
    managerId?: string | null
    admins?: DormitoryAdminUncheckedCreateNestedManyWithoutDormitoryInput
    residents?: UserUncheckedCreateNestedManyWithoutDormitoryInput
  }

  export type DormitoryCreateOrConnectWithoutRoomsInput = {
    where: DormitoryWhereUniqueInput
    create: XOR<DormitoryCreateWithoutRoomsInput, DormitoryUncheckedCreateWithoutRoomsInput>
  }

  export type RoomStatusUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomStatusWhereUniqueInput
    update: XOR<RoomStatusUpdateWithoutRoomInput, RoomStatusUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomStatusCreateWithoutRoomInput, RoomStatusUncheckedCreateWithoutRoomInput>
  }

  export type RoomStatusUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomStatusWhereUniqueInput
    data: XOR<RoomStatusUpdateWithoutRoomInput, RoomStatusUncheckedUpdateWithoutRoomInput>
  }

  export type RoomStatusUpdateManyWithWhereWithoutRoomInput = {
    where: RoomStatusScalarWhereInput
    data: XOR<RoomStatusUpdateManyMutationInput, RoomStatusUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomStatusScalarWhereInput = {
    AND?: RoomStatusScalarWhereInput | RoomStatusScalarWhereInput[]
    OR?: RoomStatusScalarWhereInput[]
    NOT?: RoomStatusScalarWhereInput | RoomStatusScalarWhereInput[]
    id?: StringFilter<"RoomStatus"> | string
    dateOfStart?: DateTimeFilter<"RoomStatus"> | Date | string
    dateOfEnd?: DateTimeNullableFilter<"RoomStatus"> | Date | string | null
    description?: StringFilter<"RoomStatus"> | string
    roomId?: StringFilter<"RoomStatus"> | string
  }

  export type UserUpsertWithWhereUniqueWithoutRoomInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoomInput, UserUncheckedUpdateWithoutRoomInput>
    create: XOR<UserCreateWithoutRoomInput, UserUncheckedCreateWithoutRoomInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoomInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoomInput, UserUncheckedUpdateWithoutRoomInput>
  }

  export type UserUpdateManyWithWhereWithoutRoomInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoomInput>
  }

  export type AnnouncementRecipientUpsertWithWhereUniqueWithoutRoomInput = {
    where: AnnouncementRecipientWhereUniqueInput
    update: XOR<AnnouncementRecipientUpdateWithoutRoomInput, AnnouncementRecipientUncheckedUpdateWithoutRoomInput>
    create: XOR<AnnouncementRecipientCreateWithoutRoomInput, AnnouncementRecipientUncheckedCreateWithoutRoomInput>
  }

  export type AnnouncementRecipientUpdateWithWhereUniqueWithoutRoomInput = {
    where: AnnouncementRecipientWhereUniqueInput
    data: XOR<AnnouncementRecipientUpdateWithoutRoomInput, AnnouncementRecipientUncheckedUpdateWithoutRoomInput>
  }

  export type AnnouncementRecipientUpdateManyWithWhereWithoutRoomInput = {
    where: AnnouncementRecipientScalarWhereInput
    data: XOR<AnnouncementRecipientUpdateManyMutationInput, AnnouncementRecipientUncheckedUpdateManyWithoutRoomInput>
  }

  export type DormitoryUpsertWithoutRoomsInput = {
    update: XOR<DormitoryUpdateWithoutRoomsInput, DormitoryUncheckedUpdateWithoutRoomsInput>
    create: XOR<DormitoryCreateWithoutRoomsInput, DormitoryUncheckedCreateWithoutRoomsInput>
    where?: DormitoryWhereInput
  }

  export type DormitoryUpdateToOneWithWhereWithoutRoomsInput = {
    where?: DormitoryWhereInput
    data: XOR<DormitoryUpdateWithoutRoomsInput, DormitoryUncheckedUpdateWithoutRoomsInput>
  }

  export type DormitoryUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    manager?: UserUpdateOneWithoutManagedDormitoriesNestedInput
    admins?: DormitoryAdminUpdateManyWithoutDormitoryNestedInput
    residents?: UserUpdateManyWithoutDormitoryNestedInput
  }

  export type DormitoryUncheckedUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: DormitoryAdminUncheckedUpdateManyWithoutDormitoryNestedInput
    residents?: UserUncheckedUpdateManyWithoutDormitoryNestedInput
  }

  export type RoomCreateWithoutStatusesInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    residents?: UserCreateNestedManyWithoutRoomInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutRoomInput
    dormitroy: DormitoryCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateWithoutStatusesInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    dormitoryId: string
    residents?: UserUncheckedCreateNestedManyWithoutRoomInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutStatusesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutStatusesInput, RoomUncheckedCreateWithoutStatusesInput>
  }

  export type RoomUpsertWithoutStatusesInput = {
    update: XOR<RoomUpdateWithoutStatusesInput, RoomUncheckedUpdateWithoutStatusesInput>
    create: XOR<RoomCreateWithoutStatusesInput, RoomUncheckedCreateWithoutStatusesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutStatusesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutStatusesInput, RoomUncheckedUpdateWithoutStatusesInput>
  }

  export type RoomUpdateWithoutStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    residents?: UserUpdateManyWithoutRoomNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutRoomNestedInput
    dormitroy?: DormitoryUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateWithoutStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    dormitoryId?: StringFieldUpdateOperationsInput | string
    residents?: UserUncheckedUpdateManyWithoutRoomNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserCreateWithoutAnnouncementsInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminCreateNestedManyWithoutUserInput
    dormitory?: DormitoryCreateNestedOneWithoutResidentsInput
    managedDormitories?: DormitoryCreateNestedManyWithoutManagerInput
    room?: RoomCreateNestedOneWithoutResidentsInput
    announcementRecipients?: AnnouncementRecipientCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAnnouncementsInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationUncheckedCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedCreateNestedManyWithoutUserInput
    managedDormitories?: DormitoryUncheckedCreateNestedManyWithoutManagerInput
    announcementRecipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAnnouncementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnnouncementsInput, UserUncheckedCreateWithoutAnnouncementsInput>
  }

  export type AttachmentCreateWithoutAnnouncementInput = {
    id?: string
    url: string
    filename: string
  }

  export type AttachmentUncheckedCreateWithoutAnnouncementInput = {
    id?: string
    url: string
    filename: string
  }

  export type AttachmentCreateOrConnectWithoutAnnouncementInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutAnnouncementInput, AttachmentUncheckedCreateWithoutAnnouncementInput>
  }

  export type AttachmentCreateManyAnnouncementInputEnvelope = {
    data: AttachmentCreateManyAnnouncementInput | AttachmentCreateManyAnnouncementInput[]
    skipDuplicates?: boolean
  }

  export type AnnouncementRecipientCreateWithoutAnnouncementInput = {
    id?: string
    floor?: number | null
    forEveryone?: boolean
    user?: UserCreateNestedOneWithoutAnnouncementRecipientsInput
    room?: RoomCreateNestedOneWithoutAnnouncementRecipientsInput
  }

  export type AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput = {
    id?: string
    userId?: string | null
    roomId?: string | null
    floor?: number | null
    forEveryone?: boolean
  }

  export type AnnouncementRecipientCreateOrConnectWithoutAnnouncementInput = {
    where: AnnouncementRecipientWhereUniqueInput
    create: XOR<AnnouncementRecipientCreateWithoutAnnouncementInput, AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput>
  }

  export type AnnouncementRecipientCreateManyAnnouncementInputEnvelope = {
    data: AnnouncementRecipientCreateManyAnnouncementInput | AnnouncementRecipientCreateManyAnnouncementInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAnnouncementsInput = {
    update: XOR<UserUpdateWithoutAnnouncementsInput, UserUncheckedUpdateWithoutAnnouncementsInput>
    create: XOR<UserCreateWithoutAnnouncementsInput, UserUncheckedCreateWithoutAnnouncementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnnouncementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnnouncementsInput, UserUncheckedUpdateWithoutAnnouncementsInput>
  }

  export type UserUpdateWithoutAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUpdateManyWithoutUserNestedInput
    dormitory?: DormitoryUpdateOneWithoutResidentsNestedInput
    managedDormitories?: DormitoryUpdateManyWithoutManagerNestedInput
    room?: RoomUpdateOneWithoutResidentsNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAnnouncementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUncheckedUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedUpdateManyWithoutUserNestedInput
    managedDormitories?: DormitoryUncheckedUpdateManyWithoutManagerNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AttachmentUpsertWithWhereUniqueWithoutAnnouncementInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutAnnouncementInput, AttachmentUncheckedUpdateWithoutAnnouncementInput>
    create: XOR<AttachmentCreateWithoutAnnouncementInput, AttachmentUncheckedCreateWithoutAnnouncementInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutAnnouncementInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutAnnouncementInput, AttachmentUncheckedUpdateWithoutAnnouncementInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutAnnouncementInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutAnnouncementInput>
  }

  export type AttachmentScalarWhereInput = {
    AND?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    OR?: AttachmentScalarWhereInput[]
    NOT?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    id?: StringFilter<"Attachment"> | string
    url?: StringFilter<"Attachment"> | string
    filename?: StringFilter<"Attachment"> | string
    announcementId?: StringFilter<"Attachment"> | string
  }

  export type AnnouncementRecipientUpsertWithWhereUniqueWithoutAnnouncementInput = {
    where: AnnouncementRecipientWhereUniqueInput
    update: XOR<AnnouncementRecipientUpdateWithoutAnnouncementInput, AnnouncementRecipientUncheckedUpdateWithoutAnnouncementInput>
    create: XOR<AnnouncementRecipientCreateWithoutAnnouncementInput, AnnouncementRecipientUncheckedCreateWithoutAnnouncementInput>
  }

  export type AnnouncementRecipientUpdateWithWhereUniqueWithoutAnnouncementInput = {
    where: AnnouncementRecipientWhereUniqueInput
    data: XOR<AnnouncementRecipientUpdateWithoutAnnouncementInput, AnnouncementRecipientUncheckedUpdateWithoutAnnouncementInput>
  }

  export type AnnouncementRecipientUpdateManyWithWhereWithoutAnnouncementInput = {
    where: AnnouncementRecipientScalarWhereInput
    data: XOR<AnnouncementRecipientUpdateManyMutationInput, AnnouncementRecipientUncheckedUpdateManyWithoutAnnouncementInput>
  }

  export type AnnouncementCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    author: UserCreateNestedOneWithoutAnnouncementsInput
    recipients?: AnnouncementRecipientCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    authorId: string
    recipients?: AnnouncementRecipientUncheckedCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementCreateOrConnectWithoutAttachmentsInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutAttachmentsInput, AnnouncementUncheckedCreateWithoutAttachmentsInput>
  }

  export type AnnouncementUpsertWithoutAttachmentsInput = {
    update: XOR<AnnouncementUpdateWithoutAttachmentsInput, AnnouncementUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<AnnouncementCreateWithoutAttachmentsInput, AnnouncementUncheckedCreateWithoutAttachmentsInput>
    where?: AnnouncementWhereInput
  }

  export type AnnouncementUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: AnnouncementWhereInput
    data: XOR<AnnouncementUpdateWithoutAttachmentsInput, AnnouncementUncheckedUpdateWithoutAttachmentsInput>
  }

  export type AnnouncementUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutAnnouncementsNestedInput
    recipients?: AnnouncementRecipientUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    recipients?: AnnouncementRecipientUncheckedUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementCreateWithoutRecipientsInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    author: UserCreateNestedOneWithoutAnnouncementsInput
    attachments?: AttachmentCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementUncheckedCreateWithoutRecipientsInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
    authorId: string
    attachments?: AttachmentUncheckedCreateNestedManyWithoutAnnouncementInput
  }

  export type AnnouncementCreateOrConnectWithoutRecipientsInput = {
    where: AnnouncementWhereUniqueInput
    create: XOR<AnnouncementCreateWithoutRecipientsInput, AnnouncementUncheckedCreateWithoutRecipientsInput>
  }

  export type UserCreateWithoutAnnouncementRecipientsInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminCreateNestedManyWithoutUserInput
    dormitory?: DormitoryCreateNestedOneWithoutResidentsInput
    managedDormitories?: DormitoryCreateNestedManyWithoutManagerInput
    room?: RoomCreateNestedOneWithoutResidentsInput
    announcements?: AnnouncementCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAnnouncementRecipientsInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    confirmations?: ConfirmationUncheckedCreateNestedManyWithoutRequesterInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedCreateNestedManyWithoutUserInput
    managedDormitories?: DormitoryUncheckedCreateNestedManyWithoutManagerInput
    announcements?: AnnouncementUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAnnouncementRecipientsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnnouncementRecipientsInput, UserUncheckedCreateWithoutAnnouncementRecipientsInput>
  }

  export type RoomCreateWithoutAnnouncementRecipientsInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    statuses?: RoomStatusCreateNestedManyWithoutRoomInput
    residents?: UserCreateNestedManyWithoutRoomInput
    dormitroy: DormitoryCreateNestedOneWithoutRoomsInput
  }

  export type RoomUncheckedCreateWithoutAnnouncementRecipientsInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
    dormitoryId: string
    statuses?: RoomStatusUncheckedCreateNestedManyWithoutRoomInput
    residents?: UserUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutAnnouncementRecipientsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutAnnouncementRecipientsInput, RoomUncheckedCreateWithoutAnnouncementRecipientsInput>
  }

  export type AnnouncementUpsertWithoutRecipientsInput = {
    update: XOR<AnnouncementUpdateWithoutRecipientsInput, AnnouncementUncheckedUpdateWithoutRecipientsInput>
    create: XOR<AnnouncementCreateWithoutRecipientsInput, AnnouncementUncheckedCreateWithoutRecipientsInput>
    where?: AnnouncementWhereInput
  }

  export type AnnouncementUpdateToOneWithWhereWithoutRecipientsInput = {
    where?: AnnouncementWhereInput
    data: XOR<AnnouncementUpdateWithoutRecipientsInput, AnnouncementUncheckedUpdateWithoutRecipientsInput>
  }

  export type AnnouncementUpdateWithoutRecipientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutAnnouncementsNestedInput
    attachments?: AttachmentUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementUncheckedUpdateWithoutRecipientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    attachments?: AttachmentUncheckedUpdateManyWithoutAnnouncementNestedInput
  }

  export type UserUpsertWithoutAnnouncementRecipientsInput = {
    update: XOR<UserUpdateWithoutAnnouncementRecipientsInput, UserUncheckedUpdateWithoutAnnouncementRecipientsInput>
    create: XOR<UserCreateWithoutAnnouncementRecipientsInput, UserUncheckedCreateWithoutAnnouncementRecipientsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnnouncementRecipientsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnnouncementRecipientsInput, UserUncheckedUpdateWithoutAnnouncementRecipientsInput>
  }

  export type UserUpdateWithoutAnnouncementRecipientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUpdateManyWithoutUserNestedInput
    dormitory?: DormitoryUpdateOneWithoutResidentsNestedInput
    managedDormitories?: DormitoryUpdateManyWithoutManagerNestedInput
    room?: RoomUpdateOneWithoutResidentsNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAnnouncementRecipientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUncheckedUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedUpdateManyWithoutUserNestedInput
    managedDormitories?: DormitoryUncheckedUpdateManyWithoutManagerNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type RoomUpsertWithoutAnnouncementRecipientsInput = {
    update: XOR<RoomUpdateWithoutAnnouncementRecipientsInput, RoomUncheckedUpdateWithoutAnnouncementRecipientsInput>
    create: XOR<RoomCreateWithoutAnnouncementRecipientsInput, RoomUncheckedCreateWithoutAnnouncementRecipientsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutAnnouncementRecipientsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutAnnouncementRecipientsInput, RoomUncheckedUpdateWithoutAnnouncementRecipientsInput>
  }

  export type RoomUpdateWithoutAnnouncementRecipientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    statuses?: RoomStatusUpdateManyWithoutRoomNestedInput
    residents?: UserUpdateManyWithoutRoomNestedInput
    dormitroy?: DormitoryUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type RoomUncheckedUpdateWithoutAnnouncementRecipientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    dormitoryId?: StringFieldUpdateOperationsInput | string
    statuses?: RoomStatusUncheckedUpdateManyWithoutRoomNestedInput
    residents?: UserUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type ConfirmationCreateManyRequesterInput = {
    id?: string
    type: $Enums.ConfirmationType
    status?: $Enums.ConfirmationStatus
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    photo?: string | null
    frontIdUrl?: string | null
    backIdUrl?: string | null
  }

  export type DormitoryAdminCreateManyUserInput = {
    id?: string
    dormitoryId: string
    role: string
    createdAt?: Date | string
  }

  export type DormitoryCreateManyManagerInput = {
    id?: string
    createdAt?: Date | string
    name: string
    address: string
    groundFloorPhoneNumber: string
    status?: string
    photos?: DormitoryCreatephotosInput | string[]
  }

  export type AnnouncementCreateManyAuthorInput = {
    id?: string
    title: string
    content: string
    postedAt?: Date | string
    expiresAt: Date | string
    isHidden?: boolean
  }

  export type AnnouncementRecipientCreateManyUserInput = {
    id?: string
    announcementId: string
    roomId?: string | null
    floor?: number | null
    forEveryone?: boolean
  }

  export type ConfirmationUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConfirmationTypeFieldUpdateOperationsInput | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    frontIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
    backIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConfirmationUncheckedUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConfirmationTypeFieldUpdateOperationsInput | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    frontIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
    backIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ConfirmationUncheckedUpdateManyWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConfirmationTypeFieldUpdateOperationsInput | $Enums.ConfirmationType
    status?: EnumConfirmationStatusFieldUpdateOperationsInput | $Enums.ConfirmationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photo?: NullableStringFieldUpdateOperationsInput | string | null
    frontIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
    backIdUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DormitoryAdminUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dormitory?: DormitoryUpdateOneRequiredWithoutAdminsNestedInput
  }

  export type DormitoryAdminUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dormitoryId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DormitoryAdminUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dormitoryId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DormitoryUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    admins?: DormitoryAdminUpdateManyWithoutDormitoryNestedInput
    residents?: UserUpdateManyWithoutDormitoryNestedInput
    rooms?: RoomUpdateManyWithoutDormitroyNestedInput
  }

  export type DormitoryUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
    admins?: DormitoryAdminUncheckedUpdateManyWithoutDormitoryNestedInput
    residents?: UserUncheckedUpdateManyWithoutDormitoryNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutDormitroyNestedInput
  }

  export type DormitoryUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    groundFloorPhoneNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    photos?: DormitoryUpdatephotosInput | string[]
  }

  export type AnnouncementUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    attachments?: AttachmentUpdateManyWithoutAnnouncementNestedInput
    recipients?: AnnouncementRecipientUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    attachments?: AttachmentUncheckedUpdateManyWithoutAnnouncementNestedInput
    recipients?: AnnouncementRecipientUncheckedUpdateManyWithoutAnnouncementNestedInput
  }

  export type AnnouncementUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    postedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isHidden?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementRecipientUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
    announcement?: AnnouncementUpdateOneRequiredWithoutRecipientsNestedInput
    room?: RoomUpdateOneWithoutAnnouncementRecipientsNestedInput
  }

  export type AnnouncementRecipientUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementRecipientUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementId?: StringFieldUpdateOperationsInput | string
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DormitoryAdminCreateManyDormitoryInput = {
    id?: string
    userId: string
    role: string
    createdAt?: Date | string
  }

  export type UserCreateManyDormitoryInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateManyDormitroyInput = {
    id?: string
    number: string
    floor: number
    createdAt?: Date | string
    capacity: number
    roomEquipment?: RoomCreateroomEquipmentInput | string[]
    photos?: RoomCreatephotosInput | string[]
  }

  export type DormitoryAdminUpdateWithoutDormitoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDormitoryAdminAssignmentsNestedInput
  }

  export type DormitoryAdminUncheckedUpdateWithoutDormitoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DormitoryAdminUncheckedUpdateManyWithoutDormitoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutDormitoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUpdateManyWithoutUserNestedInput
    managedDormitories?: DormitoryUpdateManyWithoutManagerNestedInput
    room?: RoomUpdateOneWithoutResidentsNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDormitoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUncheckedUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedUpdateManyWithoutUserNestedInput
    managedDormitories?: DormitoryUncheckedUpdateManyWithoutManagerNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutDormitoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUpdateWithoutDormitroyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    statuses?: RoomStatusUpdateManyWithoutRoomNestedInput
    residents?: UserUpdateManyWithoutRoomNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutDormitroyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
    statuses?: RoomStatusUncheckedUpdateManyWithoutRoomNestedInput
    residents?: UserUncheckedUpdateManyWithoutRoomNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutDormitroyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    floor?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    capacity?: IntFieldUpdateOperationsInput | number
    roomEquipment?: RoomUpdateroomEquipmentInput | string[]
    photos?: RoomUpdatephotosInput | string[]
  }

  export type RoomStatusCreateManyRoomInput = {
    id?: string
    dateOfStart: Date | string
    dateOfEnd?: Date | string | null
    description: string
  }

  export type UserCreateManyRoomInput = {
    id?: string
    email: string
    password: string
    displayName: string
    picture: string
    isVerified?: boolean
    isTwoFactorEnabled?: boolean
    method: $Enums.AuthMethod
    role?: $Enums.UserRole
    secondName: string
    studentIdFront: string
    studentIdBack?: string | null
    dormitoryId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementRecipientCreateManyRoomInput = {
    id?: string
    announcementId: string
    userId?: string | null
    floor?: number | null
    forEveryone?: boolean
  }

  export type RoomStatusUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: StringFieldUpdateOperationsInput | string
  }

  export type RoomStatusUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: StringFieldUpdateOperationsInput | string
  }

  export type RoomStatusUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    dateOfStart?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOfEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUpdateManyWithoutUserNestedInput
    dormitory?: DormitoryUpdateOneWithoutResidentsNestedInput
    managedDormitories?: DormitoryUpdateManyWithoutManagerNestedInput
    announcements?: AnnouncementUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmations?: ConfirmationUncheckedUpdateManyWithoutRequesterNestedInput
    dormitoryAdminAssignments?: DormitoryAdminUncheckedUpdateManyWithoutUserNestedInput
    managedDormitories?: DormitoryUncheckedUpdateManyWithoutManagerNestedInput
    announcements?: AnnouncementUncheckedUpdateManyWithoutAuthorNestedInput
    announcementRecipients?: AnnouncementRecipientUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    picture?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isTwoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    method?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    secondName?: StringFieldUpdateOperationsInput | string
    studentIdFront?: StringFieldUpdateOperationsInput | string
    studentIdBack?: NullableStringFieldUpdateOperationsInput | string | null
    dormitoryId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementRecipientUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
    announcement?: AnnouncementUpdateOneRequiredWithoutRecipientsNestedInput
    user?: UserUpdateOneWithoutAnnouncementRecipientsNestedInput
  }

  export type AnnouncementRecipientUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementRecipientUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    announcementId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AttachmentCreateManyAnnouncementInput = {
    id?: string
    url: string
    filename: string
  }

  export type AnnouncementRecipientCreateManyAnnouncementInput = {
    id?: string
    userId?: string | null
    roomId?: string | null
    floor?: number | null
    forEveryone?: boolean
  }

  export type AttachmentUpdateWithoutAnnouncementInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentUncheckedUpdateWithoutAnnouncementInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentUncheckedUpdateManyWithoutAnnouncementInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
  }

  export type AnnouncementRecipientUpdateWithoutAnnouncementInput = {
    id?: StringFieldUpdateOperationsInput | string
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneWithoutAnnouncementRecipientsNestedInput
    room?: RoomUpdateOneWithoutAnnouncementRecipientsNestedInput
  }

  export type AnnouncementRecipientUncheckedUpdateWithoutAnnouncementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AnnouncementRecipientUncheckedUpdateManyWithoutAnnouncementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    floor?: NullableIntFieldUpdateOperationsInput | number | null
    forEveryone?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}