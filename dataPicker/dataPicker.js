function ScheduleDataPicker() {
  this.monthData; // 每个月的数据
  this.$wrapper; // 日期选择器的弹出框最外层的盒子
  this.outside;
}

ScheduleDataPicker.prototype.init = function (mountDom) {
  this.render();

  var self = this;
  var $input = mountDom;
  var isOpen = false;


  //给input框赋予点击事件
  $input.addEventListener(
    "click",
    function () {
      this.outside = false;
      if (isOpen) {
        this.$wrapper.classList.remove("ui-datepicker-wrapper-show");
        isOpen = false;
      } else {
        this.$wrapper.classList.add("ui-datepicker-wrapper-show");

        var left = $input.offsetLeft;
        var top = $input.offsetTop;
        var height = $input.offsetHeight;

        this.$wrapper.style.top = top + height + 2 + "px";
        this.$wrapper.style.left = left + "px";

        isOpen = true;
      }
    }.bind(self),
    false
  );
  document.addEventListener('click', function(e) {
    this.outside = true;
  }.bind(self), true)

  document.addEventListener('click', function(e) {
    if (this.outside) {
      this.$wrapper.classList.remove("ui-datepicker-wrapper-show");
      isOpen = false;
    }
  }.bind(self))

  //给按钮添加点击事件
  this.$wrapper.addEventListener(
    "click",
    function (e) {
      var $target = e.target;
      this.outside = false;
      if (!$target.classList.contains("ui-datepicker-btn")) {
        return false;
      }

      //上一月,下一月
      if ($target.classList.contains("ui-datepicker-prev-btn")) {
        this.render("prev");
      } else if ($target.classList.contains("ui-datepicker-next-btn")) {
        this.render("next");
      }
    }.bind(self),
    false
  );

  this.$wrapper.addEventListener(
    "click",
    function (e) {
      var $target = e.target;
      if ($target.tagName.toLocaleLowerCase() !== "td") {
        return false;
      }
      var date = new Date(
        self.monthData.year,
        self.monthData.month - 1,
        $target.dataset.date
      );

      this.year = self.monthData.year;
      this.month = self.monthData.month - 1;

      $input.value = date.getTime();
      self.currentDate = date;
      this.$wrapper.classList.remove("ui-datepicker-wrapper-show");
      isOpen = false;
    }.bind(self),
    false
  );
};

ScheduleDataPicker.prototype.getMonthDate = function (year, month) {
  var ret = [];
  if (!year && !month) {
    var today =  new Date();
    this.currentDate = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
  }
  var firstDay = new Date(year, month - 1, 1); //获取当月第一天,这个是数据的标准,
  var firstDayWeekDay = firstDay.getDay(); //获取星期几，才好判断排在第几列，知道排在第几列才知道要拿到上个月的几天塞满第一行
  if (firstDayWeekDay === 0) {
    //周日
    firstDayWeekDay = 1;
  }

  year = firstDay.getFullYear();
  month = firstDay.getMonth() + 1; // 每次拿到的其实是月份的索引，真实的对应的月份需要增加1

  var lastDayOfLastMonth = new Date(year, month - 1, 0); //获取上个月的最后一天
  var lastDateOfLastMonth = lastDayOfLastMonth.getDate(); //获取上个月的最后一天

  var preMonthDayCount = firstDayWeekDay; // 当月是星期几就需要拿到上个月的几天
  var lastDay = new Date(year, month, 0);
  var lastDate = lastDay.getDate();

  for (var i = 0; i < 7 * 5; i++) {
    var date = i + 1 - preMonthDayCount;
    var showDate = date;
    var thisMonth = month;
    var colorClass = 'active';
    var bgClass = 'notSelected';
    //上一月
    if (date <= 0) {
      thisMonth = month - 1;
      showDate = lastDateOfLastMonth + date;
      colorClass = 'noActive';
    } else if (date > lastDate) {
      //下一月
      thisMonth = month + 1;
      showDate = showDate - lastDate;
      colorClass = 'noActive';
    }
    if (thisMonth === 0) {
      console.log('thisMonth', thisMonth);
      thisMonth = 12;
    }
    if (thisMonth === 13) {
      thisMonth = 1;
    }
    
    if (showDate === this.currentDate.getDate() && year === this.currentDate.getFullYear() && thisMonth === this.currentDate.getMonth() + 1) {
      bgClass = 'selected';
      console.log('showDate', showDate, 'year', year, 'month', month);
    }
    ret.push({
      month: thisMonth,
      date: date,
      showDate: showDate,
      colorClass: colorClass,
      bgClass: bgClass
    });
  }
  return {
    year: year,
    month: month,
    days: ret,
  };
};

ScheduleDataPicker.prototype.buildUi = function (year, month) {
  console.log('prev month', month);
  this.monthData = this.getMonthDate(year, month);
  console.log('monthData', this.monthData);
  var html =
    '<div class="ui-datepicker-header">' +
    '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn"></a>' +
    '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn"></a>' +
    '<span class="datepicker-curr-month">' +
    this.monthData.year +
    "年" +
    this.monthData.month + "月" +
    "</span>" +
    "</div>" +
    '<div class="ui-datepicker-body">' +
    "<table>" +
    "<thead>" +
    "<tr>" +
    "<th>日</th>" +
    "<th>一</th>" +
    "<th>二</th>" +
    "<th>三</th>" +
    "<th>四</th>" +
    "<th>五</th>" +
    "<th>六</th>" +
    "</tr>" +
    "</thead>" +
    "<tbody>";

  for (var i = 0; i < this.monthData.days.length; i++) {
    var date = this.monthData.days[i];
    if (i % 7 === 0) {
      html += "<tr>";
    }
    html += '<td data-date="' + date.date + '"class="' + date.colorClass + ' ' + date.bgClass + '">' + date.showDate + "</td>";

    if (i % 7 === 6) {
      html += "</tr>";
    }
  }

  html += "</tbody>" + "</table>" + "</div>";
  return html;
};

ScheduleDataPicker.prototype.render = function (direction) {
  var year, month;
  var monthData = this.monthData;
  if (monthData) {
    year = monthData.year;
    month = monthData.month;
  }

  if (direction === "prev") month--;
  if (direction === "next") month++;
  var html = this.buildUi(year, month);

  this.$wrapper = document.querySelector(".ui-datepicker-wrapper");

  if (!this.$wrapper) {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "ui-datepicker-wrapper";
  }

  this.$wrapper.innerHTML = html;

  document.body.appendChild(this.$wrapper);
};


// getTop().ScheduleDataPicker = ScheduleDataPicker;
