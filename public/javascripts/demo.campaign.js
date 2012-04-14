/**
 * fcsonline Backbone Demostration
 * author: Ferran Basora
 */

$(document).ready(function() {

    // Models defenitions
    Campaign = Backbone.Model.extend({

        defaults : function() {
            return {
                name : 'Default campaign name',
                descripion : 'Description Campaign'
            };
        }

    });

    // Collections defenitions
    CampaignList = Backbone.Collection.extend({
        url: '/campaign',
        model : Campaign
    });

    // Views defenitions
    CampaignsView = Backbone.View.extend({

        events : {
        // "click .edit" : "edit",
        // "click .delete" : "clear",
        },

        initialize : function(options) {
            this.template = _.template(tpl.get('campaign-list'));

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

    CampaignView = Backbone.View.extend({

        events : {
        // "click .edit" : "edit",
        // "click .delete" : "clear",
        },

        initialize : function(options) {
            this.template = _.template(tpl.get('campaign-list'));

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
    Campaigns = new CampaignList();

    // Initial fetch
    Campaigns.fetch();

});
