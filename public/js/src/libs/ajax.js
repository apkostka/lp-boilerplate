/**
 * Gunn/Jerkens ajax script
 *
 * Expects you to be using bootstrap markup (form-group, form-control). See lp-boilerplate readme for specific usage.
 */
;(function($) {

  function gjAjax(el, options) {
    var self = this;

    self.el      = el;
    self.options = options;
    self.output  = { status: 'success', message: "All fields complete.", element: null };
  }

  gjAjax.prototype.run = function() {
    var self = this;
    self.listen();
  }

  gjAjax.prototype.listen = function() {
    var self = this;

    $('body').on('submit', self.el['selector'], function(e) {
      e.preventDefault();

      var url   = 'http://' + window.location.host + self.options.path,
          data  = $(this).serialize();

      self.checkFields();

      if(self.output.status !== 'error') {
        $('button[type="submit"]').toggle();
        self.el.find('#error').empty();
        self.el.find('#error').append('<p class="message"><i class="fa fa-spin fa-spinner"></i> Sending...</p>');


        $.post(url, { post : data },
        function(response) {
          self.successMessage(response);
        });
      } else {
        self.errorOutput();
      }
    });
  }

  gjAjax.prototype.checkFields = function() {
    var self = this;

    self.clearErrors();

    self.el.find(':input').each(function() {

      var el, attr, type, value, field_name;

      el    = $(this);
      attr  = el.attr('required');
      type  = el.attr('type');
      value = el.val();

      if(typeof attr !== typeof undefined && attr !== false) {

        field_name = el.prev('label').text() || el.closest('label').text().trim() || el.attr('name');
        field_name = field_name.replace('*', '').toLowerCase();

        if(value === "" || value === null) {
          self.errorOutput('error','<i class="fa fa-close"></i> Field ' + field_name + ' is required.', el);
          return false;
        }

        if('radio' === type && !el.is(':checked') && !el.closest('div.form-group').find(':input').is(':checked')) {
          self.errorOutput('error', '<i class="fa fa-close"></i> Field ' + field_name + ' is required.', el);
          return false;
        }

        if('email' === type && false === self.looseEmailValidate(value)) {
          self.errorOutput('error', '<i class="fa fa-close"></i> Your email is not valid.', el);
          return false;
        }

      } else {
        self.errorOutput('success', "All fields complete.", null);
      }

    });
  }

  gjAjax.prototype.errorOutput = function(status, message, el) {
    var self = this;

    self.output.status  = status;
    self.output.message = message;
    self.output.element = el;
  }

  gjAjax.prototype.looseEmailValidate = function(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  gjAjax.prototype.clearErrors = function() {
    var self = this;

    $('.has-error').removeClass('has-error');
    self.el.find('#error').empty();
  }

  gjAjax.prototype.errorOutput = function(status, message, element) {
    var self = this;

    self.output = { status: status, message: message, element: element };

    if("error" === status) {
      self.el.find('#error').append(message);
      element.closest('div.form-group').addClass('has-error');
    }
  }

  gjAjax.prototype.successMessage = function(data) {
    var self = this, response = JSON.parse(data);

    if (response.status === 'success') {
      $('form#register').trigger('reset');
      self.el.find('#error').empty();
      self.el.find('#error').append('<p class="message"><i class="fa fa-check"></i>' + self.options.success + '</p>');
    } else {
      self.el.find('#error').empty();
      self.el.find('#error').append('<i class="fa fa-close"></i>  ' + response.message);
      $('button[type="submit"]').toggle();
    }
  }

  $.fn.gjAjax = function(options) {
    var ajax = new gjAjax(this, options);
    ajax.run();
  }

})(jQuery);

