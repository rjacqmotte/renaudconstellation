const MOBILIZON_PROPERTIES = new Set(['DTSTART', 'DTEND', 'SUMMARY', 'LOCATION', 'URL']);

function unfoldCalendarLines(text) {
  return String(text).replace(/\r\n[ \t]|\n[ \t]|\r[ \t]/g, '');
}

function parseCalendarDate(property) {
  if (!property) return { date: null, hasTime: false };

  const value = property.value;
  const dateOnly = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (dateOnly) {
    const date = new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
    if (date.getFullYear() !== Number(dateOnly[1]) || date.getMonth() !== Number(dateOnly[2]) - 1 || date.getDate() !== Number(dateOnly[3])) {
      return { date: null, hasTime: false };
    }
    return { date, hasTime: false };
  }

  const dateTime = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z)?$/);
  if (!dateTime) return { date: null, hasTime: false };

  const [, year, month, day, hour, minute, second = '00', utc] = dateTime;
  const date = utc
    ? new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`)
    : new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));

  if (Number.isNaN(date.getTime())) return { date: null, hasTime: false };
  if (!utc && (date.getFullYear() !== Number(year) || date.getMonth() !== Number(month) - 1 || date.getDate() !== Number(day) || date.getHours() !== Number(hour) || date.getMinutes() !== Number(minute))) {
    return { date: null, hasTime: false };
  }

  return { date, hasTime: true };
}

function unescapeCalendarText(value) {
  return value
    .replace(/\\n/gi, ' ')
    .replace(/\\([,;\\])/g, '$1')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function parseCalendarEvent(lines) {
  const properties = {};

  for (const line of lines) {
    const separator = line.indexOf(':');
    if (separator < 0) continue;

    const propertyName = line.slice(0, separator).split(';', 1)[0].toUpperCase();
    if (!MOBILIZON_PROPERTIES.has(propertyName) || properties[propertyName]) continue;

    properties[propertyName] = {
      value: line.slice(separator + 1).trim(),
      parameters: line.slice(propertyName.length, separator)
    };
  }

  const start = parseCalendarDate(properties.DTSTART);
  const end = parseCalendarDate(properties.DTEND);

  return {
    summary: properties.SUMMARY ? unescapeCalendarText(properties.SUMMARY.value) : null,
    dtstart: start.date,
    dtstartHasTime: start.hasTime,
    dtend: end.date,
    dtendHasTime: end.hasTime,
    location: properties.LOCATION ? unescapeCalendarText(properties.LOCATION.value) : null,
    url: properties.URL ? properties.URL.value : null
  };
}

function parseMobilizonICS(text) {
  const lines = unfoldCalendarLines(text).split(/\r\n|\n|\r/);
  const events = [];
  let eventLines = null;

  for (const line of lines) {
    const marker = line.trim().toUpperCase();
    if (marker === 'BEGIN:VEVENT') {
      eventLines = [];
    } else if (marker === 'END:VEVENT' && eventLines) {
      events.push(parseCalendarEvent(eventLines));
      eventLines = null;
    } else if (eventLines) {
      eventLines.push(line);
    }
  }

  return events;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseMobilizonICS };
}