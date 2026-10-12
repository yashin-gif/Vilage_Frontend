import ResourceManager from '../../components/admin/ResourceManager'
import { placesConfig } from '../../components/admin/resources'

export default function AdminPlaces() {
  return <ResourceManager config={placesConfig} />
}
