using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using BusinessRef.Model.EmployeeTravel;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.References.StatusCodeNumberReturnRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestHeaderUpdateDataLogic : ITravelRequestHeaderUpdateData
    {
        private readonly TravelRequestHeaderParamUpdateDataModel _mastParamUpdateDataModel;

        public TravelRequestHeaderUpdateDataLogic(TravelRequestHeaderParamUpdateDataModel mastParamUpdateDataModel)
        {
            _mastParamUpdateDataModel = mastParamUpdateDataModel;
        }

        public model GetDmlTravelRequestHeaderUpdateData()
        {
            IPostDatabaseData<model> postDatabase = new TravelRequestHeaderUpdateDataAccess(_mastParamUpdateDataModel);

            return postDatabase.PostDatabaseData();
        }
    }
}
