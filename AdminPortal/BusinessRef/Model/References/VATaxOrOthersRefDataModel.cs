﻿
namespace BusinessRef.Model.References
{
    public class VATaxOrOthersRefDataModel
    {
        public int FundRequestDetailID { get; set; }
        public int FundRequestDetailDeductionID { get; set; }
        public int DeductionID { get; set; }
        public string DeductionName { get; set; }
        public float Factor { get; set; }
    }
}
