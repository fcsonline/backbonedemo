/**
 * fcsonline Backbone Demostration
 * author: Ferran Basora
 */

$(document).ready(function() {

    // Application router defenition
    AppRouter = Backbone.Router.extend({

        routes : {

            // Campaign routes
            "/campaign"           : "getCampaigns",
            "/campaign/:id"       : "getCampaign",
            "/campaign/:id/edit"  : "editCampaign",
            "/campaign/:id/delete": "deleteCampaign",

            // Reports routes
            "/report"           : "getReports",
            "/report/:id"       : "getReport",
            "/report/:id/edit"  : "editReport",
            "/report/:id/delete": "deleteReport"
        },

        // Campaign route bindings
        getCampaigns : function() {
            App.subsectionview = new CampaignsSectionView( {
              el : App.subsection,
              collection : Campaigns
            });
            App.render();
        },

        getCampaign : function(id) {
            App.subsectionview = new CampaignView({
               el : App.subsection
            });
            App.render();
        },

        editCampaign : function(id) {},

        deleteCampaign : function(id) {},

        // Reports route bindings
        getReports : function() {
            App.subsectionview = new ReportsSectionView( {
              el : App.subsection,
              collection : Reports
            });
            App.render();
        },

        getReport : function(id) {
            App.subsectionview = new ReportView({
               el : App.subsection
            });
            App.render();
        },

        deleteReport : function(id) {}

    });

    // Application view defenition
    AppView = Backbone.View.extend({

        el : $("#main-container"),

        events : {
        },

        initialize : function() {
            this.subsection = $("#subsection-content");

            // Collections instances
            Reports = new ReportList();
            Campaigns = new CampaignList();

            // Total count
            Reports.bind('reset', this.renderTotalReports);
            Campaigns.bind('reset', this.renderTotalCampaigns);

            // Initial fetch
            Reports.fetch();
            Campaigns.fetch();
        },

        render : function() {
            this.subsectionview.render();
        },

        renderTotalCampaigns : function() {
            $(".nav .campaign .total-count").html(Campaigns.length).fadeIn('slow');
        },

        renderTotalReports : function() {
            $(".nav .report .total-count").html(Reports.length).fadeIn('slow');
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
    tpl.loadTemplates('/templates/', [
      'campaign-list', 'campaign-detail', // Campaign templates
      'report-list', 'report-detail'], // Reports templates
      function() {
          App = new AppView();
          AppRouter = new AppRouter();
          Backbone.history.start();
      });
});
