import moment from 'moment'
import 'moment/locale/cs'
import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Routes } from '../../containers/routes'
import { CalendarWrapper } from './styled'

const localizer = momentLocalizer(moment)

const messages = {
  previous: '<',
  next: '>',
  today: 'Dnes',
  month: 'Měsíc',
  week: 'Týden',
  day: 'Den',
  showMore: total => `+ ${total} další`
}

const BigCalendar = ({ events, history }) => {
  const handleSlotSelect = ({ start, end, action }) => {
    if (action === 'select') {
      setTimeout(() => {
        history.push({
          pathname: Routes.REQUISITION.path,
          state: {
            start,
            end
          }
        })
      }, 0)
    }
  }

  const handleEventSelect = event => {
    history.push(`${Routes.REQUISITION.path}/${event.id}`)
  }

  const eventStyleGetter = event => {
    return {
      style: {
        backgroundColor: event.color
      }
    }
  }
  const dayStyleGetter = date => {
    return {
      style: {
        backgroundColor: moment().isSame(date, 'day') && '#e2dcf5'
      }
    }
  }

  const adjustedEvents = events.map(event => {
    return {
      id: event._id,
      color: event.car.color,
      title: `${event.car.name} - ${event.driver.lastName}`,
      start: moment(event.startDate).toDate(),
      end: moment(event.endDate)
        .add(1, 'minute')
        .toDate()
    }
  })

  return (
    <CalendarWrapper>
      <Calendar
        selectable
        localizer={localizer}
        culture="cs"
        events={adjustedEvents}
        defaultView="week"
        views={['month', 'week', 'day']}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventSelect}
        min={moment({ hour: 6 }).toDate()}
        max={moment({ hour: 18 }).toDate()}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayStyleGetter}
        messages={messages}
        step={15}
      />
    </CalendarWrapper>
  )
}

export default BigCalendar
