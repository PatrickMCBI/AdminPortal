using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestIndividualRecordEmployeeDetailDataModel
    {
        public int EmployeeDetailID { get; set; }
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public float BaggageWeight { get; set; }
        public string Position { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
