const dashboardGlobalObj = {
    centerPanel: document.querySelector('.center-panel'),
    rightPanel: document.querySelector('.right-panel'),
    pendingAdminLL: null,
    pendingAdminBST: null,
    NotificationItem: function () {
        const div =
            `<div class="right-notif-item">
                    <div class="notif-icon">
                        <i>
                            <svg aria-hidden="true" focusable="false" data-prefix="fat" data-icon="memo-pad" class="svg-inline--fa fa-memo-pad" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="25px"><path fill="#333" d="M104 320h240C348.4 320 352 316.4 352 312S348.4 304 344 304h-240C99.59 304 96 307.6 96 312S99.59 320 104 320zM104 224h240C348.4 224 352 220.4 352 216S348.4 208 344 208h-240C99.59 208 96 211.6 96 216S99.59 224 104 224zM104 416h144c4.406 0 8-3.594 8-8s-3.594-8-8-8h-144C99.59 400 96 403.6 96 408S99.59 416 104 416zM384 0H64C28.65 0 0 28.65 0 64v384c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM432 448c0 26.47-21.53 48-48 48H64c-26.47 0-48-21.53-48-48V128h416V448zM432 112h-416V64c0-26.47 21.53-48 48-48h320c26.47 0 48 21.53 48 48V112z"></path></svg>
                        </i>
                    </div>
                    <div class="notif-text">
                        <div class="notif-text-title">
                            <span class="reference-number"></span>
                            <i class="flt-right">
                                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="exclamation-circle" class="svg-inline--fa fa-exclamation-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="15px"><path fill="red" d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"></path></svg>
                            </i>
                        </div>
                        <div class="notif-text-date">
                            <small></small>
                        </div>
                    </div>
                </div>
                `;

        return new DOMParser().parseFromString(div, 'text/html').querySelector('.right-notif-item');
    },
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
        dashboardGlobalObj.AssignEventListernerDetail(parseDoc);
        return parseDoc;
    },
    AssignEventListernerHeader: function (billingContainer) {
        
        billingContainer.querySelector('.jsSendApprove').addEventListener('click', function () {
            IsConfirmedAlertYesOrNoWithTextArea(alertType.warningAlert, 'Are you sure you want to Approve?', false).then(async function (obj) {
                const documentRefID = billingContainer.querySelector('.jsBillingHeader').getAttribute('documentRef-id');
                const note = obj.querySelector('textarea[name=Note]');
                const formData = new FormData();
                formData.append('DocumentRefID', documentRefID);
                formData.append('Note', note.value);
                const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/BillsPaymentRequestApprove', formData);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, 'Successfully Approved!');

                    setTimeout(function () {
                        window.location.reload();
                    }, 2500);


                }
            }).catch(function (error) { console.log(error); });

        });
        billingContainer.querySelector('.jsCancel').addEventListener('click', function () {
            IsConfirmedAlertYesOrNoWithTextArea(alertType.warningAlert, 'Are you sure you want to Cancel?', false).then(async function (obj) {
                const documentRefID = billingContainer.querySelector('.jsBillingHeader').getAttribute('documentRef-id');
                const note = obj.querySelector('textarea[name=Note]');
                const formData = new FormData();
                formData.append('DocumentRefID', documentRefID);
                formData.append('Note', note.value);
                const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/BillsPaymentRequestCancel', formData);
                if (data.StatusCodeNumber == 1) {
                    IsConfirmedAlertOk(alertType.successAlert, 'Successfully Cancel!');

                    setTimeout(function () {
                        window.location.reload();
                    }, 2500);

                }
            }).catch(function (error) { console.log(error); });

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
                            dashboardGlobalObj.DisabledItem(container);
                            btn.id = 'editDetails';
                            btn.innerHTML = '';
                            btn.appendChild(dashboardGlobalObj.returnSVGEditIcon());

                            if (document.querySelector('.billing-details-wrap').querySelectorAll('.jsCheckIcon').length == 0) {
                                document.querySelector('.jsSendApprove').classList.remove('display-none');
                                document.querySelector('.jsCancel').classList.remove('display-none');
                            }
                        }
                    } else {

                        const data = await fetchDataPost(AppGlobal.baseUrl + 'BillsPaymentRequest/SaveBillingPaymentRequestDetail', formData);
                        if (data.StatusCodeNumber == 1) {
                            IsConfirmedAlertOk(alertType.successAlert, alertMessages.saveSuccessfull);

                            dashboardGlobalObj.DisabledItem(container);

                            container.setAttribute('data-id', data.BillsPaymentRequestDetailID);

                            btn.id = 'editDetails';
                            btn.innerHTML = '';
                            btn.appendChild(dashboardGlobalObj.returnSVGEditIcon());

                            if (document.querySelector('.billing-details-wrap').querySelectorAll('.jsCheckIcon').length == 0) {
                                document.querySelector('.jsSendApprove').classList.remove('display-none');
                                document.querySelector('.jsCancel').classList.remove('display-none');
                            }
                        }
                    }
                } else {

                    IsConfirmedAlertOk(alertType.warningAlert, 'fill up all forms');
                }


            } else if (id == 'editDetails') {

                dashboardGlobalObj.EnableItem(container);
                btn.id = 'saveDetails';
                btn.innerHTML = '';
                btn.appendChild(dashboardGlobalObj.returnSVGCheckIcon());
            }

        });
        billingContainer.querySelector('.jsRemoveDetail').addEventListener('click', function (e) {
            const container = e.target.closest('.billing-details');
            const billsPaymentDetailID = container.getAttribute('data-id');
            if (billsPaymentDetailID) {
                IsConfirmedAlertYesOrNo(alertType.warningAlert, 'Are you sure?').then(async function (obj) {
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
                dashboardGlobalObj.Count();

                if (document.querySelector('.billing-details-wrap').querySelectorAll('.jsCheckIcon').length == 0) {
                    document.querySelector('.jsSendApprove').classList.remove('display-none');
                    document.querySelector('.jsCancel').classList.remove('display-none');
                }
            }
        });
        billingContainer.querySelector('.jsAmount').addEventListener('input', function () {
            const container = billingContainer.closest('.billing-details-con');
            billingRequestObj.GrandTotal(container);
        })
        DropdownList(billingContainer.querySelector('.jsBillsPaymentType'), dashboardGlobalObj.BillPaymentTypeLL, function () { });
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
};
(async function DashBoard () {
    let data = await fetchDataGet(AppGlobal.baseUrl + 'Home/GetPendingAdmin');

    let pendingData = data.PendingList;
    dashboardGlobalObj.rightPanel.innerHTML = '';
  
    if (pendingData && pendingData.length > 0) {

        if (pendingData.length > 10) {

            dashboardGlobalObj.pendingAdminBST = LoadDataToBST(pendingData, 'DocumentRefID');
        }
        else {
            dashboardGlobalObj.pendingAdminLL = LoadDataToLinkedList(pendingData);
        }


        let notificationClone = homeNotification();

        notificationClone.querySelector('.jsNotificationItemContainer').innerHTML = '';

        pendingData.forEach((item) => {

            let itemClone = createElemNotif(item);

            notificationClone.querySelector('.jsNotificationItemContainer').appendChild(itemClone);
        });

        dashboardGlobalObj.rightPanel.appendChild(notificationClone);

        eventListeners(notificationClone);

    }
    function eventListeners(notificationClone) {

        notificationClone.querySelector('.jsSearchRefNo').addEventListener('input', function (e) {

            let val = e.target.value;

            let filterData;

            notificationClone.querySelector('.jsNotificationItemContainer').innerHTML = '';

            if (val) {
                if (pendingData.length > 10) {
                    filterData = dashboardGlobalObj.pendingAdminBST.BFSbyIndexOf(val, 'ReferenceNo');
                }
                else {
                    filterData = dashboardGlobalObj.pendingAdminLL.searchByIndex('ReferenceNo', val);
                }

                filterData.forEach((item) => {

                    let itemClone = createElemNotif(item);

                    notificationClone.querySelector('.jsNotificationItemContainer').appendChild(itemClone);
                });
            }
            else {
                pendingData.forEach((item) => {

                    let itemClone = createElemNotif(item);

                    notificationClone.querySelector('.jsNotificationItemContainer').appendChild(itemClone);
                });
            }
        });

    }

    function createElemNotif(data) {

        let cloneElem = dashboardGlobalObj.NotificationItem();

        cloneElem.setAttribute('data-docRefID', data.DocumentRefID);
        cloneElem.setAttribute('data-docRefTypeID', data.DocumentTypeID);

        if (!data.IsRead) {
            cloneElem.classList.add('unread');
        }

        cloneElem.querySelector('.reference-number').textContent = data.ReferenceNo;
        cloneElem.querySelector('small').textContent = data.DateInserted == '/Date(-62135596800000)/' ? '' : TimeAgo(new Date(ToJavascriptDateTime(data.DateInserted)));

        cloneElem.addEventListener('click', function (e) {
            let config = {
                elem: e.currentTarget,
                docRefID: e.currentTarget.getAttribute('data-docRefID')
            };

            ReadBillsPaymentRequest(config)
        });

        return cloneElem;
    }

    async function ReadBillsPaymentRequest(config) {

        const view = await fetchView(AppGlobal.baseUrl + 'BillsPaymentRequest/IndividualRecord');


        dashboardGlobalObj.centerPanel.innerHTML = '';
        dashboardGlobalObj.rightPanel.innerHTML = '';

        let parseDoc = new DOMParser().parseFromString(view, 'text/html').querySelector('.container');
        dashboardGlobalObj.centerPanel.appendChild(parseDoc);

        const data = await fetchDataGet(AppGlobal.baseUrl + 'BillsPaymentRequest/GetBillsPaymentRequestRead/?documentRefID=' + config.docRefID);
        console.log(data);

        if (data.StatusCodeNumber == 1) {

            config.elem.classList.remove('unread');

            const dataHeader = data.BillHeader;
            const dataDetails = data.BillDetail;


            parseDoc.querySelector('.jsStatusApproved').textContent = dataHeader.ApproverStatus;
            parseDoc.querySelector('.jsStatusLocation').textContent = dataHeader.LocationStatus;

            parseDoc.querySelector('.jsBillingHeader').setAttribute('documentRef-id', dataHeader.DocumentRefID);

            parseDoc.querySelector('.jsProjectNumber').setAttribute('data-id', dataHeader.ProjectID);
            parseDoc.querySelector('.jsProjectName').setAttribute('data-id', dataHeader.ProjectID);
            parseDoc.querySelector('.jsProjectNumber').value = dataHeader.ProjectNumber;
            parseDoc.querySelector('.jsProjectName').value = dataHeader.ProjectName;

            parseDoc.querySelector('.jsRequestNo').value = dataHeader.ReferenceNo;
            parseDoc.querySelector('.jsPojectDate').value = ToJavascriptDate(dataHeader.FormDate);

            parseDoc.querySelector('.jsPrepBy label').textContent = dataHeader.PreparedByName;
            if (dataHeader.ApproverStatusID == 2) {
                parseDoc.querySelector('.jsApproveBy').classList.add('display-none');
            } else {
                parseDoc.querySelector('.jsApproveBy label').textContent = dataHeader.ApprovedByName;
            }
            

            dashboardGlobalObj.DisabledItem(parseDoc.querySelector('.jsBillingHeader'));

            const container = parseDoc.querySelector('.billing-details-wrap');
            dataDetails.forEach((item) => {
                let itemClone = dashboardGlobalObj.AddDetailItem();
                itemClone.setAttribute('data-id', item.BillsPaymentRequestDetailID);
                itemClone.querySelector('.jsBillsPaymentType').setAttribute('data-id', item.BillsPaymentTypeID);
                itemClone.querySelector('.jsBillsPaymentType').value = item.BillsPaymentType;
                itemClone.querySelector('.jsAmount').value = item.Amount;



                let btn = itemClone.querySelector('.jsSaveDetail');
                btn.innerHTML = '';
                btn.id = 'editDetails';
                btn.appendChild(dashboardGlobalObj.returnSVGEditIcon());

                container.appendChild(itemClone);
                dashboardGlobalObj.DisabledItem(container);
                dashboardGlobalObj.Count();
            });
            
            parseDoc.querySelector('.jsSaveBillingHeaderBtn').classList.add('display-none');
            parseDoc.querySelector('.jsAddItemBtn').classList.add('display-none');

            dashboardGlobalObj.AssignEventListernerHeader(parseDoc);
            billingRequestObj.GrandTotal(parseDoc.querySelector('.billing-details-con'));
        }
    }
})();