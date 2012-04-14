/**
 * fcsonline Backbone Demostration
 * author: Ferran Basora
 */

$(document).ready(function() {

    // Application router defenition
    AppRouter = Backbone.Router.extend({

        routes : {

            // Campaign routes
            "/campaign"       : "getCampaigns",
            "/campaign/:id"   : "getCampaign",

            // Reports routes
            "/report"         : "getReports",
            "/report/:id"     : "getReport"
        },

        // Campaign route bindings
        getCampaigns : function() {
            App.subsectionview = new CampaignsView( {
              el : App.subsection
            });
            App.render();
        },

        getCampaign : function(id) {
            App.subsectionview = new CampaignView({
               el : App.subsection
            });
            App.render();
        },

        // Reports route bindings
        getReports : function() {
            App.subsectionview = new ReportsView( {
              el : App.subsection
            });
            App.render();
        },

        getReport : function(id) {
            App.subsectionview = new ReportView({
               el : App.subsection
            });
            App.render();
        }

    });

    // Application view defenition
    AppView = Backbone.View.extend({

        el : $("#main-container"),

        // statsTemplate: _.template($('#stats-template').html()),

        events : {
        // "click #new-definition": "createNewPromotion",
        },

        initialize : function() {
            this.subsection = $("#subsection-content");

        },

        render : function() {
            this.subsectionview.render();
        },
        renderProfile : function() {
            $(".credits-count").html(
                    this.profile.get('credits'));
        },
        addOne : function(modeldef) {
            var view = new PromotionView({
                model : modeldef
            });
            $("#definitions tbody").append(
                    view.render().el);
        },

        addAll : function() {
            Promotions.each(this.addOne);
        }

    });

    // Preload subsection defenitions & start application
    tpl.loadTemplates('/templates/', 'jade', [
      'campaign-list', 'campaign-detail', // Campaign templates
      'report-list', 'report-detail'], // Reports templates
      function() {
          App = new AppView();
          AppRouter = new AppRouter();
          Backbone.history.start();
      });
});
