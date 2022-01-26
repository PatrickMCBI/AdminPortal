(function () {
    let centerPanel = document.querySelector('.center-panel');
    let menuBtn;
    menuBtn = document.querySelector('.jsDashBoard');

    if (menuBtn) {
        menuBtn.addEventListener('click', async function () {
            await ClickDashBoard().then(function (view) {
                ResponseSuccess(view);

            }).catch(function (error) {
                IsConfirmedAlertOk(alertType.errorAlert, error);
            });

        });
    }

    async function ClickDashBoard() {
        return await fetch(AppGlobal.baseUrl + 'Home/Index').then(function (response) {
            if (response.ok) {
                return response.text();
            } else if (response.status == 440) {
                throw alertMessages.sessionExpired;
            } else {
                throw alertMessages.databaseError;
            }
        });
    }
    // dashboard view
    async function ResponseSuccess(view) {
        
        centerPanel.innerHTML = '';
        let parseDoc = new DOMParser().parseFromString(view, 'text/html');
        let dashBoardContainer = parseDoc.querySelector('.container');

        centerPanel.appendChild(dashBoardContainer);
    }
})();