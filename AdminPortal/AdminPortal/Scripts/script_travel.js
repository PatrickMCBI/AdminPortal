const travelGlobalFunc = {
    centerPanel: document.querySelector('.center-panel'),
    rightPanel: document.querySelector('.right-panel'),
    singleDataObj: null,
    ModeOfTransportLL: null,
    AccomodationTypeLL: null,
    ProjectNumberBST: null,
    ProjectNameBST: null,
    EmployeeNameBST: null,
    recordBST: null,
    recordLL: null,
    filterData: null,
    data: null,
    AddTravelersView: function (e) {
        const travelContainer = e.currentTarget.closest('.material-wrapper');
        const tbody = travelContainer.querySelector('.travel-purpose-details-con');

        let parseDoc = travelGlobalFunc.addTravelerItemDivClone();

        tbody.appendChild(parseDoc);

        //set row number
        travelGlobalFunc.countRow(tbody);

    },
    AddIteneraryView: function (e) {
        const travelContainer = e.currentTarget.closest('.material-wrapper');
        const tbody = travelContainer.querySelector('.travel-itirerary-details-con');

        let parseDoc = travelGlobalFunc.addItineraryItemDivClone();

        tbody.appendChild(parseDoc);

        //set row number
        travelGlobalFunc.countRow(tbody);

    },
    AddAccomodationView: function (e) {
        const travelContainer = e.currentTarget.closest('.material-wrapper');
        const tbody = travelContainer.querySelector('.travel-hotel-details-con');

        let parseDoc = travelGlobalFunc.addAccomodationItemDivClone();
        tbody.appendChild(parseDoc);

        //set row number
        travelGlobalFunc.countRow(tbody);
 
    },
    GrandTotalForTravel: function () {

        let travelContainer = document.querySelector('.material-wrapper');

        let grandTotal = 0;
        let fareTotal = 0;
        let accomodationTotal = 0;

        let fare = travelContainer.querySelectorAll('.jsFare');
        fare.forEach((item) => {

            fareTotal += parseFloat(item.value) || 0;
          
        });

        let accTotal = travelContainer.querySelectorAll('.jsAccomodationTotal');
        accTotal.forEach((item) => {
            accomodationTotal += parseFloat(item.getAttribute('data-value')) || 0;
     
        });
        grandTotal = parseFloat(fareTotal + accomodationTotal);
     
        travelContainer.querySelector('.jsGrandTotal b').textContent = 'P ' + NumberWithCommas(grandTotal);
    },

    enableFormHeader: function (travelContainer) {

        travelContainer.querySelectorAll('input, textarea').forEach((item) => {
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
        travelContainer.querySelectorAll('input, textarea').forEach((item) => {
            item.setAttribute('disabled', 'disabled');
        });

        travelContainer.querySelectorAll('.customDropdownIcon').forEach((item) => {
            item.classList.add('display-none');
        });

        travelContainer.querySelector('.jstravelHeaderBtn').setAttribute('id', 'edit');
        travelContainer.querySelector('.jstravelHeaderBtn').textContent = 'Edit';
    },

    countRow: function (parentContainer) {
        parentContainer.querySelectorAll('.count').forEach((item, index) => {
            item.textContent = index + 1;
        })
    },

    addTravelerItemDivClone: function() {

        let div = `
            <form action="#" autocomplete="off">
                <div class="travel-purpose-details">
                    <div class="flex-center">
                        <label class="count"></label>
                    </div>
                    <div>
                        <div class="form-groups input-icon-wrap">
                            <input type="text" name="travelerName" class="customDropdownInput jsTravelerName" data-propertyname="EmployeeName" data-propertyid="ID" data-sourcetype="bst" autocomplete="off" required>
                            <i class="customDropdownIcon">
                                <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="17px"><path class="caret-down" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                            </i>
                        </div>

                    </div>
                    <div><input type="text" name="positionName"  class="jsPositionName" disabled/></div>
                    <div><input type="text" name="birthDate" class="jsBirthDate" disabled/></div>
                    <div><input type="text" name="kgs" class="jsKgs" placeholder="(Kgs)" autocomplete="off" required/></div>
                    <div class="option-btn jsUnsaved">
                        <button type="button" class="save-material-details success-btn jsSaveEmployeeName" id="save">
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" class="svg-inline--fa fa-check fa-w-14 jsCheckIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16px"><path fill="#FFF" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>
                        </button>
                        <button type="button" class="remove-material-details remove-btn jsRemoveDetail">
                            <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13px"><path fill="#FFF" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                        </button>
                    </div>
                </div>
            </form>`;

        let parseDoc = new DOMParser().parseFromString(div, 'text/html').querySelector('.travel-purpose-details');

        //save/edit/update
        parseDoc.querySelector('.jsSaveEmployeeName').addEventListener('click', function (e) {

            let el = e.currentTarget;
            let id = el.id;

            switch (id) {
                case 'save':
                    travelGlobalFunc.saveTOEmployeeDetail(el);
                    break;

                case 'edit':
                    travelGlobalFunc.editItemCommon(el, 'traveler');
                    break;
            }

        });


        //remove item
        parseDoc.querySelector('.jsRemoveDetail').addEventListener('click', function (e) {
            let el = e.currentTarget;

            travelGlobalFunc.removeTOEmployeeDetail(el);
        });

        DropdownList(parseDoc.querySelector('.jsTravelerName'), travelGlobalFunc.EmployeeNameBST, function () {

            const empData = travelGlobalFunc.EmployeeNameBST.BFSbyPropertyAndValue('ID', parseDoc.querySelector('.jsTravelerName').getAttribute('data-id'));

            parseDoc.querySelector('.jsPositionName').value = empData[0].Position;
            parseDoc.querySelector('.jsBirthDate').value = ToJavascriptDate(empData[0].BirthDate);


        });

        return parseDoc;
    },

    addItineraryItemDivClone: function () {

        let div = `
            <form action="#" autocomplete="off">
                <div class="travel-itirerary-details">
                    <div class="flex-center">
                        <label class="count"></label>
                    </div>
                    <div>
                        <input type="text" name="fromOrigin" class="jsFromOrigin" autocomplete="off" required />
                    </div>
                    <div>
                        <input type="text" name="toDestination" class="jsToDestination" autocomplete="off" required/>
                    </div>
                    <div>
                        <div class=" input-icon-wrap">
                            <input type="text" name="modeOfTransport" class="customDropdownInput jsModeOfTransport" data-propertyName="TransportMode" data-propertyID="ID" data-sourceType="ll" autocomplete="off" required />
                            <i class="customDropdownIcon">
                                <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="17px"><path class="caret-down" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                            </i>
                        </div>
                    </div>
                    <div>
                        <input type="text" name="fare" class="jsFare" autocomplete="off" required/>
                    </div>
                    <div class="option-btn jsUnsaved">
                        <button type="button" class="save-material-details success-btn jsSaveItinerary" id="save">
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" class="svg-inline--fa fa-check fa-w-14 jsCheckIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16px"><path fill="#FFF" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>
                        </button>
                        <button type="button" class="remove-material-details remove-btn jsRemoveDetail">
                            <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13px"><path fill="#FFF" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                        </button>
                    </div>
                </div>
            </form>`;

        let parseDoc = new DOMParser().parseFromString(div, 'text/html').querySelector('.travel-itirerary-details');

        parseDoc.querySelector('.jsFare').addEventListener('input', function (e) {
            travelGlobalFunc.GrandTotalForTravel();
        });

        //save/edit/update
        parseDoc.querySelector('.jsSaveItinerary').addEventListener('click', function (e) {

            let el = e.currentTarget;

            let id = el.id;

            switch (id) {
                case 'save':
                    travelGlobalFunc.saveTOItineraryDetail(el);
                    break;

                case 'edit':
                    travelGlobalFunc.editItemCommon(el, 'itinerary');
                    break;
            }
        });

        //remove item
        parseDoc.querySelector('.jsRemoveDetail').addEventListener('click', function (e) {
            let el = e.currentTarget;

            travelGlobalFunc.removeTOItineraryDetail(el);
        });

        DropdownList(parseDoc.querySelector('.jsModeOfTransport'), travelGlobalFunc.ModeOfTransportLL, function (obj) {


        });

        return parseDoc;
    },

    addAccomodationItemDivClone: function () {
        let div = `
            <form action="#" autocomplete="off"> 
                <div class="travel-hotel-details">
                    <div class="flex-center">
                        <label class="count"></label>
                    </div>
                    <div class=" input-icon-wrap">
                        <input type="text" name="accomodationType" class="customDropdownInput jsAccomodationName" autocomplete="off" data-propertyName="AccomodationType" data-propertyID="ID" data-sourceType="ll" autocomplete="off" required />
                        <i class="customDropdownIcon">
                            <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="17px"><path class="caret-down" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                        </i>
                    </div>
                    <input type="text" name="noOfDays" class="jsNoOfDays" autocomplete="off" required/>
                    <input type="text" name="cost" class="jsCost" autocomplete="off" required/>
                    <input type="text" name="accomodationTotal" class="jsAccomodationTotal" disabled/>
                    <div class="option-btn jsUnsaved">
                        <button type="button" class="save-material-details success-btn jsSaveAccomodation" id="save">
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" class="svg-inline--fa fa-check fa-w-14 jsCheckIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16px"><path fill="#FFF" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>
                        </button>
                        <button type="button" class="remove-material-details remove-btn jsRemoveDetail">
                            <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13px"><path fill="#FFF" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                        </button>
                    </div>
                </div>
            </form>`;

        let parseDoc = new DOMParser().parseFromString(div, 'text/html').querySelector('.travel-hotel-details');

        parseDoc.querySelector('.jsNoOfDays').addEventListener('input', function (e) {
            let container = e.target.closest('.travel-hotel-details');
            let total = 0;
            total = parseFloat(e.target.value || 0) * parseFloat(container.querySelector('.jsCost').value || 0);
            container.querySelector('.jsAccomodationTotal').value = NumberWithCommas(total);
            container.querySelector('.jsAccomodationTotal').setAttribute('data-value', total);

            travelGlobalFunc.GrandTotalForTravel();


        });

        parseDoc.querySelector('.jsCost').addEventListener('input', function (e) {
            let container = e.target.closest('.travel-hotel-details');
            let total = 0;
            total = parseFloat(e.target.value || 0) * parseFloat(container.querySelector('.jsNoOfDays').value || 0);
            container.querySelector('.jsAccomodationTotal').value = NumberWithCommas(total);
            container.querySelector('.jsAccomodationTotal').setAttribute('data-value', total);

            travelGlobalFunc.GrandTotalForTravel();
        });

        //save/edit/update
        parseDoc.querySelector('.jsSaveAccomodation').addEventListener('click', function (e) {

            let el = e.currentTarget;
            let id = el.id;

            switch (id) {
                case 'save':
                    travelGlobalFunc.saveTOAccomodationDetail(el);
                    break;

                case 'edit':
                    travelGlobalFunc.editItemCommon(el, 'accomodation');
                    break;
            }

        });

        //remove item
        parseDoc.querySelector('.jsRemoveDetail').addEventListener('click', function (e) {
            let el = e.currentTarget;

            travelGlobalFunc.removeTOAccomodationDetail(el);
        });

        DropdownList(parseDoc.querySelector('.jsAccomodationName'), travelGlobalFunc.AccomodationTypeLL, function (obj) { });


        return parseDoc;
    },

    returnSVGEditIcon: function () {

        let div = `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18 jsEditIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="16px"><path fill="#FFF" d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z"></path></svg>`;

        return new DOMParser().parseFromString(div, 'text/html').querySelector('.jsEditIcon');
    },

    returnSVGCheckIcon: function () {

        let div = `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" class="svg-inline--fa fa-check fa-w-14 jsCheckIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16px"><path fill="#FFF" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>`;

        return new DOMParser().parseFromString(div, 'text/html').querySelector('.jsCheckIcon');
    },

    saveTRHeader: async function (e) {

        const travelContainer = e.currentTarget.closest('.material-wrapper');

        let headerWrapper = e.currentTarget.closest('.material-header-wrapper');

        let attrib_id = travelContainer.querySelector('.jstravelHeaderBtn').id;


        if (attrib_id == 'new') {
            if (ValidateForm(travelContainer)) {
                let projectIDOrigin = travelContainer.querySelector('.jsProjectNumberOrigin').getAttribute('data-id');
                let projectIDDestination = travelContainer.querySelector('.jsProjectNumberDestination').getAttribute('data-id');
                let requestDate = travelContainer.querySelector('.jsRequestDate').value;
                let travelDate = travelContainer.querySelector('.jsDateOfTravel').value;
                let purpose = travelContainer.querySelector('.jsPurposeOfTravel').value;
                let documentRefID = travelContainer.querySelector('.jstravelHeader').getAttribute('documentref-id');
                let returnDate = travelContainer.querySelector('.jsDateOfReturn').value;
                let formdata = new FormData();

                formdata.append('ProjectIDOrigin', projectIDOrigin);
                formdata.append('ProjectIDDestination', projectIDDestination);
                formdata.append('FormDate', requestDate);
                formdata.append('TravelDate', travelDate);
                formdata.append('TravelPurpose', purpose);
                formdata.append('DocumentRefID', documentRefID);
                formdata.append('ReturnDate', returnDate);

                if (documentRefID) {

                    let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/UpdateNewEmployeeTravelMaster', formdata);
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);

                        //disable form header
                        travelGlobalFunc.disableFormHeader(travelContainer);

                    }

                } else {
                    let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SaveNewEmployeeTravelMaster', formdata);

                    if (data.StatusCodeNumber == 1) {

                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);

                        //disable form header
                        travelGlobalFunc.disableFormHeader(travelContainer);

                        travelContainer.querySelector('.jsRequestNo').value = data.ReferenceNo
                        travelContainer.querySelector('.jstravelHeader').setAttribute('documentref-id', data.DocumentRefID);

                        //enable add travelers/employee travelers button
                        let addTravelersBtn = travelContainer.querySelector('.jsAddTravelers');
                        addTravelersBtn.classList.add('add-items-btn');
                        addTravelersBtn.classList.remove('disabled');
                        addTravelersBtn.removeAttribute('disabled');

                        //enable add itinerary button
                        let addItineraryBtn = travelContainer.querySelector('.jsAddItenerary');
                        addItineraryBtn.classList.add('add-items-btn');
                        addItineraryBtn.classList.remove('disabled');
                        addItineraryBtn.removeAttribute('disabled');

                        //enable add accomodation button
                        let addAccomodationBtn = travelContainer.querySelector('.jsAddAccomodation');
                        addAccomodationBtn.classList.add('add-items-btn');
                        addAccomodationBtn.classList.remove('disabled');
                        addAccomodationBtn.removeAttribute('disabled');

                        //trigger click in every enabled button
                        addTravelersBtn.click();
                        addItineraryBtn.click();
                        addAccomodationBtn.click();

                        //add footer buttons
                        document.querySelector('.jsFooterBtnContainer').appendChild(travelGlobalFunc.footerBtnClone());

                        travelContainer.querySelector('.jsStatusApproved').innerHTML = 'Draft';
                        travelContainer.querySelector('.jsStatusLocation').innerHTML = 'Sender';
                    }
                }


            } else { IsConfirmedAlertOk(alertType.warningAlert, 'Fill up all forms'); }

        } else if (attrib_id == 'edit') {
            travelGlobalFunc.enableFormHeader(headerWrapper);
        }
    },

    validateItem: function (parentEl) {
        let errors = 0;

        parentEl.querySelectorAll('input[required]').forEach((item) => {

            if (item.classList.contains('customDropdownInput')) {

                if (item.getAttribute('data-id') > 0) {
                    item.closest('.input-icon-wrap').removeAttribute('style');

                }
                else {
                    errors += 1;

                    item.closest('.input-icon-wrap').setAttribute('style', 'border: 1px solid red');

                }
            }
            else {
                if (item.value) {
                    item.removeAttribute('style');
                }
                else {
                    errors += 1;

                    item.setAttribute('style', 'border: 1px solid red');
                }
            }

        });

        return errors == 0 ? true : false;
    },

    disableItem: function (parentEl) {
        parentEl.querySelectorAll('input[required]').forEach((item) => {

            if (item.classList.contains('customDropdownInput')) {
                item.closest('.input-icon-wrap').classList.add('disabled');
            }
            else {
                item.setAttribute('disabled', 'disabled');
            }
        });
    },
    enableItem: function (parentEl) {
        parentEl.querySelectorAll('input[required]').forEach((item) => {

            if (item.classList.contains('customDropdownInput')) {
                item.closest('.input-icon-wrap').classList.remove('disabled');
            }
            else {
                item.removeAttribute('disabled');
            }
        });
    },

    editItemCommon: function (el, type) {

        let doc = el.closest('.material-wrapper');

        let itemContainer = null;

        switch (type) {
            case 'traveler':
                itemContainer = el.closest('.travel-purpose-details');
                break;

            case 'itinerary':
                itemContainer = el.closest('.travel-itirerary-details');
                break;

            case 'accomodation':
                itemContainer = el.closest('.travel-hotel-details');
                break;
        }

        //change the text and id of button element
        el.innerHTML = '';
        el.appendChild(travelGlobalFunc.returnSVGCheckIcon());
        el.id = 'save';

        //enable the required input element
        travelGlobalFunc.enableItem(itemContainer);
    },

    saveTOEmployeeDetail: async function (el) {

        let itemContainer = el.closest('.travel-purpose-details');

        if (travelGlobalFunc.validateItem(itemContainer)) {

            let employeeDetailID = itemContainer.getAttribute('data-id');
            let employeeID = itemContainer.querySelector('.jsTravelerName').getAttribute('data-id');
            let baggageWeight = itemContainer.querySelector('.jsKgs').value;
            let documentRefID = document.querySelector('.jstravelHeader').getAttribute('documentref-id');

            let formdata = new FormData();

            formdata.append('EmployeeDetailID', employeeDetailID);
            formdata.append('EmployeeID', employeeID);
            formdata.append('BaggageWeight', baggageWeight);
            formdata.append('DocumentRefID', documentRefID);

            if (employeeDetailID) {

                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/UpdateNewEmployeeNameTravelDetail', formdata);

                console.log(data, 'update');

                if (data.HasError) {
                    throw alertMessages.databaseError;
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);

                        //change the text and id of button element
                        el.innerHTML = '';
                        el.appendChild(travelGlobalFunc.returnSVGEditIcon());
                        el.id = 'edit';

                        //disable item container input
                        travelGlobalFunc.disableItem(itemContainer);
                    }
                }

              
            } else {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SaveNewEmployeeNameTravelDetail', formdata);

                console.log(data, 'insert');

                if (data.HasError) {
                    throw alertMessages.databaseError
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);

                        //change the text and id of button element
                        el.innerHTML = '';
                        el.appendChild(travelGlobalFunc.returnSVGEditIcon());
                        el.id = 'edit';

                        //disable item container input
                        travelGlobalFunc.disableItem(itemContainer);

                        //set data-id
                        itemContainer.setAttribute('data-id', data.EmployeeDetailID);

                    }
                }
                
            }
        }
        else {
            IsConfirmedAlertOk(alertType.warningAlert, 'Fill up all forms');
        }

    },
    removeTOEmployeeDetail: function (el) {
      
        let itemContainer = el.closest('.travel-purpose-details');

        let employeeDetailID = itemContainer.getAttribute('data-id');

        if (employeeDetailID) {
            //fetch here
            IsConfirmedAlertYesOrNo(alertType.warningAlert, 'Are you sure?').then(async res => {

                let formData = new FormData();

                formData.append('EmployeeDetailID', employeeDetailID);

                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/TravelRequestDetailEmployeeDelete', formData);

                if (data.HasError) {
                    throw alertMessages.databaseError;
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, 'Item deleted successfully.');
                    }
                }

            }).catch(error => {
                console.log(error);
            });
        }
        else {
            //remove directly the item
            itemContainer.remove();
        }
    },

    saveTOItineraryDetail: async function (el) {

        let itemContainer = el.closest('.travel-itirerary-details');

        if (travelGlobalFunc.validateItem(itemContainer)) {

            let from = itemContainer.querySelector('.jsFromOrigin').value;
            let to = itemContainer.querySelector('.jsToDestination').value;
            let modeOfTransport = itemContainer.querySelector('.jsModeOfTransport').getAttribute('data-id');
            let fare = itemContainer.querySelector('.jsFare').value;
            let itineraryDetailID = itemContainer.getAttribute('data-id');
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

                console.log(data, 'update');

                if (data.HasError) {
                    throw alertMessages.databaseError;
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);

                        //change the text and id of button element
                        el.innerHTML = '';
                        el.appendChild(travelGlobalFunc.returnSVGEditIcon());
                        el.id = 'edit';

                        //disable item container input
                        travelGlobalFunc.disableItem(itemContainer);
                    }
                }
                
            } else {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SaveNewItineraryTravelDetail', formdata);

                console.log(data, 'insert');

                if (data.HasError) {
                    throw alertMessages.databaseError;
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);

                        //change the text and id of button element
                        el.innerHTML = '';
                        el.appendChild(travelGlobalFunc.returnSVGEditIcon());
                        el.id = 'edit';

                        //disable item container input
                        travelGlobalFunc.disableItem(itemContainer);

                        //set data id 
                        itemContainer.setAttribute('data-id', data.IteneraryDetailID);
                    }
                }
              
            }
        }
        else {
            IsConfirmedAlertOk(alertType.warningAlert, 'Fill up all forms');
        }

    },
    removeTOItineraryDetail: function (el) {

        let itemContainer = el.closest('.travel-itirerary-details');

        let itineraryDetailID = itemContainer.getAttribute('data-id');

        if (itineraryDetailID) {
            //fetch here
            IsConfirmedAlertYesOrNo(alertType.warningAlert, 'Are you sure?').then(async res => {

                let formData = new FormData();

                formData.append('ItineraryDetailID', itineraryDetailID);

                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/TravelRequestDetailItineraryDelete', formData);

                if (data.HasError) {
                    throw alertMessages.databaseError;
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, 'Item deleted successfully.');
                    }
                }

            }).catch(error => {
                console.log(error);
            })
        }
        else {
            //remove directly
            itemContainer.remove();
        }
    },

    saveTOAccomodationDetail: async function (el) {

        let itemContainer = el.closest('.travel-hotel-details');

        if (travelGlobalFunc.validateItem(itemContainer)) {

            let accomodation = itemContainer.querySelector('.jsAccomodationName').getAttribute('data-id');
            let noOfDays = itemContainer.querySelector('.jsNoOfDays').value;
            let cost = itemContainer.querySelector('.jsCost').value;
            let accomodationDetailID = itemContainer.getAttribute('data-id');
            let documentRefID = document.querySelector('.jstravelHeader').getAttribute('documentref-id');

            let formdata = new FormData();

            formdata.append('AccomodationDetailID', accomodationDetailID);
            formdata.append('DocumentRefID', documentRefID);
            formdata.append('AccomodationTypeID', accomodation);
            formdata.append('NoOfDays', noOfDays);
            formdata.append('Cost', cost);

            if (accomodationDetailID) {

                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/UpdateNewAccomodationTravelDetail', formdata);

                console.log(data, 'update')

                if (data.HasError) {
                    throw alertMessages.databaseError;
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);

                        //change the text and id of button element
                        el.innerHTML = '';
                        el.appendChild(travelGlobalFunc.returnSVGEditIcon());
                        el.id = 'edit';

                        //disable item container input
                        travelGlobalFunc.disableItem(itemContainer);
                    }
                }

               
            } else {
                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SaveNewAccomodationTravelDetail', formdata);

                console.log(data, 'insert');

                if (data.HasError) {
                    throw alertMessages.databaseError;
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);

                        //change the text and id of button element
                        el.innerHTML = '';
                        el.appendChild(travelGlobalFunc.returnSVGEditIcon());
                        el.id = 'edit';

                        //disable item container input
                        travelGlobalFunc.disableItem(itemContainer);

                        //set data-id
                        itemContainer.setAttribute('data-id', data.AccomodationDetailID);
                    }
                }
              
            }
        }
        else {
            IsConfirmedAlertOk(alertType.warningAlert, 'Fill up all forms');
        }
    },
    removeTOAccomodationDetail: function (el) {

        let itemContainer = el.closest('.travel-hotel-details');

        let accomodationDetailID = itemContainer.getAttribute('data-id');

        if (accomodationDetailID) {
            //fetch here
            IsConfirmedAlertYesOrNo(alertType.warningAlert, 'Are you sure?').then(async res => {

                let formData = new FormData();

                formData.append('AccomodationDetailID', accomodationDetailID);

                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/TravelRequestDetailAccomodationDelete', formData);

                if (data.HasError) {
                    throw alertMessages.databaseError;
                }
                else {
                    if (data.StatusCodeNumber == 1) {
                        //success here
                        IsConfirmedAlertOk(alertType.successAlert, 'Item deleted successfully.');
                    }
                }

            }).catch(error => {
                console.log(error);
            });
        }
        else {
            //remove directly the item
            itemContainer.remove();
        }
    },

    footerBtnClone: function() {
        let div = `
            <div class="content">
                <button class="jsPrintTR">
                    Print TR
                </button>
                <button class="jsPrintTO">
                    Print TO
                </button>
                <button class="jsSendToEngg">
                    Send To Engg
                </button>
                <button class="jsFundRequest display-none">
                    Make FundRequest
                </button>
            </div>`;

        let parser = new DOMParser().parseFromString(div, 'text/html').querySelector('.content');

        parser.querySelector('.jsPrintTO').addEventListener('click', function (e) {
            let el = e.currentTarget;

            printTO(el);
        });

        parser.querySelector('.jsPrintTR').addEventListener('click', function (e) {

            let el = e.currentTarget;

            printTR(el);
        });

        parser.querySelector('.jsSendToEngg').addEventListener('click', function (e) {
            let el = e.currentTarget;

            sendToEngineering(el);
        });

        parser.querySelector('.jsFundRequest').addEventListener('click', function (e) {
            let el = e.currentTarget;

            MakeFundrequest(el);
        });


        function sendToEngineering(el) {

            let travelContainer = el.closest('.material-wrapper')

            IsConfirmedAlertYesOrNo(alertType.warningAlert, "Are you sure you want to send?").then(async function (obj) {

                let formData = new FormData();
                let docRefID = travelContainer.querySelector('.jstravelHeader').getAttribute('documentref-id');
                formData.append('DocumentRefID', docRefID);

                let data = await fetchDataPost(AppGlobal.baseUrl + 'Travel/SendToEngTravelRequest', formData);

                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, "Successfully sent");
                }

            }).catch(function (error) {
                console.log(error);
            });
        }

        function printTO(el) {
            
            let travelContainer = el.closest('.material-wrapper');
            let docRefID = travelContainer.querySelector('.jstravelHeader').getAttribute('documentref-id');

            let printURL = AppGlobal.baseUrl + 'TravelRecord/PrintTO/?documentRefID=' + docRefID;

            window.open(printURL, '_blank');
        }

        function printTR(el) {

            let travelContainer = el.closest('.material-wrapper');
            let docRefID = travelContainer.querySelector('.jstravelHeader').getAttribute('documentref-id');

            let printURL = AppGlobal.baseUrl + 'TravelRecord/PrintTR/?documentRefID=' + docRefID;

            window.open(printURL, '_blank');
        }

        async function MakeFundrequest(el) {
          
            let travelContainer = el.closest('.material-wrapper');

            let projectID = travelGlobalFunc.singleDataObj.HeaderList.ProjectOriginID;
            let formDate = ToJavascriptDate(travelGlobalFunc.singleDataObj.HeaderList.FormDate);
            let documentRefID_doc = travelGlobalFunc.singleDataObj.HeaderList.DocumentRefID;


            let amount = 0;
            let itinerary = 0;
            let accommodation = 0;
            travelGlobalFunc.singleDataObj.ItineraryDetailList.forEach((item) => {
                itinerary += parseFloat(item.Fare);
            });

            travelGlobalFunc.singleDataObj.AccomodationDetailList.forEach((item) => {
                accommodation += parseFloat(item.NoOfDays * item.Cost);
            });

            amount = parseFloat(itinerary + accommodation);
            let formData = new FormData();

            formData.append('ProjectID', projectID);
            formData.append('FormDate', formDate);
            formData.append('DocumentRefID_Doc', documentRefID_doc);
            formData.append('Amount', amount);

            let data = await fetchDataPost(AppGlobal.baseUrl + 'FundRequest/SaveNewFundRequestTravelMaster', formData);

            if (data.StatusCodeNumber == 1) {
                IsConfirmedAlertOkResolve(alertType.successAlert, "Funds request successfully created!").then(function () {

                    travelContainer.querySelector('.jsFundRequest').classList.add('display-none');

                    IsConfirmedAlertYesOrNoWithTextArea(alertType.warningAlert, "Would you like to send to accounting?", false).then(async function (obj) {

                        let formData = new FormData();
                        let note = obj.querySelector('textarea[name=Note]').value;
                    
                        formData.append('DocumentRefID', documentRefID_doc);
                        formData.append('Note', note);

                        let data = await fetchDataPost(AppGlobal.baseUrl + 'FundRequest/SendFundRequestToAccounting', formData);
                        console.log(data);
                        if (data.StatusCodeNumber == 1) {
                            IsConfirmedAlertOk(alertType.successAlert, "Successfully sent");
                            parseDoc.querySelector('.jsSendToAccounting').classList.add('display-none');
                            //setTimeout(function () {
                            //    window.location.reload();
                            //}, 2500);
                        }

                    }).catch(function (error) { });
                }).catch(function (error) { });
            } else if (data.StatusCodeNumber == 2) {
                IsConfirmedAlertOk(alertType.warningAlert, 'Data already exist!');
            }
            
        }

        return parser;
    },

    projectDropdownList: function (doc) {

        DropdownList(doc.querySelector('.jsProjectNumberOrigin'), travelGlobalFunc.ProjectNumberBST, function () {

            let projectNameObj = travelGlobalFunc.ProjectNameBST.BFSbyPropertyAndValue('ProjectID', doc.querySelector('.jsProjectNumberOrigin').getAttribute('data-id'));

            
            doc.querySelector('.jsProjectNumberOrigin').setAttribute('data-id', projectNameObj[0].ProjectID);
            doc.querySelector('.jsProjectNameOrigin').value = projectNameObj[0].ProjectName;
        });
        DropdownList(doc.querySelector('.jsProjectNameOrigin'), travelGlobalFunc.ProjectNameBST, function (obj) {

            let projectNumberObj = travelGlobalFunc.ProjectNumberBST.BFSbyPropertyAndValue('ProjectID', doc.querySelector('.jsProjectNameOrigin').getAttribute('data-id'));

            doc.querySelector('.jsProjectNumberOrigin').setAttribute('data-id', projectNumberObj[0].ProjectID);
            doc.querySelector('.jsProjectNumberOrigin').value = projectNumberObj[0].ProjectNumber;

        });
    },
    responseSuccessIndividualRecord: async function (view, documentRefID, id) {
        travelGlobalFunc.centerPanel.innerHTML = '';
        travelGlobalFunc.rightPanel.innerHTML = '';

        let parser = new DOMParser().parseFromString(view, 'text/html').querySelector('.container');

        //add back button
       

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


        //assign event listeners here
        (function assignEventListenersIndividualRecord() {
            let doc = parser;

            doc.querySelector('.jsAddTravelers').addEventListener('click', travelGlobalFunc.AddTravelersView);

            doc.querySelector('.jsAddItenerary').addEventListener('click', travelGlobalFunc.AddIteneraryView);

            doc.querySelector('.jsAddAccomodation').addEventListener('click', travelGlobalFunc.AddAccomodationView);

            //Dropdownlist
            travelGlobalFunc.projectDropdownList(doc);

        })();


        //populate individual data
        (function populateIndividualRecord() {

            let data = individualData;
            let doc = parser;
            travelGlobalFunc.singleDataObj = data;


            //display the TravelRequestHeader
            (function displayTravelRequestHeader() {
                let wrapper = doc.querySelector('.material-header-wrapper');
                let headerData = data.HeaderList;


                wrapper.querySelector('.jsProjectNumberOrigin').value = headerData.ProjectNumberOrigin;
                wrapper.querySelector('.jsProjectNumberOrigin').setAttribute('data-id', headerData.ProjectOriginID);
                wrapper.querySelector('.jsProjectNumberOrigin').setAttribute('data-textcontent', headerData.ProjectNumberOrigin);

                wrapper.querySelector('.jsProjectNameOrigin').value = headerData.ProjectNameOrigin;
                wrapper.querySelector('.jsProjectNameOrigin').setAttribute('data-id', headerData.ProjectOriginID);
                wrapper.querySelector('.jsProjectNameOrigin').setAttribute('data-textcontent', headerData.ProjectNameOrigin);

                wrapper.querySelector('.jsRequestNo').value = headerData.ReferenceNo;

                wrapper.querySelector('.jsRequestDate').value = ToJavascriptDate(headerData.FormDate);

                wrapper.querySelector('.jsProjectNumberDestination').value = headerData.ProjectNumberDestination;
                wrapper.querySelector('.jsProjectNumberDestination').setAttribute('data-id', headerData.ProjectDestinationID);
                wrapper.querySelector('.jsProjectNumberDestination').setAttribute('data-textcontent', headerData.ProjectNumberDestination);

                wrapper.querySelector('.jsDateOfTravel').value = ToJavascriptDate(headerData.TravelDate);

                wrapper.querySelector('.jsProjectNameDestination').value = headerData.ProjectNameDestination;
                wrapper.querySelector('.jsProjectNameDestination').setAttribute('data-id', headerData.ProjectDestinationID);
                wrapper.querySelector('.jsProjectNameDestination').setAttribute('data-textcontent', headerData.ProjectNameDestination);

                wrapper.querySelector('.jsPurposeOfTravel').value = headerData.TravelPurpose;

                wrapper.querySelector('.jstravelHeader').setAttribute('documentref-id', headerData.DocumentRefID);

                wrapper.querySelector('.jsDateOfReturn').value = ToJavascriptDate(headerData.ReturnDate) == '3939-01-01' ? '' : ToJavascriptDate(headerData.ReturnDate);
                wrapper.querySelector('.jsStatusApproved').innerHTML = headerData.ApproverStatus;
                wrapper.querySelector('.jsStatusLocation').innerHTML = headerData.LocationStatus;
                //disable travel request header inputs
                travelGlobalFunc.disableFormHeader(wrapper);

                //add event listener
                wrapper.querySelector('.jstravelHeaderBtn').addEventListener('click', travelGlobalFunc.saveTRHeader);

                //add footer button
                let footerBtnContainer = document.querySelector('.jsFooterBtnContainer');
                footerBtnContainer.appendChild(travelGlobalFunc.footerBtnClone());

                //check if pending for approval
                if (headerData.ApproverStatusID == 2 || headerData.ApproverStatusID == 5) {
                    footerBtnContainer.querySelector('.jsSendToEngg').remove();

                    wrapper.querySelector('.jsTravelHeaderBtnContainer').innerHTML = '';
                }
                if (headerData.ApproverStatusID == 5) {
                    footerBtnContainer.querySelector('.jsFundRequest').classList.remove('display-none');
                }
                if (headerData.ApproverStatusID == 7 && headerData.LocationStatusID == 4) {
                    footerBtnContainer.querySelector('.jsSendToEngg').remove();

                    wrapper.querySelector('.jsTravelHeaderBtnContainer').innerHTML = '';
                    
                }


            })();


            //display list of traveler
            (function displayListOfTraveler() {

                let addBtn = doc.querySelector('.jsAddTravelers');
                addBtn.classList.remove('disabled');
                addBtn.removeAttribute('disabled');
                addBtn.classList.add('add-items-btn');

                let container = doc.querySelector('.travel-purpose-details-con');

                //remove add button if pending for approval or approved
                if (data.HeaderList.ApproverStatusID == 2 || data.HeaderList.ApproverStatusID == 5) {
                    doc.querySelector('.jsAddTravelersContainer').innerHTML = '';
                } if (data.HeaderList.ApproverStatusID == 7 && data.HeaderList.LocationStatusID == 4) { doc.querySelector('.jsAddTravelersContainer').innerHTML = ''; }

                let list = data.EmployeeDetailList;

                list.forEach((item) => {
                    let itemClone = travelGlobalFunc.addTravelerItemDivClone();

                    itemClone.setAttribute('data-id', item.EmployeeDetailID);

                    itemClone.querySelector('.jsTravelerName').value = item.EmployeeName;
                    itemClone.querySelector('.jsTravelerName').setAttribute('data-id', item.EmployeeID);

                    itemClone.querySelector('.jsKgs').value = item.BaggageWeight;

                    itemClone.querySelector('.jsPositionName').value = item.Position;

                    itemClone.querySelector('.jsBirthDate').value = ToJavascriptDate(item.BirthDate);

                    //append here
                    container.appendChild(itemClone);

                    //disable item
                    travelGlobalFunc.disableItem(container);

                    if (data.HeaderList.ApproverStatusID == 1 || data.HeaderList.ApproverStatusID == 3) {
                        //change the button of save
                        let saveBtn = itemClone.querySelector('.jsSaveEmployeeName');
                        saveBtn.innerHTML = '';
                        saveBtn.id = 'edit';
                        saveBtn.appendChild(travelGlobalFunc.returnSVGEditIcon());
                    }
                    else {
                        //remove button if approve or pending for approval
                        itemClone.querySelector('.option-btn').remove();

                    }

                });

                //row count
                travelGlobalFunc.countRow(container);

            })();


            //display itinerary details
            (function displayItineraryDetails() {
                let addBtn = doc.querySelector('.jsAddItenerary');
                addBtn.classList.remove('disabled');
                addBtn.removeAttribute('disabled');
                addBtn.classList.add('add-items-btn');

                let container = doc.querySelector('.travel-itirerary-details-con');

                //remove add button if pending for approval or approved
                if (data.HeaderList.ApproverStatusID == 2 || data.HeaderList.ApproverStatusID == 5) {
                    doc.querySelector('.jsAddIteneraryContainer').innerHTML = '';
                }
                if (data.HeaderList.ApproverStatusID == 7 && data.HeaderList.LocationStatusID == 4) { doc.querySelector('.jsAddIteneraryContainer').innerHTML = ''; }
                let list = data.ItineraryDetailList;

                list.forEach((item) => {
                    let itemClone = travelGlobalFunc.addItineraryItemDivClone();

                    itemClone.setAttribute('data-id', item.ItineraryDetailID);

                    itemClone.querySelector('.jsFromOrigin').value = item.From;

                    itemClone.querySelector('.jsToDestination').value = item.To;

                    itemClone.querySelector('.jsModeOfTransport').value = item.TransportMode;
                    itemClone.querySelector('.jsModeOfTransport').setAttribute('data-id', item.TransportModeID);

                    itemClone.querySelector('.jsFare').value = item.Fare;

                    //append here
                    container.appendChild(itemClone);

                    //disable item
                    travelGlobalFunc.disableItem(container);

                    if (data.HeaderList.ApproverStatusID == 1 || data.HeaderList.ApproverStatusID == 3) {
                        //change the id and textcontent of save button
                        let saveBtn = itemClone.querySelector('.jsSaveItinerary');
                        saveBtn.innerHTML = '';
                        saveBtn.appendChild(travelGlobalFunc.returnSVGEditIcon());
                        saveBtn.id = 'edit';
                    }
                    else {
                        //remove button if approve or pending for approval
                        itemClone.querySelector('.option-btn').remove();
                    }

                });

                //add row
                travelGlobalFunc.countRow(container);

            })();


            //function accomodation details
            (function displayAccomodationDetails() {
                let btn = doc.querySelector('.jsAddAccomodation');
                btn.classList.remove('disabled');
                btn.removeAttribute('disabled');
                btn.classList.add('add-items-btn');

                let container = doc.querySelector('.travel-hotel-details-con');

                //remove add button if pending for approval or approved
                if (data.HeaderList.ApproverStatusID == 2 || data.HeaderList.ApproverStatusID == 5) {
                    doc.querySelector('.jsAddAccomodationContainer').innerHTML = '';
                }
                if (data.HeaderList.ApproverStatusID == 7 && data.HeaderList.LocationStatusID == 4) { doc.querySelector('.jsAddAccomodationContainer').innerHTML = ''; }
                let list = data.AccomodationDetailList;

                list.forEach((item) => {
                    let itemClone = travelGlobalFunc.addAccomodationItemDivClone();

                    itemClone.setAttribute('data-id', item.AccomodationDetailID);

                    itemClone.querySelector('.jsAccomodationName').value = item.AccomodationType;
                    itemClone.querySelector('.jsAccomodationName').setAttribute('data-id', item.AccomodationTypeID);

                    itemClone.querySelector('.jsNoOfDays').value = item.NoOfDays;

                    itemClone.querySelector('.jsCost').value = item.Cost;

                    let total = parseFloat(item.NoOfDays * item.Cost).toFixed(2);

                    itemClone.querySelector('.jsAccomodationTotal').value = NumberWithCommas(total);
                    itemClone.querySelector('.jsAccomodationTotal').setAttribute('data-value', total);

                    //append here
                    container.appendChild(itemClone);

                    //disable item
                    travelGlobalFunc.disableItem(container);

                    if (data.HeaderList.ApproverStatusID == 1 || data.HeaderList.ApproverStatusID == 3) {
                        //change the text of save button
                        let saveBtn = itemClone.querySelector('.jsSaveAccomodation');
                        saveBtn.innerHTML = '';
                        saveBtn.appendChild(travelGlobalFunc.returnSVGEditIcon());
                        saveBtn.id = 'edit';
                    }
                    else {
                        //remove button if approve or pending for approval
                        itemClone.querySelector('.option-btn').remove();

                    }

                });

                //count row
                travelGlobalFunc.countRow(container);

            })();

            travelGlobalFunc.GrandTotalForTravel();
        })();

        NoteInfo(individualData.NoteList);

        function backButtonIndividualRecord() {

            let div = `
                    <i class="back-arrow jsBackArrow">
                        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" height="25px"><path fill="#FFF" d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></path></svg>
                    </i>`;

            let parser = new DOMParser().parseFromString(div, 'text/html').querySelector('.jsBackArrow');

            parser.addEventListener('click', async function (e) {

                let view = await fetchView(AppGlobal.baseUrl + 'TravelRecord/Index');

                travelGlobalFunc.responseSuccessIndexRecord(view);
            });

            return parser;
        }

        if (id == 'funds') {
            parser.querySelector('.materials-footer').innerHTML = '';
            parser.querySelector('.jsTravelHeaderBtnContainer').innerHTML = '';
            parser.querySelector('.jsAddTravelersContainer').innerHTML = '';
            //parser.querySelector('.jsAddItenerary').innerHTML = '';
            //parser.querySelector('.jsAddAccomodation').innerHTML = '';

            let div = `
                    <i class="back-arrow jsBackArrow">
                        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" height="25px"><path fill="#FFF" d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"></path></svg>
                    </i>`;

            let parserarrow = new DOMParser().parseFromString(div, 'text/html').querySelector('.jsBackArrow');

            parser.querySelector('.js-backBtn').appendChild(parserarrow);

            parser.querySelector('.js-backBtn').addEventListener('click', function () {
                fundrequestGlobalObj.centerPanel.innerHTML = '';
                fundrequestGlobalObj.centerPanel.appendChild(fundrequestGlobalObj.DomPreviousView);
            });

        } else {
            parser.querySelector('.js-backBtn').appendChild(backButtonIndividualRecord());
        }
    },
    responseSuccessIndexRecord: async function (view) {
        travelGlobalFunc.centerPanel.innerHTML = '';
        travelGlobalFunc.rightPanel.innerHTML = '';


        let parser = new DOMParser().parseFromString(view, 'text/html').querySelector('.container');

        travelGlobalFunc.data = await fetchDataGet(AppGlobal.baseUrl + 'TravelRecord/GetTravelRequestRecordReferenceData');


        let allProjectObj = {
            ProjectID: 0,
            ProjectName: 'All'
        };

        travelGlobalFunc.data.ProjectList.unshift(allProjectObj);

        //load to bst
        travelGlobalFunc.ProjectNameBST = LoadDataToBST(travelGlobalFunc.data.ProjectList, 'ProjectID');

        travelGlobalFunc.filterData = [];

        //add rowcount column in recordlist
        travelGlobalFunc.data.RecordList.forEach((item, index) => {
            item.RowCount = index + 1;

            travelGlobalFunc.filterData.push(item);
        });

        //display record
        travelGlobalFunc.displayRecord(travelGlobalFunc.filterData, parser);


        if (travelGlobalFunc.data.RecordList.length > 10) {
            travelGlobalFunc.recordBST = LoadDataToBST(travelGlobalFunc.data.RecordList, 'DocumentRefID');
        }
        else {
            travelGlobalFunc.recordLL = LoadDataToLinkedList(travelGlobalFunc.data.RecordList);
        }

        travelGlobalFunc.centerPanel.appendChild(parser);

        travelGlobalFunc.assignEventListenersRecord(parser);
    },
    assignEventListenersRecord: function (doc) {
        DropdownList(doc.querySelector('.jsProjectOrigin'), travelGlobalFunc.ProjectNameBST, function () {

            travelGlobalFunc.sortDefaults(doc);
            travelGlobalFunc.filterRecord(doc);
        });

        DropdownList(doc.querySelector('.jsProjectDestination'), travelGlobalFunc.ProjectNameBST, function () {
            travelGlobalFunc.sortDefaults(doc);
            travelGlobalFunc.filterRecord(doc);
        });
        doc.querySelector('.jsDateFrom').addEventListener('change', function () {
            travelGlobalFunc.sortDefaults(doc);
            travelGlobalFunc.filterRecord(doc);
        });
        doc.querySelector('.jsDateTo').addEventListener('change', function () {
            travelGlobalFunc.sortDefaults(doc);
            travelGlobalFunc.filterRecord(doc);
        });
        doc.querySelectorAll('.jsSortByColumn').forEach((item) => {

            item.addEventListener('click', function (e) {

                let el = e.currentTarget;

                travelGlobalFunc.sortData(el);

            });

        });
        doc.querySelector('.jsReferenceNo').addEventListener('change', function (e) {

            if (e.target.value == '') {
                if (travelGlobalFunc.data.RecordList.length > 10) {
                    travelGlobalFunc.recordBST = LoadDataToBST(travelGlobalFunc.data.RecordList, 'DocumentRefID');
                    travelGlobalFunc.filterData = travelGlobalFunc.recordBST.BFS();
                } else {
                    travelGlobalFunc.recordLL = new LinkedList();
                    travelGlobalFunc.data.RecordList.forEach((item) => {
                        travelGlobalFunc.recordLL.push(item);
                    });
                    travelGlobalFunc.filterData = travelGlobalFunc.recordLL.getAll()
                }
            } else {
                if (travelGlobalFunc.data.RecordList.length > 10) {
                    travelGlobalFunc.recordBST = LoadDataToBST(travelGlobalFunc.data.RecordList, 'DocumentRefID');
                    travelGlobalFunc.filterData = travelGlobalFunc.recordBST.BFSbyIndexOf(e.target.value, 'ReferenceNo');
                } else {
                    travelGlobalFunc.recordLL = new LinkedList();
                    travelGlobalFunc.data.RecordList.forEach((item) => {
                        travelGlobalFunc.recordLL.push(item);
                    });
                    travelGlobalFunc.filterData = travelGlobalFunc.recordLL.searchByIndex('ReferenceNo', e.target.value);
                }
            }


            travelGlobalFunc.displayRecord(travelGlobalFunc.filterData, doc);

        });
    },
    displayRecord: function (data, doc) {
        let tblBody = doc.querySelector('.jsTRRecordTbody');

        tblBody.innerHTML = '';

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
                        <div>${item.IsRead == true ? 'Read' : 'Unread'}</div>
                    </div>
                    `;

                let parser = new DOMParser().parseFromString(div, 'text/html').querySelector('.tr-recordTbodyItems');

                parser.addEventListener('click', async function (e) {

                    let view = await fetchView(AppGlobal.baseUrl + 'Travel/IndexTravelNew');

                    let documentRefID = item.DocumentRefID;

                    travelGlobalFunc.responseSuccessIndividualRecord(view, documentRefID);

                });

                tblBody.appendChild(parser);

            });

        }
        else {
            let div = `<div class="jsNoRecordFound no-record-found">No record found.</div>`;

            let parser = new DOMParser().parseFromString(div, 'text/html').querySelector('.jsNoRecordFound');

            tblBody.appendChild(parser);
        }
    },
    filterRecord: function (doc) {
        let config = {
            projectOriginID: doc.querySelector('.jsProjectOrigin').getAttribute('data-id') || 0,
            projectDestinationID: doc.querySelector('.jsProjectDestination').getAttribute('data-id') || 0,
            dateFrom: doc.querySelector('.jsDateFrom').value || 0,
            dateTo: doc.querySelector('.jsDateTo').value || 0
        };
        let dataArray;
        travelGlobalFunc.filterData = [];

        if (travelGlobalFunc.data.RecordList.length > 10) {
            dataArray = travelGlobalFunc.recordBST.BFS();

            pushToFilterdata();

            travelGlobalFunc.displayRecord(travelGlobalFunc.filterData, doc);

        }
        else {
            dataArray = travelGlobalFunc.recordLL.getAll();

            pushToFilterdata();

            travelGlobalFunc.displayRecord(travelGlobalFunc.filterData, doc);
        }

        function pushToFilterdata() {

            if (dataArray && dataArray.length) {
                dataArray.sort((a, b) => a['DocumentRefID'] - b['DocumentRefID']);

                for (var i = 0; i < dataArray.length; i++) {

                    let projecOriginConfig = {

                        value: config.projectOriginID,
                        objKey: 'ProjectOriginID',
                        index: i,
                        dataArray: dataArray
                    }

                    let projDestinationConfig = {

                        value: config.projectDestinationID,
                        objKey: 'ProjectDestinationID',
                        index: i,
                        dataArray: dataArray
                    }

                    let dateRangeConfig = {
                        from: config.dateFrom,
                        to: config.dateTo,
                        objKey: 'TravelDate',
                        index: i,
                        dataArray: dataArray
                    };

                    if (filterDataID(projecOriginConfig) && filterDataID(projDestinationConfig) && filterDateRange(dateRangeConfig)) {
                        travelGlobalFunc.filterData.push(dataArray[i]);
                    }

                }

            }

            function filterDateRange(config) {
                if (!config.from && !config.to) {
                    return true;
                }

                else {
                    if (config.from && !config.to) {
                        return checkFromDate();
                    }
                    else if (!config.from && config.to) {
                        return checkToDate();
                    }
                }

                return checkFromDate() && checkToDate();


                function checkFromDate() {

                    return Date.parse(new Date(ToJavascriptDate(config.dataArray[config.index][config.objKey])).toDateString()) >= Date.parse(new Date(config.from).toDateString());

                }

                function checkToDate() {
                    return Date.parse(new Date(ToJavascriptDate(config.dataArray[config.index][config.objKey])).toDateString()) <= Date.parse(new Date(config.to).toDateString());
                }
            }

            function filterDataID(config) {

                if (config.value == 0) {

                    return true;
                }

                return config.dataArray[config.index][config.objKey] === parseInt(config.value);
            }

        }
    },
    sortDefaults: function (doc) {
        //display the default sort icon for po record
        doc.querySelectorAll('.jsSortByColumn').forEach((item) => {
            item.removeAttribute('data-sourceType');
        });
        doc.querySelectorAll('.sortIcon').forEach((item) => {
            item.setAttribute('style', 'display: none');
        });

        doc.querySelectorAll('.jsSortByColumn')[0].setAttribute('data-sourceType', 'sortUp');
        doc.querySelectorAll('.sortUpIcon')[0].removeAttribute('style');
    },
    sortData: function (el) {
        let doc = el.closest('.travel-record-container');

        //get the columnname
        let columnName = el.getAttribute('data-columnName');

        //check if it has [data-sortType] attribute
        let sortType = el.getAttribute('data-sortType') || null;

        if (sortType) {
            switch (sortType) {

                case 'sortUp':

                    SortDown();

                    break;

                case 'sortDown':

                    SortUp();

                    break;
            }
        }
        else {
            //set default for sort type

            SortUp();
        }


        function SortUp() {

            travelGlobalFunc.filterData.sort(compareSortUp);

            //remove all the [data-sortType] attribute
            doc.querySelectorAll('.jsSortByColumn').forEach((item) => {
                item.removeAttribute('data-sortType');
            });

            //hide all the icon
            doc.querySelectorAll('.sortIcon').forEach((item) => {
                item.setAttribute('style', 'display: none');
            })

            //modify the data-sourceType
            //[data-sourceType] => sortUp || sortDown
            el.setAttribute('data-sortType', 'sortUp');
            el.querySelector('.sortUpIcon').removeAttribute('style');

            travelGlobalFunc.displayRecord(travelGlobalFunc.filterData, doc);
        }

        function SortDown() {

            travelGlobalFunc.filterData.sort(compareSortDown);

            //remove all the [data-sortType] attribute
            doc.querySelectorAll('.jsSortByColumn').forEach((item) => {
                item.removeAttribute('data-sortType');
            });

            //hide all the icon
            doc.querySelectorAll('.sortIcon').forEach((item) => {
                item.setAttribute('style', 'display: none');
            })

            //modify the data-sourceType
            //[data-sourceType] => sortUp || sortDown
            el.setAttribute('data-sortType', 'sortDown');
            el.querySelector('.sortDownIcon').removeAttribute('style');

            travelGlobalFunc.displayRecord(travelGlobalFunc.filterData, doc);
        }

        function compareSortUp(a, b) {

            if (a[columnName] < b[columnName]) {
                return -1;
            }
            if (a[columnName] > b[columnName]) {
                return 1;
            }
            return 0;
        }

        function compareSortDown(a, b) {

            if (a[columnName] > b[columnName]) {
                return -1;
            }
            if (a[columnName] < b[columnName]) {
                return 1;
            }
            return 0;
        }
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
 
        if (data.StatusCodeNumber == 1) {

            //Load to BST
            travelGlobalFunc.ProjectNumberBST = LoadDataToBST(data.ProjectNumber, 'ProjectID');
            travelGlobalFunc.ProjectNameBST = LoadDataToBST(data.ProjectName, 'ProjectID');
            travelGlobalFunc.EmployeeNameBST = LoadDataToBST(data.EmployeeName, 'ID');

            //Load to LL
            travelGlobalFunc.AccomodationTypeLL = LoadDataToLinkedList(data.AccomodationType);
            travelGlobalFunc.ModeOfTransportLL = LoadDataToLinkedList(data.TransportMode);

            AssignEventListener(travelContainer);
        }
    }
    function AssignEventListener(doc) {

        //project DropdownList
        travelGlobalFunc.projectDropdownList(doc);

        DropdownList(doc.querySelector('.jsProjectNumberDestination'), travelGlobalFunc.ProjectNumberBST, function (obj) {

            let projectNameObj = travelGlobalFunc.ProjectNameBST.BFSbyPropertyAndValue('ProjectID', doc.querySelector('.jsProjectNumberDestination').getAttribute('data-id'));

            
            doc.querySelector('.jsProjectNumberDestination').setAttribute('data-id', projectNameObj[0].ProjectID);
            doc.querySelector('.jsProjectNameDestination').value = projectNameObj[0].ProjectName;
        });
        DropdownList(doc.querySelector('.jsProjectNameDestination'), travelGlobalFunc.ProjectNameBST, function (obj) {

            let projectNumberObj = travelGlobalFunc.ProjectNumberBST.BFSbyPropertyAndValue('ProjectID', doc.querySelector('.jsProjectNameDestination').getAttribute('data-id'));

            
            doc.querySelector('.jsProjectNumberDestination').setAttribute('data-id', projectNumberObj[0].ProjectID);
            doc.querySelector('.jsProjectNumberDestination').value = projectNumberObj[0].ProjectNumber;
        });

        doc.querySelector('.jstravelHeaderBtn').addEventListener('click', travelGlobalFunc.saveTRHeader);
        
        doc.querySelector('.jsAddTravelers').addEventListener('click', travelGlobalFunc.AddTravelersView);
        doc.querySelector('.jsAddItenerary').addEventListener('click', travelGlobalFunc.AddIteneraryView);
        doc.querySelector('.jsAddAccomodation').addEventListener('click', travelGlobalFunc.AddAccomodationView);

    }
})();

(function TravelRecord() {

    let btn = document.querySelector('.jsClickRecordsTravel');


    if (btn) {
        btn.addEventListener('click', async function (e) {
            let view = await fetchView(AppGlobal.baseUrl + 'TravelRecord/Index');

            travelGlobalFunc.responseSuccessIndexRecord(view);
        });
    }

})();
