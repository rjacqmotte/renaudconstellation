const assert = require('node:assert/strict');
const test = require('node:test');

const { parseMobilizonICS } = require('../JS/mobilizonParser.js');

function makeCalendar(...events) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0'];

  for (const properties of events) {
    lines.push('BEGIN:VEVENT', ...properties, 'END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return `${lines.join('\r\n')}\r\n`;
}

test('extracts the fields used by the agenda and ignores the description', () => {
  const calendar = makeCalendar([
    'DTSTART;TZID=Europe/Brussels:20261106T093000',
    'DTEND;TZID=Europe/Brussels:20261106T150000',
    'SUMMARY:Journée de constellation',
    'LOCATION:Trois Tilleuls  1170 Bruxelles',
    'URL:https://mobilizon.be/events/example',
    'DESCRIPTION:Texte qui ne doit pas être utilisé'
  ]);

  const [event] = parseMobilizonICS(calendar);

  assert.equal(event.summary, 'Journée de constellation');
  assert.equal(event.location, 'Trois Tilleuls 1170 Bruxelles');
  assert.equal(event.url, 'https://mobilizon.be/events/example');
  assert.equal(event.dtstart.getFullYear(), 2026);
  assert.equal(event.dtstart.getMonth(), 10);
  assert.equal(event.dtstart.getDate(), 6);
  assert.equal(event.dtstart.getHours(), 9);
  assert.equal(event.dtstart.getMinutes(), 30);
  assert.equal(event.dtend.getHours(), 15);
  assert.equal(event.dtend.getMinutes(), 0);
  assert.equal('description' in event, false);
});

test('keeps Brussels wall-clock hours before and after the daylight-saving change', () => {
  const calendar = makeCalendar(
    [
      'DTSTART;TZID=Europe/Brussels:20260327T093000',
      'DTEND;TZID=Europe/Brussels:20260327T103000',
      'SUMMARY:Avant le changement',
      'LOCATION:Bruxelles',
      'URL:https://mobilizon.be/events/before'
    ],
    [
      'DTSTART;TZID=Europe/Brussels:20260330T093000',
      'DTEND;TZID=Europe/Brussels:20260330T103000',
      'SUMMARY:Après le changement',
      'LOCATION:Bruxelles',
      'URL:https://mobilizon.be/events/after'
    ]
  );

  const events = parseMobilizonICS(calendar);

  assert.deepEqual(events.map(event => event.dtstart.getHours()), [9, 9]);
  assert.notEqual(events[0].dtstart.getTimezoneOffset(), events[1].dtstart.getTimezoneOffset());
});

test('unfolds continued lines and unescapes calendar text', () => {
  const calendar = makeCalendar([
    'DTSTART;TZID=Europe/Brussels:20261106T093000',
    'SUMMARY:Atelier de constellations\\, groupe \r\n familial',
    'LOCATION:Trois Tilleuls\\, Bruxelles',
    'URL:https://mobilizon.be/events/example'
  ]);

  const [event] = parseMobilizonICS(calendar);

  assert.equal(event.summary, 'Atelier de constellations, groupe familial');
  assert.equal(event.location, 'Trois Tilleuls, Bruxelles');
});

test('preserves missing required fields for the agenda to report', () => {
  const calendar = makeCalendar([
    'DTSTART;TZID=Europe/Brussels:20261106T093000',
    'SUMMARY:Événement incomplet',
    'URL:https://mobilizon.be/events/incomplete'
  ]);

  const [event] = parseMobilizonICS(calendar);

  assert.equal(event.dtend, null);
  assert.equal(event.location, null);
  assert.equal(event.url, 'https://mobilizon.be/events/incomplete');
});

test('returns no events for an empty or invalid calendar', () => {
  assert.deepEqual(parseMobilizonICS(''), []);
  assert.deepEqual(parseMobilizonICS('not an iCalendar file'), []);
});