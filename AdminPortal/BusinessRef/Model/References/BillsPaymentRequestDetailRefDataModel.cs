
namespace BusinessRef.Model.References
{
    public class BillsPaymentRequestDetailRefDataModel
    {
        public int BillsPaymentRequestDetailID { get; set; }
        public int BillsPaymentTypeID { get; set; }
        public string BillsPaymentType { get; set; }
        public float Amount { get; set; }
        public string AddedByName { get; set; }
        public string AmountAddedByName { get; set; }
        public string DeletedByName { get; set; }
    }
}
