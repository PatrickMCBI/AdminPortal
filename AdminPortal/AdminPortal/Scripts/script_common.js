const RegExpDataValidationPatterns = {
    EmailAddress: /^([a-z\d\.-]+)@([a-z\d-]+).([a-z]{2,8})(\.[a-z]{2,8})$/,
    IStillLoveYou: /^([\w@-]{8,20})$/,
    ConfirmPassword: /^([\w@-]{8,20})$/,
    FirstName: /^([a-zA-Z\s]+)$/,
    LastName: /^([a-zA-Z\s]+)$/,
    CompanyName: /^(?: \s*[a - zA - Z0 - 9, _\.\077\0100\*\+\&\#\'\~\;\-\!\@\;]{2,}\s*)*$/,
    MobileNo: /^(\+?\(?)([0-9\)-]{6,20})$/,
    LandlineNo: /^(\+?\(?)([0-9\)-]{6,20})$/,
    Latitude: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
    Longitude: /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
    ProjectName: /^(?:\s*[a-zA-Z0-9,_\.\077\0100\*\+\&\#\'\~\;\-\!\@\;]{1,}\s*)*$/,
    ProjectPhase: /^(?:\s*[a-zA-Z0-9,_\.\077\0100\*\+\&\#\'\~\;\-\!\@\;]{1,}\s*)*$/,
    ProjectBlock: /^(?:\s*[a-zA-Z0-9,_\.\077\0100\*\+\&\#\'\~\;\-\!\@\;]{1,}\s*)*$/,
    ProjectLotNo: /^(\d{1,10})$/, // number w/o decimal
    ProjectLotArea: /^\d+(\.\d{1,2})?$/, //number with optional decimal
    newModelSpecsModelName: /^([a-zA-Z\s\d-_]+)$/,
    NewModelSpecsFloorArea: /^\d+(\.\d{1,2})?$/, //number with optional decimal
    Quantity: /^\d+(\.\d{1,2})?$/, //number with optional decimal
}

class LinkedListNode {
    constructor(value) {

        this.value = value
        this.next = null
    }
}

class LinkedList {

    constructor() {
        //const newNode = new LinkedListNode(value)

        //if (!value) {
        //    this.head = null
        //    this.tail = null
        //    this.length = 0
        //}
        //else {
        //    this.head = newNode
        //    this.tail = this.head
        //    this.length = 1
        //}

    }

    push(value) {
        const newNode = new LinkedListNode(value)

        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        }
        else {
            this.tail.next = newNode
            this.tail = newNode
        }

        if (!this.length) {
            this.length = 1
        }
        else {
            this.length++
        }

        //return this
    }

    pop() {
        if (!this.head) return undefined

        let temp = this.head
        let pre = this.head

        while (temp.next) {
            pre = temp
            temp = temp.next
        }

        this.tail = pre
        this.tail.next = null
        this.length--

        if (this.length === 0) {
            this.head = null
            this.tail = null
        }

        return temp
    }

    unshift(value) {

        const newNode = new LinkedListNode(value)

        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        }
        else {
            newNode.next = this.head
            this.head = newNode
        }

        if (!this.length) {
            this.length = 1
        }
        else {
            this.length++
        }
        return this
    }

    shift() {

        if (!this.head) return undefined

        let temp = this.head
        this.head = this.head.next
        temp.next = null

        this.length--

        if (this.length === 0) {
            this.head = null
            this.tail = null
        }

        return temp

    }

    get(index) {

        if (index < 0 || index >= this.length) return undefined

        let temp = this.head

        for (let i = 0; i < index; i++) {
            temp = temp.next
        }

        return temp

    }

    set(index, value) {

        if (index < 0 || index >= this.length) return undefined

        let temp = this.get(index)

        if (temp) {
            temp.value = value
            return true
        }
        return false
    }

    insert(index, value) {
        if (index === 0) return this.unshift(value)
        if (index === this.length) return this.push(value)
        if (index < 0 || index > this.length) return false

        const newNode = new LinkedListNode(value)
        const temp = this.get(index - 1)

        newNode.next = temp.next
        temp.next = newNode

        this.length++

        return true
    }

    remove(index) {
        if (index === 0) return this.shift()
        if (index === this.length - 1) return this.pop()
        if (index < 0 || index >= this.length) return undefined

        const temp = this.get(index)
        const pre = this.get(index - 1)

        pre.next = temp.next
        temp.next = null

        this.length--

        return temp

    }

    reverse() {
        let temp = this.head
        this.head = this.tail
        this.tail = temp
        let next = temp.next
        let prev = null

        for (let i = 0; i < this.length; i++) {
            next = temp.next
            temp.next = prev
            prev = temp
            temp = next
        }

        return this
    }

    getByID(id) {
        if (this.head == null) return undefined;

        let temp = this.head;

        if (id > 0) {

            while (temp.value.ID != id) {
                temp = temp.next;
            }

            return temp.value;
        }

        return null;
    }

    searchByIndex(propertyName, value) {

        if (this.head == null) return undefined

        let arr = [];
        let temp = this.head;

        if (value) {

            for (let i = temp; i != null; i = i.next) {

                if (i.value[propertyName].toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    arr.push(i.value);
                }
            }
        }

        return arr;
    }

    getAllByID(propertyName, id) {
        if (this.head == null) return undefined

        let arr = []
        let temp = this.head

        for (let i = temp; i != null; i = i.next) {
            if (i.value[propertyName] == id) {
                arr.push(i.value)
            }
        }

        return arr;
    }

    getAll() {
        if (this.head == null) return undefined

        let arr = []
        let temp = this.head

        for (let i = temp; i != null; i = i.next) {
            arr.push(i.value)
        }

        return arr;
    }

    empty() {
        this.head = null
        this.tail = null
        this.length = 0
    }
}

class BST_Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null
        this.length = 0
    }

    insert(value, targetProperty) {
        const newNode = new BST_Node(value)
        if (this.root === null) {
            this.root = newNode
            this.length++
            return this
        }
        let temp = this.root
        while (true) {
            if (newNode.value[targetProperty] === temp.value[targetProperty]) return undefined
            if (newNode.value[targetProperty] < temp.value[targetProperty]) {
                if (temp.left === null) {
                    temp.left = newNode
                    this.length++
                    return this
                }
                temp = temp.left
            } else {
                if (temp.right === null) {
                    temp.right = newNode
                    this.length++
                    return this
                }
                temp = temp.right
            }
        }
    }

    contains(value) {
        if (this.root === null) return false
        let temp = this.root
        while (temp) {
            if (value.ID < temp.value.ID) {
                temp = temp.left
            } else if (value.ID > temp.value.ID) {
                temp = temp.right
            } else {
                return true
            }
        }
        return false
    }

    BFS() {
        let currentNode = this.root
        let results = []
        let queue = []
        queue.push(currentNode)

        while (queue.length) {
            currentNode = queue.shift()
            results.push(currentNode.value)
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return results
    }

    BFSbyPropertyAndValue(ItemProperty, PropertyValue) {
        let currentNode = this.root
        let results = []
        let queue = []
        queue.push(currentNode)

        while (queue.length) {
            currentNode = queue.shift()

            if (currentNode.value[ItemProperty] == PropertyValue) results.push(currentNode.value)
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return results
    }

    BFSbyIndexOf(SearchString, PropertyName) {
        let currentNode = this.root
        let results = []
        let queue = []
        queue.push(currentNode)

        while (queue.length) {
            currentNode = queue.shift()

            if (currentNode.value[PropertyName].toLowerCase().indexOf(SearchString.toLowerCase()) !== -1) results.push(currentNode.value)
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return results
    }

    BFSbyParentAndIndexOf(SearchString, PropertyName, PropertyParentID, ParentID) {
        let currentNode = this.root
        let results = []
        let queue = []
        queue.push(currentNode)

        while (queue.length) {
            currentNode = queue.shift()

            if (currentNode.value[PropertyName].toLowerCase().indexOf(SearchString.toLowerCase()) !== -1 && currentNode.value[PropertyParentID] == ParentID) {
                results.push(currentNode.value)
            }
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return results
    }

    BFSMultiplePropertyAndValue(filterObject) {
        let currentNode = this.root
        let results = []
        let queue = []
        queue.push(currentNode)

        while (queue.length) {
            currentNode = queue.shift()

            if ((currentNode.value['DepartmentID'] == filterObject.DepartmentID || filterObject.DepartmentID == 0)
                && (currentNode.value['PositionID'] == filterObject.PositionID || filterObject.PositionID == 0)
                && (currentNode.value['EmploymentStatusID'] == filterObject.EmploymentStatusID || filterObject.EmploymentStatusID == 0)
                && (currentNode.value['PositionClassID'] == filterObject.PositionClassID || filterObject.PositionClassID == 0)
                && (currentNode.value['GenderID'] == filterObject.GenderID || filterObject.GenderID == 0)
                && (currentNode.value['HiringStatusID'] == filterObject.HiringStatusID || filterObject.HiringStatusID == 0)
                && (currentNode.value['ProjectAssignID'] == filterObject.ProjectAssignID || filterObject.ProjectAssignID == 0)) results.push(currentNode.value)
            if (currentNode.left) queue.push(currentNode.left)
            if (currentNode.right) queue.push(currentNode.right)
        }
        return results
    }

}

function LoadDataToBST(listData, targetProperty) {
    let BST = new BinarySearchTree();
    let leftArrayOfObjID = [];
    let root = Math.floor(listData.length / 2);
    let leftTempUpperValue = root;
    let leftTempLowerValue = 0;
    let leftTempIndex = Math.floor(leftTempUpperValue - (leftTempUpperValue - leftTempLowerValue) / 2);


    BST.insert(listData[root], targetProperty);
    BST.insert(listData[leftTempIndex], targetProperty);


    leftArrayOfObjID.push(leftTempLowerValue);
    leftArrayOfObjID.push(leftTempIndex);
    leftArrayOfObjID.push(leftTempUpperValue);

    let isIterable = true
    while (isIterable) {
        isIterable = false
        let upperIndex = leftArrayOfObjID.length - 1
        let newArrayNode
        for (let i = upperIndex; i > 0; i = upperIndex) {
            if ((leftArrayOfObjID[i] - leftArrayOfObjID[i - 1]) !== 1) {
                newArrayNode = Math.floor((leftArrayOfObjID[i] - leftArrayOfObjID[i - 1]) / 2) + leftArrayOfObjID[i - 1]
                BST.insert(listData[newArrayNode], targetProperty)
                leftArrayOfObjID.splice((i), 0, newArrayNode)
                isIterable = true;
            }
            upperIndex = upperIndex - 1
        }
    }
    BST.insert(listData[leftTempLowerValue], targetProperty);


    let rightArrayOfObjID = [];
    let rightTempUpperValue = listData.length - 1;
    let rightTempLowerValue = root;
    let rightTempIndex = Math.floor(rightTempUpperValue - (rightTempUpperValue - rightTempLowerValue) / 2);

    BST.insert(listData[rightTempIndex], targetProperty);

    rightArrayOfObjID.push(rightTempLowerValue);
    rightArrayOfObjID.push(rightTempIndex);
    rightArrayOfObjID.push(rightTempUpperValue);

    isIterable = true
    while (isIterable) {
        isIterable = false
        let upperIndex = rightArrayOfObjID.length - 1
        let newArrayNode
        for (let i = upperIndex; i > 0; i = upperIndex) {
            if ((rightArrayOfObjID[i] - rightArrayOfObjID[i - 1]) !== 1) {
                newArrayNode = Math.floor((rightArrayOfObjID[i] - rightArrayOfObjID[i - 1]) / 2) + rightArrayOfObjID[i - 1]
                BST.insert(listData[newArrayNode], targetProperty)
                rightArrayOfObjID.splice((i), 0, newArrayNode)
                isIterable = true;
            }
            upperIndex = upperIndex - 1
        }
    }
    BST.insert(listData[rightTempUpperValue], targetProperty);

    //console.log(BST);

    return BST
}

function LoadDataToLinkedList(data) {
    let ll = new LinkedList();

    data.forEach(item => {
        ll.push(item);
    });

    return ll;
}

//-------------Alert Type and Messages---------------------//
const alertMessages = {
    saveSuccessfull: 'Save Successfull!',
    updateSuccessfull: 'Update Successfull!',
    deleteSuccessfull: 'Successfully Deleted!',
    inputFormat: `Invalid input character!`,
    databaseError: `Database Error!`,
    duplicateError: `File already exist in database!\n Modify file name!`,
    serverError: `Server Error!`,
    delDatabaseItem: `Are you sure? \n This will be permanently deleted!`,
    createProjectFirst: `Create and save Project Name first!`,
    sessionExpired: `Session Expired.`
}

const alertType = {

    successAlert: {
        iconClassName: 'alert-header-icon-success',
        colorClassName: 'color-success',
        headerText: 'Success..',
        imageSrc: "/Content/icon/check-solid.svg"
    },

    errorAlert: {
        iconImageClassName: 'alert-header-icon-error',
        colorClassName: 'color-error',
        headerText: 'Error message..',
        imageSrc: "/Content/icon/xmark-solid.svg"
    },

    warningAlert: {
        iconImageClassName: 'alert-header-icon-warning',
        colorClassName: 'color-warning',
        headerText: 'Warning..',
        imageSrc: "/Content/icon/triangle-exclamation-solid.svg"
    },

    criticalAlert: {
        iconImageClassName: 'alert-header-icon-critical',
        colorClassName: 'color-critical',
        headerText: 'Critical..',
        imageSrc: "/Content/icon/triangle-exclamation-solid.svg"
    }

}


function IsConfirmedAlertOk(alertObj, alertMessage) {

    // main container, transparent background
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('alert-main-expandable-cont', 'jsAlertOkMainCont');

    // alert container
    const div0 = document.createElement('div');
    div0.classList.add('alert-cont-00');

    // alert header
    const alertHeader = document.createElement('div');
    alertHeader.classList.add('alert-cont-01', 'alert-cont-header', `${alertObj.colorClassName}`);


    // icon img
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('alert-icon-cont');

    const iconImage = document.createElement('img');
    iconImage.classList.add(alertObj.iconImageClassName)
    iconImage.src = alertObj.imageSrc;

    imgDiv.appendChild(iconImage);

    // label
    const headerLabel = document.createElement('label')
    headerLabel.classList.add('alert-header-label')
    headerLabel.textContent = alertObj.headerText

    // append
    alertHeader.appendChild(imgDiv);
    alertHeader.appendChild(headerLabel);
    div0.appendChild(alertHeader);


    // alert content
    const alertContent = document.createElement('div');
    alertContent.classList.add('alert-cont-01', 'alert-cont-content');

    // alert paragraph
    const alertContentParag = document.createElement('p');
    alertContentParag.classList.add('alert-paragraph')
    alertContentParag.innerText = alertMessage

    alertContent.appendChild(alertContentParag)
    div0.appendChild(alertContent);

    // alert footer
    const alertFooter = document.createElement('div');
    alertFooter.classList.add('alert-cont-01', 'alert-cont-footer');

    // alert button ok
    const alertFooterBtnOk = document.createElement('button');
    alertFooterBtnOk.classList.add('alert-button', 'alert-button-ok', 'jsAlertButtonOkProjectPhase');
    alertFooterBtnOk.innerText = 'Ok';

    // event listener for OK
    alertFooterBtnOk.addEventListener('click', function () {
        containerDiv.remove();

        if (alertMessage == alertMessages.sessionExpired) {
            window.location.reload()
        }
    });


    alertFooter.appendChild(alertFooterBtnOk)

    div0.appendChild(alertFooter);

    containerDiv.appendChild(div0);
    document.body.appendChild(containerDiv);
}

function IsConfirmedAlertYesOrNo(alertObj, alertMessage) {

    // main container, transparent background
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('alert-main-expandable-cont', 'jsAlertOkMainCont');

    // alert container
    const div0 = document.createElement('div');
    div0.classList.add('alert-cont-00');

    // alert header
    const alertHeader = document.createElement('div');
    alertHeader.classList.add('alert-cont-01', 'alert-cont-header', `${alertObj.colorClassName}`);


    // icon img
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('alert-icon-cont');

    const iconImage = document.createElement('img');
    iconImage.classList.add(alertObj.iconImageClassName)
    iconImage.src = alertObj.imageSrc;

    imgDiv.appendChild(iconImage);

    // label
    const headerLabel = document.createElement('label')
    headerLabel.classList.add('alert-header-label')
    headerLabel.textContent = alertObj.headerText

    // append
    alertHeader.appendChild(imgDiv);
    alertHeader.appendChild(headerLabel);
    div0.appendChild(alertHeader);


    // alert content
    const alertContent = document.createElement('div');
    alertContent.classList.add('alert-cont-01', 'alert-cont-content');

    // alert paragraph
    const alertContentParag = document.createElement('p');
    alertContentParag.classList.add('alert-paragraph')
    alertContentParag.innerText = alertMessage

    alertContent.appendChild(alertContentParag)
    div0.appendChild(alertContent);

    // alert footer
    const alertFooter = document.createElement('div');
    alertFooter.classList.add('alert-cont-01', 'alert-cont-footer');

    // alert button no
    const alertFooterBtnNo = document.createElement('button');
    alertFooterBtnNo.classList.add('alert-button', 'alert-button-no', 'jsProjectDeleteItemNo');
    alertFooterBtnNo.innerText = 'No';

    alertFooter.appendChild(alertFooterBtnNo)

    // alert button yes
    const alertFooterBtnYes = document.createElement('button');
    alertFooterBtnYes.classList.add('alert-button', 'alert-button-yes', 'jsProjectDeleteItemYes');
    alertFooterBtnYes.innerText = 'Yes';

    alertFooter.appendChild(alertFooterBtnNo)
    alertFooter.appendChild(alertFooterBtnYes)

    div0.appendChild(alertFooter);

    containerDiv.appendChild(div0);
    document.body.appendChild(containerDiv);

    return new Promise(function (resolve, reject) {
        alertFooterBtnYes.addEventListener('click', function () {
            resolve('Yes');
            containerDiv.remove();
        })

        alertFooterBtnNo.addEventListener('click', function () {
            reject('No');
            containerDiv.remove();
        })
    })
}

function customDropdown(config, callback) {

    //console.log(config);

    if (config.data) {
        if (config.data.length > 0) {

            config.elem.removeAttribute('style');
            config.elem.classList.remove('hide-items');
            config.elem.innerHTML = '';

            config.data.forEach((item) => {
                //console.log(item);

                let li = document.createElement('li');
                let span = document.createElement('span');
                span.setAttribute('style', 'margin-right: 5px;');

                li.setAttribute('data-id', item[config.propertyID]);
                span.textContent = item[config.propertyName];

                li.appendChild(span);

                if (config.labelPropertyName) {
                    let small = document.createElement('small');
                    small.style.font = 'small-caption';
                    small.textContent = '(' + item[config.labelPropertyName] + ')';

                    li.appendChild(small);
                }

                li.addEventListener('click', function (e) {
                    e.stopPropagation();

                    if (config.elem.classList.contains('clicked')) {
                        config.elem.classList.remove('clicked');
                    }

                    let input = config.elem.closest('div').querySelector('input');
                    input.value = item[config.dataToDisplay];

                    input.setAttribute('data-id', item[config.propertyID]);
                    input.setAttribute('data-textContent', item[config.propertyName]);

                    config.elem.innerHTML = '';
                    config.elem.style.display = 'none';

                    callback(item);
                });

                config.elem.appendChild(li);

            });

        }
        else {
            config.elem.innerHTML = '';
            config.elem.style.display = 'none';
        }

    }
    else {
        let obj = {
            hasError: true
        };

        callback(obj);

        config.elem.innerHTML = '';
        config.elem.style.display = 'none';
    }
}

function DropdownList(input, rawData, callback) {

    //console.log(rawData, ' data here..', input);

    function displayItems(data) {

        let parentEl = input.closest('.input-icon-wrap');

        if (parentEl.querySelector('ul')) {
            parentEl.querySelector('ul').remove();
        }

        let ul = document.createElement('ul');

        if (data) {
            if (data.length > 0) {

                //get the parentEl

                ul.className = 'customDropdownUL';

                for (var i = 0; i < data.length; i++) {

                    let li = document.createElement('li');
                    let returnData = data[i];
                    let valArr = [];

                    for (const [key, value] of Object.entries(data[i])) {
                        //console.log(value);
                        valArr.push(value);
                    }

                    li.setAttribute('data-id', valArr[0]);
                    li.textContent = valArr[1];


                    li.addEventListener('click', function (e) {

                        callback();

                        input.value = valArr[1];
                        input.setAttribute('data-id', valArr[0]);
                        input.setAttribute('data-textContent', valArr[1]);

                        let icon = e.target.closest('div.input-icon-wrap').querySelector('i');
                        if (icon.classList.contains('show-dropdown')) {
                            icon.classList.remove('show-dropdown');
                        }

                        //remove the ul
                        ul.remove();

                    });
                    li.addEventListener('mouseover', function (e) {
                        searchLi = e.target.closest('ul').querySelector('li.item-selected');
                        searchLi.classList.remove('item-selected');
                        e.target.classList.add('item-selected');

                    });
                    ul.appendChild(li);

                }

                ul.children[0].classList.add('item-selected');
                parentEl.appendChild(ul);

            }
        }
    }

    input.addEventListener('input', function (e) {
        let propertyName = e.target.getAttribute('data-propertyName');
        let propertyID = e.target.getAttribute('data-propertyID');
        let dataSourceType = e.target.getAttribute('data-sourceType');
        let val = e.target.value;

        //console.log(val, propertyName);
        let searchResults;

        if (val) {

            if (dataSourceType == 'bst') {
                searchResults = rawData.BFSbyIndexOf(val, propertyName);

            }
            else {
                searchResults = rawData.searchByIndex(propertyName, val);
            }

            if (searchResults && searchResults.length > 0) {
                searchResults.sort((a, b) => a[propertyID] - b[propertyID]);
            } else {
                e.target.setAttribute('data-id', 0);
            }
        }

        displayItems(searchResults);
    });

    input.addEventListener('focusout', function (e) {
        let dataID, dataValue;
        //let rows;
        //if (this.clientHeight < this.scrollHeight) {
        //    //rows = this.getAttribute('rows');
        //    //rows++;
        //    //this.setAttribute("rows", rows);
        //    /* this.style.height = 'auto';*/

        //    this.style.height = this.scrollHeight + 'px';
        //} else {
        //    this.style.height = 35 + 'px';
        //}
        if (this.nextElementSibling.nextElementSibling) {
            if (e.target.nextElementSibling.nextElementSibling.querySelector('li.item-selected')) {


                dataValue = e.target.nextElementSibling.nextElementSibling.querySelector('li.item-selected').textContent;
                dataID = e.target.nextElementSibling.nextElementSibling.querySelector('li.item-selected').getAttribute('data-id');
                this.value = dataValue;
                this.setAttribute('data-id', dataID);
                this.setAttribute('data-textContent', this.value);

                if (this.nextElementSibling.nextElementSibling) {
                    this.nextElementSibling.nextElementSibling.remove();
                }


                callback();
            }
        } else if (this.value == '') {

            this.setAttribute('data-id', 0);
            this.setAttribute('data-textContent', '');
            this.textContent = '';
            this.setAttribute("rows", 1);
        }

    });

    let dropdownIcon = input.nextElementSibling;
    dropdownIcon.addEventListener('click', function (e) {

        let input = e.currentTarget.previousElementSibling;

        let propertyID = input.getAttribute('data-propertyID');
        let dataSourceType = input.getAttribute('data-SourceType');

        let searchResults;

        if (dataSourceType == 'bst') {
            //binary source tree
            searchResults = rawData.BFS();

        }
        else {
            //linked list
            searchResults = rawData.getAll();
        }


        if (!e.currentTarget.classList.contains('show-dropdown')) {

            e.currentTarget.classList.add('show-dropdown');

            if (searchResults && searchResults.length > 0) {
                searchResults.sort((a, b) => a[propertyID] - b[propertyID]);
            }

            displayItems(searchResults);

            input.focus();

        }
        else {
            e.currentTarget.classList.remove('show-dropdown');
            let ul = e.currentTarget.nextElementSibling;
            if (ul) {
                ul.remove();
            }
        }

    });

    input.onkeydown = function (e) {

        let searchUL, searchNodeList

        function SelectedNodes() {
            let item = null;

            searchNodeList.forEach(node => {
                if (node.classList.contains('item-selected')) {
                    item = node;
                }
            });

            return item;
        }


        switch (e.which) {
            case 40:

                searchUL = e.target.closest('.input-icon-wrap').querySelector('ul');

                if (searchUL) {
                    searchNodeList = searchUL.querySelectorAll('li');
                }

                if (searchNodeList) {
                    let selectedNode = SelectedNodes();
                    if (selectedNode) {
                        if (selectedNode.nextSibling) {
                            selectedNode.classList.remove('item-selected');
                            selectedNode.nextSibling.classList.add('item-selected');
                        }

                    }
                    else {
                        searchNodeList[0].classList.add('item-selected');
                    }
                }
                break;

            case 38:

                searchUL = e.target.closest('.input-icon-wrap').querySelector('ul');

                if (searchUL) {
                    searchNodeList = searchUL.querySelectorAll('li');
                }

                if (searchNodeList) {
                    let selectedNode = SelectedNodes();
                    if (selectedNode) {
                        if (selectedNode.previousSibling) {
                            selectedNode.classList.remove('item-selected');
                            selectedNode.previousSibling.classList.add('item-selected');
                        }

                    }
                    else {
                        //searchNodeList[0].classList.add('item-selected');
                        e.target.focus();
                    }
                }
                break;


            case 13:

                searchUL = e.target.closest('.input-icon-wrap').querySelector('ul');

                if (searchUL) {
                    searchNodeList = searchUL.querySelectorAll('li');

                }

                if (searchNodeList) {

                    let selectNode = SelectedNodes();

                    if (selectNode) {

                        selectNode.click();
                    }
                    else {
                        e.target.focus();
                    }
                }

            case 27:

                searchUL = e.target.closest('.input-icon-wrap').querySelector('ul');

                if (searchUL) {
                    searchNodeList = searchUL.querySelectorAll('li');

                }

                let textContent = e.target.getAttribute('data-textContent');

                if (textContent) {

                    e.target.value = textContent;
                    e.target.blur();

                }
                else {
                    e.target.value = '';
                    e.target.blur();
                }

                if (searchUL) {
                    searchUL.remove();

                }

                break;
        }
    };

}

function ToJavascriptDate(value) {
    if (value === null || value === 'undefined' || value === 'null') {
        return false;
    }
    var results = value.match(/\d+/);
    var dt = new Date(parseFloat(results[0]));

    //return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
    var getMonth = ((dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1));
    var getDate = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();

    return dt.getFullYear() + "-" + getMonth + "-" + getDate;
};

function PopUpInfo(message) {

    let note = `<div class="alert-main-expandable-cont jsnotePopUp">
                    <div class="note-cont-00">
                        <div class="alert-cont-header note-header">
                            <div class="alert-icon-cont">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="25"><path fill="#fff" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                            </div>
                           <label class="alert-header-label">Note</label>
                        </div>
                        <div class="jsNoteDiv noteBody">
                            <p>${message}</p>
                        </div>
                        <div class="alert-cont-01 alert-cont-footer" style="padding: 10px;">
                            <button class="alert-button alert-button-ok jsAlertButtonOkProjectPhase">Ok</button>
                        </div>
                    </div>
                </div>`;
    let parseDoc = new DOMParser().parseFromString(note, 'text/html').querySelector('.jsnotePopUp');
    let btnOkClose = parseDoc.querySelector('.jsAlertButtonOkProjectPhase');

    document.body.appendChild(parseDoc);
    // event listener for OK
    btnOkClose.addEventListener('click', function () {
        parseDoc.remove();

    });
}

function NumberWithCommas(value) {

    try {

        let cleanNum = RemoveCommas(value.toString());

        //console.log(cleanNum);

        let convertedNum = cleanNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return convertedNum;
    }
    catch (ex) {
        console.log(ex);
    }

}

function RemoveCommas(str) {

    //parseFloat(str);

    while (str.search(",") >= 0) {
        str = (str + "").replace(',', '');
    }
    return str;
}


async function fetchDataGet(url) {
    loader.start();
    let retData;

    let options = {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }
    await fetch(url, options).then(res => {
        if (res.ok) {
            return res.json()
        }
        else if (res.status == 440) {
            throw alertMessages.sessionExpired
        }
        else {
            throw alertMessages.serverError
        }
    }).then(data => {
        retData = data;
    }).catch(error => {
        IsConfirmedAlertOk(alertType.errorAlert, error);
    })
    loader.stop();
    return retData;
}

async function fetchDataPost(url, formData) {
    loader.start();
    let retData;

    let options = {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        },
        method: 'POST',
        body: formData
    }
    await fetch(url, options).then(res => {
        if (res.ok) {
            return res.json()
        }
        else if (res.status == 440) {
            throw alertMessages.sessionExpired
        }
        else {
            throw alertMessages.serverError
        }
    }).then(data => {
        retData = data;
    }).catch(error => {
        IsConfirmedAlertOk(alertType.errorAlert, error);
    })
    loader.stop();
    return retData;
}

async function fetchView(url) {
    loader.start();
    let retView;

    let options = {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }
    await fetch(url, options).then(res => {
        if (res.ok) {
            return res.text()
        }
        else if (res.status == 440) {
            throw alertMessages.sessionExpired
        }
        else {
            throw alertMessages.serverError
        }
    }).then(view => {
        retView = view;

    }).catch(error => {
        IsConfirmedAlertOk(alertType.errorAlert, error);

    })
    loader.stop();
    return retView;
}

function ValidateForm(parentEl) {
    let errors = 0;

    parentEl.querySelectorAll('input[required], textarea[required]').forEach((item) => {

        item.removeAttribute('style');

        if (item.classList.contains('customDropdownInput')) {

            if (parseInt(item.getAttribute('data-id')) > 0) {
                item.closest('div.input-icon-wrap').removeAttribute('style');
            }
            else {
                item.closest('div.input-icon-wrap').setAttribute('style', 'border:1px solid red');
                errors += 1;
            }
        }
        else {
            if (item.value) {
                //item.closest('div.input-icon-wrap').removeAttribute('style');
                item.removeAttribute('style');
            }
            else {
                item.setAttribute('style', 'border:1px solid red');
                errors += 1;
            }



            //if (item.classList.contains('customDropdownInput')) {
            //    item.closest('div.input-icon-wrap').setAttribute('style', 'border:1px solid red');
            //}
            //else {
            //    item.setAttribute('style', 'border:1px solid red');

            //}
        }

    });

    return errors == 0 ? true : false;
}

function NoteInfo(noteData) {

    const infoContainer = document.querySelector('.right-panel');
    infoContainer.innerHTML = '';
    let infoView = `<div class="notes-container">`;
    infoView += `<h4 class="notes-panel-title">NOTES</h4>`;
    noteData.forEach((item) => {
        infoView += `
                <div class="notes-right-notif-item notification-clone jsNotification">

                    <div class="notes-notif-icon">
                        <i>
                            <i class="notes-flt-right">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="25px"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                            </i>
                        </i>
                    </div>
                    <div class="notes-notif-text">
                        <div class="notes-notif-text-title">
                            <p>${item.Note}</p>


                        </div>

                        <div style="text-align: right;">
                            <small>${item.NoteCreatedByName}</small>
                        </div>
                        <div class="notes-notif-text-date" style="text-align: right;">
                            <small>${ToJavascriptDate(item.NoteDate)}</small>
                        </div>
                    </div>
                </div>`;



    });
    infoView += `<div/>`;
    let parseDoc = new DOMParser().parseFromString(infoView, 'text/html');
    let info = parseDoc.querySelector('.notes-container');
    infoContainer.append(info);

}

const loader = {
    start: function () {
        const spinner = `<div id="preloader__wrapper">
                            <div class="bg__overlay">
                                <div class="lds-spinner">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>`;
        const parseDoc = new DOMParser().parseFromString(spinner, 'text/html').querySelector('#preloader__wrapper');

        document.body.append(parseDoc);

    },
    stop: function () {
        document.querySelector('#preloader__wrapper').remove();
    }
}