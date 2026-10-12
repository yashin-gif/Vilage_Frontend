import Button from './Button'
import Modal from './Modal'
import useLanguage from '../../hooks/useLanguage'

// "নিশ্চিত?" ধরনের জিজ্ঞাসা — মোছার আগে ব্যবহার হয়
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  busy = false,
}) {
  const { t } = useLanguage()

  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="leading-7 text-slate-600">{message}</p>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={busy}>
          {t.ui.cancel}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={busy}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}