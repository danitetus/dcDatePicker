## dcDatePicker

dcDatePicker is a simple angular directive to show a calendar whe click in an input element.
You can choose two different views; 'month' and 'day'

### Install instructions
#### Bower
```
bower install dcDatepicker
```

### Usage
Tu use the directive, inject the module in your angular app

```html
<script src="path/to/datepicker.js" type="application/javascript">
```

```javascript
angular.module("myApp",["dcDatePicker"]);
```
Then use in an input element

#### Day view
```html
<input type="text" ng-model="myVar" dc-date-picker date-type="day">
```

![Day preview](https://raw.github.com/danitetus/dcDatepicker/master/screenshots/dia.png "Day view")


#### Month view
```html
<input type="text" ng-model="myVar" dc-date-picker date-type="month">
```

![Month preview](https://raw.github.com/danitetus/dcDatepicker/master/screenshots/mes.png "Month view")


You can also define "min" and "max" date to prvent user to select dates out of range

```html
<input type="text" ng-model="myVar" dc-date-picker date-type="day" min="dateMin" max="dateMax">
```
![Month preview](https://raw.github.com/danitetus/dcDatepicker/master/screenshots/rango.png "Month view")

You can define de date format shown in the input text. This function uses de angular date filter
```html
<input type="text" ng-model="myVar" dc-date-picker date-type="day" min="dateMin" max="dateMax" format="d 'of' MMMM 'of' yyyy">
```
