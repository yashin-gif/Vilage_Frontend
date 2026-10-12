import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../common/Button'
import DataState from '../common/DataState'
import Modal from '../common/Modal'
import Pagination from '../common/Pagination'
import SearchInput from '../common/SearchInput'
import ConfirmDelete from './ConfirmDelete'
import ResourceForm from './ResourceForm'
import ResourceTable from './ResourceTable'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useLanguage from '../../hooks/useLanguage'
import usePagedList from '../../hooks/usePagedList'
import { api } from '../../services/api'
import { ADMIN_RESOURCES } from '../../utils/adminConfig'
import { getErrorMessage } from '../../utils/helpers'

const PAGE_SIZE = 20

// একটা রিসোর্সের পুরো CRUD পেজ: পাতা অনুযায়ী দেখা, সার্ভারে খোঁজ, যোগ, সম্পাদনা, মোছা
export default function ResourceManager({ resourceKey }) {
  const { t } = useLanguage()
  const text = t.admin
  const config = ADMIN_RESOURCES[resourceKey]
  const page = text.pages[resourceKey]

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)

  const list = usePagedList(config.path, {
    params: { q: debouncedQuery.trim() },
    pageSize: PAGE_SIZE,
    auth: true,
  })

  const [modal, setModal] = useState(null) // null = বন্ধ, { item: null } = নতুন, { item } = সম্পাদনা
  const [toDelete, setToDelete] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  const columns = config.columns.map((name) => config.fields.find((field) => field.name === name))

  const closeModal = () => {
    setModal(null)
    setFormError('')
  }

  const handleSave = async (payload) => {
    setSaving(true)
    setFormError('')

    try {
      if (modal?.item) {
        await api.patch(`${config.path}${modal.item.id}`, payload, { auth: true })
      } else {
        await api.post(config.path, payload, { auth: true })
      }
      closeModal()
      list.reload()
    } catch (err) {
      setFormError(getErrorMessage(err, t))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setDeleteError('')

    try {
      await api.delete(`${config.path}${toDelete.id}`, { auth: true })
      setToDelete(null)
      list.reload()
    } catch (err) {
      setDeleteError(getErrorMessage(err, t))
    } finally {
      setDeleting(false)
    }
  }

  const searching = debouncedQuery.trim().length > 0
  const isEmpty = list.data.length === 0 && !searching

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{page.title}</h1>
          <p className="mt-1 text-sm text-slate-600">{page.text}</p>
        </div>
        <Button onClick={() => setModal({ item: null })}>
          <Plus size={18} />
          {text.add}
        </Button>
      </div>

      <div className="mt-6">
        <SearchInput value={query} onChange={setQuery} placeholder={page.searchPlaceholder} />
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {list.total} {page.found}
      </p>

      <div className="mt-4">
        <DataState
          loading={list.loading && list.data.length === 0}
          error={list.error}
          isEmpty={isEmpty}
          emptyTitle={page.emptyTitle}
          emptyText={page.emptyText}
          onRetry={list.reload}
        >
          {list.data.length === 0 ? (
            <p className="py-10 text-center text-slate-600">{text.noMatch}</p>
          ) : (
            <div className={list.loading ? 'opacity-60 transition' : 'transition'}>
              <ResourceTable
                columns={columns}
                rows={list.data}
                onEdit={(item) => setModal({ item })}
                onDelete={(item) => {
                  setDeleteError('')
                  setToDelete(item)
                }}
              />
            </div>
          )}
        </DataState>

        <Pagination page={list.page} pages={list.pages} onChange={list.setPage} />
      </div>

      <Modal open={Boolean(modal)} onClose={closeModal} title={modal?.item ? text.editTitle : text.addTitle}>
        {modal && (
          <ResourceForm
            key={modal.item?.id ?? 'new'}
            fields={config.fields}
            initial={modal.item}
            saving={saving}
            error={formError}
            onSubmit={handleSave}
            onCancel={closeModal}
          />
        )}
      </Modal>

      <ConfirmDelete
        open={Boolean(toDelete)}
        name={toDelete ? config.display(toDelete) : ''}
        busy={deleting}
        error={deleteError}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}