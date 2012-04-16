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
                description : 'Description Report'
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

        events : {
        // "click .edit" : "edit",
        // "click .delete" : "clear",
        },

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
        alert('edit!');
      },

      deleteItem : function(e) {
        e.preventDefault();
        Reports.remove(this.model);
        this.model.destroy();
      }
    });

    ReportView = Backbone.View.extend({

        events : {
        // "click .edit" : "edit",
        // "click .delete" : "clear",
        },

        initialize : function(options) {
            this.template = _.template(tpl.get('report-list'));

            this.el = options.el;
            // this.model.bind('change', this.render, this);
            // this.model.bind('destroy', this.remove, this);
        },

        render : function() {
            $(this.el).html(this.template({})); // this.model.toJSON()));
            // this.setText();
            return this;
        },

        close : function() {
            this.model.save({
                text : this.input.val()
            });
            $(this.el).removeClass("editing");
        },

        remove : function() {
            $(this.el).remove();
        }
    });

});
