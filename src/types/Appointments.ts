import { Animal } from './animal';
export type Appointment = {
  id: string
  animal_id: string
  date: Date
  type: string
  is_canceld: boolean
  created_at: Date
  updated_at: Date
  animal: Animal
}