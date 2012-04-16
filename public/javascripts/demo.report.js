/**
 * fcsonline Backbone Demostration
 * author: Ferran Basora
 */

$(document).ready(function() {

    // Models defenitions
    Report = Backbone.Model.extend({

        urlRoot: '/report',

        defaults : function() {
            return {
                name : 'Default report name',
                description : 'Description Report',
                email : 'example@example.com'
            };
        }

    });

    // Collections defenitions
    ReportList = Backbone.Collection.extend({
        url: '/report',
        model : Report
    });

    // Views defenitions
    ReportsSectionView = Backbone.View.extend({

        events : {},

        initialize : function(options) {
            this.template = _.template(tpl.get('report-list'));

            this.el = options.el;

            this.collection.bind('change', this.render, this);
            this.collection.bind('remove', this.render, this);
        },

        render : function() {
          // Prerender the section to load sub-templates
          $(this.el).html(this.template({}));

          // Load sub-template & render list
          var source = $("#report-list-item-template").html();
          var template_list_item = Handlebars.compile(source);
          var tbody = this.$("#report-list");
          tbody.empty();

          // Append the rendered items
          this.collection.each(function(report){
              var cv = new ReportListItemView({
                model : report
              });
              tbody.append(cv.render().el);
          });

          return this;
        },

        close : function() {
            this.model.save({
                text : this.input.val()
            });
        },

        remove : function() {
            $(this.el).remove();
        }
    });

    ReportListItemView = Backbone.View.extend({
      tagName : 'tr',
      events : {
       "click .edit" : "editItem",
       "click .delete" : "deleteItem"
      },

      initialize : function() {
        this.template = Handlebars.compile($("#report-list-item-template").html());
      },

      render : function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      },

      editItem : function() {
        var cv = new ReportView({
          el: $("#report-detail"),
          model : this.model
        });

        cv.render();
      },

      deleteItem : function(e) {
        e.preventDefault();
        Reports.remove(this.model);
        this.model.destroy();
      }
    });

    ReportView = Backbone.View.extend({

        events : {
          "click .save" : "saveItem",
          "click .cancel" : "cancelItem"
        },

        initialize : function(options) {
            this.template = _.template(tpl.get('report-detail'));
            this.el = options.el;
        },

        render : function() {
            var data = this.model.toJSON();
            $(this.el).html(this.template(data));

            // Fill the input's with the model data. Underscore escapes value attribute
            $(this.el).find('[name]').each(function(i, item){
              var key = $(item).attr('name');
              $(item).val(data[key]);
            });

            return this;
        },

        remove : function() {
            $(this.el).remove();
        },

        saveItem : function(e) {
          e.preventDefault(); // Don't submit the form

          this.model.save({
            name        : this.$el.find("[name='name']").val(),
            description : this.$el.find("[name='description']").val(),
            email       : this.$el.find("[name='email']").val()
          });

          this.remove();
        },

        cancelItem : function(e) {
          e.preventDefault(); // Don't submit the form
          this.remove();
        }
    });

});
