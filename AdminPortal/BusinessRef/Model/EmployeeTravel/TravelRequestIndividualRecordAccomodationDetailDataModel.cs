using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestIndividualRecordAccomodationDetailDataModel
    {
        public int AccomodationDetailID { get; set; }
        public float NoOfDays { get; set; }
        public float Cost { get; set; }
        public int AccomodationTypeID { get; set; }
        public string AccomodationType { get; set; }
    }
}
