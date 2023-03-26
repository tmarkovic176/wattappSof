﻿using MongoDB.Bson.Serialization.Attributes;

namespace API.Models.Devices
{
    public class Device : DeviceInfo
    {
        public List<Timestamp> Timestamps { get; set; }
    }
}
