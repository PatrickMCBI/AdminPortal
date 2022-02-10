const travelGlobalFunc = {
    centerPanel: document.querySelector('.center-panel'),
    rightPanel: document.querySelector('.right-panel'),
    ModeOfTransportLL: null,
    AccomodationTypeLL: null,
    ProjectNumberBST: null,
    ProjectNameBST: null,
    EmployeeNameBST: null,
    AddTravelersView: function (e) {
        const travelContainer = e.currentTarget.closest('.material-wrapper');
        const tbody = travelContainer.querySelector('.travel-purpose-details-con');
        let rowView = '';
        rowView = `<div class="travel-purpose-details">
                            <div class="flex-center">
                                <label class="count"></label>
                            </div>
                            <div>
                                <div class="form-groups input-icon-wrap">
                                    <input type="text" name="travelerName" class="customDropdownInput jsTravelerName" autocomplete="off" data-propertyname="EmployeeName" data-propertyid="ID" data-sourcetype="bst" required="">
                                    <i class="customDropdownIcon">
                                        <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="17px"><path class="caret-down" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                                    </i>
                                    <ul class="customDropdownUL" style="display: none"></ul>
                                </div>

                            </div>
                            <div><input type="text" name="positionName"  class="jsPositionName" disabled/></div>
                            <div><input type="date" name="birthDate" class="jsBirthDate" disabled/></div>
                            <div><input type="text" name="kgs" class="jsKgs" placeholder="(Kgs)"/></div>
                            <div class="option-btn jsUnsaved">
                                <button class="save-material-details success-btn jsSaveEmployeeName" id="saveDetails">
                                    <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16 saveIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="13px"><path fill="#FFF" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                                </button>
                                <button class="remove-material-details remove-btn jsRemoveDetail" id="removeDetails">
                                    <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13px"><path fill="#FFF" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                                </button>
                            </div>
                        </div>`;
        let parseDoc = new DOMParser().parseFromString(rowView, 'text/html').querySelector('.travel-purpose-details');
        tbody.appendChild(parseDoc);
        travelContainer.querySelector('.travel-purpose-details-con').querySelectorAll('.travel-purpose-details').forEach((item, index) => {
            item.querySelector('.count').textContent = index + 1;
        });

        parseDoc.querySelector('.jsSaveEmployeeName').addEventListener('click', async function (e) {
            let detailsCon = e.currentTarget.closest('.travel-purpose-details');

            let employeeDetailID = detailsCon.getAttribute('data-id');
            let employeeID = detailsCon.querySelector('.jsTravelerName').getAttribute('data-id');
            let baggageWeight = detailsCon.querySelector('.jsKgs').value;
            let documentRefID = document.querySelector('.jstravelHeader').getAttribute('documentref-id');

            let formdata = new FormData();

            formdata.append('EmployeeDetailID', employeeDetailID);
            formdata.append('EmployeeID', employeeID);
            formdata.append('BaggageWeight', baggageWeight);
            formdata.append('DocumentRefID', documentRefID);

            if (employeeDetailID) {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/UpdateNewEmployeeNameTravelDetail', formdata);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);
                }
            } else {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SaveNewEmployeeNameTravelDetail', formdata);
                console.log(data);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);
                    detailsCon.setAttribute('data-id', data.EmployeeDetailID);
                }
            }
        });

        return parseDoc;
    },
    AddIteneraryView: function (e) {
        const travelContainer = e.currentTarget.closest('.material-wrapper');
        const tbody = travelContainer.querySelector('.travel-itirerary-details-con');
        let rowView = '';
        rowView = `<div class="travel-itirerary-details">
                            <div class="flex-center">
                                <label class="count"></label>
                            </div>
                            <div>
                                <input type="text" name="fromOrigin" class="jsFromOrigin"/>
                            </div>
                            <div>
                                <input type="text" name="toDestination" class="jsToDestination"/>
                            </div>
                            <div>
                                <div class=" input-icon-wrap">
                                    <input type="text" name="modeOfTransport" class="customDropdownInput jsModeOfTransport" autocomplete="off" data-propertyName="TransportMode" data-propertyID="ID" data-sourceType="ll" required />
                                    <i class="customDropdownIcon">
                                        <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="17px"><path class="caret-down" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                                    </i>
                                    <ul class="customDropdownUL" style="display: none"></ul>
                                </div>
                            </div>
                            <div>
                                <input type="text" name="fare" class="jsFare" />
                            </div>
                            <div class="option-btn jsUnsaved">
                                <button class="save-material-details success-btn jsSaveItinerary" id="saveDetails">
                                    <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16 saveIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="13px"><path fill="#FFF" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                                </button>
                                <button class="remove-material-details remove-btn jsRemoveDetail" id="removeDetails">
                                    <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13px"><path fill="#FFF" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                                </button>
                            </div>
                        </div>`;
        let parseDoc = new DOMParser().parseFromString(rowView, 'text/html').querySelector('.travel-itirerary-details');
        tbody.appendChild(parseDoc);
        travelContainer.querySelector('.travel-itirerary-details-con').querySelectorAll('.travel-itirerary-details').forEach((item, index) => {
            item.querySelector('.count').textContent = index + 1;
        });

        parseDoc.querySelector('.jsFare').addEventListener('input', function (e) {
            travelGlobalFunc.GrandTotalForTravel(travelContainer);
        });
        parseDoc.querySelector('.jsSaveItinerary').addEventListener('click', async function (e) {
            let detailsCon = e.currentTarget.closest('.travel-itirerary-details');

            let from = detailsCon.querySelector('.jsFromOrigin').value;
            let to = detailsCon.querySelector('.jsToDestination').value;
            let modeOfTransport = detailsCon.querySelector('.jsModeOfTransport').getAttribute('data-id');
            let fare = detailsCon.querySelector('.jsFare').value;
            let itineraryDetailID = detailsCon.getAttribute('data-id');
            let documentRefID = document.querySelector('.jstravelHeader').getAttribute('documentref-id');

            let formdata = new FormData();

            formdata.append('From', from);
            formdata.append('To', to);
            formdata.append('TransportModeID', modeOfTransport);
            formdata.append('Fare', fare);
            formdata.append('IteneraryDetailID', itineraryDetailID);
            formdata.append('DocumentRefID', documentRefID);

            if (itineraryDetailID) {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/UpdateNewItineraryTravelDetail', formdata);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);
                }
            } else {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SaveNewItineraryTravelDetail', formdata);
                console.log(data);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);
                    detailsCon.setAttribute('data-id', data.IteneraryDetailID);
                }
            }
        });
    },
    AddAccomodationView: function (e) {
        const travelContainer = e.currentTarget.closest('.material-wrapper');
        const tbody = travelContainer.querySelector('.travel-hotel-details-con');
        let rowView = '';
        rowView = `<div class="travel-hotel-details">
                        <div class="flex-center">
                            <label class="count"></label>
                        </div>
                        <div class=" input-icon-wrap">
                            <input type="text" name="accomodationType" class="customDropdownInput jsAccomodationName" autocomplete="off" data-propertyName="AccomodationType" data-propertyID="ID" data-sourceType="ll" required />
                            <i class="customDropdownIcon">
                                <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="17px"><path class="caret-down" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                            </i>
                            <ul class="customDropdownUL" style="display:none;">
                                <li>Hotel</li>
                                <li>Lodge</li>
                                <li>INN</li>
                            </ul>
                        </div>
                        <input type="text" name="noOfDays" class="jsNoOfDays" />
                        <input type="text" name="cost" class="jsCost" />
                        <input type="text" name="accomodationTotal" class="jsAccomodationTotal" disabled/>
                        <div class="option-btn jsUnsaved">
                            <button class="save-material-details success-btn jsSaveAccomodation" id="saveDetails">
                                <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16 saveIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="13px"><path fill="#FFF" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                            </button>
                            <button class="remove-material-details remove-btn jsRemoveDetail" id="removeDetails">
                                <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13px"><path fill="#FFF" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                            </button>
                        </div>
                    </div>`;
        let parseDoc = new DOMParser().parseFromString(rowView, 'text/html').querySelector('.travel-hotel-details');
        tbody.appendChild(parseDoc);
        travelContainer.querySelector('.travel-hotel-details-con').querySelectorAll('.travel-hotel-details').forEach((item, index) => {
            item.querySelector('.count').textContent = index + 1;
        });

        parseDoc.querySelector('.jsNoOfDays').addEventListener('input', function (e) {
            let container = e.target.closest('.travel-hotel-details');
            let total = 0;
            total = parseFloat(e.target.value || 0) * parseFloat(container.querySelector('.jsCost').value || 0);
            container.querySelector('.jsAccomodationTotal').value = NumberWithCommas(total);

            travelGlobalFunc.GrandTotalForTravel(travelContainer);


        });
        parseDoc.querySelector('.jsCost').addEventListener('input', function (e) {
            let container = e.target.closest('.travel-hotel-details');
            let total = 0;
            total = parseFloat(e.target.value || 0) * parseFloat(container.querySelector('.jsNoOfDays').value || 0);
            container.querySelector('.jsAccomodationTotal').value = NumberWithCommas(total);

            travelGlobalFunc.GrandTotalForTravel(travelContainer);
        });
        parseDoc.querySelector('.jsSaveAccomodation').addEventListener('click', async function (e) {
            let detailsCon = e.currentTarget.closest('.travel-hotel-details');

            
            let accomodation = detailsCon.querySelector('.jsAccomodationName').getAttribute('data-id');;
            let noOfDays = detailsCon.querySelector('.jsNoOfDays').value;
            let cost = detailsCon.querySelector('.jsCost').value;
            let accomodationDetailID = detailsCon.getAttribute('data-id');
            let documentRefID = document.querySelector('.jstravelHeader').getAttribute('documentref-id');

            let formdata = new FormData();

            formdata.append('AccomodationDetailID', accomodationDetailID);
            formdata.append('DocumentRefID', documentRefID);
            formdata.append('AccomodationTypeID', accomodation);
            formdata.append('NoOfDays', noOfDays);
            formdata.append('Cost', cost);

            if (accomodationDetailID) {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/UpdateNewAccomodationTravelDetail', formdata);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);
                }
            } else {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SaveNewAccomodationTravelDetail', formdata);
                console.log(data);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);
                    detailsCon.setAttribute('data-id', data.AccomodationDetailID);
                }
            }

        });
    },
    GrandTotalForTravel: function (travelContainer) {
        let grandTotal = 0;
        let fareTotal = 0;
        let accomodationTotal = 0;

        let fare = travelContainer.querySelectorAll('.jsFare');
        fare.forEach((item) => {

            fareTotal += parseFloat(item.value) || 0;
            console.log(grandTotal);
        });

        let accTotal = travelContainer.querySelectorAll('.jsAccomodationTotal');
        accTotal.forEach((item) => {

            accomodationTotal += parseFloat(item.value) || 0;
            console.log(grandTotal);
        });

        grandTotal = parseFloat(fareTotal + accomodationTotal);
        console.log(grandTotal);
        travelContainer.querySelector('.jsGrandTotal b').textContent = 'P ' + NumberWithCommas(grandTotal);
    },

    enableFormHeader: function (travelContainer) {
        travelContainer.querySelectorAll('input').forEach((item) => {
            if (item.id != 'jsRequestNo') {
                item.removeAttribute('disabled', 'disabled');
            }

        });

        travelContainer.querySelectorAll('.customDropdownIcon').forEach((item) => {
            item.classList.remove('display-none');
        });

        travelContainer.querySelector('.jstravelHeaderBtn').setAttribute('id', 'new');
        travelContainer.querySelector('.jstravelHeaderBtn').textContent = 'Save';
    },

    disableFormHeader: function (travelContainer) {
        travelContainer.querySelectorAll('input').forEach((item) => {
            item.setAttribute('disabled', 'disabled');
        });

        travelContainer.querySelectorAll('.customDropdownIcon').forEach((item) => {
            item.classList.add('display-none');
        });

        travelContainer.querySelector('.jstravelHeaderBtn').setAttribute('id', 'edit');
        travelContainer.querySelector('.jstravelHeaderBtn').textContent = 'Edit';
    },

    populateIndividualRecord: function (doc, data) {
        console.log(data);

        //display the TravelRequestHeader
        (function displayTravelRequestHeader() {
            let wrapper = doc.querySelector('.material-header-wrapper');
            let headerData = data.HeaderList;

            wrapper.querySelector('input.jsProjectNumberOrigin').value = headerData.ProjectNumberOrigin;
            wrapper.querySelector('input.jsProjectNameOrign').value = headerData.ProjectNameOrigin;
            wrapper.querySelector('input.jsRequestNo').value = headerData.ReferenceNo;
            wrapper.querySelector('input.jsPojectDate').value = ToJavascriptDate(headerData.FormDate);
            wrapper.querySelector('input.jsProjectNumberDestination').value = headerData.ProjectNumberDestination;
            wrapper.querySelector('input.jsDateOfTravel').value = ToJavascriptDate(headerData.TravelDate);
            wrapper.querySelector('input.jsProjectNameDestination').value = headerData.ProjectNameDestination;
            wrapper.querySelector('input.jsPuposeOfTravel').value = headerData.TravelPurpose;
            wrapper.querySelector('.jstravelHeader').setAttribute('documentref-id', headerData.DocumentRefID);


            //disable travel request header inputs
            travelGlobalFunc.disableFormHeader(wrapper);
        })();


        //display list of traveler
        (function displayListOfTraveler() {

            let addTravelerBtn = doc.querySelector('.jsAddTravelers');

            let travelerList = data.EmployeeDetailList;

            travelerList.forEach((item) => {

            });

        })();
    }
};


