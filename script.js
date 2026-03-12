class Patient {
    constructor(firstName, lastName, idNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.appointments = [];
        this.treatments = [];
    }
}

let patients = [];

const listElement = document.getElementById("liste");

const loadPatients = async () => {
    try {
        const data = localStorage.getItem("patients");
        patients = data ? JSON.parse(data) : [];
        render();
    } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
    }
};

const savePatients = async (updatedList) => {
    patients = [...updatedList];
    localStorage.setItem("patients", JSON.stringify(patients));
    render();
};

const addPatient = async () => {
    const patientData = {
        firstName: document.getElementById("ad").value.trim(),
        lastName: document.getElementById("soyad").value.trim(),
        idNumber: document.getElementById("tc").value.trim()
    };

    const { firstName, lastName, idNumber } = patientData;

    if (!firstName || !lastName || !idNumber) return alert("Tüm alanlar zorunlu!");

    if (patients.find(p => p.idNumber === idNumber)) return alert("Bu TC zaten kayıtlı.");

    const newPatient = new Patient(firstName, lastName, idNumber);
    
    await savePatients([...patients, newPatient]);
    clearInputs();
};

const addAppointment = async () => {
    const idNumber = document.getElementById("randevuTc").value.trim();
    const date = document.getElementById("tarih").value;

    if (!idNumber || !date) return alert("Eksik bilgi!");

    const updatedPatients = patients.map(p => {
        if (p.idNumber === idNumber) {
            return { ...p, appointments: [...p.appointments, date] };
        }
        return p;
    });

    await savePatients(updatedPatients);
};

const addTreatment = async () => {
    const idNumber = document.getElementById("tedaviTc").value.trim();
    const treatment = document.getElementById("tedavi").value.trim();

    if (!idNumber || !treatment) return alert("Eksik bilgi!");

    const updatedPatients = patients.map(p => {
        if (p.idNumber === idNumber) {
            return { ...p, treatments: [...p.treatments, treatment] };
        }
        return p;
    });

    await savePatients(updatedPatients);
};

const deletePatient = async (idNumber) => {
    const filteredPatients = patients.filter(p => p.idNumber !== idNumber);
    await savePatients(filteredPatients);
};

const render = () => {
    listElement.innerHTML = "";

    patients.forEach(({ firstName, lastName, idNumber, appointments, treatments }) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${firstName} ${lastName}</strong>
            <div>ID: ${idNumber}</div>
            <div>Randevular: ${appointments.length > 0 ? appointments.join(", ") : "Yok"}</div>
            <div>Tedaviler: ${treatments.length > 0 ? treatments.join(", ") : "Yok"}</div>
            <button onclick="deletePatient('${idNumber}')">Sil</button>
        `;
        listElement.appendChild(li);
    });
};

const clearInputs = () => {
    ["ad", "soyad", "tc"].forEach(id => document.getElementById(id).value = "");
};

document.getElementById("hastaBtn").addEventListener("click", addPatient);
document.getElementById("randevuBtn").addEventListener("click", addAppointment);
document.getElementById("tedaviBtn").addEventListener("click", addTreatment);

loadPatients();