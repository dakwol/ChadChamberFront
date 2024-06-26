function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var styled$1 = _interopDefault(require('@emotion/styled'));
var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var Calendar = _interopDefault(require('react-calendar'));
require('react-calendar/dist/Calendar.css');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var extractInfoFromDate = function extractInfoFromDate(_ref) {
  var date = _ref.date,
      separator = _ref.separator,
      format = _ref.format;
  var dateSplitted = (date || '').split(separator);
  var extractorByFormat = {
    MMDDYYYY: ['month', 'day', 'year'],
    DDMMYYYY: ['day', 'month', 'year'],
    YYYYMMDD: ['year', 'month', 'day']
  };
  var extractor = extractorByFormat[format];
  var dateExtracted = extractor.reduce(function (extracted, key, idx) {
    var _extends2;

    return _extends({}, extracted, (_extends2 = {}, _extends2[key] = dateSplitted[idx] || '', _extends2));
  }, {});
  return _extends({}, dateExtracted);
};

var padValue = function padValue(_ref2) {
  var value = _ref2.value,
      valueFromDate = _ref2.valueFromDate,
      pad = _ref2.pad;
  var _value = value;

  if ((value || '').startsWith('0') && value.length > 2) {
    _value = parseInt(value, 10);
  }

  return String(_value || (_value === '' ? _value : valueFromDate || '')).padStart(pad, '0');
};

var buildDate = function buildDate(_ref3) {
  var date = _ref3.date,
      day = _ref3.day,
      month = _ref3.month,
      year = _ref3.year,
      separator = _ref3.separator,
      format = _ref3.format;

  var _extractInfoFromDate = extractInfoFromDate({
    date: date,
    separator: separator,
    format: format
  }),
      dayFromDate = _extractInfoFromDate.day,
      monthFromDate = _extractInfoFromDate.month,
      yearFromDate = _extractInfoFromDate.year;

  var _day = padValue({
    value: day,
    valueFromDate: dayFromDate,
    pad: 2
  });

  var _month = padValue({
    value: month,
    valueFromDate: monthFromDate,
    pad: 2
  });

  var _year = padValue({
    value: year,
    valueFromDate: yearFromDate,
    pad: 4
  });

  var builderByFormat = {
    MMDDYYYY: [_month, _day, _year],
    DDMMYYYY: [_day, _month, _year],
    YYYYMMDD: [_year, _month, _day]
  };
  var builder = builderByFormat[format];
  return ''.concat(builder[0], separator).concat(builder[1], separator).concat(builder[2]);
};

var getDaysInMonth = function getDaysInMonth(_ref) {
  var date = _ref.date,
      separator = _ref.separator,
      format = _ref.format;

  var _extractInfoFromDate = extractInfoFromDate({
    date: date,
    separator: separator,
    format: format
  }),
      month = _extractInfoFromDate.month,
      year = _extractInfoFromDate.year;

  return new Date(year, month, 0).getDate();
};

var getNewValue = function getNewValue(_ref2) {
  var value = _ref2.value;
  var valueNumeric = parseInt(value, 10);
  var newValue = false;

  if (value === '') {
    newValue = value;
  }

  if (!isNaN(valueNumeric) && value.match(/^[0-9]+$/) || value === '') {
    newValue = value;
  }

  return newValue;
};

var isBetweenLimitsOrEmpty = function isBetweenLimitsOrEmpty(_ref3) {
  var min = _ref3.min,
      max = _ref3.max,
      value = _ref3.value;
  var isValid = true;
  var valueNumeric = parseInt(value, 10);

  if (valueNumeric > max || valueNumeric < min) {
    isValid = false;
  }

  if (value === '') {
    isValid = true;
  }

  return {
    isValid: isValid,
    newValue: value
  };
};

