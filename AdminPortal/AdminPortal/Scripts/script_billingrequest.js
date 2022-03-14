const billingRequestObj = {
    centerPanel: document.querySelector('.center-panel'),
    rightPanel: document.querySelector('.right-panel'),
    ProjectNumberBST: null,
    ProjectNameBST: null,
    BillPaymentTypeLL: null,
    AddDetailItem: function () {
        let div = `<div class="billing-details jsCloneItem">
                    <div class="flex-center">
                        <label class="count"></label>
                    </div>
                    <div>
                        <div class="form-groups input-icon-wrap">

                            <input type="text" name="billsPaymentType" autocomplete="off" class="customDropdownInput jsBillsPaymentType" propertyid="ID" data-propertyname="BillsPaymentType" data-sourcetype="ll" required="">
                            <i class="customDropdownIcon">
                                <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="17px"><path class="caret-down" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
                            </i>
                            <ul class="customDropdownUL" style="display: none"></ul>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <input type="text" name="amount" class="jsAmount" required="">
                    </div>
                    <div class="option-btn jsUnsaved">
                        <button class="save-material-details success-btn jsSaveDetail" id="saveDetails">
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" class="svg-inline--fa fa-check fa-w-14 jsCheckIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16px"><path fill="#FFF" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>
                        </button>
                        <button class="remove-material-details remove-btn jsRemoveDetail" id="removeDetails">
                            <svg style="pointer-events: none" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="13px"><path fill="#FFF" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                        </button>
                    </div>
                </div>`;
        let parseDoc = new DOMParser().parseFromString(div, 'text/html').querySelector('.billing-details');
        //billingRequestObj.AssignEventListernerDetail(parseDoc);
        return parseDoc;
    },
    AssignEventListernerHeader: function (billingContainer) {
        billingContainer.querySelector('.jsSaveBillingHeaderBtn').addEventListener('click', async function (e) {

            const container = e.target.closest('.material-header-wrapper');
            const btn = e.target;
            const id = e.target.id;
            if (id == 'new') {
                if (ValidateForm(container)) {
                    const documentID = container.querySelector('.jsBillingHeader').getAttribute('documentRef-id');
                    const projectID = container.querySelector('.jsProjectNumber').getAttribute('data-id');
                    const formDate = container.querySelector('.jsPojectDate').value;

                    const formData = new FormData();

                    formData.append('DocumentRefID', documentID);
                    formData.append('ProjectID', projectID);
                    formData.append('FormDate', formDate);

                    if (documentID) {
                        const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/UpdateBillsPaymentRequestMaster', formData);
                        if (data.StatusCodeNumber == 1) {
                            IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);

                            billingRequestObj.DisabledItem(container);
                            btn.id = 'edit';
                            btn.textContent = 'Edit';
                        }


                    } else {

                        const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/SaveBillsPaymentRequestMaster', formData);
                        if (data.StatusCodeNumber == 1) {
                            IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);

                            billingRequestObj.DisabledItem(container);

                            container.querySelector('.jsBillingHeader').setAttribute('documentRef-id', data.DocumentRefID);
                            container.querySelector('.jsRequestNo').value = data.ReferenceNo;

                            btn.id = 'edit';
                            btn.textContent = 'Edit';

                            container.closest('.material-wrapper').querySelector('.jsAddItemBtn').removeAttribute('disabled');
                            container.closest('.material-wrapper').querySelector('.jsAddItemBtn').classList.remove('disabled');
                            container.closest('.material-wrapper').querySelector('.jsAddItemBtn').classList.add('addOvertimeItems-btn');
                        }
                    }


                } else {
                    IsConfirmedAlertOk(alertType.warningAlert, 'fill up all forms');
                }
            } else if (id == 'edit') {

                billingRequestObj.EnableItem(container);
                btn.id = 'new';
                btn.textContent = 'Save';
            }

        });

        billingContainer.querySelector('.jsAddItemBtn').addEventListener('click', function () {

            const tbody = billingContainer.querySelector('.billing-details-wrap');
            let parseDoc = billingRequestObj.AddDetailItem();
            tbody.appendChild(parseDoc);

            billingRequestObj.Count();

            if (document.querySelector('.billing-details-wrap').querySelectorAll('.jsCheckIcon').length > 0) {
                document.querySelector('.jsSendApprover').classList.add('display-none');
            }
        });
        billingContainer.querySelector('.jsSendApprover').addEventListener('click', function () {
            IsConfirmedAlertYesOrNo(alertType.warningAlert, 'Are you sure you want to send?').then(async function (obj) {
                const documentRefID = billingContainer.querySelector('.jsBillingHeader').getAttribute('documentRef-id');

                const formData = new FormData();
                formData.append('DocumentRefID', documentRefID);

                const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/BillsPaymentRequestSendToAdmin', formData);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, 'Successfully Send!');

                    billingContainer.querySelector('.jsStatusApproved').textContent = 'Pending For Approval';
                    billingContainer.querySelector('.jsStatusLocation').textContent = 'Sent To Approver';

                    billingContainer.querySelectorAll('button').forEach((item) => {
                        item.classList.add('display-none');
                    });

                }
            }).catch(function (error) { console.log(error); });

        });
        DropdownList(billingContainer.querySelector('.jsProjectNumber'), billingRequestObj.ProjectNumberBST, function () {

            let projectNameObj = billingRequestObj.ProjectNameBST.BFSbyPropertyAndValue('ProjectID', billingContainer.querySelector('.jsProjectNumber').getAttribute('data-id'));

            billingContainer.querySelector('.jsProjectName').value = projectNameObj[0].ProjectName;
            billingContainer.querySelector('.jsProjectName').setAttribute('data-id', projectNameObj[0].ProjectID);

        });
        DropdownList(billingContainer.querySelector('.jsProjectName'), billingRequestObj.ProjectNameBST, function () {

            let projectNumberObj = billingRequestObj.ProjectNumberBST.BFSbyPropertyAndValue('ProjectID', billingContainer.querySelector('.jsProjectName').getAttribute('data-id'));

            billingContainer.querySelector('.jsProjectNumber').value = projectNumberObj[0].ProjectNumber;
            billingContainer.querySelector('.jsProjectNumber').setAttribute('data-id', projectNumberObj[0].ProjectID);
        });

    },
    AssignEventListernerDetail: function (billingContainer) {
        billingContainer.querySelector('.jsSaveDetail').addEventListener('click', async function (e) {
            const container = e.target.closest('.billing-details');
            const btn = e.currentTarget;
            const id = e.currentTarget.id;

            if (id == 'saveDetails') {
                if (ValidateForm(container)) {
                    const billingDetailsID = container.getAttribute('data-id');
                    const documentRefID = document.querySelector('.jsBillingHeader').getAttribute('documentRef-id');
                    const billingType = container.querySelector('.jsBillsPaymentType').getAttribute('data-id');
                    const amount = container.querySelector('.jsAmount').value;

                    const formData = new FormData();

                    formData.append('BillsPaymentRequestDetailID', billingDetailsID);
                    formData.append('DocumentRefID', documentRefID);
                    formData.append('BillsPaymentTypeID', billingType);
                    formData.append('Amount', amount);

                    if (billingDetailsID) {
                        const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/UpdateBillsPaymentRequestDetail', formData);
                        if (data.StatusCodeNumber == 1) {
                            IsConfirmedAlertOk(alertType.successAlert, alertMessages.updateSuccessfull);
                            billingRequestObj.DisabledItem(container);
                            btn.id = 'editDetails';
                            btn.innerHTML = '';
                            btn.appendChild(billingRequestObj.returnSVGEditIcon());

                            if (document.querySelector('.billing-details-wrap').querySelectorAll('.jsCheckIcon').length == 0) {
                                document.querySelector('.jsSendApprover').classList.remove('display-none');
                            }
                        }
                    } else {

                        const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/SaveBillingPaymentRequestDetail', formData);
                        if (data.StatusCodeNumber == 1) {
                            IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);

                            billingRequestObj.DisabledItem(container);

                            container.setAttribute('data-id', data.BillsPaymentRequestDetailID);

                            btn.id = 'editDetails';
                            btn.innerHTML = '';
                            btn.appendChild(billingRequestObj.returnSVGEditIcon());

                            if (document.querySelector('.billing-details-wrap').querySelectorAll('.jsCheckIcon').length == 0) {
                                document.querySelector('.jsSendApprover').classList.remove('display-none');
                            }
                        }
                    }
                } else {

                    IsConfirmedAlertOk(alertType.warningAlert, 'fill up all forms');
                }


            } else if (id == 'editDetails') {

                billingRequestObj.EnableItem(container);
                btn.id = 'saveDetails';
                btn.innerHTML = '';
                btn.appendChild(billingRequestObj.returnSVGCheckIcon());
            }

        });
        billingContainer.querySelector('.jsRemoveDetail').addEventListener('click', function (e) {
            const container = e.target.closest('.billing-details');
            const billsPaymentDetailID = container.getAttribute('data-id');
            if (billsPaymentDetailID) {
                IsConfirmedAlertYesOrNoWithTextArea(alertType.warningAlert, 'Are you sure?', false).then(async function (obj) {
                    const formData = new FormData();
                    formData.append('BillsPaymentRequestDetailID', billsPaymentDetailID);

                    const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/DeleteBillsPaymentRequestDetail', formData);

                    if (data.StatusCodeNumber == 1) {
                        IsConfirmedAlertOk(alertType.successAlert, alertMessages.deleteSuccessfull);
                        container.remove();
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            } else {
                container.remove();
                billingRequestObj.Count();

                if (document.querySelector('.billing-details-wrap').querySelectorAll('.jsCheckIcon').length == 0) {
                    document.querySelector('.jsSendApprover').classList.remove('display-none');
                }
            }
        });

        DropdownList(billingContainer.querySelector('.jsBillsPaymentType'), billingRequestObj.BillPaymentTypeLL, function () { });
    },
    DisabledItem: function (parentEl) {
        parentEl.querySelectorAll('input[required]').forEach((item) => {

            if (item.classList.contains('customDropdownInput')) {
                item.closest('.input-icon-wrap').classList.add('disabled');
                item.closest('.input-icon-wrap').classList.add('border-none');
                item.closest('.input-icon-wrap').querySelector('.customDropdownIcon').classList.add('display-none');
                item.closest('.input-icon-wrap').querySelector('input').setAttribute('disabled', 'disabled');
            }
            else {
                item.setAttribute('disabled', 'disabled');
            }
        });
    },
    EnableItem: function (parentEl) {
        parentEl.querySelectorAll('input[required]').forEach((item) => {

            if (item.classList.contains('customDropdownInput')) {
                item.closest('.input-icon-wrap').classList.remove('disabled');
                item.closest('.input-icon-wrap').classList.remove('border-none');
                item.closest('.input-icon-wrap').querySelector('.customDropdownIcon').classList.remove('display-none');
                item.closest('.input-icon-wrap').querySelector('input').removeAttribute('disabled');
            }
            else {
                item.removeAttribute('disabled');
            }
        });
    },
    returnSVGEditIcon: function () {

        let div = `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18 jsEditIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="16px"><path fill="#FFF" d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z"></path></svg>`;

        return new DOMParser().parseFromString(div, 'text/html').querySelector('.jsEditIcon');
    },

    returnSVGCheckIcon: function () {

        let div = `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" class="svg-inline--fa fa-check fa-w-14 jsCheckIcon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16px"><path fill="#FFF" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>`;

        return new DOMParser().parseFromString(div, 'text/html').querySelector('.jsCheckIcon');
    },
    Count: function () {
        document.querySelectorAll('.jsCloneItem').forEach((item, index) => {
            item.querySelector('.count').textContent = index + 1;
        });

    },
    GrandTotal: function (container) {

        let grandTotal = 0;

        let amount = container.querySelectorAll('.jsAmount');
        amount.forEach((item) => {

            grandTotal += parseFloat(item.value) || 0;

        });
        container.querySelector('.jsGrandTotal b').textContent = 'P ' + NumberWithCommas(parseFloat(grandTotal).toFixed(2));
    },
};
(function BillingRecord() {
    const btn = document.querySelector('.jsClickBillingRecords');
    let filterData, dataRecords, recordsLL, recordsBST;
    if (btn) {
        btn.addEventListener('click', async function () {
            const view = await fetchView(AppGlobal.baseUrl + 'BillsPaymentRequest/IndexRecords');
            ResponseSuccess(view);
        });
    }

    async function ResponseSuccess(view) {
        billingRequestObj.centerPanel.innerHTML = '';
        billingRequestObj.rightPanel.innerHTML = '';

        let parser = new DOMParser().parseFromString(view, 'text/html').querySelector('.container');

        billingRequestObj.centerPanel.appendChild(parser);
        LoadReferenceData(parser);
    }

    async function LoadReferenceData(billsContainer) {
        const data = await fetchDataGet(AppGlobal.baseUrl + 'BillsPaymentRequest/GetBillsPaymentRequestRecordReference');

        if (data.StatusCodeNumber == 1) {
            let allProjectObj = {
                ProjectID: 0,
                ProjectName: 'All'
            };

            data.ProjectName.unshift(allProjectObj);

            billingRequestObj.ProjectNameBST = LoadDataToBST(data.ProjectName, 'ProjectID');
            filterData = [];
            dataRecords = data.BillsList;
            dataRecords.forEach((item, index) => {
                item.RowCount = index + 1;
                filterData.push(item);
            });
            DisplayRecord(filterData, billsContainer);

            if (dataRecords.length > 10) {
                recordsBST = LoadDataToBST(dataRecords, 'DocumentRefID');
                filterData = recordsBST.BFS();
            } else {
                recordsLL = new LinkedList();
                dataRecords.forEach((item) => {
                    recordsLL.push(item);
                });
                filterData = recordsLL.getAll()
            }


            AssignEventListenerFilter(billsContainer)
        }
      
    }

    function DisplayRecord(data, billsContainer) {
        const tblBody = billsContainer.querySelector('.mrRecordsTableDetailsWrapper');
        tblBody.innerHTML = '';
        if (data.length > 0) {
            data.forEach((item) => {
                let view = ` <div class="recordsTableDetails-bills" data-id='${item.DocumentRefID}'>
                                <div class="flex-center">
                                    <label>${item.RowCount}</label>
                                </div>
                                <div>${item.ReferenceNo}</div>
                                <div>${item.ProjectName}</div>
                                <div>${ToJavascriptDate(item.FormDate)}</div >
                                <div>${item.LocationStatus}</div>
                                <div>${item.ApproverStatus}</div>
                                <div>${item.IsRead == true ? 'Read' : 'Unread'}</div>
                            </div>`;

                let parseDoc = new DOMParser().parseFromString(view, 'text/html').querySelector('.recordsTableDetails-bills');
                tblBody.appendChild(parseDoc);

                parseDoc.addEventListener('click', DisplayIndividualRecord);

            });
        } else {

            let div = `<div class="jsNoRecordFound no-record-found">No record found.</div>`;

            let parser = new DOMParser().parseFromString(div, 'text/html').querySelector('.jsNoRecordFound');

            tblBody.appendChild(parser);
        }


    }

    async function DisplayIndividualRecord(e) {
        billingRequestObj.centerPanel.innerHTML = '';
        let documentRefID = e.currentTarget.getAttribute('data-id');

        const view = await fetchView(AppGlobal.baseUrl + 'BillsPaymentRequest/IndividualRecord');

        let parseDoc = new DOMParser().parseFromString(view, 'text/html');
        let billsContainer = parseDoc.querySelector('.container');

        billingRequestObj.centerPanel.appendChild(billsContainer);

        const data = await fetchDataGet(AppGlobal.baseUrl + 'BillsPaymentRequest/GetBillsPaymentRequestIndividualRecord/?documentRefID=' + documentRefID);
        console.log(data);
        if (data.StatusCodeNumber == 1) {
            const dataHeader = data.BillHeader;
            const dataDetails = data.BillDetail;


            billsContainer.querySelector('.jsStatusApproved').textContent = dataHeader.ApproverStatus;
            billsContainer.querySelector('.jsStatusLocation').textContent = dataHeader.LocationStatus;

            billsContainer.querySelector('.jsBillingHeader').setAttribute('documentRef-id', dataHeader.DocumentRefID);

            billsContainer.querySelector('.jsProjectNumber').setAttribute('data-id', dataHeader.ProjectID);
            billsContainer.querySelector('.jsProjectName').setAttribute('data-id', dataHeader.ProjectID);
            billsContainer.querySelector('.jsProjectNumber').value = dataHeader.ProjectNumber;
            billsContainer.querySelector('.jsProjectName').value = dataHeader.ProjectName;

            billsContainer.querySelector('.jsRequestNo').value = dataHeader.ReferenceNo;
            billsContainer.querySelector('.jsPojectDate').value = ToJavascriptDate(dataHeader.FormDate);

            billingRequestObj.DisabledItem(billsContainer.querySelector('.jsBillingHeader'));

            billsContainer.querySelector('.jsPrepBy label').textContent = dataHeader.PreparedByName;
            if (dataHeader.ApproverStatusID == 4) {
                billsContainer.querySelector('.jsApproveBy b').textContent = 'Canceled By:';
                billsContainer.querySelector('.jsApproveBy label').textContent = dataHeader.ApprovedByName;
            } else {
                billsContainer.querySelector('.jsApproveBy b').textContent = 'Approved By:';
                billsContainer.querySelector('.jsApproveBy label').textContent = dataHeader.ApprovedByName;
            }

            const container = billsContainer.querySelector('.billing-details-wrap');
            dataDetails.forEach((item) => {
                let itemClone = billingRequestObj.AddDetailItem();
                itemClone.setAttribute('data-id', item.BillsPaymentRequestDetailID);
                itemClone.querySelector('.jsBillsPaymentType').setAttribute('data-id', item.BillsPaymentTypeID);
                itemClone.querySelector('.jsBillsPaymentType').value = item.BillsPaymentType;
                itemClone.querySelector('.jsAmount').value = item.Amount;


                container.appendChild(itemClone);
                billingRequestObj.DisabledItem(container);
                billingRequestObj.Count();
            });

            billsContainer.querySelectorAll('button').forEach((item) => {
                item.classList.add('display-none');
            });
            billingRequestObj.GrandTotal(container.closest('.billing-details-con'));
            billsContainer.querySelector('.js-backBtn').addEventListener('click', async function () {
                const view = await fetchView(AppGlobal.baseUrl + 'BillsPaymentRequest/IndexRecords');
                ResponseSuccess(view);
            });
        }
    }

    function AssignEventListenerFilter(billsContainer) {
        billsContainer.querySelector('.jsFromDate').addEventListener('change', function () {
            FilterRecord(billsContainer);
        });
        billsContainer.querySelector('.jsToDate').addEventListener('change', function () {
            FilterRecord(billsContainer);
        });
        billsContainer.querySelector('.jsrefNumber').addEventListener('change', function (e) {

            if (e.target.value == '') {
                if (dataRecords.length > 10) {
                    recordsBST = LoadDataToBST(dataRecords, 'DocumentRefID');
                    filterData = recordsBST.BFS();
                } else {
                    recordsLL = new LinkedList();
                    dataRecords.forEach((item) => {
                        recordsLL.push(item);
                    });
                    filterData = recordsLL.getAll()
                }
            } else {
                if (dataRecords.length > 10) {
                    recordsBST = LoadDataToBST(dataRecords, 'DocumentRefID');
                    filterData = recordsBST.BFSbyIndexOf(e.target.value, 'ReferenceNo');
                } else {
                    recordsLL = new LinkedList();
                    dataRecords.forEach((item) => {
                        recordsLL.push(item);
                    });
                    filterData = recordsLL.searchByIndex('ReferenceNo', e.target.value);
                }
               
            }

            DisplayRecord(filterData, billsContainer);
        });

        DropdownList(billsContainer.querySelector('.jsProjectNumber'), billingRequestObj.ProjectNameBST, function () {
            FilterRecord(billsContainer);
        });

        billsContainer.querySelectorAll('.jsSortByColumn').forEach((item) => {

            item.addEventListener('click', function (e) {

                let el = e.currentTarget;

                SortData(el);

            });

        });
    }

    function FilterRecord(doc) {
        let config = {
            projectID: doc.querySelector('.jsProjectNumber').getAttribute('data-id') || 0,
            dateFrom: doc.querySelector('.jsFromDate').value || 0,
            dateTo: doc.querySelector('.jsToDate').value || 0
        }
        let dataArray;
        filterData = [];
        if (dataRecords.length > 10) {
            //search here using binary search
            dataArray = recordsBST.BFS();

            PushToFilterData();

            DisplayRecord(filterData, doc);

        }
        else {
            //search here using linked list
            dataArray = recordsLL.getAll();

            PushToFilterData();

            DisplayRecord(filterData, doc);
        }

        function PushToFilterData() {

            if (dataArray && dataArray.length) {
                dataArray.sort((a, b) => a['DocumentRefID'] - b['DocumentRefID']);
            }

            for (var i = 0; i < dataArray.length; i++) {

                let projConfig = {

                    value: config.projectID,
                    objKey: 'ProjectID',
                    index: i,
                    dataArray: dataArray
                }

                let dateRangeConfig = {
                    from: config.dateFrom,
                    to: config.dateTo,
                    objKey: 'FormDate',
                    index: i,
                    dataArray: dataArray
                };
                if (FilterProject(projConfig) && CheckDateRange(dateRangeConfig)) {
                    filterData.push(dataArray[i]);
                }
            }


            function FilterProject(config) {

                if (config.value == 0) {

                    return true;
                }

                return config.dataArray[config.index][config.objKey] === parseInt(config.value);
            }

            function CheckDateRange(config) {

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
        }
    }

    function SortData(el) {
        console.log(el.closest('.material-wrapper'))
        let doc = el.closest('.material-wrapper');

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

            filterData.sort(compareSortUp);

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

            DisplayRecord(filterData, doc);
        }

        function SortDown() {

            filterData.sort(compareSortDown);

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

            DisplayRecord(filterData, doc);
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
})();