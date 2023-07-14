import { Status } from '@/features/profile/domain/entities/profile-request'

export class CreateUserInputDTO {
  email: string
  name: string
  lastName?: string
  password: string
  city: string
  state: string
  status: Status
  role: string
}
