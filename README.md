Muslim Prayer Timetable Extension
=================================

<div style="background-color:#99cc33;padding:10px;color:black">
<h1>Under Development 🚀</h1>
Salams! The original Prayer Times was released in 2008 and over the years of maintenance, I have decided to re-implement it under a modern stack and make it significantly better. 

 - 🦊 Add Firefox Support
 - 🎨 Add Themes with fresh design
 - 👩‍💻 Modernize the tech stack (React/Webpack/TypeScript/ManifestV3)
 - 🔨 Fix a bunch of bugs with prayer times, notifications, etc.
 - ⚙ Allow detailed prayer time customization

 If you would lke to help with Translations, Art Themes, or Coding, please reach out!
</div>

## About
This is a Chromium / Firefox extension that shows the prayer times for Muslims. 
It uses HTML5 geolocation features that grabs the current latitude and longitute 
and fetches the prayer times.


## Prayer Calculation
This extension is developed by [Mohamed Mansour](http://mohamedmansour.com) but 
the prayer time calculations are based off the brother
[Dr. Hamid Zarrabi-Zadeh](http://cg.scs.carleton.ca/~zarrabi/home)

There are differing opinions on what angle to use to calculate Fajr and Isha. It
currently supports 6 different calculations.

<table border="1">
<tbody>
<tr> <th> Convention </th><th> Fajr Angle </th><th> Isha Angle  </th></tr>	
<tr><td> Leva Research Institute, Qom, Iran* </td><td> 16 </td><td> 14 </td></tr>
<tr><td> University of Islamic Sciences, Karachi </td><td> 18 </td><td> 18 </td></tr>
<tr><td> Islamic Society of North America (ISNA), USA </td><td> 15 </td><td> 15 </td></tr>
<tr><td> Muslim World League (MWL)	</td><td> 18 </td><td> 17 </td></tr>
<tr><td> Umm al-Qura, Makkah, Saudi Arabia </td><td> 19 </td><td> 90 mins after Maghrib </td></tr>
<tr><td> Egyptian General Authority of Survey </td><td> 19.5 </td><td> 17.5 </td></tr>
</tbody>
</table>

**Leva Research Institute (L.R.I.) is a religious research center established in 1993 in Qom, Iran
For example, according to L.R.I's convention, Fajr = Dhuhr - T(16), and Isha = Dhuhr + T(14).*

For more information regarding the calculations, you can visit Dr.Hamid's [FAQ](http://praytimes.org/calculation)