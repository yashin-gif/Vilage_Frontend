import { BLOOD_GROUPS } from '../../utils/constants'
import { getFullName } from '../../utils/helpers'
import { RoleSelect, StatusToggle } from './UserControls'

// প্রতিটা অ্যাডমিন পেজ এখানে একটা কনফিগ। লেখা (লেবেল) এখানে নেই —
// ঘরের নাম থেকে locales/*.admin.js এর t.admin.fields[নাম] নিয়ে দেখায়।
//
// columns: type = bool | date | option | lookup | truncate (না দিলে সাধারণ লেখা)
// fields : type = text | email | tel | password | number | date | textarea | checkbox | select | relation

const familyLookup = {
  source: '/families/',
  label: (family) => `${family.family_code} — ${family.head_name}`,
}

const personLookup = {
  source: '/people/',
  label: (person) => getFullName(person),
}

function renderPersonFlags(row, { t }) {
  const flags = [
    ['is_widow', 'bg-rose-50 text-rose-700'],
    ['is_disabled', 'bg-amber-50 text-amber-700'],
    ['needs_assistance', 'bg-sky-50 text-sky-700'],
  ].filter(([key]) => row[key])

  if (flags.length === 0) return '—'

  return (
    <div className="flex flex-wrap gap-1.5">
      {flags.map(([key, style]) => (
        <span key={key} className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${style}`}>
          {t.admin.fields[key]}
        </span>
      ))}
    </div>
  )
}

export const usersConfig = {
  key: 'users',
  endpoint: '/admin/users',
  itemPath: (row) => `/admin/users/${row.id}`,
  canCreate: false,
  canDeleteRow: (row, { currentUser }) => row.id !== currentUser.id,
  searchKeys: ['username', 'email', 'phone'],
  columns: [
    { key: 'username' },
    { key: 'email' },
    { key: 'phone' },
    { key: 'role', render: (row, ctx) => <RoleSelect row={row} ctx={ctx} /> },
    {
      key: 'is_active',
      labelKey: 'status',
      render: (row, ctx) => <StatusToggle row={row} ctx={ctx} />,
    },
    { key: 'created_at', type: 'date' },
  ],
  fields: [
    { name: 'username', type: 'text', required: true, minLength: 3, maxLength: 50 },
    { name: 'email', type: 'email', required: true, maxLength: 120 },
    { name: 'phone', type: 'tel', required: true, minLength: 6, maxLength: 20 },
    {
      name: 'password',
      type: 'password',
      minLength: 6,
      maxLength: 100,
      omitIfEmpty: true,
      hint: 'passwordHint',
    },
  ],
}

export const peopleConfig = {
  key: 'people',
  endpoint: '/people/',
  lookups: { families: familyLookup },
  searchKeys: ['first_name', 'last_name', 'phone', 'occupation', 'current_location'],
  filters: ['is_widow', 'is_disabled', 'needs_assistance', 'is_blood_donor'],
  columns: [
    { key: 'full_name', labelKey: 'name', render: (row) => getFullName(row) },
    { key: 'family_id', type: 'lookup', lookup: 'families' },
    { key: 'phone' },
    { key: 'blood_group' },
    { key: 'occupation' },
    { key: 'flags', labelKey: 'status', render: renderPersonFlags },
  ],
  fields: [
    { name: 'family_id', type: 'relation', lookup: 'families', required: true },
    { name: 'first_name', type: 'text', required: true, maxLength: 100 },
    { name: 'last_name', type: 'text', maxLength: 100 },
    { name: 'gender', type: 'select', options: 'gender' },
    { name: 'date_of_birth', type: 'date' },
    { name: 'phone', type: 'tel', maxLength: 20 },
    { name: 'blood_group', type: 'select', options: BLOOD_GROUPS },
    { name: 'occupation', type: 'text', maxLength: 100 },
    { name: 'current_location', type: 'text', maxLength: 255 },
    { name: 'is_disabled', type: 'checkbox' },
    { name: 'is_widow', type: 'checkbox' },
    { name: 'needs_assistance', type: 'checkbox' },
    { name: 'is_blood_donor', type: 'checkbox' },
  ],
}

export const familiesConfig = {
  key: 'families',
  endpoint: '/families/',
  searchKeys: ['family_code', 'head_name', 'village', 'address', 'phone'],
  columns: [
    { key: 'family_code' },
    { key: 'head_name' },
    { key: 'village' },
    { key: 'address' },
    { key: 'phone' },
  ],
  fields: [
    { name: 'family_code', type: 'text', required: true, maxLength: 30 },
    { name: 'head_name', type: 'text', required: true, maxLength: 150 },
    { name: 'village', type: 'text', required: true, maxLength: 100 },
    { name: 'address', type: 'text', maxLength: 255 },
    { name: 'phone', type: 'tel', maxLength: 20 },
  ],
}

export const bloodConfig = {
  key: 'blood',
  endpoint: '/blood/',
  lookups: { people: personLookup },
  filters: ['is_available'],
  columns: [
    { key: 'person_id', type: 'lookup', lookup: 'people' },
    { key: 'blood_group' },
    { key: 'is_available', type: 'bool' },
    { key: 'last_donation_date', type: 'date' },
  ],
  fields: [
    { name: 'person_id', type: 'relation', lookup: 'people', required: true },
    { name: 'blood_group', type: 'select', options: BLOOD_GROUPS, required: true },
    { name: 'is_available', type: 'checkbox', defaultValue: true },
    { name: 'last_donation_date', type: 'date' },
    { name: 'notes', type: 'textarea', maxLength: 500 },
  ],
}

export const mosquesConfig = {
  key: 'mosques',
  endpoint: '/mosques/',
  searchKeys: ['name', 'address', 'imam_name', 'contact_phone'],
  columns: [
    { key: 'name' },
    { key: 'address' },
    { key: 'imam_name' },
    { key: 'contact_phone' },
  ],
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 200 },
    { name: 'address', type: 'text', maxLength: 255 },
    { name: 'imam_name', type: 'text', maxLength: 150 },
    { name: 'contact_phone', type: 'tel', maxLength: 20 },
    { name: 'description', type: 'textarea', maxLength: 1000 },
    { name: 'latitude', type: 'text', maxLength: 50 },
    { name: 'longitude', type: 'text', maxLength: 50 },
  ],
}

export const institutionsConfig = {
  key: 'institutions',
  endpoint: '/institutions/',
  searchKeys: ['name', 'institution_type', 'address', 'phone'],
  columns: [
    { key: 'name' },
    { key: 'institution_type', type: 'option', options: 'institution_type' },
    { key: 'address' },
    { key: 'phone' },
  ],
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 200 },
    { name: 'institution_type', type: 'select', options: 'institution_type', required: true },
    { name: 'address', type: 'text', maxLength: 255 },
    { name: 'phone', type: 'tel', maxLength: 20 },
    { name: 'description', type: 'textarea', maxLength: 1000 },
    { name: 'latitude', type: 'number' },
    { name: 'longitude', type: 'number' },
  ],
}

export const placesConfig = {
  key: 'places',
  endpoint: '/places/',
  searchKeys: ['name', 'place_type', 'address'],
  columns: [
    { key: 'name' },
    { key: 'place_type', type: 'option', options: 'place_type' },
    { key: 'address' },
  ],
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 200 },
    { name: 'place_type', type: 'select', options: 'place_type', required: true },
    { name: 'address', type: 'text', maxLength: 255 },
    { name: 'description', type: 'textarea', maxLength: 1000 },
    { name: 'latitude', type: 'text', maxLength: 50 },
    { name: 'longitude', type: 'text', maxLength: 50 },
  ],
}

export const newsConfig = {
  key: 'news',
  endpoint: '/news/',
  searchKeys: ['title', 'content'],
  columns: [
    { key: 'title', type: 'truncate' },
    { key: 'is_published', type: 'bool' },
    { key: 'created_at', type: 'date' },
  ],
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 250 },
    { name: 'content', type: 'textarea', required: true },
    { name: 'is_published', type: 'checkbox', defaultValue: true },
  ],
}

export const announcementsConfig = {
  key: 'announcements',
  endpoint: '/announcements/',
  searchKeys: ['title', 'content'],
  columns: [
    { key: 'title', type: 'truncate' },
    { key: 'is_active', type: 'bool' },
    { key: 'created_at', type: 'date' },
  ],
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 250 },
    { name: 'content', type: 'textarea', required: true },
    { name: 'is_active', type: 'checkbox', defaultValue: true },
  ],
}

export const emergencyConfig = {
  key: 'emergency',
  endpoint: '/emergency/',
  searchKeys: ['title', 'description', 'location'],
  columns: [
    { key: 'title', type: 'truncate' },
    { key: 'emergency_type', type: 'option', options: 'emergency_type' },
    { key: 'status', type: 'option', options: 'emergency_status' },
    { key: 'created_at', type: 'date' },
  ],
  fields: [
    { name: 'emergency_type', type: 'select', options: 'emergency_type', required: true },
    { name: 'title', type: 'text', required: true, maxLength: 200 },
    { name: 'description', type: 'textarea', required: true },
    { name: 'contact_phone', type: 'tel', maxLength: 20 },
    { name: 'location', type: 'text', maxLength: 255 },
    {
      name: 'status',
      type: 'select',
      options: 'emergency_status',
      required: true,
      defaultValue: 'active',
    },
  ],
}

export const helpConfig = {
  key: 'help',
  endpoint: '/help-requests/',
  lookups: { people: personLookup },
  canCreate: false,
  searchKeys: ['title', 'description'],
  columns: [
    { key: 'title', type: 'truncate' },
    { key: 'request_type', type: 'option', options: 'request_type' },
    { key: 'person_id', type: 'lookup', lookup: 'people' },
    { key: 'status', type: 'option', options: 'help_status' },
    { key: 'created_at', type: 'date' },
  ],
  fields: [
    { name: 'person_id', type: 'relation', lookup: 'people' },
    { name: 'request_type', type: 'select', options: 'request_type', required: true },
    { name: 'title', type: 'text', required: true, maxLength: 200 },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      options: 'help_status',
      required: true,
      defaultValue: 'pending',
    },
  ],
}

export const zakatConfig = {
  key: 'zakat',
  endpoint: '/zakat/',
  lookups: { people: personLookup },
  searchKeys: ['description'],
  filters: [],
  columns: [
    { key: 'person_id', type: 'lookup', lookup: 'people' },
    { key: 'record_type', type: 'option', options: 'record_type' },
    { key: 'amount' },
    { key: 'status', type: 'option', options: 'zakat_status' },
    { key: 'created_at', type: 'date' },
  ],
  fields: [
    { name: 'person_id', type: 'relation', lookup: 'people' },
    { name: 'record_type', type: 'select', options: 'record_type', required: true },
    { name: 'amount', type: 'number', min: 0 },
    { name: 'description', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      options: 'zakat_status',
      required: true,
      defaultValue: 'pending',
    },
  ],
}