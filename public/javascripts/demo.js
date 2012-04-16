/**
 * fcsonline Backbone Demostration
 * author: Ferran Basora
 */

(function($) {

  // Application router defenition
  AppRouter = Backbone.Router.extend({

    routes : {

      // Campaign routes
      "/campaign"           : "getCampaigns",
      "/campaign/:id"       : "getCampaign",
      "/campaign/:id/edit"  : "editCampaign",

      // Reports routes
      "/report"           : "getReports",
      "/report/:id"       : "getReport",
      "/report/:id/edit"  : "editReport"
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
    }

  });

  // Collections instances
  Campaigns = new CampaignList();
  Reports = new ReportList();

  // Application view defenition
  AppView = Backbone.View.extend({

    el : $("#main-container"),

    events : {
    },

    initialize : function() {
      this.subsection = $("#subsection-content");

      // Total count
      Campaigns.bind('all', this.renderTotalCampaigns);
      Reports.bind('all', this.renderTotalReports);
    },

    render : function() { this.subsectionview.render(); },

    renderTotalCampaigns : function() {
      $(".nav .campaign .total-count").html(Campaigns.length).fadeIn('slow');
    },

    renderTotalReports : function() {
      $(".nav .report .total-count").html(Reports.length).fadeIn('slow');
    }

  });

  // Application instances
  App = new AppView();
  AppRouter = new AppRouter();

  // Application template cache
  App.Templates = {

    // Hash of preloaded templates for the app
    templates : {},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All
    // the template files should be concatenated in a single file.
    fetch : function(path, names, compile, callback) {

      var that = this;
      var count = 0;

      var loadTemplate = function(index) {
        var name = names[index];
        console.log('Loading template: ' + name);
        $.get(path + name, function(data) {
          that.templates[name] = (compile?_.template(data):data);
          count++;
          if (count == names.length) {
            callback();
          }
        });
      };

      var i;
      for (i = 0; i < names.length; i++) {
        loadTemplate(i);
      }

    },

    // Get template by name from hash of preloaded templates
    get : function(name) {
      return this.templates[name];
    }

  };

  // Preload subsection defenitions & start application
  App.Templates.fetch('/templates/', [
                      'campaign-list', 'campaign-list-item', 'campaign-detail', // Campaign templates
                      'report-list', 'report-list-item', 'report-detail'], // Reports templates
                      true, // Precompile
                      function() {

                        // Initial fetch
                        Campaigns.fetch();
                        Reports.fetch();

                        Backbone.history.start();
                      });
})(jQuery);
