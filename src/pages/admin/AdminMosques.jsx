import ResourceManager from '../../components/admin/ResourceManager'
import { mosquesConfig } from '../../components/admin/resources'

export default function AdminMosques() {
  return <ResourceManager config={mosquesConfig} />
}