(function TravelNew() {
    let menuBtn;
    menuBtn = document.querySelector('.jsClickNewTravel');
    if (menuBtn) {
        menuBtn.addEventListener('click', ClickNewTravel);

    }
    async function ClickNewTravel() {
        const view = await fetchView(AppGlobal.baseUrl + 'Travel/IndexTravelNew');

        travelGlobalFunc.centerPanel.innerHTML = '';

        const parseDoc = new DOMParser().parseFromString(view, 'text/html');
        const travelContainer = parseDoc.querySelector('.container');

        travelGlobalFunc.centerPanel.appendChild(travelContainer);

        LoadReferenceData(travelContainer);
    }
    async function LoadReferenceData(travelContainer) {
        const data = await fetchDataGet(AppGlobal.baseUrl + 'Travel/GetTravelNewRefData');
        console.log(data);
        if (data.StatusCodeNumber == 1) {

            travelGlobalFunc.ProjectNumberBST = LoadDataToBST(data.ProjectNumber, 'ProjectID');
            travelGlobalFunc.ProjectNameBST = LoadDataToBST(data.ProjectName, 'ProjectID');
            travelGlobalFunc.EmployeeNameBST = LoadDataToBST(data.EmployeeName, 'ID');
          
            travelGlobalFunc.AccomodationTypeLL = new LinkedList();
            travelGlobalFunc.ModeOfTransportLL = new LinkedList();
            data.AccomodationType.forEach((item) => {
                travelGlobalFunc.ModeOfTransportLL.push(item);
            });
            travelGlobalFunc.ModeOfTransportLL.getAll();

            data.TransportMode.forEach((item) => {
                travelGlobalFunc.ModeOfTransportLL.push(item);
            });
            travelGlobalFunc.ModeOfTransportLL.getAll();

            AssignEventListener(travelContainer);
        }
    }
    function AssignEventListener(travelContainer) {

        

        DropdownList(travelContainer.querySelector('.jsProjectNumberOrigin'), travelGlobalFunc.ProjectNumberBST, function (obj) {

            let projectNameObj = travelGlobalFunc.ProjectNameBST.BFSbyPropertyAndValue('ProjectID', obj.ProjectID);

            travelContainer.querySelector('.jsProjectNumberOrigin').value = obj.ProjectNumber;
            travelContainer.querySelector('.jsProjectNumberOrigin').setAttribute('data-id', obj.ProjectID);
            travelContainer.querySelector('.jsProjectNameOrign').value = projectNameObj[0].ProjectName;
        });
        DropdownList(travelContainer.querySelector('.jsProjectNameOrign'), travelGlobalFunc.ProjectNameBST, function (obj) {

            let projectNumberObj = travelGlobalFunc.ProjectNumberBST.BFSbyPropertyAndValue('ProjectID', obj.ProjectID);

            travelContainer.querySelector('.jsProjectNameOrign').value = obj.ProjectName;
            travelContainer.querySelector('.jsProjectNumberOrigin').setAttribute('data-id', obj.ProjectID);
            travelContainer.querySelector('.jsProjectNumberOrigin').value = projectNumberObj[0].ProjectNumber;

        });

        DropdownList(travelContainer.querySelector('.jsProjectNumberDestination'), travelGlobalFunc.ProjectNumberBST, function (obj) {

            let projectNameObj = travelGlobalFunc.ProjectNameBST.BFSbyPropertyAndValue('ProjectID', obj.ProjectID);

            travelContainer.querySelector('.jsProjectNumberDestination').value = obj.ProjectNumber;
            travelContainer.querySelector('.jsProjectNumberDestination').setAttribute('data-id', obj.ProjectID);
            travelContainer.querySelector('.jsProjectNameDestination').value = projectNameObj[0].ProjectName;
        });
        DropdownList(travelContainer.querySelector('.jsProjectNameDestination'), travelGlobalFunc.ProjectNameBST, function (obj) {

            let projectNumberObj = travelGlobalFunc.ProjectNumberBST.BFSbyPropertyAndValue('ProjectID', obj.ProjectID);

            travelContainer.querySelector('.jsProjectNameDestination').value = obj.ProjectName;
            travelContainer.querySelector('.jsProjectNumberDestination').setAttribute('data-id', obj.ProjectID);
            travelContainer.querySelector('.jsProjectNumberDestination').value = projectNumberObj[0].ProjectNumber;
        });

        travelContainer.querySelector('.jstravelHeaderBtn').addEventListener('click', TravelRequestSaveOrUpdateClick);
        travelContainer.querySelector('.jsSendToAccounting').addEventListener('click', function () { });

    }
    async function TravelRequestSaveOrUpdateClick(e) {
        const travelContainer = e.currentTarget.closest('.material-wrapper');
        let attrib_id = travelContainer.querySelector('.jstravelHeaderBtn').id;

       
        if (attrib_id == 'new') {
            //if (ValidateForm(travelContainer)) {
            //    let projectIDOrigin = travelContainer.querySelector('.jsProjectNumberOrigin').getAttribute('data-id');
            //    let projectIDDestination = travelContainer.querySelector('.jsProjectNumberDestination').getAttribute('data-id');
            //    let requestDate = travelContainer.querySelector('.jsPojectDate').value;
            //    let travelDate = travelContainer.querySelector('.jsDateOfTravel').value;
            //    let purpose = travelContainer.querySelector('.jsPuposeOfTravel').value;
            //    let documentRefID = travelContainer.querySelector('.jstravelHeader').getAttribute('documentref-id');
            //    let formdata = new FormData();

            //    formdata.append('ProjectIDOrigin', projectIDOrigin);
            //    formdata.append('ProjectIDDestination', projectIDDestination);
            //    formdata.append('FormDate', requestDate);
            //    formdata.append('TravelDate', travelDate);
            //    formdata.append('TravelPurpose', purpose);
            //    formdata.append('DocumentRefID', documentRefID);

            //    if (documentRefID) {

            //        let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/UpdateNewEmployeeTravelMaster', formdata);
            //        if (data.StatusCodeNumber == 1) {

            //            IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);
            //            DisabledFormHeader(travelContainer);
            //        }

            //    } else {
            //        let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SaveNewEmployeeTravelMaster', formdata);

            //        if (data.StatusCodeNumber == 1) {
            //            IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);
            //            DisabledFormHeader(travelContainer);
            //            travelContainer.querySelector('.jsRequestNo').value = data.ReferenceNo
            //            travelContainer.querySelector('.jstravelHeader').setAttribute('documentref-id', data.DocumentRefID);

                        travelContainer.querySelector('.jsAddTravelers').addEventListener('click', travelGlobalFunc.AddTravelersView);
                        travelContainer.querySelector('.jsAddItenerary').addEventListener('click', travelGlobalFunc.AddIteneraryView);
                        travelContainer.querySelector('.jsAddAccomodation').addEventListener('click', travelGlobalFunc.AddAccomodationView);

                        travelContainer.querySelector('.jsAddTravelers').click();
                        travelContainer.querySelector('.jsAddItenerary').click();
                        travelContainer.querySelector('.jsAddAccomodation').click();

                        DropdownList(travelContainer.querySelector('.jsTravelerName'), travelGlobalFunc.EmployeeNameBST, function (obj) { });
                        DropdownList(travelContainer.querySelector('.jsModeOfTransport'), travelGlobalFunc.ModeOfTransportLL, function (obj) { });
                        DropdownList(travelContainer.querySelector('.jsAccomodationName'), travelGlobalFunc.AccomodationTypeLL, function (obj) { });

            //        }
            //    }

                
            //} else { IsConfirmedAlertOk(alertType.warningAlert, 'Fill up all forms'); }
            
        } else if (attrib_id == 'edit') {
            EnabledFormHeader(travelContainer);
        }
    }
    function EnabledFormHeader(travelContainer) {
        travelContainer.querySelectorAll('input').forEach((item) => {
            if (item.id != 'jsRequestNo') {
                item.removeAttribute('disabled', 'disabled');
            }
            
        });

        travelContainer.querySelectorAll('.customDropdownIcon').forEach((item) => {
            item.classList.remove('display-none');
        });

        travelContainer.querySelector('.jstravelHeaderBtn').setAttribute('id', 'new');
        travelContainer.querySelector('.jstravelHeaderBtn').textContent = 'Save';
    }
    function DisabledFormHeader(travelContainer) {
        travelContainer.querySelectorAll('input').forEach((item) => {
            item.setAttribute('disabled', 'disabled');
        });

        travelContainer.querySelectorAll('.customDropdownIcon').forEach((item) => {
            item.classList.add('display-none');
        });

        travelContainer.querySelector('.jstravelHeaderBtn').setAttribute('id', 'edit');
        travelContainer.querySelector('.jstravelHeaderBtn').textContent = 'Edit';
    }
})();



