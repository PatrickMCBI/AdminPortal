using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestIndividualRecordItineraryDetailDataModel
    {
        public int ItineraryDetailID { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int TransportModeID { get; set; }
        public string TransportMode { get; set; }
    }
}
