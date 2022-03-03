using BusinessRef.Abstract;

namespace BusinessRef.Model.FundRequest
{
    public class FundRequestReturnNewDataModel : ErrorStatus
    {
        public int DocumentRefID { get; set; }
        public int FundRequestDetailID { get; set; }
        public string ReferenceNo { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
