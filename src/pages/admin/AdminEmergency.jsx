import ResourceManager from '../../components/admin/ResourceManager'
import { emergencyConfig } from '../../components/admin/resources'

export default function AdminEmergency() {
  return <ResourceManager config={emergencyConfig} />
}
