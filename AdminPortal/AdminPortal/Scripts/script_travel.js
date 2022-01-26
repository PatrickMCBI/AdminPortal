const travelGlobalFunc = {
    centerPanel: document.querySelector('.center-panel'),
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

    }
})();