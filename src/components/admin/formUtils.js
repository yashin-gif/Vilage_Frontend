// অ্যাডমিন ফর্মের ছোট সাহায্যকারী ফাংশন (ফর্মের ঘর, যাচাই, সার্ভারে পাঠানোর তথ্য)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// সম্পাদনার সময় আগের মান, নতুনের সময় ডিফল্ট মান
export function getInitialValues(fields, row) {
  const values = {}

  for (const field of fields) {
    const current = row?.[field.name]

    if (field.type === 'checkbox') {
      values[field.name] = row ? Boolean(current) : Boolean(field.defaultValue)
    } else if (current === null || current === undefined) {
      values[field.name] = row ? '' : (field.defaultValue ?? '')
    } else if (field.type === 'date') {
      values[field.name] = String(current).slice(0, 10)
    } else {
      values[field.name] = String(current)
    }
  }

  return values
}

// ভুল থাকলে { ঘরের নাম: বার্তা } ফেরত দেয়, না থাকলে খালি অবজেক্ট
export function validateValues(fields, values, t) {
  const text = t.admin.common
  const errors = {}

  for (const field of fields) {
    if (field.type === 'checkbox') continue

    const value = String(values[field.name] ?? '').trim()

    if (!value) {
      if (field.required) errors[field.name] = text.required
      continue
    }

    if (field.minLength && value.length < field.minLength) {
      errors[field.name] = text.tooShort.replace('{n}', field.minLength)
    } else if (field.maxLength && value.length > field.maxLength) {
      errors[field.name] = text.tooLong.replace('{n}', field.maxLength)
    } else if (field.type === 'email' && !EMAIL_PATTERN.test(value)) {
      errors[field.name] = t.auth.validation.emailInvalid
    } else if (field.type === 'number') {
      const number = Number(value)

      if (!Number.isFinite(number) || (field.min !== undefined && number < field.min)) {
        errors[field.name] = text.invalidNumber
      }
    }
  }

  return errors
}

// সার্ভারে পাঠানোর তথ্য: খালি ঘর null, সংখ্যা সংখ্যা, টিক বুলিয়ান
export function buildPayload(fields, values) {
  const payload = {}

  for (const field of fields) {
    const raw = values[field.name]

    if (field.type === 'checkbox') {
      payload[field.name] = Boolean(raw)
      continue
    }

    const value = String(raw ?? '').trim()

    if (!value) {
      // যেমন পাসওয়ার্ড: খালি থাকলে একেবারেই পাঠাই না
      if (!field.omitIfEmpty) payload[field.name] = null
      continue
    }

    payload[field.name] =
      field.type === 'number' || field.type === 'relation' ? Number(value) : value
  }

  return payload
}