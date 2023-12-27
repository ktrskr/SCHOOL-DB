// API configuration
const jpdbBaseURL = 'http://api.login2explore.com:5577';
const jpdbIRL = '/api/irl';
const jpbdIML = '/api/iml';
const studentDatabaseName = 'SCHOOL-DB';
const studentRelationName = 'STUDENT-TABLE';
const connectionToken = '90931508|-31949300385632255|90960834';

// Focus on roll number input field by default
$('#rollNo').focus();

// Function to generate HTML for alert based on status
function alertHandlerHTML(status, message) {
    const alertType = status === 1 ? 'alert-primary' : 'alert-warning';
    const icon = status === 1 ? 'info-fill' : 'exclamation-triangle-fill';

    return `
        <div class="alert ${alertType} d-flex align-items-center alert-dismissible" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#${icon}"/></svg>
            <div>
                <strong>${status === 1 ? 'Success!' : 'Warning!'}</strong> ${message}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}

// Function to append alert message to the alert container
function alertHandler(status, message) {
    const alertHTML = alertHandlerHTML(status, message);
    const alertDiv = $('<div>').html(alertHTML);
    $('#disposalAlertContainer').append(alertDiv);
}

// Function to save record number to local storage
function saveRecNoToLocalStorage(jsonObject) {
    const lvData = JSON.parse(jsonObject.data);
    localStorage.setItem('recordNo', lvData.rec_no);
}

// Function to disable all elements on the page except the roll number input field
function disableAllFieldsExceptRollNo() {
    $('#fullName, #class, #birthDate, #inputAddress, #enrollmentDate, #resetBtn, #saveBtn, #updateBtn').prop('disabled', true);
}

// Function to reset form data and disable all fields except roll number
function resetForm() {
    $('#rollNo, #fullName, #class, #birthDate, #inputAddress, #enrollmentDate').val("");
    $('#rollNo').prop('disabled', false);
    disableAllFieldsExceptRollNo();
    $('#rollNo').focus();
}

// Function to fill data if the student already exists in the database
function fillData(jsonObject) {
    if (jsonObject === "") {
        $('#fullName, #class, #birthDate, #inputAddress, #enrollmentDate').val("");
    } else {
        saveRecNoToLocalStorage(jsonObject);
        const data = JSON.parse(jsonObject.data).record;
        $('#fullName').val(data.name);
        $('#class').val(data.className);
        $('#birthDate').val(data.birthDate);
        $('#inputAddress').val(data.address);
        $('#enrollmentDate').val(data.enrollmentData);
    }
}

// Function to check the validity of Enrollment Date
function validateEnrollmentDate() {
    const inputBirthDate = new Date($('#birthDate').val());
    const inputEnrollmentDate = new Date($('#enrollmentDate').val());
    return inputBirthDate.getTime() < inputEnrollmentDate.getTime();
}

// Function to check the validity of user input data
function validateFormData() {
    const rollNo = $('#rollNo').val();
    const name = $('#fullName').val();
    const className = $('#class').val();
    const birthDate = $('#birthDate').val();
    const address = $('#inputAddress').val();
    const enrollmentData = $('#enrollmentDate').val();

    // Validation checks...

    // If data is valid, create a JSON object; otherwise, return an empty string
    const jsonStrObj = {
        id: rollNo,
        name: name,
        className: className,
        birthDate: birthDate,
        address: address,
        enrollmentData: enrollmentData
    };

    return JSON.stringify(jsonStrObj);
}

// Function to return a stringified JSON object containing the roll number of the student
function getStudentRollnoAsJsonObj() {
    const rollNO = $('#rollNo').val();
    const jsonStr = { id: rollNO };
    return JSON.stringify(jsonStr);
}

// Function to query details of an existing student
function getStudentData() {
    const rollNoValue = $('#rollNo').val();

    if (!rollNoValue) {
        disableAllFieldsExceptRollNo();
    } else if (rollNoValue < 1) {
        disableAllFieldsExceptRollNo();
        alertHandler(0, 'Invalid Roll-No');
        $('#rollNo').focus();
    } else {
        const studentRollnoJsonObj = getStudentRollnoAsJsonObj();
        const getRequest = createGET_BY_KEYRequest(connectionToken, studentDatabaseName, studentRelationName, studentRollnoJsonObj);
        jQuery.ajaxSetup({ async: false });

        const resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
        jQuery.ajaxSetup({ async: true });

        $('#rollNo, #fullName, #class, #birthDate, #inputAddress, #enrollmentDate').prop('disabled', false);

        if (resJsonObj.status === 400) {
            $('#resetBtn, #saveBtn').prop('disabled', false);
            $('#updateBtn').prop('disabled', true);
            fillData("");
            $('#name').focus();
        } else if (resJsonObj.status === 200) {
            $('#rollNO').prop('disabled', true);
            fillData(resJsonObj);
            $('#resetBtn, #updateBtn').prop('disabled', false);
            $('#saveBtn').prop('disabled', true);
            $('#name').focus();
        }
    }
}

// Function to make PUT request to save data into the database
function saveData() {
    const jsonStrObj = validateFormData();

    if (!jsonStrObj) return;

    const putRequest = createPUTRequest(connectionToken, jsonStrObj, studentDatabaseName, studentRelationName);
    jQuery.ajaxSetup({ async: false });

    const resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpbdIML);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 400) {
        alertHandler(0, `Data Is Not Saved (Message: ${resJsonObj.message})`);
    } else if (resJsonObj.status === 200) {
        alertHandler(1, 'Data Saved successfully');
    }

    resetForm();
    $('#empid').focus();
}

// Function used to make UPDATE Request
function changeData() {
    $('#changeBtn').prop('disabled', true);
    const jsonChg = validateFormData();

    const updateRequest = createUPDATERecordRequest(connectionToken, jsonChg, studentDatabaseName, studentRelationName, localStorage.getItem("recordNo"));
    jQuery.ajaxSetup({ async: false });

    const resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpbdIML);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 400) {
        alertHandler(0, `Data Is Not Update (Message: ${resJsonObj.message})`);
    } else if (resJsonObj.status === 200) {
        alertHandler(1, 'Data Update successfully');
    }

    resetForm();
    $('#empid').focus();
}
