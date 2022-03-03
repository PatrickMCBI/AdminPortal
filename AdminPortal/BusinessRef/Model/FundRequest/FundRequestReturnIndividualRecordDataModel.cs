
using System.Collections.Generic;
using BusinessRef.Abstract;
using BusinessRef.Model.References;
using BusinessRef.Model.DocumentRef;

namespace BusinessRef.Model.FundRequest
{
    public class FundRequestReturnIndividualRecordDataModel : ErrorStatus
    {
        public DocumentRefFundRequestHeaderIndividualDataModel FundRequestRecords { get; set; }
        public ICollection<EWTaxRefDataModel> EWTList { get; set; }
        public ICollection<VATaxOrOthersRefDataModel> VATOrOthersList { get; set; }
        public ICollection<NoteDataModel> NoteList { get; set; }
        public int StatusCodeNumber { get; set; }
    }
}
