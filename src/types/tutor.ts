import { Animal } from "./animal";

export type Tutor = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  avatar: string | null
  animals: Animal[]
}