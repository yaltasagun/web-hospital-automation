class Patient {
    constructor(firstName, lastName, idNumber, gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.gender = gender;
        this.appointments = [];
        this.treatments = [];
    }
}

let patients = [];

const loadData = () => {
    const data = localStorage.getItem("patients");
    patients = data ? JSON.parse(data) : [];
};

const saveData = (list) => {
    localStorage.setItem("patients", JSON.stringify(list));
    loadData();
};

const handleAddPatient = () => {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const idNumber = document.getElementById("idNumber").value.trim();
    
    const genderElement = document.querySelector('input[name="gender"]:checked');
    const gender = genderElement ? genderElement.value : null;

    if (!firstName || !lastName || !idNumber || !gender) {
        return alert("Please fill all fields, including gender!");
    }

    if (patients.find(p => p.idNumber === idNumber)) {
        return alert("This ID is already registered.");
    }

    const newPatient = new Patient(firstName, lastName, idNumber, gender);
    saveData([...patients, newPatient]);

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("idNumber").value = "";
    if(genderElement) genderElement.checked = false;
    
    alert("Patient registered!");
};

window.onload = () => {
    loadData();

    const addBtn = document.getElementById("addPatientBtn");
    if (addBtn) addBtn.onclick = handleAddPatient;

    const tableBody = document.getElementById("tableBody");
    if (tableBody) {
        renderTable(tableBody);
    }
};

const renderTable = (container) => {
    container.innerHTML = "";
    patients.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.firstName} ${p.lastName}</td>
            <td>${p.gender}</td>
            <td>${p.idNumber}</td>
            <td>${p.appointments.join(", ") || "None"}</td>
            <td>${p.treatments.join(", ") || "None"}</td>
            <td><button onclick="deleteRecord('${p.idNumber}')">Delete</button></td>
        `;
        container.appendChild(row);
    });
};