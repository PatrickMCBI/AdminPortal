using BusinessRef.Model.FundRequest;

namespace BusinessRef.Interfaces.Customs
{
    public interface IFundRequestSendToAccountingData
    {
        FundRequestReturnSendToAccountingDataModel GetDmlFundRequestSendToAccountingData();
    }
}
