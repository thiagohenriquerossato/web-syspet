import { Tutor } from './tutor';
export type Animal = {
  id: string
  species: string
  name: string
  weight: number
  breed: string
  gender: string
  avatar: string | null
  pre_existing_diseases: string[]
  created_at: Date
  updated_at: Date
  birth: Date
  tutor_id: string
  tutor: Tutor;
}