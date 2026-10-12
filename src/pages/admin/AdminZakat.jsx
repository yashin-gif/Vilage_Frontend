import ResourceManager from '../../components/admin/ResourceManager'
import { zakatConfig } from '../../components/admin/resources'

export default function AdminZakat() {
  return <ResourceManager config={zakatConfig} />
}
