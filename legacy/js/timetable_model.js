/**
 * Create monthly prayers timetable.
 *
 * @param {GeoPrayerTime} entity The prayer time entity.
 * @param {string} id The element id where the table exists.
 * @param {map} opt_timeNames Optional Array of Prayer Times
 */
TimetableModel = function(entity, id, opt_timeNames)
{
  this.id = id;
  this.entity = entity;
	this.currentDate = new Date();
	this.timeNames = opt_timeNames || entity.getPrayTime().getTimeNames();
  this.monthName = [
      chrome.i18n.getMessage('january'),
      chrome.i18n.getMessage('february'),
      chrome.i18n.getMessage('march'),
      chrome.i18n.getMessage('april'),
      chrome.i18n.getMessage('may'),
      chrome.i18n.getMessage('june'),
      chrome.i18n.getMessage('july'),
      chrome.i18n.getMessage('august'),
      chrome.i18n.getMessage('september'),
      chrome.i18n.getMessage('october'),
      chrome.i18n.getMessage('november'),
      chrome.i18n.getMessage('december'),
  ];
};

/**
 * Display monthly timetable from the given |offset|.
 *
 * @param {number} offset The month offset starting by 0 for January.
 */
TimetableModel.prototype.viewMonth = function(offset)
{
  this.currentDate.setMonth(this.currentDate.getMonth() + 1 * offset);
  var month = this.currentDate.getMonth();
  var year = this.currentDate.getFullYear();
  var title = this._monthFullName(month)+ ' ' + year;
  document.getElementById('table-title').innerHTML = title;
  this._createTable(year, month);
};

/**
 * Create monthly timetable based on todays date.
 *
 * @param {number} year The year to base.
 * @param {month} month The month to base.
 */
TimetableModel.prototype._createTable = function(year, month)
{
  var items = ['Day'];
  if (this.timeNames instanceof Array) {
    items = items.concat(this.timeNames)
  }
  else {
    for (var i in this.timeNames) {
      items.push(i);
    }
  }
  var table = document.getElementById(this.id); 
  var tbody = document.createElement('tbody');
  tbody.appendChild(this._createTableHeader(items));

  var date = new Date(year, month, 1);
  var endDate = new Date(year, month + 1, 1);
  var index = 1;

  while (date < endDate) {
    var times = this.entity.getTimes(date);
    times.day = date.getDate();
    var today = new Date(); 
    var isToday = (date.getMonth() == today.getMonth()) &&
        (date.getDate() == today.getDate());
    var klass = isToday ? 'today-row' : (index & 1) == 0 ?
        'even-row' : 'odd-row';
    tbody.appendChild(this._createTableRow(times, items, klass));
    date.setDate(date.getDate() + 1);  // next day
    index++;
  }
  this._removeAllChild(table);
  table.appendChild(tbody);
};

/**
 * Create the header row.
 * @param {Array<string>} data The headers to print.
 */
TimetableModel.prototype._createTableHeader = function(data)
{
  var timenames = this.entity.getTimeNames();
  //timenames.day = chrome.i18n.getMessage('day');
  var row = document.createElement('tr');
  for (var i in data) {
    var cell = document.createElement('td');
    var cellContents = timenames[data[i].toLowerCase()]
    if (cellContents) {
      cell.innerHTML = cellContents;
    }
    row.appendChild(cell);
  }
  row.className = 'head-row';
  return row;		
};

/**
 * Create a table row given the data.
 * @param {dictionary} data The date to fetch the items.
 * @param {Array<string>} items The items for the given row.
 * @param {string} clazz The classname for the row.
 */
TimetableModel.prototype._createTableRow = function(data, items, clazz)
{
  var row = document.createElement('tr');
  for (var i in items) {
    var cell = document.createElement('td');
    cell.innerHTML = data[items[i].toLowerCase()];
    row.appendChild(cell);
  }
  row.className = clazz;
  return row;		
};

/**
 * Remove all children from a node.
 * @param {Node} node the document element node.
 */
TimetableModel.prototype._removeAllChild = function(node)
{
  if (node == undefined || node == null)
    return;

  while (node.firstChild)
    node.removeChild(node.firstChild);
};

/**
 * Return the month name given its offset, where 0 is January.
 * @param {number} month the offset of the month.
 */
TimetableModel.prototype._monthFullName = function(month)
{
  return this.monthName[month];
};