using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestSendToEngDataLogic : ITravelRequestSendToEngData
    {
        private readonly TravelRequestParamSendToEngDataModel _paramNDataModel;

        public TravelRequestSendToEngDataLogic(TravelRequestParamSendToEngDataModel paramNDataModel)
        {
            _paramNDataModel = paramNDataModel;
        }
        public model GetDmlTravelRequestSendToEngData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestSendToEngDataAccess(_paramNDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
