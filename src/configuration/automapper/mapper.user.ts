import { User } from '@/features/user/domain/entities/user'
import { UserModel } from '@/features/user/infra/database/user.model'
import { GetUserOutputDTO } from '@/features/user/presentation/dto/get-user-output.dto'
import { UpdateUserOutputDTO } from '@/features/user/presentation/dto/update-user-output.dto'
import { classes } from '@automapper/classes'
import { createMapper, mapFrom } from '@automapper/core'

export const userMapper = createMapper({
  name: 'user',
  pluginInitializer: classes
})

userMapper
  .createMap(User, UpdateUserOutputDTO)
  .forMember(
    (dst) => dst.name,
    mapFrom((src) => src.name)
  )
  .forMember(
    (dst) => dst.email,
    mapFrom((src) => src.email)
  )
  .forMember(
    (dst) => dst.city,
    mapFrom((src) => src.city)
  )
  .forMember(
    (dst) => dst.state,
    mapFrom((src) => src.state)
  )
  .forMember(
    (dst) => dst.role,
    mapFrom((src) => src.role)
  )
  .forMember(
    (dst) => dst.status,
    mapFrom((src) => src.status)
  )

userMapper
  .createMap(User, GetUserOutputDTO)
  .forMember(
    (dst) => dst.id,
    mapFrom((src) => src.id)
  )
  .forMember(
    (dst) => dst.name,
    mapFrom((src) => src.name)
  )
  .forMember(
    (dst) => dst.lastName,
    mapFrom((src) => src.lastName)
  )
  .forMember(
    (dst) => dst.email,
    mapFrom((src) => src.email)
  )
  .forMember(
    (dst) => dst.city,
    mapFrom((src) => src.city)
  )
  .forMember(
    (dst) => dst.state,
    mapFrom((src) => src.state)
  )
  .forMember(
    (dst) => dst.role,
    mapFrom((src) => src.role)
  )
  .forMember(
    (dst) => dst.status,
    mapFrom((src) => src.status)
  )

userMapper
  .createMap(UserModel, User)
  .forMember(
    (dst) => dst.id,
    mapFrom((src) => src.id)
  )
  .forMember(
    (dst) => dst.name,
    mapFrom((src) => src.name)
  )
