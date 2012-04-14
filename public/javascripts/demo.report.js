/**
 * fcsonline Backbone Demostration
 * author: Ferran Basora
 */

$(document).ready(function() {

    // Models defenitions
    Report = Backbone.Model.extend({

        defaults : function() {
            return {
                name : 'Default report name',
                descripion : 'Description Report'
            };
        }

    });

    // Collections defenitions
    ReportList = Backbone.Collection.extend({
        url: '/report',
        model : Report
    });

    // Views defenitions
    ReportsView = Backbone.View.extend({

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

    // Collections instances
    Reports = new ReportList();

    // Initial fetch
    Reports.fetch();
});
