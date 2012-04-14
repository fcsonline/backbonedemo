
/*
 * Campaign routes
 */

module.exports = function(app){

    app.get('/campaign', function(req, res){

      var campaigns = [];

      campaigns.push({ id : 1, name : 'Campaign 001', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      campaigns.push({ id : 2, name : 'Campaign 002', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      campaigns.push({ id : 3, name : 'Campaign 003', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      campaigns.push({ id : 4, name : 'Campaign 004', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });

      res.json(campaigns);
    });

    //other routes..
};
