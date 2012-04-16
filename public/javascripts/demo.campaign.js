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

        events : { },

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
        var cv = new CampaignView({
          el: $("#campaign-detail"),
          model : this.model
        });

        cv.render();
      },

      deleteItem : function(e) {
        e.preventDefault();
        Campaigns.remove(this.model);
        this.model.destroy();
      }
    });

    CampaignView = Backbone.View.extend({

        events : {
          "click .save" : "saveItem"
        },

        initialize : function(options) {
            this.template = _.template(tpl.get('campaign-detail'));

            this.el = options.el;
        },

        render : function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        remove : function() {
            $(this.el).remove();
        },

        saveItem : function(e) {
          e.preventDefault(); // Don't submit the form

          this.model.save({
            name        : this.$el.find("[name='name']").val(),
            description : this.$el.find("[name='description']").val()
          });

          this.remove();
        }
    });

});
