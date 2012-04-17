
/*
 * Report routes
 */

module.exports = function(app){

  // TODO: Transform to database entity
  app.reports = [
    { id : '1', name : 'Report 001', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist1@corp.com' },
    { id : '2', name : 'Report 002', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist2@corp.com' },
    { id : '3', name : 'Report 003', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist3@corp.com' },
    { id : '4', name : 'Report 004', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist4@corp.com' },
    { id : '5', name : 'Report 005', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist5@corp.com' },
    { id : '6', name : 'Report 006', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist6@corp.com' },
    { id : '7', name : 'Report 007', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist7@corp.com' },
    { id : '8', name : 'Report 008', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist8@corp.com' },
    { id : '9', name : 'Report 009', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris', email : 'maillist9@corp.com' }
  ];

  // Templates
  app.get('/templates/report-list', function(req, res){
    res.render('sections/report-list', { title: '' });
  });

  app.get('/templates/report-list-item', function(req, res){
    res.render('sections/report-list-item', { title: '' });
  });

  app.get('/templates/report-detail', function(req, res){
    res.render('sections/report-detail', { title: '' });
  });

  app.get('/report', function(req, res){
    console.log("Listing reports");
    res.json(app.reports);
  });

  // Insert a new item
  app.post('/report', function(req, res){
    console.log("Creating a new report");

    // Retrieve form data
    var name = req.param('name', null);
    var description = req.param('description', null);
    var email = req.param('email', null);

    // TODO: Insert a real database entry
    app.reports.push({
      id: app.reports.length + 1,
      name: name,
      description: description,
      email: email 
    });

  });

  // Updating item
  app.put('/report/:id', function(req, res){
    console.log("Updating report " + req.params.id);

    // Retrieve form data
    var id = req.params.id;
    var name = req.param('name', null);
    var description = req.param('description', null);

    // TODO: Update a real database entry
    var i;
    for(i = 0, len = app.reports.length; i < len; ++i) {
      if(app.reports[i].id === id) {
        app.reports[i].name = name;
        app.reports[i].description = description;
        app.reports[i].email = email;
        break;
      }
    }

  });

  // Delete a item
  app.del('/report/:id', function(req, res){
    console.log("Deleting report " + req.params.id);

    app.reports = app.reports.filter(function(v, i, a) {
      return v.id !== req.params.id; 
    });

  });

};
