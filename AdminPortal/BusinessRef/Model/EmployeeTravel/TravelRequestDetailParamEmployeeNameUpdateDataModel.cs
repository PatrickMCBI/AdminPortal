using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessRef.Model.EmployeeTravel
{
    public class TravelRequestDetailParamEmployeeNameUpdateDataModel
    {
        public int EmployeeDetailID { get; set; }
        public int DocumentRefID { get; set; }
        public int EmployeeID { get; set; }
        public float BaggageWeight { get; set; }
        public int UserNameID { get; set; }
    }
}
