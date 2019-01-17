android.app.job.JobService.extend("com.tns.notifications.MyJobService", {
    onStartJob: function(params) {       
        console.log("Executando Job ...");

      
        console.log("Rodando JOb ...");
      
        return false;
    },
    
    onStopJob: function() {
        console.log("Stopping job ...");
    }
});