﻿using API.Models.Devices;

namespace API.Services.Devices
{
    public interface IDevicesService
    {
        public Task<List<Device>> GetDevicesByCategory(string id, string catStr);
        public Task<double> CurrentConsumptionForProsumer(string id);
        public Task<double> CurrentProductionForProsumer(string id);
        public Task<double> ConsumptionForLastWeekForProsumer(string id);
        public Task<double> ProductionForLastWeekForProsumer(string id);
    }
}
