

using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using DataAccess.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.EmployeeTravelReturnNewRefDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class EmployeeTravelNewRefDataLogic : IGetTravelRequestNewReferenceData
    {
        public model GetTravelRequestNewReferenceData()
        {
            IGetDatabaseData<model> getDatabase = new EmployeeTravelNewRefDataAccess();

            return getDatabase.GetDatabaseData();
        }
    }
}
