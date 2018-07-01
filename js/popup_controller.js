/**
 * Popup Controller.
 *
 * @constructor
 */
PopupController = function()
{
  this.bkg = chrome.extension.getBackgroundPage();
  this.entity = this.bkg.controller.getPrayerEntity();
  this.islamicDate = new IslamicDate();
};

/**
 * Initialize View.
 */
PopupController.prototype.init = function()
{
  this.translateView();
  this.showCurrentTime();
  this.showCurrentDate();
  this.showPrayerTime();
  this.bindViewTimetable();
};

/**
 * Translate the view.
 */
PopupController.prototype.translateView = function()
{
  // Set bidi direction.
  document.body.dir = chrome.i18n.getMessage('@@bidi_dir');
  
  // Labels.
  $('error').innerHTML =
      chrome.i18n.getMessage('fetchingGeolocation') + '<br />' + 
      chrome.i18n.getMessage('pleaseWait') + '!';
  $('view_timetable').innerHTML = chrome.i18n.getMessage('viewTimetable');
};

/**
 * Show prayer time. It will keep trying until some location is present.
 */
PopupController.prototype.showPrayerTime = function()
{ 
  if (!this.entity.isLoaded()) {
    var html = '';
    $('error').style.display = 'block';
    $('footer').style.display = 'none';
    window.setTimeout(() => this.showPrayerTime(), 1000);
  }
  else {
    $('error').style.display = 'none';
    $('footer').style.display = 'block';
    var times = this.entity.getTimes();
    var timenames = this.entity.getTimeNames();
    var list = this.bkg.settings.timenames;
    var tableContentDOM = '';
    for(var i in list) {
      var listItem = list[i].toLowerCase();
      tableContentDOM += '<tr><td>'+ timenames[listItem] + '</td>';
      tableContentDOM += '<td>'+ times[listItem] + '</td></tr>';
    }
    $('timetable').innerHTML = tableContentDOM;
  }
};

/**
 * Show live time.
 */
PopupController.prototype.showCurrentTime = function()
{
  var date = new Date();
  var timeElt = $('time');
  timeElt.innerHTML = date.toLocaleTimeString();
  window.setTimeout(() => this.showCurrentTime(), 1000);
};

/**
 * Show current date.
 */
PopupController.prototype.showCurrentDate = function()
{
  var date = new Date();
  var dateString = date.toLocaleDateString();
  // var index = dateString.indexOf(',');
  // $('dateA').innerHTML = dateString.substring(0, index);
  $('dateB').innerHTML = dateString.substring(0, dateString.length);
  $('dateH').innerHTML = this.islamicDate.getHijriDate(date);
};

/**
 * Show prayer time table.
 */
PopupController.prototype.bindViewTimetable = function()
{
  $('view_timetable').addEventListener('click', () => {
    this.bkg.controller.openSingletonPage(chrome.extension.getURL('timetable.html'));
  });
};