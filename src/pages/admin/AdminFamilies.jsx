import ResourceManager from '../../components/admin/ResourceManager'
import { familiesConfig } from '../../components/admin/resources'

export default function AdminFamilies() {
  return <ResourceManager config={familiesConfig} />
}
