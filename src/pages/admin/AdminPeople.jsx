import ResourceManager from '../../components/admin/ResourceManager'
import { peopleConfig } from '../../components/admin/resources'

export default function AdminPeople() {
  return <ResourceManager config={peopleConfig} />
}
