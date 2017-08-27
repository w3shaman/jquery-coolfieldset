/**
 * jQuery Plugin for creating collapsible fieldset
 * @version 1.1.0
 * @requires jQuery 1.4 or later
 *
 * Copyright (c) 2010 Lucky <bogeyman2007@gmail.com>
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * "animation" and "speed" options are added by Mitch Kuppinger
 *
 * Fixed by Jason on Wed, 03/13/2013 - 08:35 PM
 * - Support for jQuery 1.9.1
 *
 * Fixed by SiZiOUS (@sizious) on Fri, 01/17/2014 - 10:18 AM
 * - Little fix for supporting jQuery 1.9.1, based on Jason's version
 *
 * Updated by SiZiOUS (@sizious) on Fri, 01/17/2014 - 10:55 AM
 * - Added jQuery chaining support
 * - Added an "update" event triggered on element after the operation finishes
 * - Works under IE8+, Chrome 32+, Firefox 26+, Opera 18+, Safari 5+
 */

;(function ($, window, undefined) {
  function hideFieldsetContent(obj, options) {
    if (options.animation) {
      obj.children("*:not('legend')").slideUp(options.speed, function() {
        obj.trigger("update");
      });
    }
    else {
      obj.children("*:not('legend')").hide();
    }
    obj.removeClass("expanded").addClass("collapsed");
    obj.children("*:not('legend')").attr("aria-expanded","false");

    if (!options.animation) {
      obj.trigger("update");
    }
  }

  function showFieldsetContent(obj, options) {
    if (options.animation) {
      obj.children("*:not('legend')").slideDown(options.speed, function() {
        obj.trigger("update");
      });
    }
    else {
      obj.children("*:not('legend')").show();
    }

    obj.removeClass("collapsed").addClass("expanded");
    obj.children("*:not('legend')").attr("aria-expanded","true");
    if (!options.animation) {
      obj.trigger("update");
    }
  }

  function doToggle(fieldset, setting) {
    if (fieldset.hasClass('collapsed')) {
      showFieldsetContent(fieldset, setting);
    }
    else if (fieldset.hasClass('expanded')) {
      hideFieldsetContent(fieldset, setting);
    }
  }

  $.fn.coolfieldset = function (options) {
    var setting = { collapsed: false, animation: true, speed: 'medium' };
    $.extend(setting, options);

    return this.each(function () {
      var fieldset = $(this);
      var legend = fieldset.children('legend');

      var content = fieldset.children("*:not('legend')")
      content.wrapAll('<div class="wrapper"></div>');

      if (setting.collapsed) {
        hideFieldsetContent(fieldset, { animation: false });
      }
      else {
        fieldset.addClass("expanded");
      }

      legend.bind("click", function () { doToggle(fieldset, setting) });

      return fieldset;
    });
  }
})(jQuery, window);
