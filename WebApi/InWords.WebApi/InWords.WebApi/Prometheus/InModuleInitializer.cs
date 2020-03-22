using Autofac;
using InWords.WebApi.Module;

namespace InWords.WebApi.Prometheus
{
    public class InModuleInitializer : InModule
    {
        public override void ConfigureIoc(ContainerBuilder builder)
        {
            builder.RegisterType<MetricReporter>().SingleInstance();
        }
    }
}