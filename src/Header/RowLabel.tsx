'use client'

import type { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()
  const row = data?.data
  const n = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

  if (row?.itemType === 'dropdown' && row.dropdownLabel?.trim()) {
    return (
      <div>
        Nav {n}: {row.dropdownLabel.trim()} (lenyíló)
      </div>
    )
  }

  if (row?.link?.label) {
    return (
      <div>
        Nav {n}: {row.link.label}
      </div>
    )
  }

  return <div>Nav {n}</div>
}