var validateDay = function validateDay(_ref4) {
  var date = _ref4.date,
      format = _ref4.format,
      separator = _ref4.separator,
      value = _ref4.value;
  return _extends({
    errors: []
  }, isBetweenLimitsOrEmpty({
    min: 0,
    max: getDaysInMonth({
      date: date,
      format: format,
      separator: separator
    }),
    value: getNewValue({
      value: value
    })
  }));
};
var validateMonth = function validateMonth(_ref5) {
  var value = _ref5.value;
  return _extends({
    errors: []
  }, isBetweenLimitsOrEmpty({
    min: 0,
    max: 12,
    value: getNewValue({
      value: value
    })
  }));
};
var validateYear = function validateYear(_ref6) {
  var value = _ref6.value;
  return _extends({
    errors: []
  }, isBetweenLimitsOrEmpty({
    min: 0,
    max: 9999,
    value: getNewValue({
      value: value
    })
  }));
};
var validatorsByKey = {
  day: validateDay,
  month: validateMonth,
  year: validateYear
};
var validateDate = function validateDate(_ref7) {
  var date = _ref7.date,
      format = _ref7.format,
      separator = _ref7.separator;

  var _extractInfoFromDate2 = extractInfoFromDate({
    date: date,
    separator: separator,
    format: format
  }),
      day = _extractInfoFromDate2.day,
      month = _extractInfoFromDate2.month,
      year = _extractInfoFromDate2.year;

  var isValid = true;
  var isIncomplete = false;

  var _validateDay = validateDay({
    date: date,
    format: format,
    separator: separator,
    value: day
  }),
      isDayValid = _validateDay.isValid;

  var _validateMonth = validateMonth({
    date: date,
    format: format,
    separator: separator,
    value: month
  }),
      isMonthValid = _validateMonth.isValid;

  var _validateYear = validateYear({
    date: date,
    format: format,
    separator: separator,
    value: year
  }),
      isYearValid = _validateYear.isValid;

  if (!isDayValid || !isMonthValid || !isYearValid) isValid = false;
  isIncomplete = parseInt(day || '', 10) === 0 || parseInt(month || '', 10) === 0 || parseInt(year || '', 10) === 0;
  return {
    isValid: isValid,
    isIncomplete: isIncomplete
  };
};

var Separator = function Separator(_ref) {
  var separator = _ref.separator;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "separator"
  }, separator);
};

