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

// Sayfa yüklendiğinde verileri yerel depolamadan çeker
const loadPatients = async () => {
    try {
        const data = localStorage.getItem("patients");
        patients = data ? JSON.parse(data) : [];
        // Ana sayfada liste gösterimi kaldırıldığı için render() çağrısı silindi.
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

// Güncel hasta listesini yerel depolamaya kaydeder
const savePatients = async (updatedList) => {
    patients = [...updatedList];
    localStorage.setItem("patients", JSON.stringify(patients));
    // Liste gösterimi artık sadece patients.html sayfasında yapılıyor.
};

const addPatient = async () => {
    const patientData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        idNumber: document.getElementById("idNumber").value.trim()
    };

    const { firstName, lastName, idNumber } = patientData;

    if (!firstName || !lastName || !idNumber) return alert("All fields are required!");

    if (patients.find(p => p.idNumber === idNumber)) return alert("This ID is already registered.");

    const newPatient = new Patient(firstName, lastName, idNumber);
    
    await savePatients([...patients, newPatient]);
    clearInputs();
    alert("Patient registered successfully!");
};

const addAppointment = async () => {
    const idNumber = document.getElementById("appointmentId").value.trim();
    const date = document.getElementById("appointmentDate").value;

    if (!idNumber || !date) return alert("Missing information!");

    const patientExists = patients.find(p => p.idNumber === idNumber);
    if (!patientExists) return alert("Patient not found!");

    const updatedPatients = patients.map(p => {
        if (p.idNumber === idNumber) {
            return { ...p, appointments: [...p.appointments, date] };
        }
        return p;
    });

    await savePatients(updatedPatients);
    alert("Appointment added!");
};

const addTreatment = async () => {
    const idNumber = document.getElementById("treatmentId").value.trim();
    const treatment = document.getElementById("treatmentDesc").value.trim();

    if (!idNumber || !treatment) return alert("Missing information!");

    const patientExists = patients.find(p => p.idNumber === idNumber);
    if (!patientExists) return alert("Patient not found!");

    const updatedPatients = patients.map(p => {
        if (p.idNumber === idNumber) {
            return { ...p, treatments: [...p.treatments, treatment] };
        }
        return p;
    });

    await savePatients(updatedPatients);
    alert("Treatment recorded!");
};

const clearInputs = () => {
    ["firstName", "lastName", "idNumber"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
};

// Event Listeners
document.getElementById("addPatientBtn").addEventListener("click", addPatient);
document.getElementById("addAppointmentBtn").addEventListener("click", addAppointment);
document.getElementById("addTreatmentBtn").addEventListener("click", addTreatment);

// Başlangıçta verileri yükle
loadPatients();