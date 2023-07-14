import { Status } from '@/features/profile/domain/entities/profile-request'

export class UpdateUserInputDTO {
  id?: string
  email?: string
  name?: string
  lastName?: string
  password?: string
  status: Status
  role?: string
}
