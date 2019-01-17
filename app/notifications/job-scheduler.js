function scheduleJob(context) {
   
    var component = new android.content.ComponentName(context, com.tns.notifications.MyJobService.class);
    console.log("Rodando 2 JOb ...");
    
    const builder = new android.app.job.JobInfo.Builder(1, component);

     builder.setPeriodic(15 * 60 * 1000);
    
    builder.setRequiresCharging(true);

    const jobScheduler = context.getSystemService(android.content.Context.JOB_SCHEDULER_SERVICE);
    //console.log("Job Scheduled: " + jobScheduler.schedule(builder.build()));
    jobScheduler.schedule(builder.build())
}

module.exports.scheduleJob = scheduleJob;