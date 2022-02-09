const travelGlobalFunc = {
    centerPanel: document.querySelector('.center-panel'),
    rightPanel: document.querySelector('.right-panel'),
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
        AssignEventListener(travelContainer);
    }
    function AssignEventListener(travelContainer) {
        travelContainer.querySelector('.jsAddTravelers').addEventListener('click', function () {

        });
        travelContainer.querySelector('.jsAddItenerary').addEventListener('click', function () { });
        travelContainer.querySelector('.jsAddAccomodation').addEventListener('click', function () { });

        //DropdownList();
        //DropdownList();
        //DropdownList();
        //DropdownList();
    }
})();



(function TravelRecord() {

    let btn = document.querySelector('.jsClickRecordsTravel');

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


        travelGlobalFunc.centerPanel.appendChild(parser);

        assignEventListenersRecord(parser);
    }

    function assignEventListenersRecord(doc) {

    }

})();