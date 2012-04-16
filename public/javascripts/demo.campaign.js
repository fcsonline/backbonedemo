/**
 * fcsonline Backbone Demostration
 * author: Ferran Basora
 */

$(document).ready(function() {

    // Models defenitions
    Campaign = Backbone.Model.extend({

        urlRoot: '/campaign',

        defaults : function() {
            return {
                name : 'Default campaign name',
                description : 'Description Campaign'
            };
        }

    });

    // Collections defenitions
    CampaignList = Backbone.Collection.extend({
        url: '/campaign',
        model : Campaign
    });

    // Views defenitions
    CampaignsSectionView = Backbone.View.extend({

        events : {
         // "click .edit" : "edit"
         // "click .delete" : "clear"
        },

        initialize : function(options) {
            this.template = _.template(tpl.get('campaign-list'));

            this.el = options.el;

            this.collection.bind('change', this.render, this);
            this.collection.bind('remove', this.render, this);
        },

        render : function() {
          // Prerender the section to load sub-templates
          $(this.el).html(this.template({}));

          // Load sub-template & render list
          var source = $("#campaign-list-item-template").html();
          var template_list_item = Handlebars.compile(source);
          var tbody = this.$("#campaign-list");
          tbody.empty();

          // Append the rendered items
          this.collection.each(function(campaign){
              var cv = new CampaignListItemView({
                model : campaign
              });
              tbody.append(cv.render().el);
          });

          return this;
        }
    });

    CampaignListItemView = Backbone.View.extend({
      tagName : 'tr',
      events : {
       "click .edit" : "editItem",
       "click .delete" : "deleteItem"
      },

      initialize : function() {
        this.template = Handlebars.compile($("#campaign-list-item-template").html());
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
        Campaigns.remove(this.model);
        this.model.destroy();
      }
    });

    CampaignView = Backbone.View.extend({

        el: $("#campaign-detail"),

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

});