(function TravelRecord() {

    let btn = document.querySelector('.jsClickRecordsTravel');

    let filterData, data;

    if (btn) {
        btn.addEventListener('click', async function (e) {
            let view = await fetchView(AppGlobal.baseUrl + 'TravelRecord/Index');

            responseSuccessIndexRecord(view);
        });
    }

    async function responseSuccessIndexRecord(view) {

        travelGlobalFunc.centerPanel.innerHTML = '';
        travelGlobalFunc.rightPanel.innerHTML = '';


        let parser = new DOMParser().parseFromString(view, 'text/html').querySelector('.container');

        data = await fetchDataGet(AppGlobal.baseUrl + 'TravelRecord/GetTravelRequestRecordReferenceData');

        console.log(data);

        filterData = [];

        //add rowcount column in recordlist
        data.RecordList.forEach((item, index) => {
            item.RowCount = index + 1;

            filterData.push(item);
        });

        //display record
        displayRecord(filterData, parser);

        travelGlobalFunc.centerPanel.appendChild(parser);

        assignEventListenersRecord(parser);
    }

    function assignEventListenersRecord(doc) {

    }

    function displayRecord(data, doc) {

        let tblBody = doc.querySelector('.jsTRRecordTbody');

        if (data.length > 0) {

            data.forEach((item) => {
                let div = `
                    <div class="tr-recordTbodyItems" data-id="${item.DocumentRefID}">
                        <div>${item.RowCount}</div>
                        <div>${ToJavascriptDate(item.FormDate)}</div>
                        <div>${item.ReferenceNo}</div>
                        <div>${item.ProjectOrigin}</div>
                        <div>${item.ProjectDestination}</div>
                        <div>${ToJavascriptDate(item.TravelDate)}</div>
                        <div>${item.ApproverStatus}</div>
                        <div>${item.LocationStatus}</div>
                        <div>${item.IsRead == true ? 'Read' : 'Unread' }</div>
                    </div>
                    `;

                let parser = new DOMParser().parseFromString(div, 'text/html').querySelector('.tr-recordTbodyItems');

                parser.addEventListener('click', async function (e) {

                    let view = await fetchView(AppGlobal.baseUrl + 'Travel/IndexTravelNew');

                    let documentRefID = item.DocumentRefID;

                    responseSuccessIndividualRecord(view, documentRefID);

                });

                tblBody.appendChild(parser);

            });

        }
        else {
            let div = `<div class="jsNoRecordFound no-record-found">No record found.</div>`;

            let parser = new DOMParser().parseFromString(div, 'text/html').querySelector('.jsNoRecordFound');

            tblBody.appendChild(parser);
        }

    }

    async function responseSuccessIndividualRecord(view, documentRefID) {

        travelGlobalFunc.centerPanel.innerHTML = '';
        travelGlobalFunc.rightPanel.innerHTML = '';

        let parser = new DOMParser().parseFromString(view, 'text/html').querySelector('.container');

        //get the individual data

        let individualData = await fetchDataGet(AppGlobal.baseUrl + 'TravelRecord/TravelRequestIndividualRecord/?documentRefID=' + documentRefID);

        //add data into bst
        travelGlobalFunc.ProjectNumberBST = LoadDataToBST(individualData.ProjectNumberList, 'ProjectID');
        travelGlobalFunc.ProjectNameBST = LoadDataToBST(individualData.ProjectNameList, 'ProjectID');
        travelGlobalFunc.EmployeeNameBST = LoadDataToBST(individualData.EmployeeList, 'ID');

        //add data into linked list
        travelGlobalFunc.AccomodationTypeLL = LoadDataToLinkedList(individualData.AccomodationTypeList);
        travelGlobalFunc.ModeOfTransportLL = LoadDataToLinkedList(individualData.TransportModeList);

        //append view in center panel
        travelGlobalFunc.centerPanel.appendChild(parser);

        //populate individual data
        travelGlobalFunc.populateIndividualRecord(parser, individualData);

        //create more functions here

    }

})();