function _templateObject() {
  var data = _taggedTemplateLiteralLoose([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Separator$1 = styled$1(Separator)(_templateObject());

var useUpdateEffect = function useUpdateEffect(effect, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }

  var isInitialMount = React.useRef(true);
  React.useEffect(function () {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
};
var handleChangeInput = function handleChangeInput(_ref) {
  var dateKey = _ref.dateKey,
      setValue = _ref.setValue,
      setError = _ref.setError,
      onChange = _ref.onChange,
      date = _ref.date,
      format = _ref.format,
      separator = _ref.separator,
      itemIndex = _ref.itemIndex;
  return function (e) {
    var value = e.target.value;

    var _validatorsByKey$date = validatorsByKey[dateKey]({
      date: date,
      format: format,
      separator: separator,
      value: value
    }),
        isValid = _validatorsByKey$date.isValid,
        newValue = _validatorsByKey$date.newValue;

    setError(false);

    if (isValid && (newValue || newValue === '')) {
      var _onChange;

      onChange((_onChange = {}, _onChange[dateKey] = newValue, _onChange.itemIndex = itemIndex, _onChange));
      setValue(newValue);
    } else {
      setError(true);
    }
  };
};
var useInput = function useInput(_ref2) {
  var labels = _ref2.labels,
      placeholders = _ref2.placeholders,
      dateKey = _ref2.dateKey,
      date = _ref2.date,
      onChange = _ref2.onChange,
      format = _ref2.format,
      separator = _ref2.separator,
      isFocused = _ref2.isFocused,
      itemIndex = _ref2.itemIndex;

  var _useState = React.useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = React.useState(''),
      error = _useState2[0],
      setError = _useState2[1];

  var handleChange = handleChangeInput({
    dateKey: dateKey,
    setValue: setValue,
    setError: setError,
    onChange: onChange,
    date: date,
    format: format,
    separator: separator,
    itemIndex: itemIndex
  });
  useUpdateEffect(function () {
    var dateInfo = extractInfoFromDate({
      date: date,
      separator: separator,
      format: format
    });
    var _value = dateInfo[dateKey];

    if (parseInt(_value, 10) !== parseInt(value, 10)) {
      setValue(_value);
    } else {
      if (isFocused) {
        setValue(_value);
      } else {
        if (_value !== value) {
          setValue(_value);
        }
      }
    }
  }, [date]);
  React.useEffect(function () {
    var dateInfo = extractInfoFromDate({
      date: date,
      separator: separator,
      format: format
    });
    var _value = dateInfo[dateKey];
    setValue(_value);
  }, []);
  return {
    label: labels[dateKey],
    placeholder: placeholders[dateKey],
    handleChange: handleChange,
    value: value,
    error: error,
    shouldManageZero: dateKey !== 'year'
  };
};

var Input = React__default.forwardRef(function (_ref, ref) {
  var _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      placeholders = _ref.placeholders,
      labels = _ref.labels,
      date = _ref.date,
      format = _ref.format,
      separator = _ref.separator,
      itemIndex = _ref.itemIndex,
      dateKey = _ref.dateKey,
      onChange = _ref.onChange,
      moveBack = _ref.moveBack,
      moveNext = _ref.moveNext,
      _ref$shouldManageZero = _ref.shouldManageZero,
      shouldManageZero = _ref$shouldManageZero === void 0 ? true : _ref$shouldManageZero,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      showLabel = _ref.showLabel;

  var _useInput = useInput({
    labels: labels,
    placeholders: placeholders,
    ref: ref,
    date: date,
    onChange: onChange,
    format: format,
    separator: separator,
    itemIndex: itemIndex,
    isfocused: ref && ref.current !== document.activeElement,
    dateKey: dateKey
  }),
      value = _useInput.value,
      label = _useInput.label,
      placeholder = _useInput.placeholder,
      handleChange = _useInput.handleChange;

  var _useState = React.useState(false),
      nextBack = _useState[0],
      setNextBack = _useState[1];

  var _useState2 = React.useState(false),
      nextBackArrow = _useState2[0],
      setNextBackArrow = _useState2[1];

  var _useState3 = React.useState(false),
      nextForwardArrow = _useState3[0],
      setNextForwardArrow = _useState3[1];

  var _useState4 = React.useState(false),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var _useState5 = React.useState(false),
      zeroTyped = _useState5[0],
      setZeroTyped = _useState5[1];

  var numericValue = parseInt(value, 10);

  var handleFocus = function handleFocus(e) {
    setZeroTyped(false);
    setIsFocused(true);
    ref.current.select(0, ref.current.value.length);
    onFocus();
  };

  var handleBlur = function handleBlur() {
    setZeroTyped(false);
    setIsFocused(false);
    onBlur();
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (shouldManageZero && e.keyCode === 48 && (e.target.value === '' || ref.current.selectionStart === 0 && ref.current.selectionEnd === e.target.value.length)) {
      setZeroTyped(true);
    }

    if (zeroTyped) {
      if ([49, 50, 51, 52, 53, 54, 55, 56, 57].includes(e.keyCode)) {
        var nextValue = "" + e.target.value + String.fromCharCode(e.keyCode);

        if (nextValue !== '' && nextValue.length <= 2) {
          var _moveNext;

          moveNext((_moveNext = {
            itemIndex: itemIndex
          }, _moveNext[dateKey] = nextValue, _moveNext));
          e.stopPropagation();
          e.preventDefault();
        }
      } else {
        if (e.keyCode !== 48) {
          setZeroTyped(false);
        }
      }
    }
  };

  var handleKeyUp = function handleKeyUp(e) {
    if (e.keyCode !== 8) {
      setNextBack(false);
    }

    if (e.keyCode === 8 && e.target.value === '') {
      if (nextBack) {
        setNextBack(false);
        moveBack({
          itemIndex: itemIndex
        });
      } else {
        setNextBack(true);
      }
    }

    if (e.keyCode !== 37) {
      setNextBackArrow(false);
    }

    if (e.keyCode === 37 && ref.current.selectionStart === ref.current.selectionEnd && ref.current.selectionStart === 0) {
      if (nextBackArrow) {
        setNextBackArrow(false);
        moveBack({
          itemIndex: itemIndex
        });
      } else {
        setNextBackArrow(true);
      }
    }

    if (e.keyCode !== 38) {
      setNextForwardArrow(false);
    }

    if (e.keyCode === 39 && ref.current.selectionStart === ref.current.selectionEnd && ref.current.selectionStart === ref.current.value.length) {
      if (nextForwardArrow) {
        var _moveNext2;

        setNextForwardArrow(false);
        moveNext((_moveNext2 = {
          itemIndex: itemIndex
        }, _moveNext2[dateKey] = ref.current.value, _moveNext2));
      } else {
        setNextForwardArrow(true);
      }
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: "input-container"
  }, showLabel && /*#__PURE__*/React__default.createElement("div", {
    className: "label-container"
  }, /*#__PURE__*/React__default.createElement("label", {
    className: "label"
  }, label)), /*#__PURE__*/React__default.createElement("input", {
    ref: ref,
    className: " date-input input-" + dateKey + " " + (value === '' ? 'empty' : ''),
    disabled: disabled,
    placeholder: placeholder,
    type: "text",
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    value: getValueToShow({
      zeroTyped: shouldManageZero ? zeroTyped : !shouldManageZero,
      numericValue: numericValue,
      value: value,
      ref: ref,
      shouldManageZero: shouldManageZero,
      isFocused: isFocused
    }),
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    pattern: "\\d*"
  }));
});

var getValueToShow = function getValueToShow(_ref2) {
  var numericValue = _ref2.numericValue,
      value = _ref2.value,
      isFocused = _ref2.isFocused,
      zeroTyped = _ref2.zeroTyped;
  if (isFocused && zeroTyped && numericValue === 0) return '0';
  if (zeroTyped && /^0/.test(value) && !/^00/.test(value)) return value;

  if (value !== '' && !isNaN(numericValue) && numericValue > 0) {
    return String(isFocused && (/^00/.test(value) || numericValue > 10) ? numericValue : value);
  }

  return '';
};

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose([""]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Input$1 = styled$1(Input)(_templateObject$1());

var dateKeysByFormat = {
  MMDDYYYY: ['month', 'day', 'year'],
  DDMMYYYY: ['day', 'month', 'year'],
  YYYYMMDD: ['year', 'month', 'day']
};

var shouldJumpNext = function shouldJumpNext(_ref) {
  var day = _ref.day,
      month = _ref.month,
      year = _ref.year,
      date = _ref.date,
      separator = _ref.separator,
      format = _ref.format,
      canMoveNext = _ref.canMoveNext;
  if (parseInt(day, 10) >= 4) return true;
  if (((day || '').startsWith('0') || canMoveNext) && parseInt(day, 10) > 0) return true;
  var maxDaysInMonth = getDaysInMonth({
    date: date,
    separator: separator,
    format: format
  });
  if (maxDaysInMonth < 30 && parseInt(day, 10) >= 3) return true;
  if (parseInt(month, 10) >= 2) return true;
  if (((month || '').startsWith('0') || canMoveNext) && parseInt(month, 10) > 0) return true;
  if (parseInt(year, 10) >= 1000) return true;
  return false;
};

var PLACEHOLDERS = {
  day: 'дд',
  month: 'мм',
  year: 'гггг'
};
var LABELS = {
  day: 'Day',
  month: 'Month',
  year: 'Year'
};

var getDateValue = function getDateValue(_ref2) {
  var date = _ref2.date,
      format = _ref2.format,
      separator = _ref2.separator;

  var _extractInfoFromDate = extractInfoFromDate({
    date: date,
    format: format,
    separator: separator
  }),
      day = _extractInfoFromDate.day,
      month = _extractInfoFromDate.month,
      year = _extractInfoFromDate.year;

  return new Date(year, month - 1, day);
};

var DateInput = React__default.forwardRef(function (_ref3, ref) {
  var className = _ref3.className,
      _ref3$format = _ref3.format,
      format = _ref3$format === void 0 ? 'MMDDYYYY' : _ref3$format,
      _ref3$separator = _ref3.separator,
      separator = _ref3$separator === void 0 ? '/' : _ref3$separator,
      _ref3$placeholders = _ref3.placeholders,
      placeholders = _ref3$placeholders === void 0 ? PLACEHOLDERS : _ref3$placeholders,
      _ref3$showLabel = _ref3.showLabel,
      showLabel = _ref3$showLabel === void 0 ? false : _ref3$showLabel,
      disabled = _ref3.disabled,
      date = _ref3.date,
      onChange = _ref3.onChange,
      onFocus = _ref3.onFocus,
      onBlur = _ref3.onBlur,
      _ref3$withCalendar = _ref3.withCalendar,
      withCalendar = _ref3$withCalendar === void 0 ? true : _ref3$withCalendar,
      props = _objectWithoutPropertiesLoose(_ref3, ["className", "format", "separator", "placeholders", "labels", "showLabel", "disabled", "date", "onChange", "onFocus", "onBlur", "withCalendar"]);

  var dateInputContainer = React.useRef();
  var calendarContainer = React.useRef();

  var _useState = React.useState(null),
      dateInputContainerRef = _useState[0],
      setDateInputContainerRef = _useState[1];

  var _useState2 = React.useState(''),
      localDate = _useState2[0],
      setDate = _useState2[1];

  var _React$useState = React__default.useState([]),
      elRefs = _React$useState[0],
      setElRefs = _React$useState[1];

  var _useState3 = React.useState(false),
      error = _useState3[0],
      setError = _useState3[1];

  var _useState4 = React.useState(false),
      warning = _useState4[0],
      setWarning = _useState4[1];

  var _React$useState2 = React__default.useState(false),
      isCalendarOpen = _React$useState2[0],
      setIsCalendarOpen = _React$useState2[1];

  var dateKeys = dateKeysByFormat[format];

  var handleFocus = function handleFocus() {
    onFocus && onFocus();
    setIsCalendarOpen(true);
  };

  var handleBlur = function handleBlur(e) {
    onBlur && onBlur();
  };

  React.useEffect(function () {
    if (date) {
      setDate(date);
      handleValidateDate({
        date: date
      });
    }
  }, [date]);
  React__default.useEffect(function () {
    setElRefs(function (elRefs) {
      return Array(3).fill().map(function (_, i) {
        return elRefs[i] || React.createRef();
      });
    });
    setDateInputContainerRef(dateInputContainer);
  }, []);

  var globalClickListener = function (e) {
    const path = e.composedPath && e.composedPath();

    if (!(path && (path.includes(calendarContainer.current) || path.includes(dateInputContainer.current))) && isCalendarOpen) {
        setIsCalendarOpen(false);
    }
  };
  React.useEffect(function () {
    window.addEventListener('click', globalClickListener);
    return function () {
      document.removeEventListener('click', globalClickListener);
    };
  }, [isCalendarOpen]);

  var handleShouldFocusCalendar = function handleShouldFocusCalendar(e) {
    if (!withCalendar) return;

    if (e.target === elRefs[2].current && e.key === 'Tab') {
      e.stopPropagation();
      e.preventDefault();
      calendarContainer.current.getElementsByTagName('button')[0].focus();
    }

    if (isCalendarOpen && e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();

      if ([].concat(calendarContainer.current.getElementsByTagName('button')).includes(document.activeElement)) {
        document.activeElement.click();
      }
    }

    if (isCalendarOpen && e.key === 'Escape') {
      e.stopPropagation();
      e.preventDefault();
      setIsCalendarOpen(false);
    }
  };

  React.useEffect(function () {
    window.addEventListener('keydown', handleShouldFocusCalendar);
    return function () {
      window.removeEventListener('keydown', handleShouldFocusCalendar);
    };
  }, [elRefs, calendarContainer, isCalendarOpen, document.activeElement]);

  var handleValidateDate = function handleValidateDate(_ref4) {
    var date = _ref4.date;
    setError(false);
    setWarning(false);

    var _validateDate = validateDate({
      date: date,
      format: format,
      separator: separator
    }),
        isValid = _validateDate.isValid,
        isIncomplete = _validateDate.isIncomplete;

    if (!isValid) {
      setError(true);
    }

    if (isIncomplete) {
      setWarning(true);
    }
  };

  var handleChange = function handleChange(_ref5) {
    var day = _ref5.day,
        month = _ref5.month,
        year = _ref5.year,
        itemIndex = _ref5.itemIndex,
        _ref5$canMoveNext = _ref5.canMoveNext,
        canMoveNext = _ref5$canMoveNext === void 0 ? false : _ref5$canMoveNext;
    var newDate = buildDate({
      date: localDate,
      separator: separator,
      format: format,
      day: day,
      month: month,
      year: year
    });

    if (shouldJumpNext({
      day: day,
      month: month,
      year: year,
      separator: separator,
      format: format,
      date: date,
      canMoveNext: canMoveNext
    })) {
      if (elRefs[itemIndex + 1]) {
        elRefs[itemIndex + 1].current.focus();
        elRefs[itemIndex + 1].current.setSelectionRange(0, elRefs[itemIndex + 1].current.value.length);
      }
    }

    setDate(newDate);
    onChange(newDate);
    handleValidateDate({
      date: newDate
    });
  };

  var moveBack = function moveBack(_ref6) {
    var itemIndex = _ref6.itemIndex;

    if (elRefs[itemIndex - 1]) {
      elRefs[itemIndex - 1].current.focus();
      elRefs[itemIndex - 1].current.setSelectionRange(0, elRefs[itemIndex - 1].current.value.length);
    }
  };

  var moveNext = function moveNext(_ref7) {
    var itemIndex = _ref7.itemIndex,
        day = _ref7.day,
        month = _ref7.month,
        year = _ref7.year;
    handleChange({
      itemIndex: itemIndex,
      canMoveNext: true,
      day: day,
      month: month,
      year: year
    });
  };

  var calculatedPosition = React.useMemo(function () {
    var el = dateInputContainerRef && dateInputContainerRef.current;

    if (el) {
        var rect = el.getBoundingClientRect();
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adjust the position
        var top = rect.top + scrollTop + rect.height + 10; // Add 5 pixels below
        var left = rect.left + scrollLeft - 15; // Subtract 5 pixels to the left

        return {
            top: top,
            left: left,
            position: 'absolute'
        };
    }

    // Add a default return value in case 'el' is falsy
    return { top: 0, left: 0, position: 'absolute' };
}, [dateInputContainerRef]);

  var handleChangeDateCalendar = function handleChangeDateCalendar(newDate) {
    var year = String(newDate.getFullYear());
    var month = String(newDate.getMonth() + 1);
    var day = String(newDate.getDate());
    handleChange({
      canMoveNext: false,
      day: day,
      month: month,
      year: year
    });
  };

  var renderCalendar = function renderCalendar() {
    return ReactDOM.createPortal( /*#__PURE__*/React__default.createElement("div", {
      ref: calendarContainer,
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      className: "calendar-container",
      style: _extends({}, calculatedPosition)
    }, /*#__PURE__*/React__default.createElement(Calendar, {
      inputRef: ref,
      disabled: disabled,
      onChange: handleChangeDateCalendar,
      value: getDateValue({
        date: localDate,
        format: format,
        separator: separator
      })
    })), document.body);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: className + " date-input"
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: dateInputContainer,
    className: "date-input-container"
  }, React__default.createElement(Input$1, {
    disabled: disabled,
    date: localDate,
    placeholders: placeholders,
    labels: LABELS,
    separator: separator,
    format: format,
    onChange: handleChange,
    itemIndex: 0,
    ref: elRefs[0],
    moveBack: moveBack,
    moveNext: moveNext,
    dateKey: dateKeys[0],
    onFocus: handleFocus,
    onBlur: handleBlur,
    showLabel: showLabel
  }), /*#__PURE__*/React__default.createElement(Separator$1, {
    separator: separator
  }), React__default.createElement(Input$1, {
    disabled: disabled,
    placeholders: placeholders,
    labels: LABELS,
    date: localDate,
    separator: separator,
    format: format,
    onChange: handleChange,
    itemIndex: 1,
    ref: elRefs[1],
    moveBack: moveBack,
    moveNext: moveNext,
    dateKey: dateKeys[1],
    onFocus: handleFocus,
    onBlur: handleBlur,
    showLabel: showLabel
  }), /*#__PURE__*/React__default.createElement(Separator$1, {
    separator: separator
  }), React__default.createElement(Input$1, {
    disabled: disabled,
    placeholders: placeholders,
    labels: LABELS,
    date: localDate,
    separator: separator,
    format: format,
    onChange: handleChange,
    itemIndex: 2,
    ref: elRefs[2],
    moveBack: moveBack,
    moveNext: moveNext,
    dateKey: dateKeys[2],
    onFocus: handleFocus,
    onBlur: handleBlur,
    showLabel: showLabel
  })), error && /*#__PURE__*/React__default.createElement("div", {
    className: "error-container"
  }, /*#__PURE__*/React__default.createElement("small", null, "Invalid date")), warning && /*#__PURE__*/React__default.createElement("div", {
    className: "error-container"
  }, /*#__PURE__*/React__default.createElement("small", null, "Incomplete date")), withCalendar && isCalendarOpen && renderCalendar());
});

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n  .date-input-container {\n    display: flex;\n    -webkit-box-align: baseline;\n    align-items: baseline;\n    width: fit-content;\n    box-sizing: inherit;\n\n    .input-container {\n      display: flex;\n      align-items: flex-start;\n      flex-direction: column;\n      box-sizing: inherit;\n\n      input {\n        &:active,\n        &:focus {\n          outline: none;\n        }\n\n        display: block;\n\n        font-family: inherit;\n\n        border: none;\n        outline: none;\n        border-radius: 0px;\n        appearance: none;\n        background: none;\n        transform: translateZ(0px);\n\n        -webkit-font-smoothing: antialiased;\n        line-height: unset;\n\n        width: calc(2.2ch);\n\n        &.input-month {\n          &.empty {\n            width: calc(2.7ch);\n          }\n        }\n        &.input-year {\n          width: calc(4ch);\n        }\n        &::placeholder {\n        }\n        &:focus {\n          background: none;\n        }\n      }\n      .label-container {\n        flex: 0 0 auto;\n\n        label {\n          margin: 0px;\n          max-width: 100%;\n          font-weight: unset;\n        }\n      }\n    }\n  }\n\n  .separator {\n    align-self: flex-end;\n\n    max-width: 100%;\n  }\n\n  .error-container {\n    margin: 0px;\n    max-width: 100%;\n\n    line-height: 20px;\n    color: rgb(176 79 79);\n    text-align: left;\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var styled = styled$1(DateInput)(_templateObject$2());

module.exports = styled;
//# sourceMappingURL=index.js.map
