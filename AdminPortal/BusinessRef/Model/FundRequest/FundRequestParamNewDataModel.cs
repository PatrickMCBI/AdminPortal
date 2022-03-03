using System;

namespace BusinessRef.Model.FundRequest
{
    public class FundRequestParamNewDataModel
    {
        public int ProjectID { get; set; }
        public DateTime FormDate { get; set; }
        public int DocumentRefID_Doc { get; set; }
        public float Amount { get; set; }
        public int UserNameID { get; set; }
    }
}
