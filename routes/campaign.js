
/*
 * Campaign routes
 */

module.exports = function(app){

    // TODO: Transform to database entity
    var campaigns = [];

    // Templates
    app.get('/templates/campaign-list', function(req, res){
      res.render('sections/campaign-list', { title: '' });
    });

    app.get('/templates/campaign-list-item', function(req, res){
      res.render('sections/campaign-list-item', { title: '' });
    });

    app.get('/templates/campaign-detail', function(req, res){
      res.render('sections/campaign-detail', { title: '' });
    });

    app.get('/campaign', function(req, res){
      console.log("Listing campaigns");

      // TODO: Retrieve from real database
      campaigns.push({ id : 1, name : 'Campaign 001', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      campaigns.push({ id : 2, name : 'Campaign 002', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      campaigns.push({ id : 3, name : 'Campaign 003', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      campaigns.push({ id : 4, name : 'Campaign 004', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      campaigns.push({ id : 5, name : 'Campaign 005', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });

      res.json(campaigns);
    });

    // Insert a new item
    app.post('/campaign', function(req, res){
      console.log("Creating a new campaign");

      // Retrieve form data
      var name = req.param('name', null);
      var description = req.param('description', null);

      // TODO: Insert a real database entry
      campaigns.push({
          id: campaigns.length + 1,
          name: name,
          dscription: description
      });

    });

    // Updating item
    app.put('/campaign/:id', function(req, res){
      console.log("Updating campaign " + req.params.id);

      // Retrieve form data
      var id = req.params.id;
      var name = req.param('name', null);
      var description = req.param('description', null);

      // TODO: Update a real database entry
      var i;
      for(i = 0, len = campaigns.length; i < len; ++i) {
        if(campaigns[i].id === id) {
          campaigns[i].name = name;
          campaigns[i].dscription = description;
          break;
        }
      }

    });

    // Delete a item
    app.del('/campaign/:id', function(req, res){
      console.log("Deleting campaign " + req.params.id);

      // TODO: Delete real database entry
    });

};
