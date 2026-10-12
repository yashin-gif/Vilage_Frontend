import ResourceManager from '../../components/admin/ResourceManager'
import { institutionsConfig } from '../../components/admin/resources'

export default function AdminInstitutions() {
  return <ResourceManager config={institutionsConfig} />
}
