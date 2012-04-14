
/*
 * Report routes
 */

module.exports = function(app){

    app.get('/report', function(req, res){

      var reports = [];

      reports.push({ id : 1, name : 'Report 001', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      reports.push({ id : 2, name : 'Report 002', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      reports.push({ id : 3, name : 'Report 003', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });
      reports.push({ id : 4, name : 'Report 004', description : 'Fusce dapibus, tellus ac cursus commodo, tortor mauris' });

      res.json(reports);
    });

    //other routes..
};
