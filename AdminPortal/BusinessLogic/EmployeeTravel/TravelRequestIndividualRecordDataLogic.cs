using BusinessRef.Abstract;
using BusinessRef.Interfaces.Customs;
using BusinessRef.Interfaces.Generics;
using DataAccess.EmployeeTravel;
using BusinessRef.Model.EmployeeTravel;

using model = BusinessRef.Model.EmployeeTravel.TravelRequestIndividualRecordReturnDataModel;

namespace BusinessLogic.EmployeeTravel
{
    public class TravelRequestIndividualRecordDataLogic : ITravelRequestIndividualRecordData
    {
        private readonly TravelRequestIndividualRecordParamDataModel _dataModel;
        public TravelRequestIndividualRecordDataLogic(TravelRequestIndividualRecordParamDataModel dataModel)
        {
            _dataModel = dataModel;
        }

        public model TravelRequestIndividualRecordData()
        {
            IGetDatabaseData<model> data = new TravelRequestIndividualRecordDataAccess(_dataModel);

            return data.GetDatabaseData();
        }
    }
}
