'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { DateRange } from 'react-day-picker'

import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useOrdersFilters } from '../../store/filters'

export const DateFilter = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const dateFrom = useOrdersFilters((state) => state.filters.dateFrom)
  const dateTo = useOrdersFilters((state) => state.filters.dateTo)
  const setFilter = useOrdersFilters((state) => state.setFilter)

  const onChange = (date: DateRange | undefined) => {
    if (date?.from == null) return

    setFilter({ key: 'dateFrom', value: date.from })
    if (date.to != null) {
      const endDate = new Date(date.to)
      endDate.setHours(23, 59, 59)
      setFilter({ key: 'dateTo', value: endDate })
    } else {
      const endDate = new Date(date.from)
      endDate.setHours(23, 59, 59)
      setFilter({ key: 'dateTo', value: endDate })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id='date'
          variant='outline'
          className={cn(
            'w-[300px] justify-start text-left font-normal',
            !dateFrom && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {dateFrom ? (
            dateTo ? (
              <>
                {formatDate(dateFrom)} - {formatDate(dateTo)}
              </>
            ) : (
              formatDate(dateFrom)
            )
          ) : (
            <span>Selecciona una fecha...</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          initialFocus
          captionLayout='dropdown'
          mode='range'
          selected={{
            from: dateFrom,
            to: dateTo,
          }}
          onSelect={(date) => onChange(date)}
          fromYear={2020}
          toYear={2025}
        />
      </PopoverContent>
    </Popover>
  )
}
