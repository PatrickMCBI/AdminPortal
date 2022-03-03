
using System.Collections.Generic;
using BusinessRef.Abstract;
using BusinessRef.Model.References;
using BusinessRef.Model.DocumentRef;

namespace BusinessRef.Model.FundRequest
{
    public class FundRequestReturnRecordRefDataModel : ErrorStatus
    {
        public ICollection<TravelRequestProjectNameRefDataModel> ProjectNameList { get; set; }
        public ICollection<DocumentRefFundRequestDataModel> FundRequestList { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
