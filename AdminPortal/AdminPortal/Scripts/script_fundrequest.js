const fundrequestGlobalObj = {
    centerPanel: document.querySelector('.center-panel'),
    rightPanel: document.querySelector('.right-panel'),
    ProjectNameBST: null,
};
(function FundRequestRecords() {
    let menuBtn = document.querySelector('.jsFundRequestRecords');
    let filterData, dataRecords, dataRecordsBST, dataRecordsLL;
    if (menuBtn) {
        menuBtn.addEventListener('click', async function () {
            let view = await fetchView(AppGlobal.baseUrl + 'FundRequest/Index');
            ResponseSuccess(view);
        })
    }
   
    async function ResponseSuccess(view) {
        fundrequestGlobalObj.centerPanel.innerHTML = '';
        fundrequestGlobalObj.rightPanel.innerHTML = '';

        let parseDoc = new DOMParser().parseFromString(view, 'text/html').querySelector('.container');
        fundrequestGlobalObj.centerPanel.appendChild(parseDoc);
        LoadReferenceData(parseDoc);
    }
    async function LoadReferenceData(fundsContainer) {
        let data = await fetchDataGet(AppGlobal.baseUrl + 'FundRequest/GetFundRequestRecordReferenceData');
        if (data.StatusCodeNumber == 1) {
            filterData = [];
            dataRecords = data.FundRequestList;
            dataRecords.forEach((item, index) => {
                item.RowCount = index + 1;
                filterData.push(item);
            });

            DisplayRecord(filterData, fundsContainer);

            let allProjectObj = {
                ProjectID: 0,
                ProjectName: 'All'
            };

            data.ProjectNameList.unshift(allProjectObj);

            fundrequestGlobalObj.ProjectNameBST = LoadDataToBST(data.ProjectNameList, 'ProjectID');


            if (dataRecords.length > 10) {
                dataRecordsBST = LoadDataToBST(dataRecords, 'DocumentRefID');
                filterData = dataRecordsBST.BFS();
            } else {
                dataRecordsLL = new LinkedList();
                dataRecords.forEach((item) => {
                    dataRecordsLL.push(item);
                });
                filterData = dataRecordsLL.getAll()
            }

            AssignEventListenerFilter(fundsContainer);
        }

    }
    function DisplayRecord(data, fundsContainer) {
        let tblBody = fundsContainer.querySelector('.jsTRRecordTbody');
        tblBody.innerHTML = '';
        if (data.length > 0) {
            data.forEach((item) => {
                let div = `<div class="tr-recordTbodyDetail" documentRef-id='${item.DocumentRefID}'>
                                <div>${item.RowCount}</div>
                                <div>${ToJavascriptDate(item.ApprovalStatusDate)}</div>
                                <div>${item.ReferenceNo}</div>
                                <div>${item.ProjectName}</div>
                                <div>${item.ReferenceNo_Doc}</div>
                                <div>${item.ApproverStatus}</div>
                                <div>${item.LocationStatus}</div>
                                <div>${item.IsRead == true ? 'Read' : 'Unread'}</div>
                            </div>`;
                let parseDoc = new DOMParser().parseFromString(div, 'text/html').querySelector('.tr-recordTbodyDetail');
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
        let documentRefID = e.currentTarget.getAttribute('documentRef-id');

        const data = await fetchDataGet(AppGlobal.baseUrl + 'FundRequest/GetFundRequestIndividualRecord/?documentRefID=' + documentRefID);
        console.log(data);
        if (data.StatusCodeNumber == 1) {
            fundrequestGlobalObj.centerPanel.innerHTML = '';
            fundrequestGlobalObj.centerPanel.rightPanel = '';

            const view = await fetchView(AppGlobal.baseUrl + 'FundRequest/IndividualRecord');
            let parseDoc = new DOMParser().parseFromString(view, 'text/html').querySelector('.container');

            fundrequestGlobalObj.centerPanel.appendChild(parseDoc);

            let dataHeader = data.FundRequestRecords;
            parseDoc.querySelector('.jsProjectNumber').value = dataHeader.ProjectNumber;
            parseDoc.querySelector('.jsProjectName').value = dataHeader.ProjectName;
            parseDoc.querySelector('.jsRequestNo').value = dataHeader.ReferenceNo;
            parseDoc.querySelector('.jsRequestDate').value = ToJavascriptDate(dataHeader.FormDate);
            parseDoc.querySelector('.jsStatusApproved').textContent = dataHeader.ApproverStatus;
            parseDoc.querySelector('.jsStatusLocation').textContent = dataHeader.LocationStatus;

            let div = `<div class="fund-detail">
                            <div>1</div>
                            <div>${dataHeader.ReferenceNo_Doc}</div>
                            <div></div>
                            <div>${NumberWithCommas(dataHeader.Amount)}</div>
                        </div>`;
            let parseDetail = new DOMParser().parseFromString(div, 'text/html').querySelector('.fund-detail');
            parseDoc.querySelector('.fund-detail-con').appendChild(parseDetail);
        }
    }

    function AssignEventListenerFilter(fundsContainer) {
        DropdownList(fundsContainer.querySelector('.jsProject'), fundrequestGlobalObj.ProjectNameBST, function () {
            let dataObject = {
                ProjectID: fundsContainer.querySelector('.jsProject').getAttribute('data-id'),
                DateFrom: 0,
                DateTo: 0,
            }
            FilterRecord(dataObject, fundsContainer);
        });
        fundsContainer.querySelector('.jsDateFrom').addEventListener('change', function () {
            let dataObject = {
                ProjectID: 0,
                DateFrom: fundsContainer.querySelector('.jsDateFrom').value,
                DateTo: 0,
            }
            FilterRecord(dataObject, fundsContainer);
        });
        fundsContainer.querySelector('.jsDateTo').addEventListener('change', function () {
            let dataObject = {
                ProjectID: 0,
                DateFrom: 0,
                DateTo: fundsContainer.querySelector('.jsDateTo').value,
            }
            FilterRecord(dataObject, fundsContainer);
        });

        fundsContainer.querySelector('.jsReferenceNo').addEventListener('change', function (e) {

            if (e.target.value == '') {
                if (dataRecords.length > 10) {
                    dataRecordsBST = LoadDataToBST(dataRecords, 'DocumentRefID');
                    filterData = dataRecordsBST.BFS();
                } else {
                    dataRecordsLL = new LinkedList();
                    dataRecords.forEach((item) => {
                        dataRecordsLL.push(item);
                    });
                    filterData = dataRecordsLL.getAll()
                }
            } else {
                if (dataRecords.length > 10) {
                    dataRecordsBST = LoadDataToBST(dataRecords, 'DocumentRefID');
                    filterData = dataRecordsBST.BFSbyIndexOf(e.target.value, 'ReferenceNo');
                } else {
                    dataRecordsLL = new LinkedList();
                    dataRecords.forEach((item) => {
                        dataRecordsLL.push(item);
                    });
                    filterData = dataRecordsLL.searchByIndex('ReferenceNo', e.target.value);
                }
            }


            DisplayRecord(filterData, fundsContainer);

        });
        fundsContainer.querySelectorAll('.jsSortByColumn').forEach((item) => {
            item.addEventListener('click', function (e) {
                let el = e.currentTarget;

                SortData(el);

            });
        });
    }
    function SortData(el) {

        let doc = el.closest('.tr-record-body');
        console.log(doc)
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
            //console.log(filterData);
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
    function FilterRecord(config, doc) {

        let dataArray;
        filterData = [];
        //console.log(config, doc)
        if (dataRecords.length > 10) {
            //search here using binary search
            dataArray = dataRecordsBST.BFS();

            PushToFilterData();
            DisplayRecord(filterData, doc);


        }
        else {
            //search here using linked list
            dataArray = dataRecordsLL.getAll();

            PushToFilterData();

            DisplayRecord(filterData, doc);
        }

        function PushToFilterData() {

            if (dataArray && dataArray.length) {
                dataArray.sort((a, b) => a['DocumentRefID'] - b['DocumentRefID']);
            }

            for (var i = 0; i < dataArray.length; i++) {

                let projectConfig = {

                    value: config.ProjectID,
                    objKey: 'ProjectID',
                    index: i,
                    dataArray: dataArray
                }

                let dateRangeConfig = {
                    from: config.DateFrom,
                    to: config.DateTo,
                    objKey: 'ApprovalStatusDate',
                    index: i,
                    dataArray: dataArray
                }

                if (FilterProject(projectConfig) && CheckDateRange(dateRangeConfig)) {

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
})();